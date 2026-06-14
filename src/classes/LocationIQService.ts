import type { IGeoProvider } from "../interfaces/IEntidades";
import type { IGeoResult, IGeoService } from "../interfaces/IGeolocation";

export class LocationIQService implements IGeoService {
    private readonly baseUrl = 'https://us1.locationiq.com/v1';
    private provider: IGeoProvider;

    constructor(provider: IGeoProvider) {
        this.provider = provider;
    }

    async direct(address: string): Promise<IGeoResult> {

        const url =
            `${this.baseUrl}/search` +
            `?key=${this.provider.api_key}` +
            `&q=${encodeURIComponent(address)}` +
            `&format=json` +
            `&limit=1`;

        const response = await fetch(url);
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
            `?key=${this.provider.api_key}` +
            `&lat=${lat}` +
            `&lon=${lng}` +
            `&format=json`;

        const response = await fetch(url);
        const data = await response.json();

        return {
            place_id: `${data.osm_type}-${data.osm_id}`,
            formatted_address: data.display_name,
            latitud: Number(data.lat),
            longitud: Number(data.lon)
        };
    }
}
