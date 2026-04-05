/** @jest-environment node */

export {};

const prismaMock = {
  users: {
    findUnique: jest.fn(),
  },
  otps: {
    create: jest.fn(),
    deleteMany: jest.fn(),
  },
  $queryRaw: jest.fn(),
};

const sendGmailMock = jest.fn();

jest.mock("@/lib/prisma", () => ({
  Prisma: prismaMock,
}));

jest.mock("@/lib/sendGmail", () => ({
  sendGmail: (...args: unknown[]) => sendGmailMock(...args),
}));

describe("POST /api/password/request", () => {
  beforeEach(() => {
    prismaMock.users.findUnique.mockReset();
    prismaMock.otps.create.mockReset();
    prismaMock.otps.deleteMany.mockReset();
    prismaMock.$queryRaw.mockReset();
    sendGmailMock.mockReset();
  });

  it("returns 404 when the account does not exist", async () => {
    prismaMock.users.findUnique.mockResolvedValue(null);

    const { POST } = await import("../route");
    const req = new Request("http://localhost/api/password/request", {
      method: "POST",
      body: JSON.stringify({ email: "missing@example.com" }),
    });

    const res = await POST(req);
    expect(res.status).toBe(404);
    expect(await res.json()).toEqual({
      error: "No account found with that email.",
    });
  });

  it("creates a password-reset OTP and sends the email", async () => {
    prismaMock.users.findUnique.mockResolvedValue({ idusers: 1 });
    prismaMock.$queryRaw.mockResolvedValue([{ count: BigInt(0) }]);
    prismaMock.otps.deleteMany.mockResolvedValue({});
    prismaMock.otps.create.mockResolvedValue({});
    sendGmailMock.mockResolvedValue({});

    const { POST } = await import("../route");
    const req = new Request("http://localhost/api/password/request", {
      method: "POST",
      body: JSON.stringify({ email: "USER@example.com " }),
    });

    const res = await POST(req);
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ message: "Reset code sent" });
    expect(prismaMock.otps.create).toHaveBeenCalledWith({
      data: expect.objectContaining({
        email: "user@example.com",
        otp: expect.stringMatching(/^\d{6}$/),
        password_purpose: true,
      }),
    });
    expect(sendGmailMock).toHaveBeenCalledWith(
      expect.objectContaining({
        to: "user@example.com",
        subject: "Reset your PhilosophyAI password",
      }),
    );
  });
});
