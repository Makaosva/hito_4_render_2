require("dotenv").config();
const cors = require("cors");
const express = require("express");
const usersRoutes = require("./routes/usersRoutes");
const morgan = require("morgan");

const app = express();

const allowedOrigins = [
  "https://hito-4-render-2-client.onrender.com",
  "http://localhost:5173",
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use(express.json());
//app.use("/publicaciones", usersRoutes);
app.use("/api", usersRoutes);
app.use(morgan("dev"));

app.get("/api", (req, res) => {
  res.json({ message: "¡Hola desde el backend!" });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Server error");
});

module.exports = app; // Exportamos app para los test
