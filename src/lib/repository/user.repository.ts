import { usersTable, UserType } from "@/lib/db/schema";
import { BaseRepository } from "./base.repository";
import { eq } from "drizzle-orm";
import { db } from "../db";
import { hash } from "../utils/hash";

export class UserRepository extends BaseRepository<UserType> {
    constructor() {
        super(usersTable, usersTable.id);
    }

    async create(data: UserType) {
        if (data.password) data.password = await hash(data.password);
        return await super.create(data);
    }

    async findByEmail(email: string) {
        return await db.select().from(usersTable).where(eq(usersTable.email, email)).execute();
    }

    async authenticate(email: string, password: string) {
        const [user] = await this.findByEmail(email);
        if (!user) return null;

        const authenticated = (await hash(password)) === user.password;
        return authenticated ? user : null;
    }
}
