# 🎨 Draw App – Realtime Collaborative Whiteboard

A realtime collaborative drawing application inspired by **Excalidraw**. Users can draw **circles, rectangles, pencil** strokes on a shared canvas and see updates instantly using **WebSockets**.

Built with a modern full‑stack setup: **Next.js frontend**, **HTTP + WebSocket backend**, **PostgreSQL** for persistence, **Prisma** for ORM, and **Tailwind CSS** for styling.

---

## ✨ Features

- 🧑‍🤝‍🧑 **Realtime collaboration** using WebSockets
- ✏️ Draw **Rectangle**, **Circle**, and **Pencil** shapes
- 🔄 Instant sync across all connected users
- 💾 Persistent canvas data stored in **PostgreSQL**
- 🎨 Clean and responsive UI with **Tailwind CSS**
- 🧩 Monorepo architecture for shared code and scalability

---

## 🏗️ Tech Stack

### Frontend

- **Next.js (App Router)**
- **React**
- **Tailwind CSS**
- **Canvas API**

### Backend

- **Node.js**
- **HTTP API** (for auth / rooms / initial data)
- **WebSocket Server** (for realtime drawing updates)
- **Prisma ORM**

### Database

- **PostgreSQL**

### Tooling

- **pnpm workspaces**
- **TypeScript**
- **Turborepo / TS project references**

<!-- ## 🧠 Data Model (Shapes)

Each drawn element is stored in PostgreSQL with its type and properties.

Example shape structure:

```ts
{
  id: string;
  roomId: string;
  type: "rectangle" | "circle" | "pencil";
  x: number;
  y: number;
  width?: number;
  height?: number;
  radius?: number;
  points?: { x: number; y: number }[]; // for pencil
  strokeColor: string;
  strokeWidth: number;
  createdAt: Date;
}
``` -->

## 🔌 Realtime Architecture

1. User joins a room
2. Existing shapes are fetched via HTTP
3. WebSocket connection is established
4. Any new drawing action:
   - Broadcasted to all clients in the room
   - Persisted in PostgreSQL

5. Other users receive and render updates instantly

---

## 🚀 Getting Started

### 1️⃣ Install dependencies

```bash
pnpm install
```

### 2️⃣ Setup environment variables

```env
DATABASE_URL=postgresql://user:password@localhost:5432/drawapp
```

### 3️⃣ Run database migrations

```bash
pnpm --filter @repo/db prisma migrate dev
```

### 4️⃣ Build all packages

```bash
pnpm build
```

### 5️⃣ Start development servers

```bash
pnpm dev
```

- Frontend: `http://localhost:3000`
- http-backend: `http://localhost:3001`
- ws-backend: `http://localhost:8080`

---

## 🧪 Future Improvements

- 🔐 Authentication & user cursors
- 📄 Multiple pages per canvas
- ⏪ Undo / redo support
- 🧠 Shape selection & resizing

---

## 🙌 Inspiration

Inspired by **Excalidraw**, focusing on simplicity, realtime collaboration, and clean architecture.

---

## 📜 License

MIT License

---

**Made with ❤️ using TypeScript, WebSockets, and PostgreSQL**
