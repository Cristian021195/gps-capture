import { useLiveQuery } from "dexie-react-hooks";
import { proveedorService } from "../services/proveedor.service";
import type { IGeoProvider } from "../interfaces/IEntidades";

export function useDBProveedorAlt() {
    
    const proveedores = useLiveQuery(
        () => proveedorService.getAll(),
        []
    );

    const deleteProveedor = async (id: number) => {
        await proveedorService.delete(id);
    };

    const updateProveedor = async (
        id: number,
        data: Partial<IGeoProvider>
    ) => {
        return proveedorService.update(id, data);
    };
    
    return { 
        proveedores,
        updateProveedor,
        deleteProveedor
    };
}