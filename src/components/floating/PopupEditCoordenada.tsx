import { Button, List, ListInput } from "konsta/react";
import { MapContainer, TileLayer } from "react-leaflet";
import { useIntl } from 'react-intl';
import { DraggableMarker } from "../ui/DraggableMarker";
import type { IRegistroGPS } from "../../interfaces/IEntidades";
import { useCoordenada } from "../../hooks/useCoordenada";

interface IProps {
    cb: ()=>void,
    children: React.ReactNode,
    descripcion?: string,
    formatted_address?: string,
    latitud: number,
    longitud: number,
    data: IRegistroGPS
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const PopupEditCoordenada = ({
    children,
    data
}:IProps) => { // -26.845085, -65.221010
    const { formatMessage: tr } = useIntl();
    const {latitud, longitud, descripcion, formattedAddress, enable, setDescripcion, setFormattedAddress, setPosicion, reset, save} = useCoordenada(data);
    
    return <div className='*:text-base'>
        {children}
        <div className="flex flex-col">
            <MapContainer center={{lat: latitud, lng:longitud}} zoom={19} scrollWheelZoom={true} style={{ height: "320px", width: "100%" }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"                
                />
                <DraggableMarker lat={latitud} lng={longitud} setPosicion={setPosicion}/>
            </MapContainer>
            
            <List strongIos insetIos className="my-0 w-full">
                <List strongIos insetIos className="py-0 my-0">
                    <ListInput outline label={tr({ id: 'desc' })} floatingLabel type="text" placeholder={tr({ id: 'desc.ej' })}
                        value={descripcion}
                        onChange={(e) => {
                            setDescripcion(e.target.value);
                        }}
                        clearButton={false}
                        onClear={() => {}}
                    />
                </List>
                <List strongIos insetIos className="py-0 my-0">
                    <ListInput outline label={tr({ id: 'addr' })} floatingLabel  type="textarea" placeholder={tr({ id: 'desc.ej' })} inputClassName="h-20 !resize-y"
                        value={formattedAddress}
                        onChange={(e) => {                            
                            setFormattedAddress(e.target.value);
                        }}
                        clearButton={false}
                        onClear={() => {}}
                    />
                </List>
            </List>
            <div className="mx-4 flex gap-4">
                <Button className="mx-auto" onClick={save} disabled={enable}>
                    {tr({id:'edit'})}
                </Button>
                <Button className="mx-auto" onClick={reset}>
                    {tr({id:'reset'})}
                </Button>
            </div>
        </div>
    </div>
}