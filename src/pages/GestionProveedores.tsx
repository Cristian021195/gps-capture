import { MainDivTitle } from "../components/blocks/MainBlockTitle"
import { PageNavbarContainer } from "../components/layout/PageNavbarContainer";
import { useIntl } from "react-intl";
import { IPhoneUserAlert } from "../components/blocks/IPhoneUserAlert";
import { validateDisplayMode } from "../utils/navigator-data";
import { MenuButton } from "../components/ui/MenuButton";
import { LocationConfigAdvice } from "../components/blocks/LocationConfigTrigger";
import { GestionProveedorForm } from "../components/forms/GestionProveedorForm";
import GestionProveedoresTable from "../components/tables/GestionProveedoresTable";
import { useDBProveedor } from "../hooks/useDBProveedor";

if(localStorage.getItem('iphone_advice') === null){
    localStorage.setItem('iphone_advice', '1')
}

const standalone = validateDisplayMode('standalone');

export const GestionProveedores = () => {    
    const {formatMessage:tr} = useIntl();
    const {proveedores} = useDBProveedor();

    return <PageNavbarContainer className="k-bg" bgClassName="k-bg" title={tr({id:'proveedores.gestion'})} fallback_url="/" hash_eval="#share" right={<MenuButton/>}>
        { !standalone && <IPhoneUserAlert/> }
        <LocationConfigAdvice/>
        <div className="mx-4">
            <GestionProveedorForm/>
        </div>
        <div className="m-4 mt-8">
            <GestionProveedoresTable data={proveedores}/>
        </div>
    </PageNavbarContainer>
}