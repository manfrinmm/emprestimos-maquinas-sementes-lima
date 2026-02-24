# Machine Tracker — Controle Agrícola

Sistema interno para controle e rastreio de máquinas e empréstimos no contexto agrícola (Sementes Lima).

## Tecnologias

- **Next.js 16** (App Router)
- **React 19**
- **Prisma** + PostgreSQL
- **Tailwind CSS 4** + shadcn/ui
- **Zod** (validação)
- **Lucide React** (ícones)

## Pré-requisitos

- Node.js 20+
- pnpm
- PostgreSQL em execução (ex.: Docker)

## Configuração

1. Clone o repositório e instale as dependências:

```bash
pnpm install
```

2. Crie um arquivo `.env` na raiz (ou copie de `.env.example` se existir) e defina:

```env
# Banco de dados (obrigatório para rodar migrations e app)
DATABASE_URL="postgresql://USUARIO:SENHA@localhost:5432/NOME_DO_BANCO?schema=public"
DIRECT_URL="postgresql://USUARIO:SENHA@localhost:5432/NOME_DO_BANCO?schema=public"
```

Substitua `USUARIO`, `SENHA` e `NOME_DO_BANCO` pelos valores do seu PostgreSQL.

## Migrations (Prisma)

1. **Gerar o Prisma Client** (após alterar o `schema.prisma` ou ao subir o projeto):

```bash
pnpm exec prisma generate
```

2. **Criar e aplicar migrations** (cria/atualiza as tabelas no banco):

```bash
pnpm exec prisma migrate dev
```

- Para apenas aplicar migrations já existentes (ex.: em produção):

```bash
pnpm exec prisma migrate deploy
```

- **Desenvolvimento:**

```bash
pnpm run dev
```

Acesse [http://localhost:3000](http://localhost:3000). A rota de login está em `/(login)` (ex.: `/` dependendo do layout/redirect).

- **Build e produção:**

```bash
pnpm run build
pnpm start
```

## Estrutura do projeto

```
├── app/
│   ├── (login)/                 # Rota de login (layout de login)
│   │   ├── _action/             # Server Actions (ex.: loginAction)
│   │   ├── _components/         # Componentes da tela de login (ex.: PasswordInput)
│   │   ├── _types/              # Tipos da página de login
│   │   └── page.tsx             # Página de login
│   ├── api/
│   │   ├── auth/                # Autenticação
│   │   │   ├── controller.ts   # Lógica de login (chama service)
│   │   │   ├── route.ts         # POST /api/auth (login via API)
│   │   │   ├── service.ts       # Regras de negócio + Prisma
│   │   │   └── types.ts         # Tipos de auth
│   │   └── (prisma)/            # Prisma Client singleton
│   │       └── index.ts
│   ├── globals.css              # Estilos globais + tema Tailwind
│   └── layout.tsx               # Layout raiz
├── components/
│   └── ui/                      # Componentes UI (ex.: button)
├── lib/
│   └── utils.ts                 # Utilitários (ex.: cn)
├── prisma/
│   ├── migrations/              # Migrations aplicadas
│   ├── schema.prisma            # Modelos e datasource
│   └── seed.ts                  # (opcional) Seed do banco
├── .env                         # Variáveis de ambiente (não versionar)
├── package.json
└── README.md
```

## Autenticação

- **Login por formulário:** a página em `app/(login)/page.tsx` usa a Server Action `loginAction`, que chama `loginController` e define o cookie `auth-token`.
- **Login por API:** `POST /api/auth` com body `{ "email", "password" }` retorna `{ user, token }` e define o mesmo cookie.
- O token é armazenado em cookie httpOnly; a aplicação pode usá-lo para identificar sessão em rotas protegidas.

## Banco de dados

- **Provider:** PostgreSQL.
- **Modelo principal:** `User` (id, name, email, password, role, createdAt, updatedAt) com enum `UserRole` (ADMIN, USER).
- Schema e migrations ficam em `prisma/schema.prisma` e `prisma/migrations/`.

---

Para dúvidas sobre Prisma: [Prisma Docs](https://www.prisma.io/docs).
