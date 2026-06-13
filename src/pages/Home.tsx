import { MainDivTitle } from "../components/blocks/MainBlockTitle"
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
import { useModal } from "../store/modal";
import { useUpdateSearchParams } from "../hooks/useUpdateSearchParams";
import { ModalBorrarRelevamiento } from "../components/floating/ModalBorrarRelevamiento";

if(localStorage.getItem('iphone_advice') === null){
    localStorage.setItem('iphone_advice', '1')
}

const standalone = validateDisplayMode('standalone');

export const Home = () => {    
    const {formatMessage:tr} = useIntl();
    const {relevamientos} = useDBRelevamiento();
    const [relItem, setRelItem] = useState<IRelevamiento | null>(null);
    const {openModal} = useModal();
    const updateParams = useUpdateSearchParams();
    //openBottomModal({title:row.original.nombre, children:<RutaEditForm ruta={row.original} setRutaItem={setRutaItem}/>});
    //updateParams({ emergent: "bottommodal"});
    
    const handleDelete = async (relevamiento: IRelevamiento) => {
        if (!relevamiento.id) return;
        updateParams({ emergent: "modal"});
        openModal({
            title:tr({id:'rel.delete.title'}), 
            content: <ModalBorrarRelevamiento 
            cb={async () => {
                await relevamientoService.delete(
                  relevamiento.id
                );
            }}/> 
        });
    };

    return <PageNavbarContainer className="k-bg" bgClassName="k-bg" title="GPS Capture" fallback_url="/" hash_eval="#share" right={<MenuButton/>}>
        { !standalone && <IPhoneUserAlert/> }
        <MainDivTitle title={tr({id:'ges.rel'})} className="space-y-2 mt-4 mx-2">
            <RelevamientoForm relevamiento={relItem} setRelItem={setRelItem}/>
        </MainDivTitle>
        <div className="mt-4 mx-2">
            <RelevamientoTable data={relevamientos ?? []} onDelete={handleDelete} onEdit={setRelItem}/>
        </div>        
    </PageNavbarContainer>
}
/* <MainBlockTitle className="space-y-1" title={tr({id:'home'})}>
            <p>hola</p>
        </MainBlockTitle> */