import { useIntl } from "react-intl";
import busLogo from "../../assets/bus-icon.svg";

export const StepLoading = () => {
    const {formatMessage:tr} = useIntl();

    return <div className="fade-up">
        <div className="flex flex-wrap justify-center p-3 mb-3 space-y-4 mt-20">
            <img src={busLogo} width={180} height={180} alt="Horabondi logo" className="animate-pulse"/>
            <h1 className="k-title text-2xl">{tr({id:'intro.t1'})}</h1>
            <h2>{tr({id:'loading'})}</h2>
        </div>
    </div>
}