export interface IBottomModalOpen {
    title?:string,
    children?:React.ReactNode
}

export interface IBottomModal extends IBottomModalOpen{
    opened?:boolean
}

export interface IBottomModalStore extends IBottomModal {
    openBottomModal: (bottomModal: Partial<IBottomModalOpen>) => void,
    closeBottomModal: () => void,
    toggleBottomModal: (v:boolean) => void,
    setBottomModal: (bottomModal: Partial<IBottomModalOpen>) => void
}