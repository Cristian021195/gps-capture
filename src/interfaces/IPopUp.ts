export interface IPopUp {
    opened?:boolean,
    title:string,
    children?:React.ReactNode,
    cb?: (() => void) | null
}

export interface IPopUpStore extends IPopUp {
    openPopUp: (popup: Partial<IPopUp>) => void,
    closePopUp: () => void,
    togglePopUp: (v:boolean) => void,
    setPopUp: (v:Partial<IPopUp>) => void
}