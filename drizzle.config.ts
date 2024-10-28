import type { Config } from "drizzle-kit";
import { env } from "@/env";

export default {
  dialect: "postgresql",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
  schema: "./src/server/db/schema.ts",
  strict: true,
  verbose: true,
} satisfies Config;
