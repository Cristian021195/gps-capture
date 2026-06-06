// src/hooks/useDBRuta.ts

import { useLiveQuery } from "dexie-react-hooks";
import { rutaService } from "../services/ruta.service";

export function useDBRutaAlt() {
    const rutas = useLiveQuery(
        () => rutaService.getAll(),
        []
    );

    return {
        rutas
    }
}