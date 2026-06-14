import Dexie from "dexie";
import { db } from "../db/db";
import type { IRuta, IRutaRelevamiento } from "../interfaces/IEntidades";
import { TextHelper } from "../classes/TextHelper";

export const rutaService = {
    async getById(id: number) {
        return db.ruta.get(id);
    },

    async getAll() {
        return db.ruta.toArray();
    },

    async search(nombre: string): Promise<IRuta[]> {

        if (!nombre || nombre.length < 2) {
            return db.ruta.limit(10).toArray();
        }

        const search = nombre.toLowerCase();

        if (!search || search.length < 2) {
            return db.ruta.limit(10).toArray();
        } else {
            return db.ruta
                .filter(r => {
                    const cleanText = TextHelper
                        .from(r.nombre)
                        .separaTildes()
                        .remueveTildes()
                        .setMinusculas()
                        .reemplazaEspacios()
                        .get();

                    return (
                        cleanText.includes(search) ||
                        r.nombre.toLowerCase().includes(search)
                    );
                })
                .toArray();
        }
    },

    async searchConRelevamiento(nombre: string): Promise<IRutaRelevamiento[]> {

        const rutas = await this.search(nombre);
        const relevamientos = await db.relevamiento.toArray();

        const relevamientoMap = new Map(
            relevamientos.map(r => [r.id, r.nombre])
        );

        return rutas.map(ruta => ({
            id: ruta.id,
            relevamiento_id: ruta.relevamiento_id,
            relevamiento_nombre:
                relevamientoMap.get(ruta.relevamiento_id) ?? "",
            nombre: ruta.nombre,
            key: ruta.key,
            created_at: ruta.created_at,
            updated_at: ruta.updated_at
        }));
    },

    async getCoordenadas(id: number) {

        const coordenadas = await db.coordenadas
            .where("ruta_id")
            .equals(id)
            .toArray();

        return {
            coordenadas
        }

    },

    async getRutaRelevamientoById(id: number): Promise<IRutaRelevamiento | undefined> {
        const ruta = await db.ruta.get(id);

        if (!ruta) {
            return undefined;
        }

        const relevamiento = await db.relevamiento.get(ruta.relevamiento_id);

        if (!relevamiento) {
            return undefined;
        }

        return {
            id: ruta.id,
            relevamiento_id: ruta.relevamiento_id,
            relevamiento_nombre: relevamiento.nombre,
            nombre: ruta.nombre,
            key: ruta.key,
            created_at: ruta.created_at,
            updated_at: ruta.updated_at
        };
    },

    async getAllConRelevamiento(): Promise<IRutaRelevamiento[]> {
        const [rutas, relevamientos] = await Promise.all([
            db.ruta.toArray(),
            db.relevamiento.toArray()
        ]);

        const relevamientoMap = new Map(
            relevamientos.map(r => [r.id, r])
        );

        return rutas.map(ruta => ({
            id: ruta.id,
            relevamiento_id: ruta.relevamiento_id,
            relevamiento_nombre:
                relevamientoMap.get(ruta.relevamiento_id)?.nombre ?? "",
            nombre: ruta.nombre,
            key: ruta.key,
            created_at: ruta.created_at,
            updated_at: ruta.updated_at
        }));
    },

    async create(data: { nombre: string, relevamiento_id: number, key: string }) {
        try {
            return await db.ruta.add(data as IRuta);
        } catch (error) {
            if (error instanceof Dexie.ConstraintError) {
                // eslint-disable-next-line preserve-caught-error
                throw new Error("DUPLICATE_KEY");
            }

            throw error;
        }
    },

    async update(id: number, data: Partial<IRuta>) {
        return db.ruta.update(id, data);
    },

    async delete(id: number) {
        return db.transaction(
            'rw',
            db.ruta,
            db.coordenadas,
            async () => {
                // Eliminar coordenadas
                await db.coordenadas
                    .where("ruta_id")
                    .equals(id)
                    .delete();

                // Eliminar ruta
                await db.ruta.delete(id);
            }
        )
    }
};