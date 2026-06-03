//import { Button } from "konsta/react"
import { DateTimeHorario } from "../../classes/DateTimeHorario"
import { useState } from "react"
import { PinAngleIcon } from "../svg/UtilsIcon";

interface IProps {
    id?:number,
    origen?:string,
    destino?:string,
    dias?:number,//pendiente
    salida?:number,
    llegada?:number,
    ciudades?:string[],
    precio?:number,
    empresa?:string,
    cb:()=>void
}

export const WidgetCard = ({origen,destino,salida,llegada,ciudades,precio,empresa, cb}:IProps) => {
    const [showDetail, setShowDetail] = useState(false);
    return <div className="p-2 border border-gray-300 rounded-xl capitalize grid grid-cols-12">
                <div className={`col-span-3 transition-all duration-300 text-base`} onClick={()=>{setShowDetail((prev)=>!prev)}}>
                    <div><b>{empresa}</b></div>
                    {
                        precio && precio > 0 && <div>${precio}</div>
                    }                    
                </div>
                <div className="col-span-8 text-center" onClick={()=>{setShowDetail((prev)=>!prev)}}>
                    <div className={`transition-all duration-300 text-base`}>
                        <span><b>{origen} → {destino}</b></span>
                    </div>
                    <div className={`transition-all duration-300 text-base`}>
                        {DateTimeHorario.numericoAHhmm(salida)} → {DateTimeHorario.numericoAHhmm(llegada)}
                    </div>
                </div>
                <div className="col-span-1 flex items-center">
                    <button onClick={
                        // posiblemente en un futuro usemos la opción de QR junto con esta ya que tenemos el key del horario
                        cb
                    }>
                        <PinAngleIcon width={20} height={20}/>
                    </button>
                </div>
                <div className={`col-span-12 transition-all duration-300 overflow-hidden ${showDetail ? "opacity-100 max-h-20 text-sm" : "opacity-0 max-h-0"}`}>
                    {ciudades?.join(' → ')}
                </div>
        </div>
}