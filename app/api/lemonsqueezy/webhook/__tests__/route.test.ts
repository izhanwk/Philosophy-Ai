/** @jest-environment node */

export {};

import { NextRequest } from "next/server";
import { verifyLemonSignature } from "@/lib/lemonsqueezy";

const prismaMock = {
  users: {
    findFirst: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
  },
};

jest.mock("@/lib/lemonsqueezy", () => ({
  verifyLemonSignature: jest.fn(),
}));

jest.mock("@/lib/prisma", () => ({
  Prisma: prismaMock,
}));

describe("POST /api/lemonsqueezy/webhook", () => {
  beforeEach(() => {
    (verifyLemonSignature as jest.Mock).mockReset();
    prismaMock.users.findFirst.mockReset();
    prismaMock.users.findUnique.mockReset();
    prismaMock.users.update.mockReset();
  });

  it("returns 400 when the signature header is missing", async () => {
    const { POST } = await import("../route");
    const req = new NextRequest("http://localhost/api/lemonsqueezy/webhook", {
      method: "POST",
      body: JSON.stringify({}),
    });

    const res = await POST(req);

    expect(res.status).toBe(400);
    expect(await res.text()).toBe("Missing signature");
  });

  it("returns 401 when the signature is invalid", async () => {
    (verifyLemonSignature as jest.Mock).mockReturnValue(false);

    const { POST } = await import("../route");
    const req = new NextRequest("http://localhost/api/lemonsqueezy/webhook", {
      method: "POST",
      body: JSON.stringify({ meta: { event_name: "subscription_created" } }),
      headers: { "x-signature": "bad-signature" },
    });

    const res = await POST(req);

    expect(res.status).toBe(401);
    expect(await res.text()).toBe("Invalid signature");
  });

  it("syncs subscription data for subscription-created events", async () => {
    (verifyLemonSignature as jest.Mock).mockReturnValue(true);
    prismaMock.users.findFirst
      .mockResolvedValueOnce(null)
      .mockResolvedValueOnce(null);
    prismaMock.users.findUnique.mockResolvedValue({ idusers: 9 });
    prismaMock.users.update.mockResolvedValue({});

    const payload = {
      meta: {
        event_name: "subscription_created",
        custom_data: { app_user_id: "9" },
      },
      data: {
        id: "sub_123",
        attributes: {
          customer_id: 22,
          status: "active",
          variant_id: 1474734,
          renews_at: "2026-05-01T00:00:00.000Z",
          user_email: "user@example.com",
        },
      },
    };

    const { POST } = await import("../route");
    const req = new NextRequest("http://localhost/api/lemonsqueezy/webhook", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: { "x-signature": "valid-signature" },
    });

    const res = await POST(req);
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ received: true });
    expect(prismaMock.users.update).toHaveBeenCalledWith({
      where: { idusers: 9 },
      data: {
        lemon_customer_id: "22",
        lemon_subscription_id: "sub_123",
        subscription_status: "active",
        subscription_price_id: "1474734",
        subscription_current_period_end: new Date("2026-05-01T00:00:00.000Z"),
      },
    });
  });

  it("clears subscription state for cancellation events", async () => {
    (verifyLemonSignature as jest.Mock).mockReturnValue(true);
    prismaMock.users.findFirst.mockResolvedValue({ idusers: 9 });
    prismaMock.users.update.mockResolvedValue({});

    const payload = {
      meta: { event_name: "subscription_cancelled" },
      data: {
        id: "sub_123",
        attributes: {
          status: "cancelled",
          ends_at: "2026-05-10T00:00:00.000Z",
        },
      },
    };

    const { POST } = await import("../route");
    const req = new NextRequest("http://localhost/api/lemonsqueezy/webhook", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: { "x-signature": "valid-signature" },
    });

    const res = await POST(req);
    expect(res.status).toBe(200);
    expect(prismaMock.users.update).toHaveBeenCalledWith({
      where: { idusers: 9 },
      data: {
        subscription_status: "cancelled",
        subscription_current_period_end: new Date("2026-05-10T00:00:00.000Z"),
      },
    });
  });
});
