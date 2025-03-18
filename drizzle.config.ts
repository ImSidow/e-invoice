import "dotenv/config";
import { defineConfig } from "drizzle-kit";
import { getDBUrl } from "@/lib/drizzle/db";

export default defineConfig({
    schema: "./src/lib/drizzle/schema",
    out: "./drizzle/migrations",
    dialect: "mysql",
    dbCredentials: { url: getDBUrl() },
});
