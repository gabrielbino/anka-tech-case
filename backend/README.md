# Anka Tech - Backend Challenge

Este repositório contém a implementação do backend para o desafio técnico da Anka Tech, desenvolvido com foco em boas práticas de arquitetura, escalabilidade e legibilidade de código.

---

## ✅ Tecnologias Utilizadas

- **Node.js + TypeScript**
- **Fastify** — servidor leve e rápido
- **Prisma ORM** — comunicação com banco de dados MySQL
- **Zod** — validação segura dos dados
- **Docker + Docker Compose** — ambiente local isolado
- **MySQL** — banco de dados relacional
- **Git + Conventional Commits** — controle de versão estruturado

---

## 📁 Funcionalidades já implementadas

- [x] CRUD completo de **Clientes** (`nome`, `email`, `status`)
- [x] Endpoint de listagem de **Ativos financeiros fixos**
- [x] Validação de entrada com **Zod**
- [x] Integração com banco de dados via **Prisma ORM**
- [x] Configuração do ambiente com **Docker Compose**
- [x] Estrutura modular com separação de responsabilidades:
  - `routes/`
  - `controllers/`
  - `schemas/`

---

## ▶️ Como rodar o projeto

### Pré-requisitos

- [Docker + Docker Compose](https://docs.docker.com/compose/install/)
- [Node.js](https://nodejs.org/) instalado localmente (caso queira executar sem Docker)

### Passo a passo

```bash
git clone git@github-anka:SEU_USUARIO/anka-tech-case.git
cd anka-tech-case
docker compose up --build
