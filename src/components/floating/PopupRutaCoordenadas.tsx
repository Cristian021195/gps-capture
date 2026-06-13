import { CircleMarker, MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import type { IRegistroGPS } from "../../interfaces/IEntidades";
import { Button } from "konsta/react";
import { useIntl } from "react-intl";
import React, { useEffect, useRef, useState } from "react";
import { normalMarker } from "../svg/Leaflet";

interface IProps {
    coordenadas: IRegistroGPS[]
}

interface IMapCenterProps {
    lat: number;
    lng: number;
}

const MapCenter = ({ lat, lng }: IMapCenterProps) => {
    const map = useMap();

    useEffect(() => {
        map.flyTo([lat, lng], map.getZoom(), {
            animate: true,
            duration: 1
        });
    }, [lat, lng, map]);

    return null;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const PopupRutaCoordenadas = ({ coordenadas }: IProps) => {
    const { formatMessage: tr } = useIntl();
    const [currentPoint, setCurrentPoint] = useState(0);
    const markerRefs = useRef<Record<number, L.Marker | null>>({});

    const mostrarAnterior = () => {
        if (currentPoint === 0) {
            setCurrentPoint(coordenadas.length - 1);
        } else {
            setCurrentPoint(prev => prev - 1);
        }
    };

    const mostrarSiguiente = () => {
        if (currentPoint === coordenadas.length - 1) {
            setCurrentPoint(0);
        } else {
            setCurrentPoint(prev => prev + 1);
        }
    };

    const puntoActual = coordenadas[currentPoint];

    useEffect(() => {
        const punto = coordenadas[currentPoint];

        markerRefs.current[punto.id]?.openPopup();
    }, [currentPoint, coordenadas]);

    return (
        <div className="*:text-base">
            <MapContainer
                center={{
                    lat: puntoActual.latitud,
                    lng: puntoActual.longitud
                }}
                zoom={16}
                scrollWheelZoom={true}
                style={{ height: "480px", width: "100%" }}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {/* Este componente mueve el mapa cuando cambia currentPoint */}
                <MapCenter
                    lat={puntoActual.latitud}
                    lng={puntoActual.longitud}
                />

                {coordenadas.map((c:IRegistroGPS, ci:number) => (
                    <React.Fragment key={ci}>
                        <Marker
                            key={c.id}
                            ref={(ref) => {
                                markerRefs.current[c.id] = ref;
                            }}
                            position={{
                                lat: c.latitud,
                                lng: c.longitud
                            }}
                            icon={normalMarker}
                        >
                            <Popup>{c.descripcion}</Popup>
                        </Marker>

                        {ci === currentPoint && (
                            <CircleMarker
                                center={{
                                    lat: c.latitud,
                                    lng: c.longitud
                                }}
                                radius={20}
                                pathOptions={{
                                    color: "red",
                                    fillColor: "red",
                                    fillOpacity: 0.3
                                }}
                            />
                        )}
                    </React.Fragment>
                ))}
            </MapContainer>

            <div className="flex justify-evenly gap-4 m-4">
                <Button onClick={mostrarAnterior}>
                    {tr({ id: "before" })}
                </Button>

                <Button onClick={mostrarSiguiente}>
                    {tr({ id: "next" })}
                </Button>
            </div>

        </div>
    );
};