import { useIntl } from "react-intl"
import { QRShareIcon } from "../svg/FormIcons"

export const QRScannerLoader = () => {
    const {formatMessage:tr} = useIntl();
    return <div className="w-full aspect-square">
        <div className="flex flex-col justify-center items-center h-full">
            <div className="w-fit animate-pulse">
                <QRShareIcon width={160} height={160}/>
            </div>
            <p className="text-xl mt-4">{tr({id:'loading'})}</p>
        </div>        
    </div>
}