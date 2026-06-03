export interface IShareSimpleFile {
    title:string,
    text:string,
    files:File[],
    url?:string,
    cbErr: ()=>void
}

export interface IShareSimple {
    title:string,
    text:string,
    url?:string,
    cbErr: ()=>void
}