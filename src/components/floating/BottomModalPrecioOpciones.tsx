import { Button, Preloader } from 'konsta/react';
import { useIntl } from 'react-intl';
import { DownLoadIcon, TrashIcon } from '../svg/FormIcons';
import { useToast } from '../../store/toast';
import { useQPrecioUpdateManual } from '../../queries/useQPrecio';
import { useEffect } from 'react';
import { Q_HORARIO_KEYS } from '../../queries/useQHorario';
import { queryClient } from '../../api/queryClient';

interface IProps {
    resetFilters: ()=> void,
    empresa_id?:number,
    url?:string
}

export const BottomModalPrecioOpciones = ({resetFilters, empresa_id, url}:IProps) => {
    const {formatMessage:tr} = useIntl();
    const {isFetching, error, fetchIfNeeded} = useQPrecioUpdateManual(url, empresa_id as number);
    const {openToast} = useToast();

    useEffect(() => {
        if (error) {
            // Disparo el toast
            openToast({ text: tr({ id: error.message }) });

            // @ts-expect-error cancelRefetch no está en los tipos oficiales, pero funciona en runtime
            queryClient.resetQueries([Q_HORARIO_KEYS.HORARIO_MANUAL, empresa_id], { exact: true, cancelRefetch: true });
        }
    }, [error]);

    return <div>
        <b>{tr({id:'modal.title'})}</b>
        <div className='my-2'>
            <div className='space-y-4'>
            <Button className='k-btn-tonal' onClick={resetFilters}>
                <TrashIcon/>&nbsp;{tr({id:'form.clear'})}        
            </Button>
            <Button className='k-btn-tonal' disabled={isFetching} onClick={()=>{
                fetchIfNeeded();
                if(!navigator.onLine){
                    openToast({text:tr({id:'err.conn'})});
                }
            }}>{
                isFetching ? <Preloader/>
                : <><DownLoadIcon/>&nbsp;{tr({id:'update.price'})}</>
                }
            </Button>
            </div>
        </div>
    </div>
}