import { useEffect, useState } from "react"
import type { IRegistroGPS } from "../interfaces/IEntidades";
import { coordenadaService } from "../services/coordenada.service";

export const useCoordenada = (data:IRegistroGPS) => {
    const [latitud, setLatitud] = useState<number>(data.latitud);
    const [longitud, setLongitud] = useState<number>(data.longitud);
    const [formattedAddress, setFormattedAddress] = useState<string | undefined>(data.formatted_address);
    const [descripcion, setDescripcion] = useState<string | undefined>(data.descripcion);
    const [enable, setEnable] = useState(true);
    const [isDrag, setIsDrag] = useState(false);
    
    
    useEffect(()=>{
        const enableSave = (latitud == data.latitud) && (longitud == data.longitud) && (descripcion == data.descripcion) && (formattedAddress == data.formatted_address);
        // eslint-disable-next-line react-hooks/set-state-in-effect        
        setEnable(enableSave);
        console.log(enableSave)
    },[latitud, longitud, formattedAddress, descripcion])

    const save = async () => { // call db
        coordenadaService.update(data.id, {
            latitud,
            longitud,
            formatted_address:formattedAddress,
            descripcion
        });
    }

    const reset = () => {
        setLatitud(data.latitud);
        setLongitud(data.longitud);
        setFormattedAddress(data.formatted_address);
        setDescripcion(data.descripcion);
        setEnable(false);
    }

    const setPosicion = ({lat, lng}:{lat:number, lng:number}) => {
        setLatitud(lat);
        setLongitud(lng);
    }

    return {
        latitud,
        longitud,
        formattedAddress,
        descripcion,
        enable,
        isDrag,
        setLatitud,
        setLongitud,
        setFormattedAddress,
        setDescripcion,
        setEnable,
        save,
        reset,
        setIsDrag,
        setPosicion
    }

}
/*
    id
    ruta_id
    latitud
    longitud
    geo_provider_id
    formatted_address
    descripcion
    place_id
    created_at
    updated_at
*/