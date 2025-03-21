import "dotenv/config";
import { defineConfig } from "drizzle-kit";
// import { getDBUrl } from "@/lib/drizzle/db";

export default defineConfig({
    schema: "./src/lib/db/schema",
    out: "./src/lib/db/migrations",
    dialect: "mysql",
    dbCredentials: { url: "mysql://root:6505113aA%23%40%23%40@127.0.0.1:3306/e-invoice" },
});
