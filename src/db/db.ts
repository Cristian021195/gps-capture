import Dexie from 'dexie';
import type { Table } from "dexie";
import type { IRelevamiento } from '../interfaces/IEntidades';
import type { IRelevamientoDB } from '../interfaces/IEntidadesDB';


export class GpsCaptureDexie extends Dexie {
  relevamiento!: Table<IRelevamiento | IRelevamientoDB >;

  constructor() {
    super('gps-capture');
    this.version(1).stores({
        relevamiento: "++id, nombre, &key, created_at, updated_at"
    });

    // Empresas
    this.relevamiento.hook("creating", (_: unknown, obj: IRelevamiento) => {
      const now = Date.now();
      obj.created_at = now;
      obj.updated_at = now;
    });
    this.relevamiento.hook("updating", (modifications: Partial<IRelevamiento>) => {
      if ("created_at" in modifications) delete modifications.created_at;
      modifications.updated_at = Date.now();
    });

  }
}

export const db = new GpsCaptureDexie();