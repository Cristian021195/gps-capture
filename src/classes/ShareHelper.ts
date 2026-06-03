import type { IShareSimple, IShareSimpleFile } from "../interfaces/IShare";

export class ShareHelper {

    constructor(){
    }

    static accesoDirectoSimple(tramo:string, dias:string, precio:string, servicios:string, viaje:string, cierre:string){// tramo = origen + destino
        const texto = [
            "↗️ "+tramo,
            "📅 "+dias,
            "💰 "+precio,
            "",
            "🚌 "+servicios,
            viaje,
            "",
            "🔗 "+cierre
        ].join("\n");
        console.log(texto);
        return texto;
    }
//🏠🏙️
    static accesoDirectoFull(tramo:string, dias:string, servicios:string, viaje:string, cierre:string){// tramo = origen + destino
        const texto = [
            "↗️ "+tramo,
            "📅 "+dias,
            "",
            "🚌 "+servicios,
            viaje,
            "",
            "🔗 "+cierre
        ].join("\n");
        console.log(texto);
        return texto;
    }

    static async shareSimple({title, text, url, cbErr}:IShareSimple) {
        try {
            if(url){
                await navigator.share({
                    title,
                    text,
                    url
                });
            }else{
                await navigator.share({
                    title,
                    text
                });
            }
        } catch (err) {
            const isAbort = err?.toString().includes('AbortError');
            if (!isAbort) {
                cbErr();
            }
        }
    }

    static async shareSimpleFile({title, text, files, url, cbErr}:IShareSimpleFile) {
        try {
            if(url){
                await navigator.share({
                    title,
                    text,
                    files,
                    url
                });
            }else{
                await navigator.share({
                    title,
                    text,
                    files
                });
            }
        } catch (err) {
            const isAbort = err?.toString().includes('AbortError');
            if (!isAbort) {
                cbErr();
            }
        }
    }
}

