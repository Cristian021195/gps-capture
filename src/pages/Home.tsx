import { MainBlockTitle, MainDivTitle } from "../components/blocks/MainBlockTitle"
import { PageNavbarContainer } from "../components/layout/PageNavbarContainer";
import { useIntl } from "react-intl";
import { IPhoneUserAlert } from "../components/blocks/IPhoneUserAlert";
import { validateDisplayMode } from "../utils/navigator-data";
import { MenuButton } from "../components/ui/MenuButton";
import { RelevamientoForm } from "../components/forms/RelevamientoForm";
import { useDBRelevamiento } from "../hooks/useDBRelevamiento";
import RelevamientoTable from "../components/tables/RelevamientoTable";
import type { IRelevamiento } from "../interfaces/IEntidades";
import { relevamientoService } from "../services/relevamiento.service";
import { useState } from "react";

if(localStorage.getItem('iphone_advice') === null){
    localStorage.setItem('iphone_advice', '1')
}

const standalone = validateDisplayMode('standalone');

export const Home = () => {    
    const {formatMessage:tr} = useIntl();
    const {relevamientos} = useDBRelevamiento();
    const [relItem, setRelItem] = useState<IRelevamiento | null>(null);
    
    const handleDelete = async (relevamiento: IRelevamiento) => {
        if (!relevamiento.id) return;
    
        await relevamientoService.delete(
          relevamiento.id
        );
    };

    return <PageNavbarContainer className="k-bg" bgClassName="k-bg" title="GPS Capture" fallback_url="/" hash_eval="#share" right={<MenuButton/>}>
        { !standalone && <IPhoneUserAlert/> }
        <MainDivTitle title={tr({id:'ges.rel'})} className="space-y-2 m-4">
            <RelevamientoForm relevamiento={relItem} setRelItem={setRelItem}/>
        </MainDivTitle>
        <div className="m-4 mt-4">
            <RelevamientoTable data={relevamientos} onDelete={handleDelete} onEdit={setRelItem}/>
        </div>
        <MainBlockTitle className="space-y-1" title={tr({id:'home'})}>
            <p>hola</p>
        </MainBlockTitle>
    </PageNavbarContainer>
}