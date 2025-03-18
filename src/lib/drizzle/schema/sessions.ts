import { mysqlTable, varchar, timestamp } from "drizzle-orm/mysql-core";
import { usersTable } from "./users";
// import type { AdapterAccountType } from "next-auth/adapters"

export const sessionsTable = mysqlTable("sessions", {
    sessionToken: varchar("sessionToken", { length: 255 }).primaryKey(),
    userId: varchar("userId", { length: 255 })
        .notNull()
        .references(() => usersTable.id, { onDelete: "cascade" }),
    expires: timestamp("expires", { mode: "date" }).notNull(),
});
