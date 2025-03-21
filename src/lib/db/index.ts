import "dotenv/config";
import { drizzle } from "drizzle-orm/mysql2";
import * as schema from "./schema";
import * as mysql from "mysql2/promise";
import { MySql2Database } from "drizzle-orm/mysql2";

export const getDBUrl = () => {
    const dbConnection = process.env.DB_CONNECTION;
    const dbHost = process.env.DB_HOST;
    const dbPort = process.env.DB_PORT;
    const dbUser = process.env.DB_USER;
    const dbPass = process.env.DB_PASS;
    const dbName = process.env.DB_NAME;

    return `${dbConnection}://${dbUser}:${dbPass}@${dbHost}:${dbPort}/${dbName}`;
};

export type DrizzleDB = MySql2Database<typeof schema>;

export const client = mysql.createPool({ uri: getDBUrl() });

export const db = drizzle(client, { schema, mode: "default" });
