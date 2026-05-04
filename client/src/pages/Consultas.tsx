import { useState, useEffect } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Plus, Edit2, CheckCircle, XCircle, Clock } from "lucide-react";

interface Pet {
  id: string;
  nome: string;
  clienteId: string;
  ativo: boolean;
}

interface Veterinario {
  id: string;
  nome: string;
  ativo: boolean;
}

interface Consulta {
  id: string;
  petId: string;
  veterinarioId: string;
  data: string;
  descricao: string;
  status: "ABERTA" | "FINALIZADA" | "CANCELADA";
  motivoCancelamento?: string;
}

/**
 * Consultas Page - Neo-Playful Modernism
 * Consultation management with status flow
 */
export default function Consultas() {
  const [consultas, setConsultas] = useState<Consulta[]>([]);
  const [pets, setPets] = useState<Pet[]>([]);
  const [veterinarios, setVeterinarios] = useState<Veterinario[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    petId: "",
    veterinarioId: "",
    data: "",
    descricao: "",
  });

  useEffect(() => {
    const savedConsultas = localStorage.getItem("consultas");
    const savedPets = localStorage.getItem("pets");
    const savedVeterinarios = localStorage.getItem("veterinarios");
    if (savedConsultas) setConsultas(JSON.parse(savedConsultas));
    if (savedPets) setPets(JSON.parse(savedPets));
    if (savedVeterinarios) setVeterinarios(JSON.parse(savedVeterinarios));
  }, []);

  const saveConsultas = (updated: Consulta[]) => {
    setConsultas(updated);
    localStorage.setItem("consultas", JSON.stringify(updated));
  };

  const handleAdd = () => {
    if (!formData.petId || !formData.veterinarioId || !formData.data || !formData.descricao.trim()) {
      toast.error("Preencha todos os campos!");
      return;
    }

    if (editingId) {
      const updated = consultas.map((c) =>
        c.id === editingId ? { ...c, ...formData } : c
      );
      saveConsultas(updated);
      toast.success("Consulta atualizada com sucesso!");
    } else {
      const newConsulta: Consulta = {
        id: Date.now().toString(),
        ...formData,
        status: "ABERTA",
      };
      saveConsultas([...consultas, newConsulta]);
      toast.success("Consulta registrada com sucesso!");
    }

    setFormData({ petId: "", veterinarioId: "", data: "", descricao: "" });
    setEditingId(null);
    setIsOpen(false);
  };

  const handleEdit = (consulta: Consulta) => {
    setFormData({
      petId: consulta.petId,
      veterinarioId: consulta.veterinarioId,
      data: consulta.data,
      descricao: consulta.descricao,
    });
    setEditingId(consulta.id);
    setIsOpen(true);
  };

  const handleFinalize = (id: string) => {
    const updated = consultas.map((c) =>
      c.id === id ? { ...c, status: "FINALIZADA" as const } : c
    );
    saveConsultas(updated);
    toast.success("Consulta finalizada!");
  };

  const handleCancel = (id: string) => {
    const updated = consultas.map((c) =>
      c.id === id ? { ...c, status: "CANCELADA" as const, motivoCancelamento: "Cancelada pelo usuário" } : c
    );
    saveConsultas(updated);
    toast.success("Consulta cancelada!");
  };

  const getPetName = (petId: string) => {
    return pets.find((p) => p.id === petId)?.nome || "Pet não encontrado";
  };

  const getVetName = (vetId: string) => {
    return veterinarios.find((v) => v.id === vetId)?.nome || "Veterinário não encontrado";
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ABERTA":
        return { bg: "bg-blue-50", border: "border-blue-300", icon: Clock, color: "text-blue-600" };
      case "FINALIZADA":
        return { bg: "bg-green-50", border: "border-green-300", icon: CheckCircle, color: "text-green-600" };
      case "CANCELADA":
        return { bg: "bg-red-50", border: "border-red-300", icon: XCircle, color: "text-red-600" };
      default:
        return { bg: "bg-gray-50", border: "border-gray-300", icon: Clock, color: "text-gray-600" };
    }
  };

  const abertas = consultas.filter((c) => c.status === "ABERTA");
  const finalizadas = consultas.filter((c) => c.status === "FINALIZADA");
  const canceladas = consultas.filter((c) => c.status === "CANCELADA");

  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Gestão de Consultas</h1>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button
                onClick={() => {
                  setFormData({ petId: "", veterinarioId: "", data: "", descricao: "" });
                  setEditingId(null);
                }}
                className="bg-gradient-to-r from-pink-400 to-pink-500 hover:from-pink-500 hover:to-pink-600 text-white font-bold rounded-lg shadow-lg flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Nova Consulta
              </Button>
            </DialogTrigger>
            <DialogContent className="border-4 border-pink-300">
              <DialogHeader>
                <DialogTitle className="text-2xl text-pink-600">
                  {editingId ? "Editar Consulta" : "Nova Consulta"}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Pet</label>
                  <Select value={formData.petId} onValueChange={(value) => setFormData({ ...formData, petId: value })}>
                    <SelectTrigger className="border-2 border-pink-300 rounded-lg">
                      <SelectValue placeholder="Selecione um pet" />
                    </SelectTrigger>
                    <SelectContent>
                      {pets.filter((p) => p.ativo).map((pet) => (
                        <SelectItem key={pet.id} value={pet.id}>
                          {getPetName(pet.id)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Veterinário</label>
                  <Select value={formData.veterinarioId} onValueChange={(value) => setFormData({ ...formData, veterinarioId: value })}>
                    <SelectTrigger className="border-2 border-pink-300 rounded-lg">
                      <SelectValue placeholder="Selecione um veterinário" />
                    </SelectTrigger>
                    <SelectContent>
                      {veterinarios.filter((v) => v.ativo).map((vet) => (
                        <SelectItem key={vet.id} value={vet.id}>
                          {vet.nome}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Data</label>
                  <Input
                    type="datetime-local"
                    value={formData.data}
                    onChange={(e) => setFormData({ ...formData, data: e.target.value })}
                    className="border-2 border-pink-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Descrição</label>
                  <Input
                    placeholder="Motivo da consulta"
                    value={formData.descricao}
                    onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                    className="border-2 border-pink-300 rounded-lg"
                  />
                </div>
                <Button
                  onClick={handleAdd}
                  className="w-full bg-gradient-to-r from-pink-400 to-pink-500 hover:from-pink-500 hover:to-pink-600 text-white font-bold rounded-lg"
                >
                  {editingId ? "Atualizar" : "Registrar"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Abertas */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <Clock className="w-6 h-6 text-blue-600" />
            Consultas Abertas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {abertas.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500 text-lg">Nenhuma consulta aberta</p>
              </div>
            ) : (
              abertas.map((consulta) => (
                <Card key={consulta.id} className="border-4 border-blue-300 shadow-lg hover:shadow-xl transition-shadow">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 pb-3">
                    <CardTitle className="text-blue-700">{getPetName(consulta.petId)}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="space-y-2 mb-4">
                      <p className="text-sm text-gray-600">
                        <span className="font-semibold">Veterinário:</span> {getVetName(consulta.veterinarioId)}
                      </p>
                      <p className="text-sm text-gray-600">
                        <span className="font-semibold">Data:</span> {new Date(consulta.data).toLocaleString("pt-BR")}
                      </p>
                      <p className="text-sm text-gray-600">
                        <span className="font-semibold">Descrição:</span> {consulta.descricao}
                      </p>
                      <p className="text-sm">
                        <span className="font-semibold text-blue-600">Status:</span> Aberta
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleFinalize(consulta.id)}
                        size="sm"
                        className="flex-1 bg-green-400 hover:bg-green-500 text-white rounded-lg flex items-center justify-center gap-1"
                      >
                        <CheckCircle className="w-4 h-4" />
                        Finalizar
                      </Button>
                      <Button
                        onClick={() => handleCancel(consulta.id)}
                        size="sm"
                        className="flex-1 bg-red-400 hover:bg-red-500 text-white rounded-lg flex items-center justify-center gap-1"
                      >
                        <XCircle className="w-4 h-4" />
                        Cancelar
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>

        {/* Finalizadas */}
        {finalizadas.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <CheckCircle className="w-6 h-6 text-green-600" />
              Consultas Finalizadas
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {finalizadas.map((consulta) => (
                <Card key={consulta.id} className="border-4 border-green-300 shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-green-50 to-green-100 pb-3">
                    <CardTitle className="text-green-700">{getPetName(consulta.petId)}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="space-y-2">
                      <p className="text-sm text-gray-600">
                        <span className="font-semibold">Veterinário:</span> {getVetName(consulta.veterinarioId)}
                      </p>
                      <p className="text-sm text-gray-600">
                        <span className="font-semibold">Data:</span> {new Date(consulta.data).toLocaleString("pt-BR")}
                      </p>
                      <p className="text-sm text-gray-600">
                        <span className="font-semibold">Descrição:</span> {consulta.descricao}
                      </p>
                      <p className="text-sm">
                        <span className="font-semibold text-green-600">Status:</span> Finalizada
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Canceladas */}
        {canceladas.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <XCircle className="w-6 h-6 text-red-600" />
              Consultas Canceladas
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {canceladas.map((consulta) => (
                <Card key={consulta.id} className="border-4 border-red-300 shadow-lg opacity-75">
                  <CardHeader className="bg-gradient-to-r from-red-50 to-red-100 pb-3">
                    <CardTitle className="text-red-700">{getPetName(consulta.petId)}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="space-y-2">
                      <p className="text-sm text-gray-600">
                        <span className="font-semibold">Veterinário:</span> {getVetName(consulta.veterinarioId)}
                      </p>
                      <p className="text-sm text-gray-600">
                        <span className="font-semibold">Data:</span> {new Date(consulta.data).toLocaleString("pt-BR")}
                      </p>
                      <p className="text-sm text-gray-600">
                        <span className="font-semibold">Motivo:</span> {consulta.motivoCancelamento || "Não informado"}
                      </p>
                      <p className="text-sm">
                        <span className="font-semibold text-red-600">Status:</span> Cancelada
                      </p>
                    </div>
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
