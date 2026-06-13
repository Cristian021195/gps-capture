import { PageNavbarContainer } from "../components/layout/PageNavbarContainer";
import { useIntl } from "react-intl";
import { IPhoneUserAlert } from "../components/blocks/IPhoneUserAlert";
import { validateDisplayMode } from "../utils/navigator-data";
import { MenuButton } from "../components/ui/MenuButton";
import { GestionProveedorForm } from "../components/forms/GestionProveedorForm";
import GestionProveedoresTable from "../components/tables/GestionProveedoresTable";
import { useDBProveedor } from "../hooks/useDBProveedor";

if (localStorage.getItem('iphone_advice') === null) {
    localStorage.setItem('iphone_advice', '1')
}

const standalone = validateDisplayMode('standalone');

export const GestionProveedores = () => {
    const { formatMessage: tr } = useIntl();
    const { proveedores, proveedorSeleccionado, deleteProveedor, getProveedor, unsetProveedor } = useDBProveedor();

    return <PageNavbarContainer className="k-bg" bgClassName="k-bg" title={tr({ id: 'proveedores.gestion' })} fallback_url="/" hash_eval="#share" right={<MenuButton />}>
        {!standalone && <IPhoneUserAlert />}
        <div className="mt-4 mx-2">
            <GestionProveedorForm proveedor={proveedorSeleccionado} unsetProveedor={unsetProveedor} />
        </div>
        <div className="mx-2 mt-8">
            <GestionProveedoresTable data={proveedores} onDelete={deleteProveedor} onEdit={(item) => getProveedor(item.id)} />
        </div>
    </PageNavbarContainer>
}