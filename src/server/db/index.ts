import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
// import { users } from "./schema";

import { env } from "~/env";
// import * as schema from "./schema";

const connectionString = env.DATABASE_URL;

// Disable prefetch as it is not supported for "Transaction" pool mode

const client = postgres(connectionString, { prepare: false });
export const db = drizzle(client);

// export const allUsers = await db.select().from(users);

// export const db = drizzle(new Client({ url: env.DATABASE_URL }), { schema });
