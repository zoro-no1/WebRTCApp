import { Server, Socket } from "socket.io";
import Express from "express";
import { createServer } from "http";

const app = Express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

let allSocket: string[] = [];

io.on("connection", (socket: Socket) => {
  console.log("server is connected", socket.id);
  allSocket.push(socket.id);
  console.log(allSocket.length);

  // Send updated user list to all clients
  io.emit("allUser", allSocket);

  socket.on("createOffer", (data) => {
    io.to(data.receiverId).emit("offer", { offer: data.offer, from: socket.id });
  });

  socket.on("answer", (data) => {
    console.log("answer ", data);
    io.to(data.receiverId).emit("answer", { myId: socket.id, offer: data.offer });
  });
  socket.on("iceCandidate",(data)=>{
    io.to(data.receiver).emit("iceCandidate",data)
  })

  socket.on("disconnect", () => {
    allSocket = allSocket.filter(e => e !== socket.id);
    // Update all clients after disconnect
    io.emit("allUser", allSocket);
    console.log("Disconnected", socket.id);
    console.log("Active sockets:", allSocket.length);
  });
});

server.listen(8000, () => {
  console.log("server is listen on 8000");
});

