import React, { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { UsuarioContext } from "../context/UsuarioContext";

// ruta privada para verificar si el usuario está autenticado, si no vuelve al login
const RutaPrivada = ({ children }) => {
  const { usuario } = useContext(UsuarioContext); // Obtener el token desde el contexto

  return usuario ? children : <Navigate to="/login" />;
};

export default RutaPrivada;
