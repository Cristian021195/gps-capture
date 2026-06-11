/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import { proveedorService } from "../services/proveedor.service";
import { TextHelper } from "../classes/TextHelper";
import Dexie from "dexie";

export function useProveedorForm(id?: number) {
    const [nombre, setNombre] = useState("");
    const [apiKey, setApiKey] = useState<string>("");
    const [error, setError] = useState<string | undefined>();
    const [loading, setLoading] = useState<boolean>(false);
    const [providerType, setProviderType] = useState<string>("");

    const clear = () => {
        setNombre('');
        setApiKey('');
        setError('');
        setLoading(false);
        setProviderType('');        
    }

    useEffect(() => {
        if (!id) return;

        const load = async () => {
            setLoading(true);

            const item = await proveedorService.getById(id);

            if (item) {
                setNombre(item.nombre);
                // setRelevamientoId(item.relevamiento_id);
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
                    api_key: apiKey
                });
                cb();

            } else {

                await proveedorService.create({
                    nombre,
                    provider_type: providerType,
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
        error, loading
    };
}