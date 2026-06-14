import { db } from "../db/db";

export async function clearLocalData() {
    localStorage.removeItem('config');
    localStorage.removeItem('iphone_advice');
    return [
        db.relevamiento.clear(),
        db.ruta.clear(),
        db.coordenadas.clear()
    ];
}