import { mysqlTable, varchar, int, primaryKey, boolean } from "drizzle-orm/mysql-core";
import { usersTable } from "./users";

export const authenticatorsTable = mysqlTable(
    "authenticators",
    {
        credentialID: varchar("credentialID", { length: 255 }).notNull().unique(),
        userId: varchar("userId", { length: 255 })
            .notNull()
            .references(() => usersTable.id, { onDelete: "cascade" }),
        providerAccountId: varchar("providerAccountId", { length: 255 }).notNull(),
        credentialPublicKey: varchar("credentialPublicKey", {
            length: 255,
        }).notNull(),
        counter: int("counter").notNull(),
        credentialDeviceType: varchar("credentialDeviceType", {
            length: 255,
        }).notNull(),
        credentialBackedUp: boolean("credentialBackedUp").notNull(),
        transports: varchar("transports", { length: 255 }),
    },
    (authenticator) => ({
        compositePk: primaryKey({
            columns: [authenticator.userId, authenticator.credentialID],
        }),
    })
);
