import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const UsuarioContext = createContext();

/* const BASE_URL = import.meta.env.VITE_BASE_URL; */

const initialUsuario = JSON.parse(localStorage.getItem("usuario")) || null;

const UsuariosProvider = ({ children }) => {
  const [token, setToken] = useState(sessionStorage.getItem("token") || null); //para backend
  const [activeMenu, setActiveMenu] = useState("");
  const [showCerrarSesion, setShowCerrarSesion] = useState(false);
  const [usuario, setUsuario] = useState(initialUsuario); //initialUsuario es el valor del estado inicial del estado usuario
  const [publicaciones, setPublicaciones] = useState([]); //para todas las publicaciones
  const [MisPublicaciones, setMisPublicaciones] = useState([]);
  const [MisFavoritos, setMisFavoritos] = useState([]);
  const [sortOption, setSortOption] = useState(""); // Opción de ordenación seleccionada

  const { VITE_API_URL } = import.meta.env;
  // Función para obtener publicaciones con orden
  const fetchPublicaciones = async () => {
    try {
      const response = await axios.get(
        `${VITE_API_URL}/api/publicaciones/ordenar`,
        {
          params: { sort: sortOption }, // Pasar la opción de orden como parámetro
        }
      );
      setPublicaciones(response.data);
    } catch (error) {
      console.error("Error al obtener publicaciones:", error);
    }
  };

  useEffect(() => {
    fetchPublicaciones(); // Llamar la API cada vez que cambie la opción de orden
  }, [sortOption]);

  const logout = () => {
    setUsuario(null); // Limpiar el estado del usuario
    setActiveMenu(null); // Limpiar el estado del menú activo
    setShowCerrarSesion(false); // Cambiar el estado de visibilidad del menú de cierre
    sessionStorage.removeItem("token"); // Eliminar el token de sessionStorage
    localStorage.removeItem("usuario"); // eliminar usuario de localStorage
  };

  const handleMenuChange = (menuName) => {
    setActiveMenu(menuName);
    if (menuName === "Tienda") {
      setShowCerrarSesion(true);
    } else {
      setShowCerrarSesion(false);
    }
  };

  //para backend inicio sesion se ocupa credenciales email y password creados en registro
  // con autorizacion de token pasa a vista perfil
  const loginWithEmailAndPassword = async (email, password) => {
    try {
      const response = await axios.post(`${VITE_API_URL}/api/login`, {
        email,
        password,
      });
      // se almacena el token si la respuesta es exitosa en el login
      const { token } = response.data;
      console.log("Token recibido:", token);
      sessionStorage.setItem("token", token);
      setToken(token);

      //peticion GET a /usuarios en Authorization Bearer
      const userResponse = await axios.get(`${VITE_API_URL}/api/usuarios`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Respuesta de usuario:", userResponse.data);
      console.log(userResponse.data);
      setUsuario(userResponse.data); // ACA SE GUARDA EL USUARIO EN EL ESTADO

      return true;
    } catch (error) {
      console.error("Error logging in:", error);
      return false;
    }
  };

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  // para que se ocupen en otros componentes o vistas
  return (
    <UsuarioContext.Provider
      value={{
        usuario,
        setUsuario,
        loginWithEmailAndPassword,
        token,
        setToken,
        activeMenu,
        setActiveMenu: handleMenuChange,
        showCerrarSesion,
        setShowCerrarSesion,
        MisPublicaciones,
        setMisPublicaciones,
        publicaciones,
        setPublicaciones,
        MisFavoritos,
        setMisFavoritos,
        logout,
        setSortOption,
      }}
    >
      {children}
    </UsuarioContext.Provider>
  );
};

export default UsuariosProvider;
