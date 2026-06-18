import { loadEnvConfig } from "@next/env";
loadEnvConfig(process.cwd());

import { createCorsair } from "corsair";
import { gmail } from "@corsair-dev/gmail";
import { googlecalendar } from "@corsair-dev/googlecalendar";

import { pool } from "@/db";

export const corsair = createCorsair({
    plugins: [gmail({ authType: "oauth_2" }), googlecalendar()],
    database: pool,
    kek: process.env.CORSAIR_KEK!,
    multiTenancy: true,
});
