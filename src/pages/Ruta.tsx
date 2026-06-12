import { MainDivTitle } from "../components/blocks/MainBlockTitle"
import { PageNavbarContainer } from "../components/layout/PageNavbarContainer";
import { useIntl } from "react-intl";
import { IPhoneUserAlert } from "../components/blocks/IPhoneUserAlert";
import { validateDisplayMode } from "../utils/navigator-data";
import { MenuButton } from "../components/ui/MenuButton";
import { RutaForm } from "../components/forms/RutaForm";
import RutaTable from "../components/tables/RutaTable";
import { useRutaRelevamiento, useRutaGestion } from "../hooks/useRuta";

if(localStorage.getItem('iphone_advice') === null){
    localStorage.setItem('iphone_advice', '1')
}

const standalone = validateDisplayMode('standalone');

export const Ruta = () => {    
    const {formatMessage:tr} = useIntl();
    const {busqueda, setBusqueda, setRutaItem, handleDelete, handleExport} = useRutaGestion();
    const { rutas } = useRutaRelevamiento(busqueda);

    return <PageNavbarContainer className="k-bg" bgClassName="k-bg" title={tr({id:'ruta'})} fallback_url="/" hash_eval="#share" right={<MenuButton/>}>
        { !standalone && <IPhoneUserAlert/> }
        <MainDivTitle title={tr({id:'find.ruta'})} className="space-y-2 m-4">
            <RutaForm onSearch={setBusqueda}/>
        </MainDivTitle>
        <MainDivTitle title={tr({id:'ges.route'})} className="space-y-2 m-4">
            <RutaTable data={rutas ?? []} onEdit={setRutaItem} onDelete={handleDelete} onExport={handleExport} />
        </MainDivTitle>        
    </PageNavbarContainer>
}