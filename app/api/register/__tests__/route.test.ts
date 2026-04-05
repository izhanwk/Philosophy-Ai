/** @jest-environment node */

export {};

const prismaMock = {
  users: {
    findUnique: jest.fn(),
  },
  otps: {
    create: jest.fn(),
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

describe("POST /api/register", () => {
  beforeEach(() => {
    prismaMock.users.findUnique.mockReset();
    prismaMock.otps.create.mockReset();
    prismaMock.$queryRaw.mockReset();
    sendGmailMock.mockReset();
  });

  it("returns 409 when the email already exists", async () => {
    prismaMock.users.findUnique.mockResolvedValue({ idusers: 1 });

    const { POST } = await import("../route");
    const req = new Request("http://localhost/api/register", {
      method: "POST",
      body: JSON.stringify({ email: "existing@example.com" }),
    });

    const res = await POST(req);
    const body = await res.json();

    expect(res.status).toBe(409);
    expect(body.error).toMatch(/already exists/i);
  });

  it("returns 429 when the OTP request limit is exceeded", async () => {
    prismaMock.users.findUnique.mockResolvedValue(null);
    prismaMock.$queryRaw.mockResolvedValue([{ count: BigInt(10) }]);

    const { POST } = await import("../route");
    const req = new Request("http://localhost/api/register", {
      method: "POST",
      body: JSON.stringify({ email: "user@example.com" }),
    });

    const res = await POST(req);
    const body = await res.json();

    expect(res.status).toBe(429);
    expect(body.error).toMatch(/too many otp requests/i);
    expect(prismaMock.otps.create).not.toHaveBeenCalled();
  });

  it("creates an OTP record and sends the registration email", async () => {
    prismaMock.users.findUnique.mockResolvedValue(null);
    prismaMock.$queryRaw.mockResolvedValue([{ count: BigInt(0) }]);
    prismaMock.otps.create.mockResolvedValue({});
    sendGmailMock.mockResolvedValue({});

    const { POST } = await import("../route");
    const req = new Request("http://localhost/api/register", {
      method: "POST",
      body: JSON.stringify({ email: "USER@example.com " }),
    });

    const res = await POST(req);
    const body = await res.json();

    expect(res.status).toBe(200);
    expect(body).toEqual({ message: "user@example.com" });
    expect(prismaMock.otps.create).toHaveBeenCalledWith({
      data: expect.objectContaining({
        email: "user@example.com",
        otp: expect.stringMatching(/^\d{6}$/),
      }),
    });
    expect(sendGmailMock).toHaveBeenCalledWith(
      expect.objectContaining({
        to: "user@example.com",
        subject: "PhilosophyAI OTP verification",
      }),
    );
  });
});
