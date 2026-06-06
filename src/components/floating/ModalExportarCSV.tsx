import { DialogButton } from "konsta/react"
import { useNavigate } from "react-router-dom";
import { useIntl } from 'react-intl';

interface IProps {
  cba:()=>void,
  cbb:()=>void,
  desc: string
}

export const ModalExportarCSV = ({cba, cbb, desc}:IProps) => {
  const navigate = useNavigate();
  const {formatMessage:tr} = useIntl();

  return <div>
      <p>{desc}</p>      
      <div className="mt-4 flex flex-col gap-2">
        <DialogButton className="k-btn w-full" strong onClick={()=>{
            cba();
            navigate(-1);
          }}>
            {
              tr({id:'estandar'})
            }
          </DialogButton>
          <DialogButton className="k-btn w-full" strong onClick={()=>{
            cbb();
            navigate(-1);
          }}>
            {
              tr({id:'windows'})
            }
          </DialogButton>
          <DialogButton className="k-title w-full" onClick={()=>{              
              navigate(-1);
          }}>
            {
              tr({id:'close'})
            }
          </DialogButton>
      </div>
  </div>
}