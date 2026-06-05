import { Button, List, ListInput } from "konsta/react";
import { EditIcon, MapLayoutIcon, SaveIcon } from "../svg/UtilsIcon";
import { proveedores_default } from "../../utils/proveedores";
import { useIntl } from "react-intl";
import { useProveedorForm } from "../../hooks/useProveedorForm";
import { useEffect, useState } from "react";

export const GestionProveedorForm = () => {
    const {formatMessage:tr} = useIntl();
    const [proveedorSeleccionado, setProveedorSeleccionado] = useState();
    const { nombre, setNombre, apiKey, setApiKey, providerType, setProviderType, save, loading, error, isEditing } = useProveedorForm(proveedorSeleccionado);

    useEffect(()=>{
        if(proveedores_default.length > 0){
            setProviderType(proveedores_default[0].service);
        }        
    },[])

    return (
        <List strongIos insetIos className="py-0 my-0 w-full">
            <ListInput
                type="select"
                dropdown
                colors={{bgMaterial:'k-panel-form rounded-b-xl', outlineBorderMaterial:'border-none'}}
                value={providerType}
                name="relevamiento"
                onChange={(e)=>{
                    setProviderType(e.target.value)
                }}
                media={<MapLayoutIcon/>}>{
                    proveedores_default.map(r => <option key={r.id} value={r.id}> {r.nombre} ({r.service})</option>)
                }
            </ListInput>
            <ListInput outline label={tr({id:'proveedor.reg'})} floatingLabel type="text" placeholder={tr({id:'proveedor.ej'})} value={nombre}
                onChange={(e)=>{setNombre(e.target.value);}}
                media={
                    isEditing ? <EditIcon/> : <SaveIcon/>
                }
                clearButton={(nombre) ? true : false}
                onClear={()=>{
                    setNombre("");
                }}                
            />
            <ListInput outline label={tr({id:'api.key'})} floatingLabel type="text" placeholder={tr({id:'api.ej'})} value={apiKey}
                onChange={(e)=>{setApiKey(e.target.value.trim());}}
                media={
                    isEditing ? <EditIcon/> : <SaveIcon/>
                }
                clearButton={true}
                onClear={()=>{
                    setApiKey("");
                }}                
            />
            <Button type="button" className="w-fit mx-auto" disabled={false} onClick={()=>{ // loading || !nombre
                save();
                // setNombre("");
                // setRelItem(null);
                console.log({nombre, apiKey, providerType, proveedorSeleccionado})
            }}>
                {tr({id:'save.edit'})}
            </Button>
        </List>
    )
}
