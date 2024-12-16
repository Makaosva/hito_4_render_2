const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const Authorization = req.header("Authorization");
  console.log("autorization:" ,Authorization  )
  if (!Authorization) {
    return res.status(401).json({ error: "No existe autorización" });
  }
  const token = Authorization.split("Bearer ")[1];
  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }
  try {
    // VERIFCAR Y DECODIFICAR
    const payload = jwt.verify(token, "mi_clave"); // Decodifica el token
    req.user = payload; // asignar el payload a req.user, // Agrega la información del usuario al request
    console.log(`Acceso autorizado para ${payload.email}`);
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).send({ error: "Token inválido" });
  }
};

module.exports = { authMiddleware };