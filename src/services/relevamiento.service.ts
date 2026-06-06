import Dexie from "dexie";
import { db } from "../db/db";
import type { IRelevamiento } from "../interfaces/IEntidades";

export const relevamientoService = {
    async getById(id: number) {
        return db.relevamiento.get(id);
    },

    async getAll() {
        return db.relevamiento.toArray();
    },

    async create(data: {nombre:string, key:string}) {
        try {
            return await db.relevamiento.add(data as IRelevamiento);
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

    /*
    async delete(id: number) {
        return db.relevamiento.delete(id);
    }
    */
    async delete(id: number) {

        return db.transaction(
            'rw',
            db.relevamiento,
            db.ruta,
            //db.coordenada,

            async () => {

                // Buscar rutas del relevamiento
                const rutas = await db.ruta
                    .where("relevamiento_id")
                    .equals(id)
                    .toArray();

                const rutaIds = rutas
                    .map(r => r.id)
                    .filter((id): id is number => id !== undefined);

                // Eliminar coordenadas
                if (rutaIds.length > 0) {
                    //await db.coordenada
                    //    .where("ruta_id")
                    //    .anyOf(rutaIds)
                    //    .delete();
                }

                // Eliminar rutas
                await db.ruta
                    .where("relevamiento_id")
                    .equals(id)
                    .delete();

                // Eliminar relevamiento
                await db.relevamiento.delete(id);
            }
        );
    }
};