import { IllegalArgumentError } from "./errors.js";
import { esFechaValida, esTextoNoVacio, hoyISO } from "./validaciones.js";

export class Analista {

    // Atributos
    #codigoEmpleado!: string;
    #nombre!: string;
    #fechaInicioMuestra!: string;

    // Constructor: el parametro por defecto reemplaza al constructor sobrecargado de Java
    constructor(codigoEmpleado: string, nombre: string, fechaInicioMuestra: string = hoyISO()) {
        this.codigoEmpleado = codigoEmpleado;
        this.nombre = nombre;
        this.fechaInicioMuestra = fechaInicioMuestra;
    }

    // Getters y Setters
    get codigoEmpleado(): string {
        return this.#codigoEmpleado;
    }

    set codigoEmpleado(codigoEmpleado: string) {
        // Validamos el formato del código de calidad (ej: QA-02)
        if (typeof codigoEmpleado !== "string" || !/^QA-\d{2}$/.test(codigoEmpleado)) {
            throw new IllegalArgumentError("El codigo de empleado debe tener el formato QA-00");
        }
        this.#codigoEmpleado = codigoEmpleado;
    }

    get nombre(): string {
        return this.#nombre;
    }

    set nombre(nombre: string) {
        // Validamos que el nombre no este vacio
        if (!esTextoNoVacio(nombre)) {
            throw new IllegalArgumentError("El nombre no puede ir vacio");
        }
        this.#nombre = nombre;
    }

    get fechaInicioMuestra(): string {
        return this.#fechaInicioMuestra;
    }

    set fechaInicioMuestra(fechaInicioMuestra: string) {
        // Validamos que sea una fecha real (yyyy-MM-dd) para la trazabilidad
        if (!esFechaValida(fechaInicioMuestra)) {
            throw new IllegalArgumentError("La fecha de inicio debe ser valida (yyyy-MM-dd)");
        }
        this.#fechaInicioMuestra = fechaInicioMuestra;
    }

}
