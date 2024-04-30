import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
import { Server } from "socket.io";

dotenv.config();
connectDB();

const app = express();
app.use(express.json()); // accept the json data

app.get("/", (req, res) => {
  res.send("App is running succesfully.");
});

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);
app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 4000;

const server = app.listen(5000, () =>
  console.log(`Server started at port ${port}.`)
);
const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  console.log("connected to socket.io");

  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User joined room : " + room);
  });

  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  socket.on("new message", (newMessageRecieved) => {
    var chat = newMessageRecieved.chat;

    if (!chat.users) return console.log("chat.users is not defined");

    chat.users.forEach((user) => {
      if (user._id !== newMessageRecieved.sender._id) {
        socket.in(user._id).emit("message recieved", newMessageRecieved);
      }
    });
  });

  socket.off("setup", () => {
    console.log("user disconnected");
    socket.leave(userData._id);
  });
});
