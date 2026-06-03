import { Button, List, ListInput } from "konsta/react"
import { useIntl } from "react-intl"
// import { EditIcon, SaveIcon } from "../svg/UtilsIcon";
//import type { IRelevamiento } from "../../interfaces/IEntidades";
import { SearchIcon } from "../svg/FormIcons";
import { useModal } from "../../store/modal";
// import { useRutaForm } from "../../hooks/useRutaForm";

/*
interface IProps {
    relevamiento: IRelevamiento | null;
    setRelItem: React.Dispatch<React.SetStateAction<IRelevamiento | null>>;
}
*/

export const RutaForm = () => { // {relevamiento, setRelItem}: IProps
    const {formatMessage:tr} = useIntl();
    const { openModal } = useModal();
    return <div>
        <List strongIos insetIos>
                <ListInput outline label={tr({id:'find'})} floatingLabel type="text" placeholder={tr({id:'find.holder'})}
                    onChange={(e)=>{console.log(e.target.value);}}
                    media={
                        <SearchIcon width={20} height={20}/>
                    }
                    clearButton={false}
                    onClear={()=>{}}
                />                
            <Button type="button" className="w-fit mx-auto" disabled={false} onClick={()=>{
                openModal({title:'route.new', content:<a>p</a>});
            }}>
                {tr({id:'nuevo'})}
            </Button>
        </List>        
    </div>
}