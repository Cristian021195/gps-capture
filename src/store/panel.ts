import { create } from 'zustand'
import type { IPanel, IPanelStore } from '../interfaces/IPanel'

export const usePanel = create<IPanelStore>((set) => ({
    opened:false,
    title:'',
    side:'left',
    floating:false,
    togglePanel:(v:boolean)=>{
        set(() => ({
            opened: v
        }))
    },
    openPanel: (v:IPanel)=>{
        set(() => ({
            opened: true,
            title:v.title,
            children:v.children,
            floating:v.floating
        }))
    },
    closePanel: () => {
        set(() => ({
            opened: false
        }))
    }
}))