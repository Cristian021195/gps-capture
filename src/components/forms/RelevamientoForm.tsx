import { Button, List, ListInput } from "konsta/react"
import { useIntl } from "react-intl"
import { EditIcon, SaveIcon } from "../svg/UtilsIcon";
import { useRelevamientoForm } from "../../hooks/useRelevamientoForm";
import type { IRelevamiento } from "../../interfaces/IEntidades";

interface IProps {
    relevamiento: IRelevamiento | null;
    setRelItem: React.Dispatch<React.SetStateAction<IRelevamiento | null>>;
}

export const RelevamientoForm = ({relevamiento, setRelItem}: IProps) => {
    const {formatMessage:tr} = useIntl();
    const { nombre, setNombre, save, loading, isEditing } = useRelevamientoForm(relevamiento?.id);
    return <div>
        <List strongIos insetIos>
            <ListInput outline label="Titulo relevamiento" floatingLabel type="text" placeholder="Titulo relevamiento" value={nombre}
                onChange={(e)=>{setNombre(e.target.value);}}
                media={
                    isEditing ? <EditIcon/> : <SaveIcon/>
                }
                clearButton={(nombre || relevamiento) ? true : false}
                onClear={()=>{
                    setNombre("");
                    setRelItem(null);
                }}
            />
            <Button type="button" className="w-fit mx-auto" disabled={loading || !nombre} onClick={save}>
                {tr({id:'save.edit'})}
            </Button>
        </List>        
    </div>
}