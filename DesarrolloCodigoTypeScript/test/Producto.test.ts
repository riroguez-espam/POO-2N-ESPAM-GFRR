import { test } from "node:test";
import assert from "node:assert/strict";
import { Producto } from "../src/Producto.js";
import { IllegalArgumentError } from "../src/errors.js";

test("crea un producto valido", () => {
    const producto = new Producto("ATUN", "ALBACORA");
    assert.equal(producto.especie, "ATUN");
    assert.equal(producto.nombre, "ALBACORA");
});

test("rechaza especie o nombre vacios", () => {
    assert.throws(() => new Producto("  ", "ALBACORA"), IllegalArgumentError);
    assert.throws(() => new Producto("ATUN", ""), IllegalArgumentError);
});
