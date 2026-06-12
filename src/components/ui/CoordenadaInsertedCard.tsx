import { Button, Card } from "konsta/react"
import { useIntl } from "react-intl"
import { TrashIcon } from "../svg/FormIcons";
import { EditIcon, MapLayoutIcon } from "../svg/UtilsIcon";

interface IProps {
    descripcion?: string,
    formatted_address?: string,
    latitud: number,
    longitud: number,
    place_id?: string,
    geo_provider: string,
    deleteAction: () => void
}

export const CoordenadaInsertedCard = ({ descripcion, formatted_address, latitud, longitud, place_id, geo_provider, deleteAction }: IProps) => {
    const { formatMessage: tr } = useIntl();
    return (
        <Card outline>
            <div className="grid grid-cols-2 gap-2">
                <div className="col-span-2">
                    <p><b className="uppercase">{tr({ id: 'desc' })}</b>: {descripcion}</p>
                </div>
                <div className="col-span-2">
                    <p><b className="uppercase">{tr({ id: 'addr' })}</b>: {formatted_address}</p>
                </div>
                <div className="col-span-1">
                    <p className="truncate"><b className="uppercase">{tr({ id: 'lat' })}</b>: {latitud}</p>
                    <p><b className="uppercase">{tr({ id: 'geo_provider' })}</b>: {geo_provider ? geo_provider : tr({ id: 'na' })}</p>
                </div>
                <div className="col-span-1">
                    <p className="truncate"><b className="uppercase">{tr({ id: 'lng' })}</b>: {longitud}</p>
                    <p><b className="uppercase">{tr({ id: 'place_id' })}</b>: {place_id ? place_id : tr({ id: 'na' })}</p>
                </div>
                <div className="col-span-2 flex justify-evenly gap-2">
                    <Button tonal small className="w-fit"
                        onClick={() => { }}
                    >
                        <MapLayoutIcon />
                    </Button>
                    <Button tonal small className="w-fit"
                        onClick={() => { }}
                    >
                        <EditIcon />
                    </Button>
                    <Button tonal small className="w-fit"
                        onClick={deleteAction}
                    >
                        <TrashIcon />
                    </Button>
                </div>
            </div>
        </Card>
    )
}
