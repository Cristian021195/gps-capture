import { Block, BlockTitle, Button } from "konsta/react"
import { PageNavbarContainer } from "../components/layout/PageNavbarContainer"
import { AccordionSpan } from "../components/ui/AccordionSpan"
import { useConfig } from "../store/config";
import { useIntl } from "react-intl";
import busLogo from "../assets/bus-icon.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { useLayoutEffect, useRef, useState } from "react";
import { APP_VERSION, APP_VERSION_UPDATE_LIST } from "../utils/version";
import { useClipboard } from "../hooks/useClipboard";

export const Info = () => {
    const {formatMessage:tr} = useIntl();
    const {night_mode, lang} = useConfig();
    const updates = APP_VERSION_UPDATE_LIST[lang as keyof typeof APP_VERSION_UPDATE_LIST] === undefined ? APP_VERSION_UPDATE_LIST['es'] : APP_VERSION_UPDATE_LIST[lang as keyof typeof APP_VERSION_UPDATE_LIST];
    const fecha = new Intl.DateTimeFormat(undefined, {dateStyle: 'long'}).format(APP_VERSION.release_date);
    const navigate = useNavigate();
    const [shareError, setShareError] = useState(false);
    const share = useRef<HTMLDivElement | null>(null);
    const { hash } = useLocation();
    const {copiar} = useClipboard();
    useLayoutEffect(() => {
      if (hash === '#share' && share.current) {
        share.current?.scrollIntoView({ behavior: 'smooth' });
      }
    }, [hash]);

    return <PageNavbarContainer className="k-bg" bgClassName="k-bg" title={tr({id:'info'})} fallback_url="/" hash_eval="#share_old" left>
        <Block className={`space-y-4 ${night_mode ? '' : 'text-black'}`}>
          <div className="*:text-base">
            <div className="flex justify-center p-3 mb-3">
              <img src={busLogo} width={120} height={120} alt="Horabondi logo" />
            </div>
            <BlockTitle>{tr({id:'info.description.title'})}</BlockTitle>
            <Block>
              <p>
              {tr({id:'info.description'})}
              </p>
            </Block>
            <Block>
              <AccordionSpan title={`${tr({id:'info.updates'})} : v${APP_VERSION.release.major}.${APP_VERSION.release.minor}.${APP_VERSION.release.patch}`} 
              children={
                <div>
                  <p>{fecha}</p>
                  <ul className="list-disc list-inside mt-2">
                    {
                      updates.map(((ui, uii)=><li key={uii}>{ui}</li>))
                    }
                  </ul>
                </div>
              }/>
            </Block>
            <BlockTitle>{tr({id:'info.suggestion.title'})}</BlockTitle>
            <Block>
              <p>
                {tr({id:'info.suggestion'})}
              </p>
              <br />
              <div className="flex gap-3">
                <Button className="k-btn-tonal" small onClick={()=>{navigate('/instructivo')}}>{tr({id:'info.instructive'})}</Button>
                <Button className="k-btn-tonal" small>
                  <a href="./info">{tr({id:'info.reload'})}</a>
                </Button>
              </div>              
            </Block>
            <BlockTitle>{tr({id:'links'})}</BlockTitle>
            <Block>
              <p>{tr({id:'info.links.description'})}:</p>
              <div className='flex flex-wrap gap-1 mt-2 *:font-bold text-gray-50'>
                <a target="_blank" href="mailto:cristiangramajo015@gmail.com" className="bg-rose-500 p-2 m-1 rounded-md">
                  cristiangramajo015@gmail.com
                </a>
                <a target="_blank" href="https://cristian021195.github.io/portfolio" className="bg-blue-300 p-2 m-1 rounded-md">
                  Portfolio
                </a>
                <a target="_blank" href="https://www.facebook.com/cristianismael.gramajo" className="bg-blue-400 p-2 m-1 rounded-md">
                  Facebook
                </a>
                <a target="_blank" href="https://www.instagram.com/cristiangramajo015" className="bg-pink-300 p-2 m-1 rounded-md">
                  Instagram
                </a>
                <a target="_blank" href="https://www.linkedin.com/in/cristian021195" className="bg-blue-500 p-2 m-1 rounded-md">
                  LinkedIn
                </a>
              </div>
            </Block>
            <BlockTitle>{tr({id:'info.support.title'})}</BlockTitle>
            <Block>
              <p>{tr({id:'info.support.description'})}:</p>
              <div className='flex flex-wrap gap-1 mt-2 *:font-bold text-gray-50'>
                <a href="https://cafecito.app/cristian021195" className="bg-indigo-300 p-2 m-1 rounded-md">
                  Cafecito (Argentina)
                </a>
                <button onClick={()=>{
                  copiar('cristiangramajo015@gmail.com')
                  }} className="bg-blue-500 p-2 m-1 rounded-md">PayPal
                </button>
                <button onClick={()=>{
                  copiar('0x167CE5761af432CB616084a4623873FADa340Ae7')
                }} className="bg-teal-600 p-2 m-1 rounded-md">USDT (BNB Chain)
                </button>
              </div>
            </Block>
            <BlockTitle>{tr({id:'info.share.title'})}</BlockTitle>            
            <Block>
              <div>{tr({id:'link'})}: <p className="kclink kclink-p underline" onClick={()=>{copiar(location.origin)}}>{location.hostname}</p></div>
                <div className='p-1 text-center'>
                  <Button className="k-btn uppercase" title={tr({id:'info.share'})} disabled={shareError}
                    onClick={async ()=>{
                      try {                      
                        await navigator.share({
                          title: "GPS Capture",
                          text: tr({id:'app.about'}),
                          url: location.origin+"",
                        });

                      } catch (err) {
                        const isAbort = err?.toString().includes('AbortError');
                        if (!isAbort) {
                          setShareError(true);
                          setTimeout(() => {
                            setShareError(false);
                          }, 2500);
                        }
                      }
                    }}
                  >{tr({id:'info.share'})}</Button>
                </div>                
                {shareError && <span className='p-1 text-rose-600'>{tr({id:'info.share.error'})}</span>}
            </Block>
          </div>
        </Block>
        <div id="share" className="h-1 invisible" ref={share}></div>
    </PageNavbarContainer>
}