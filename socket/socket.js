const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const app = express();
const server = http.createServer(app);
const getAppStatistic = require("../controllers/applications/getAppStatistic");

const io = new Server(server, {
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

io.on("connection", (socket) => {
  users.push(socket.id);
  //get amount connection established
  socket.on("join", async () => {
    const amount = await getAppStatistic();
    socket.emit("amount", { amount });
  });
  setInterval(async () => {
    const amount = await getAppStatistic();
    socket.emit("amount", { amount });
  }, 5000);

  socket.on("disconnect", () => {
    deleteUser(socket.id);
  });
});

module.exports = { app, server, io };
