/* eslint-disable @typescript-eslint/no-unused-expressions */
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { IConfig } from "../interfaces/IConfig";

// const $themeColor = document.getElementById('theme-color')!;
const $doc = document.documentElement!;
const $viewport = document.getElementById('viewport')!;

export const useConfig = create<IConfig>()(
persist(
    (set) => ({
        font_size: "md",
        night_mode: false,
        effects: true,
        sound: false,
        zoom: false,
        lang: "es",
        setFontSize: (v:string) => set({ font_size: v }),

        setLang: (v:string) => set({ lang: v }),

        switchNightMode: () =>
        set((state) => {
            const v = !state.night_mode;

            v
            ? $doc.classList.add("dark")
            : $doc.classList.remove("dark");

            return { night_mode: v };
        }),

        switchSound: () =>
        set((state) => ({ sound: !state.sound })),

        switchEffects: () =>
        set((state) => ({ effects: !state.effects })),
        
        switchZoom: () =>
        set((state) => {
            const v = !state.zoom;

            if (v) {
            $viewport.setAttribute(
                "content",
                "width=device-width, initial-scale=1.0"
            );
            } else {
            $viewport.setAttribute(
                "content",
                "width=device-width, initial-scale=1.0, user-scalable=no"
            );
            }

            return { zoom: v };
        })
    }),
    {
        name: "config",        
        onRehydrateStorage: () => (state) => {
            if (!state) return; // no hay estado guardado
            if (state.night_mode) {
                $doc.classList.add("dark");
            } else {
                $doc.classList.remove("dark");
            }
        }
    }
)
);