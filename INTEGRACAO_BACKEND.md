# Integração Frontend-Backend — PetCare Manager

## 📋 Resumo das Mudanças

O frontend foi atualizado para integração com o backend Spring Boot. As principais mudanças implementadas:

### 1. **Autenticação JWT**
- Implementado contexto `AuthContext` para gerenciar estado de autenticação
- Login agora faz requisição POST para `/auth/login`
- Token JWT é armazenado em `localStorage` como `authToken`
- Token é enviado em todas as requisições protegidas no header `Authorization: Bearer <token>`

### 2. **Serviço de API**
- Criado arquivo `client/src/lib/api.ts` com todas as funções de requisição
- Funções para: Clientes, Pets, Veterinários, Consultas, Sintomas e Medicamentos
- Tratamento automático de erros HTTP
- Suporte a CORS com backend

### 3. **Proteção de Rotas**
- Componente `ProtectedRoute` verifica autenticação antes de acessar páginas
- Usuário não autenticado é redirecionado para `/login`
- Estado de carregamento durante verificação de autenticação

### 4. **Modelos de Dados Atualizados**
- Consultas agora usam `sintomas: number[]` e `medicamentos: number[]` (IDs)
- Dados retornados do backend sem aninhamento
- Tipos TypeScript definidos em `api.ts`

---

## 🚀 Como Usar

### Pré-requisitos
- Backend Spring Boot rodando em `http://localhost:8080`
- CORS configurado no backend para aceitar `http://localhost:5173`

### Variáveis de Ambiente
Nenhuma variável de ambiente é necessária. A URL base é fixa em `http://localhost:8080`.

Se precisar mudar a URL base, edite `client/src/lib/api.ts`:
```typescript
const API_BASE_URL = "http://localhost:8080"; // Altere aqui
```

### Iniciar o Frontend
```bash
cd /home/ubuntu/petcare-manager
npm run dev
```

O frontend estará disponível em `http://localhost:5173`

---

## 🔐 Fluxo de Autenticação

### 1. Login
```
Usuário digita username/password
    ↓
POST /auth/login
    ↓
Backend retorna { token, username, role }
    ↓
Frontend armazena token em localStorage
    ↓
Usuário redirecionado para Dashboard
```

### 2. Requisições Autenticadas
```
Frontend faz requisição (ex: GET /clientes)
    ↓
Header adicionado: Authorization: Bearer <token>
    ↓
Backend valida token
    ↓
Retorna dados ou erro 401 (não autenticado)
```

### 3. Logout
```
Usuário clica em Logout
    ↓
Token removido de localStorage
    ↓
Usuário redirecionado para /login
```

---

## 📡 Endpoints Implementados

### Autenticação
- `POST /auth/login` - Login com username/password

### Clientes
- `POST /clientes` - Criar cliente
- `GET /clientes` - Listar clientes ativos
- `GET /clientes/{cpf}` - Buscar por CPF
- `PUT /clientes/{id}` - Atualizar cliente
- `DELETE /clientes/{id}` - Inativar cliente
- `PATCH /clientes/ativar/{id}` - Reativar cliente

### Pets
- `POST /pets` - Criar pet
- `GET /pets` - Listar pets ativos
- `PUT /pets/{id}` - Atualizar pet
- `DELETE /pets/{id}` - Inativar pet
- `PATCH /pets/ativar/{id}` - Reativar pet

### Veterinários
- `POST /veterinarios` - Criar veterinário
- `GET /veterinarios` - Listar veterinários ativos
- `PUT /veterinarios/{id}` - Atualizar veterinário
- `DELETE /veterinarios/{id}` - Inativar veterinário
- `PATCH /veterinarios/ativar/{id}` - Reativar veterinário

### Consultas
- `POST /consultas` - Criar consulta
- `GET /consultas/pet/{petId}` - Listar consultas de um pet
- `PUT /consultas/{id}` - Atualizar consulta
- `PATCH /consultas/finalizar/{id}` - Finalizar consulta
- `PATCH /consultas/cancelar/{id}` - Cancelar consulta

### Sintomas e Medicamentos
- `GET /sintomas` - Listar sintomas disponíveis
- `GET /medicamentos` - Listar medicamentos disponíveis

---

## 🛠️ Estrutura de Arquivos

```
client/src/
├── lib/
│   └── api.ts                 # Serviço de API com todas as funções
├── contexts/
│   ├── AuthContext.tsx        # Contexto de autenticação
│   └── ThemeContext.tsx       # Contexto de tema
├── pages/
│   ├── Login.tsx              # Página de login (integrada com API)
│   ├── Dashboard.tsx          # Dashboard
│   ├── Clientes.tsx           # Gestão de clientes
│   ├── Pets.tsx               # Gestão de pets
│   ├── Veterinarios.tsx       # Gestão de veterinários
│   ├── Consultas.tsx          # Gestão de consultas
│   └── NotFound.tsx           # Página 404
├── components/
│   ├── Sidebar.tsx            # Barra lateral de navegação
│   ├── DashboardLayout.tsx    # Layout do dashboard
│   └── ...                    # Outros componentes
└── App.tsx                    # Componente raiz com rotas
```

---

## 🔍 Tratamento de Erros

O frontend trata os seguintes códigos de erro HTTP:

| Código | Situação | Ação do Frontend |
|--------|----------|-----------------|
| 400 | Dados inválidos | Exibe toast com mensagem de erro |
| 401 | Não autenticado | Redireciona para login |
| 403 | Sem permissão | Exibe toast "Acesso negado" |
| 404 | Recurso não encontrado | Exibe toast "Não encontrado" |
| 409 | Conflito (ex: CPF duplicado) | Exibe toast com mensagem de erro |
| 422 | Regra de negócio violada | Exibe toast com mensagem de erro |
| 500 | Erro interno do servidor | Exibe toast "Erro do servidor" |

---

## 💡 Exemplo de Uso da API

### Criar um Cliente
```typescript
import { criarCliente } from "@/lib/api";

const novoCliente = await criarCliente({
  nome: "João Silva",
  cpf: "123.456.789-00",
  telefone: "85999999999",
});
```

### Listar Clientes
```typescript
import { listarClientes } from "@/lib/api";

const clientes = await listarClientes();
```

### Criar uma Consulta
```typescript
import { criarConsulta } from "@/lib/api";

const novaConsulta = await criarConsulta({
  data: "2026-05-16",
  descricao: "Pet apresentou febre",
  status: "ABERTA",
  petId: 1,
  veterinarioId: 1,
  sintomas: [1, 2],
  medicamentos: [1],
});
```

---

## 🧪 Testando a Integração

### 1. Verificar Conexão com Backend
```bash
curl http://localhost:8080/auth/login \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"senha123"}'
```

Resposta esperada:
```json
{
  "token": "eyJhbGciOiJIUzI1NiJ9...",
  "username": "admin",
  "role": "ADMIN"
}
```

### 2. Testar Login no Frontend
1. Abra `http://localhost:5173`
2. Digite username: `admin`, password: `senha123`
3. Clique em "Entrar"
4. Se bem-sucedido, você será redirecionado para o Dashboard

### 3. Verificar Token no localStorage
Abra o DevTools do navegador (F12) e execute:
```javascript
console.log(localStorage.getItem("authToken"));
```

Você deve ver um token JWT.

---

## ⚠️ Possíveis Problemas

### Erro: "Cannot read properties of undefined"
- **Causa**: Backend não está rodando
- **Solução**: Inicie o backend Spring Boot na porta 8080

### Erro: "CORS policy blocked"
- **Causa**: Backend não tem CORS configurado
- **Solução**: Adicione `@CrossOrigin(origins = "http://localhost:5173")` nos controllers

### Erro: "401 Unauthorized"
- **Causa**: Token expirado ou inválido
- **Solução**: Faça login novamente

### Erro: "404 Not Found"
- **Causa**: Endpoint não existe no backend
- **Solução**: Verifique se o endpoint está implementado no backend

---

## 📚 Referências

- [Documento de Alinhamento](./alinhamento-petcare.md)
- [Wireframes](./WIREFRAMES.md)
- [React Documentation](https://react.dev)
- [JWT Introduction](https://jwt.io/introduction)

---

## ✅ Checklist de Integração

- [ ] Backend Spring Boot rodando em `http://localhost:8080`
- [ ] CORS configurado no backend
- [ ] Frontend rodando em `http://localhost:5173`
- [ ] Login funciona com credenciais do backend
- [ ] Token JWT é armazenado em localStorage
- [ ] Requisições autenticadas incluem o token no header
- [ ] Logout remove o token
- [ ] Páginas protegidas redirecionam para login se não autenticado
- [ ] Erros HTTP são tratados corretamente
- [ ] Dados são exibidos corretamente nas páginas

---

**Última atualização**: 2026-05-09
