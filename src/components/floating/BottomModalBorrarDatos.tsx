/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Button } from "konsta/react";
import { useIntl } from "react-intl";
import { useNotification } from "../../store/notification";
import { clearLocalData } from "../../utils/local-data";

interface IProps {
    cb: () => void
}

export const BottomModalBorrarDatos = ({cb}:IProps) => {
    const {formatMessage:tr} = useIntl();
    const {openNotification} = useNotification();

    const handleClick = async () => {
        const deleteArr = await clearLocalData();
        
        Promise.allSettled(deleteArr)
        .then(res=>{
            const resp = res.every(q => q.status === "fulfilled");
            resp ? openNotification({title:tr({id:'noti.title.cleardata'})})
            : openNotification({title:tr({id:''}),bottomText:'borrardatos.error'})
        }).finally(()=>{cb();})
    }

    return <div>
        <p className="mb-8">{tr({id:'borrardatos.info'})}</p>
        <Button className="k-btn-tonal" onClick={handleClick}>
            {tr({id:'modal.ok'})}
        </Button>
    </div>
}