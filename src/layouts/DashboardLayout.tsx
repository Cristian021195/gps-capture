import { Outlet, useNavigate } from "react-router-dom";
import { BottomNavbar } from "../components/layout/BottomNavbar";
import { App, Dialog } from "konsta/react";
import { PanelInfo } from "../components/ui/PanelInfo";
import { ActionSheet } from "../components/ui/ActionSheet";
import { PopUpBox } from "../components/ui/PopUpBox";
import { Modal } from "../components/ui/Modal";
import { BottomModal } from "../components/ui/BottomModal";
import { getPlatform } from "../utils/navigator-data";
import { useConfig } from "../store/config";
import { useEffect, useState } from "react";
import { ModalUpdate } from "../components/ui/ModalUpdate";
import { ModalNewUpdate } from "../components/floating/ModalNewUpdate";
import { Notificacion } from "../components/ui/Notificacion";
import { ToastAlert } from "../components/ui/ToastAlert";
import { useIntl } from "react-intl";
import { usePWAInstall } from "../hooks/usePWAInstall";
import { useNotification } from "../store/notification";
import { NotificationInstallPrompt } from "../components/floating/NotificationInstallPrompt";
//import { NewUpdateScreen } from "../components/blocks/NewUpdateScreen";

const LS_UN = 'update_notified'; 
const plataforma = getPlatform();

export default function DashboardLayout() {
  const {night_mode, effects} = useConfig();
  const onboarding = localStorage.getItem('onboarding');
  const enabled = !onboarding;
  const update_notified = (localStorage.getItem(LS_UN) === '1' || localStorage.getItem(LS_UN) === null);
  const modal_notified = !update_notified;
  const navigate = useNavigate();
  const [opn, setOpn] = useState(modal_notified);
  const { formatMessage: tr } = useIntl();
  const { bip, promptInstall, clearInstallPrompt } = usePWAInstall();// updateAvailable
  const {openNotification, closeNotification} = useNotification();

  useEffect(() => {
    if (bip) {
      openNotification({
        title: tr({ id: 'install.title' }),
        timeout: null,
        bottomText: (
          <NotificationInstallPrompt
            accept={async () => {
              await promptInstall();
              clearInstallPrompt();
            }}
            decline={() => closeNotification()}
          />
        ),
      });
    }
  }, [bip]);

  useEffect(()=>{
      if(enabled){
        navigate('/onboarding');
      }
  },[enabled]);

  //{updateAvailable && <NewUpdateScreen/>}
  return (
    <App theme={plataforma} dark={night_mode} materialTouchRipple={effects} iosHoverHighlight={effects}>
      <Dialog opened={opn} onBackdropClick={()=>{
          setOpn(false);localStorage.setItem(LS_UN,'1')
        }} 
        content={
          <ModalNewUpdate cb={()=>{setOpn(false); localStorage.setItem(LS_UN,'1')}}/>
      }>        
      </Dialog>
      <ModalUpdate/>
      <PanelInfo/>
      <Outlet/>
      <BottomNavbar/>
      <ActionSheet/>
      <PopUpBox/>
      <Modal/>
      <BottomModal/>
      <Notificacion/>
      <ToastAlert/>
    </App>
  );
}