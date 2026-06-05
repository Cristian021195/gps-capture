import { useEffect, useState } from "react";
import { TextHelper } from "../classes/TextHelper";
import { useToast } from "../store/toast";
import { useIntl } from "react-intl";
import { rutaService } from "../services/ruta.service";
import { Dexie } from "dexie";

export function useRutaForm(id?: number) {
    const [nombre, setNombre] = useState("");
    const [relevamientoId, setRelevamientoId] = useState<number>();
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

            const item = await rutaService.getById(id);

            if (item) {
                setNombre(item.nombre);
                setRelevamientoId(item.relevamiento_id);
            }

            setLoading(false);
        };

        load();
    }, [id]);

    const save = async (cb: () => void) => {
        try {
            setError(null);

            if (id) {
                const item = await rutaService.getById(id);

                if(item?.relevamiento_id === relevamientoId && item?.nombre === nombre){
                    throw new Error("NO_CHANGES");
                }

                await rutaService.update(id, {
                    nombre,
                    key: TextHelper.from(nombre).slug().get(),
                    relevamiento_id: relevamientoId
                });
                cb();

            } else {
                if(!relevamientoId){
                    throw new Error("REQUIRED_RELEVAMIENTO_KEY");
                }
                await rutaService.create({
                    nombre,
                    relevamiento_id: relevamientoId,
                    key: TextHelper.from(nombre).slug().get()
                });
                setNombre('');
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
        nombre,
        setNombre,
        relevamientoId, 
        setRelevamientoId,
        save,
        loading,
        error,
        isEditing: !!id
    };
}