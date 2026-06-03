import { Block, BlockTitle } from "konsta/react"
import { PageNavbarContainer } from "../components/layout/PageNavbarContainer"
import { useIntl } from "react-intl";
import { useConfig } from "../store/config";
import privacy from "../assets/privacy.svg";

export const Privacy = () => {
    const {formatMessage:tr} = useIntl();
    const {night_mode} = useConfig();
    return <PageNavbarContainer className="k-bg" bgClassName="k-bg" title={tr({id:'privacy'})} fallback_url="/" hash_eval="#share" left>
        <Block className={`space-y-4 ${night_mode ? '' : 'text-black'}`}>
            <div className="*:text-base">
                <div className="flex justify-center p-3 mb-3">
                    <img src={privacy} width={160} height={160} alt="Privacy icon" />
                </div>

                <BlockTitle>{tr({id:'priv.p1.t1'})}</BlockTitle>
                <Block>
                    <b className="text-gray-400"><small>{tr({id:'priv.p1.st1'})}</small></b>
                    <p>{tr({id:'priv.p1.1'})}</p><br />

                    <b className="text-gray-400"><small>{tr({id:'priv.p1.st2'})}</small></b>
                    <p>{tr({id:'priv.p1.2'})}</p><br />

                    <b className="text-gray-400"><small>{tr({id:'priv.p1.st3'})}</small></b>
                    <p>{tr({id:'priv.p1.3'})}</p><br />                    
                </Block>
                
                <BlockTitle>{tr({id:'priv.p2.t2'})}</BlockTitle>
                <Block>
                    <p>{tr({id:'priv.p2.1'})}</p>                    
                    <p>{tr({id:'priv.p2.2'})} <a href="https://policies.google.com/privacy" className="text-blue-400 underline" target="_blank">{tr({id:'priv.p2.3'})}</a></p>
                    
                </Block>
                
                <BlockTitle>{tr({id:'priv.p3.t3'})}</BlockTitle>
                <Block>
                    <p>{tr({id:'priv.p3.1'})}</p>                    
                </Block>
                
                <BlockTitle>{tr({id:'priv.p4.t4'})}</BlockTitle>
                <Block>
                    <p>{tr({id:'priv.p4.1'})}</p>                    
                </Block>
                
                <BlockTitle>{tr({id:'priv.p5.t5'})}</BlockTitle>
                <Block>
                    <p>{tr({id:'priv.p5.1'})}</p>                    
                </Block>
                
                <BlockTitle>{tr({id:'priv.p6.t6'})}</BlockTitle>
                <Block>
                    <p>{tr({id:'priv.p6.1'})}</p>                    
                </Block>
                
                <BlockTitle>{tr({id:'priv.p7.t7'})}</BlockTitle>
                <Block>
                    <p>{tr({id:'priv.p7.1'})}</p>                    
                </Block>

                <BlockTitle>{tr({id:'priv.p8.t8'})}</BlockTitle>
                <Block>
                    <p>{tr({id:'priv.p8.1'})}</p>
                </Block>
            </div>
        </Block>
    </PageNavbarContainer>
}