import { createServer } from "http";
import { Server } from "socket.io";
import app from "./app.js";

const port = process.env.PORT || 3005;

const server = createServer(app);

export const io = new Server(server, {
  transports: ["websocket", "polling"],
});

io.on("connection", (client) => {
  console.log("user connected!");
  client.on("disconnect", () => {
    console.log("user disconnected");
  });

  /* setInterval(() => {
    const rand1 = Math.floor(Math.random() * 11);
    const rand2 = Math.floor(Math.random() * 5);
    const rand3 = Math.floor(Math.random() * 11);
    let datas = {
      amps: rand1.toFixed(2),
      voltage: rand2.toFixed(2),
      torque: rand3.toFixed(2),
    };
    client.emit("random", datas);
  }, 1000); */
});

server.listen(port);
