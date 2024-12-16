import React, { useState, useEffect, useContext } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import MenuLateral from "../components/MenuLateral";
import { UsuarioContext } from "../context/UsuarioContext";
import axios from "axios"; // para ocupar la bd, se instala como dependencia

// VISTA FRONTEND SE DEBE ENVIAR DATOS FORMULARIO AL BACKEND
const CrearPublicacion = () => {
  const { setActiveMenu } = useContext(UsuarioContext);
  const { usuario, setUsuario } = useContext(UsuarioContext); //para traer usuario de context
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [imagen_url, setImagen_url] = useState("");
  const [precio, setPrecio] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // Nuevo estado para controlar la carga

  const handlePublicar = async () => {
    const token = localStorage.getItem("token"); // Obtener el token desde localStorage
    if (!token) {
      alert("Token no disponible. Por favor, inicia sesión.");
      console.log("Token no encontrado");
      return;
    }

    // Crear el cuerpo de la publicación, incluyendo el usuario_id obtenido del token
    const nuevaPublicacion = {
      titulo,
      descripcion,
      imagen_url,
      precio,
    };

    try {
      setIsSubmitting(true); // Activar estado de carga
      console.log("Enviando la solicitud a la API");
      // Hacer la solicitud POST al backend, enviando el token en los headers
      const response = await axios.post(
        "http://localhost:3000/publicaciones",nuevaPublicacion,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Enviar el token JWT en los headers
          },
        }
      );

      console.log("Respuesta de la API:", response);

      if (response.status === 201) {
        alert("Publicación creada con éxito");
        console.log("Publicación exitosa:", response.data);
        // Limpiar formulario
        setTitulo("");
        setDescripcion("");
        setImagen_url("");
        setPrecio("");
      } else {
        alert("Error al crear la publicación.");
        console.log("Respuesta inesperada del servidor:", response);
      }

      setIsSubmitting(false); // Desactivar estado de carga

    } catch (error) {
      console.error("Error al crear la publicación:", error);
      alert("Hubo un error al crear la publicación. Intenta nuevamente.");
      console.log("Error en el catch:", error);
      setIsSubmitting(false); // Desactivar estado de carga en caso de error
    }
  };

  return (
    <Container fluid className="py-4">
      <Row>
        <Col xs={12} md={3}>
          <MenuLateral />
        </Col>

        <Col xs={12} md={9} className="d-flex justify-content-center p-4">
          <div className="text-center shadow-sm w-100 w-md-50">
            <h4 className="mb-2 text-white border-bottom p-2">
              Crear Publicación
            </h4>
            {/* para que se muestre el usuario */}
            <p className="text-center text-white">{usuario?.nombre}</p>

            {/* Formulario */}
            <Form
              onSubmit={(e) => {
                e.preventDefault(); // Previene la recarga de la página
                handlePublicar(); // Llama a la función
              }}
              className="bg-light rounded shadow-sm p-4"
              style={{
                background: "linear-gradient(to right, #cce7ff, #a0c4ff)",
              }}
            >
              <Form.Group controlId="formImagen" className="mb-3">
                <Form.Label className="fw-bold text-dark">
                  Imagen publicación
                </Form.Label>
                <Form.Control
                  type="url"
                  name="imagen"
                  value={imagen_url}
                  onChange={(e) => setImagen_url(e.target.value)}
                  placeholder="Ingresa la URL de la imagen"
                  required
                  className="border-secondary shadow-sm"
                />
              </Form.Group>

              <Form.Group controlId="formTitulo" className="mb-3">
                <Form.Label className="fw-bold text-dark">
                  Título publicación
                </Form.Label>
                <Form.Control
                  type="text"
                  name="titulo"
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                  placeholder="Ingresa el título"
                  required
                  className="border-secondary shadow-sm"
                />
              </Form.Group>

              <Form.Group controlId="formDescripcion" className="mb-3">
                <Form.Label className="fw-bold text-dark">
                  Descripción publicación
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  name="descripcion"
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                  placeholder="Escribe la descripción"
                  required
                  className="border-secondary shadow-sm"
                />
              </Form.Group>

              <Form.Group controlId="formPrecio" className="mb-3">
                <Form.Label className="fw-bold text-dark">Precio</Form.Label>
                <Form.Control
                  type="number"
                  name="precio"
                  value={precio}
                  onChange={(e) => setPrecio(e.target.value)}
                  placeholder="Ingresa el precio"
                  required
                  className="border-secondary shadow-sm"
                />
              </Form.Group>

              <Button
                variant="primary"
                type="submit"
                className="w-50"
                disabled={isSubmitting} // Deshabilitar mientras se envía
              >
                {isSubmitting ? "Publicando..." : "Publicar"}
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default CrearPublicacion;
