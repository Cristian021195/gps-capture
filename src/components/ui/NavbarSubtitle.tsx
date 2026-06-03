interface IProps{
    text:string,
    className?:string
}
export const SubtitlePill = ({text='Default', className=''}:IProps) => {
    return <span className={"p-0.5 px-1 rounded font-bold "+className}>{text}</span>
}