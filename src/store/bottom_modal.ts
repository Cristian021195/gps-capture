import { create } from 'zustand'
import type { IBottomModal, IBottomModalStore } from '../interfaces/IBottomModal';

export const useBottomModal = create<IBottomModalStore>((set) => ({
    opened: false,
    title: '',
    children: null,
    openBottomModal: (bottomModal: Partial<IBottomModal>) => set({
        opened: true,
        title: bottomModal.title ?? '',
        children: bottomModal.children ?? null
    }),
    setBottomModal: (bottomModal: Partial<IBottomModal>) => set({
        title: bottomModal.title ?? '',
        children: bottomModal.children ?? null
    }),
    closeBottomModal: () => set({ opened: false }),
    toggleBottomModal: (v:boolean) => set({ opened: v })
}))