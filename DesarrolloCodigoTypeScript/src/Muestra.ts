import { IllegalArgumentError } from "./errors.js";
import type { Producto } from "./Producto.js";

export class Muestra {

    // Limite critico de temperatura (invariante de negocio)
    static readonly TEMPERATURA_MAXIMA = 4.0;

    // Atributos
    #producto!: Producto;
    #temperatura!: number;
    #apto: boolean | null = null; // null = aun sin validar

    constructor(producto: Producto, temperatura: number | null) {
        this.producto = producto;
        this.temperatura = temperatura;
    }

    // Getters y Setters
    get producto(): Producto {
        return this.#producto;
    }

    set producto(producto: Producto) {
        // Validamos que la muestra tenga un producto evaluado
        if (producto == null) {
            throw new IllegalArgumentError("El producto no puede estar vacio");
        }
        this.#producto = producto;
    }

    get temperatura(): number {
        return this.#temperatura;
    }

    set temperatura(temperatura: number | null) {
        // Validamos que exista una lectura de la sonda
        if (temperatura == null) {
            throw new IllegalArgumentError("La temperatura no puede estar vacia");
        }
        this.#temperatura = temperatura;
        // Cada nueva lectura se valida automaticamente
        this.validarCondicion();
    }

    // Solo lectura: el resultado lo decide validarCondicion()
    get apto(): boolean {
        return this.#apto === true;
    }

    // Indica si la muestra ya tiene lectura validada
    get validada(): boolean {
        return this.#apto !== null;
    }

    // Metodo para validar la condicion critica: APTO si <= 4.0 °C, NO APTO si > 4.0 °C
    validarCondicion(): boolean {
        this.#apto = this.#temperatura <= Muestra.TEMPERATURA_MAXIMA;
        return this.#apto;
    }

    // Texto del resultado para el reporte
    get resultado(): string {
        if (this.#apto === null) {
            return "SIN LECTURA";
        }
        return this.#apto ? "APTO" : "NO APTO";
    }

}
