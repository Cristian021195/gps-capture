export interface INotificationStore extends INotification {    
    openNotification: (v:INotification)=>void,
    setNotification: (v:INotification)=>void,
    closeNotification: () => void
}

export interface INotification {
    timeout?:number|null,
    opened?:boolean,
    title?:string,
    subtitle?:string,
    rightText?:string,
    bottomText?:React.ReactNode,
    isCooldown?: boolean,
    icon?:React.ReactNode,
    children?:React.ReactNode,
    cb?:()=>void
}

export interface IPushNotificationParent {
    id:string,
    content:string,
    heading:string,
    img:string,
    included_segments:string[],
    oneSignalId:string,
    url:string
}

export interface IFirebaseCustomNotification extends IPushNotificationParent{
    createdAt:_Timestamp
}

export interface IPushNotificationContent extends IPushNotificationParent {
    createdAt:number
}

interface _Timestamp {
    seconds: number,
    nanoseconds: number
}