import { Dialog } from "konsta/react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

interface IProps {
    title?:string,
    content?:string
}
export function ModalUpdate({title, content}:IProps){
    const [params] = useSearchParams();
    const [openState, openSetState] = useState(false);
    const opn = params.get("emergent") === "modalupdate";
    const navigate = useNavigate();
    useEffect(()=>{
        openSetState(opn);
    },[opn])    

    return <Dialog
        className="k-panel-form"
        opened={openState}
        onBackdropClick={() => navigate(-1)}
        title={title}
        content={content}
      />
}