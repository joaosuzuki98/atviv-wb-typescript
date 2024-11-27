import React from "react";
import ClientForm from "../components/ClientForm";

const CreateClient: React.FC = () => {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Cadastrar Novo Cliente</h1>
      <p className="text-lg mb-6">
        Preencha o formulário abaixo para adicionar um novo cliente ao sistema.
      </p>
      <ClientForm />
    </div>
  );
};

export default CreateClient;
