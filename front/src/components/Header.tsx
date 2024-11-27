import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <header className="bg-blue-500 p-4 text-white flex justify-between items-center">
      <h1 className="text-xl font-bold">
        <FontAwesomeIcon icon={faUser} /> Sistema de Clientes
      </h1>
      <nav>
        <Link to="/" className="mr-4 hover:underline">
          Home
        </Link>
        <Link to="/cadastrar" className="hover:underline">
          Cadastro
        </Link>
      </nav>
    </header>
  );
};

export default Header;
