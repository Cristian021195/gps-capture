export interface IPanel {
    opened?:boolean,
    side?:'left'|'right',
    floating?:boolean,
    title:string,
    children?:React.ReactElement
}

export interface IPanelStore extends IPanel {
    openPanel: (v:IPanel)=>void,
    closePanel: ()=>void,
    togglePanel:(v:boolean)=>void
}