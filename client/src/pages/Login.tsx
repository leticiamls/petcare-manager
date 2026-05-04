import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { PawPrint } from "lucide-react";

/**
 * Login Page - Neo-Playful Modernism Design
 * Vibrant colors, rounded corners, friendly typography
 */
export default function Login() {
  const [, setLocation] = useLocation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username.trim() || !password.trim()) {
      toast.error("Preencha todos os campos!");
      return;
    }

    setIsLoading(true);
    
    // Simular autenticação
    setTimeout(() => {
      localStorage.setItem("user", JSON.stringify({ username, isAuthenticated: true }));
      toast.success(`Bem-vindo, ${username}!`);
      setLocation("/dashboard");
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-yellow-50 flex items-center justify-center p-4">
      {/* Background decorative elements */}
      <div className="absolute top-10 left-10 w-20 h-20 rounded-full bg-yellow-300/20 blur-2xl"></div>
      <div className="absolute bottom-20 right-20 w-32 h-32 rounded-full bg-pink-300/20 blur-2xl"></div>
      <div className="absolute top-1/2 left-1/4 w-24 h-24 rounded-full bg-green-300/20 blur-2xl"></div>

      <Card className="w-full max-w-md shadow-2xl border-4 border-blue-300 relative z-10">
        <CardHeader className="text-center pb-2">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-br from-blue-400 to-pink-400 p-4 rounded-full">
              <PawPrint className="w-8 h-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-3xl text-blue-600">PetCare Manager</CardTitle>
          <CardDescription className="text-lg text-gray-600 mt-2">
            Gerencie seus pets com carinho
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Usuário
              </label>
              <Input
                type="text"
                placeholder="Digite seu usuário"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="border-2 border-blue-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base"
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Senha
              </label>
              <Input
                type="password"
                placeholder="Digite sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border-2 border-blue-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base"
                disabled={isLoading}
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white font-bold py-3 rounded-lg text-base shadow-lg transform hover:scale-105 transition-transform"
            >
              {isLoading ? "Entrando..." : "Entrar"}
            </Button>
          </form>

          <div className="mt-6 p-4 bg-yellow-50 border-2 border-yellow-300 rounded-lg">
            <p className="text-sm text-gray-600 text-center">
              <span className="font-semibold text-yellow-600">Demo:</span> Use qualquer usuário e senha
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
