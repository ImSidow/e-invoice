import "dotenv";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
    schema: "./src/lib/drizzle/schema",
    out: "./drizzle/migrations",
    dialect: "mysql",
    dbCredentials: {
        url: process.env.DATABASE_URL!,
    },
    verbose: true,
    strict: true,
});
