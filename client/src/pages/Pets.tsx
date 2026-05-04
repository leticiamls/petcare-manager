import { useState, useEffect } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Plus, Edit2, Trash2 } from "lucide-react";

interface Cliente {
  id: string;
  nome: string;
  cpf: string;
  ativo: boolean;
}

interface Pet {
  id: string;
  nome: string;
  tipo: string;
  idade: number;
  clienteId: string;
  ativo: boolean;
}

/**
 * Pets Page - Neo-Playful Modernism
 * Pet management linked to clients
 */
export default function Pets() {
  const [pets, setPets] = useState<Pet[]>([]);
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ nome: "", tipo: "", idade: "", clienteId: "" });

  useEffect(() => {
    const savedPets = localStorage.getItem("pets");
    const savedClientes = localStorage.getItem("clientes");
    if (savedPets) setPets(JSON.parse(savedPets));
    if (savedClientes) setClientes(JSON.parse(savedClientes));
  }, []);

  const savePets = (updated: Pet[]) => {
    setPets(updated);
    localStorage.setItem("pets", JSON.stringify(updated));
  };

  const handleAdd = () => {
    if (!formData.nome.trim() || !formData.tipo.trim() || !formData.idade.trim() || !formData.clienteId) {
      toast.error("Preencha todos os campos!");
      return;
    }

    if (editingId) {
      const updated = pets.map((p) =>
        p.id === editingId ? { ...p, ...formData, idade: parseInt(formData.idade) } : p
      );
      savePets(updated);
      toast.success("Pet atualizado com sucesso!");
    } else {
      const newPet: Pet = {
        id: Date.now().toString(),
        nome: formData.nome,
        tipo: formData.tipo,
        idade: parseInt(formData.idade),
        clienteId: formData.clienteId,
        ativo: true,
      };
      savePets([...pets, newPet]);
      toast.success("Pet cadastrado com sucesso!");
    }

    setFormData({ nome: "", tipo: "", idade: "", clienteId: "" });
    setEditingId(null);
    setIsOpen(false);
  };

  const handleEdit = (pet: Pet) => {
    setFormData({
      nome: pet.nome,
      tipo: pet.tipo,
      idade: pet.idade.toString(),
      clienteId: pet.clienteId,
    });
    setEditingId(pet.id);
    setIsOpen(true);
  };

  const handleDelete = (id: string) => {
    const updated = pets.map((p) =>
      p.id === id ? { ...p, ativo: false } : p
    );
    savePets(updated);
    toast.success("Pet inativado!");
  };

  const handleReactivate = (id: string) => {
    const updated = pets.map((p) =>
      p.id === id ? { ...p, ativo: true } : p
    );
    savePets(updated);
    toast.success("Pet reativado!");
  };

  const getClienteName = (clienteId: string) => {
    return clientes.find((c) => c.id === clienteId)?.nome || "Cliente não encontrado";
  };

  const activePets = pets.filter((p) => p.ativo);
  const inactivePets = pets.filter((p) => !p.ativo);

  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Gestão de Pets</h1>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button
                onClick={() => {
                  setFormData({ nome: "", tipo: "", idade: "", clienteId: "" });
                  setEditingId(null);
                }}
                className="bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 text-white font-bold rounded-lg shadow-lg flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Novo Pet
              </Button>
            </DialogTrigger>
            <DialogContent className="border-4 border-green-300">
              <DialogHeader>
                <DialogTitle className="text-2xl text-green-600">
                  {editingId ? "Editar Pet" : "Novo Pet"}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Cliente</label>
                  <Select value={formData.clienteId} onValueChange={(value) => setFormData({ ...formData, clienteId: value })}>
                    <SelectTrigger className="border-2 border-green-300 rounded-lg">
                      <SelectValue placeholder="Selecione um cliente" />
                    </SelectTrigger>
                    <SelectContent>
                      {clientes.filter((c) => c.ativo).map((cliente) => (
                        <SelectItem key={cliente.id} value={cliente.id}>
                          {cliente.nome}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Nome</label>
                  <Input
                    placeholder="Nome do pet"
                    value={formData.nome}
                    onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                    className="border-2 border-green-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Tipo</label>
                  <Select value={formData.tipo} onValueChange={(value) => setFormData({ ...formData, tipo: value })}>
                    <SelectTrigger className="border-2 border-green-300 rounded-lg">
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Cachorro">Cachorro</SelectItem>
                      <SelectItem value="Gato">Gato</SelectItem>
                      <SelectItem value="Coelho">Coelho</SelectItem>
                      <SelectItem value="Hamster">Hamster</SelectItem>
                      <SelectItem value="Pássaro">Pássaro</SelectItem>
                      <SelectItem value="Outro">Outro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Idade (anos)</label>
                  <Input
                    type="number"
                    placeholder="0"
                    value={formData.idade}
                    onChange={(e) => setFormData({ ...formData, idade: e.target.value })}
                    className="border-2 border-green-300 rounded-lg"
                  />
                </div>
                <Button
                  onClick={handleAdd}
                  className="w-full bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 text-white font-bold rounded-lg"
                >
                  {editingId ? "Atualizar" : "Cadastrar"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Active Pets */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Pets Ativos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activePets.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500 text-lg">Nenhum pet cadastrado</p>
              </div>
            ) : (
              activePets.map((pet) => (
                <Card key={pet.id} className="border-4 border-green-300 shadow-lg hover:shadow-xl transition-shadow">
                  <CardHeader className="bg-gradient-to-r from-green-50 to-green-100 pb-3">
                    <CardTitle className="text-green-700">{pet.nome}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="space-y-2 mb-4">
                      <p className="text-sm text-gray-600">
                        <span className="font-semibold">Tipo:</span> {pet.tipo}
                      </p>
                      <p className="text-sm text-gray-600">
                        <span className="font-semibold">Idade:</span> {pet.idade} anos
                      </p>
                      <p className="text-sm text-gray-600">
                        <span className="font-semibold">Cliente:</span> {getClienteName(pet.clienteId)}
                      </p>
                      <p className="text-sm">
                        <span className="font-semibold text-green-600">Status:</span> Ativo
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleEdit(pet)}
                        size="sm"
                        className="flex-1 bg-blue-400 hover:bg-blue-500 text-white rounded-lg flex items-center justify-center gap-1"
                      >
                        <Edit2 className="w-4 h-4" />
                        Editar
                      </Button>
                      <Button
                        onClick={() => handleDelete(pet.id)}
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
        </div>

        {/* Inactive Pets */}
        {inactivePets.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Pets Inativos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {inactivePets.map((pet) => (
                <Card key={pet.id} className="border-4 border-gray-300 shadow-lg opacity-75">
                  <CardHeader className="bg-gray-100 pb-3">
                    <CardTitle className="text-gray-600">{pet.nome}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="space-y-2 mb-4">
                      <p className="text-sm text-gray-600">
                        <span className="font-semibold">Tipo:</span> {pet.tipo}
                      </p>
                      <p className="text-sm text-gray-600">
                        <span className="font-semibold">Idade:</span> {pet.idade} anos
                      </p>
                      <p className="text-sm text-gray-600">
                        <span className="font-semibold">Cliente:</span> {getClienteName(pet.clienteId)}
                      </p>
                      <p className="text-sm">
                        <span className="font-semibold text-red-600">Status:</span> Inativo
                      </p>
                    </div>
                    <Button
                      onClick={() => handleReactivate(pet.id)}
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
