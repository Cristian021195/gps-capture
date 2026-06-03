export interface IModal extends IModalBase{
    opened?:boolean,
    content?:React.ReactElement,
    cbA?:()=>void,
    cbB?:()=>void
}

export interface IModalBase {
    title?:string,
    content?:React.ReactElement
}

export interface IModalStore extends IModal {
    openModal: (v:IModal)=>void,
    closeModal: ()=>void,
    toggleModal: (v:boolean) => void,
    setModal: (v:IModalBase)=>void
}

export interface IModalOptionsProps{
  cb?:()=>void,
  urls:string// urls separadas por |
}