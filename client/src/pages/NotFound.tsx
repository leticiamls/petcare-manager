import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { PawPrint } from "lucide-react";

/**
 * NotFound Page - 404 Error
 * Neo-Playful Modernism Design
 */
export default function NotFound() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-yellow-50 flex items-center justify-center p-4">
      {/* Background decorative elements */}
      <div className="absolute top-10 left-10 w-20 h-20 rounded-full bg-yellow-300/20 blur-2xl"></div>
      <div className="absolute bottom-20 right-20 w-32 h-32 rounded-full bg-pink-300/20 blur-2xl"></div>

      <div className="text-center relative z-10">
        <div className="flex justify-center mb-6">
          <div className="bg-gradient-to-br from-blue-400 to-pink-400 p-6 rounded-full">
            <PawPrint className="w-16 h-16 text-white" />
          </div>
        </div>
        <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
        <p className="text-2xl text-gray-600 mb-2">Página não encontrada</p>
        <p className="text-gray-500 mb-8">Desculpe, a página que você está procurando não existe.</p>
        <Button
          onClick={() => setLocation("/dashboard")}
          className="bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white font-bold py-3 px-8 rounded-lg text-lg shadow-lg transform hover:scale-105 transition-transform"
        >
          Voltar ao Dashboard
        </Button>
      </div>
    </div>
  );
}
