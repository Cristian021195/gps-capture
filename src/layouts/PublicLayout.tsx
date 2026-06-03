import { App, Button } from "konsta/react";
import { getPlatform } from "../utils/navigator-data";
import { useConfig } from "../store/config";
import { useEffect, useState } from "react";
import { Steps } from "../components/ui/Steps";
import { StepTwo } from "../components/onboarding/StepTwo";
import { StepThree } from "../components/onboarding/StepThree";
import { StepFour } from "../components/onboarding/StepFour";
import { useIntl } from "react-intl";
import { useNavigate } from "react-router-dom";
import { ToastAlert } from "../components/ui/ToastAlert";
import { StepOne } from "../components/onboarding/StepOne";

const plataforma = getPlatform();
const pasos = [{ label: "intro.m1" },{ label: "intro.m2" },{ label: "intro.m3" },{ label: "intro.m4" }];

export default function PublicLayout() {
  const {night_mode, effects} = useConfig();
  const onboarding = localStorage.getItem('onboarding');
  const enabled = !onboarding;
  const {formatMessage:tr} = useIntl();
  const [step, setStep] = useState(1);
  const [prevStep, setPrevStep] = useState(1);
  const [finish, setFinish] = useState(false);
  const [prev, setPrev] = useState(false);
  const navigate = useNavigate();

  useEffect(()=>{
    if(!enabled){
      navigate('/');
    }
  },[enabled])

  const handleStep = (step_value:number) => {
    if(step_value >= 1 && step_value <= pasos.length){
      setPrevStep(step);
      setStep(step_value);
    }
  }

  const direction = step > prevStep ? "fade-left" : "fade-right";
  const container = direction+" space-y-10 text-center min-h-96 flex flex-col justify-center";
  const container4 = direction+" text-center min-h-96 flex flex-col justify-center";

  return (
    <App theme={plataforma} dark={night_mode} materialTouchRipple={effects} iosHoverHighlight={effects}>
      <main className="h-dvh flex flex-col">
        <div className="flex-1 p-4 overflow-y-scroll overflow-x-hidden">
          <div>
            {step === 1 && <StepOne className={container} setSkip={()=>handleStep(4)}/>}
            {step === 2 && <StepTwo className={container}/>}
            {step === 3 && <StepThree className={container}/>}
            {step === 4 && <StepFour className={container4} setPrev={setPrev} setFinish={setFinish}/>}
          </div>
        </div>
       <div>
          <div className="flex justify-between gap-4 px-8 py-4">
            <Button disabled={prev} className="w-24 k-btn-tonal" small onClick={()=>{handleStep(step-1)}} >
              {tr({id:'prev'})}
            </Button>
            {
              step < pasos.length
              ? <Button className="w-24 k-btn-tonal" small onClick={()=>{handleStep(step+1)}} >
                  {tr({id:'next'})}
                </Button>
              : <Button disabled={finish} className="w-24 k-btn-tonal" small onClick={()=>{
                  localStorage.setItem('onboarding','1');
                  navigate('/', {replace:true});
                }}>
                  {tr({id:'finish'})}
                </Button>
            }
          </div>
          <Steps steps={pasos} currentStep={step}/>
        </div>
      </main>
      <ToastAlert/>
    </App>
  );
}