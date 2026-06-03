import { Dialog } from "konsta/react";
import { useModal } from "../../store/modal";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";

export function Modal(){
    const {title, content, opened, toggleModal} = useModal();
    const [params] = useSearchParams();
    const opn = params.get("emergent") === "modal";
    const navigate = useNavigate();
    useEffect(()=>{
        toggleModal(opn);
    },[opn])    

    return <Dialog
        className="k-panel-form"
        opened={opened}
        onBackdropClick={() => navigate(-1)}
        title={title}
        content={content}
      />
}