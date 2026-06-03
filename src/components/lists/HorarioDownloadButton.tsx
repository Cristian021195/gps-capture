import { Preloader } from "konsta/react"
import { useDBDatosEmpresaUrl } from "../../hooks/useDBDatosEmpresa"
import { useHorarioDownload } from "../../hooks/useHorarioDownload"
import { DownloadItemIcon } from "../svg/UtilsIcon"

interface IProps {
    horarioKey: string
    empresaId?: number
}

export function HorarioDownloadButton({ horarioKey, empresaId }: IProps) {
    const { empresa_url_query_result, datosEmpresa } = useDBDatosEmpresaUrl(horarioKey)
    const empresa_id = empresaId || datosEmpresa?.empresa_id || 0
    const { isFetching, handleDownload, canDownload } = useHorarioDownload(
        empresa_url_query_result,
        empresa_id
    )

    return (
        <button
            disabled={isFetching || !canDownload}
            onClick={handleDownload}
            className="text-[#4a7d73]"
        >
            {isFetching ? <Preloader className="w-3 h-3"/> : <DownloadItemIcon/>}
        </button>
    )
}
