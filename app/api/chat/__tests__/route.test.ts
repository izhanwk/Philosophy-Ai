/** @jest-environment node */

export {};

import { NextRequest } from "next/server";

const getCurrentUserFromRequestMock = jest.fn();
const openAiCreateMock = jest.fn();

const prismaMock = {
  chatmessages: {
    count: jest.fn(),
    create: jest.fn(),
    findMany: jest.fn(),
  },
  philosophers: {
    findFirst: jest.fn(),
  },
  chats: {
    findFirst: jest.fn(),
    create: jest.fn(),
  },
};

jest.mock("@/lib/currentUser", () => ({
  getCurrentUserFromRequest: (...args: unknown[]) =>
    getCurrentUserFromRequestMock(...args),
}));

jest.mock("@/lib/prisma", () => ({
  Prisma: prismaMock,
}));

jest.mock("openai", () => ({
  __esModule: true,
  default: jest.fn().mockImplementation(() => ({
    responses: {
      create: (...args: unknown[]) => openAiCreateMock(...args),
    },
  })),
}));

describe("POST /api/chat", () => {
  beforeEach(() => {
    getCurrentUserFromRequestMock.mockReset();
    openAiCreateMock.mockReset();
    prismaMock.chatmessages.count.mockReset();
    prismaMock.chatmessages.create.mockReset();
    prismaMock.chatmessages.findMany.mockReset();
    prismaMock.philosophers.findFirst.mockReset();
    prismaMock.chats.findFirst.mockReset();
    prismaMock.chats.create.mockReset();
  });

  it("sends recent conversation history to OpenAI", async () => {
    getCurrentUserFromRequestMock.mockResolvedValue({
      idusers: 4,
      name: "Ishan Khan",
      subscription_status: null,
      subscription_current_period_end: null,
    });
    prismaMock.chatmessages.count.mockResolvedValue(0);
    prismaMock.philosophers.findFirst.mockResolvedValue({
      name: "Aristotle",
      style_prompt: "Speak with practical clarity.",
    });
    prismaMock.chats.findFirst.mockResolvedValue({ id: 15 });
    prismaMock.chatmessages.create
      .mockResolvedValueOnce({ id: 100 })
      .mockResolvedValueOnce({ id: 101 });
    prismaMock.chatmessages.findMany.mockResolvedValue([
      { role: "user", content: "Now add 20 into it" },
      { role: "assistant", content: "It equals 4." },
      { role: "user", content: "What does 2 + 2 equal?" },
    ]);
    openAiCreateMock.mockResolvedValue(
      (async function* () {
        yield { type: "response.output_text.delta", delta: "It is 24." };
      })(),
    );

    const { POST } = await import("../route");
    const req = new NextRequest("http://localhost/api/chat", {
      method: "POST",
      body: JSON.stringify({
        philosopherId: "1",
        message: "Now add 20 into it",
      }),
    });

    const res = await POST(req);
    await res.text();

    expect(openAiCreateMock).toHaveBeenCalledWith(
      expect.objectContaining({
        model: "gpt-5-mini",
        stream: true,
        input: [
          expect.objectContaining({ role: "system" }),
          { role: "user", content: "What does 2 + 2 equal?" },
          { role: "assistant", content: "It equals 4." },
          { role: "user", content: "Now add 20 into it" },
        ],
      }),
    );
    expect(prismaMock.chatmessages.create).toHaveBeenLastCalledWith({
      data: {
        chat_id: 15,
        role: "assistant",
        content: "It is 24.",
      },
      select: { id: true },
    });
  });
});
