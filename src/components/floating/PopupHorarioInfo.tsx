import { Block, List, ListItem } from "konsta/react";
import { useIntl } from "react-intl";
import { TooltipReferencia } from "../ui/TooltipReferencia";
import { TextHelper } from "../../classes/TextHelper";
import { AyudaLink } from "../ui/AyudaLink";

interface IProps {
    cb: ()=>void
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const PopupHorarioInfo = ({cb}:IProps) => {
    const {formatMessage:tr} = useIntl();
    return <Block className='*:text-base'>
                <List strong outline className="py-4">
                    <ul>
                    <ListItem title={tr({id:'popup.schedule.li.2'})}/>
                    <ListItem title={tr({id:'popup.schedule.li.4'})}/>
                    <ListItem title={tr({id:'popup.schedule.li.1'})}/>
                    <ListItem className="flex justify-center" children={
                        <table className="uppercase text-center w-full">
                            <thead className="sticky top-0 z-10 bottom-0.5 opacity-100">
                                <tr className="text-nowrap text-center mx-4 [&>th]:p-3">
                                    <th>{tr({id:'ciudad.1'})}</th>
                                    <th>{tr({id:'ciudad.2'})}</th>
                                </tr>
                            </thead>
                            <tbody className="relative text-lg">
                                <tr>
                                    <td>6:40 <TooltipReferencia descripcion={tr({id:'ref.1'})} acronimo={TextHelper.acronimo(tr({id:'ref.1'}))}/></td>
                                    <td>6:50</td>
                                </tr>
                                <tr>
                                    <td>7:20</td>
                                    <td>7:30 <TooltipReferencia open={true} descripcion={tr({id:'ref.2'})} acronimo={TextHelper.acronimo(tr({id:'ref.2'}))}/></td>
                                </tr>
                            </tbody>
                        </table>
                    }/>
                    <ListItem title={tr({id:'popup.schedule.li.5'})}/>
                    <ListItem title={tr({id:'schedule.li.9'})}/>
                    <ListItem title={tr({id:'schedule.li.10'})}/>
                    <ListItem title={tr({id:'popup.schedule.li.6'})}/>                    
                    </ul>
                </List>
                <AyudaLink/>
                <button className="hidden" onClick={cb}></button>
            </Block>
}