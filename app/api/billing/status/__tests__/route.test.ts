/** @jest-environment node */

export {};

import { NextRequest } from "next/server";

const getCurrentUserFromRequestMock = jest.fn();
const prismaMock = {
  chatmessages: {
    count: jest.fn(),
  },
};

jest.mock("@/lib/currentUser", () => ({
  getCurrentUserFromRequest: (...args: unknown[]) =>
    getCurrentUserFromRequestMock(...args),
}));

jest.mock("@/lib/prisma", () => ({
  Prisma: prismaMock,
}));

describe("GET /api/billing/status", () => {
  beforeEach(() => {
    getCurrentUserFromRequestMock.mockReset();
    prismaMock.chatmessages.count.mockReset();
  });

  it("returns 401 when no user is authenticated", async () => {
    getCurrentUserFromRequestMock.mockResolvedValue(null);

    const { GET } = await import("../route");
    const req = new NextRequest("http://localhost/api/billing/status");
    const res = await GET(req);

    expect(res.status).toBe(401);
    expect(await res.json()).toEqual({ message: "Unauthorized" });
  });

  it("returns starter plan details for a free user", async () => {
    getCurrentUserFromRequestMock.mockResolvedValue({
      idusers: 5,
      subscription_status: null,
      subscription_current_period_end: null,
    });
    prismaMock.chatmessages.count.mockResolvedValue(12);

    const { GET } = await import("../route");
    const req = new NextRequest("http://localhost/api/billing/status");
    const res = await GET(req);
    const body = await res.json();

    expect(res.status).toBe(200);
    expect(body.plan).toBe("Starter");
    expect(body.hasActiveSubscription).toBe(false);
    expect(body.dailyLimit).toBe(50);
    expect(body.remainingMessages).toBe(38);
  });

  it("returns Pro limits for an active subscriber", async () => {
    getCurrentUserFromRequestMock.mockResolvedValue({
      idusers: 5,
      subscription_status: "active",
      subscription_current_period_end: new Date("2026-05-01T00:00:00.000Z"),
    });
    prismaMock.chatmessages.count.mockResolvedValue(20);

    const { GET } = await import("../route");
    const req = new NextRequest("http://localhost/api/billing/status");
    const res = await GET(req);
    const body = await res.json();

    expect(res.status).toBe(200);
    expect(body.plan).toBe("Philosophy Pro");
    expect(body.hasActiveSubscription).toBe(true);
    expect(body.dailyLimit).toBe(100);
    expect(body.remainingMessages).toBe(80);
    expect(body.currentPeriodEnd).toBe("2026-05-01T00:00:00.000Z");
  });
});
