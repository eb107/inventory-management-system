# 📦 IMS — Inventory Management System

Sistema de gerenciamento de inventário desenvolvido com React, Vite e Tailwind CSS, com suporte a exportação de dados para Excel e autenticação de usuários.

---

## 🚀 Tecnologias

| Tecnologia | Versão | Descrição |
|---|---|---|
| [React](https://react.dev/) | 19 | Biblioteca de interface |
| [Vite](https://vitejs.dev/) | 7 | Bundler e servidor de desenvolvimento |
| [Tailwind CSS](https://tailwindcss.com/) | 4 | Estilização utilitária |
| [React Router DOM](https://reactrouter.com/) | 7 | Roteamento SPA |
| [JSON Server](https://github.com/typicode/json-server) | 1.0-beta | API REST fake para desenvolvimento |
| [xlsx](https://sheetjs.com/) | 0.18 | Exportação para Excel |

---

## 📁 Estrutura do Projeto

```
inventario/
├── src/
│   ├── app/            # Componente raiz da aplicação (App.jsx)
│   ├── features/
│   │   └── auth/       # Autenticação (contexto, rotas protegidas)
│   ├── ui/             # Componentes de UI reutilizáveis
│   └── utils/
│       └── exportToExcel.js  # Utilitário de exportação
├── db.json             # Banco de dados local (JSON Server)
├── index.html
├── vite.config.js
└── package.json
```

---

## ⚙️ Pré-requisitos

- [Node.js](https://nodejs.org/) v18 ou superior
- npm v9 ou superior

---

## 🛠️ Instalação

```bash
# Clone o repositório
git clone https://github.com/eb107/inventory-management-system.git
cd inventario

# Instale as dependências
npm install
```

---

## ▶️ Executando o projeto

O projeto precisa de dois processos rodando simultaneamente: o front-end (Vite) e a API local (JSON Server).

```bash
# Terminal 1 — Inicia o servidor de desenvolvimento (front-end)
npm run dev

# Terminal 2 — Inicia a API REST local na porta 3001
npm run server
```

Acesse em: [http://localhost:5173/ims](http://localhost:5173/ims)

> A API estará disponível em `http://localhost:3001`

---

## 📦 Build para produção

```bash
npm run build
```

Os arquivos gerados estarão na pasta `dist/`.

Para visualizar o build localmente:

```bash
npm run preview
```

---

## 📊 Exportação para Excel

O sistema conta com a funcionalidade de exportação de dados diretamente para arquivos `.xlsx`, disponível via o utilitário em `src/utils/exportToExcel.js`.

---

## 🔐 Autenticação

A aplicação utiliza um contexto de autenticação (`AuthContext`) para gerenciar sessões de usuário e proteger rotas da aplicação.

---

## 📋 Scripts disponíveis

| Script | Descrição |
|---|---|
| `npm run dev` | Inicia o servidor de desenvolvimento |
| `npm run build` | Gera o build de produção |
| `npm run preview` | Visualiza o build localmente |
| `npm run lint` | Executa o linter (ESLint) |
| `npm run server` | Inicia o JSON Server na porta 3001 |

---

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature: `git checkout -b feat/minha-feature`
3. Faça o commit das suas alterações: `git commit -m 'feat: minha nova feature'`
4. Envie para a branch: `git push origin feat/minha-feature`
5. Abra um Pull Request

---

## 📄 Licença

Este projeto é privado e de uso interno.
