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
        <h1 className="k-title text-3xl mt-8">{tr({id:'intro.t4'})}</h1>
        <BlockTitle>{tr({id:'select.company'})}</BlockTitle>
        <div className="mx-4 space-y-4">
            <p>{tr({id:'select.company.info'})}</p>
        </div>
    </div>
}