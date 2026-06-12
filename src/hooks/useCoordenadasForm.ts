/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useMemo, useState } from "react";
import { useDBProveedorAlt } from "./useDBProveedorAlt";
import { useDBRutaAlt } from "./useDBRutaAlt";
import { useGeolocation } from "./useGeolocation";
import type { IGeoResult } from "../interfaces/IGeolocation";
import { GeoProviderFactory } from "../classes/GeoProviderFactory";
import { coordenadaService } from "../services/coordenada.service";
import { useDBCoordenada } from "./useDBCoordenada";

export function useCoordenadasForm() {

    const { rutas } = useDBRutaAlt();
    const { proveedores } = useDBProveedorAlt();
    const { requestSingleLocation } = useGeolocation();
    const [loading, setLoading] = useState(false);
    const [currentLocation, setCurrentLocation] = useState<GeolocationCoordinates | undefined>();

    const [rutaId, setRutaId] = useState<number | null>(null);
    const [proveedorId, setProveedorId] = useState<number | null>(null);
    const [descripcion, setDescripcion] = useState("");
    const [geoResult, setGeoResult] = useState<IGeoResult | null>(null);

    const { coordenadas } = useDBCoordenada(rutaId ?? -1);

    // seteo de valores
    useEffect(() => {
        if (rutaId === null && rutas?.length) {
            setRutaId(rutas[0].id);
        }
    }, [rutas, rutaId]);

    useEffect(() => {
        if (proveedorId == null && proveedores?.length) {
            setProveedorId(proveedores[0].id);
        }
    }, [proveedores, proveedorId]);

    const rutaSeleccionada = useMemo(
        () => rutas?.find(
            r => r.id === rutaId
        ) ?? null,
        [rutas, rutaId]
    );

    const proveedorSeleccionado = useMemo(
        () => proveedores?.find(
            p => p.id === proveedorId
        ) ?? null,
        [proveedores, proveedorId]
    );

    const eliminarCoordenada = async (id: number) => {
        try {
            setLoading(true);
            await coordenadaService.delete(id);
        } finally {
            setLoading(false);
        }
    }

    // lógica del formulario
    const obtenerCoordenadas = async () => {

        if (!rutaSeleccionada) {
            throw new Error("Debe seleccionar una ruta");
        }
        if (!proveedorSeleccionado) {
            throw new Error("Debe seleccionar un proveedor");
        }
        if (rutaId == null) {
            throw new Error("Debe seleccionar una ruta.");
        }
        if (proveedorId == null) {
            throw new Error("Proveedor inválido.");
        }

        try {

            setLoading(true);

            // 1. GPS
            const coords = await requestSingleLocation();

            // 2. Factory
            const geoService = GeoProviderFactory.create(proveedorSeleccionado);

            // 3. Reverse Geo
            let geoResult: IGeoResult | null = null;

            try {
                geoResult = await geoService.reverse(coords.latitude, coords.longitude);
            }
            catch (e) {
                console.warn("Falló reverse geocoding", e);
            }

            const registro_gps = {
                ruta_id: rutaId,
                latitud: coords.latitude,
                longitud: coords.longitude,
                geo_provider_id: proveedorId,
                formatted_address: geoResult?.formatted_address ?? null,
                descripcion: descripcion,
                place_id: geoResult?.place_id ?? null
            };
            // 6. Agregar a la tabla de coordenadas
            await coordenadaService.create(registro_gps)

            // 5. Actualizar estado
            setCurrentLocation(coords);
            setGeoResult(geoResult);

        }
        finally {
            setLoading(false);
        }

    };

    return {
        rutas,
        proveedores,
        coordenadas,

        rutaSeleccionada,
        proveedorSeleccionado,

        rutaId,
        setRutaId,

        proveedorId,
        setProveedorId,

        descripcion,
        setDescripcion,

        currentLocation,
        geoResult,

        loading,
        obtenerCoordenadas,
        eliminarCoordenada
    };
}