# 🎬 Cinematica — Your Personal Cinema Vault

A cinematic dark-themed movie and TV show watchlist tracker built with Next.js, MongoDB, and TMDB API. Track what you're watching, what you've watched, and discover new titles — all in a retro cinema dashboard aesthetic.

---

## ✨ Features

- **Dark Retro Cinema Dashboard** — Cinematic UI with gold accents, film grain, smooth animations
- **Search** — Find any movie or TV show via TMDB API
- **Watchlist Management** — Add, remove, and update status (Watching / Watched / Plan to Watch)
- **Dashboard Overview** — 4 category rows: Movies, TV Shows, Watching, Watched
- **Stats Widget** — Total counts for each category
- **Authentication** — Secure email/password auth via NextAuth.js
- **Persistent Storage** — MongoDB stores your entire watchlist
- **Responsive** — Works on desktop and mobile
- **Toast Notifications** — Real-time feedback on all actions
- **Skeleton Loaders** — Smooth loading states

---

## 🛠 Tech Stack

| Layer | Tech |
|-------|------|
| Frontend | Next.js 14 (App Router), React, Tailwind CSS |
| Backend | Next.js API Routes (serverless) |
| Database | MongoDB + Mongoose |
| Auth | NextAuth.js (credentials) |
| API | TMDB (The Movie Database) |
| Deployment | Vercel |

---

## 🚀 Quick Start

### 1. Clone and install

```bash
git clone <repo-url>
cd cinematica
npm install
```

### 2. Set up environment variables

```bash
cp .env.example .env.local
```

Edit `.env.local` with your values (see below).

### 3. Run locally

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

---

## 🔑 Environment Variables

Create `.env.local` with these values:

```env
# MongoDB Atlas connection string
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/cinematica

# TMDB API Read Access Token (Bearer token, not API key)
TMDB_API_KEY=your_tmdb_read_access_token

# NextAuth secret (generate: openssl rand -base64 32)
NEXTAUTH_SECRET=your_secret_here

# Your app URL
NEXTAUTH_URL=http://localhost:3000
```

---

## 🎬 TMDB API Setup

1. Go to [https://www.themoviedb.org/](https://www.themoviedb.org/) and create an account
2. Navigate to **Settings → API**
3. Request an API key (choose "Developer")
4. Copy the **API Read Access Token** (the long JWT, not the short API key)
5. Paste it as `TMDB_API_KEY` in your `.env.local`

> **Note:** Cinematica uses the Bearer token auth method, so use the "API Read Access Token", not the v3 API key.

---

## 🗄 MongoDB Setup

1. Go to [https://www.mongodb.com/atlas](https://www.mongodb.com/atlas) and create a free account
2. Create a new **Free Tier Cluster**
3. Create a database user with username/password
4. Under **Network Access**, add `0.0.0.0/0` (allow all IPs — required for Vercel)
5. Get your connection string from **Connect → Drivers**
6. Replace `<username>`, `<password>`, and set database name to `cinematica`

---

## 📦 Vercel Deployment

1. Push your project to GitHub
2. Go to [https://vercel.com](https://vercel.com) and import your repo
3. Add all environment variables from `.env.local` in the Vercel dashboard:
   - `MONGODB_URI`
   - `TMDB_API_KEY`
   - `NEXTAUTH_SECRET`
   - `NEXTAUTH_URL` → set to your Vercel deployment URL (e.g., `https://cinematica.vercel.app`)
4. Deploy!

> **Tip:** After first deploy, update `NEXTAUTH_URL` to your actual Vercel URL and redeploy.

---

## 📁 Project Structure

```
cinematica/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   │   ├── [...nextauth]/route.ts
│   │   │   │   └── register/route.ts
│   │   │   ├── watchlist/
│   │   │   │   ├── route.ts          (GET, POST)
│   │   │   │   └── [id]/route.ts     (PATCH, DELETE)
│   │   │   └── search/route.ts
│   │   ├── auth/
│   │   │   ├── login/page.tsx
│   │   │   └── register/page.tsx
│   │   ├── movies/page.tsx
│   │   ├── tv/page.tsx
│   │   ├── watching/page.tsx
│   │   ├── watched/page.tsx
│   │   ├── search/page.tsx
│   │   ├── page.tsx                  (Dashboard)
│   │   ├── layout.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   └── PageLayout.tsx
│   │   ├── ui/
│   │   │   ├── PosterCard.tsx
│   │   │   ├── SearchResultCard.tsx
│   │   │   └── Skeletons.tsx
│   │   ├── dashboard/
│   │   │   ├── StatsWidget.tsx
│   │   │   └── DashboardRow.tsx
│   │   ├── WatchlistPage.tsx
│   │   └── Providers.tsx
│   ├── lib/
│   │   ├── mongodb.ts
│   │   ├── tmdb.ts
│   │   └── auth.ts
│   ├── models/
│   │   └── User.ts
│   └── types/
│       └── index.ts
├── public/
│   └── placeholder-poster.svg
├── .env.example
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## 🎨 Design System

| Token | Value |
|-------|-------|
| Background | `#0a0a0a` (cinema black) |
| Surface | `#1a1a1a` (charcoal) |
| Gold accent | `#c9a84c` |
| Gold light | `#e8c96d` |
| Text | `#e5e5e5` |
| Muted | `#6b6b6b` |

---

## 📜 License

MIT — use freely, watch endlessly.
