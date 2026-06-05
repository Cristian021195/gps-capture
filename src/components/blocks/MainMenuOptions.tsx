import { Link } from "react-router-dom"
import { useIntl } from "react-intl"
import { GearIcon } from "../svg/GearIcon";
import { ShieldIcon } from "../svg/Privacy";
import { InfoIcon } from "../svg/InfoIcon";
import { useUpdateSearchParams } from "../../hooks/useUpdateSearchParams";
import { MapLayoutIcon } from "../svg/UtilsIcon";

export const MainMenuOptions = () => {
    const {formatMessage:tr} = useIntl();
    const updateParams = useUpdateSearchParams();
    return <div className="flex flex-col justify-between">
        <div className="flex flex-col gap-8">
            <Link to="/proveedores" onClick={()=>{updateParams({ emergent: null }, { replace: true });}}>
                <button className="flex items-center gap-2">
                    <MapLayoutIcon/>
                    {tr({id:'proveedores'})}
                </button>
            </Link>
            <Link to="/config" onClick={()=>{updateParams({ emergent: null }, { replace: true });}}>
                <button className="flex items-center gap-2">
                    <GearIcon/>
                    {tr({id:'config'})}
                </button>
            </Link>
            <Link to="/privacy" onClick={()=>{updateParams({ emergent: null }, { replace: true });}}>
                <button className="flex items-center gap-2">
                    <ShieldIcon/>
                    {tr({id:'privacy'})}
                </button>
            </Link>
            <Link to="/info" onClick={()=>{updateParams({ emergent: null }, { replace: true });}}>
                <button className="flex items-center gap-2">
                    <InfoIcon/>
                    {tr({id:'info'})}
                </button>
            </Link>
        </div>
    </div>
}