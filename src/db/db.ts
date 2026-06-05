import Dexie from 'dexie';
import type { Table } from "dexie";
import type { IGeoProvider, IRelevamiento, IRuta } from '../interfaces/IEntidades';


export class GpsCaptureDexie extends Dexie {
  relevamiento!: Table<IRelevamiento>;
  ruta!: Table<IRuta>;
  proveedor!: Table<IGeoProvider>;  

  constructor() {
    super('gps-capture');
    this.version(1).stores({
        relevamiento: "++id, nombre, &key, created_at, updated_at",
        ruta: "++id, relevamiento_id, nombre, &key, created_at, updated_at",
        proveedor: "++id, nombre, &key, api_key, provider_type, updated_at, created_at"        
    });

    // Relevamiento
    this.relevamiento.hook("creating", (_: unknown, obj: IRelevamiento) => {
      const now = Date.now();
      obj.created_at = now;
      obj.updated_at = now;
    });
    this.relevamiento.hook("updating", (modifications: Partial<IRelevamiento>) => {
      if ("created_at" in modifications) delete modifications.created_at;
      modifications.updated_at = Date.now();
    });

    // Ruta
    this.ruta.hook("creating", (_: unknown, obj: IRuta) => {
      const now = Date.now();
      obj.created_at = now;
      obj.updated_at = now;
    });
    this.ruta.hook("updating", (modifications: Partial<IRuta>) => {
      if ("created_at" in modifications) delete modifications.created_at;
      modifications.updated_at = Date.now();
    });

    // Proveedor
    this.proveedor.hook("creating", (_: unknown, obj: IGeoProvider) => {
      const now = Date.now();
      obj.created_at = now;
      obj.updated_at = now;
    });
    this.proveedor.hook("updating", (modifications: Partial<IRuta>) => {
      if ("created_at" in modifications) delete modifications.created_at;
      modifications.updated_at = Date.now();
    });

  }
}

export const db = new GpsCaptureDexie();