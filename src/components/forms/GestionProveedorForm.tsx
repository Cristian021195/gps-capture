import { Button, List, ListInput } from "konsta/react";
import { EditIcon, MapLayoutIcon, SaveIcon } from "../svg/UtilsIcon";
import { proveedores_default } from "../../utils/proveedores";
import { useIntl } from "react-intl";
import type { IGeoProvider } from "../../interfaces/IEntidades";
import { useProveedorForm } from "../../hooks/useProveedorForm";
import { useToast } from "../../store/toast";

interface IProps {
    proveedor: IGeoProvider | null,
    unsetProveedor: () => Promise<void>
}

export const GestionProveedorForm = ({proveedor, unsetProveedor}:IProps) => {
    const {formatMessage:tr} = useIntl();
    const {nombre, setNombre, apiKey, setApiKey, providerType, setProviderType, clear, save} = useProveedorForm();
    const {openToast} = useToast();

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
                    <>
                    <option value="">{tr({id:'select.service'})}</option>
                    {
                        proveedores_default.map(r => <option key={r.id} value={r.id}> {r.nombre} ({r.service})</option>)
                    }
                    </>
                }
            </ListInput>
            <ListInput outline label={tr({id:'proveedor.reg'})} floatingLabel type="text" placeholder={tr({id:'proveedor.ej'})} 
                value={nombre}
                onChange={(e)=>{
                    setNombre(e.target.value);
                }}
                media={
                    <SaveIcon/>
                }
                clearButton={true}
                onClear={()=>{
                    setNombre("");
                }}
            />
            <ListInput outline label={tr({id:'api.key'})} floatingLabel type="text" placeholder={tr({id:'api.ej'})} 
                value={apiKey}
                onChange={(e)=>{
                    setApiKey(e.target.value)
                }}
                media={
                    <SaveIcon/>
                }
                clearButton={true}
                onClear={()=>{
                    setApiKey("")
                }}                
            />
            <div className="flex gap 4">
                <Button type="button" className="w-fit mx-auto" disabled={(nombre?.length < 3) || providerType === ''} onClick={()=>{
                    save(()=>{
                        openToast({text:tr({id:'prvoeedor.ok'})});
                    });
                }}>
                    {tr({id:'save.edit'})}
                </Button>            
                <Button type="button" className="w-fit mx-auto k-btn-tonal" disabled={false} onClick={clear}>
                    {tr({id:'clear'})}
                </Button>
            </div>
        </List>
    )
}
// isEditing ? <EditIcon/> : <SaveIcon/>