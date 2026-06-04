import { List, ListInput } from "konsta/react"
import { useIntl } from "react-intl"
// import { EditIcon, SaveIcon } from "../svg/UtilsIcon";
//import type { IRelevamiento } from "../../interfaces/IEntidades";
import { SearchIcon } from "../svg/FormIcons";
import { useBottomModal } from "../../store/bottom_modal";
import { useUpdateSearchParams } from "../../hooks/useUpdateSearchParams";
import { NuevaRutaForm } from "./RutaNuevaForm";
import { AddlIcon } from "../svg/UtilsIcon";
// import { useRutaForm } from "../../hooks/useRutaForm";

/*
interface IProps {
    relevamiento: IRelevamiento | null;
    setRelItem: React.Dispatch<React.SetStateAction<IRelevamiento | null>>;
}
*/

interface IProps {
    onSearch: (value: string) => void;
}

export const RutaForm = ({ onSearch }: IProps) => { // {relevamiento, setRelItem}: IProps
    const {formatMessage:tr} = useIntl();
    const { openBottomModal } = useBottomModal();
    const updateParams = useUpdateSearchParams();
    
    return <div className="flex items-center">
        <List strongIos insetIos className="py-0 my-0 w-full">
                <ListInput outline label={tr({id:'find'})} floatingLabel type="text" placeholder={tr({id:'find.holder'})}
                    onChange={(e)=>{
                        if(e.target.value.length >= 2){
                            onSearch(e.target.value);
                        }                         
                    }}
                    media={
                        <SearchIcon width={20} height={20}/>
                    }
                    clearButton={false}
                    onClear={()=>{}}
                />            
        </List>   
        <button type="button" className="w-fit mx-auto k-bg p-2 rounded-sm" disabled={false} onClick={()=>{
            openBottomModal({title:tr({id:'route.new'}), children:<NuevaRutaForm/>});
            updateParams({ emergent: "bottommodal"});
        }}>
            <AddlIcon width={24} height={24}/>
        </button>
    </div>
}