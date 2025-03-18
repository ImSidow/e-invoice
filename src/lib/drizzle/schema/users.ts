import { timestamp, mysqlTable, varchar } from "drizzle-orm/mysql-core";

export const usersTable = mysqlTable("users", {
    id: varchar("id", { length: 255 })
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),

    name: varchar("name", { length: 255 }),
    email: varchar("email", { length: 255 }).unique(),
    password: varchar("password", { length: 255 }),
    emailVerified: timestamp("email_verified_at", { mode: "date", fsp: 3 }),
    image: varchar("image", { length: 255 }),
});
