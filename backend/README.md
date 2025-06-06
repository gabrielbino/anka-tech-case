# 🛠️ Anka Tech – Backend

Este repositório contém o backend do sistema de gestão de clientes e ativos financeiros, desenvolvido como parte do Anka Tech Case. O projeto segue boas práticas de código, modularização e escalabilidade, utilizando tecnologias modernas e ambiente Dockerizado.

---

## ✅ Tecnologias Utilizadas

- **Node.js + TypeScript**
- **Fastify** — servidor leve, escalável e moderno
- **Prisma ORM** — comunicação com banco de dados MySQL
- **Zod** — validação de dados no backend
- **Docker + Docker Compose** — ambiente isolado com banco MySQL
- **MySQL** — banco de dados relacional
- **Git + Conventional Commits** — versionamento organizado

---

## 📁 Estrutura de Pastas

```
src/
├── controllers/      # Lógica de cada rota
├── lib/              # Configuração do Prisma
├── routes/           # Definição de rotas e prefixos
├── schemas/          # Schemas Zod para validação
├── server.ts         # Ponto de entrada do app Fastify
```

---

## 🚀 Funcionalidades Implementadas

- [x] **CRUD completo de Clientes** (`nome`, `email`, `status`)
- [x] **Listagem de Ativos fixos** com valores estáticos (`GET /assets`)
- [x] **Relação entre Clientes e Ativos**
  - Campo obrigatório `clientId` na tabela `Asset`
  - Endpoint `GET /clients/:id/assets` para exibir ativos vinculados a um cliente
- [x] **Validação de entrada** com Zod antes da persistência
- [x] **Migrations com Prisma**
- [x] **Ambiente de desenvolvimento Dockerizado com MySQL**

---

## ▶️ Como rodar o projeto

### 1. Pré-requisitos

- [Docker + Docker Compose](https://docs.docker.com/compose/install/)
- [Node.js](https://nodejs.org/en/) (caso queira rodar fora do Docker)
- [PNPM](https://pnpm.io/) recomendado para gerenciar dependências

---

### 2. Clonando o projeto

```bash
git clone https://github.com/seu-usuario/anka-tech-case.git
cd anka-tech-case/backend
```

---

### 3. Criar o arquivo `.env`

Crie o arquivo `.env` na raiz do backend com o seguinte conteúdo:

```env
DATABASE_URL="mysql://root:root@localhost:3306/ankadb"
```

---

### 4. Subir o banco de dados com Docker

```bash
docker compose up -d
```

---

### 5. Instalar dependências

```bash
pnpm install
# ou
npm install
```

---

### 6. Rodar as migrations

> ⚠️ Caso a tabela de `Asset` já contenha dados, use a flag `--create-only` e ajuste manualmente o SQL.

```bash
npx prisma migrate dev --name init
```

---

### 7. Rodar o servidor Fastify

```bash
pnpm dev
# ou
npm run dev
```

O servidor estará disponível em:  
🔗 `http://localhost:3001`

---

## 📡 Endpoints disponíveis

| Método | Rota                         | Descrição                                      |
|--------|------------------------------|------------------------------------------------|
| GET    | `/clients`                   | Listar todos os clientes                       |
| POST   | `/clients`                   | Cadastrar um novo cliente                      |
| PUT    | `/clients/:id`               | Atualizar um cliente                           |
| DELETE | `/clients/:id`               | Remover um cliente                             |
| GET    | `/assets`                    | Listar ativos financeiros fixos                |
| POST   | `/assets`                    | Criar um novo ativo vinculado a um cliente     |
| GET    | `/clients/:id/assets`        | Listar ativos vinculados a um cliente específico|

---

## 🧪 Testes

> Ainda não implementado. A estrutura suporta testes com frameworks como Vitest, Jest ou Supertest para endpoints.

---

## 📌 Observações

- O projeto segue padrão RESTful
- Os commits são feitos com **Conventional Commits**
- O ambiente está preparado para evoluções futuras, como autenticação, testes automatizados e CI/CD

---

## 👨‍💻 Autor

Gabriel Bino – [LinkedIn](https://www.linkedin.com/in/gabrielfbino/) 