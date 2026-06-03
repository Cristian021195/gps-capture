import { Scanner } from "@yudiel/react-qr-scanner"
import { Button } from "konsta/react"
import { useIntl } from "react-intl"
import { useScanner } from "../../store/scanner";
import { useToast } from "../../store/toast";
//import { useQEmpresaManual } from "../../queries/useQEmpresa";
//import { useQHorarioQRUpdateManual } from "../../queries/useQHorario";
import { useEffect, useState } from "react";
import { db } from "../../db/db";
import { getEmpresas } from "../../api/empresas";
import { normalizarEmpresa } from "../../helpers/normalizado";
import { updateHorario } from "../../api/horario";
import { useNavigate } from "react-router-dom";
import { useBottomModal } from '../../store/bottom_modal';
import { QRScannerLoader } from "./QRScannerLoader";
import { DeviceScannerWarning } from "./DeviceScannerWarning";

export const CustomScanner = () => {
  const {formatMessage:tr} = useIntl();
  const {paused, togglePause, setPause} = useScanner();
  const {openToast} = useToast();
  const [qrData, setQrData] = useState<{empresa_id: number;nombre: string;url_empresa: string;url_horario: string;} | null>(null);
  const navigate = useNavigate();
  const {opened} = useBottomModal();
  const [loading, setLoading] = useState(false);
  const [deviceError, setDeviceError] = useState(false);

  // Hooks SIEMPRE arriba
  //const qEmpresa = useQEmpresaManual(qrData?.nombre);
  //const qHorarioQR = useQHorarioQRUpdateManual(qrData?.url_horario ?? "", qrData?.empresa_id ?? 1 );

  //const qEmpresa = useQEmpresaManual(nombre); // {isFetching, error, fetchIfNeeded}
  //const qHorarioQR = useQHorarioQRUpdateManual(url_horario+"",empresa_id);

  useEffect(()=>{
    setPause(false)
  },[])

  useEffect(() => {
    if (!qrData) return;

    const procesarQR = async () => {
      setLoading(true);
      try {
        const { empresa_id, nombre, url_horario } = qrData; // url_empresa ya esta en la request integrada

        console.log("1 - Buscando empresa: ");
        const empresa = await db.empresas.get(empresa_id);

        if (!empresa) {
          console.log("2 - No se encontró la empresa db local");

          // ⚠️ acá NO uses hooks, usá funciones/mutations
          const data = await getEmpresas(nombre as string);//fetchEmpresa(nombre);

          console.log("3 - Buscando la empresa por medio de request");

          const rawEmpresa = data.empresas.find((e) => e.id === empresa_id);

          if (!rawEmpresa) throw new Error("Empresa no encontrada");

          console.log("4 - Empresa encontrda, normalizamos la data de la empresa");
          const empresaNormalizada = await normalizarEmpresa(rawEmpresa);

          console.log("5 - Guardando los datos de empresa en IndexedDB");
          await db.empresas.put(empresaNormalizada);
        }else{
          console.log('Empresa encontrada, saltamos los pasos 2, 3, 4 y 5')
        }
        
        console.log("6 - Buscando el horario por medio de request");
        const horarioDB = await updateHorario(url_horario, empresa_id as number)
        if(horarioDB){
          console.log("7 - Guardamos el horario");
          if(opened){
            navigate(-1)
          }
          openToast({text:'importacion correcta'})
        }
      } catch (error) {
        console.log("ERROR: ", error);
        openToast({text:tr({id:'scan.err.net'})});
      }finally{
        setLoading(false);
      }
    };

    procesarQR();

  }, [qrData]);

  return <div>
    <div className={"w-full aspect-square "+(!loading && 'hidden')}>
      <QRScannerLoader />
    </div>
    {deviceError && <div className={"w-full aspect-square flex items-center justify-center"}>
      <DeviceScannerWarning/>
    </div>}    
    <div className={" "+((loading || deviceError) && 'hidden')}>
      <Scanner
        onScan={(result) => {
          const resultado = result[0]?.rawValue;
          if(resultado && resultado.length > 0){setPause(true)}
          try {
            JSON.parse(resultado);
          } catch (error) {
            console.log(error)
            const [empresa_id, nombre, url_empresa, url_horario] = resultado.split('|');

            if (empresa_id && nombre && url_empresa && url_horario) {
              setQrData({ 
                empresa_id:parseInt(empresa_id),
                nombre,
                url_empresa,
                url_horario 
              });
            } else {
              openToast({text:tr({id:'keys.urls.error'})});
              console.log({empresa_id, nombre, url_empresa, url_horario});
            }
          }
        }}

        onError={(error)=> {
          console.log(error);
          setDeviceError(true);
          setPause(true);
          openToast({text:tr({id:'scan.device.err'})});
        }}
        formats={['qr_code']}
        paused={paused}
        children={
          <div className="flex justify-between items-center mt-4 absolute w-full z-50 bottom-0 py-2 px-2">
            <p className={"k-panel-form rounded "+(paused ? "" : "px-2 py-1")}>{
                paused ? '' : tr({id:'tabbar.scanning'})}
            </p>
            <Button className="k-btn w-1/4" small onClick={()=>{togglePause()}}>
              {
                paused
                ? tr({id:'play'})
                : tr({id:'pausa'})
              }
            </Button>
          </div>
        }
      />
    </div>
  </div>
}//<div className="flex justify-between items-center mt-4 bg-red-300 absolute z-50 bottom-14">