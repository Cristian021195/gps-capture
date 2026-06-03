import { QRCodeSVG } from "qrcode.react"
import { useIntl } from "react-intl"

interface IProps {
    value:string
}
export const BottomModalScanPageQR = ({value}:IProps) => {
    const {formatMessage:tr} = useIntl();
    return <div>
        <b>{tr({id:'qr.share.desc'})}</b>
        <div className="flex justify-center my-4">        
        <QRCodeSVG
            value={value}
            size={256}
            className="border-8 border-white"
        />
        </div>
    </div>
}