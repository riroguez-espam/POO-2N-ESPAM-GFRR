import { test } from "node:test";
import assert from "node:assert/strict";
import { Analista } from "../src/Analista.js";
import { FormularioControlCalidad } from "../src/FormularioControlCalidad.js";
import { Muestra } from "../src/Muestra.js";
import { Producto } from "../src/Producto.js";
import { IllegalArgumentError } from "../src/errors.js";

const analista = new Analista("QA-02", "Maria Lopez", "2026-10-14");
const producto = new Producto("ATUN", "ALBACORA");

const nuevoFormulario = () => new FormularioControlCalidad("2026-10-14", "L-2026-A", analista);

test("rechaza lote o fecha de produccion invalidos", () => {
    assert.throws(() => new FormularioControlCalidad("2026-10-14", "L-26-A", analista), IllegalArgumentError);
    assert.throws(() => new FormularioControlCalidad("2026-10-14", "L-2026-a", analista), IllegalArgumentError);
    assert.throws(() => new FormularioControlCalidad("2026-02-30", "L-2026-A", analista), IllegalArgumentError);
});

test("cuenta aptos y no aptos", () => {
    const formulario = nuevoFormulario();
    for (const temperatura of [1.0, 4.0, 4.1, 5.0, 2.5]) {
        formulario.agregarMuestra(new Muestra(producto, temperatura));
    }
    assert.equal(formulario.muestras.length, 5);
    assert.equal(formulario.contarAptos(), 3);
    assert.equal(formulario.contarNoAptos(), 2);
});

test("no acepta muestras tras el cierre ni cierra dos veces", (t) => {
    const log = t.mock.method(console, "log", () => {});
    const formulario = nuevoFormulario();
    formulario.agregarMuestra(new Muestra(producto, 1.0));
    formulario.cerrarAnalisis();
    assert.equal(formulario.cerrado, true);

    formulario.agregarMuestra(new Muestra(producto, 2.0));
    assert.equal(formulario.muestras.length, 1);

    log.mock.resetCalls();
    formulario.cerrarAnalisis();
    assert.deepEqual(log.mock.calls.map((c) => c.arguments[0]), ["El analisis ya fue cerrado"]);
});

test("el resumen incluye lote, analista y totales", (t) => {
    const log = t.mock.method(console, "log", () => {});
    const formulario = nuevoFormulario();
    formulario.agregarMuestra(new Muestra(producto, 4.5));
    formulario.cerrarAnalisis();
    const salida = log.mock.calls.map((c) => c.arguments[0]);
    assert.deepEqual(salida, [
        "===== BATCH SUMMARY =====",
        "Lote: L-2026-A | Fecha produccion: 2026-10-14",
        "Analista: Maria Lopez (QA-02) | Inicio muestra: 2026-10-14",
        "Total Muestras: 1",
        "Aptos: 0",
        "No Aptos: 1",
    ]);
});

test("la lista de muestras expuesta es una copia", () => {
    const formulario = nuevoFormulario();
    formulario.agregarMuestra(new Muestra(producto, 1.0));
    (formulario.muestras as Muestra[]).pop();
    assert.equal(formulario.muestras.length, 1);
});
