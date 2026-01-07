export const runtime = "nodejs";

import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: false, // set true only for production with SSL
});

export const db = drizzle(pool, { schema });
export { schema };
