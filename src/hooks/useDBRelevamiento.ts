import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../db/db";
import { TextHelper } from "../classes/TextHelper";

export function useDBRelevamiento() {
    const relevamientos = useLiveQuery( async () => {
        return await db.relevamiento.toArray();
    }, []); // importante para que reaccione al cambio
    
    return { relevamientos: relevamientos ?? [] };
}

export function useDBRelevamientoLike(_relevamiento: string) {
    const relevamientos = useLiveQuery(async () => {
        if (!_relevamiento || _relevamiento.length < 2){
            return db.relevamiento.limit(10).toArray();
        }

        return db.relevamiento
            .filter(c =>{
                const clean_text = TextHelper.from(c.nombre).separaTildes().remueveTildes().setMinusculas().reemplazaEspacios().get()
                return clean_text.includes(_relevamiento.toLowerCase()) || c.nombre.includes(_relevamiento.toLowerCase());
            }
        )
        .toArray();
    }, [_relevamiento]); // importante para que reaccione al cambio

    return { relevamientos: relevamientos ?? [] };
}