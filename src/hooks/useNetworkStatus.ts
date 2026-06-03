import { useEffect } from "react";
import { useIntl } from "react-intl";
import { useNotification } from "../store/notification";

export const useNetworkStatus = () => {
    const {openNotification} = useNotification();
    const {formatMessage:tr} = useIntl();
    useEffect(() => {
        const handleOnline = () => {
            openNotification({title:tr({id:'ok.conn'})})
        };
        const handleOffline = () => {
            openNotification({title:tr({id:'err.conn'})})
        };

        window.addEventListener("online", handleOnline);
        window.addEventListener("offline", handleOffline);

        if (!navigator.onLine) handleOffline();

        return () => {
            window.removeEventListener("online", handleOnline);
            window.removeEventListener("offline", handleOffline);
        };
    }, []);
}