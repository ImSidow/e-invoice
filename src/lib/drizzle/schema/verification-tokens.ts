import { mysqlTable, varchar, timestamp, primaryKey } from "drizzle-orm/mysql-core";

export const verificationTokens = mysqlTable(
    "verification_tokens",
    {
        identifier: varchar("identifier", { length: 255 }).notNull(),
        token: varchar("token", { length: 255 }).notNull(),
        expires: timestamp("expires", { mode: "date" }).notNull(),
    },
    (verificationToken) => ({
        compositePk: primaryKey({
            columns: [verificationToken.identifier, verificationToken.token],
        }),
    })
);
