import type { IGeoProvider } from "../interfaces/IEntidades";
import type { IGeoResult, IGeoService } from "../interfaces/IGeolocation";

export class MapBoxGeoService implements IGeoService {        
    private readonly baseUrl = 'https://api.mapbox.com/search/geocode/v6';
    private provider: IGeoProvider;

    constructor(provider: IGeoProvider) {
        this.provider = provider;
    }

    async direct(address: string): Promise<IGeoResult> {
        //https://api.mapbox.com/search/geocode/v6/forward?q=San%20Luis%201216,%20San%20Miguel%20de%20Tucumán,%20Tucumán,%20Argentina&access_token={{MapboxApiKey}}
        const url =
            `${this.baseUrl}/forward` +
            `?access_token=${this.provider.api_key}` +
            `&q=${encodeURIComponent(address)}`;

        const response = await fetch(url);
        const data = await response.json();

        if (!data.length) {
            throw new Error("Dirección no encontrada.");
        }

        return {
            place_id: `${data.features[0].properties.mapbox_id}`,
            formatted_address: data.features[0].properties.full_address,
            latitud: data.features[0].properties.coordinates.latitude,
            longitud: data.features[0].properties.coordinates.longitude
        };
    }

    async reverse(lat: number, lng: number): Promise<IGeoResult> {
        //https://api.mapbox.com/search/geocode/v6/reverse?longitude=-65.2211791&latitude=-26.8450933&access_token={{MapboxApiKey}}
        const url =
            `${this.baseUrl}/reverse` +
            `?access_token=${this.provider.api_key}` +
            `&latitude=${lat}` +
            `&longitude=${lng}`;

        const response = await fetch(url);
        const data = await response.json();

        return {
            place_id: `${data.features[0].properties.mapbox_id}`,
            formatted_address: data.features[0].properties.full_address,
            latitud: data.features[0].properties.coordinates.latitude,
            longitud: data.features[0].properties.coordinates.longitude
        };
    }
}
