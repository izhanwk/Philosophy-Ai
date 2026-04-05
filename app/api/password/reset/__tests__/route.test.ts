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
    update: jest.fn(),
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

describe("POST /api/password/reset", () => {
  beforeEach(() => {
    prismaMock.otptries.create.mockReset();
    prismaMock.otps.findFirst.mockReset();
    prismaMock.otps.deleteMany.mockReset();
    prismaMock.users.update.mockReset();
    prismaMock.$queryRaw.mockReset();
    hashMock.mockReset();
  });

  it("returns 400 when required fields are missing", async () => {
    const { POST } = await import("../route");
    const req = new Request("http://localhost/api/password/reset", {
      method: "POST",
      body: JSON.stringify({ email: "", otp: "", password: "" }),
    });

    const res = await POST(req);
    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({
      error: "Email, OTP, and new password are required.",
    });
  });

  it("returns 400 when the OTP is invalid or expired", async () => {
    prismaMock.$queryRaw.mockResolvedValue([{ count: BigInt(1) }]);
    prismaMock.otps.findFirst.mockResolvedValue(null);

    const { POST } = await import("../route");
    const req = new Request("http://localhost/api/password/reset", {
      method: "POST",
      body: JSON.stringify({
        email: "user@example.com",
        otp: "123456",
        password: "new-password",
      }),
    });

    const res = await POST(req);
    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({ error: "Invalid or expired OTP." });
  });

  it("updates the password and clears OTPs after a valid reset", async () => {
    prismaMock.$queryRaw.mockResolvedValue([{ count: BigInt(1) }]);
    prismaMock.otps.findFirst.mockResolvedValue({ otp: "123456" });
    prismaMock.users.update.mockResolvedValue({});
    prismaMock.otps.deleteMany.mockResolvedValue({});
    hashMock.mockResolvedValue("hashed-password");

    const { POST } = await import("../route");
    const req = new Request("http://localhost/api/password/reset", {
      method: "POST",
      body: JSON.stringify({
        email: "USER@example.com ",
        otp: "123456",
        password: "new-password",
      }),
    });

    const res = await POST(req);
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({
      message: "Password updated successfully.",
    });
    expect(prismaMock.users.update).toHaveBeenCalledWith({
      where: { email: "user@example.com" },
      data: { password: "hashed-password" },
    });
  });
});
