import { Block, List, ListItem } from "konsta/react";
import { useIntl } from "react-intl";
import { AyudaLink } from "../ui/AyudaLink";

interface IProps {
    cb: ()=>void
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const PopupPrecioInfo = ({cb}:IProps) => {
    const {formatMessage:tr} = useIntl();
    return <Block className='*:text-base'>         
                <List strong outline className="py-4">
                    <ul>
                        <ListItem title={tr({id:'popup.price.description'})}/>
                        <ListItem title={tr({id:'popup.price.li.1'})}/>
                        <ListItem title={tr({id:'popup.price.li.2'})}/>
                        <ListItem title={tr({id:'popup.price.li.3'})}/>
                        <ListItem title={tr({id:'popup.price.li.4'})}/>
                    </ul>
                </List>
                <button className="hidden" onClick={cb}></button>
                <AyudaLink/>
            </Block>
}