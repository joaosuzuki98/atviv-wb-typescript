import React, { useEffect, useState } from "react";
import axios from "../services/api";
import { Link } from "react-router-dom";

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

const ClientList: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    axios
      .get("/clientes")
      .then((response) => setClients(response.data))
      .catch((error) => {
        console.error("Erro ao buscar clientes:", error);
      });
  }, []);

  const handleDelete = (id: number) => {
    axios
      .delete("/cliente/excluir", {
        data: { id },
      })
      .then(() => {
        setClients((prevClients) =>
          prevClients.filter((client) => client.id !== id)
        );
      })
      .catch((error) => {
        console.error("Erro ao excluir cliente:", error);
        if (error.response && error.response.status === 400) {
          alert("Erro: Cliente não encontrado!");
        } else {
          alert("Erro ao processar a solicitação.");
        }
      });
  };

  const handleEditClick = (client: Client) => {
    setSelectedClient(client);
    setModalOpen(true); // Abre o modal
  };

  const handleCloseModal = () => {
    setModalOpen(false); // Fecha o modal
  };

  const handleUpdateClient = () => {
    if (selectedClient) {
      axios
        .put("/cliente/atualizar", selectedClient)
        .then((response) => {
          setClients((prevClients) =>
            prevClients.map((client) =>
              client.id === selectedClient?.id ? selectedClient : client
            )
          );
          setModalOpen(false); // Fecha o modal após atualizar
          alert("Cliente atualizado com sucesso!");
        })
        .catch((error) => {
          console.error("Erro ao atualizar cliente:", error);
          alert("Erro ao atualizar cliente.");
        });
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Lista de Clientes</h2>
      {clients.length === 0 ? (
        <p className="text-gray-500">Nenhum cliente cadastrado no momento.</p>
      ) : (
        <ul className="bg-white rounded-lg shadow-md divide-y divide-gray-200">
          {clients.map((client) => (
            <li key={client.id} className="p-4 flex justify-between items-center">
              <div>
                <p className="font-bold text-lg">
                  {client.nome} {client.sobrenome}
                </p>
                <p className="text-sm text-gray-600">
                  {client.endereco.rua}, {client.endereco.numero} - {client.endereco.bairro}, {client.endereco.cidade}, {client.endereco.estado} - CEP: {client.endereco.codigoPostal}
                </p>
                {client.endereco.informacoesAdicionais && (
                  <p className="text-sm italic text-gray-500">
                    {client.endereco.informacoesAdicionais}
                  </p>
                )}
              </div>
              <div>
                <Link
                  to={`/cliente/${client.id}`}
                  className="mr-2 text-blue-500 hover:underline"
                >
                  Ver
                </Link>
                <button
                  onClick={() => handleEditClick(client)}
                  className="mr-2 text-yellow-500 hover:underline"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(client.id)}
                  className="text-red-500 hover:underline"
                >
                  Excluir
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Modal para editar cliente */}
      {modalOpen && selectedClient && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-2xl font-bold mb-4">Editar Cliente</h3>

            <div className="mb-4">
              <label className="block font-medium">Nome</label>
              <input
                type="text"
                value={selectedClient.nome}
                onChange={(e) =>
                  setSelectedClient({ ...selectedClient, nome: e.target.value })
                }
                className="w-full border rounded px-2 py-1"
              />
            </div>

            <div className="mb-4">
              <label className="block font-medium">Sobrenome</label>
              <input
                type="text"
                value={selectedClient.sobrenome}
                onChange={(e) =>
                  setSelectedClient({ ...selectedClient, sobrenome: e.target.value })
                }
                className="w-full border rounded px-2 py-1"
              />
            </div>

            {/* Endereço */}
            <h4 className="text-lg font-bold">Endereço</h4>
            <div className="mb-4">
              <label className="block font-medium">Rua</label>
              <input
                type="text"
                value={selectedClient.endereco.rua}
                onChange={(e) =>
                  setSelectedClient({
                    ...selectedClient,
                    endereco: { ...selectedClient.endereco, rua: e.target.value },
                  })
                }
                className="w-full border rounded px-2 py-1"
              />
            </div>

            <div className="mb-4">
              <label className="block font-medium">Cidade</label>
              <input
                type="text"
                value={selectedClient.endereco.cidade}
                onChange={(e) =>
                  setSelectedClient({
                    ...selectedClient,
                    endereco: { ...selectedClient.endereco, cidade: e.target.value },
                  })
                }
                className="w-full border rounded px-2 py-1"
              />
            </div>

            <div className="mb-4">
              <label className="block font-medium">Estado</label>
              <input
                type="text"
                value={selectedClient.endereco.estado}
                onChange={(e) =>
                  setSelectedClient({
                    ...selectedClient,
                    endereco: { ...selectedClient.endereco, estado: e.target.value },
                  })
                }
                className="w-full border rounded px-2 py-1"
              />
            </div>

            <div className="mb-4">
              <label className="block font-medium">CEP</label>
              <input
                type="text"
                value={selectedClient.endereco.codigoPostal}
                onChange={(e) =>
                  setSelectedClient({
                    ...selectedClient,
                    endereco: { ...selectedClient.endereco, codigoPostal: e.target.value },
                  })
                }
                className="w-full border rounded px-2 py-1"
              />
            </div>

            <div className="flex justify-between">
              <button
                onClick={handleCloseModal}
                className="bg-gray-300 px-4 py-2 rounded"
              >
                Cancelar
              </button>
              <button
                onClick={handleUpdateClient}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Atualizar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientList;
