import { useEffect, useState } from "react";
//import { updateSW } from "../service/pwa";

export const usePWAUpdate = () => {
  const [updateAvailable, setUpdateAvailable] = useState(false);

  const clearUpdate = () => setUpdateAvailable(false);

  const applyUpdate = async () => {
    const reg = await navigator.serviceWorker.getRegistration();

    const waiting = reg?.waiting;

    if (!waiting) {
        console.log("No waiting SW");
        return;
    }

    waiting.postMessage({ type: "SKIP_WAITING" });
    };

  useEffect(() => {
    const handler = () => setUpdateAvailable(true);

    window.addEventListener("sw-update-available", handler);

    return () => {
      window.removeEventListener("sw-update-available", handler);
    };
  }, []);

  return {
    updateAvailable,
    applyUpdate,
    clearUpdate
  };
};


/*
import { useEffect, useState } from "react";
import { updateSW } from "../service/pwa";

export const usePWAUpdate = () => {
    const [updateAvailable, setUpdateAvailable] = useState(false);
    const clearUpdate = () => setUpdateAvailable(false);
    const applyUpdate = async () => {
        await updateSW();
        //clearUpdate();
    };
    useEffect(() => {
        const handler = () => setUpdateAvailable(true);

        window.addEventListener("sw-update-available", handler);

        return () => {
            window.removeEventListener("sw-update-available", handler);
        };
    }, []);

    return {
        updateAvailable,
        applyUpdate,
        clearUpdate
    };
}
*/