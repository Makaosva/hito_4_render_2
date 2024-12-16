// HITO 4 BACKEND PROYECTO FINAL
//para el backend
require("dotenv").config();

/* para habilitar los cors */
const cors = require("cors");
// Importar express y se ejecuta para obtener un enrutador (app)
const express = require("express");
const app = express();
const usersRoutes = require("../routes/usersRoutes");

// Configuración de CORS para permitir solicitudes con credenciales
const corsOptions = {
  origin: "http://localhost:5173",  // El origen de tu frontend
  credentials: true,
  exposedHeaders:["Authorization"]// Permitir enviar cookies o encabezados de autorización
};
app.use(cors(corsOptions)); // se permite cors para todas las rutas
/* parsear el cuerpo de la consulta */
app.use(express.json());
app.use("/publicaciones", usersRoutes);
app.use(usersRoutes);

//para ocupar .env
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});


module.exports = app; // Exportamos app para los test