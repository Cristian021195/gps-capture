import { useState } from "react"
import { Accordion } from "./Accordion"
import type { IPushNotificationContent } from "../../interfaces/INotification";
import { LinkIcon } from "../svg/UtilsIcon";
import broken_alt from "../../assets/broken-alt.svg";


interface IProps {
    n: IPushNotificationContent
}
export const ItemNotificacion = ({n}:IProps) => {
    const [opn, setOpn] = useState(false);
    const fecha = new Intl.DateTimeFormat(undefined, {dateStyle: 'long', timeStyle: 'short'}).format(new Date(n.createdAt*1000));
    return <div className="p-2 border border-[#709890] rounded-xl grid grid-cols-12 border-l-6 rounded-l-xl space-y-2">
        <div className="col-span-11">
            <div onClick={()=>setOpn(!opn)}><b>{n.heading}</b></div>
        </div>
        <div className="col-span-1 flex justify-end">
            <button title="Desplegar o cerrar" onClick={() => setOpn(!opn)}>
                <svg fill="currentColor" width="10" height="10">
                <rect y="4.5" width="10" height="1" rx="0.8"
                    className={`transform origin-center transition duration-200 ease-out ${
                    opn && "rotate-180!"
                    }`}
                />
                <rect y="4.5" width="10" height="1" rx="0.8"
                    className={`transform origin-center rotate-90 transition duration-200 ease-out ${
                    opn && "rotate-180!"
                    }`}
                />
                </svg>
            </button>
        </div>
        <Accordion opn={opn} css=" col-span-12">
            <div className="space-y-3 mt-2">
                <div>                
                    <p>{n.content}</p>
                </div>
                {
                    n.img &&
                    n.img.trim() !== "" && (
                        <div className="flex justify-center">
                            <img src={n.img} onError={(e) => {e.currentTarget.src = broken_alt;}} alt="image notification" className="w-fit"/>
                        </div>
                    )
                }
            </div>
        </Accordion>
        <div className="col-span-12 flex justify-between">
            <p>{fecha}</p>
            {
                n.url &&
                n.url.trim() !== "" &&
                n.url.includes('horabondi') === false && (
                    <a
                        href={n.url}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="text-blue-600 dark:text-blue-300"
                    >
                        <LinkIcon width={20} height={20}/>
                    </a>
                )
            }
        </div>
    </div>
}