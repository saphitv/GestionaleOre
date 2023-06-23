import type {Config} from "drizzle-kit";
import 'dotenv/config'
import * as process from "process";

export default {
  schema: "./lib/db/schema/**/schema.ts",
  out: "./lib/db/migrations",
  introspect: {
    casing: "camel"
  },
  dbCredentials: {
    connectionString: process.env.DATABASE_URL,
  },
  driver: "mysql2"
} satisfies Config;
