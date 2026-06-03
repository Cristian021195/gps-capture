export interface IPageNavbarContainer{
    title:string, 
    children?: React.ReactNode
    subtitle?: React.ReactNode,
    left?: boolean,
    right?: React.ReactNode,
    hash_eval?: string,
    fallback_url?: string,
    nested?: boolean,
    subnavbar?: React.ReactNode,
    className?:string,
    bgClassName?:string
}

export interface IPageNavbarContainerStore extends IPageNavbarContainer{
    setTitle: (v:string,) => void;
    /*setChildren: (v:React.ReactNode) => void;*/
    setSubtitle: (v:React.ReactNode) => void;
    setLeft: (v:boolean) => void;
    setRight: (v:React.ReactNode) => void;
    setHashEval: (v:string) => void;
    setFallbackUrl: (v:string) => void;
    setNested: (v:boolean) => void;
    setAll: (v:IPageNavbarContainer) => void;
    setSubnavbar: (v:React.ReactNode) => void;
}
