import { MapContainer, TileLayer } from "react-leaflet";
import { useIntl } from 'react-intl';
import type { IRegistroGPS } from "../../interfaces/IEntidades";
import { useState } from "react";
import { DraggableMarkerClickable } from "../ui/DraggableMarkerClickable";
import { Button, List, ListInput } from "konsta/react";
import { coordenadaService } from "../../services/coordenada.service";
import { useToast } from "../../store/toast";

interface IProps {
    cb: ()=>void,
    children: React.ReactNode,
    coordenadas: IRegistroGPS[]
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const PopupVerCoordenadas = ({
    children,
    coordenadas
}:IProps) => { // -26.845085, -65.221010
    const { formatMessage: tr } = useIntl();
    const { openToast } = useToast();
    const [dbCoordenadas, setDbCoordenadas] = useState<IRegistroGPS[]>(coordenadas);
    const [localCoordenadas, setLocalCoordenadas] = useState<IRegistroGPS[]>(coordenadas);
    const [coord, setCoord] = useState<IRegistroGPS | null>(null);

    // Encuentra el elemento guardado en la base de datos (o última versión guardada en el popup)
    const original = coord ? dbCoordenadas.find(c => c.id === coord.id) : null;
    
    // Encuentra el elemento original al momento de abrir el popup para reinicios totales
    const initial = coord ? coordenadas.find(c => c.id === coord.id) : null;

    // Hay cambios si los valores en 'coord' difieren del estado persistido (dbCoordenadas)
    const hasChanges = !!(coord && original && (
        coord.descripcion !== original.descripcion || 
        coord.formatted_address !== original.formatted_address ||
        coord.latitud !== original.latitud ||
        coord.longitud !== original.longitud
    ));

    const setPosicion = (pos: { lat: number, lng: number }, coorId: number) => {
        setLocalCoordenadas(prev => prev.map(c => c.id === coorId ? { ...c, latitud: pos.lat, longitud: pos.lng } : c));
        setCoord(prev => {
            if (prev && prev.id === coorId) {
                return { ...prev, latitud: pos.lat, longitud: pos.lng };
            }
            return prev;
        });
    };

    const handleSave = async () => {
        if (!coord) return;
        try {
            await coordenadaService.update(coord.id, {
                descripcion: coord.descripcion,
                formatted_address: coord.formatted_address,
                latitud: coord.latitud,
                longitud: coord.longitud
            });
            // Actualiza la lista local y de referencia de base de datos con los nuevos valores guardados
            setLocalCoordenadas(prev => prev.map(c => c.id === coord.id ? coord : c));
            setDbCoordenadas(prev => prev.map(c => c.id === coord.id ? coord : c));
            openToast({ text: tr({ id: "coor.edited" }) });
        } catch (error) {
            console.error("Error al guardar la coordenada:", error);
        }
    };

    const handleReset = () => {
        if (!coord || !initial) return;
        // Restablece el coord al valor inicial original
        setCoord(initial);
        // Restablece la coordenada correspondiente en ambas listas
        setLocalCoordenadas(prev => prev.map(c => c.id === coord.id ? initial : c));
        setDbCoordenadas(prev => prev.map(c => c.id === coord.id ? initial : c));
    };
    
    return <div className='*:text-base'>
        {children}
        <div className="flex flex-col">
            <MapContainer center={{lat: coordenadas[0]?.latitud, lng:coordenadas[0]?.longitud}} zoom={14} scrollWheelZoom={true} style={{ height: "320px", width: "100%" }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {
                    localCoordenadas.map((coor=> <DraggableMarkerClickable 
                        key={coor.id} 
                        lat={coor.latitud} 
                        lng={coor.longitud} 
                        setPosicion={(pos) => setPosicion(pos, coor.id)}
                        onSelect={()=>{setCoord(coor)}}
                    /> ))
                }
                
            </MapContainer>
            <div>
                <List strongIos insetIos className="my-0 w-full">
                    <List strongIos insetIos className="py-0 my-0">
                        <ListInput outline label={tr({ id: 'desc' })} floatingLabel type="text" placeholder={tr({ id: 'desc.ej' })}
                            value={coord?.descripcion ?? ""}
                            onChange={(e) => {
                                if (coord) {
                                    setCoord({ ...coord, descripcion: e.target.value });
                                }
                            }}
                            disabled={!coord}
                            clearButton={false}
                            onClear={() => {}}
                        />
                    </List>
                    <List strongIos insetIos className="py-0 my-0">
                        <ListInput outline label={tr({ id: 'addr' })} floatingLabel  type="textarea" placeholder={tr({ id: 'desc.ej' })} inputClassName="h-20 !resize-y"
                            value={coord?.formatted_address ?? ""}
                            onChange={(e) => {                            
                                if (coord) {
                                    setCoord({ ...coord, formatted_address: e.target.value });
                                }
                            }}
                            disabled={!coord}
                            clearButton={false}
                            onClear={() => {}}
                        />
                    </List>
                </List>
                <div className="mx-4 flex gap-4">
                    <Button className="mx-auto" onClick={handleSave} disabled={!hasChanges}>
                        {tr({id:'edit'})}
                    </Button>
                    <Button className="mx-auto" onClick={handleReset} disabled={!hasChanges}>
                        {tr({id:'reset'})}
                    </Button>
                </div>
            </div>
        </div>
    </div>
}