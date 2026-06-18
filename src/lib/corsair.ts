import { createCorsair } from "corsair";
import { gmail } from "@corsair-dev/gmail";
import { googlecalendar } from "@corsair-dev/googlecalendar";

import db from "@/db";
import env from "./env";

export const corsair = createCorsair({
    plugins: [gmail(), googlecalendar()],
    database: db,
    kek: env.CORSAIR_KEK,
    multiTenancy: true,
});
