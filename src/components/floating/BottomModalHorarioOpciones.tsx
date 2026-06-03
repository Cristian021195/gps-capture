import { Button, Preloader, Toggle } from 'konsta/react';
import { useIntl } from 'react-intl';
import { DownLoadIcon, TrashIcon } from '../svg/FormIcons';
import { useConfig } from '../../store/config';
import { useHorarioDownload } from '../../hooks/useHorarioDownload';
import { _style } from '../../utils/_styles';

interface IProps {
    resetFilters: ()=> void,
    empresa_id?:number,
    url?:string
}

export const BottomModalHorarioOpciones = ({resetFilters, empresa_id, url}:IProps) => {
    const {formatMessage:tr} = useIntl();
    const schedule_auto = useConfig(state => state.schedule_auto);
    const schedule_filters = useConfig(state => state.schedule_filters);
    const switchScheduleAuto = useConfig(state => state.switchScheduleAuto);
    const switchScheduleFilters = useConfig(state => state.switchScheduleFilters);
    const { isFetching, handleDownload, canDownload } = useHorarioDownload(url, empresa_id);

    return <div>
        <b>{tr({id:'modal.title'})}</b>
        <div className='space-y-2 mt-2'>
            <div className='grid grid-cols-2 gap-4'>
            <Button className='k-btn-tonal' onClick={resetFilters}>
                <TrashIcon/>&nbsp;{tr({id:'form.clear'})}        
            </Button>
            <Button className='k-btn-tonal' disabled={isFetching || !canDownload} onClick={handleDownload}>{
                isFetching ? <Preloader/>
                : <><DownLoadIcon/>&nbsp;{tr({id:'update'})}</>
                }
            </Button>
            </div>
            <div className='grid grid-cols-2 my-4 gap-4'>
                <div className='flex justify-between items-center'>
                    <span>{tr({id:'config.hauto'})}</span>                    
                    <Toggle
                        checked={schedule_auto}
                        onChange={() => {switchScheduleAuto()}}
                    />
                </div>
                <div className='flex justify-between items-center'>
                    <span>{tr({id:'config.filters'})}</span>
                    <Toggle
                        colors={_style.toggle_material}
                        checked={schedule_filters}
                        onChange={() => {switchScheduleFilters()}}
                    />
                </div>
            </div>
        </div>
    </div>
}