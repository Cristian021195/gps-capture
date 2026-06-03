import { useIntl } from "react-intl";
import { useToast } from "../store/toast";

export function useClipboard() {
  const {formatMessage:tr} = useIntl();
  const {openToast} = useToast();

  const copiar = async (texto: string) => {
    try {
      await navigator.clipboard.writeText(texto);
      openToast({text:tr({id:'copy'})});
    } catch {
      openToast({text:tr({id:'copy.error'})});
    }
  };

  return { copiar };
}