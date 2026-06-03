import { useEffect, useState } from "react";
import { relevamientoService } from "../services/relevamiento.service";
import { TextHelper } from "../classes/TextHelper";
import { useToast } from "../store/toast";
import { useIntl } from "react-intl";

export function useRutaForm(id?: number) {
    const [nombre, setNombre] = useState("");
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

            const item = await relevamientoService.getById(id);

            if (item) {
                setNombre(item.nombre);
            }

            setLoading(false);
        };

        load();
    }, [id]);

    const save = async () => {
        try {
            setError(null);

            if (id) {
                await relevamientoService.update(id, {
                    nombre
                });
            } else {
                await relevamientoService.create({
                    nombre,
                    key: TextHelper.from(nombre).slug().get()
                });
                setNombre('');
            }
        } catch (err) {
            if (err instanceof Error && err.message === "DUPLICATE_KEY") {
                setError("duplicate");
                return;
            }
            setError("broken");
        }
    };

    return {
        nombre,
        setNombre,
        save,
        loading,
        error,
        isEditing: !!id
    };
}