import { SearchIcon } from "../svg/FormIcons"


export interface IProps {
    className?:string,
    placeholder?:string,
    value?:string,
    onInput?: (e: React.FormEvent<HTMLInputElement>) => void
}

export const CustomSearchInput = ({className, placeholder, value, onInput}:IProps) => {
    return <div className={className+" "+"flex items-center justify-between px-2 gap-4 py-4 border border-gray-300 rounded"}>
        <label htmlFor="buscador" className="k-title"><SearchIcon width={20} height={20}/></label>
        <input id="buscador" onInput={onInput} name="buscador" type="text" className="w-full border-none outline-none focus:outline-none focus:ring-0" placeholder={placeholder} value={value}/>
    </div>
}