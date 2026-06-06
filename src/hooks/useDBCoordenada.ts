import { useLiveQuery } from "dexie-react-hooks";
import { coordenadaService } from "../services/coordenada.service";

export function useDBCoordenada(ruta_id:number) {
    
    const coordenadas = useLiveQuery(
        () => coordenadaService.getAllByRoute(ruta_id),
        [ruta_id]
    );
    
    return { 
        coordenadas: coordenadas ?? []
    };
}