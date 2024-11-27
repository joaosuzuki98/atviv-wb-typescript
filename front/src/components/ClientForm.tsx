import React, { useState } from "react";
import axios from "../services/api";

const ClientForm: React.FC = () => {
  const [formData, setFormData] = useState({
    nome: "",
    sobreNome: "",
    endereco: {
      estado: "",
      cidade: "",
      bairro: "",
      rua: "",
      numero: "",
      codigoPostal: "",
      informacoesAdicionais: "",
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    if (name.includes("endereco.")) {
      const field = name.split(".")[1];
      setFormData({
        ...formData,
        endereco: {
          ...formData.endereco,
          [field]: value,
        },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    axios.post("/cliente/cadastrar", formData).then(() => {
      alert("Cliente cadastrado com sucesso!");
      setFormData({
        nome: "",
        sobreNome: "",
        endereco: {
          estado: "",
          cidade: "",
          bairro: "",
          rua: "",
          numero: "",
          codigoPostal: "",
          informacoesAdicionais: "",
        },
      });
    });
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Cadastrar Cliente</h2>

      <div className="mb-4">
        <label className="block font-medium">Nome</label>
        <input
          type="text"
          name="nome"
          value={formData.nome}
          onChange={handleChange}
          className="w-full border rounded px-2 py-1"
        />
      </div>

      <div className="mb-4">
        <label className="block font-medium">Sobrenome</label>
        <input
          type="text"
          name="sobreNome"
          value={formData.sobreNome}
          onChange={handleChange}
          className="w-full border rounded px-2 py-1"
        />
      </div>

      <h3 className="text-xl font-bold mt-4 mb-2">Endereço</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block font-medium">Estado</label>
          <input
            type="text"
            name="endereco.estado"
            value={formData.endereco.estado}
            onChange={handleChange}
            className="w-full border rounded px-2 py-1"
          />
        </div>
        <div>
          <label className="block font-medium">Cidade</label>
          <input
            type="text"
            name="endereco.cidade"
            value={formData.endereco.cidade}
            onChange={handleChange}
            className="w-full border rounded px-2 py-1"
          />
        </div>
        <div>
          <label className="block font-medium">Bairro</label>
          <input
            type="text"
            name="endereco.bairro"
            value={formData.endereco.bairro}
            onChange={handleChange}
            className="w-full border rounded px-2 py-1"
          />
        </div>
        <div>
          <label className="block font-medium">Rua</label>
          <input
            type="text"
            name="endereco.rua"
            value={formData.endereco.rua}
            onChange={handleChange}
            className="w-full border rounded px-2 py-1"
          />
        </div>
        <div>
          <label className="block font-medium">Número</label>
          <input
            type="text"
            name="endereco.numero"
            value={formData.endereco.numero}
            onChange={handleChange}
            className="w-full border rounded px-2 py-1"
          />
        </div>
        <div>
          <label className="block font-medium">Código Postal</label>
          <input
            type="text"
            name="endereco.codigoPostal"
            value={formData.endereco.codigoPostal}
            onChange={handleChange}
            className="w-full border rounded px-2 py-1"
          />
        </div>
      </div>
      <div className="mb-4 mt-4">
        <label className="block font-medium">Informações Adicionais</label>
        <textarea
          name="endereco.informacoesAdicionais"
          value={formData.endereco.informacoesAdicionais}
          onChange={handleChange}
          className="w-full border rounded px-2 py-1"
        />
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Cadastrar
      </button>
    </form>
  );
};

export default ClientForm;
