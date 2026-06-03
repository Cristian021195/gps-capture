import { DialogButton } from "konsta/react"
import { useNavigate } from "react-router-dom";
import type { IWidget } from "../../interfaces/IWidget";
import { useWidgets } from "../../hooks/useWidgets";
import { useIntl } from 'react-intl';

interface IProps {
  cba:()=>void,
  cbb:()=>void,
  widget:IWidget
}

export const ModalGuardarHorario = ({cbb, widget}:IProps) => {
  const navigate = useNavigate();
  const {addWidget} = useWidgets();
  const {formatMessage:tr} = useIntl();
  return <div>
      <p>{tr({id:'widget.save.description'})}</p>
      <br />
      <p>{tr({id:'widget.save.extra'})}</p>
      <div className="mt-4 flex justify-end gap-8">
          <DialogButton className="k-title" onClick={()=>{cbb();navigate(-1)}}>
            {tr({id:'close'})}
          </DialogButton>
          <DialogButton className="k-btn" strong onClick={()=>{
            addWidget(widget);
            navigate(-1);
          }}>
            {tr({id:'save'})}
          </DialogButton>
      </div>
  </div>
}