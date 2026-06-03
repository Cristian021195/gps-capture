/**
 * Clase para manejar la conversión de números a días de la semana en formato abreviado. 
 */
export class DateTimeHorario {

    /**
     * @returns la abreviatura del dia correspondiente a las traducciones en src/translations
     */
    static getDiaTr(value:number):string {
        /*
        0 habiles
        1 sabados
        2 domingos
        3 feriados → default 2
        4 lunes? → default 0  
        5 martes? → default 0  
        6 miércoles? → default 0  
        7 jueves? → default 0  
        8 viernes? → default 0  
        9 especial? → default 3   
        */
        switch (value) {
            case 0:
                return 'hab';
            case 1:
                return 'sab';
            case 2:
                return 'dom';
            case 3:
                return 'fer';
            case 4:
                return 'lun';
            case 5:
                return 'mar';
            case 6:
                return 'mie';
            case 7:
                return 'jue';
            case 8:
                return 'vie';
            case 9:
                return 'esp';
            default:
                return 'hab';
        }
        /*switch (value) {
            case 0:
                return 'lun';
            case 1:
                return 'mar';
            case 2:
                return 'mie';
            case 3:
                return 'jue';
            case 4:
                return 'vie';
            case 5:
                return 'sab';
            case 6:
                return 'dom';
            case 7:
                return 'hab';
            case 8:
                return 'fer';
            case 9:
                return 'esp';
            default:
                return 'inv';
        }
        */
    }

    /**
     * Retorna el día actual del navegador en formato 0-6
     * 0=lun ... 6=dom
     */
    static getDia(): number {
        const jsDay = new Date().getDay();
        
        // 20-4-26: nueva implementación: en futuro ver si sera util separar por dias
        switch (jsDay) {
            case 1: return 0; // lunes
            case 2: return 0; // martes
            case 3: return 0; // miércoles
            case 4: return 0; // jueves
            case 5: return 0; // viernes
            case 6: return 1; // sábado
            case 0: return 2; // domingo
            default: return 0; // por seguridad hábiles
        }
        /* // 20-4-26
        switch (jsDay) {
            case 1: return 4; // lunes
            case 2: return 5; // martes
            case 3: return 6; // miércoles
            case 4: return 7; // jueves
            case 5: return 8; // viernes
            case 6: return 1; // sábado
            case 0: return 2; // domingo
            default: return 0; // por seguridad hábiles
        }
        */
        /* rollback dias
        switch (jsDay) {
            case 1: return 0; // lunes
            case 2: return 1; // martes
            case 3: return 2; // miércoles
            case 4: return 3; // jueves
            case 5: return 4; // viernes
            case 6: return 5; // sábado
            case 0: return 6; // domingo
            default: return 7; // por seguridad
        }*/
    }

    /**
     * Es el uso en conjunto de los métodos getDiaTr(getDia()) para obtener la abreviatura del día actual
     * @returns la abreviatura del dia correspondiente a las traducciones en src/translations
     */
    static getDiaActualTr(dia?:string|undefined): string {
        if(dia){
            const _dia = Number(dia);
            if(isNaN(_dia)) throw 'Error al convertir dia '+dia;
            return this.getDiaTr(_dia);
        }else{
            return this.getDiaTr(this.getDia());
        }        
    }

    /**
     * Funcion que permite ocupar menos caracteres con fechas en comparacion al formato de texto. Ej: "2015-01-01" (12) -> 16436 (5) 
     * @param fecha objeto fecha de javascript
     * @returns la cantidad de dias desde 1970  
     */
    static diasAUnixEpoch(fecha:Date){
        const UN_DIA = 86400000; //1000ms * 60s * 60m * 24h
        return fecha.getTime() / UN_DIA;
    }

    /**
     * Funcion que deshace lo que la fn diasAUnixEpoch() hace
     * @param fecha_comprimida_numerica el resultado numerico de la fn diasAUnixEpoch()
     * @returns un objeto de fechas para su procesamiento  
     */
    static unixEpocADias(fecha_comprimida_numerica:number){
        return new Date((fecha_comprimida_numerica*86400000));
    }

    /**
     * Método que permite formatear una fecha en DD-MM-YYYY o YYYY-MM-DD
     * @param fecha 
     * @param formato 
     * @returns 
     */
    static formatearFecha(fecha: Date, formato: "YYYY-MM-DD" | "DD-MM-YYYY" = "DD-MM-YYYY") {
        const dd = String(fecha.getUTCDate()).padStart(2, '0');
        const mm = String(fecha.getUTCMonth() + 1).padStart(2, '0');
        const yyyy = fecha.getUTCFullYear();

        switch (formato) {
            case "YYYY-MM-DD":
                return `${yyyy}-${mm}-${dd}`;
            case "DD-MM-YYYY":
            default:
                return `${dd}-${mm}-${yyyy}`;
        }
    }

    static formatearFechaHora(timestamp: number) {
        const fecha = new Date(timestamp);
        const dd = String(fecha.getDate()).padStart(2, '0');
        const mm = String(fecha.getMonth() + 1).padStart(2, '0');
        const yyyy = fecha.getFullYear();
        const hh = String(fecha.getHours()).padStart(2, '0');
        const min = String(fecha.getMinutes()).padStart(2, '0');

        return `${dd}-${mm}-${yyyy} ${hh}:${min}`;
    }

    /**
     * Método que toma una hora en formato HH:MM o H:MM y retorna un número entre 1 (00:00) y 1440 (23:59)  
     * @param hhmm texto en formato hhmm ej: 06:00 o 6:00 o sus variantes en otras regiones
     * @param separador es lo que separa los minutos de las horas : global, . suecia, - / arabes, hh時mm分 china, asia hh시mm분 (en desuso)
     * @returns un numero que representa dicha hora en un formato numerico para su posterior conversion
     */
    static hhmmANumerico(hhmm="06:00", separador=":"){
        if(separador.length != 1){
            throw new Error(`Error al convertir hora a formato númerico: el separador entre horas y minutos debe contener un solo caracter, se ingreó ${separador} ${(separador.length)}`);
        }

        const arreglo = hhmm.split(separador);

        /*
        if(arreglo.length < 2){
            throw new Error(`Error al convertir hora en formato numerico: el arreglo tiene 1 o menos elementos, debería tener dos ${arreglo.join(':')}`);
        }

        if(arreglo[0] == '' || arreglo[1] == ''){
            throw new Error(`Error al convertir hora en formato numerico: se ingresó una hora incorrecta o vacía ${arreglo[0] === '' ? '_' : arreglo[0]}:${arreglo[1] === '' ? '_' : arreglo[1]} pero debe ser de formato hhmm`);
        }

        if(arreglo[1] && arreglo[1].length !== 2){
            throw new Error(`Error al convertir hora en formato numerico: los minutos se ingresaron de manera incorrecta deben ser siempre de dos digitos aunque haya cero, se ingreó ${arreglo[1]}`);
        }

        if(arreglo[0] && (arreglo[0].length < 1 || arreglo[0].length > 2)){
            throw new Error(`Error al convertir hora en formato numerico: los minutos se ingresaron de manera incorrecta deben ser siempre de dos digitos aunque haya cero, se ingreó ${arreglo[0]}`);
        }
        */

        const [h, m] = arreglo.map(Number);

        if(h === 0 && m === 0){
            return 1440;
        }

        return h! * 60 + m!;
    }

    /**
     * 
     * @param numero valor númerico entre 1 y 1440
     * @param separador es lo que separa los minutos de las horas : global, . suecia, - / arabes, hh時mm分 china, asia hh시mm분 (en desuso)
     * @param horaTruncada si la hora hh:mm puede ser h:mm Ej: 06:00 -> 6:00  
     * @returns hora en formato hh:mm o sus variantes en otras regiones según el separador
     */
    static numericoAHhmm(numero=1440, separador=":", horaTruncada=true){
        if(numero < 0 || numero > 1440){
            throw new Error(`Error al convertir hora numerica a formato texto: los valores numericos permitos van entre 1 y 1440, se ingreó ${numero}`);        
        }

        if(numero === 0){
            return '';
        }

        let horas = Math.trunc(numero / 60);    
        const minutos = numero % 60;

        if(horas == 24){
            horas = 0;
        }

        if(horaTruncada){
            return `${horas}${separador}${minutos < 10 ? "0"+minutos : minutos}`;
        }else{
            return `${horas < 10 ? "0"+horas : horas}${separador}${minutos < 10 ? "0"+minutos : minutos}`;
        }
    }

    /**
     * Método que toma la hora actual del sistema, y la retorna en el formato numerico compreso 1 (00:00) a 1440 (23:59)  
     * @returns número que representa la hora HH:MM con valores entre 1 y 1440
     */
    static getHoraActual(){
        const ahora = new Date();
        const horas = ahora.getHours();
        const minutos = ahora.getMinutes();

        return horas * 60 + minutos + 1;
    }

    /**
     * Método que toma la hora actual del sistema, y la retorna en el formato de texto h:mm o hh:mm (mejor para formularios)  
     * @param separador es lo que separa los minutos de las horas : global, . suecia, - / arabes, hh時mm分 china, asia hh시mm분 (en desuso)  
     * @param horaTruncada si la hora hh:mm puede ser h:mm Ej: 06:00 -> 6:00  
     * @returns número que representa la hora HH:MM con valores entre 1 y 1440  
     */
    static getHoraActualTr(separador=":",horaTruncada=false){
        const ahora = new Date();
        const horas = ahora.getHours();
        const minutos = ahora.getMinutes();

        const numerico = horas * 60 + minutos + 1;
        return this.numericoAHhmm(numerico,separador,horaTruncada);
    }
}