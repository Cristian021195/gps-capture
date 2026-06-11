import { useEffect, useState } from "react";
import { TextHelper } from "../classes/TextHelper";
import { useToast } from "../store/toast";
import { useIntl } from "react-intl";
import { proveedorService } from "../services/proveedor.service";
import { proveedores_default } from "../utils/proveedores";

const default_prov = proveedores_default[0]?.service || "google";

export function useProveedorForm(id?: number) {
    const [nombre, setNombre] = useState<string | undefined>("");
    const [apiKey, setApiKey] = useState<string | undefined>("");
    const [providerType, setProviderType] = useState<string | undefined>(default_prov);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const {openToast} = useToast();
    const {formatMessage:tr} = useIntl();

    useEffect(()=>{
        if(error !== null){
            openToast({text: tr({id:error})});
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[error])

    useEffect(() => {
        if (!id) return;

        const load = async () => {
            setLoading(true);

            const item = await proveedorService.getById(id);

            if (item) {
                setNombre(item.nombre);
                setApiKey(item.api_key);
                setProviderType(item.provider_type);
            }

            setLoading(false);
        };

        load();
    }, [id]);

    const save = async () => {
        try {
            setError(null);

            if (id) {
                // no permitimos cambio de proveedor
                await proveedorService.update(id, {
                    api_key:apiKey,
                    nombre,
                    key: TextHelper.from(nombre+"").slug().get()
                });
                reset();
            } else {
                await proveedorService.create({
                    api_key:apiKey+"",
                    nombre:nombre+"",
                    provider_type: providerType+"",
                    key: TextHelper.from(nombre+"").slug().get()
                });
                reset();
            }
        } catch (err) {
            if (err instanceof Error && err.message === "DUPLICATE_KEY") {
                setError("duplicate");
                return;
            }
            setError("broken");
        }
    };

    const reset = () => {
        setApiKey("")
        setError(null)
        setNombre("")
        setProviderType(default_prov);
    }

    return {
        nombre, setNombre,
        apiKey, setApiKey,
        providerType, setProviderType,
        save,
        loading,
        error,
        isEditing: !!id
    };
}