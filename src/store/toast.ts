import { create } from 'zustand'
import type { IToast, IToastStore } from '../interfaces/IToast'

let toastTimeout: ReturnType<typeof setTimeout> | null = null

export const useToast = create<IToastStore>((set) => ({
    opened: false,
    position: 'left',
    text: '',
    className: '',
    openToast: (toast: Partial<IToast>) => {
        // Cancelar timeout previo si existía
        if (toastTimeout) {
            clearTimeout(toastTimeout)
        }

        set({
            opened: true,
            position: toast.position ?? 'left',
            text: toast.text ?? '',
            className: toast.className ?? ''
        })

        // Cerrar automáticamente después de 3.5 segundos
        toastTimeout = setTimeout(() => {
            set({ opened: false })
            toastTimeout = null
        }, 3500)
    },
    closeToast: () => {
        // Cancelar timeout si el usuario cierra manualmente
        if (toastTimeout) {
            clearTimeout(toastTimeout)
            toastTimeout = null
        }
        set({ opened: false })
    }
}))

/*import { create } from 'zustand'
import type { IToast, IToastStore } from '../interfaces/IToast'

export const useToast = create<IToastStore>((set) => ({
    opened: false,
    position:'left',
    text: '',
    //closeText: '',
    openToast: (toast: Partial<IToast>) => set({
        opened: true,
        position: toast.position,
        text: toast.text ?? '',
        //closeText: toast.closeText ?? ''
    }),
    closeToast: () => set({ opened: false })
}))
*/