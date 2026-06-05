import type { IGeoProvider } from "../interfaces/IEntidades";
import type { IGeoResult, IGeoService } from "../interfaces/IGeolocation";

export class GoogleGeoService implements IGeoService {
    private readonly baseUrl = 'https://maps.googleapis.com/maps/api/geocode/json';
    private provider: IGeoProvider;
    constructor(provider: IGeoProvider){
        this.provider = provider;
    }

    // debemos establecer los retornos de tipo Promise<IGeoResult> no Promise<void> para evitar errores de typescript

    // https://maps.googleapis.com/maps/api/geocode/json?latlng=-26.8083,-65.2176&key=TU_API_KEY
    async reverse(lat:number, lng:number): Promise<IGeoResult>{
        const url =
            `${this.baseUrl}/geocode/json` +
            `?latlng=${lat},${lng}` +
            `&key=${this.provider.api_key}`;

        const response = await fetch(url);
        const data = await response.json();

        return {
            place_id: data.results[0].place_id,
            formatted_address: data.results[0].formatted_address,
            latitud: data.results[0].geometry.location.lat,
            longitud: data.results[0].geometry.location.lng
        };
        
    }

    // https://maps.googleapis.com/maps/api/geocode/json?address=Av+Corrientes+1234,Buenos+Aires,Argentina&key=TU_API_KEY
    async direct(address:string): Promise<IGeoResult>{
        const url =
            `${this.baseUrl}/geocode/json` +
            `?address=${encodeURIComponent(address)}` +
            `&key=${this.provider.api_key}`;
        const response = await fetch(url);
        const data = await response.json();

        return {
            place_id: data.results[0].place_id,
            formatted_address: data.results[0].formatted_address,
            latitud: data.results[0].geometry.location.lat,
            longitud: data.results[0].geometry.location.lng
        };
    }
}