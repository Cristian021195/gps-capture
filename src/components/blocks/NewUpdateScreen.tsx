import { useIntl } from "react-intl";
import busLogo from "../../assets/bus-icon.svg";
import { Button, Page } from "konsta/react";

interface IProps {
    onUpdate: ()=> void
}

export const NewUpdateScreen = ({onUpdate}:IProps) => {
    const {formatMessage:tr} = useIntl();
    return <Page className="absolute h-dvh w-full z-50 flex items-center justify-center p-8">
        <div>
            <div className="flex justify-center p-3 mb-3 fade-down">
                <img src={busLogo} width={160} height={160} alt="Horabondi logo" className="animate-pulse"/>
            </div>
            <div>
                <h1 className="text-2xl">{tr({id:'app.new'})}</h1>
                <p>{tr({id:'app.new.desc'})}</p>
                <div className="mt-8 flex justify-center">
                    <Button className="k-btn w-fit" onClick={onUpdate}>{tr({id:'modal.ok'})}</Button>
                </div>
            </div>
        </div>
    </Page>
}