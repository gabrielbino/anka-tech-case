# 📦 Anka Tech Case – Frontend

## ✨ Visão Geral
Este é o frontend do projeto **Anka Tech Case**, uma aplicação de gestão de clientes e ativos financeiros. Desenvolvido com **Next.js 13+ (App Router)** e tecnologias modernas, o projeto prioriza boas práticas de UI/UX, componentização limpa e interações fluídas com feedbacks visuais.

## 🚀 Tecnologias Utilizadas
- **Next.js 13+ (App Router)**
- **TypeScript**
- **TailwindCSS**
- **React Hook Form**
- **Zod**
- **React Query**
- **Axios**

## 📁 Estrutura de Pastas
```
/app
  ├── components
  │   ├── client
  │   │   ├── ClientList.tsx
  │   │   ├── CreateClientModal.tsx
  │   │   ├── EditClientModal.tsx
  │   │   └── ConfirmDeleteModal.tsx
  │   └── asset
  │       ├── AssetForm.tsx
  │       └── AssetList.tsx
  ├── page.tsx (home)
  └── clients/[id]/page.tsx (visualização das alocações)
/lib
  ├── hooks
  │   └── use-toast.ts
  ├── validators
  │   ├── clientSchema.ts
  │   └── assetSchema.ts
```

## 🔄 Funcionalidades
- ✅ Cadastro, listagem, edição e exclusão de clientes
- ✅ Cadastro de ativos financeiros (valores fixos ou livres)
- ✅ Relacionamento entre ativos e clientes
- ✅ Modal de confirmação de exclusão
- ✅ Feedbacks visuais com toasts
- ✅ Validações com Zod integradas ao React Hook Form
- ✅ Navegação dinâmica para /clients/[id] com visualização das alocações

## 🧪 Boas Práticas Aplicadas
- ✅ Separação de responsabilidades por componente
- ✅ Uso de React Query com `invalidateQueries` para atualização automática
- ✅ Estilização responsiva com Tailwind
- ✅ Tipagem rigorosa com TypeScript
- ✅ Validação declarativa com Zod
- ✅ Uso de modais acessíveis com Headless UI

## ⚙️ Como Rodar o Projeto
### Pré-requisitos
- Node.js >= 18
- Docker (para o banco de dados MySQL)

### Instalação
```bash
# Acesse a pasta do frontend
cd frontend

# Instale as dependências
npm install

# Execute o frontend
npm run dev
```

> O frontend estará disponível em `http://localhost:3000`

## 🔌 Conexão com o Backend
- O backend está rodando localmente na porta `3001`
- As rotas utilizadas são:
  - `GET /clients`
  - `POST /clients`
  - `PUT /clients/:id`
  - `DELETE /clients/:id`
  - `GET /assets`
  - `POST /assets`

## 📌 Observações
- A listagem de ativos estática retorna ativos com nomes fixos como "Ação XYZ" e "Fundo ABC"
- Os ativos são vinculados diretamente a um cliente durante a criação
- O botão "Editar" abre modal pré-preenchido
- O botão "Excluir" abre modal de confirmação segura

## 🛠️ Em Desenvolvimento
- Filtro por categoria de ativo
- Dashboard analítico por cliente

---

> Desenvolvido por Gabriel Bino – 2025