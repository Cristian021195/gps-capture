/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import { proveedorService } from "../services/proveedor.service";
import { TextHelper } from "../classes/TextHelper";
import Dexie from "dexie";
import { useToast } from "../store/toast";
import { useIntl } from "react-intl";

export function useProveedorForm(id?: number) {
    const [nombre, setNombre] = useState("");
    const [apiKey, setApiKey] = useState<string>("");
    const [error, setError] = useState<string | undefined>();
    const [loading, setLoading] = useState<boolean>(false);
    const [providerType, setProviderType] = useState<string>("");
    const {openToast} = useToast();
    const {formatMessage:tr} = useIntl();

    const clear = () => {
        setNombre('');
        setApiKey('');
        setError(undefined);
        setLoading(false);
        setProviderType('');        
    }

    useEffect(() => {
        if (error) {
            openToast({ text: tr({ id: error }) });
        }
    }, [error, openToast, tr]);

    useEffect(() => {
        if (!id) {
            setNombre('');
            setApiKey('');
            setError(undefined);
            setLoading(false);
            setProviderType('');
            return;
        }

        const load = async () => {
            setLoading(true);

            const item = await proveedorService.getById(id);

            if (item) {
                setNombre(item.nombre);
                setApiKey(item.api_key ?? "");
                setProviderType(item.provider_type);
            }

            setLoading(false);
        };

        load();
    }, [id]);

    const save = async (cb: () => void) => {
        try {
            setError(undefined);

            if (id) {
                const item = await proveedorService.getById(id);

                if(item?.api_key === apiKey && item?.nombre === nombre && item.provider_type === providerType){
                    throw new Error("NO_CHANGES");
                }

                await proveedorService.update(id, {
                    nombre,
                    key: TextHelper.from(nombre).slug().get(),
                    api_key: apiKey,
                    provider_type: providerType as any
                });
                cb();

            } else {

                await proveedorService.create({
                    nombre,
                    provider_type: providerType as any,
                    api_key:apiKey,
                    key: TextHelper.from(nombre).slug().get()
                });
                clear();
                cb();
            }
        } catch (err) {
            if (err instanceof Error && err.message === "DUPLICATE_KEY") {
                setError("duplicate");
                return;
            }

            if (err instanceof Error && err.message === "REQUIRED_RELEVAMIENTO_KEY") {
                setError("rel.error.required");
                return;
            }

            if (err instanceof Error && err.message === "NO_CHANGES") {
                setError("no.changes");
                return;
            }

            if (err instanceof Dexie.ModifyError) {
                if(err.failures[0].name === 'ConstraintError'){
                    setError("duplicate");
                    return;
                }
            }

            setError("broken");
        }
    };

    return {
        nombre, setNombre,
        apiKey, setApiKey,
        providerType, setProviderType,
        clear, save,
        error, loading,
        isEditing: !!id
    };
}