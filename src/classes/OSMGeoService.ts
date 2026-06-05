import type { IGeoProvider } from "../interfaces/IEntidades";
import type { IGeoResult, IGeoService } from "../interfaces/IGeolocation";
import { APP_VERSION } from "../utils/version";

export class OSMGeoService implements IGeoService {
    private readonly baseUrl = 'https://nominatim.openstreetmap.org';
    private provider: IGeoProvider;
    private headers = {};
    
    constructor(provider: IGeoProvider){
        this.provider = provider;
        this.headers = {
            "Accept": "application/json",
            "Accept-Language": "es",
            "User-Agent": `${this.provider.key}/${APP_VERSION.release.major}.${APP_VERSION.release.minor}`
        }
    }

    async direct(address: string): Promise<IGeoResult> {

        const url =
            `${this.baseUrl}/search` +
            `?q=${encodeURIComponent(address)}` +
            `&format=jsonv2` +
            `&limit=1`;

        const response = await fetch(url, this.headers);
        const data = await response.json();

        if (!data.length) {
            throw new Error("Dirección no encontrada.");
        }

        const item = data[0];

        return {
            place_id: `${item.osm_type}-${item.osm_id}`,
            formatted_address: item.display_name,
            latitud: Number(item.lat),
            longitud: Number(item.lon)
        };
    }

    async reverse(lat: number, lng: number): Promise<IGeoResult> {

        const url =
            `${this.baseUrl}/reverse` +
            `?lat=${lat}` +
            `&lon=${lng}` +
            `&format=jsonv2`;

        const response = await fetch(url, this.headers);
        const data = await response.json();

        return {
            place_id: `${data.osm_type}-${data.osm_id}`,
            formatted_address: data.display_name,
            latitud: Number(data.lat),
            longitud: Number(data.lon)
        };
    }
}