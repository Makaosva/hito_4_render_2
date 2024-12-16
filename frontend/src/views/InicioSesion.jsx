import { useContext, useState, useEffect } from "react";
import { UsuarioContext } from "../context/UsuarioContext.jsx";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Form } from "react-bootstrap";
import axios from "axios";

const InicioSesion = () => {
  const { setUsuario } = useContext(UsuarioContext);
  const { usuario } = useContext(UsuarioContext);
  const navigate = useNavigate();
  const { loginWithEmailAndPassword } = useContext(UsuarioContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  //Redirigir al usuario a la página de perfil (/perfil) si ya ha iniciado sesión
  useEffect(() => {
    if (usuario) {
      navigate("/perfil");
    }
  }, [usuario, navigate]);

  //Manejar el evento de envío del formulario de inicio de sesión.
  const handleSubmit = async (e) => {
    e.preventDefault(); //Evita que la página se recargue al enviar el formulario

    //Validación de campos requeridos
    if (!email || !password) {
      alert("Completa todos los campos");
      return;
    }

    try {
      // Llama a la función de inicio de sesión funcion del contexto para verificar las credenciales de inicio de sesión.
      const isLoggedIn = await loginWithEmailAndPassword(email, password);

      //Retorna un valor booleano (true o false):
      if (isLoggedIn) {
        // Si el inicio de sesión es exitoso muestra un mensaje con alert, redirige al perfil.
        alert("Inicio de sesión exitoso");
        navigate("/perfil");
      } else {
        // Si las credenciales no son válidas, muestra un mensaje de error con alert.
        alert("Credenciales inválidas. Por favor, intenta de nuevo.");
      }
    } catch (error) {
      // Manejo de errores adicionales.
      console.error("Error al intentar iniciar sesión:", error); //Imprime el error en la consola del navegador
      setError(
        "Ocurrió un error al iniciar sesión. Por favor, intenta más tarde."
      ); //Actualiza el estado de error
    }
  };

  //vuelve al home
  const handleGoBack = () => {
    navigate("/");
  };

  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center py-4"
    >
      <div className="w-50">
        <h1 className="text-center text-light mb-4 mt-4">Iniciar Sesión</h1>
        <Form
          onSubmit={handleSubmit}
          className="bg-gradient p-4 rounded shadow-sm"
        >
          <Form.Group className="mb-3">
            <Form.Label htmlFor="email" className="text-light">
              Email
            </Form.Label>
            <Form.Control
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className="border-primary rounded"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="password" className="text-light">
              Password
            </Form.Label>
            <Form.Control
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="*******"
              className="border-primary rounded"
            />
          </Form.Group>
          <Container className="d-flex flex-column align-items-center">
            <Button
              type="submit"
              className="btn-lg w-50 w-sm-auto btn-primary btn-sm"
            >
              Iniciar Sesión
            </Button>
            <Button
              type="button"
              className="btn-lg w-50 w-sm-auto mt-3 btn-info btn-sm"
              onClick={handleGoBack}
            >
              Volver
            </Button>
          </Container>
        </Form>
      </div>
    </Container>
  );
};

export default InicioSesion;
