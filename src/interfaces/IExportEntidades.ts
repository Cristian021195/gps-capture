export interface IExportRegistroGPS {
    id:number,
    latitud:number,
    longitud:number,
    /* Es condicional: si no existe formatted_address se carga descripción */
    titulo:string | undefined
}