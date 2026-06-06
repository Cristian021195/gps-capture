import { Button, List, ListInput } from "konsta/react";
import { EditIcon, MapLayoutIcon, SaveIcon } from "../svg/UtilsIcon";
import { proveedores_default } from "../../utils/proveedores";
import { useIntl } from "react-intl";
import { useProveedorForm } from "../../hooks/useProveedorForm";
import { useEffect } from "react";
import type { IGeoProvider } from "../../interfaces/IEntidades";

interface IProps {
    proveedor: IGeoProvider | null,
    unsetProveedor: () => Promise<void>
}

export const GestionProveedorForm = ({proveedor, unsetProveedor}:IProps) => {
    const {formatMessage:tr} = useIntl();
    const { nombre, setNombre, apiKey, setApiKey, providerType, setProviderType, save, loading, error, isEditing } = useProveedorForm(proveedor?.id);

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
            <ListInput outline label={tr({id:'proveedor.reg'})} floatingLabel type="text" placeholder={tr({id:'proveedor.ej'})} 
                value={nombre}
                onChange={(e)=>{setNombre(e.target.value);}}
                media={
                    isEditing ? <EditIcon/> : <SaveIcon/>
                }
                clearButton={(nombre) ? true : false}
                onClear={()=>{
                    setNombre("");
                }}                
            />
            <ListInput outline label={tr({id:'api.key'})} floatingLabel type="text" placeholder={tr({id:'api.ej'})} 
                value={apiKey}
                onChange={(e)=>{
                    setApiKey(e.target.value.trim());}
                }
                media={
                    isEditing ? <EditIcon/> : <SaveIcon/>
                }
                clearButton={true}
                onClear={()=>{
                    setApiKey("");
                }}                
            />
            <div className="flex gap 4">
                <Button type="button" className="w-fit mx-auto" disabled={false} onClick={()=>{ // loading || !nombre
                    save();
                    unsetProveedor();
                }}>
                    {tr({id:'save.edit'})}
                </Button>            
                <Button type="button" className="w-fit mx-auto k-btn-tonal" disabled={false} onClick={()=>{
                    unsetProveedor();
                    setNombre("");
                    setApiKey("");
                    setProviderType("");
                }}>
                    {tr({id:'clear'})}
                </Button>
            </div>
        </List>
    )
}
