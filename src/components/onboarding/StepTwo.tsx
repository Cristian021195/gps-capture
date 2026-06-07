import { useIntl } from "react-intl";
import { Check, OnboardingStepTwo, Smartphone } from "../svg/OnboardingSteps";

interface IProps {
    className?:string
}

export const StepTwo = ({className}:IProps) => {
    const {formatMessage:tr} = useIntl();

    return <div className={" "+className}>
        <h1 className="k-title text-3xl">{tr({id:'intro.t2'})}</h1>
        <div className="flex justify-center items-center mx-8 gap-4">
            <OnboardingStepTwo/>
            <Check/>
            <Smartphone/>
        </div>
        <h2>{tr({id:'intro.d2'})} <br /> {tr({id:'intro.d2b'})}</h2>
    </div>
}