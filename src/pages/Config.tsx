import { Button, List, ListItem, Toggle } from "konsta/react"
import { useConfig } from "../store/config"
import { PageNavbarContainer } from "../components/layout/PageNavbarContainer";
import { useIntl } from "react-intl";
import { useNavigate } from "react-router-dom";
import { useBottomModal } from "../store/bottom_modal";
import { BottomModalBorrarDatos } from "../components/floating/BottomModalBorrarDatos";
import { BottomModalResetTour } from "../components/floating/BottomModalResetTour";
import { useUpdateSearchParams } from "../hooks/useUpdateSearchParams";
import { getPlatform } from "../utils/navigator-data";
import { _style } from "../utils/_styles";
import { LocationConfigTrigger } from "../components/blocks/LocationConfigTrigger";

const plataforma = getPlatform();

export const Config = () => {
  const {
    night_mode, 
    switchNightMode,
    effects, 
    switchEffects
  } = useConfig();
  const {setBottomModal} = useBottomModal();
  const {formatMessage:tr} = useIntl();
  const navigate = useNavigate();
  const updateParams = useUpdateSearchParams();

  return (
    <PageNavbarContainer className="k-bg" bgClassName="k-bg" title={tr({id:'config'})} fallback_url="/" hash_eval="#share" left>
      <LocationConfigTrigger/>
      <List strong className="bg-transparent dark:bg-transparent">
        <ListItem
          label
          title={tr({id:'nmode'})}
          subtitle=""
          after={
            <Toggle
              component="div"
              className="-my-1"
              name="night_mode"
              colors={_style.toggle_material}
              checked={night_mode}
              onChange={() => switchNightMode()}
            />
          }
        />
        <ListItem
          className={""+ (plataforma === "ios" && "hidden")}
          label
          title={tr({id:'effects'})}
          after={
            <Toggle
              component="div"
              className="-my-1"
              name="effects"
              colors={_style.toggle_material}
              checked={effects}
              onChange={() => switchEffects()}
            />
          }
        />
        <ListItem
          label
          title={tr({id:'lang'})}
          className="config-step-2"
          after={
            <Button title="Ver" small className="w-fit k-btn-tonal" onClick={()=>navigate('/lang')}>{tr({id:'setup'})}</Button>
          }
          >
        </ListItem>
        <ListItem
          label
          title={tr({id:'appdata'})}
          after={
            <Button title="Borrar datos" small className="w-fit k-btn-tonal" onClick={()=>{
              updateParams({ emergent: "bottommodal" });
              setBottomModal({title:tr({id:'borrardatos'}),children:<BottomModalBorrarDatos cb={()=>{updateParams({ emergent: null }, { replace: true }); navigate('/')}}/>});
            }}>{tr({id:'cleardata'})}</Button>
          }
          >
        </ListItem>
        <ListItem
          label
          title={tr({id:'tour'})}
          after={
            <Button title="Reiniciar guia" small className="w-fit k-btn-tonal" onClick={()=>{              
              updateParams({ emergent: "bottommodal" });
              //navigate("?estado=step2", { replace: false });
              setBottomModal({title:tr({id:'reset.tour'}),children:<BottomModalResetTour cb={()=>{
                //closeBottomModal();navigate(-1)
                updateParams({ emergent: null }, { replace: true });
                navigate('/onboarding');
              }}/>});
            }}>{tr({id:'reset'})}</Button>
          }
          >
        </ListItem>
      </List>
    </PageNavbarContainer>
  )
}