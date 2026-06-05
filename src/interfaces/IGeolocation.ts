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