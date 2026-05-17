/**
 * Mock Backend Server - PetCare Manager
 * Simula todos os endpoints do Spring Boot para testes
 * Porta: 8080
 */

import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';

const app = express();
const PORT = 8080;
const JWT_SECRET = 'petcare-secret-key-mock';

// Middleware
app.use(cors());
app.use(express.json());

// ============ DADOS MOCK ============

let clientes = [
  { id: 1, nome: 'João Silva', cpf: '123.456.789-00', telefone: '85999999999', ativo: true },
  { id: 2, nome: 'Maria Oliveira', cpf: '234.567.890-11', telefone: '85988888888', ativo: true },
  { id: 3, nome: 'Carlos Souza', cpf: '345.678.901-22', telefone: '85977777777', ativo: true },
];

let pets = [
  { id: 1, nome: 'Rex', especie: 'Cachorro', raca: 'Labrador', dataNascimento: '2020-01-15', ativo: true, clienteId: 1 },
  { id: 2, nome: 'Mia', especie: 'Gato', raca: 'Siamês', dataNascimento: '2021-03-20', ativo: true, clienteId: 2 },
  { id: 3, nome: 'Thor', especie: 'Cachorro', raca: 'Pastor Alemão', dataNascimento: '2019-06-10', ativo: true, clienteId: 1 },
];

let veterinarios = [
  { id: 1, nome: 'Dra. Ana Lima', crmv: 'CRMV-CE 12345', telefone: '85988888888', ativo: true },
  { id: 2, nome: 'Dr. Bruno Costa', crmv: 'CRMV-CE 12346', telefone: '85987777777', ativo: true },
];

let consultas = [
  { id: 1, data: '2026-05-16', descricao: 'Pet apresentou febre', status: 'ABERTA', petId: 1, veterinarioId: 1, sintomas: [1, 2], medicamentos: [1] },
  { id: 2, data: '2026-05-15', descricao: 'Vacinação anual', status: 'FINALIZADA', petId: 2, veterinarioId: 2, sintomas: [], medicamentos: [] },
];

const sintomas = [
  { id: 1, nome: 'Febre' },
  { id: 2, nome: 'Tosse' },
  { id: 3, nome: 'Vômito' },
  { id: 4, nome: 'Diarreia' },
  { id: 5, nome: 'Coceira' },
  { id: 6, nome: 'Perda de apetite' },
  { id: 7, nome: 'Letargia' },
  { id: 8, nome: 'Espirro' },
];

const medicamentos = [
  { id: 1, nome: 'Amoxicilina' },
  { id: 2, nome: 'Dipirona' },
  { id: 3, nome: 'Omeprazol' },
  { id: 4, nome: 'Probióticos' },
  { id: 5, nome: 'Vitaminas' },
  { id: 6, nome: 'Anti-inflamatório' },
];

// Usuários mock
const usuarios = [
  { username: 'admin', password: 'senha123', role: 'ADMIN' },
  { username: 'vet', password: 'senha123', role: 'VET' },
];

let nextClienteId = 4;
let nextPetId = 4;
let nextVeterinarioId = 3;
let nextConsultaId = 3;

// ============ MIDDLEWARE DE AUTENTICAÇÃO ============

function verificarToken(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ status: 401, mensagem: 'Token não fornecido' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ status: 401, mensagem: 'Token inválido ou expirado' });
  }
}

// ============ AUTENTICAÇÃO ============

app.post('/auth/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ status: 400, mensagem: 'Username e password são obrigatórios' });
  }

  const usuario = usuarios.find(u => u.username === username && u.password === password);

  if (!usuario) {
    return res.status(401).json({ status: 401, mensagem: 'Usuário ou senha inválidos' });
  }

  const token = jwt.sign({ username: usuario.username, role: usuario.role }, JWT_SECRET, { expiresIn: '24h' });

  res.json({
    token,
    username: usuario.username,
    role: usuario.role,
  });
});

app.post('/auth/recuperar-senha', (req, res) => {
  res.json({ mensagem: 'Email de recuperação enviado' });
});

app.post('/auth/redefinir-senha', (req, res) => {
  res.json({ mensagem: 'Senha redefinida com sucesso' });
});

// ============ CLIENTES ============

app.post('/clientes', verificarToken, (req, res) => {
  const { nome, cpf, telefone } = req.body;

  if (!nome || !cpf || !telefone) {
    return res.status(400).json({ status: 400, mensagem: 'Nome, CPF e telefone são obrigatórios' });
  }

  if (clientes.some(c => c.cpf === cpf)) {
    return res.status(409).json({ status: 409, mensagem: 'CPF já cadastrado' });
  }

  const novoCliente = { id: nextClienteId++, nome, cpf, telefone, ativo: true };
  clientes.push(novoCliente);
  res.status(201).json(novoCliente);
});

app.get('/clientes', verificarToken, (req, res) => {
  const clientesAtivos = clientes.filter(c => c.ativo);
  res.json(clientesAtivos);
});

app.get('/clientes/:cpf', verificarToken, (req, res) => {
  const cliente = clientes.find(c => c.cpf === req.params.cpf);
  if (!cliente) {
    return res.status(404).json({ status: 404, mensagem: 'Cliente não encontrado' });
  }
  res.json(cliente);
});

app.put('/clientes/:id', verificarToken, (req, res) => {
  const cliente = clientes.find(c => c.id === parseInt(req.params.id));
  if (!cliente) {
    return res.status(404).json({ status: 404, mensagem: 'Cliente não encontrado' });
  }

  Object.assign(cliente, req.body);
  res.json(cliente);
});

app.delete('/clientes/:id', verificarToken, (req, res) => {
  const cliente = clientes.find(c => c.id === parseInt(req.params.id));
  if (!cliente) {
    return res.status(404).json({ status: 404, mensagem: 'Cliente não encontrado' });
  }

  cliente.ativo = false;
  res.json({ mensagem: 'Cliente inativado' });
});

app.patch('/clientes/ativar/:id', verificarToken, (req, res) => {
  const cliente = clientes.find(c => c.id === parseInt(req.params.id));
  if (!cliente) {
    return res.status(404).json({ status: 404, mensagem: 'Cliente não encontrado' });
  }

  cliente.ativo = true;
  res.json(cliente);
});

// ============ PETS ============

app.post('/pets', verificarToken, (req, res) => {
  const { nome, especie, raca, dataNascimento, clienteId } = req.body;

  if (!nome || !especie || !raca || !dataNascimento || !clienteId) {
    return res.status(400).json({ status: 400, mensagem: 'Todos os campos são obrigatórios' });
  }

  const novoPet = { id: nextPetId++, nome, especie, raca, dataNascimento, ativo: true, clienteId };
  pets.push(novoPet);
  res.status(201).json(novoPet);
});

app.get('/pets', verificarToken, (req, res) => {
  const petsAtivos = pets.filter(p => p.ativo);
  res.json(petsAtivos);
});

app.put('/pets/:id', verificarToken, (req, res) => {
  const pet = pets.find(p => p.id === parseInt(req.params.id));
  if (!pet) {
    return res.status(404).json({ status: 404, mensagem: 'Pet não encontrado' });
  }

  Object.assign(pet, req.body);
  res.json(pet);
});

app.delete('/pets/:id', verificarToken, (req, res) => {
  const pet = pets.find(p => p.id === parseInt(req.params.id));
  if (!pet) {
    return res.status(404).json({ status: 404, mensagem: 'Pet não encontrado' });
  }

  pet.ativo = false;
  res.json({ mensagem: 'Pet inativado' });
});

app.patch('/pets/ativar/:id', verificarToken, (req, res) => {
  const pet = pets.find(p => p.id === parseInt(req.params.id));
  if (!pet) {
    return res.status(404).json({ status: 404, mensagem: 'Pet não encontrado' });
  }

  pet.ativo = true;
  res.json(pet);
});

// ============ VETERINÁRIOS ============

app.post('/veterinarios', verificarToken, (req, res) => {
  const { nome, crmv, telefone } = req.body;

  if (!nome || !crmv || !telefone) {
    return res.status(400).json({ status: 400, mensagem: 'Nome, CRMV e telefone são obrigatórios' });
  }

  const novoVet = { id: nextVeterinarioId++, nome, crmv, telefone, ativo: true };
  veterinarios.push(novoVet);
  res.status(201).json(novoVet);
});

app.get('/veterinarios', verificarToken, (req, res) => {
  const vetsAtivos = veterinarios.filter(v => v.ativo);
  res.json(vetsAtivos);
});

app.put('/veterinarios/:id', verificarToken, (req, res) => {
  const vet = veterinarios.find(v => v.id === parseInt(req.params.id));
  if (!vet) {
    return res.status(404).json({ status: 404, mensagem: 'Veterinário não encontrado' });
  }

  Object.assign(vet, req.body);
  res.json(vet);
});

app.delete('/veterinarios/:id', verificarToken, (req, res) => {
  const vet = veterinarios.find(v => v.id === parseInt(req.params.id));
  if (!vet) {
    return res.status(404).json({ status: 404, mensagem: 'Veterinário não encontrado' });
  }

  vet.ativo = false;
  res.json({ mensagem: 'Veterinário inativado' });
});

app.patch('/veterinarios/ativar/:id', verificarToken, (req, res) => {
  const vet = veterinarios.find(v => v.id === parseInt(req.params.id));
  if (!vet) {
    return res.status(404).json({ status: 404, mensagem: 'Veterinário não encontrado' });
  }

  vet.ativo = true;
  res.json(vet);
});

// ============ CONSULTAS ============

app.post('/consultas', verificarToken, (req, res) => {
  const { data, descricao, status, petId, veterinarioId, sintomas, medicamentos } = req.body;

  if (!data || !petId || !veterinarioId) {
    return res.status(400).json({ status: 400, mensagem: 'Data, pet e veterinário são obrigatórios' });
  }

  const novaConsulta = {
    id: nextConsultaId++,
    data,
    descricao: descricao || '',
    status: status || 'ABERTA',
    petId,
    veterinarioId,
    sintomas: sintomas || [],
    medicamentos: medicamentos || [],
  };

  consultas.push(novaConsulta);
  res.status(201).json(novaConsulta);
});

app.get('/consultas/pet/:petId', verificarToken, (req, res) => {
  const consultasPet = consultas.filter(c => c.petId === parseInt(req.params.petId));
  res.json(consultasPet);
});

app.put('/consultas/:id', verificarToken, (req, res) => {
  const consulta = consultas.find(c => c.id === parseInt(req.params.id));
  if (!consulta) {
    return res.status(404).json({ status: 404, mensagem: 'Consulta não encontrada' });
  }

  if (consulta.status === 'FINALIZADA') {
    return res.status(422).json({ status: 422, mensagem: 'Consulta já finalizada não pode ser alterada' });
  }

  Object.assign(consulta, req.body);
  res.json(consulta);
});

app.patch('/consultas/finalizar/:id', verificarToken, (req, res) => {
  const consulta = consultas.find(c => c.id === parseInt(req.params.id));
  if (!consulta) {
    return res.status(404).json({ status: 404, mensagem: 'Consulta não encontrada' });
  }

  consulta.status = 'FINALIZADA';
  res.json(consulta);
});

app.patch('/consultas/cancelar/:id', verificarToken, (req, res) => {
  const consulta = consultas.find(c => c.id === parseInt(req.params.id));
  if (!consulta) {
    return res.status(404).json({ status: 404, mensagem: 'Consulta não encontrada' });
  }

  consulta.status = 'CANCELADA';
  res.json(consulta);
});

// ============ SINTOMAS E MEDICAMENTOS ============

app.get('/sintomas', verificarToken, (req, res) => {
  res.json(sintomas);
});

app.get('/medicamentos', verificarToken, (req, res) => {
  res.json(medicamentos);
});

// ============ INICIAR SERVIDOR ============

app.listen(PORT, () => {
  console.log(`\n🐾 Mock Backend Server rodando em http://localhost:${PORT}`);
  console.log(`\n📝 Credenciais de teste:`);
  console.log(`   Username: admin | Senha: senha123 | Role: ADMIN`);
  console.log(`   Username: vet   | Senha: senha123 | Role: VET`);
  console.log(`\n✅ CORS habilitado para http://localhost:5173`);
  console.log(`\n📚 Endpoints disponíveis:`);
  console.log(`   POST   /auth/login`);
  console.log(`   GET    /clientes`);
  console.log(`   POST   /clientes`);
  console.log(`   GET    /pets`);
  console.log(`   POST   /pets`);
  console.log(`   GET    /veterinarios`);
  console.log(`   POST   /veterinarios`);
  console.log(`   GET    /consultas/pet/:petId`);
  console.log(`   POST   /consultas`);
  console.log(`   GET    /sintomas`);
  console.log(`   GET    /medicamentos`);
  console.log(`\n`);
});
