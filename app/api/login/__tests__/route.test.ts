/** @jest-environment node */

export {};

import { NextRequest } from "next/server";

const prismaMock = {
  users: {
    findUnique: jest.fn(),
  },
};

const setAuthCookiesMock = jest.fn();
const compareMock = jest.fn();
const signMock = jest.fn();

jest.mock("@/lib/prisma", () => ({
  Prisma: prismaMock,
}));

jest.mock("@/lib/authCookies", () => ({
  setAuthCookies: (...args: unknown[]) => setAuthCookiesMock(...args),
}));

jest.mock("bcryptjs", () => ({
  compare: (...args: unknown[]) => compareMock(...args),
}));

jest.mock("jsonwebtoken", () => ({
  __esModule: true,
  default: {
    sign: (...args: unknown[]) => signMock(...args),
  },
}));

describe("POST /api/login", () => {
  beforeEach(() => {
    prismaMock.users.findUnique.mockReset();
    setAuthCookiesMock.mockReset();
    compareMock.mockReset();
    signMock.mockReset();
    process.env.JWT_SECRET = "jwt-secret";
    process.env.REFRESH_JWT_SECRET = "refresh-secret";
  });

  it("returns 400 when email or password is missing", async () => {
    const { POST } = await import("../route");
    const req = new NextRequest("http://localhost/api/login", {
      method: "POST",
      body: JSON.stringify({ email: "", password: "" }),
    });

    const res = await POST(req);
    const body = await res.json();

    expect(res.status).toBe(400);
    expect(body).toEqual({ error: "Email and password are required" });
  });

  it("returns 401 for invalid credentials", async () => {
    prismaMock.users.findUnique.mockResolvedValue(null);

    const { POST } = await import("../route");
    const req = new NextRequest("http://localhost/api/login", {
      method: "POST",
      body: JSON.stringify({ email: "a@b.com", password: "secret" }),
    });

    const res = await POST(req);
    const body = await res.json();

    expect(res.status).toBe(401);
    expect(body).toEqual({ error: "Invalid credentials" });
  });

  it("sets auth cookies and returns tokens for a valid login", async () => {
    prismaMock.users.findUnique.mockResolvedValue({
      idusers: 7,
      email: "user@example.com",
      password: "hashed-password",
    });
    compareMock.mockResolvedValue(true);
    signMock
      .mockReturnValueOnce("signed-access-token")
      .mockReturnValueOnce("signed-refresh-token");

    const { POST } = await import("../route");
    const req = new NextRequest("http://localhost/api/login", {
      method: "POST",
      body: JSON.stringify({
        email: "user@example.com",
        password: "correct-password",
      }),
    });

    const res = await POST(req);
    const body = await res.json();

    expect(res.status).toBe(200);
    expect(body).toEqual({
      token: "signed-access-token",
      refresh: "signed-refresh-token",
    });
    expect(compareMock).toHaveBeenCalledWith(
      "correct-password",
      "hashed-password",
    );
    expect(setAuthCookiesMock).toHaveBeenCalledWith(
      res,
      "signed-access-token",
      "signed-refresh-token",
    );
  });
});
