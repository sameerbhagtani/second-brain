import { loadEnvConfig } from "@next/env";
loadEnvConfig(process.cwd());

import { defineConfig } from "drizzle-kit";

export default defineConfig({
    out: "./src/db/migrations",
    schema: "./src/db/schemas/*",
    dialect: "postgresql",
    dbCredentials: {
        url: process.env.DATABASE_URL!,
    },
});
