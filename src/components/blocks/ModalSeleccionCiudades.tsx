import { Button, DialogButton } from "konsta/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useWidgets } from "../../hooks/useWidgets";
import type { IWidget } from "../../interfaces/IWidget";
import { useIntl } from "react-intl";
import { useToast } from "../../store/toast";

interface IProps {
    ciudades?:string[],
    precios?:number[][],
    widget:IWidget,
    cba:()=>void,
    cbb:()=>void
}
export const ModalSeleccionCiudades = ({ciudades, precios, widget, cbb}:IProps) => {
    const [selected, setSelected] = useState<number[]>([]);
    const {openToast} = useToast();
    const navigate = useNavigate();
    const {addWidget} = useWidgets();
    const {formatMessage:tr} = useIntl();
    const toggle = (index: number) => {
        setSelected((prev) => {
            // si ya está seleccionado → quitar
            if (prev.includes(index)) {
                return prev.filter((i) => i !== index);
            }
            // si hay menos de 2 → agregar
            if (prev.length < 2) {
                return [...prev, index];
            }
            // si ya hay 2 → no hacer nada
            return prev;
        });
    };

    if(!ciudades){
        return <></>
    }
    return <div><p className="mb-4">{tr({id:'widget.two.cities'})}</p>
        <div className="flex flex-wrap gap-2">
        {
            ciudades?.map((label, i) => {
                const order = selected.indexOf(i); // -1 si no está seleccionado
                const isSelected = order !== -1;

            return <Button key={i} type="button" small onClick={() => toggle(i)} className='segmented-btn whitespace-nowrap w-fit k-btn-tonal'>
                {
                    isSelected && (
                        <b>✓</b>
                    )
                }
                &nbsp;
                {label}
            </Button>
        })}
        </div>
        <div className="mt-4 flex justify-end gap-8">
            <DialogButton className="k-title" onClick={()=>{
                setSelected([]);
                cbb();
                navigate(-1);
            }}>
              {tr({id:'close'})}
            </DialogButton>
            <DialogButton className="k-btn" strong disabled={selected.length < 2} onClick={()=>{
                const indice_origen = selected[0];
                const indice_destino = selected[1];
                let precio = 0;
                const ciudad_origen = widget.ciudades[indice_origen];
                const ciudad_destino = widget.ciudades[indice_destino];
                const salida = widget.salida_llegada[indice_origen];
                const llegada = widget.salida_llegada[indice_destino];

                if(precios && precios.length > 0){
                    precio = precios![indice_origen][indice_destino];
                }

                const _widget = structuredClone(widget);
                _widget.ciudades = [ciudad_origen, ciudad_destino];
                _widget.salida_llegada = [salida, llegada];
                _widget.precio = precio;

                if(salida > 0 && llegada > 0){
                    addWidget(_widget);
                    navigate(-1);
                }else{
                    openToast({text:tr({id:'widget.save.err'})})
                }
            }}>
              {tr({id:'save'})}
            </DialogButton>
        </div>
    </div>
}