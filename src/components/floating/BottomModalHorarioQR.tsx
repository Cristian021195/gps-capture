import { Button } from "konsta/react";
import type { IModalOptionsProps } from "../../interfaces/IModal";
import { useIntl } from "react-intl";
import { useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { GLOBAL } from "../../constants/global";
import { CustomScanner } from "../ui/CustomScanner";
import { QRShareIcon } from "../svg/FormIcons";
import { WarningIconFill } from "../svg/UtilsIcon";
import { BottomModalScanPageQR } from "./BottomModalScanPageQR";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const BottomModalHorarioQR = ({urls}:IModalOptionsProps) => {
    const { id:nombre } = useParams();
    const [searchParams] = useSearchParams();
    const empresa_id = Number(searchParams.get("id"));
    const { formatMessage: tr } = useIntl();
    //const [showQR, setShowQR] = useState(false);
    //const [showScanner, setShowScanner] = useState(false);
    const [mode, setMode] = useState<'qr' | 'scanner' | null>(null);

    const urls_split = urls.split('|');    
    const url_empresas = urls_split[0] === 'undefined' ? undefined : urls_split[0]?.replace(GLOBAL.APP_SCRIPT_BASE_URL, "");
    const url_horario = urls_split[1] === 'undefined' ? undefined : urls_split[1]?.replace(GLOBAL.APP_SCRIPT_BASE_URL, "");
    const valid_qr = typeof (url_empresas && url_horario && empresa_id && nombre) === 'string';
    
    return <div>
            <b>{tr({id:'modal.title'})}</b>
            <p>{tr({id:'modal.qr.description'})}</p>
            <br />
            {
                (mode === 'qr' && valid_qr)
                ? 
                <BottomModalScanPageQR value={empresa_id + "|" + nombre + "|" + urls}/>
                : (mode === 'qr' && !valid_qr) &&
                <div className="my-10 text-center">
                    <div className="relative w-fit mx-auto mb-2 hithere">
                        <div className="absolute bottom-24 left-24">
                            <WarningIconFill width={64} height={64} fill="#FBC02D"/>
                        </div>
                        <div>
                            <QRShareIcon width={128} height={128}/>
                        </div>
                    </div>
                    <b className="text-lg">{tr({id:'qr.gen.err'})}</b>
                </div>
            }
            {
                mode === 'scanner' && <CustomScanner/>
            }
            <input type="text" name="links" className="border rounded w-full p-2 hidden" defaultValue={urls ?? ''}></input>
            <div className='grid grid-cols-2 gap-2 mt-4'>

                    <Button className="col-span-1 k-btn-tonal" title="Opción 1" onClick={() => setMode('qr')}>
                        {tr({id:'modal.qr.generate'})}
                    </Button>

                    <Button className="col-span-1 k-btn-tonal" title="Opción 2" onClick={()=>{setMode('scanner')}}>
                        {tr({id:'modal.qr.scan'})}
                    </Button>
            </div>
    </div>
}
