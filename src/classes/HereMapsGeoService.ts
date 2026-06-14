import type { IGeoProvider } from "../interfaces/IEntidades";
import type { IGeoResult, IGeoService } from "../interfaces/IGeolocation";

export class HereMapsGeoService implements IGeoService {        
    private readonly baseUrl = 'https://revgeocode.search.hereapi.com/v1';
    private provider: IGeoProvider;

    constructor(provider: IGeoProvider) {
        this.provider = provider;
    }

    async direct(address: string): Promise<IGeoResult> {
        //https://geocode.search.hereapi.com/v1/geocode?q=San%20Luis%201216&apiKey={{HereMapsapiKey}}
        const url =
            `${this.baseUrl}/geocode` +
            `?apiKey=${this.provider.api_key}` +
            `&q=${encodeURIComponent(address)}`;

        const response = await fetch(url);
        const data = await response.json();

        if (!data.length) {
            throw new Error("Dirección no encontrada.");
        }

        return {
            place_id: `${data.items[0].id}`,
            formatted_address: data.items[0].address.label,
            latitud: data.items[0].position.lat,
            longitud: data.items[0].position.lon
        };
    }

    async reverse(lat: number, lng: number): Promise<IGeoResult> {
        //https://revgeocode.search.hereapi.com/v1/revgeocode?at=-26.8450933,-65.2211791&lang=es-ES&apiKey={{HereMapsapiKey}}
        const url =
            `${this.baseUrl}/revgeocode` +
            `?apiKey=${this.provider.api_key}` +
            `&at=${lat},${lng}` +
            `&lang=es-ES`;

        const response = await fetch(url);
        const data = await response.json();

        return {
            place_id: `${data.items[0].id}`,
            formatted_address: data.items[0].address.label,
            latitud: data.items[0].position.lat,
            longitud: data.items[0].position.lon
        };
    }
}
