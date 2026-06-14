import { Button, List, ListInput, Preloader } from "konsta/react"
import { RouteIcon } from "../svg/FormIcons";
import { BoxSeamIcon, PencilIcon } from "../svg/UtilsIcon";
import { useIntl } from "react-intl";
import { useCoordenadasForm } from "../../hooks/useCoordenadasForm";
import { MainDivTitle } from "../blocks/MainBlockTitle";
import { CoordenadaInsertedCard } from "../ui/CoordenadaInsertedCard";
import { useModal } from "../../store/modal";
import { ModalExportarCSV } from "../floating/ModalExportarCSV";
import { exportCSVRegistroGPS } from "../../utils/export";
import type { IExportRegistroGPS } from "../../interfaces/IExportEntidades";
import { useUpdateSearchParams } from "../../hooks/useUpdateSearchParams";
import { ModalBorrarBase } from "../floating/ModalBorrarBase";
import { usePopUp } from "../../store/popup";
import { PopupEditCoordenada } from "../floating/PopupEditCoordenada";
import type { IRegistroGPS } from "../../interfaces/IEntidades";
import { PopupVerCoordenadas } from "../floating/PopupVerCoordenadas";

export const CoordenadasForm = () => {
    const { loading, rutas, proveedores, rutaId, proveedorId, coordenadas, descripcion, setRutaId, setProveedorId, setDescripcion, obtenerCoordenadas, eliminarCoordenada } = useCoordenadasForm();
    const { formatMessage: tr } = useIntl();
    const { openModal } = useModal();
    const { openPopUp } = usePopUp();
    const updateParams = useUpdateSearchParams();

    const exportCSV = () => {
        openModal({
            title: tr({ id: 'csv.export' }),
            content: <ModalExportarCSV
                desc={tr({ id: 'csv.export.desc' })}
                cba={() => { exportCSVRegistroGPS(coordenadas as IExportRegistroGPS[], 'linux') }}
                cbb={() => { exportCSVRegistroGPS(coordenadas as IExportRegistroGPS[], 'ms') }}
            />
        });
        updateParams({ emergent: "modal" });
    }

    const delCoordenada = (id: number) => {
        openModal({
            title: tr({ id: 'cord.delete.title' }),
            content: <ModalBorrarBase
                desc={tr({ id: 'cord.delete.desc' })}
                cb={() => { eliminarCoordenada(id); }}
            />
        });
        updateParams({ emergent: "modal" });
    }

    const editCoordenada = (coordenada: IRegistroGPS) => {
        openPopUp({
            title: coordenada.descripcion,
            children: <PopupEditCoordenada
                key={coordenada.id}
                cb={() => { }}
                data={coordenada}
                descripcion={coordenada.descripcion}
                formatted_address={coordenada.formatted_address}
                latitud={coordenada.latitud}
                longitud={coordenada.longitud}
            >
                <></>
            </PopupEditCoordenada>
        });
        updateParams({ emergent: "popupbox" });
    }

    const verCoordenadas = () => {
        openPopUp({
            title: tr({ id: 'coordenadas' }),
            children: <PopupVerCoordenadas
                cb={() => { }}
                coordenadas={coordenadas as IRegistroGPS[]}
            >
                <></>
            </PopupVerCoordenadas>
        });
        updateParams({ emergent: "popupbox" });
    }

    return (
        <div>
            <List strongIos insetIos className="py-0 my-0 w-full">
                <ListInput
                    type="select"
                    dropdown
                    colors={{ bgMaterial: 'k-panel-form rounded-b-xl', outlineBorderMaterial: 'border-none' }}
                    value={rutaId ?? ""}
                    name="ruta"
                    onChange={(e) => {
                        setRutaId(Number(e.target.value));
                    }}
                    media={<RouteIcon />}>{
                        <>
                            <option value="">{tr({ id: 'select.ruta' })}</option>
                            {
                                rutas?.map(r => <option key={r.id} value={r.id}> {r.nombre}</option>)
                            }
                        </>
                    }
                </ListInput>
                <ListInput
                    type="select"
                    dropdown
                    colors={{ bgMaterial: 'k-panel-form rounded-b-xl', outlineBorderMaterial: 'border-none' }}
                    value={proveedorId ?? ""}
                    name="proveedor"
                    onChange={(e) => {
                        setProveedorId(Number(e.target.value));
                    }}
                    media={<BoxSeamIcon />}>{
                        <>
                            <option value="">{tr({ id: 'select.provider' })}</option>
                            {
                                proveedores?.map(r => <option key={r.id} value={r.id}> {r.nombre}</option>)
                            }
                        </>
                    }
                </ListInput>
                <ListInput
                    outline
                    label={tr({ id: 'desc' })}
                    floatingLabel
                    type="text"
                    placeholder={tr({ id: 'desc.ej' })}
                    value={descripcion}
                    onChange={(e) => {
                        setDescripcion(e.target.value);
                    }}
                    media={
                        <PencilIcon />
                    }
                    clearButton={true}
                    onClear={() => { setDescripcion('') }}
                />
            </List>
            <div className="flex justify-between items-center content-center mx-4 gap-2">
                <Button className="w-fit" disabled={coordenadas.length === 0} onClick={exportCSV}>{tr({ id: 'export' })}</Button>
                <Button className="w-fit" disabled={coordenadas.length === 0} onClick={verCoordenadas}>{tr({ id: 'view.all' })}</Button>
                <Button className="w-fit" onClick={obtenerCoordenadas} disabled={!rutaId || !proveedorId || descripcion.length < 3}>
                    {
                        loading
                            ? <Preloader className="text-white w-24" />
                            : tr({ id: 'gps.get' })
                    }
                </Button>
            </div>
            {
                coordenadas.length > 0 && <>
                    <MainDivTitle
                        title={`${tr({ id: 'coordenadas' })} (${coordenadas.length})`}
                        className="max-h-64 overflow-y-auto mt-4"
                    >
                        {coordenadas.map(c => (
                            <CoordenadaInsertedCard
                                key={c.id}
                                descripcion={c.descripcion}
                                formatted_address={c.formatted_address}
                                geo_provider={c.geo_provider}
                                latitud={c.latitud}
                                longitud={c.longitud}
                                place_id={c.place_id}
                                deleteAction={() => delCoordenada(c.id)}
                                editAction={() => editCoordenada(c)}
                            />
                        ))}
                    </MainDivTitle>
                </>
            }
        </div>
    )
}