const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

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
const electionsRouter = require("./routes/elections");
const corruptionRouter = require("./routes/corruptions.js");

const { app, server } = require("./socket/socket");
const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors({ origin: "*" }));
app.use(express.json());

app.use("/citizen", citizenRouter);
app.use("/application", applicationRouter);
app.use("/elections", electionsRouter);
app.use("/corruption", corruptionRouter);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message: err.message });
});

mongoose.set("strictQuery", false);

mongoose
  .connect(DB_HOST)
  // .connect(DB_SERVER)
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
