import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Users, PawPrint, Stethoscope, Calendar, LogOut } from "lucide-react";

/**
 * Sidebar Navigation - Neo-Playful Modernism
 * Colorful borders, rounded corners, clear hierarchy
 */
export default function Sidebar() {
  const [location, setLocation] = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("user");
    setLocation("/login");
  };

  const navItems = [
    { path: "/dashboard", label: "Dashboard", icon: PawPrint, color: "from-blue-400 to-blue-500" },
    { path: "/clientes", label: "Clientes", icon: Users, color: "from-yellow-400 to-yellow-500" },
    { path: "/pets", label: "Pets", icon: PawPrint, color: "from-green-400 to-green-500" },
    { path: "/veterinarios", label: "Veterinários", icon: Stethoscope, color: "from-orange-400 to-orange-500" },
    { path: "/consultas", label: "Consultas", icon: Calendar, color: "from-pink-400 to-pink-500" },
  ];

  return (
    <aside className="w-64 bg-white border-r-4 border-blue-300 shadow-lg h-screen flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b-4 border-blue-300">
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-gradient-to-br from-blue-400 to-pink-400 p-3 rounded-full">
            <PawPrint className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-blue-600">PetCare</h1>
        </div>
        <p className="text-xs text-gray-500 ml-12">Manager</p>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location === item.path;
          
          return (
            <button
              key={item.path}
              onClick={() => setLocation(item.path)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-semibold transition-all transform hover:scale-105 ${
                isActive
                  ? `bg-gradient-to-r ${item.color} text-white shadow-lg`
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t-4 border-blue-300">
        <Button
          onClick={handleLogout}
          variant="outline"
          className="w-full flex items-center gap-2 border-2 border-red-300 text-red-600 hover:bg-red-50 rounded-lg font-semibold"
        >
          <LogOut className="w-4 h-4" />
          Sair
        </Button>
      </div>
    </aside>
  );
}
