import { Chip, List, ListInput } from "konsta/react"
import { useDBCiudadesLike } from "../../hooks/useDBCiudades"
import { useState } from "react"
import { MenuDotsHorizontalIcon } from "../svg/AndroidIcon"
import { useIntl } from 'react-intl';
import { useNavigate } from "react-router-dom"
import { useAccesoDirectoFilter } from "../../hooks/useAccesoDirectoFilter"
import { SearchIcon } from "../svg/FormIcons";

interface IProps {
    opcion:number// representa origen (0) o destino (1)
}

export const BottomModalCiudades = ({opcion}:IProps) => {
    const [ciudad, setCiudad] = useState("");
    const {ciudades} = useDBCiudadesLike(ciudad);
    const {formatMessage:tr} = useIntl();
    const navigate = useNavigate();
    const {origen_id, destino_id, setOrigen, setDestino} = useAccesoDirectoFilter();

    const handleClick = (ciudad_id:number) => {
        if(opcion === 0){// origen
            setOrigen(ciudad_id);
        }else{//destino
            setDestino(ciudad_id);
        }
        navigate(-1);
    }

    return <div>
        <div className="m-0 max-h-34 overflow-y-scroll">
            <div className="flex flex-wrap justify-center gap-2 upper-container">
                {
                    ciudades?.length > 0 ?
                    (
                        <> {
                                ciudades?.map((c)=>{
                                    if(opcion === 0){
                                        if(c.id === destino_id){
                                            return <Chip 
                                                className="bg-gray-300 dark:bg-transparent line-through" key={c.id}>{c.ciudad}
                                            </Chip>
                                        }else{
                                            return <Chip 
                                                onClick={()=>{handleClick(c.id ?? 0)}}
                                                className="active:opacity-60" key={c.id}>{c.id === origen_id ? "✓ "+c.ciudad : c.ciudad}
                                            </Chip>
                                        }
                                    }else{
                                        if(c.id === origen_id){
                                            return <Chip 
                                                className="bg-gray-300 dark:bg-transparent line-through" key={c.id}>{c.ciudad}
                                            </Chip>
                                        }else{
                                            return <Chip 
                                                onClick={()=>{handleClick(c.id ?? 0)}}
                                                className="active:opacity-60" key={c.id}>{c.id === destino_id ? "✓ "+c.ciudad : c.ciudad}
                                            </Chip>
                                        }
                                    }
                                })
                            }
                            <div className="flex items-end">
                                <MenuDotsHorizontalIcon/>
                            </div>
                        </>
                    ) :
                    <p className="text-2xl">{tr({id:'no.result'})}</p>
                }                
            </div>
        </div>
        <List strongIos>
            <ListInput
                outline
                label="Ciudad"
                type="text"
                placeholder="Concepción"
                onChange={(e)=>{setCiudad(e.target.value)}}
                media={<SearchIcon/>}
            />
        </List>
    </div>
}

/* SE DESCOMENTA AUTOFOCUS PORQUE QUIZAS AURRINE LA UX CON LAS CIUDADES FRECUENTEMENTE INGRESADAS, ES MAS RAPIDO HACER CLICK
QUE TENER QUE CERRAR EL TECLADO A CADA RATO 

<ListInput
    key={opened ? 'open' : 'closed'}
    autoFocus={opened}
    outline
    label="Ciudad"
    type="text"
    placeholder="Concepción"
    onChange={(e)=>{setCiudad(e.target.value)}}
    media={<SearchIcon/>}
/>

*/