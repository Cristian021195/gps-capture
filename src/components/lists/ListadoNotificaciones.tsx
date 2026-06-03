import { useFirestoreNotifications } from '../../hooks/useFirestoreNotifications';
import { Preloader } from 'konsta/react';
import { useIntl } from 'react-intl';
import { ItemNotificacion } from '../ui/ItemNotificacion';

export const ListadoNotifiaciones = () => {
    const {notificaciones, errorNotificaciones, loadingNotificaciones} = useFirestoreNotifications();
    const {formatMessage:tr} = useIntl();

    if (loadingNotificaciones){
        return <div className='text-center'>
            <Preloader/>
        </div>;
    }

    if(errorNotificaciones?.length > 10 || notificaciones.length === 0){
        return <div className="mt-8 flex flex-col items-center pop-up">
            <p className="text-4xl">{tr({id:'no.result'})}</p>
        </div>
    }

    return (
        <div className='space-y-4'>
            {
                notificaciones.map((notificacion, ni)=>{
                    return <ItemNotificacion key={ni} n={notificacion}/>
                })
            }
        </div>
    );
};