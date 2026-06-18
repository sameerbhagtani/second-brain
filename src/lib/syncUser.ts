import { currentUser } from "@clerk/nextjs/server";

import { db } from "@/db";
import { usersTable } from "@/db/schemas/users";
import { eq } from "drizzle-orm";

export default async function syncUser() {
    const clerkUser = await currentUser();

    if (!clerkUser) {
        throw new Error("User not authenticated");
    }

    const [existingUser] = await db
        .select()
        .from(usersTable)
        .where(eq(usersTable.clerkUserId, clerkUser.id))
        .limit(1);

    if (existingUser) {
        return existingUser;
    }

    const [user] = await db
        .insert(usersTable)
        .values({
            clerkUserId: clerkUser.id,
        })
        .returning();

    return user;
}
