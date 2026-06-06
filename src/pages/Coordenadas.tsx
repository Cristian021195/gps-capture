import { PageNavbarContainer } from "../components/layout/PageNavbarContainer";
import { useIntl } from "react-intl";
import { IPhoneUserAlert } from "../components/blocks/IPhoneUserAlert";
import { validateDisplayMode } from "../utils/navigator-data";
import { MenuButton } from "../components/ui/MenuButton";
import { LocationConfigAdvice } from "../components/blocks/LocationConfigTrigger";
import { CoordenadasForm } from "../components/forms/CoordenadasForm";

if(localStorage.getItem('iphone_advice') === null){
    localStorage.setItem('iphone_advice', '1')
}

const standalone = validateDisplayMode('standalone');

export const Coordenadas = () => {    
    const {formatMessage:tr} = useIntl();

    return <PageNavbarContainer className="k-bg" bgClassName="k-bg" title={tr({id:'coordenadas'})} fallback_url="/" hash_eval="#share" right={<MenuButton/>}>
        { !standalone && <IPhoneUserAlert/> }
        <LocationConfigAdvice/>
        <div className="mx-4">
            <CoordenadasForm/>
        </div>
    </PageNavbarContainer>
}