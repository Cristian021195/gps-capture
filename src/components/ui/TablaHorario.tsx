/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { DateTimeHorario } from "../../classes/DateTimeHorario"
import type { IHorarioResultado } from "../../interfaces/IHorario"
//import { useLongPress } from "../../hooks/useLongPress";
import { TooltipReferencia } from "./TooltipReferencia";
import { useUpdateSearchParams } from "../../hooks/useUpdateSearchParams";
import { useModal } from "../../store/modal";
import type { TReferenciaAlt } from "../../types/TReferencia";
import { ModalGuardarHorario } from "../floating/ModalGuardarHorario";
import type { IWidget } from "../../interfaces/IWidget";
import { ModalSeleccionCiudades } from "../blocks/ModalSeleccionCiudades";
import { useIntl } from "react-intl";
import { MatrizHelper } from "../../classes/MatrizHelper";

interface IProps {
    resultado_horario: IHorarioResultado | undefined,
    empresa?:string,
    cabecera?:string[],
    precio?:number|null,
    precios?:number[][],
    collapsed?:boolean
}

export const TablaHorario = ({resultado_horario, empresa, cabecera, precio, precios, collapsed}:IProps) => {
    //console.log({...resultado_horario, empresa, cabecera});
    //const [marked,setMarked] = useState<number>();// de long press, a futuro evaluaremos un uso
    const [tapTimeout, setTapTimeout] = useState<number | null>();
    const {setModal} = useModal();
    const  updateParams = useUpdateSearchParams();
    const {formatMessage:tr} = useIntl();
    /*
    const longp = (e:any) =>{
        const row_index = parseInt(e.parentElement.dataset.selected);
        if (row_index === marked) {
            setMarked(-1);
        } else {
            setMarked(row_index);
        }
    }
    const longPressEvents = useLongPress(longp, ()=>{}, 500);
    */

    const handleTap = (e:any) => {
        if (tapTimeout) {
            clearTimeout(tapTimeout);
            setTapTimeout(null);
            const row_index = parseInt(e.parentElement.dataset.selected);
            const indice_fila = resultado_horario?.indice_filas_originales[row_index];
            //console.log(resultado_horario?.indice_filas_originales)
            //console.log(indice_fila, row_index)
            const salida_llegada = resultado_horario?.cuerpo[row_index];
            let _ciudades:string[] = [];
            
            if(resultado_horario){
                if(resultado_horario.sentido == 1){
                    _ciudades = MatrizHelper.getElementosPorIndiceFila(indice_fila, resultado_horario.cuerpo_original, cabecera as string[], true, false);
                }else{
                    _ciudades = MatrizHelper.getElementosPorIndiceFila(indice_fila, resultado_horario.cuerpo_original, cabecera as string[], true, true);
                }                
            }

            const widget = {
                cabecera: _ciudades,
                ciudades: resultado_horario?.ciudades,
                empresa,
                precio,
                salida_llegada
            } as IWidget;

            //console.log({widget})

            if(resultado_horario?.ciudades.length === 2){                
                updateParams({ emergent: 'modal' });
                setModal({title:tr({id:'widget.save.title'}), content:<ModalGuardarHorario widget={widget} cba={()=>{}} cbb={()=>{}}/>});
            }else{
                updateParams({ emergent: 'modal' });
                setModal({
                    title:tr({id:'widget.save.title'}),
                    content:<ModalSeleccionCiudades 
                        precios={precios}
                        ciudades={resultado_horario?.ciudades} 
                        widget={widget}
                        cba={()=>{}} cbb={()=>{}}
                    />});
            }
        } else {
            setTapTimeout(
                setTimeout(() => {
                    setTapTimeout(null);
                }, 200)
            );
        }
    };
    
    if(!resultado_horario){
        return <div className="mt-8 flex flex-col items-center pop-up">
            <p className="text-4xl">{tr({id:'no.result'})}</p>
            <p>{tr({id:'validate.schedule'})}</p>
        </div>
    }
    if(resultado_horario.ciudades.length === 0 || resultado_horario.cuerpo.length === 0){
        return <div className="mt-8 flex flex-col items-center pop-up">
            <p className="text-4xl">{tr({id:'no.result'})}</p>
            <p>{tr({id:'validate.schedule'})}</p>
        </div>
    }else{//uppercase text-center w-full
        return <div className={"overflow-scroll rounded-xl border border-gray-300 transition-all duration-300 "+(collapsed ? "max-h-60" : "max-h-114")}>
            <table className="uppercase text-center w-full border-separate border-spacing-0">
                <thead className="sticky top-0 z-10 bottom-0.5 opacity-100">
                    <tr className="text-nowrap text-center mx-4 [&>th]:p-3 bg-gray-200 dark:bg-[#0a0f10]">{
                            resultado_horario.ciudades.map((ciudad, ci)=><th key={ci} className="">{ciudad}</th>)
                        }
                    </tr>
                </thead>
                <tbody className="table-body">
                    {
                        resultado_horario.cuerpo.map((fila,fi)=>
                        <tr key={fi} data-selected={fi} onClick={(e)=>{handleTap(e.target)}}>
                            {
                                fila.map((celda, ci)=> {
                                    const etiquetas = obtenerEtiquetas(fi, ci, resultado_horario.referencias);
                                        return (
                                            <td key={ci}>
                                            {DateTimeHorario.numericoAHhmm(celda)}
                                            {etiquetas.length > 0 && (
                                                <TooltipReferencia key={ci} acronimo={etiquetas[0].acronimo} descripcion={etiquetas[0].descripcion}/>
                                            )}
                                            </td>
                                        );
                                    }
                                )
                            }
                        </tr>)
                    }
                </tbody>
            </table>
        </div>
    }    
}

interface IEtiqueta {
    descripcion:string,
    acronimo:string
}

function obtenerEtiquetas(fila: number,  columna: number,  refs: TReferenciaAlt): IEtiqueta[] {

  const etiquetas: IEtiqueta[] = [];

  for (const item of refs) {
    const { nombre, posiciones } = item;

    if (posiciones.some(([f, c]) => f === fila && c === columna)) {
      const palabra = nombre.trim().replace(/\s+/g, ' ');
      const acronimo = palabra.split(" ").map(e => e[0]).join("");

      etiquetas.push({
        descripcion: nombre,
        acronimo
      });
    }
  }

  return etiquetas;
}