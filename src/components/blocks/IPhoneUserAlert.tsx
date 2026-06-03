import { Card, Link } from "konsta/react"
import { CloseIcon } from "../svg/UtilsIcon"
import { useNavigate } from "react-router-dom"
import { useState } from "react";
import { useIntl } from 'react-intl';

export const IPhoneUserAlert = () => {
    const navigate = useNavigate();
    //const iphone_advice = localStorage.getItem('iphone_advice');
    const iphone_advice = localStorage.getItem('iphone_advice') === '1';
    const [open, setOpen] = useState(iphone_advice);
    const {formatMessage:tr} = useIntl();

    if(open){
        return <Card outline >
            <div>
                <div className="flex justify-between items-start pb-2">
                    <h2 className="text-[22px]">{tr({id:'iphone.ad'})}</h2>
                    <button onClick={()=>{
                        localStorage.setItem('iphone_advice','0');
                        setOpen(false);
                    }}>
                        <CloseIcon/>
                    </button>
                </div>
                <p>
                    {tr({id:'iphone.ad.1'})} <Link className="underline" onClick={()=>{navigate('/instructivo')}}>{tr({id:'install.ad'})}</Link> {tr({id:'iphone.ad.2'})}
                </p>
            </div>
        </Card>
    }
}

// active:opacity-55 k-link text-md-light-primary inline-flex gap-1 justify-center items-center cursor-pointer select-none
// active:opacity-55 k-link text-md-light-primary dark:text-md-dark-primary inline-flex gap-1 justify-center items-center cursor-pointer select-none