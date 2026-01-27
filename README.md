# Cloudflare Workers Full-Stack Chat Demo

[cloudflarebutton]

## Overview

This is a production-ready full-stack chat application template built on Cloudflare Workers. It demonstrates a real-world chat system with users, chat boards, and messages, using Durable Objects for state management. The frontend is a modern React app with shadcn/ui components, while the backend provides a type-safe API with Hono.

Key highlights:
- One Durable Object instance per entity (users, chats) for strong consistency
- Indexed listing with pagination
- Seed data for quick demos
- Hot-reloadable routes without redeploying
- Shared TypeScript types between frontend and backend

## Features

- **User Management**: Create, list, delete users with pagination
- **Chat Boards**: Create chats, send/retrieve messages per chat
- **Global Durable Object**: Efficient multi-entity storage without namespace sprawl
- **Type-Safe API**: Full TypeScript support across stack with `@shared/types`
- **Modern UI**: shadcn/ui components, Tailwind CSS, dark mode, responsive design
- **Offline-First Seed Data**: Mock users/chats/messages auto-populate on first run
- **Error Handling**: Client/server error reporting
- **Development Workflow**: Vite dev server + Wrangler integration

## Tech Stack

| Layer | Technologies |
|-------|--------------|
| **Frontend** | React 18, Vite, TypeScript, shadcn/ui, Tailwind CSS, TanStack Query, React Router, Lucide Icons, Sonner (toasts), Framer Motion |
| **Backend** | Cloudflare Workers, Hono, Durable Objects (SQLite-backed), TypeScript |
| **State** | Durable Objects (GlobalDurableObject pattern), Indexed entities |
| **Dev Tools** | Bun (package manager), Wrangler CLI, ESLint, Tailwind IntelliSense |
| **Utilities** | Immer, Zod (validation-ready), UUID, Date-fns |

## Prerequisites

- [Bun](https://bun.sh/) (v1.1+)
- [Cloudflare Account](https://dash.cloudflare.com/)
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/install/) (`bunx wrangler@latest`)

## Quick Start (Local)

1. **Clone & Install**
   ```bash
   git clone <repo-url>
   cd <project>
   bun install
   ```

2. **Run Development Server**
   ```bash
   bun dev
   ```
   - Frontend: http://localhost:3000 (Vite HMR)
   - Backend: http://localhost:8787 (Wrangler dev, auto-proxied)

3. **Test APIs**
   ```bash
   curl http://localhost:8787/api/health  # ✅ Healthy
   curl http://localhost:8787/api/users   # 📋 Lists seeded users
   ```

## Development Workflow

- **Frontend Changes**: Edit `src/` → Auto-reloads in browser
- **Backend Routes**: Add to `worker/user-routes.ts` → Hot-reloads (no restart)
- **New Entities**: Extend `IndexedEntity` in `worker/entities.ts`
- **Custom Routes**: Mount in `userRoutes()` → Bound via `safeLoadUserRoutes`
- **Type Generation**: `bun run cf-typegen` (updates `worker/index.ts.d.ts`)
- **Lint & Build**: `bun lint` / `bun build`

**Example API Usage (Frontend)**:
```ts
// src/lib/api-client.ts
import { api } from '@/lib/api-client';

const users = await api<User[]>('/api/users');
const chat = await api<Chat>('/api/chats', {
  method: 'POST',
  body: JSON.stringify({ title: 'New Chat' })
});
```

**Seeds Auto-Populate**: First `/api/users` or `/api/chats` call initializes mock data.

## Project Structure

```
├── shared/          # Shared TS types & mocks
├── src/             # React frontend (Vite)
│   ├── components/  # shadcn/ui + custom
│   ├── hooks/       # Custom hooks
│   ├── lib/         # API client, utils
│   └── pages/       # Router pages
├── worker/          # Hono API + Durable Objects
│   ├── core-utils.ts # Entity base classes (DO NOT MODIFY)
│   ├── entities.ts  # UserEntity, ChatBoardEntity
│   ├── index.ts     # Core worker (DO NOT MODIFY)
│   └── user-routes.ts # YOUR ROUTES HERE
└── ...              # Configs (tsconfig, tailwind, wrangler)
```

## Deployment

1. **Build Assets**
   ```bash
   bun run build  # Builds static assets to dist/
   ```

2. **Deploy to Cloudflare**
   ```bash
   bun run deploy  # wrangler deploy
   ```
   - Deploys Worker + Pages (SPA fallback)
   - Durable Objects migrate automatically
   - Custom domain: Edit `wrangler.toml`

3. **One-Click Deploy**
   [cloudflarebutton]

**Production URLs**:
- API: `https://<worker>.<subdomain>.workers.dev/api/*`
- Frontend: `https://<pages>.<subdomain>.pages.dev`

**Observability**: Metrics/Logs auto-enabled via `wrangler.jsonc`.

## Customizing

- **Replace HomePage**: Edit `src/pages/HomePage.tsx`
- **Add Entities**: Extend `worker/entities.ts` → Auto-indexed CRUD APIs
- **New Routes**: `worker/user-routes.ts` → GET/POST/DELETE patterns included
- **UI Components**: `npx shadcn-ui@latest add <component>`
- **Theme**: Edit `tailwind.config.js` / `src/index.css`

## Troubleshooting

- **Bun Issues**: `bun --version` / `curl -fsSL https://bun.sh/install | bash`
- **Worker Errors**: Check `wrangler tail`
- **Types Missing**: `bun run cf-typegen`
- **CORS**: Pre-configured for `*` in dev/prod
- **Migrations**: Durable Objects auto-migrate on deploy

## Contributing

1. Fork & PR
2. Follow TS/ESLint rules
3. Test locally: `bun test` (add tests to `/tests`)
4. Update README for new features

## License

MIT. See [LICENSE](LICENSE) for details.

---

⭐ **Star on GitHub** · 💬 **Issues** · 🛠️ **Built with Cloudflare Workers**