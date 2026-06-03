import { useIntl } from "react-intl";
import busLogo from "../../assets/bus-icon.svg";
import { LineLeftToRight, OnboardingStepOne, Smartphone } from "../svg/OnboardingSteps";
import { LanguageIcon } from "../svg/UtilsIcon";
import { Link, List, ListInput } from "konsta/react";
import { useConfig } from "../../store/config";
import { useEffect } from "react";

interface IProps {
    className?:string,
    setSkip?:()=>void
}

export const StepOne = ({className, setSkip}:IProps) => {
    const {formatMessage:tr} = useIntl();
    const {lang, setLang} = useConfig();

    const handleSelect = (e:React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = e.target
        setLang(value);
    }

    useEffect(() => {
        setTimeout(() => {
            document.querySelectorAll('animateTransform')
            .forEach((el) => el.beginElement());
        }, 50);
    }, []);

    return <div className={" "+className}>
        <h1 className="k-title text-3xl">{tr({id:'intro.t1'})}</h1>
        <img src={busLogo} width={120} height={120} className="mx-auto hidden" alt="Horabondi logo" />
        <div className="flex justify-center items-center mx-8">
            <OnboardingStepOne/>
            <LineLeftToRight/>
            <Smartphone/>
        </div>
        <h2>{tr({id:'intro.d1'})}</h2>
        <Link className="kclink-u my-0" onClick={setSkip}>{tr({id:'skip'})}</Link>
        <List>
            <ListInput
                type="select"
                dropdown
                colors={{bgMaterial:'k-panel-form rounded-b-xl', outlineBorderMaterial:'border-none'}}
                value={lang}
                name="dias"
                onChange={handleSelect}
                media={<LanguageIcon />}>
                    <option value="es"> {tr({id:'language.s'})}</option>
                    <option value="en"> {tr({id:'language.en'})}</option>
                    <option value="pt"> {tr({id:'language.pt'})}</option>
            </ListInput>
        </List>
    </div>
}