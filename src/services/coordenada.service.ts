import Dexie from "dexie";
import { db } from "../db/db";
import type { IGeoProvider, IRegistroGPS, IRegistroGPSBasic } from "../interfaces/IEntidades";


export const coordenadaService = {
    async getById(id: number) {
        return db.coordenadas.get(id);
    },

    async getAll() {
        return db.coordenadas.toArray();
    },

    async getAllByRoute(ruta_id: number) {
        //const coordenadas = await db.coordenadas.where('ruta_id').equals(ruta_id).toArray();
        const coordenadas = await db.coordenadas.where('[ruta_id+id]').between(
                [ruta_id, Dexie.minKey],
                [ruta_id, Dexie.maxKey]
            ).reverse().toArray();
            
        const proveedores = await db.proveedor.toArray();
        
        const proveedoresMap = new Map(
            proveedores.map((p:IGeoProvider) => [p.id, p.nombre])
        );

        return coordenadas.map(c => ({
            id: c.id,
            descripcion: c.descripcion,
            formatted_address: c.formatted_address,
            titulo: c.formatted_address ? c.formatted_address : c.descripcion,
            geo_provider_id: c.geo_provider_id,
            geo_provider: proveedoresMap.get(c.geo_provider_id!) ?? "",
            latitud: c.latitud,
            longitud: c.longitud,
            place_id: c.place_id,
            ruta_id: c.ruta_id,            
            created_at: c.created_at,
            updated_at: c.updated_at
        }));
    },
    

    async create(data: IRegistroGPSBasic) {
        try {
            
            this.basicValidation(data);

            return await db.coordenadas.add(data as IRegistroGPS);
        } catch (error) {
            if (error instanceof Dexie.ConstraintError) {
                // eslint-disable-next-line preserve-caught-error
                throw new Error("DUPLICATE_KEY");
            }

            throw error;
        }
    },

    async update(id: number, data: Partial<IRegistroGPS>) {
        return db.coordenadas.update(id, data);
    },

    async delete(id: number) {
        return db.coordenadas.delete(id);
    },
    basicValidation(data: IRegistroGPSBasic){
        if(data.descripcion.length === 0){
            throw new Error('VALIDATION_ERROR')
        }
    }
};