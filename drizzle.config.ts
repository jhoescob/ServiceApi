import { defineConfig } from "drizzle-kit";

const schemalink: string = "./src/schemas/drizzle/schema.ts";
const outlink: string = "./src/drizzle/migrations";

import "dotenv/config";

export default defineConfig({
  schema: schemalink,
  out: outlink,
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  strict: true,
  verbose: true,
});
