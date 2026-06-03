import { Link } from "konsta/react"
import { useIntl } from "react-intl"
interface IProps {
    className?:string
}
export const AyudaLink = ({className}:IProps) => {
    const {formatMessage:tr} = useIntl();
    return <div className={"text-center "+className}>
        {tr({id:'ayuda.text'})}&nbsp;
        <Link target="_blank" rel="noreferrer noopener" href="https://docs.google.com/forms/d/e/1FAIpQLSehHWwokHuu054vf7x9oOXQuHjOJ4VI7-GxwJqvIg5O6AahMg/viewform?usp=publish-editor" className="underline">{tr({id:'ayuda.link'})}</Link>
    </div>
}