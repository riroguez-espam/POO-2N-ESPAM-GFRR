import { test } from "node:test";
import assert from "node:assert/strict";
import { Analista } from "../src/Analista.js";
import { IllegalArgumentError } from "../src/errors.js";
import { hoyISO } from "../src/validaciones.js";

test("usa la fecha de hoy si no se indica fecha de inicio", () => {
    const analista = new Analista("QA-02", "Maria Lopez");
    assert.equal(analista.fechaInicioMuestra, hoyISO());
});

test("acepta fecha de inicio explicita", () => {
    const analista = new Analista("QA-02", "Maria Lopez", "2026-10-14");
    assert.equal(analista.fechaInicioMuestra, "2026-10-14");
});

test("rechaza codigo de empleado con formato invalido", () => {
    for (const codigo of ["QA-2", "qa-02", "QA-002", ""]) {
        assert.throws(() => new Analista(codigo, "Maria"), IllegalArgumentError);
    }
});

test("rechaza nombre vacio", () => {
    assert.throws(() => new Analista("QA-02", " "), IllegalArgumentError);
});

test("rechaza fechas invalidas", () => {
    for (const fecha of ["2026-13-01", "2026-02-30", "14/10/2026", ""]) {
        assert.throws(() => new Analista("QA-02", "Maria", fecha), IllegalArgumentError);
    }
});
