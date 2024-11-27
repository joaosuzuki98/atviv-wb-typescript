import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../services/api";

interface Client {
  id: number;
  nome: string;
  sobrenome: string;
  endereco: {
    estado: string;
    cidade: string;
    bairro: string;
    rua: string;
    numero: string;
    codigoPostal: string;
    informacoesAdicionais: string;
  };
}

const ClientDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [client, setClient] = useState<Client | null>(null);

  useEffect(() => {
    axios.get(`/cliente/${id}`).then((response) => setClient(response.data));
  }, [id]);

  if (!client) return <p>Carregando...</p>;

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Detalhes do Cliente</h2>
      <p><span className="font-bold">Nome:</span> {client.nome} {client.sobrenome}</p>
      
      <h3 className="text-xl font-bold mt-4 mb-2">Endereço</h3>
      <p><span className="font-bold">Rua:</span> {client.endereco.rua}, {client.endereco.numero}</p>
      <p><span className="font-bold">Bairro:</span> {client.endereco.bairro}</p>
      <p><span className="font-bold">Cidade:</span> {client.endereco.cidade}</p>
      <p><span className="font-bold">Estado:</span> {client.endereco.estado}</p>
      <p><span className="font-bold">CEP:</span> {client.endereco.codigoPostal}</p>
      {client.endereco.informacoesAdicionais && (
        <p><span className="font-bold">Informações Adicionais:</span> {client.endereco.informacoesAdicionais}</p>
      )}
    </div>
  );
};

export default ClientDetails;
