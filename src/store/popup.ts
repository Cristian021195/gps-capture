import { create } from 'zustand'
import type { IPopUp, IPopUpStore } from '../interfaces/IPopUp';

export const usePopUp = create<IPopUpStore>((set) => ({
    opened: false,
    title: '',
    children: null,
    cb: undefined,
    openPopUp: (popup: Partial<IPopUp>) => set({
        opened: true,
        title: popup.title ?? 'Default Title',
        children: popup.children ?? null,
        cb: popup.cb
    }),
    closePopUp: () => set({ opened: false }),
    togglePopUp: (v:boolean) => set({ opened: v }),
    setPopUp: (popup: Partial<IPopUp>) => set({
        title: popup.title ?? 'Default Title',
        children: popup.children ?? null,
        cb: popup.cb
    })
}));