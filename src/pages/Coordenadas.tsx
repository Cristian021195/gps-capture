import { MainBlockTitle, MainDivTitle } from "../components/blocks/MainBlockTitle"
import { PageNavbarContainer } from "../components/layout/PageNavbarContainer";
import { useIntl } from "react-intl";
import { IPhoneUserAlert } from "../components/blocks/IPhoneUserAlert";
import { validateDisplayMode } from "../utils/navigator-data";
import { MenuButton } from "../components/ui/MenuButton";

if(localStorage.getItem('iphone_advice') === null){
    localStorage.setItem('iphone_advice', '1')
}

const standalone = validateDisplayMode('standalone');

export const Coordenadas = () => {    
    const {formatMessage:tr} = useIntl();

    return <PageNavbarContainer className="k-bg" bgClassName="k-bg" title={tr({id:'coordenadas'})} fallback_url="/" hash_eval="#share" right={<MenuButton/>}>
        { !standalone && <IPhoneUserAlert/> }
        <MainDivTitle title={tr({id:'departure'})} className="space-y-2 m-4">
            <p>algo</p>
        </MainDivTitle>
        <MainBlockTitle className="space-y-1" title={tr({id:'home'})}>
            <p>algo</p>
        </MainBlockTitle>
    </PageNavbarContainer>
}