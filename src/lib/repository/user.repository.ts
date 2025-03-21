import { db } from "@/lib/db";
import { usersTable, UserType } from "@/lib/db/schema";
import { hash } from "@/lib/utils/hash";

export class BaseRepository {
    async findById(data: UserType) {
        if (data.password) {
            data.password = await hash(data.password);
        }

        return await db.insert(usersTable).values(data).$returningId();
    }

    async create(data: UserType) {
        if (data.password) {
            data.password = await hash(data.password);
        }

        return await db.insert(usersTable).values(data).$returningId();
    }
}

export class UserRepository {
    async findById(data: UserType) {
        if (data.password) {
            data.password = await hash(data.password);
        }

        return await db.insert(usersTable).values(data).$returningId();
    }

    async create(data: UserType) {
        if (data.password) {
            data.password = await hash(data.password);
        }

        return await db.insert(usersTable).values(data).$returningId();
    }
}
