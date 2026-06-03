import { DialogButton } from "konsta/react";
import { useConfig } from "../../store/config";
import { APP_VERSION, APP_VERSION_UPDATE_LIST } from "../../utils/version";
import { useIntl } from 'react-intl';

interface IProps {
    cb:()=>void
}
export const ModalNewUpdate = ({cb}:IProps) => {
    const {lang} = useConfig();
    const {formatMessage:tr} = useIntl();
    const updates = APP_VERSION_UPDATE_LIST[lang as keyof typeof APP_VERSION_UPDATE_LIST] === undefined ? APP_VERSION_UPDATE_LIST['es'] : APP_VERSION_UPDATE_LIST[lang as keyof typeof APP_VERSION_UPDATE_LIST];

    return <div>
        {
            APP_VERSION.isUpdate
            ? <h2 className="text-xl mb-2">{`${tr({id:'nueva.t'})} v${APP_VERSION.release.major}.${APP_VERSION.release.minor}.${APP_VERSION.release.patch}`}</h2>
            : <h2 className="text-xl mb-2">{tr({id:'aviso.t'})}</h2>
        }
        
        <ul className="list-disc list-inside">
            {
                updates.map((li:string, i:number)=>{
                    return <li key={i}>{li}</li>
                })
            }
        </ul>
        <div className="mt-4 flex justify-end">
          <DialogButton className="k-title" onClick={()=>{
                cb();
            }}>
            {tr({id:'modal.ok'})}
          </DialogButton>
      </div>
    </div>

}