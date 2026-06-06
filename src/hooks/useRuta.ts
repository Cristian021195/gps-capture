import { useLiveQuery } from "dexie-react-hooks";
import { rutaService } from "../services/ruta.service";
import { useState } from "react";
import type { IRuta } from "../interfaces/IEntidades";
import { useIntl } from "react-intl";
import { useToast } from "../store/toast";

export const useRuta = (busqueda: string) => {
    const rutas = useLiveQuery(
        () => rutaService.search(busqueda),
        [busqueda]
    );

    return {
        rutas: rutas ?? []
    };
}

export const useRutaRelevamiento = (busqueda: string) => {
    const rutas = useLiveQuery(
        () => rutaService.searchConRelevamiento(busqueda),
        [busqueda]
    );

    return {
        rutas: rutas ?? []
    };
}

export const useRutaGestion = () => {
    const {formatMessage:tr} = useIntl();
    const {openToast} = useToast();
    const [busqueda, setBusqueda] = useState('');
    const [rutaItem, setRutaItem] = useState<IRuta | null>(null);        

    const handleDelete = async (ruta: IRuta) => {
        
        try {
            if (!ruta.id) return;
        
            await rutaService.delete(ruta.id);
            
            openToast({text:tr({id:'ruta.del.ok'})});

            if (rutaItem?.id === ruta.id) {
                setRutaItem(null);
            }
        } catch (error) {
            console.log(error);
            openToast({text:tr({id:'ruta.del.err'})});
        }
    };

    // const handleExport = async (ruta: IRuta) => {    }

    return {
        busqueda, setBusqueda,
        rutaItem, setRutaItem,
        handleDelete
    }
}