# Anka Tech Case – Sistema de Gestão de Clientes e Ativos Financeiros

> Projeto fullstack desenvolvido como parte do desafio Anka Tech. Este sistema permite cadastrar clientes, vincular ativos financeiros, visualizar alocações e manter toda a gestão organizada via painel web. A stack utilizada prioriza escalabilidade, manutenção e boas práticas de código.

## 📊 Tecnologias Utilizadas

### Frontend:
- [Next.js 13+ App Router](https://nextjs.org/docs/app)
- TypeScript
- TailwindCSS
- React Query
- React Hook Form
- Zod (validação de formulários)

### Backend:
- Fastify
- Prisma ORM
- MySQL (via Docker)
- Arquitetura modular (controllers, routes, schemas)

---

## 🚀 Funcionalidades Implementadas

### Clientes:
- [x] Cadastro de cliente (nome, e-mail, status)
- [x] Edição de cliente com modal
- [x] Exclusão de cliente com modal de confirmação
- [x] Listagem geral dos clientes cadastrados
- [x] Validação de dados com Zod

### Ativos:
- [x] Cadastro de ativo financeiro (nome, valor, categoria, clientId obrigatório)
- [x] Listagem de ativos fixos na rota `/assets`
- [x] Listagem de ativos vinculados a um cliente na rota `/clients/[id]`
- [x] Relacionamento client ➔ asset via Prisma
- [x] Atualização automática da UI após operações (invalidateQueries)

### UI / UX:
- [x] Modal de edição responsiva
- [x] Feedback visual com toast de sucesso/erro
- [x] Cards clicáveis com navegação dinâmica
- [x] Fallback de erros

---

## 📂 Estrutura de Pastas (resumo)

```
/anka-tech-case
├── backend
│   ├── prisma/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── schemas/
│   │   └── lib/
│   └── server.ts
├── frontend
│   └── app/
│       ├── components/
│       │   ├── client/
│       │   └── asset/
│       ├── clients/
│       └── assets/
└── docker-compose.yml
```

---

## 🚧 Como Rodar o Projeto Localmente

### 1. Clonar o repositório
```bash
git clone https://github.com/seu-usuario/anka-tech-case.git
cd anka-tech-case
```

### 2. Subir o banco com Docker
```bash
docker compose up -d
```

### 3. Configurar variáveis de ambiente (arquivo `.env` na pasta `backend`)
```env
DATABASE_URL="mysql://root:senha@localhost:3306/ankadb"
```

### 4. Rodar as migrations e popular o banco
```bash
cd backend
npx prisma migrate dev --name init
```

### 5. Iniciar o backend
```bash
npm install
npm run dev
```

### 6. Iniciar o frontend
```bash
cd ../frontend
npm install
npm run dev
```

Acesse em `http://localhost:3000`

---

## 🗒️ Scripts Disponíveis

### Backend
```bash
npm run dev       # Inicia servidor Fastify
npx prisma studio # Visualiza dados do banco
```

### Frontend
```bash
npm run dev       # Inicia projeto Next.js
```

---

## 📊 Boas Práticas Adotadas
- Modularização clara no backend (rotas, controladores, validações)
- Padronização de commits com Conventional Commits
- Controle de erros em todas as operações
- Validação forte com Zod e Prisma
- Tipagem com TypeScript em 100% do projeto
- Feedback visual consistente com `use-toast`
- Carregamento otimizado com React Query e invalidates

---

## 🚫 Pontos Fora do Escopo (não incluídos propositalmente)
- Autenticação de usuário
- Paginação e busca de clientes
- Upload de arquivos ou imagens

---

## 👤 Autor
Gabriel Bino  
[LinkedIn](https://www.linkedin.com/in/gabrielfbino/)  
Estudante de Sistemas de Informação | Dev Fullstack | Foco em Excelência e Propósito
