import { test } from "node:test";
import assert from "node:assert/strict";
import { Muestra } from "../src/Muestra.js";
import { Producto } from "../src/Producto.js";
import { IllegalArgumentError } from "../src/errors.js";

const producto = new Producto("ATUN", "ALBACORA");

test("4.0 °C es APTO (limite incluido)", () => {
    const muestra = new Muestra(producto, 4.0);
    assert.equal(muestra.apto, true);
    assert.equal(muestra.validada, true);
    assert.equal(muestra.resultado, "APTO");
});

test("4.1 °C es NO APTO", () => {
    const muestra = new Muestra(producto, 4.1);
    assert.equal(muestra.apto, false);
    assert.equal(muestra.resultado, "NO APTO");
});

test("cambiar la temperatura revalida la muestra", () => {
    const muestra = new Muestra(producto, 1.0);
    muestra.temperatura = 4.5;
    assert.equal(muestra.resultado, "NO APTO");
});

test("rechaza temperatura nula (sonda sin calibrar)", () => {
    assert.throws(() => new Muestra(producto, null), IllegalArgumentError);
});
