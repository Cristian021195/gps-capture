export class TextHelper {
    private texto: string;

    private constructor(texto: string) {
        this.texto = texto;
    }

    public static from(texto: string) {
        return new TextHelper(texto);
    }

    public separaTildes() {
        this.texto = this.texto.normalize('NFD');
        return this;
    }

    public remueveTildes() {
        this.texto = this.texto.replace(/[\u0300-\u036f]/g, "");
        return this;
    }

    public setMinusculas() {
        this.texto = this.texto.toLowerCase();
        return this;
    }

    public remueveAlfanumericos() {
        this.texto = this.texto.replace(/[^a-z0-9\s-]/g, "");
        return this;
    }

    public reemplazaEspacios() {
        this.texto = this.texto.replace(/[\s-]+/g, "-");
        return this;
    }

    public remueveGuionesExtremos() {
        this.texto = this.texto.replace(/^-+|-+$/g, "");
        return this;
    }

    public slug() {
        return this
            .separaTildes()
            .remueveTildes()
            .setMinusculas()
            .remueveAlfanumericos()
            .reemplazaEspacios()
            .remueveGuionesExtremos();
    }

    public get() {
        return this.texto;
    }

    public static getShortRandomId() {
        return Math.random().toString(36).slice(2, 9);
    }

    public static capitalize(texto:string|undefined) {
        return (texto ?? "")
            .toLowerCase()
            .split(" ")
            .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
    }

    public static acronimo(texto:string){
        const palabra = texto.trim().replace(/\s+/g, ' ');
        const acronimo = palabra.split(" ").map(e => e[0]).join("");
        return acronimo;
    }
}