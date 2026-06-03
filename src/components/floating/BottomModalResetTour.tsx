/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Button } from "konsta/react";
import { useIntl } from "react-intl";
import { useNotification } from "../../store/notification";

interface IProps {
    cb: () => void
}

export const BottomModalResetTour = ({cb}:IProps) => {
    const {formatMessage:tr} = useIntl();
    const {openNotification} = useNotification();

    const handleClick = async () => {
        openNotification({title:tr({id:'reset.tour.ok'})});
        localStorage.removeItem('onboarding');
        setTimeout(()=>{cb()},500)
    }

    return <div>
        <p className="mb-8">{tr({id:'reset.tour.info'})}</p>
        <Button className="k-btn-tonal" onClick={handleClick}>
            {tr({id:'modal.ok'})}
        </Button>
    </div>
}