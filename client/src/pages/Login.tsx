import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { login as apiLogin } from "@/lib/api";
import { toast } from "sonner";
import { AlertCircle, PawPrint } from "lucide-react";

/**
 * Login Page - Neo-Playful Modernism
 * JWT Authentication with Backend Integration
 */
export default function Login() {
  const [, setLocation] = useLocation();
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!username || !password) {
      setError("Preencha usuário e senha");
      return;
    }

    setIsLoading(true);
    try {
      const response = await apiLogin(username, password);
      login(
        {
          username: response.username,
          role: response.role,
        },
        response.token
      );
      toast.success("Login realizado com sucesso!");
      setLocation("/");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Erro ao fazer login";
      setError(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
      {/* Background decorative elements */}
      <div className="absolute top-10 left-10 w-20 h-20 rounded-full bg-yellow-300/20 blur-2xl"></div>
      <div className="absolute bottom-20 right-20 w-32 h-32 rounded-full bg-pink-300/20 blur-2xl"></div>
      <div className="absolute top-1/2 left-1/4 w-24 h-24 rounded-full bg-green-300/20 blur-2xl"></div>

      <div className="w-full max-w-md relative z-10">
        {/* Card Principal */}
        <div className="bg-white rounded-3xl border-4 border-blue-300 shadow-2xl p-8">
          {/* Logo e Título */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center shadow-lg">
              <PawPrint className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
              PetCare Manager
            </h1>
            <p className="text-gray-600 font-medium">Gerencie seus pets com carinho</p>
          </div>

          {/* Formulário */}
          <form onSubmit={handleLogin} className="space-y-5">
            {/* Usuário */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Usuário
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Digite seu usuário"
                className="w-full px-4 py-3 border-2 border-blue-300 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                disabled={isLoading}
              />
            </div>

            {/* Senha */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Senha
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Digite sua senha"
                className="w-full px-4 py-3 border-2 border-blue-300 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                disabled={isLoading}
              />
            </div>

            {/* Erro */}
            {error && (
              <div className="bg-red-50 border-2 border-red-300 rounded-xl p-3 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-700 font-medium">{error}</p>
              </div>
            )}

            {/* Botão Entrar */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-3 rounded-xl shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Entrando..." : "Entrar"}
            </Button>
          </form>

          {/* Info Demo */}
          <div className="mt-6 p-4 bg-yellow-50 border-2 border-yellow-300 rounded-xl">
            <p className="text-xs text-yellow-800 font-semibold mb-2">📝 Credenciais de Demo:</p>
            <p className="text-xs text-yellow-700">
              <strong>Usuário:</strong> admin / vet
            </p>
            <p className="text-xs text-yellow-700">
              <strong>Senha:</strong> senha123
            </p>
          </div>

          {/* Links */}
          <div className="mt-6 text-center space-y-2">
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors">
              Esqueceu a senha?
            </button>
          </div>
        </div>

        {/* Rodapé */}
        <p className="text-center text-gray-600 text-xs mt-6">
          Backend: <span className="font-mono text-gray-700">http://localhost:8080</span>
        </p>
      </div>
    </div>
  );
}
