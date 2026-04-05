/** @jest-environment node */

export {};

const prismaMock = {
  otptries: {
    create: jest.fn(),
  },
  otps: {
    findFirst: jest.fn(),
    deleteMany: jest.fn(),
  },
  users: {
    findUnique: jest.fn(),
    create: jest.fn(),
  },
  $queryRaw: jest.fn(),
};

const hashMock = jest.fn();

jest.mock("@/lib/prisma", () => ({
  Prisma: prismaMock,
}));

jest.mock("bcryptjs", () => ({
  hash: (...args: unknown[]) => hashMock(...args),
}));

describe("POST /api/verifyOTP", () => {
  beforeEach(() => {
    prismaMock.otptries.create.mockReset();
    prismaMock.otps.findFirst.mockReset();
    prismaMock.otps.deleteMany.mockReset();
    prismaMock.users.findUnique.mockReset();
    prismaMock.users.create.mockReset();
    prismaMock.$queryRaw.mockReset();
    hashMock.mockReset();
  });

  it("returns 400 for a malformed request", async () => {
    const { POST } = await import("../route");
    const req = new Request("http://localhost/api/verifyOTP", {
      method: "POST",
      body: JSON.stringify({ otp: "", data: { email: "" } }),
    });

    const res = await POST(req as never);
    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({ message: "Bad request" });
  });

  it("returns 404 when the OTP is invalid", async () => {
    prismaMock.$queryRaw.mockResolvedValue([{ count: BigInt(1) }]);
    prismaMock.otps.findFirst.mockResolvedValue(null);

    const { POST } = await import("../route");
    const req = new Request("http://localhost/api/verifyOTP", {
      method: "POST",
      body: JSON.stringify({
        otp: "123456",
        data: { email: "user@example.com", password: "secret", name: "User" },
      }),
    });

    const res = await POST(req as never);
    expect(res.status).toBe(404);
    expect(await res.json()).toEqual({ message: "Invalid or expired OTP" });
  });

  it("creates the user after a valid OTP", async () => {
    prismaMock.$queryRaw.mockResolvedValue([{ count: BigInt(1) }]);
    prismaMock.otps.findFirst.mockResolvedValue({ id: 2, otp: "123456" });
    prismaMock.users.findUnique.mockResolvedValue(null);
    prismaMock.users.create.mockResolvedValue({});
    prismaMock.otps.deleteMany.mockResolvedValue({});
    hashMock.mockResolvedValue("hashed-password");

    const { POST } = await import("../route");
    const req = new Request("http://localhost/api/verifyOTP", {
      method: "POST",
      body: JSON.stringify({
        otp: "123456",
        data: { email: "user@example.com", password: "secret", name: "User" },
      }),
    });

    const res = await POST(req as never);
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ message: "Success" });
    expect(prismaMock.users.create).toHaveBeenCalledWith({
      data: expect.objectContaining({
        email: "user@example.com",
        name: "User",
        password: "hashed-password",
      }),
    });
  });
});
