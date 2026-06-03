import { create } from 'zustand'
import type { IPageNavbarContainer, IPageNavbarContainerStore } from '../interfaces/INavbar'


export const useNavbar = create<IPageNavbarContainerStore>((set) => ({
    title:'',
    subtitle: undefined,
    right: undefined,
    left:true,
    hash_eval:'',
    fallback_url:'',
    nested:true,
    subnavbar: undefined,
    setTitle: (v:string) => {
        set(()=>({title:v}))
    },
    setSubtitle: (v:React.ReactNode) => {
        set(()=>({subtitle:v}))
    },
    setLeft: (v:boolean) => {
        set(()=>({left:v}))
    },
    setRight: (v:React.ReactNode) => {
        set(()=>({right:v}))
    },
    setHashEval: (v:string) => {
        set(()=>({hash_eval:v}))
    },
    setFallbackUrl: (v:string) => {
        set(()=>({fallback_url:v}))
    },
    setNested: (v:boolean) => {
        set(()=>({nested:v}))
    },
    setSubnavbar: (v:React.ReactNode) => {
        set(()=>({subnavbar:v}))
    },
    setAll:(v:IPageNavbarContainer)=>{
        set(()=>({
            title:v.title,
            subtitle:v.subtitle,
            left:v.left,
            right:v.right,
            hash_eval:v.hash_eval,
            fallback_url:v.fallback_url,
            nested:v.nested
        }))
    }
}))