# Second Brain

Second Brain is a minimal AI-powered workspace built with Next.js, Clerk, Corsair, and OpenAI Agents. It includes a clean chat interface and connected integrations for Gmail and Google Calendar.

Live URL: https://secondbrain.sameerbhagtani.dev

## Setup

```bash
git clone https://github.com/sameerbhagtani/second-brain
cd second-brain
pnpm i
cp .env.example .env
```

Update the environment variables in `.env`.

Start Postgres:

```bash
pnpm db:up
```

Run database migrations:

```bash
pnpm db:migrate
```

Set up Corsair integrations:

```bash
pnpm corsair setup --plugin=gmail client_id=your_client_id client_secret=your_client_secret

pnpm corsair setup --plugin=googlecalendar client_id=your_client_id client_secret=your_client_secret
```

Run the app:

```bash
pnpm dev
```

## Tech Stack

- Next.js
- React
- TypeScript
- Clerk
- Corsair
- OpenAI Agents SDK
- Drizzle ORM
- PostgreSQL
- Tailwind CSS
