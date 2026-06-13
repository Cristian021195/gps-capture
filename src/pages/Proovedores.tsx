import { MainDivTitle } from "../components/blocks/MainBlockTitle"
import { PageNavbarContainer } from "../components/layout/PageNavbarContainer";
import { useIntl } from "react-intl";
import { IPhoneUserAlert } from "../components/blocks/IPhoneUserAlert";
import { validateDisplayMode } from "../utils/navigator-data";
import { LocationConfigAdvice } from "../components/blocks/LocationConfigTrigger";
import { proveedores_default } from "../utils/proveedores";
import { Card } from "konsta/react";

if(localStorage.getItem('iphone_advice') === null){
    localStorage.setItem('iphone_advice', '1')
}

const standalone = validateDisplayMode('standalone');

export const Proveedores = () => {    
    const {formatMessage:tr} = useIntl();

    return <PageNavbarContainer className="k-bg" bgClassName="k-bg" title={tr({id:'proveedores'})} fallback_url="/" hash_eval="#share" left>
        { !standalone && <IPhoneUserAlert/> }
        <LocationConfigAdvice/>
        <MainDivTitle title={tr({id:'proveedores.default'})} className="space-y-2 m-4">
            <p>{tr({id:'proveedores.info'})}</p>
            <div className='flex flex-wrap gap-1 mt-2 *:font-bold text-gray-50'>
                <a target="_blank" href="mailto:cristiangramajo015@gmail.com" className="bg-rose-500 p-2 m-1 rounded-md">
                    cristiangramajo015@gmail.com
                </a>
            </div>
            <div>
                {
                    proveedores_default.map(((mp, mpi)=>{
                        return <Card 
                                    key={mpi} 
                                    header={
                                        <div>
                                            {mp.nombre}
                                            <span className="text-xs">(<i>{mp.service}</i>)</span>
                                        </div>
                                    }
                                >
                                <img src={mp.img} className="h-16 mx-auto pt-0 mb-2"/>
                            { tr({id:mp.descripcion})}
                        </Card>
                    }))
                }
            </div>
        </MainDivTitle>
    </PageNavbarContainer>
}