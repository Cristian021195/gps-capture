import { DialogButton } from "konsta/react"
import { useNavigate } from "react-router-dom";
import { useIntl } from 'react-intl';

interface IProps {
  cb:()=>void
}

export const ModalBorrarRelevamiento = ({cb}:IProps) => {
  const navigate = useNavigate();
  const {formatMessage:tr} = useIntl();

  return <div>
      <p>{tr({id:'rel.delete.desc'})}</p>      
      <div className="mt-4 flex justify-end gap-8">
          <DialogButton className="k-title" onClick={()=>{              
              navigate(-1);
          }}>
            {
              tr({id:'close'})
            }
          </DialogButton>
          <DialogButton className="k-btn" strong onClick={()=>{
            cb();
            navigate(-1);
          }}>
            {
              tr({id:'delete'})
            }
          </DialogButton>
      </div>
  </div>
}