import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch, useLocation } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Clientes from "./pages/Clientes";
import Pets from "./pages/Pets";
import Veterinarios from "./pages/Veterinarios";
import Consultas from "./pages/Consultas";
import NotFound from "./pages/NotFound";

/**
 * Protected Route Component
 * Redirects to login if not authenticated
 */
function ProtectedRoute({ component: Component }: { component: React.ComponentType }) {
  const [, setLocation] = useLocation();
  
  const user = localStorage.getItem("user");
  if (!user) {
    setLocation("/login");
    return null;
  }

  return <Component />;
}

function Router() {
  return (
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/dashboard" component={() => <ProtectedRoute component={Dashboard} />} />
      <Route path="/clientes" component={() => <ProtectedRoute component={Clientes} />} />
      <Route path="/pets" component={() => <ProtectedRoute component={Pets} />} />
      <Route path="/veterinarios" component={() => <ProtectedRoute component={Veterinarios} />} />
      <Route path="/consultas" component={() => <ProtectedRoute component={Consultas} />} />
      <Route path="/" component={() => <ProtectedRoute component={Dashboard} />} />
      <Route path="/404" component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

/**
 * PetCare Manager - Neo-Playful Modernism Design
 * Vibrant colors, rounded corners, friendly typography
 */
function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
