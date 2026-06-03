import { create } from 'zustand'
import type { INotification, INotificationStore } from '../interfaces/INotification';

let cooldown = false; // 🔴 variable fuera del store

export const useNotification = create<INotificationStore>((set, get) => ({
    timeout: 5000,
    opened: false,
    title: '',
    subtitle: '',
    rightText: '',
    bottomText: '',
    children: undefined,

    openNotification: (v: INotification) => {
        // 🚫 bloquea múltiples ejecuciones
        if (cooldown) return;

        // 🔒 activamos cooldown
        cooldown = true;

        // 🟢 abrimos notificación
        set(() => ({
            opened: true,
            title: v.title,
            subtitle: v.subtitle,
            rightText: v.rightText,
            bottomText: v.bottomText,
            icon: v.icon,
            children: v.children
        }));

        // ⏱ lógica de timeout
        const timeout =
            v.timeout === undefined
                ? get().timeout
                : v.timeout;

        if (timeout && timeout > 0) {
            setTimeout(() => {
                set(() => ({ opened: false }));

                // 🔓 liberamos cooldown después de cerrar
                cooldown = false;
            }, timeout);
        } else {
            // 👇 notificación persistente (timeout null o 0)

            // 🔓 liberamos cooldown inmediatamente
            cooldown = false;
        }
    },
    setNotification: (v:INotification)=>{
        set(() => ({
            opened: v.opened,
            isCooldown:true,
            title:v.title,
            subtitle:v.subtitle, 
            rightText:v.rightText,
            bottomText:v.bottomText,
            icon:v.icon,
            children:v.children
        }))
    },
    closeNotification: () => {
        set(() => ({ opened: false }));

        // 🔓 MUY IMPORTANTE: liberar cooldown manualmente
        cooldown = false;
    }
}));