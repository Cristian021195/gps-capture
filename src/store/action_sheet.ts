import { create } from 'zustand'
import type { IActionSheet, IActionSheetStore } from '../interfaces/IActionSheet'

export const useActionSheet = create<IActionSheetStore>((set) => ({
    opened: false,
    title: '',
    closeText: '',
    openSheet: (sheet: Partial<IActionSheet>) => set({
        opened: true,
        title:  sheet.title ?? '',
        closeText: sheet.closeText ?? ''
    }),
    closeSheet: () => set({ opened: false }),
    toggleActionSheet:(v:boolean)=>{
        set(() => ({
            opened: v
        }))
    }
}))