import { List, ListInput } from "konsta/react";
import { EditIcon, LanguageIcon, SaveIcon } from "../svg/UtilsIcon";
import { useIntl } from "react-intl";
import { SearchIcon } from "../svg/FormIcons";
import { useDBRelevamientoLike } from "../../hooks/useDBRelevamiento";
import { useEffect, useState } from "react";
import type { IRelevamiento, IRuta, IRutaRelevamiento } from "../../interfaces/IEntidades";
import { useRutaForm } from "../../hooks/useRutaForm";
import { useToast } from "../../store/toast";
import { useNavigate } from "react-router-dom";
//import { useRutaForm } from "../../hooks/useRutaForm";

// isEditing ? <EditIcon/> : <SaveIcon/>
// setNombre(e.target.value);

interface IProps {
    ruta: IRutaRelevamiento | null;
    setRutaItem: React.Dispatch<React.SetStateAction<IRuta | null>>;
}

export const RutaEditForm = ({ruta, setRutaItem}:IProps) => {
    const {formatMessage:tr} = useIntl();
    const [busqueda, setBusqueda] = useState("");
    const {relevamientos} = useDBRelevamientoLike(busqueda);
    const {nombre, relevamientoId, error, setNombre, setRelevamientoId, save} = useRutaForm(ruta?.id || undefined);
    const {openToast} = useToast();
    const navigate = useNavigate();
    //const {relevamientoId} = useRutaForm(seleccionado?.id);

    useEffect(() => {
        if(ruta){
            setNombre(ruta.nombre);
            setRelevamientoId(ruta.relevamiento_id);
        }
    }, [ruta])

    useEffect(()=>{
        if(error !== null){
            openToast({text: tr({id:error})});
        }
    }, [error])

    return <div>
            <List strongIos insetIos className="py-0 my-0 w-full">
                <ListInput
                    type="select"
                    dropdown
                    colors={{bgMaterial:'k-panel-form rounded-b-xl', outlineBorderMaterial:'border-none'}}
                    value={relevamientoId ? relevamientoId : (ruta?.relevamiento_id ?? "")}
                    name="relevamiento"
                    onChange={(e)=>{
                        const v = Number(e.target.value);
                        const sel = relevamientos.find(r => r.id === v) as IRelevamiento || null;
                        setRelevamientoId(sel?.id ?? null);
                    }}
                    media={<LanguageIcon />}>
                        {
                            relevamientos.map(r => <option key={r.id} value={r.id}> {r.nombre}</option>)
                        }
                </ListInput>
                <List strongIos insetIos className="py-0 my-0 w-full">
                    <ListInput outline label={tr({id:'ges.title'})} floatingLabel type="text" placeholder={tr({id:'ges.title'})}
                        onChange={(e)=>{
                            setBusqueda(e.target.value);
                        }}
                        media={
                            <SearchIcon/>
                        }
                        clearButton={false}
                        onClear={()=>{
                            setBusqueda("");
                            // setRelItem(null);
                        }}
                    />                
                </List>                
                <div className={relevamientoId ? "mx-4 px-2" : "hidden"}>
                    <b>{tr({id:'selected.rel'})}:</b> {
                        relevamientoId
                        ? relevamientos.find(r => r.id === relevamientoId)?.nombre 
                        : ruta?.relevamiento_nombre
                    }
                </div>
            </List>
            <div className="flex items-center justify-between">
                <List strongIos insetIos className="py-0 my-0 w-full">
                    <ListInput outline label={tr({id:'route.title'})} floatingLabel type="text" placeholder={tr({id:'route.title'})}
                        value={nombre ? nombre : ruta?.nombre ?? ""}
                        onChange={(e)=>{
                            setNombre(e.target.value);
                        }}
                        media={
                            <SaveIcon/>
                        }
                        clearButton={true}
                        onClear={()=>{
                            setNombre(ruta?.nombre ?? "");
                            setRelevamientoId(ruta?.relevamiento_id);
                        }}
                    />                
                </List>
                <button type="button" className="left-0 k-btn-tonal-alt p-2 rounded-sm me-4" disabled={false} onClick={()=>{
                    /*
                    if(ruta?.relevamiento_id === relevamientoId && ruta?.nombre === nombre){
                        openToast({text:tr({id:'no.changes'})});
                    }else if(!relevamientoId && nombre === ''){
                        openToast({text:tr({id:'empty'})});
                    }else{
                        openToast({text:tr({id:'changes'})});
                    }
                    */                   
                    save(()=>{
                        openToast({text:tr({id:'changes'})});
                        navigate(-1);
                    });
                }}>
                    <EditIcon width={24} height={24}/>
                </button>
            </div>
    </div>
}