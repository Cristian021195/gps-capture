import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../db/db";
import { TextHelper } from "../classes/TextHelper";

export function useDBProveedor() {
    const proveedores = useLiveQuery( async () => {
        return await db.proveedor.toArray();
    }, []); // importante para que reaccione al cambio
    
    return { proveedores: proveedores ?? [] };
}

export function useDBProveedorLike(_proveedor: string) {
    const proveedores = useLiveQuery(async () => {
        if (!_proveedor || _proveedor.length < 2){
            return db.proveedor.limit(10).toArray();
        }

        return db.proveedor
            .filter(c =>{
                const clean_text = TextHelper.from(c.nombre).separaTildes().remueveTildes().setMinusculas().reemplazaEspacios().get()
                return clean_text.includes(_proveedor.toLowerCase()) || c.nombre.includes(_proveedor.toLowerCase());
            }
        )
        .toArray();
    }, [_proveedor]); // importante para que reaccione al cambio

    return { proveedores: proveedores ?? [] };
}