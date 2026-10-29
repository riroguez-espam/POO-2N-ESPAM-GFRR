import { IllegalArgumentError } from "./errors.js";
import { esTextoNoVacio } from "./validaciones.js";

export class SondaTemperatura {

    // Atributos
    #codigo!: string;
    calibrada: boolean;
    // Generador aleatorio inyectable para poder testear lecturas deterministas
    readonly #random: () => number;

    // Constructor: el parametro por defecto reemplaza al constructor sobrecargado de Java
    constructor(codigo: string, calibrada: boolean = false, random: () => number = Math.random) {
        this.codigo = codigo;
        this.calibrada = calibrada;
        this.#random = random;
    }

    // Getters y Setters
    get codigo(): string {
        return this.#codigo;
    }

    set codigo(codigo: string) {
        // Validamos que el codigo no este vacio
        if (!esTextoNoVacio(codigo)) {
            throw new IllegalArgumentError("El codigo de la sonda no puede estar vacio");
        }
        this.#codigo = codigo;
    }

    // Metodo para leer la temperatura interna del pescado (FUNCIONALIDAD)
    leerTemperatura(): number | null {
        // Solo una sonda calibrada puede dar lecturas validas
        if (!this.calibrada) {
            console.log("La sonda no esta calibrada");
            return null;
        }
        // Simulamos la lectura con random de 0.0 a 5.0 °C (redondeado a 1 decimal)
        const temperatura = this.#random() * 5.0;
        return Math.round(temperatura * 10) / 10;
    }

}
