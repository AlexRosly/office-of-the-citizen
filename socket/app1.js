const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const logger = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const { Apllication } = require("./models");

const getAppStatistic = require("./controllers/applications/getAppStatistic");

// Connection URL
// const url = 'mongodb://localhost:27017';
// mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.2.6
// const client = new MongoClient(url);
// Database Name
// const dbName = "Office-Of-The-Citizen";

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const { DB_HOST, DB_SERVER, APP_PORT = 8080 } = process.env;

const citizenRouter = require("./routes/citizen");
const applicationRouter = require("./routes/application");

const app = express();
const formatsLogger = app.get("env") === "development" ? "dev" : "short";
const server = http.createServer(app);
const io = new Server(server, {
  path: "/socketio",
  wssEngine: ["ws", "wss"],
  transports: ["websocket", "polling"],
  cors: { origin: "*", methods: ["GET", "POST"] },
  allowEIO3: true,
});

app.use(logger(formatsLogger));
app.use(cors({ origin: "*" }));
app.use(express.json());

app.use("/citizen", citizenRouter);
app.use("/application", applicationRouter);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message: err.message });
});

const users = [];

const deleteUser = (id) => {
  const findIndex = users.findIndex((u) => u === id);
  users.splice(findIndex, 1);
};

Apllication.watch().on("change", async (data) => {
  console.log("change");
  if (data.operationType) {
    const amount = await getAppStatistic();
    console.log({ amount });
    // users.forEach((user) => {
    //   console.log("===", user === user);
    //   if (user !== user) {
    //     console.log("userIf", user);
    //     io.emit("amount", { amount });
    //   }
    // });
    io.emit("amount", { amount });
  }
});

io.on("connection", (socket) => {
  users.push(socket.id);
  //get amount connection established
  socket.on("join", async () => {
    const amount = await getAppStatistic();
    socket.emit("amount", { amount });
  });

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

mongoose.set("strictQuery", false);

mongoose
//  .connect(DB_HOST)
   .connect(DB_SERVER)
  .then(() =>
    server.listen(APP_PORT, () => {
      console.log(
        `server is running in port ${APP_PORT} and Database connection successful`
      );
    })
  )
  .catch((error) => {
    console.log(error.message);
    console.log("DB don't connect");
    process.exit(1);
  });
