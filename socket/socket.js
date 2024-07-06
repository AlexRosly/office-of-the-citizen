const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const app = express();
const server = http.createServer(app);
const getAppStatistic = require("../controllers/applications/getAppStatistic");

const io = new Server(server, {
  // path: "/socketio",
  wssEngine: ["ws", "wss"],
  transports: ["websocket", "polling"],
  cors: { origin: "*", methods: ["GET", "POST"] },
  allowEIO3: true,
});

const users = [];

const deleteUser = (id) => {
  const findIndex = users.findIndex((u) => u === id);
  users.splice(findIndex, 1);
};

const { Apllication } = require("../models");

// Apllication.watch().on("change", async (data) => {
//   console.log("change");
//   if (data.operationType) {
//     const amount = await getAppStatistic();
//     console.log({ amount });
//     // users.forEach((user) => {
//     //   console.log("===", user === user);
//     //   if (user !== user) {
//     //     console.log("userIf", user);
//     //     io.emit("amount", { amount });
//     //   }
//     // });
//     io.emit("amount", { amount });
//   }
// });

io.on("connection", (socket) => {
  users.push(socket.id);
  //get amount connection established
  socket.on("join", async () => {
    const amount = await getAppStatistic();
    socket.emit("amount", { amount });
  });
  setInterval(async () => {
    // console.log("Socket");
    const amount = await getAppStatistic();
    socket.emit("amount", { amount });
  }, 5000);
  //get amount after each update
  // socket.on("join", async () => {
  //   await Apllication.watch().on("change", async (data) => {
  //     if (data.operationType) {
  //       const amount = await getAppStatistic();
  //       // console.log({ dataNew });
  //       socket.emit("amount", { amount });
  //     }
  //   });
  // });

  socket.on("disconnect", () => {
    deleteUser(socket.id);
  });
});

module.exports = { app, server, io };
