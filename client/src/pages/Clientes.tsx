import { useState, useEffect } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Plus, Edit2, Trash2, Search } from "lucide-react";

interface Cliente {
  id: string;
  nome: string;
  cpf: string;
  telefone: string;
  ativo: boolean;
}

/**
 * Clientes Page - Neo-Playful Modernism
 * CRUD operations with colorful cards and dialogs
 */
export default function Clientes() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [filtro, setFiltro] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ nome: "", cpf: "", telefone: "" });

  useEffect(() => {
    const saved = localStorage.getItem("clientes");
    if (saved) setClientes(JSON.parse(saved));
  }, []);

  const saveClientes = (updated: Cliente[]) => {
    setClientes(updated);
    localStorage.setItem("clientes", JSON.stringify(updated));
  };

  const handleAdd = () => {
    if (!formData.nome.trim() || !formData.cpf.trim() || !formData.telefone.trim()) {
      toast.error("Preencha todos os campos!");
      return;
    }

    // Check CPF uniqueness
    if (clientes.some((c) => c.cpf === formData.cpf && c.id !== editingId)) {
      toast.error("CPF já cadastrado!");
      return;
    }

    if (editingId) {
      const updated = clientes.map((c) =>
        c.id === editingId ? { ...c, ...formData } : c
      );
      saveClientes(updated);
      toast.success("Cliente atualizado com sucesso!");
    } else {
      const newCliente: Cliente = {
        id: Date.now().toString(),
        ...formData,
        ativo: true,
      };
      saveClientes([...clientes, newCliente]);
      toast.success("Cliente cadastrado com sucesso!");
    }

    setFormData({ nome: "", cpf: "", telefone: "" });
    setEditingId(null);
    setIsOpen(false);
  };

  const handleEdit = (cliente: Cliente) => {
    setFormData({ nome: cliente.nome, cpf: cliente.cpf, telefone: cliente.telefone });
    setEditingId(cliente.id);
    setIsOpen(true);
  };

  const handleDelete = (id: string) => {
    const updated = clientes.map((c) =>
      c.id === id ? { ...c, ativo: false } : c
    );
    saveClientes(updated);
    toast.success("Cliente inativado!");
  };

  const handleReactivate = (id: string) => {
    const updated = clientes.map((c) =>
      c.id === id ? { ...c, ativo: true } : c
    );
    saveClientes(updated);
    toast.success("Cliente reativado!");
  };

  const filteredClientes = clientes.filter((c) =>
    c.cpf.includes(filtro) && c.ativo
  );

  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Gestão de Clientes</h1>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button
                onClick={() => {
                  setFormData({ nome: "", cpf: "", telefone: "" });
                  setEditingId(null);
                }}
                className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-white font-bold rounded-lg shadow-lg flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Novo Cliente
              </Button>
            </DialogTrigger>
            <DialogContent className="border-4 border-yellow-300">
              <DialogHeader>
                <DialogTitle className="text-2xl text-yellow-600">
                  {editingId ? "Editar Cliente" : "Novo Cliente"}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Nome</label>
                  <Input
                    placeholder="Nome do cliente"
                    value={formData.nome}
                    onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                    className="border-2 border-yellow-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">CPF</label>
                  <Input
                    placeholder="000.000.000-00"
                    value={formData.cpf}
                    onChange={(e) => setFormData({ ...formData, cpf: e.target.value })}
                    disabled={!!editingId}
                    className="border-2 border-yellow-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Telefone</label>
                  <Input
                    placeholder="(11) 99999-9999"
                    value={formData.telefone}
                    onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                    className="border-2 border-yellow-300 rounded-lg"
                  />
                </div>
                <Button
                  onClick={handleAdd}
                  className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-white font-bold rounded-lg"
                >
                  {editingId ? "Atualizar" : "Cadastrar"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Search */}
        <div className="mb-6 flex gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <Input
              placeholder="Buscar por CPF..."
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
              className="pl-10 border-2 border-yellow-300 rounded-lg"
            />
          </div>
        </div>

        {/* Clients Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClientes.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500 text-lg">Nenhum cliente cadastrado</p>
            </div>
          ) : (
            filteredClientes.map((cliente) => (
              <Card key={cliente.id} className="border-4 border-yellow-300 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader className="bg-gradient-to-r from-yellow-50 to-yellow-100 pb-3">
                  <CardTitle className="text-yellow-700">{cliente.nome}</CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="space-y-2 mb-4">
                    <p className="text-sm text-gray-600">
                      <span className="font-semibold">CPF:</span> {cliente.cpf}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-semibold">Telefone:</span> {cliente.telefone}
                    </p>
                    <p className="text-sm">
                      <span className="font-semibold text-green-600">Status:</span> Ativo
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleEdit(cliente)}
                      size="sm"
                      className="flex-1 bg-blue-400 hover:bg-blue-500 text-white rounded-lg flex items-center justify-center gap-1"
                    >
                      <Edit2 className="w-4 h-4" />
                      Editar
                    </Button>
                    <Button
                      onClick={() => handleDelete(cliente.id)}
                      size="sm"
                      className="flex-1 bg-red-400 hover:bg-red-500 text-white rounded-lg flex items-center justify-center gap-1"
                    >
                      <Trash2 className="w-4 h-4" />
                      Inativar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Inactive Clients */}
        {clientes.some((c) => !c.ativo) && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Clientes Inativos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {clientes.filter((c) => !c.ativo).map((cliente) => (
                <Card key={cliente.id} className="border-4 border-gray-300 shadow-lg opacity-75">
                  <CardHeader className="bg-gray-100 pb-3">
                    <CardTitle className="text-gray-600">{cliente.nome}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="space-y-2 mb-4">
                      <p className="text-sm text-gray-600">
                        <span className="font-semibold">CPF:</span> {cliente.cpf}
                      </p>
                      <p className="text-sm text-gray-600">
                        <span className="font-semibold">Telefone:</span> {cliente.telefone}
                      </p>
                      <p className="text-sm">
                        <span className="font-semibold text-red-600">Status:</span> Inativo
                      </p>
                    </div>
                    <Button
                      onClick={() => handleReactivate(cliente.id)}
                      size="sm"
                      className="w-full bg-green-400 hover:bg-green-500 text-white rounded-lg"
                    >
                      Reativar
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
