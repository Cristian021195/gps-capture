import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../db/db";

export function useDBRelevamiento() {
    return useLiveQuery(
      () => db.relevamiento.toArray(),
      [],
      []
    ) ?? [];
}
  
/*
export function useDBCiudadesLike(ciudad: string) {
    const ciudades = useLiveQuery(async () => {
        if (!ciudad || ciudad.length < 2){
            return db.ciudades.limit(10).toArray();
        }

        return db.ciudades
        .filter(c =>{
            const clean_text = TextHelper.from(c.ciudad).separaTildes().remueveTildes().setMinusculas().reemplazaEspacios().get()
            return clean_text.includes(ciudad.toLowerCase()) || c.ciudad.includes(ciudad.toLowerCase());
        }            
        )
        .toArray();
    }, [ciudad]); // importante para que reaccione al cambio

    return { ciudades: ciudades ?? [] };
}
*/