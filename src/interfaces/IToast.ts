export interface IToast {
    opened?:boolean,
    position?:'left' | 'right' | 'center'
    text?:string,
    className?:string
    //closeText?:string
}

export interface IToastStore extends IToast {
    openToast: (toast: Partial<IToast>) => void;
    closeToast: () => void;
}