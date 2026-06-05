export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface UseGeolocationReturn {
  location: Coordinates | null;
  loading: boolean;
  error: string | null;
  requestLocation: () => void;
}

export interface IGeoService {
    direct(address: string): Promise<IGeoResult>;
    reverse(lat: number, lng: number): Promise<IGeoResult>;
}

export interface IGeoResult {
    place_id: string;
    formatted_address: string;
    latitud: number;
    longitud: number;
}