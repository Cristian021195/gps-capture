import { Block, BlockTitle } from "konsta/react"
import { PageNavbarContainer } from "../components/layout/PageNavbarContainer"
import { useIntl } from "react-intl";
import { useConfig } from "../store/config";
import { AppleIcon, BoxArrowUp, PlusSquare } from "../components/svg/Iphone";
import { AddToHomeSreenIcon, AndroidIcon, MenuDotsIcon } from "../components/svg/AndroidIcon";
import src1 from '../assets/src1.webp';
import src2 from '../assets/src2.webp';
import src3 from '../assets/src3.webp';
import src4 from '../assets/src4.webp';
import src5 from '../assets/src5.webp';
import src6 from '../assets/src6.webp';

export const Instructivo = () => {
    const {formatMessage:tr} = useIntl();
    const {night_mode} = useConfig();
    return <PageNavbarContainer className="k-bg" bgClassName="k-bg" title={tr({id:'info.instructive'})} fallback_url="/" hash_eval="#share" left>
        <div className="fade-up mb-24 *:text-base">        
            <Block className={`${night_mode ? '' : 'text-black'}`}>
            <BlockTitle>
            <span className="flex items-center align-middle gap-1">{tr({id:'help.word'})} IOS<AppleIcon/></span>
            </BlockTitle>
            <Block>
            <p>{tr({id:'help.ios.1'})} <b>&gt;</b> {tr({id:'help.ios.2'})} <b>&gt;</b> {tr({id:'help.ios.3'})} <b>&gt;</b> {tr({id:'help.ios.4'})}</p>
            <br />
            <div className='flex flex-wrap gap-10'>
                <div>
                <p className="flex">{tr({id:'help.step.1'})} &nbsp;<span className='text-blue-400'><BoxArrowUp/></span></p>
                <img className="img-g-280 rounded-lg" src={src4} alt="Paso 1"/>
                </div>
                <div>
                <p className="flex">{tr({id:'help.step.2'})} &nbsp;<span className='text-blue-400'><PlusSquare/></span></p>
                <img className="img-g-280 rounded-lg" src={src5} alt="Paso 2"/>
                </div>
                <div>
                <p>{tr({id:'help.step.3'})} <b className='text-blue-400'> {tr({id:'help.ios.4'})} </b>, {tr({id:'help.rename'})}</p>
                <img className="img-g-280 rounded-lg" src={src6} alt="Paso 3"/>
                </div>
            </div>
            </Block>
            <hr />
            <BlockTitle>
            <span className="flex items-center align-middle gap-1">{tr({id:'help.word'})} Android <AndroidIcon/></span>
            </BlockTitle>
            <Block>
            <p>{tr({id:'help.android.1'})} <b>&gt;</b>
            {tr({id:'help.ios.2'})}<b>&gt;</b> 
            {tr({id:'help.ios.3'})}<b>&gt;</b> {tr({id:'help.android.4'})}</p>
            <br />
            <div className='flex flex-wrap gap-10'>
                <div>
                <p className="flex">{tr({id:'help.step.1'})} &nbsp;<span><MenuDotsIcon/></span></p>
                <img className="img-g-280 rounded-lg" src={src1} alt="Paso 1"/>
                </div>
                <div>
                <p className="flex">{tr({id:'help.step.2'})} &nbsp;<span><AddToHomeSreenIcon/></span></p>
                <img className="img-g-280 rounded-lg" src={src2} alt="Paso 2"/>
                </div>
                <div>
                <p>{tr({id:'help.step.3'})} <b className='text-blue-400'> {tr({id:'help.android.4'})} </b></p>
                <img className="img-g-280 rounded-lg" src={src3} alt="Paso 3"/>
                </div>
            </div>
            </Block>
            </Block>
        </div>   
    </PageNavbarContainer>
}