import { config } from "dotenv";
import { defineConfig } from "prisma/config";

// Load .env.local for local development
config({ path: ".env.local" });

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: process.env.DATABASE_URL || "postgresql://tvstanici_user:tvstanici_pass_2025!@91.98.112.195:5432/tvstanici_db?schema=public",
  },
});
