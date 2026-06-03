import { create } from 'zustand'
import type { IModal, IModalBase, IModalStore } from '../interfaces/IModal';

export const useModal = create<IModalStore>((set) => ({
    opened:false,
    title:'',
    openModal: (v:IModal)=>{
        set(() => ({
            opened: true,
            title:v.title,
            content:v.content
        }))
    },
    closeModal: () => {
        set(() => ({
            opened: false
        }))
    },
    setModal: (v:IModalBase)=>{
        set(() => ({
            title:v.title,
            content:v.content
        }))
    },
    toggleModal: (v:boolean) => {
        set(() => ({
            opened: v
        }))
    }
}))