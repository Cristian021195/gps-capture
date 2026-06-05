import type { IGeoProvider } from "../interfaces/IEntidades";
import type { IGeoService } from "../interfaces/IGeolocation";
import { GoogleGeoService } from "./GoogleGeoService";
import { OSMGeoService } from "./OSMGeoService";

export class GeoProviderFactory {
    static create(provider: IGeoProvider): IGeoService {
        switch(provider.provider_type){
            case "google":
                return new GoogleGeoService(provider);

            case "osm":
                return new OSMGeoService(provider);

            default:
                throw new Error("Proveedor no soportado");
        }
    }
}