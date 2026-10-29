import { test } from "node:test";
import assert from "node:assert/strict";
import { SondaTemperatura } from "../src/SondaTemperatura.js";
import { IllegalArgumentError } from "../src/errors.js";

test("por defecto la sonda no esta calibrada y no lee", (t) => {
    t.mock.method(console, "log", () => {});
    const sonda = new SondaTemperatura("SONDA-01");
    assert.equal(sonda.calibrada, false);
    assert.equal(sonda.leerTemperatura(), null);
});

test("lectura redondeada a un decimal entre 0 y 5", () => {
    const sonda = new SondaTemperatura("SONDA-01", true, () => 0.6789);
    assert.equal(sonda.leerTemperatura(), 3.4);
});

test("rechaza codigo vacio", () => {
    assert.throws(() => new SondaTemperatura(""), IllegalArgumentError);
});
