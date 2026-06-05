import { MainBlockTitle, MainDivTitle } from "../components/blocks/MainBlockTitle"
import { PageNavbarContainer } from "../components/layout/PageNavbarContainer";
import { useIntl } from "react-intl";
import { IPhoneUserAlert } from "../components/blocks/IPhoneUserAlert";
import { validateDisplayMode } from "../utils/navigator-data";
import { MenuButton } from "../components/ui/MenuButton";
import { RutaForm } from "../components/forms/RutaForm";
import RutaTable from "../components/tables/RutaTable";
import { useDBRutaLike } from "../hooks/useDBRuta";
import { useState } from "react";
import type { IRuta } from "../interfaces/IEntidades";

if(localStorage.getItem('iphone_advice') === null){
    localStorage.setItem('iphone_advice', '1')
}

const standalone = validateDisplayMode('standalone');

export const Ruta = () => {    
    const {formatMessage:tr} = useIntl();
    const [busqueda, setBusqueda] = useState('');
    const { rutas } = useDBRutaLike(busqueda);
    const [rutaItem, setRutaItem] = useState<IRuta | null>(null);

    return <PageNavbarContainer className="k-bg" bgClassName="k-bg" title={tr({id:'ruta'})} fallback_url="/" hash_eval="#share" right={<MenuButton/>}>
        { !standalone && <IPhoneUserAlert/> }
        <MainDivTitle title={tr({id:'find.ruta'})} className="space-y-2 m-4">
            <RutaForm onSearch={setBusqueda} rutaItem={rutaItem}/>
        </MainDivTitle>
        <MainDivTitle title={tr({id:'ges.route'})} className="space-y-2 m-4">
            <RutaTable data={rutas} onEdit={setRutaItem} />
        </MainDivTitle>
        <MainBlockTitle className="space-y-1" title={tr({id:'home'})}>
            <p>algo</p>
        </MainBlockTitle>
    </PageNavbarContainer>
}// <RelevamientoTable data={relevamientos} onDelete={handleDelete} onEdit={setRelItem}/>