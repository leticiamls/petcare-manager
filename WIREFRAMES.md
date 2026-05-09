# Wireframes de Baixa Fidelidade - PetCare Manager

## 1. Página de Login

```
┌─────────────────────────────────────────┐
│                                         │
│         [Logo] PetCare Manager          │
│                                         │
│    ┌─────────────────────────────────┐  │
│    │                                 │  │
│    │  Usuário: [________________]    │  │
│    │                                 │  │
│    │  Senha:   [________________]    │  │
│    │                                 │  │
│    │         [  ENTRAR  ]            │  │
│    │                                 │  │
│    │  Demo: Use qualquer usuário     │  │
│    │                                 │  │
│    └─────────────────────────────────┘  │
│                                         │
└─────────────────────────────────────────┘
```

**Componentes:**
- Logo com ícone de pata
- Campo de entrada: Usuário
- Campo de entrada: Senha
- Botão "Entrar"
- Mensagem de demo

**Fluxo:**
- Validação de campos obrigatórios
- Autenticação simulada
- Redirecionamento para Dashboard

---

## 2. Dashboard

```
┌──────────────────────────────────────────────────────────────┐
│  [Logo] PetCare  │  Dashboard                                │
│  ─────────────   │                                           │
│  [Dashboard]     │  ┌─────────────────────────────────────┐ │
│  [Clientes]      │  │  Bem-vindo ao PetCare Manager!     │ │
│  [Pets]          │  │  [    HERO IMAGE / BANNER    ]      │ │
│  [Veterinários]  │  └─────────────────────────────────────┘ │
│  [Consultas]     │                                           │
│  ─────────────   │  ┌──────────┐ ┌──────────┐               │
│                  │  │ Clientes │ │   Pets   │               │
│                  │  │    10    │ │    25    │               │
│                  │  └──────────┘ └──────────┘               │
│  [Sair]          │                                           │
│                  │  ┌──────────┐ ┌──────────┐               │
│                  │  │Veterinár.│ │Consultas │               │
│                  │  │    5     │ │    42    │               │
│                  │  └──────────┘ └──────────┘               │
│                  │                                           │
│                  │  ┌──────────┐ ┌──────────┐               │
│                  │  │Novo Cli. │ │ Novo Pet │               │
│                  │  └──────────┘ └──────────┘               │
│                  │                                           │
│                  │  ┌──────────┐ ┌──────────┐               │
│                  │  │Novo Vet. │ │Nova Cons.│               │
│                  │  └──────────┘ └──────────┘               │
│                  │                                           │
└──────────────────────────────────────────────────────────────┘
```

**Componentes:**
- Sidebar com navegação (5 itens + Sair)
- Hero section com banner/imagem
- Grid de 4 cards de estatísticas (Clientes, Pets, Veterinários, Consultas)
- Grid de 4 botões de atalho rápido

**Layout:**
- Sidebar: 20% da largura
- Conteúdo principal: 80% da largura
- Cards em grid 2x2 responsivo

---

## 3. Página de Clientes

```
┌──────────────────────────────────────────────────────────────┐
│  [Logo] PetCare  │  Gestão de Clientes                      │
│  ─────────────   │                                           │
│  [Dashboard]     │  [Novo Cliente]                           │
│  [Clientes]      │                                           │
│  [Pets]          │  Buscar por CPF: [____________]           │
│  [Veterinários]  │                                           │
│  [Consultas]     │  ┌─────────────────────────────────────┐ │
│  ─────────────   │  │ Nome: João Silva                    │ │
│                  │  │ CPF: 123.456.789-00                 │ │
│                  │  │ Telefone: (11) 98765-4321           │ │
│                  │  │ Status: Ativo                       │ │
│                  │  │ [Editar] [Inativar]                 │ │
│                  │  └─────────────────────────────────────┘ │
│  [Sair]          │                                           │
│                  │  ┌─────────────────────────────────────┐ │
│                  │  │ Nome: Maria Santos                  │ │
│                  │  │ CPF: 987.654.321-00                 │ │
│                  │  │ Telefone: (11) 91234-5678           │ │
│                  │  │ Status: Ativo                       │ │
│                  │  │ [Editar] [Inativar]                 │ │
│                  │  └─────────────────────────────────────┘ │
│                  │                                           │
│                  │  [Clientes Inativos]                      │
│                  │  ┌─────────────────────────────────────┐ │
│                  │  │ Nome: Pedro Costa                   │ │
│                  │  │ Status: Inativo                     │ │
│                  │  │ [Reativar]                          │ │
│                  │  └─────────────────────────────────────┘ │
│                  │                                           │
└──────────────────────────────────────────────────────────────┘
```

**Componentes:**
- Título "Gestão de Clientes"
- Botão "Novo Cliente" (abre modal)
- Campo de busca por CPF
- Cards de clientes ativos (3 colunas)
- Seção de clientes inativos
- Botões: Editar, Inativar, Reativar

**Modal - Novo/Editar Cliente:**
```
┌─────────────────────────────────┐
│  Novo Cliente                   │
├─────────────────────────────────┤
│                                 │
│  Nome: [________________]        │
│                                 │
│  CPF:  [________________]        │
│                                 │
│  Telefone: [________________]    │
│                                 │
│  [Cancelar] [Cadastrar]         │
│                                 │
└─────────────────────────────────┘
```

---

## 4. Página de Pets

```
┌──────────────────────────────────────────────────────────────┐
│  [Logo] PetCare  │  Gestão de Pets                           │
│  ─────────────   │                                           │
│  [Dashboard]     │  [Novo Pet]                               │
│  [Clientes]      │                                           │
│  [Pets]          │  Pets Ativos:                             │
│  [Veterinários]  │                                           │
│  [Consultas]     │  ┌─────────────────────────────────────┐ │
│  ─────────────   │  │ Nome: Rex                           │ │
│                  │  │ Tipo: Cachorro                      │ │
│                  │  │ Idade: 3 anos                       │ │
│                  │  │ Cliente: João Silva                 │ │
│                  │  │ Status: Ativo                       │ │
│                  │  │ [Editar] [Inativar]                 │ │
│                  │  └─────────────────────────────────────┘ │
│  [Sair]          │                                           │
│                  │  ┌─────────────────────────────────────┐ │
│                  │  │ Nome: Miau                          │ │
│                  │  │ Tipo: Gato                          │ │
│                  │  │ Idade: 2 anos                       │ │
│                  │  │ Cliente: Maria Santos               │ │
│                  │  │ Status: Ativo                       │ │
│                  │  │ [Editar] [Inativar]                 │ │
│                  │  └─────────────────────────────────────┘ │
│                  │                                           │
│                  │  Pets Inativos:                           │
│                  │  ┌─────────────────────────────────────┐ │
│                  │  │ Nome: Fluffy                        │ │
│                  │  │ Status: Inativo                     │ │
│                  │  │ [Reativar]                          │ │
│                  │  └─────────────────────────────────────┘ │
│                  │                                           │
└──────────────────────────────────────────────────────────────┘
```

**Componentes:**
- Título "Gestão de Pets"
- Botão "Novo Pet" (abre modal)
- Cards de pets ativos (3 colunas)
- Seção de pets inativos
- Botões: Editar, Inativar, Reativar

**Modal - Novo/Editar Pet:**
```
┌─────────────────────────────────┐
│  Novo Pet                       │
├─────────────────────────────────┤
│                                 │
│  Cliente: [Selecionar ▼]        │
│                                 │
│  Nome: [________________]        │
│                                 │
│  Tipo: [Selecionar ▼]           │
│         - Cachorro              │
│         - Gato                  │
│         - Coelho                │
│         - Hamster               │
│         - Pássaro               │
│         - Outro                 │
│                                 │
│  Idade: [__] anos               │
│                                 │
│  [Cancelar] [Cadastrar]         │
│                                 │
└─────────────────────────────────┘
```

---

## 5. Página de Veterinários

```
┌──────────────────────────────────────────────────────────────┐
│  [Logo] PetCare  │  Gestão de Veterinários                   │
│  ─────────────   │                                           │
│  [Dashboard]     │  [Novo Veterinário]                       │
│  [Clientes]      │                                           │
│  [Pets]          │  Veterinários Ativos:                     │
│  [Veterinários]  │                                           │
│  [Consultas]     │  ┌─────────────────────────────────────┐ │
│  ─────────────   │  │ Nome: Dr. Silva                     │ │
│                  │  │ CRMV: 12345/SP                      │ │
│                  │  │ Telefone: (11) 98765-4321           │ │
│                  │  │ Status: Ativo                       │ │
│                  │  │ [Editar] [Inativar]                 │ │
│                  │  └─────────────────────────────────────┘ │
│  [Sair]          │                                           │
│                  │  ┌─────────────────────────────────────┐ │
│                  │  │ Nome: Dra. Costa                    │ │
│                  │  │ CRMV: 67890/SP                      │ │
│                  │  │ Telefone: (11) 91234-5678           │ │
│                  │  │ Status: Ativo                       │ │
│                  │  │ [Editar] [Inativar]                 │ │
│                  │  └─────────────────────────────────────┘ │
│                  │                                           │
│                  │  Veterinários Inativos:                   │
│                  │  ┌─────────────────────────────────────┐ │
│                  │  │ Nome: Dr. Santos                    │ │
│                  │  │ Status: Inativo                     │ │
│                  │  │ [Reativar]                          │ │
│                  │  └─────────────────────────────────────┘ │
│                  │                                           │
└──────────────────────────────────────────────────────────────┘
```

**Componentes:**
- Título "Gestão de Veterinários"
- Botão "Novo Veterinário" (abre modal)
- Cards de veterinários ativos (3 colunas)
- Seção de veterinários inativos
- Botões: Editar, Inativar, Reativar

**Modal - Novo/Editar Veterinário:**
```
┌─────────────────────────────────┐
│  Novo Veterinário               │
├─────────────────────────────────┤
│                                 │
│  Nome: [________________]        │
│                                 │
│  CRMV: [________________]        │
│                                 │
│  Telefone: [________________]    │
│                                 │
│  [Cancelar] [Cadastrar]         │
│                                 │
└─────────────────────────────────┘
```

---

## 6. Página de Consultas

```
┌──────────────────────────────────────────────────────────────┐
│  [Logo] PetCare  │  Gestão de Consultas                      │
│  ─────────────   │                                           │
│  [Dashboard]     │  [Nova Consulta]                          │
│  [Clientes]      │                                           │
│  [Pets]          │  CONSULTAS ABERTAS:                       │
│  [Veterinários]  │                                           │
│  [Consultas]     │  ┌─────────────────────────────────────┐ │
│  ─────────────   │  │ Pet: Rex                            │ │
│                  │  │ Veterinário: Dr. Silva              │ │
│                  │  │ Data: 15/05/2026 14:30              │ │
│                  │  │ Descrição: Consulta de rotina       │ │
│                  │  │ Status: ABERTA                      │ │
│                  │  │ [Finalizar] [Cancelar]              │ │
│                  │  └─────────────────────────────────────┘ │
│  [Sair]          │                                           │
│                  │  ┌─────────────────────────────────────┐ │
│                  │  │ Pet: Miau                           │ │
│                  │  │ Veterinário: Dra. Costa             │ │
│                  │  │ Data: 16/05/2026 10:00              │ │
│                  │  │ Descrição: Vacinação                │ │
│                  │  │ Status: ABERTA                      │ │
│                  │  │ [Finalizar] [Cancelar]              │ │
│                  │  └─────────────────────────────────────┘ │
│                  │                                           │
│                  │  CONSULTAS FINALIZADAS:                   │
│                  │  ┌─────────────────────────────────────┐ │
│                  │  │ Pet: Buddy                          │ │
│                  │  │ Veterinário: Dr. Silva              │ │
│                  │  │ Status: FINALIZADA                  │ │
│                  │  └─────────────────────────────────────┘ │
│                  │                                           │
│                  │  CONSULTAS CANCELADAS:                    │
│                  │  ┌─────────────────────────────────────┐ │
│                  │  │ Pet: Fluffy                         │ │
│                  │  │ Motivo: Cancelada pelo usuário      │ │
│                  │  │ Status: CANCELADA                   │ │
│                  │  └─────────────────────────────────────┘ │
│                  │                                           │
└──────────────────────────────────────────────────────────────┘
```

**Componentes:**
- Título "Gestão de Consultas"
- Botão "Nova Consulta" (abre modal)
- Seção de Consultas Abertas (com botões Finalizar e Cancelar)
- Seção de Consultas Finalizadas (apenas visualização)
- Seção de Consultas Canceladas (apenas visualização)
- Cards separados por status

**Modal - Nova Consulta:**
```
┌─────────────────────────────────┐
│  Nova Consulta                  │
├─────────────────────────────────┤
│                                 │
│  Pet: [Selecionar ▼]            │
│                                 │
│  Veterinário: [Selecionar ▼]    │
│                                 │
│  Data: [________________]        │
│                                 │
│  Descrição: [________________]   │
│                                 │
│  [Cancelar] [Registrar]         │
│                                 │
└─────────────────────────────────┘
```

---

## Estrutura Geral do Layout

### Sidebar (Esquerda - 20% da largura)
```
┌──────────────────┐
│ [Logo] PetCare   │
├──────────────────┤
│ ☰ Dashboard      │
│ 👥 Clientes      │
│ 🐾 Pets          │
│ 🩺 Veterinários  │
│ 📅 Consultas     │
├──────────────────┤
│ 🚪 Sair          │
└──────────────────┘
```

### Conteúdo Principal (Direita - 80% da largura)
```
┌─────────────────────────────────────┐
│ [Título da Página]                  │
│ [Botão de Ação Principal]            │
├─────────────────────────────────────┤
│                                     │
│ [Filtros/Busca]                     │
│                                     │
│ [Grid de Cards / Tabela de Dados]   │
│                                     │
│ [Paginação (se necessário)]         │
│                                     │
└─────────────────────────────────────┘
```

---

## Fluxo de Navegação

```
LOGIN
  ↓
DASHBOARD (página inicial após login)
  ├→ CLIENTES
  │   ├→ Novo Cliente (modal)
  │   ├→ Editar Cliente (modal)
  │   └→ Inativar/Reativar Cliente
  │
  ├→ PETS
  │   ├→ Novo Pet (modal)
  │   ├→ Editar Pet (modal)
  │   └→ Inativar/Reativar Pet
  │
  ├→ VETERINÁRIOS
  │   ├→ Novo Veterinário (modal)
  │   ├→ Editar Veterinário (modal)
  │   └→ Inativar/Reativar Veterinário
  │
  └→ CONSULTAS
      ├→ Nova Consulta (modal)
      ├→ Finalizar Consulta
      └→ Cancelar Consulta

SAIR → LOGIN
```

---

## Padrões de Design

### Cores (Referência)
- **Primária:** Azul Céu (#87CEEB)
- **Secundária:** Amarelo Solar (#FFD700)
- **Ação:** Laranja (#FF8C42)
- **Sucesso:** Verde Menta (#98FF98)
- **Atenção:** Rosa Coral (#FF6B9D)
- **Erro:** Vermelho (#E74C3C)

### Tipografia
- **Títulos:** Poppins Bold (700)
- **Subtítulos:** Poppins SemiBold (600)
- **Corpo:** Inter Regular (400)

### Componentes Reutilizáveis
- **Card:** Borda colorida (4px), sombra suave, hover com elevação
- **Botão:** Gradiente colorido, texto branco, arredondado, hover com escala
- **Modal:** Fundo escuro semi-transparente, card centralizado
- **Input:** Borda 2px colorida, foco com ring
- **Select:** Dropdown com ícone, opções em lista

### Espaçamento
- Padding padrão: 16px (1rem)
- Margin entre elementos: 24px (1.5rem)
- Gap entre grid items: 24px (1.5rem)

### Responsividade
- **Mobile:** 1 coluna
- **Tablet:** 2 colunas
- **Desktop:** 3 colunas (cards) ou 4 colunas (stats)

