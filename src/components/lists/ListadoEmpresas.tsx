import { Button } from "konsta/react"
import type { IEmpresa } from "../../interfaces/IEmpresa"
import { Link } from "react-router-dom"
import { StarOnIcon } from "../svg/UtilsIcon"
import { useFavoritos } from "../../hooks/useFavoritos"
import { useIntl } from "react-intl"
import { useToast } from "../../store/toast"

interface IProps {
    empresas: IEmpresa[]
}

export function ListadoEmpresas({ empresas }: IProps) {
    const { favoritos, agregarFavorito, eliminarFavorito } = useFavoritos();
    const {formatMessage:tr} = useIntl();
    const {openToast} = useToast();

    if (!empresas) return <></>

    const esFavorito = (id: number) => {
        return favoritos.some(f => f.empresa_id === id)
    }

    const handleToggleFavorito = (empresa: IEmpresa) => {

        const index = favoritos.findIndex(f => f.empresa_id === empresa.id)

        // ⭐ Si ya existe → eliminar
        if (index !== -1) {
            eliminarFavorito(index)
            return
        }

        // ➕ Si no existe → agregar
        const result = agregarFavorito({
            empresa_id: empresa.id!,
            empresa: empresa.nombre
        })

        // 🚫 Manejo de error (límite alcanzado)
        if (!result.success) {
            const message = tr({ id: result.error })

            // acá podés usar toast, alert, snackbar, etc.
            openToast({text:message});
        }
    }

    return empresas.map((e) => {

        const favorito = esFavorito(e.id!)

        return (
            <div key={e.id} className="flex justify-between">
                <div>
                    <Button title={e.nombre} clear className="capitalize text-nowrap text-left underline">
                        <Link to={`/empresa/${e.nombre}/info?c=3&p=3&id=${e.id}`}>
                            {e.nombre}
                        </Link>
                    </Button>
                </div>

                <div>
                    <Button
                        small
                        className="btn-sq-sm k-btn-tonal"
                        onClick={() => handleToggleFavorito(e)}
                    >
                        <StarOnIcon
                            className={favorito ? "text-yellow-400" : "dark:text-[#0e1416]"}
                        />
                    </Button>
                </div>
            </div>
        )
    })
}