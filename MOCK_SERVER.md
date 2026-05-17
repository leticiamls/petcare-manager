# Mock Backend Server — PetCare Manager

## 📋 O que é?

O **Mock Server** é um simulador do backend Spring Boot que permite testar o frontend sem ter o backend real rodando. Ele implementa todos os endpoints da API com dados fictícios.

**Características:**
- ✅ Todos os endpoints do Spring Boot implementados
- ✅ Autenticação JWT funcional
- ✅ Dados persistentes em memória durante a sessão
- ✅ CORS habilitado para `http://localhost:5173`
- ✅ Tratamento de erros HTTP (400, 401, 403, 404, 409, 422, 500)
- ✅ Fácil de iniciar e parar

---

## 🚀 Como Usar

### 1. Iniciar o Mock Server

**Opção A: Usando o script**
```bash
cd /home/ubuntu/petcare-manager
./start-mock-server.sh
```

**Opção B: Diretamente com Node.js**
```bash
cd /home/ubuntu/petcare-manager
node mock-server.js
```

Você verá:
```
🐾 Mock Backend Server rodando em http://localhost:8080

📝 Credenciais de teste:
   Username: admin | Senha: senha123 | Role: ADMIN
   Username: vet   | Senha: senha123 | Role: VET

✅ CORS habilitado para http://localhost:5173

📚 Endpoints disponíveis:
   POST   /auth/login
   GET    /clientes
   POST   /clientes
   ...
```

### 2. Iniciar o Frontend

Em outro terminal:
```bash
cd /home/ubuntu/petcare-manager
npm run dev
```

O frontend estará em `http://localhost:5173`

### 3. Testar o Login

1. Abra `http://localhost:5173` no navegador
2. Digite as credenciais:
   - **Username:** `admin` ou `vet`
   - **Senha:** `senha123`
3. Clique em "Entrar"

---

## 📊 Dados Mock Disponíveis

### Clientes
```json
[
  { "id": 1, "nome": "João Silva", "cpf": "123.456.789-00", "telefone": "85999999999", "ativo": true },
  { "id": 2, "nome": "Maria Oliveira", "cpf": "234.567.890-11", "telefone": "85988888888", "ativo": true },
  { "id": 3, "nome": "Carlos Souza", "cpf": "345.678.901-22", "telefone": "85977777777", "ativo": true }
]
```

### Pets
```json
[
  { "id": 1, "nome": "Rex", "especie": "Cachorro", "raca": "Labrador", "dataNascimento": "2020-01-15", "ativo": true, "clienteId": 1 },
  { "id": 2, "nome": "Mia", "especie": "Gato", "raca": "Siamês", "dataNascimento": "2021-03-20", "ativo": true, "clienteId": 2 },
  { "id": 3, "nome": "Thor", "especie": "Cachorro", "raca": "Pastor Alemão", "dataNascimento": "2019-06-10", "ativo": true, "clienteId": 1 }
]
```

### Veterinários
```json
[
  { "id": 1, "nome": "Dra. Ana Lima", "crmv": "CRMV-CE 12345", "telefone": "85988888888", "ativo": true },
  { "id": 2, "nome": "Dr. Bruno Costa", "crmv": "CRMV-CE 12346", "telefone": "85987777777", "ativo": true }
]
```

### Sintomas
```json
[
  { "id": 1, "nome": "Febre" },
  { "id": 2, "nome": "Tosse" },
  { "id": 3, "nome": "Vômito" },
  { "id": 4, "nome": "Diarreia" },
  { "id": 5, "nome": "Coceira" },
  { "id": 6, "nome": "Perda de apetite" },
  { "id": 7, "nome": "Letargia" },
  { "id": 8, "nome": "Espirro" }
]
```

### Medicamentos
```json
[
  { "id": 1, "nome": "Amoxicilina" },
  { "id": 2, "nome": "Dipirona" },
  { "id": 3, "nome": "Omeprazol" },
  { "id": 4, "nome": "Probióticos" },
  { "id": 5, "nome": "Vitaminas" },
  { "id": 6, "nome": "Anti-inflamatório" }
]
```

---

## 🔐 Autenticação

### Login
```bash
curl -X POST http://localhost:8080/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"senha123"}'
```

**Resposta:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "username": "admin",
  "role": "ADMIN"
}
```

### Usando o Token

Adicione o token no header `Authorization`:
```bash
curl -X GET http://localhost:8080/clientes \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

---

## 📡 Endpoints Disponíveis

### Autenticação
| Método | URL | Descrição |
|--------|-----|-----------|
| POST | `/auth/login` | Login com username/password |
| POST | `/auth/recuperar-senha` | Solicita redefinição de senha |
| POST | `/auth/redefinir-senha` | Redefine a senha via token |

### Clientes
| Método | URL | Descrição |
|--------|-----|-----------|
| POST | `/clientes` | Criar cliente |
| GET | `/clientes` | Listar clientes ativos |
| GET | `/clientes/{cpf}` | Buscar cliente por CPF |
| PUT | `/clientes/{id}` | Atualizar cliente |
| DELETE | `/clientes/{id}` | Inativar cliente |
| PATCH | `/clientes/ativar/{id}` | Reativar cliente |

### Pets
| Método | URL | Descrição |
|--------|-----|-----------|
| POST | `/pets` | Criar pet |
| GET | `/pets` | Listar pets ativos |
| PUT | `/pets/{id}` | Atualizar pet |
| DELETE | `/pets/{id}` | Inativar pet |
| PATCH | `/pets/ativar/{id}` | Reativar pet |

### Veterinários
| Método | URL | Descrição |
|--------|-----|-----------|
| POST | `/veterinarios` | Criar veterinário |
| GET | `/veterinarios` | Listar veterinários ativos |
| PUT | `/veterinarios/{id}` | Atualizar veterinário |
| DELETE | `/veterinarios/{id}` | Inativar veterinário |
| PATCH | `/veterinarios/ativar/{id}` | Reativar veterinário |

### Consultas
| Método | URL | Descrição |
|--------|-----|-----------|
| POST | `/consultas` | Criar consulta |
| GET | `/consultas/pet/{petId}` | Listar consultas de um pet |
| PUT | `/consultas/{id}` | Atualizar consulta |
| PATCH | `/consultas/finalizar/{id}` | Finalizar consulta |
| PATCH | `/consultas/cancelar/{id}` | Cancelar consulta |

### Sintomas e Medicamentos
| Método | URL | Descrição |
|--------|-----|-----------|
| GET | `/sintomas` | Listar sintomas disponíveis |
| GET | `/medicamentos` | Listar medicamentos disponíveis |

---

## 🧪 Exemplos de Uso

### Criar um Cliente
```bash
curl -X POST http://localhost:8080/clientes \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{
    "nome": "Pedro Santos",
    "cpf": "456.789.012-33",
    "telefone": "85966666666"
  }'
```

### Listar Clientes
```bash
curl -X GET http://localhost:8080/clientes \
  -H "Authorization: Bearer <token>"
```

### Criar um Pet
```bash
curl -X POST http://localhost:8080/pets \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{
    "nome": "Bella",
    "especie": "Cachorro",
    "raca": "Poodle",
    "dataNascimento": "2022-05-10",
    "clienteId": 1
  }'
```

### Criar uma Consulta
```bash
curl -X POST http://localhost:8080/consultas \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{
    "data": "2026-05-20",
    "descricao": "Checkup geral",
    "petId": 1,
    "veterinarioId": 1,
    "sintomas": [1, 2],
    "medicamentos": [1]
  }'
```

---

## ⚙️ Configuração

### Mudar a Porta

Edite `mock-server.js` e altere:
```javascript
const PORT = 8080; // Altere para outra porta
```

### Adicionar Mais Dados

Edite `mock-server.js` e adicione dados aos arrays:
```javascript
let clientes = [
  // Adicione aqui
];
```

### Desabilitar CORS

Remova ou comente a linha:
```javascript
app.use(cors());
```

---

## 🛑 Parar o Mock Server

### Se iniciado com o script
Pressione `Ctrl+C` no terminal

### Se iniciado em background
```bash
lsof -ti:8080 | xargs kill -9
```

---

## 📝 Notas Importantes

1. **Dados em Memória**: Todos os dados são armazenados em memória. Quando o servidor é reiniciado, os dados voltam aos valores iniciais.

2. **Sem Persistência**: O mock server não salva dados em banco de dados. Use-o apenas para testes.

3. **JWT Simples**: O JWT é gerado com uma chave fixa (`petcare-secret-key-mock`). Não use em produção!

4. **Validações Básicas**: O mock server implementa validações básicas. O backend real pode ter validações mais rigorosas.

5. **Sem Autenticação Real**: Qualquer username/password funciona, desde que corresponda aos usuários mock.

---

## 🔄 Migração para Backend Real

Quando o backend Spring Boot estiver pronto:

1. Altere a URL base em `client/src/lib/api.ts`:
   ```typescript
   const API_BASE_URL = "http://localhost:8080"; // Já está correto
   ```

2. Pare o mock server:
   ```bash
   lsof -ti:8080 | xargs kill -9
   ```

3. Inicie o backend Spring Boot na porta 8080

4. O frontend funcionará sem mudanças!

---

## 📚 Referências

- [Documento de Alinhamento](./alinhamento-petcare.md)
- [Integração Backend](./INTEGRACAO_BACKEND.md)
- [Express.js Documentation](https://expressjs.com)
- [JWT Introduction](https://jwt.io/introduction)

---

**Última atualização**: 2026-05-17
