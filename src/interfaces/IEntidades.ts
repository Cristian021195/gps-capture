/**
 * Determina la medición de una entidad de relevamiento. Ej: empresas de bus, coches, turismo, etc.
 */
export interface IRelevamiento {
    
    /**
     * Identificador único local de indexedb 
     */
    id: number,

    /**
     * Nombre de relevamiento. Ej: empresa, turismo, etc. "Hermanos Gutierrez S.R.L"
     */
    nombre: string,

    /**
     * Acortamiento / Slug de nombre de relevamiento. Ej: hermanos-gutierrez-srl
     */
    key: string,

    /**
     * Fecha de creación en milisegundos
     */
    created_at?:number,

    /**
     * Fecha de actualización en milisegundos
     */
    updated_at?:number
}

/**
 * Determina la medición de una entidad de relevamiento. Ej: empresas de bus, coches, turismo, etc.
 */
export interface IRuta {

    /**
     * Identificador único local de indexedb 
     */
    id: number,

    /**
     * Identificador de relevamiento o clave foranea
     */
    relevamiento_id: number,

    /**
     * Nombre de ruta: un relevamiento puede tener mas de una ruta. Ej: Servicio Común, Ruta 38
     */
    nombre:string,

    /**
     * Acortamiento / Slug de nombre de ruta. Ej: exprebus-servicio-comun-ruta-38
     */
    key:string,

    /**
     * Fecha de creación en milisegundos
     */
    created_at:number,

    /**
     * Fecha de actualización en milisegundos
     */
    updated_at:number
}

export interface IRegistroGPS {

    /**
     * Identificador único local de indexedb 
     */
    id: number,

    /**
     * Identificador de ruta o clave foranea
     */
    ruta_id: number,

    /**
     * Latitud de tipo flotante / decimal
     */
    latitud: number,

    /**
     * Longitud de tipo flotante / decimal
     */
    longitud: number,

    /**
     * Identificador de IGeoProvider (local) o clave foranea
     */
    geo_provider_id: number,

    /**
     * Texto de lo que nos devuelve la API del GeoProvider, generalmente calle y número juntos. Ej: San Luis 1216
     */
    descripcion: string,

    /**
     * Identificador Unico según el proveedor que responde por API. Ej: Google: place_id, OSM: osm_type+"-"+osm_id, etc.
     */
    place_id: string,
    
    /**
     * Fecha de creación en milisegundos
     */
    created_at: number,
    
    /**
     * Fecha de creación en milisegundos
     */
    updated_at: number
}

/**
 * PENDIENTE DE REVISIÓN: es probable que no podamos hacer uso ya que los componentes codificados son diferentes. Ver librerias y demas
 */
export interface IMapProvider {

    /**
     * Identificador único local de indexedb 
     */
    id: number,

    /**
     * Nombre del proveedor del layout de mapas, con su respectivo componente y demás
     */
    nombre: string,

    /**
     * Acortamiento / Slug de nombre de ruta. Ej: exprebus-servicio-comun-ruta-38
     */
    key: string,//slug

    /**
     * api key obtenida del proveedor de servicio de map layout
     */
    api_key: string,
    
    /**
     * Fecha de creación en milisegundos
     */
    created_at?:number,
    
    /**
     * Fecha de creación en milisegundos
     */
    updated_at?:number
}

export interface IGeoProvider {

    /**
     * Identificador único local de indexedb 
     */
    id: number,

    /**
     * Nombre del proveedor del layout de geocodificación
     */
    nombre: string,
    
    /**
     * Acortamiento / Slug de nombre de ruta. Ej: exprebus-servicio-comun-ruta-38
     */
    key: string,//slug
    
    /**
     * api key obtenida del proveedor de servicio de geocodificación
     */
    api_key: string,
    
    /**
     * Fecha de creación en milisegundos
     */
    created_at?:number,
    
    /**
     * Fecha de creación en milisegundos
     */
    updated_at?:number
}


/**
 * Es la union de las interfaces IRuta y IRelevamiento para la consulta de rutas
 */
export interface IRutaRelevamiento extends IRuta {

    /**
     * Nombre de relevamiento o clave foranea
     */
    relevamiento_nombre: string
}