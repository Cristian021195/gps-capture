import { Link } from "konsta/react"

interface IProps {
    className?:string
    title:string,
    value:string,
    onClick?: () => void
}

export const CustomMenuList = ({className, title, value,onClick}:IProps) => {
    return <Link className={className+" touch-ripple-current k-panel-form flex flex-col items-start rounded-xl px-3 py-1.5"} onClick={onClick}>
        <b className="k-title">{title}</b>
        <div className="k-text-title opacity-80">{value}</div>
    </Link>
}