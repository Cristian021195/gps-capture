import Dexie from "dexie";
import { db } from "../db/db";
import type { IGeoProvider } from "../interfaces/IEntidades";

export const proveedorService = {
    async getById(id: number) {
        return db.proveedor.get(id);
    },

    async getAll() {
        return db.proveedor.toArray();
    },

    async create(data: {nombre:string, key:string, api_key:string, provider_type:string}) {
        try {
            return await db.proveedor.add(data as IGeoProvider);
        } catch (error) {
            if (error instanceof Dexie.ConstraintError) {
                // eslint-disable-next-line preserve-caught-error
                throw new Error("DUPLICATE_KEY");
            }

            throw error;
        }
    },

    async update(id: number, data: Partial<IGeoProvider>) {
        return db.proveedor.update(id, data);
    },

    async delete(id: number) {
        return db.proveedor.delete(id);
    }
};