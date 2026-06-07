import { BlockTitle } from "konsta/react"
import { useIntl } from "react-intl";

interface IProps {
    className?:string,
    setPrev:(v:boolean)=>void,
    setFinish:(v:boolean)=>void
}

export const StepFour = ({className}:IProps) => {
    const {formatMessage:tr} = useIntl();

    return <div className={" "+className}>
        <h1 className="k-title text-3xl mt-32">{tr({id:'intro.t4'})}</h1>
        <br />
        <div className="mx-4 space-y-4">
            <p>{tr({id:'step.four.desc'})}</p>
            <p>{tr({id:'step.four.desc2'})}</p>
        </div>
    </div>
}