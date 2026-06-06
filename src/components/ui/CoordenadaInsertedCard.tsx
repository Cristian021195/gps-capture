import { Card } from "konsta/react"
import { useIntl } from "react-intl"

interface IProps {
    descripcion: string,
    formatted_address: string,
    latitud: number,
    longitud: number,
    place_id: string,
    geo_provider: string
}

export const CoordenadaInsertedCard = ({descripcion, formatted_address, latitud, longitud, place_id, geo_provider}:IProps) => {
    const {formatMessage:tr} = useIntl();
    return (
        <Card outline>
            <div className="grid grid-cols-2 gap-2">
                <div className="col-span-2">
                    <p><b className="uppercase">{tr({id:'desc'})}</b>: {descripcion}</p>
                </div>
                <div className="col-span-2">
                    <p><b className="uppercase">{tr({id:'addr'})}</b>: {formatted_address}</p>
                </div>
                <div className="col-span-1">
                    <p className="truncate"><b className="uppercase">{tr({id:'lat'})}</b>: {latitud}</p>
                    <p><b className="uppercase">{tr({id:'geo_provider'})}</b>: {geo_provider}</p>
                </div>
                <div className="col-span-1">
                    <p className="truncate"><b className="uppercase">{tr({id:'lng'})}</b>: {longitud}</p>
                    <p><b className="uppercase">{tr({id:'place_id'})}</b>: {place_id}</p>                    
                </div>
            </div>
        </Card>
    )
}
