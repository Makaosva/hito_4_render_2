import React, { useContext, useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { UsuarioContext } from "../context/UsuarioContext";
import { FaSearch } from "react-icons/fa";
import axios from "axios";

const Buscador = () => {
  const { setPublicaciones } = useContext(UsuarioContext);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchAllPublicaciones = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/publicaciones/buscar"
      );
      setPublicaciones(response.data);
    } catch (error) {
      console.error("Error al obtener las publicaciones:", error);
    }
  };

  const handleSearchClick = async () => {
    try {
      if (searchTerm === "") {
        await fetchAllPublicaciones(); // Obtener todas las publicaciones si no hay término
      } else {
        const response = await axios.get(
          "http://localhost:3000/publicaciones/buscar",
          { params: { titulo: searchTerm } }
        );
        setPublicaciones(response.data);
      }
    } catch (error) {
      console.error("Error al buscar las publicaciones:", error);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value === "") {
      fetchAllPublicaciones(); // Mostrar todas las publicaciones si el input está vacío
    }
  };

  return (
    <InputGroup className="mb-3">
      <Form.Control
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder="Busca tu curso por título"
      />
      <InputGroup.Text
        onClick={handleSearchClick}
        style={{ cursor: "pointer" }}
      >
        <FaSearch />
      </InputGroup.Text>
    </InputGroup>
  );
};

export default Buscador;
