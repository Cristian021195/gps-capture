import type { IGeoProvider } from "../interfaces/IEntidades";
import type { IGeoService } from "../interfaces/IGeolocation";
import { GoogleGeoService } from "./GoogleGeoService";
import { HereMapsGeoService } from "./HereMapsGeoService";
import { LocationIQService } from "./LocationIQService";
import { MapBoxGeoService } from "./MapBoxGeoService";
import { OSMGeoService } from "./OSMGeoService";

export class GeoProviderFactory {
    static create(provider: IGeoProvider): IGeoService {
        switch(provider.provider_type){
            case "google":
                return new GoogleGeoService(provider);

            case "osm":
                return new OSMGeoService(provider);

            case "locationiq":
                return new LocationIQService(provider);

            case "heremaps":
                return new HereMapsGeoService(provider);

            case "mapbox":
                return new MapBoxGeoService(provider);

            default:
                throw new Error("Proveedor no soportado");
        }
    }
}