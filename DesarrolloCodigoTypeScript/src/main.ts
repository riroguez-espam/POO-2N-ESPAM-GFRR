import { Analista } from "./Analista.js";
import { IllegalArgumentError } from "./errors.js";
import { FormularioControlCalidad } from "./FormularioControlCalidad.js";
import { Muestra } from "./Muestra.js";
import { Producto } from "./Producto.js";
import { SondaTemperatura } from "./SondaTemperatura.js";

console.log("==========================================");
console.log("CASO VÁLIDO: Creación exitosa del lote");
console.log("==========================================");

// Paso 1: Asignacion del analista de turno (fecha de inicio por defecto: hoy)
const analista1 = new Analista("QA-02", "Maria Lopez");

// Paso 2: Recepcion de lote -> se abre el formulario de control de calidad
const formulario1 = new FormularioControlCalidad("2026-10-14", "L-2026-A", analista1);

// Producto que se va a evaluar
const producto1 = new Producto("ATUN", "ALBACORA 70 - 120 Lb");

// Paso 3: Preparar la sonda de temperatura calibrada (calibrada por defecto: false)
const sonda1 = new SondaTemperatura("SONDA-01");
sonda1.calibrada = true;

// Pasos 3 y 4: Muestrear 15 pescados, medir temperatura y validar condicion
for (let i = 1; i <= 15; i++) {
    const muestra = new Muestra(producto1, sonda1.leerTemperatura());

    console.log(`Muestra ${i}: ${muestra.producto.nombre}`
        + `, Temp: ${muestra.temperatura.toFixed(1)} °C`
        + `, Resultado: ${muestra.resultado}`);

    // Se registran aptas y no aptas para el balance final
    formulario1.agregarMuestra(muestra);
}

// Paso 5: Registro y cierre del analisis
formulario1.cerrarAnalisis();

console.log("\n==========================================");
console.log("CASO INVÁLIDO: Captura de excepción (Fail-Fast)");
console.log("==========================================");
try {
    console.log("Intentando instanciar lote con código no apto / inválido...");
    new FormularioControlCalidad("2026-10-14", "LOTE-CORRUPTO", analista1);
} catch (e) {
    if (e instanceof IllegalArgumentError) {
        console.log(`>> Excepción capturada con éxito: ${e.message}`);
        console.log(">> Invariante protegida: El objeto no nació corrupto.");
    } else {
        throw e;
    }
}
