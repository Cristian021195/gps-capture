import { useIntl } from "react-intl";
import { ClockAnimation, HorarioGrid, MoneyAnimation, OnboardingStepThree } from "../svg/OnboardingSteps"

interface IProps {
    className?:string
}

export const StepThree = ({className}:IProps) => {
    const {formatMessage:tr} = useIntl();

    return <div className={" "+className}>
        <h1 className="k-title text-3xl">{tr({id:'intro.t3'})}</h1>
        <div className="flex justify-center items-center mx-8 gap-4">
            <ClockAnimation/>
            <div className="flex-col">
                <OnboardingStepThree/>
                <HorarioGrid/>
            </div>            
            <MoneyAnimation/>            
        </div>
        <h2>{tr({id:'intro.d3'})}</h2>
    </div>
}