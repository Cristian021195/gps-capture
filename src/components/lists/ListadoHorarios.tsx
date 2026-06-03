import type { Horario } from "../../classes/Horario"
import { TextHelper } from "../../classes/TextHelper"
import { useIntl } from "react-intl"
import { InfoIcon } from "../svg/InfoIcon"
import { HorarioDownloadButton } from "./HorarioDownloadButton"

interface IProps {
    horarios: Horario[] | undefined
}

export function ListadoHorarios({ horarios }: IProps) {
    const { formatMessage: tr } = useIntl()

    if (!horarios) return <></>

    if (horarios.length === 0) {
        return <p className="text-center">{tr({ id: 'noresults' })}</p>
    }

    return (
        <div className="max-h-48 overflow-y-auto">
            {horarios.map((h) => {
                const { empresa, ruta, dias, sentido } = h.getDescripcion()
                const diasTr = tr({ id: dias })
                const sentidoTr = tr({ id: sentido })

                return (
                    <div key={h.key} className="flex justify-between items-center gap-2 py-2 border-b border-gray-200 dark:border-gray-700 last:border-b-0">
                        <div className="flex flex-col gap-0.5 min-w-0">
                            <div className="font-medium capitalize">
                                {TextHelper.capitalize(empresa)} · {ruta} · {diasTr} · {sentidoTr}
                            </div>
                            <div className="text-sm opacity-80">
                                <b>{tr({ id: 'vigencia' })}:</b> {h.getVigencia()}
                            </div>
                            {h.getUpdatedAt() && (
                                <div className="text-sm opacity-80">
                                    <b>{tr({ id: 'horario.update_at' })}:</b> {h.getUpdatedAt()}
                                </div>
                            )}
                        </div>
                        <div className="flex flex-col gap-2 items-center">
                            <HorarioDownloadButton horarioKey={h.key} empresaId={h.empresa_id} />
                            <div className="text-[#4a7d73]">
                                <InfoIcon/>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
