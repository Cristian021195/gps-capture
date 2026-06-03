// import { db } from "../db/db";

export async function clearLocalData(){    
    localStorage.removeItem('config');
    localStorage.removeItem('iphone_advice');
    return [
        // db.empresas.clear(),
        // db.horarios.clear()
    ];
}