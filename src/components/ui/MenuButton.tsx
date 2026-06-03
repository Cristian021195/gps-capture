import { useIntl } from "react-intl";
import { useUpdateSearchParams } from "../../hooks/useUpdateSearchParams";
import { usePanel } from "../../store/panel";
import { MenuIcon } from "../svg/UtilsIcon";
import { MainMenuOptions } from "../blocks/MainMenuOptions";

export function MenuButton(){
    // const {text, opened, position, className, closeToast} = useToast();
    const updateParams = useUpdateSearchParams();
    const {openPanel} = usePanel();
    const {formatMessage:tr} = useIntl();
    // PanelInfo
    return <div className="px-4" onClick={()=>{
        updateParams({ emergent: "panel"});
        openPanel({
            opened:true,
            title:tr({id:'menu'}),
            children:<MainMenuOptions/>,
            floating:false
        });
    }}>
        <MenuIcon width={24} height={24}/>
    </div>
}