import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import ClientList from "../components/ClientList";

const Home: React.FC = () => {
  return (
    <div className="p-8 text-center">
      <h1 className="text-4xl font-bold mb-4">Bem-vindo ao Sistema de Clientes</h1>
      <p className="text-lg mb-6">
        Gerencie seus clientes de forma rápida e eficiente. Escolha uma das opções abaixo:
      </p>
      <div className="flex justify-center gap-4">
        <Link
          to="/cadastrar"
          className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 shadow-md"
        >
          <FontAwesomeIcon icon={faPlusCircle} className="mr-2" />
          Cadastrar Cliente
        </Link>
      </div>
      <ClientList/>
    </div>
  );
};

export default Home;
