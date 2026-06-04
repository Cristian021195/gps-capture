import { List, ListInput } from "konsta/react";
import { LanguageIcon, SaveIcon } from "../svg/UtilsIcon";
import { useIntl } from "react-intl";
import { SearchIcon } from "../svg/FormIcons";
import { useDBRelevamientoLike } from "../../hooks/useDBRelevamiento";
import { useState } from "react";
import type { IRelevamiento } from "../../interfaces/IEntidades";

// isEditing ? <EditIcon/> : <SaveIcon/>
// setNombre(e.target.value);
export const NuevaRutaForm = () => {
    const {formatMessage:tr} = useIntl();
    const [busqueda, setBusqueda] = useState("");
    const {relevamientos} = useDBRelevamientoLike(busqueda);
    const [seleccionado, setSeleccionado] = useState(relevamientos[0]);
    console.log(relevamientos[0]);
    return <div>
            <List strongIos insetIos className="py-0 my-0 w-full">
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
                    }}
                    media={<LanguageIcon />}>
                        <option value="-1">{tr({id:'select.rel'})}</option>
                        {
                            relevamientos.map(r => <option key={r.id} value={r.id}> {r.nombre}</option>)
                        }
                </ListInput>
                <div className={seleccionado ? "mx-4 px-2" : "hidden"}>
                    <b>{tr({id:'selected.rel'})}:</b> {seleccionado?.nombre}
                </div>
            </List>
            <div className="flex items-center justify-between">
                <List strongIos insetIos className="py-0 my-0 w-full">
                    <ListInput outline label={tr({id:'route.title'})} floatingLabel type="text" placeholder={tr({id:'route.title'})}
                        onChange={(e)=>{console.log(e.target.value);}}
                        media={
                            <SaveIcon/>
                        }
                        clearButton={false}
                        onClear={()=>{
                            // setNombre("");
                            // setRelItem(null);
                        }}
                    />                
                </List>
                <button type="button" className="left-0 k-btn-tonal-alt p-2 rounded-sm me-4" disabled={!seleccionado} onClick={()=>{console.log("save")}}>
                    <SaveIcon width={24} height={24}/>
                </button>
            </div>
    </div>
}