import { useState, useEffect } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Plus, Edit2, Trash2 } from "lucide-react";

interface Veterinario {
  id: string;
  nome: string;
  crmv: string;
  telefone: string;
  ativo: boolean;
}

/**
 * Veterinarios Page - Neo-Playful Modernism
 * Veterinarian management
 */
export default function Veterinarios() {
  const [veterinarios, setVeterinarios] = useState<Veterinario[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ nome: "", crmv: "", telefone: "" });

  useEffect(() => {
    const saved = localStorage.getItem("veterinarios");
    if (saved) setVeterinarios(JSON.parse(saved));
  }, []);

  const saveVeterinarios = (updated: Veterinario[]) => {
    setVeterinarios(updated);
    localStorage.setItem("veterinarios", JSON.stringify(updated));
  };

  const handleAdd = () => {
    if (!formData.nome.trim() || !formData.telefone.trim()) {
      toast.error("Preencha todos os campos!");
      return;
    }

    if (editingId) {
      const updated = veterinarios.map((v) =>
        v.id === editingId ? { ...v, ...formData } : v
      );
      saveVeterinarios(updated);
      toast.success("Veterinário atualizado com sucesso!");
    } else {
      const newVeterinario: Veterinario = {
        id: Date.now().toString(),
        ...formData,
        ativo: true,
      };
      saveVeterinarios([...veterinarios, newVeterinario]);
      toast.success("Veterinário cadastrado com sucesso!");
    }

    setFormData({ nome: "", crmv: "", telefone: "" });
    setEditingId(null);
    setIsOpen(false);
  };

  const handleEdit = (vet: Veterinario) => {
    setFormData({ nome: vet.nome, crmv: vet.crmv, telefone: vet.telefone });
    setEditingId(vet.id);
    setIsOpen(true);
  };

  const handleDelete = (id: string) => {
    const updated = veterinarios.map((v) =>
      v.id === id ? { ...v, ativo: false } : v
    );
    saveVeterinarios(updated);
    toast.success("Veterinário inativado!");
  };

  const handleReactivate = (id: string) => {
    const updated = veterinarios.map((v) =>
      v.id === id ? { ...v, ativo: true } : v
    );
    saveVeterinarios(updated);
    toast.success("Veterinário reativado!");
  };

  const activeVets = veterinarios.filter((v) => v.ativo);
  const inactiveVets = veterinarios.filter((v) => !v.ativo);

  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Gestão de Veterinários</h1>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button
                onClick={() => {
                  setFormData({ nome: "", crmv: "", telefone: "" });
                  setEditingId(null);
                }}
                className="bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white font-bold rounded-lg shadow-lg flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Novo Veterinário
              </Button>
            </DialogTrigger>
            <DialogContent className="border-4 border-orange-300">
              <DialogHeader>
                <DialogTitle className="text-2xl text-orange-600">
                  {editingId ? "Editar Veterinário" : "Novo Veterinário"}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Nome</label>
                  <Input
                    placeholder="Nome do veterinário"
                    value={formData.nome}
                    onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                    className="border-2 border-orange-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">CRMV</label>
                  <Input
                    placeholder="Número do CRMV (opcional)"
                    value={formData.crmv}
                    onChange={(e) => setFormData({ ...formData, crmv: e.target.value })}
                    className="border-2 border-orange-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Telefone</label>
                  <Input
                    placeholder="(11) 99999-9999"
                    value={formData.telefone}
                    onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                    className="border-2 border-orange-300 rounded-lg"
                  />
                </div>
                <Button
                  onClick={handleAdd}
                  className="w-full bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white font-bold rounded-lg"
                >
                  {editingId ? "Atualizar" : "Cadastrar"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Active Veterinarians */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Veterinários Ativos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeVets.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500 text-lg">Nenhum veterinário cadastrado</p>
              </div>
            ) : (
              activeVets.map((vet) => (
                <Card key={vet.id} className="border-4 border-orange-300 shadow-lg hover:shadow-xl transition-shadow">
                  <CardHeader className="bg-gradient-to-r from-orange-50 to-orange-100 pb-3">
                    <CardTitle className="text-orange-700">{vet.nome}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="space-y-2 mb-4">
                      <p className="text-sm text-gray-600">
                        <span className="font-semibold">CRMV:</span> {vet.crmv || "Não informado"}
                      </p>
                      <p className="text-sm text-gray-600">
                        <span className="font-semibold">Telefone:</span> {vet.telefone}
                      </p>
                      <p className="text-sm">
                        <span className="font-semibold text-green-600">Status:</span> Ativo
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleEdit(vet)}
                        size="sm"
                        className="flex-1 bg-blue-400 hover:bg-blue-500 text-white rounded-lg flex items-center justify-center gap-1"
                      >
                        <Edit2 className="w-4 h-4" />
                        Editar
                      </Button>
                      <Button
                        onClick={() => handleDelete(vet.id)}
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

        {/* Inactive Veterinarians */}
        {inactiveVets.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Veterinários Inativos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {inactiveVets.map((vet) => (
                <Card key={vet.id} className="border-4 border-gray-300 shadow-lg opacity-75">
                  <CardHeader className="bg-gray-100 pb-3">
                    <CardTitle className="text-gray-600">{vet.nome}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="space-y-2 mb-4">
                      <p className="text-sm text-gray-600">
                        <span className="font-semibold">CRMV:</span> {vet.crmv || "Não informado"}
                      </p>
                      <p className="text-sm text-gray-600">
                        <span className="font-semibold">Telefone:</span> {vet.telefone}
                      </p>
                      <p className="text-sm">
                        <span className="font-semibold text-red-600">Status:</span> Inativo
                      </p>
                    </div>
                    <Button
                      onClick={() => handleReactivate(vet.id)}
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
