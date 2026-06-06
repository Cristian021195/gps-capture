import { useState, useCallback, useEffect } from "react";
import type { Coordinates, UseGeolocationReturn } from "../interfaces/IGeolocation";

export const useGeolocation = (): UseGeolocationReturn => {
  const [location, setLocation] = useState<Coordinates | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const requestSingleLocation = (): Promise<GeolocationCoordinates> => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error("gps.unsupported"));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve(position.coords);
        },
        (err) => {
          switch (err.code) {
            case err.PERMISSION_DENIED:
              reject(new Error("no.permission"));
              break;

            case err.POSITION_UNAVAILABLE:
              reject(new Error("gps.missed"));
              break;

            case err.TIMEOUT:
              reject(new Error("timeout"));
              break;

            default:
              reject(new Error("gps.error"));
          }
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
        }
      );
    });
  };

  const requestLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setError("gps.unsuported");
      return;
    }

    setLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log(position);
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        setLoading(false);
      },
      (err) => {
        console.log(err);
        switch (err.code) {
          case err.PERMISSION_DENIED:
            setError("no.permission");
            break;
          case err.POSITION_UNAVAILABLE:
            setError("gps.missed");
            break;
          case err.TIMEOUT:
            setError("timeout");
            break;
          default:
            setError("gps.error");
        }
        setLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
      }
    );
  }, []);


  return {
    location,
    loading,
    error,
    requestLocation,
    requestSingleLocation
  };

};

type PermissionState = "granted" | "prompt" | "denied" | "unknown";

/**
 * Función que evalua el permiso actual de ubicación sin solicitar punto gps
 * @returns PermissionState: granted | prompt | denied | unknown;
 */
export const useLocationPermission = () => {
  const [permission, setPermission] = useState<PermissionState>("unknown");

  useEffect(() => {
    const checkPermission = async () => {
      try {
        const result = await navigator.permissions.query({
          name: "geolocation",
        });

        setPermission(result.state);

        result.onchange = () => {
          setPermission(result.state);
        };
      } catch {
        setPermission("unknown");
      }
    };

    checkPermission();
  }, []);

  return permission;
};