import { IllegalArgumentError } from "./errors.js";
import { esTextoNoVacio } from "./validaciones.js";

export class Producto {

    // Atributos
    #especie!: string;
    #nombre!: string;

    // Constructor
    constructor(especie: string, nombre: string) {
        this.especie = especie;
        this.nombre = nombre;
    }

    // Getters y Setters
    get especie(): string {
        return this.#especie;
    }

    set especie(especie: string) {
        // Validamos que la especie no este vacia
        if (!esTextoNoVacio(especie)) {
            throw new IllegalArgumentError("La especie no puede estar vacio");
        }
        this.#especie = especie;
    }

    get nombre(): string {
        return this.#nombre;
    }

    set nombre(nombre: string) {
        // Validamos que el nombre no este vacio
        if (!esTextoNoVacio(nombre)) {
            throw new IllegalArgumentError("El nombre no puede estar vacio");
        }
        this.#nombre = nombre;
    }

}
