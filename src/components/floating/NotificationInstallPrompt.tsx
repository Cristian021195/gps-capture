import { Button } from "konsta/react";
import { useIntl } from "react-intl";

interface IProps {
    accept:()=>void,
    decline:()=>void,
}
//title:tr({id:'install.title'}),
//subtitle:tr({id:'install.description'}),

export const NotificationInstallPrompt = ({accept, decline}:IProps) => {
    const {formatMessage:tr} = useIntl();
    return <div className="mt-2 flex gap-4">
                <div>
                    {tr({id:'install.description'})}
                </div>
                <div className="flex gap-4 right-0">
                    <Button className="k-btn-tonal" small smallIos onClick={decline}>
                        {tr({id:'close'})}
                    </Button>
                    <Button className="k-btn-tonal" small smallIos onClick={accept}>
                        {tr({id:'install.ok'})}
                    </Button>
                </div>
        </div>
}