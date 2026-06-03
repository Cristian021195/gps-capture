import { useEffect, useState } from "react";
import type { IBeforeInstallPromptEvent } from "../interfaces/IBeforeInstallPromptEvent";

export const usePWAInstall = () => {
    const [bip, setBip] = useState<IBeforeInstallPromptEvent | undefined>();
    const [updateAvailable, setUpdateAvailable] = useState(false);

    useEffect(() => {        

        // lógica de instalación
        //const beforeInstallHandler = (event: Event) => {
        //    event.preventDefault();
        //    setBip(event as IBeforeInstallPromptEvent);
        //};

        // refuerzo p instalación
        if ((window).deferredPrompt) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setBip((window).deferredPrompt);
        }

        // lógica de actualización
        const swUpdateHandler = () => {
            // Verificamos si ya había un controlador (no es la primera carga)
            if (navigator.serviceWorker.controller) {
                console.log("Nuevo SW activado");
                
                // 1. Seteamos tu bandera en localStorage
                localStorage.setItem('update_notified', '0');
                
                // 2. Avisamos al estado de React por si quieres mostrar un check azul o algo sutil
                setUpdateAvailable(true);

                // OPCIONAL: Si quieres que los cambios se vean YA mismo,
                // muchos desarrolladores fuerzan un reload silencioso.
                // window.location.reload(); 
            }
        };

        //window.addEventListener('beforeinstallprompt', beforeInstallHandler);

        // Escuchamos el cambio de controlador nativo
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.addEventListener('controllerchange', swUpdateHandler, {once:true});
        }

        return () => {
            //window.removeEventListener('beforeinstallprompt', beforeInstallHandler);
            if ('serviceWorker' in navigator) {
                navigator.serviceWorker.removeEventListener('controllerchange', swUpdateHandler);
            }
        };
    }, []);

    const promptInstall = async () => {
        if (!bip) return;

        bip.prompt();
        const choice = await bip.userChoice;

        if (choice?.outcome === 'accepted') {
        setBip(undefined);
        }
    };

    return {
        bip,
        updateAvailable,
        promptInstall,
        clearInstallPrompt: () => setBip(undefined),
    };
}