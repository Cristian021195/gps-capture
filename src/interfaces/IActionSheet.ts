export interface IActionSheet {
    opened?:boolean,
    title?:string,
    closeText?:string
}

export interface IActionSheetStore extends IActionSheet {
    openSheet: (sheet: Partial<IActionSheet>) => void,
    closeSheet: () => void,
    toggleActionSheet: (v:boolean)=>void
}

