import { db } from "@/lib/db";
import { eq } from "drizzle-orm";
import { MySqlTable, AnyMySqlColumn } from "drizzle-orm/mysql-core";

export class BaseRepository<T extends { id?: string }> {
    constructor(private table: MySqlTable, protected idColumn: AnyMySqlColumn) {}

    async findById(id: string): Promise<T> {
        const [result] = await db.select().from(this.table).where(eq(this.idColumn, id)).execute();
        return result as T;
    }

    async create<P extends Omit<T, "id">>(data: P): Promise<T> {
        const [result] = await db.insert(this.table).values(data).$returningId();
        return this.findById((result as { id: string }).id);
    }

    async update() {
        // return await db.insert(this.table).values(data).$returningId();
    }

    async delete() {
        // return await db.insert(this.table).values(data).$returningId();
    }
}
