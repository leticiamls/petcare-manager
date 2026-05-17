/**
 * API Service - Integração com Backend Spring Boot
 * Base URL: http://localhost:8080
 */

const API_BASE_URL = "http://localhost:8080";

// Tipos de resposta
export interface ApiResponse<T> {
  data?: T;
  status?: number;
  mensagem?: string;
}

export interface LoginResponse {
  token: string;
  username: string;
  role: "ADMIN" | "VET";
}

export interface Cliente {
  id: number;
  nome: string;
  cpf: string;
  telefone: string;
  ativo: boolean;
}

export interface Pet {
  id: number;
  nome: string;
  especie: string;
  raca: string;
  dataNascimento: string;
  ativo: boolean;
  clienteId: number;
}

export interface Veterinario {
  id: number;
  nome: string;
  crmv: string;
  telefone: string;
  ativo: boolean;
}

export interface Sintoma {
  id: number;
  nome: string;
}

export interface Medicamento {
  id: number;
  nome: string;
}

export interface Consulta {
  id: number;
  data: string;
  descricao: string;
  status: "ABERTA" | "FINALIZADA" | "CANCELADA";
  petId: number;
  veterinarioId: number;
  sintomas: number[];
  medicamentos: number[];
}

// Função auxiliar para fazer requisições
async function fetchApi<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = localStorage.getItem("authToken");
  
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (options.headers && typeof options.headers === "object") {
    Object.assign(headers, options.headers);
  }

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.mensagem || `Erro ${response.status}`);
  }

  return response.json();
}

// ============ AUTENTICAÇÃO ============

export async function login(username: string, password: string): Promise<LoginResponse> {
  return fetchApi<LoginResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify({ username, password }),
  });
}

export async function recuperarSenha(email: string): Promise<{ mensagem: string }> {
  return fetchApi("/auth/recuperar-senha", {
    method: "POST",
    body: JSON.stringify({ email }),
  });
}

export async function redefinirSenha(token: string, novaSenha: string): Promise<{ mensagem: string }> {
  return fetchApi("/auth/redefinir-senha", {
    method: "POST",
    body: JSON.stringify({ token, novaSenha }),
  });
}

// ============ CLIENTES ============

export async function criarCliente(cliente: Omit<Cliente, "id" | "ativo">): Promise<Cliente> {
  return fetchApi<Cliente>("/clientes", {
    method: "POST",
    body: JSON.stringify(cliente),
  });
}

export async function listarClientes(): Promise<Cliente[]> {
  return fetchApi<Cliente[]>("/clientes");
}

export async function buscarClientePorCpf(cpf: string): Promise<Cliente> {
  return fetchApi<Cliente>(`/clientes/${cpf}`);
}

export async function atualizarCliente(id: number, cliente: Partial<Cliente>): Promise<Cliente> {
  return fetchApi<Cliente>(`/clientes/${id}`, {
    method: "PUT",
    body: JSON.stringify(cliente),
  });
}

export async function inativarCliente(id: number): Promise<{ mensagem: string }> {
  return fetchApi(`/clientes/${id}`, {
    method: "DELETE",
  });
}

export async function reativarCliente(id: number): Promise<Cliente> {
  return fetchApi<Cliente>(`/clientes/ativar/${id}`, {
    method: "PATCH",
  });
}

// ============ PETS ============

export async function criarPet(pet: Omit<Pet, "id" | "ativo">): Promise<Pet> {
  return fetchApi<Pet>("/pets", {
    method: "POST",
    body: JSON.stringify(pet),
  });
}

export async function listarPets(): Promise<Pet[]> {
  return fetchApi<Pet[]>("/pets");
}

export async function atualizarPet(id: number, pet: Partial<Pet>): Promise<Pet> {
  return fetchApi<Pet>(`/pets/${id}`, {
    method: "PUT",
    body: JSON.stringify(pet),
  });
}

export async function inativarPet(id: number): Promise<{ mensagem: string }> {
  return fetchApi(`/pets/${id}`, {
    method: "DELETE",
  });
}

export async function reativarPet(id: number): Promise<Pet> {
  return fetchApi<Pet>(`/pets/ativar/${id}`, {
    method: "PATCH",
  });
}

// ============ VETERINÁRIOS ============

export async function criarVeterinario(vet: Omit<Veterinario, "id" | "ativo">): Promise<Veterinario> {
  return fetchApi<Veterinario>("/veterinarios", {
    method: "POST",
    body: JSON.stringify(vet),
  });
}

export async function listarVeterinarios(): Promise<Veterinario[]> {
  return fetchApi<Veterinario[]>("/veterinarios");
}

export async function atualizarVeterinario(id: number, vet: Partial<Veterinario>): Promise<Veterinario> {
  return fetchApi<Veterinario>(`/veterinarios/${id}`, {
    method: "PUT",
    body: JSON.stringify(vet),
  });
}

export async function inativarVeterinario(id: number): Promise<{ mensagem: string }> {
  return fetchApi(`/veterinarios/${id}`, {
    method: "DELETE",
  });
}

export async function reativarVeterinario(id: number): Promise<Veterinario> {
  return fetchApi<Veterinario>(`/veterinarios/ativar/${id}`, {
    method: "PATCH",
  });
}

// ============ CONSULTAS ============

export async function criarConsulta(consulta: Omit<Consulta, "id">): Promise<Consulta> {
  return fetchApi<Consulta>("/consultas", {
    method: "POST",
    body: JSON.stringify(consulta),
  });
}

export async function listarConsultasPorPet(petId: number): Promise<Consulta[]> {
  return fetchApi<Consulta[]>(`/consultas/pet/${petId}`);
}

export async function atualizarConsulta(id: number, consulta: Partial<Consulta>): Promise<Consulta> {
  return fetchApi<Consulta>(`/consultas/${id}`, {
    method: "PUT",
    body: JSON.stringify(consulta),
  });
}

export async function finalizarConsulta(id: number): Promise<Consulta> {
  return fetchApi<Consulta>(`/consultas/finalizar/${id}`, {
    method: "PATCH",
  });
}

export async function cancelarConsulta(id: number): Promise<Consulta> {
  return fetchApi<Consulta>(`/consultas/cancelar/${id}`, {
    method: "PATCH",
  });
}

// ============ SINTOMAS E MEDICAMENTOS ============

export async function listarSintomas(): Promise<Sintoma[]> {
  return fetchApi<Sintoma[]>("/sintomas");
}

export async function listarMedicamentos(): Promise<Medicamento[]> {
  return fetchApi<Medicamento[]>("/medicamentos");
}

// ============ UTILITÁRIOS ============

export function getToken(): string | null {
  return localStorage.getItem("authToken");
}

export function setToken(token: string): void {
  localStorage.setItem("authToken", token);
}

export function removeToken(): void {
  localStorage.removeItem("authToken");
}

export function isAuthenticated(): boolean {
  return !!getToken();
}
