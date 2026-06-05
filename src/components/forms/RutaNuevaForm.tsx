import { List, ListInput } from "konsta/react";
import { LanguageIcon, PinMapIcon, SaveIcon } from "../svg/UtilsIcon";
import { useIntl } from "react-intl";
import { SearchIcon } from "../svg/FormIcons";
import { useDBRelevamientoLike } from "../../hooks/useDBRelevamiento";
import { useState } from "react";
import type { IRelevamiento, IRuta } from "../../interfaces/IEntidades";
import { useRutaForm } from "../../hooks/useRutaForm";
import { useToast } from "../../store/toast";
import { useNavigate } from "react-router-dom";
//import { useRutaForm } from "../../hooks/useRutaForm";

// isEditing ? <EditIcon/> : <SaveIcon/>
// setNombre(e.target.value);

interface IProps {
    ruta: IRuta | null;
    setRutaItem: React.Dispatch<React.SetStateAction<IRuta | null>>;
}

export const NuevaRutaForm = ({ruta, setRutaItem}:IProps) => {
    const {formatMessage:tr} = useIntl();
    const [busqueda, setBusqueda] = useState("");
    const {relevamientos} = useDBRelevamientoLike(busqueda);
    const [seleccionado, setSeleccionado] = useState(relevamientos[0]);
    const {nombre, setNombre, setRelevamientoId, save} = useRutaForm();
    const {openToast} = useToast();
    const navigate = useNavigate();
    //const {relevamientoId} = useRutaForm(seleccionado?.id);

    return <div>
            <List strongIos insetIos className="py-0 my-0 w-full">
                <ListInput
                    type="select"
                    dropdown
                    colors={{bgMaterial:'k-panel-form rounded-b-xl', outlineBorderMaterial:'border-none'}}
                    value={seleccionado?.id ?? ""}
                    name="relevamiento"
                    onChange={(e)=>{
                        const v = Number(e.target.value);
                        const sel = relevamientos.find(r => r.id === v) as IRelevamiento || null;
                        setSeleccionado(sel);
                        setRelevamientoId(sel?.id ?? null);
                    }}
                    media={<PinMapIcon />}>
                        <option value="-1">{tr({id:'select.rel'})}</option>
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
                <div className={seleccionado ? "mx-4 px-2" : "hidden"}>
                    <b>{tr({id:'selected.rel'})}:</b> {seleccionado?.nombre}
                </div>
            </List>
            <div className="flex items-center justify-between">
                <List strongIos insetIos className="py-0 my-0 w-full">
                    <ListInput outline label={tr({id:'route.title'})} floatingLabel type="text" placeholder={tr({id:'route.title'})}
                        value={nombre}
                        onChange={(e)=>{
                            setNombre(e.target.value);
                        }}
                        media={
                            <SaveIcon/>
                        }
                        clearButton={false}
                        onClear={()=>{
                            setNombre("");
                        }}
                    />                
                </List>
                <button type="button" className="left-0 k-btn-tonal-alt p-2 rounded-sm me-4" disabled={!seleccionado || !nombre} onClick={()=>{
                    save(()=>{
                        openToast({text:tr({id:'changes'})});
                        navigate(-1);
                    });
                }}>
                    <SaveIcon width={24} height={24}/>
                </button>
            </div>
    </div>
}