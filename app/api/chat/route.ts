export default async function POST(req: Request) {
  const { message } = await req.json();
  console.log(message);
  const stream = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder();
      const fake = `You said: ${message}\n\nAI: `;
      controller.enqueue(encoder.encode(fake));

      const tokens = ["This ", "is ", "a ", "streamed ", "response ", "✅"];
      for (const t of tokens) {
        await new Promise((r) => setTimeout(r, 150));
        controller.enqueue(encoder.encode(t));
      }
      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
    },
  });
}
