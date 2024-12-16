require("dotenv").config();
const cors = require("cors");
const express = require("express");
const usersRoutes = require("./routes/usersRoutes");
const morgan = require("morgan");

const app = express();

const corsOptions = {
  //origin: "http://localhost:5173",
  credentials: true,
  exposedHeaders: ["Authorization"],
};

app.use(cors(corsOptions));
app.use(express.json());
//app.use("/publicaciones", usersRoutes);
app.use("/api", usersRoutes);
app.use(morgan("dev"));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Server error");
});


module.exports = app; // Exportamos app para los test