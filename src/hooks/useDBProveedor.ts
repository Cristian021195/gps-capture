import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../db/db";
import { TextHelper } from "../classes/TextHelper";
import { proveedorService } from "../services/proveedor.service";
import type { IGeoProvider } from "../interfaces/IEntidades";
import { useState } from "react";

export function useDBProveedor() {
    const [proveedorSeleccionado, setProveedorSeleccionado] = useState<IGeoProvider | null>(null);

    const proveedores = useLiveQuery( async () => {
        return await db.proveedor.toArray();
    }, []); // importante para que reaccione al cambio

    const deleteProveedor = async (id: number) => {
        await proveedorService.delete(id);
    };

    const updateProveedor = async (
        id: number,
        data: Partial<IGeoProvider>
    ) => {
        return proveedorService.update(id, data);
    };

    const getProveedor = async (id: number) => {
        const proveedor = await proveedorService.getById(id);
        setProveedorSeleccionado(proveedor ?? null);
    };

    const unsetProveedor = async () => {
        setProveedorSeleccionado(null);
    };
    
    return { 
        proveedores: proveedores ?? [],
        proveedorSeleccionado,
        unsetProveedor,
        getProveedor,
        updateProveedor,
        deleteProveedor
    };
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