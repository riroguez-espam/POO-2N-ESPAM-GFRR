import { IllegalArgumentError } from "./errors.js";
import { esFechaValida } from "./validaciones.js";
import type { Analista } from "./Analista.js";
import type { Muestra } from "./Muestra.js";

export class FormularioControlCalidad {

    // Atributos
    #fechaProduccion!: string;
    #lote!: string;
    #analista!: Analista;
    readonly #muestras: Muestra[] = [];
    #cerrado = false;

    // Constructor
    constructor(fechaProduccion: string, lote: string, analista: Analista) {
        this.fechaProduccion = fechaProduccion;
        this.lote = lote;
        this.analista = analista;
    }

    // Getters y Setters
    get fechaProduccion(): string {
        return this.#fechaProduccion;
    }

    set fechaProduccion(fechaProduccion: string) {
        // Validamos que sea una fecha real con formato yyyy-MM-dd
        if (!esFechaValida(fechaProduccion)) {
            throw new IllegalArgumentError("La fecha de produccion debe ser valida (yyyy-MM-dd)");
        }
        this.#fechaProduccion = fechaProduccion;
    }

    get lote(): string {
        return this.#lote;
    }

    set lote(lote: string) {
        // Validamos el formato del lote (ej: L-2026-A)
        if (typeof lote !== "string" || !/^L-\d{4}-[A-Z]$/.test(lote)) {
            throw new IllegalArgumentError("El lote debe tener el formato L-0000-A");
        }
        this.#lote = lote;
    }

    get analista(): Analista {
        return this.#analista;
    }

    set analista(analista: Analista) {
        // Trazabilidad: el analista debe tener codigo y fecha de inicio de muestra
        if (analista == null || analista.codigoEmpleado == null || analista.fechaInicioMuestra == null) {
            throw new IllegalArgumentError("El analista debe tener codigo de empleado y fecha de inicio de muestra");
        }
        this.#analista = analista;
    }

    get cerrado(): boolean {
        return this.#cerrado;
    }

    // Muestras del formulario (copia de solo lectura)
    get muestras(): readonly Muestra[] {
        return [...this.#muestras];
    }

    // Agregar una muestra analizada al formulario
    agregarMuestra(muestra: Muestra): void {
        // No se aceptan muestras con el formulario cerrado
        if (this.#cerrado) {
            console.log("El formulario ya esta cerrado");
            return;
        }
        // Solo se registran muestras con producto y temperatura validada
        if (muestra == null || muestra.producto == null || !muestra.validada) {
            console.log("La muestra debe tener producto y lectura de temperatura");
            return;
        }

        this.#muestras.push(muestra);
    }

    // Contar muestras APTAS
    contarAptos(): number {
        return this.#muestras.filter((muestra) => muestra.apto).length;
    }

    // Contar muestras NO APTAS
    contarNoAptos(): number {
        return this.#muestras.length - this.contarAptos();
    }

    // Metodo de cierre: consolida y reporta el balance final del lote
    cerrarAnalisis(): void {
        // No se puede cerrar dos veces
        if (this.#cerrado) {
            console.log("El analisis ya fue cerrado");
            return;
        }

        this.#cerrado = true;

        console.log("===== BATCH SUMMARY =====");
        console.log(`Lote: ${this.#lote} | Fecha produccion: ${this.#fechaProduccion}`);
        console.log(`Analista: ${this.#analista.nombre} (${this.#analista.codigoEmpleado})`
            + ` | Inicio muestra: ${this.#analista.fechaInicioMuestra}`);
        console.log(`Total Muestras: ${this.#muestras.length}`);
        console.log(`Aptos: ${this.contarAptos()}`);
        console.log(`No Aptos: ${this.contarNoAptos()}`);
    }

}
