import Dexie from "dexie";
import { db } from "../db/db";
import type { IRelevamiento } from "../interfaces/IEntidades";

export const relevamientoService = {
    async getById(id: number) {
        return db.relevamiento.get(id);
    },

    /*async create(data: Omit<IRelevamiento, "id">) {
        return db.relevamiento.add(data);
    },*/
    async create(data: {nombre:string, key:string}) {
        try {
            return await db.relevamiento.add(data);
        } catch (error) {
            if (error instanceof Dexie.ConstraintError) {
                // eslint-disable-next-line preserve-caught-error
                throw new Error("DUPLICATE_KEY");
            }

            throw error;
        }
    },

    async update(id: number, data: Partial<IRelevamiento>) {
        return db.relevamiento.update(id, data);
    },

    async delete(id: number) {
        return db.relevamiento.delete(id);
    }
};