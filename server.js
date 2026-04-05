import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer();

const allowedOrigins = [
  process.env.APP_URL,
  "http://localhost:3000",
].filter(Boolean);

const io = new Server(httpServer, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.on("message", (message) => {
    io.emit("message", message);
  });
});

httpServer.listen(3001);
