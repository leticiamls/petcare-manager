import { useState, useEffect } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, PawPrint, Stethoscope, Calendar } from "lucide-react";

/**
 * Dashboard Page - Neo-Playful Modernism
 * Hero section with stats cards in vibrant colors
 */
export default function Dashboard() {
  const [stats, setStats] = useState({
    clientes: 0,
    pets: 0,
    veterinarios: 0,
    consultas: 0,
  });

  useEffect(() => {
    // Load data from localStorage
    const clientes = JSON.parse(localStorage.getItem("clientes") || "[]");
    const pets = JSON.parse(localStorage.getItem("pets") || "[]");
    const veterinarios = JSON.parse(localStorage.getItem("veterinarios") || "[]");
    const consultas = JSON.parse(localStorage.getItem("consultas") || "[]");

    setStats({
      clientes: clientes.length,
      pets: pets.length,
      veterinarios: veterinarios.length,
      consultas: consultas.length,
    });
  }, []);

  const statCards = [
    {
      title: "Clientes",
      value: stats.clientes,
      icon: Users,
      color: "from-yellow-400 to-yellow-500",
      borderColor: "border-yellow-300",
    },
    {
      title: "Pets",
      value: stats.pets,
      icon: PawPrint,
      color: "from-green-400 to-green-500",
      borderColor: "border-green-300",
    },
    {
      title: "Veterinários",
      value: stats.veterinarios,
      icon: Stethoscope,
      color: "from-orange-400 to-orange-500",
      borderColor: "border-orange-300",
    },
    {
      title: "Consultas",
      value: stats.consultas,
      icon: Calendar,
      color: "from-pink-400 to-pink-500",
      borderColor: "border-pink-300",
    },
  ];

  return (
    <DashboardLayout>
      <div className="p-8">
        {/* Hero Section */}
        <div className="mb-12 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border-4 border-blue-300 shadow-lg">
          <h1 className="text-4xl font-bold text-blue-600 mb-2">Bem-vindo ao PetCare Manager!</h1>
          <p className="text-gray-600 text-lg">Gerencie seus clientes, pets, veterinários e consultas com facilidade.</p>
          <div
            className="mt-6 h-48 bg-cover bg-center rounded-xl"
            style={{
              backgroundImage: "url(https://d2xsxph8kpxj0f.cloudfront.net/310519663076381965/VGnY88dkwwEv57pHbWoW9y/hero-dashboard-UuwZwtXRDWj9392y4PfHmm.webp)",
            }}
          ></div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card
                key={stat.title}
                className={`border-4 ${stat.borderColor} shadow-lg hover:shadow-xl transition-shadow transform hover:scale-105`}
              >
                <CardHeader className="pb-3">
                  <div className={`bg-gradient-to-br ${stat.color} p-3 rounded-full w-fit mb-2`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-gray-700">{stat.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold text-gray-800">{stat.value}</div>
                  <p className="text-sm text-gray-500 mt-2">Total registrado</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Atalhos Rápidos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: "Novo Cliente", color: "from-yellow-400 to-yellow-500", icon: Users },
              { title: "Novo Pet", color: "from-green-400 to-green-500", icon: PawPrint },
              { title: "Novo Veterinário", color: "from-orange-400 to-orange-500", icon: Stethoscope },
              { title: "Nova Consulta", color: "from-pink-400 to-pink-500", icon: Calendar },
            ].map((action) => {
              const Icon = action.icon;
              return (
                <button
                  key={action.title}
                  className={`bg-gradient-to-br ${action.color} text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all flex items-center justify-center gap-2`}
                >
                  <Icon className="w-5 h-5" />
                  {action.title}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
