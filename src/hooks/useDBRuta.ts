// src/hooks/useDBRuta.ts

import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../db/db";
import { TextHelper } from "../classes/TextHelper";
import type { IRuta, IRutaRelevamiento } from "../interfaces/IEntidades";
import { rutaService } from "../services/ruta.service";
import { useState } from "react";

export function useDBRuta() {
    const [rutaSeleccionada, setRutaSeleccionada] = useState<IRuta | null>(null);

    const rutas = useLiveQuery( async () => {
        return await db.ruta.toArray();
    }, []); // importante para que reaccione al cambio

    const getRuta = async (id: number) => {
        const ruta = await rutaService.getById(id);
        setRutaSeleccionada(ruta ?? null);
    };

    const unsetRuta = () => {
        setRutaSeleccionada(null);
    };

    return {
        rutaSeleccionada, setRutaSeleccionada,
        rutas,
        getRuta,
        unsetRuta
    }
}

export function useDBRutaLike(_ruta: string) {
    console.log({_ruta})

    const rutas = useLiveQuery(async (): Promise<IRutaRelevamiento[]> => {

        const relevamientos = await db.relevamiento.toArray();

        const relevamientoMap = new Map(
            relevamientos.map(r => [r.id, r.nombre])
        );

        // eslint-disable-next-line no-useless-assignment
        let listaRutas = [];

        if (!_ruta || _ruta.length < 2) {
            console.log('a');
            listaRutas = await db.ruta.limit(10).toArray();
            console.log(listaRutas);
        } else {
            listaRutas = await db.ruta
                .filter(r => {
                    const cleanText = TextHelper
                        .from(r.nombre)
                        .separaTildes()
                        .remueveTildes()
                        .setMinusculas()
                        .reemplazaEspacios()
                        .get();

                    return cleanText.includes(_ruta.toLowerCase()) || r.nombre.toLowerCase().includes(_ruta.toLowerCase());
                })
                .toArray();
        }

        return listaRutas.map(ruta => ({
            id: ruta.id,
            relevamiento_id: ruta.relevamiento_id,
            relevamiento_nombre:
                relevamientoMap.get(ruta.relevamiento_id) ?? "",
            nombre: ruta.nombre,
            key: ruta.key,
            created_at: ruta.created_at,
            updated_at: ruta.updated_at
        }));

    }, [_ruta]);

    return {
        rutas: rutas ?? []
    };
}