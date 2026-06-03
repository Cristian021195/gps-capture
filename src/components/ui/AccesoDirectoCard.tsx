//import { Button } from "konsta/react"
import { DateTimeHorario } from '../../classes/DateTimeHorario';
import { useState } from "react"
import { ShareIcon } from '../svg/ShareIcon';
import { GridIcon } from "../svg/UtilsIcon";
import { useIntl } from 'react-intl';

interface IProps {
    id?:string,
    origen?:string,
    destino?:string,
    dias?:number,//pendiente
    salida?:number,
    llegada?:number,
    ciudades?:string[],
    precio?:number,
    referencia?:string,
    color_empresa?:string,
    empresa?:string,
    compartir:()=>void,
    detalle:()=>void
}

export const AccesoDirectoCard = ({origen,destino,salida,llegada,ciudades,precio,referencia,empresa, color_empresa="#7DACA3", compartir, detalle}:IProps) => {
    const [showDetail, setShowDetail] = useState(false);
    const {formatMessage:tr} = useIntl();
    const tiempo_viaje = Math.abs(llegada! - salida!);

    return <div className={`p-2 border border-gray-300 rounded-xl capitalize grid grid-cols-12 border-l-6 rounded-l-xl`}
            style={{borderLeftColor:color_empresa}}>
                <div className="col-span-3 transition-all duration-300 text-base " onClick={()=>{setShowDetail((prev)=>!prev)}}>
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
                <div className="col-span-1 flex flex-col items-center justify-center gap-2.5">
                    <button className="text-[#4a7d73]" onClick={
                        // posiblemente en un futuro usemos la opción de QR junto con esta ya que tenemos el key del horario
                        compartir
                    }>
                        <ShareIcon/>
                    </button>
                    <button className="text-[#4a7d73]" onClick={
                        // posiblemente en un futuro usemos la opción de QR junto con esta ya que tenemos el key del horario
                        detalle
                    }>
                        <GridIcon/>
                    </button>
                </div>
                <div className={`col-span-12 transition-all duration-300 overflow-hidden ${showDetail ? "opacity-100 max-h-32 text-sm" : "opacity-0 max-h-0"}`}>
                    <div className='space-x-2 flex flex-col space-y-2 mt-2'>
                        <span className='normal-case'>{tr({id:'trav_time'})}: {DateTimeHorario.numericoAHhmm(tiempo_viaje)+(tiempo_viaje >= 60 ? ' h' : ' m' )}</span>
                        {
                            referencia !== "" && <>
                                <span className='normal-case'>{tr({id:'pasa'})}: {referencia}</span>
                            </>
                        }
                        <p><span className='normal-case'>{tr({id:'cities'})}: </span>{ciudades?.join(' → ')}</p>
                    </div>
                </div>
        </div>
}