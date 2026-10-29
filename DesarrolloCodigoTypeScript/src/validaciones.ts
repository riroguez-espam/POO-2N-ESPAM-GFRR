// Valida que el texto no sea null/undefined ni este en blanco (equivalente a isBlank)
export function esTextoNoVacio(texto: string | null | undefined): texto is string {
    return typeof texto === "string" && texto.trim().length > 0;
}

// Valida una fecha real con formato yyyy-MM-dd (equivalente a LocalDate.parse)
export function esFechaValida(fecha: string | null | undefined): fecha is string {
    if (typeof fecha !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(fecha)) {
        return false;
    }
    const [anio, mes, dia] = fecha.split("-").map(Number) as [number, number, number];
    const date = new Date(Date.UTC(anio, mes - 1, dia));
    // Rechaza fechas que "se desbordan", como 2026-02-30
    return date.getUTCFullYear() === anio && date.getUTCMonth() === mes - 1 && date.getUTCDate() === dia;
}

// Fecha actual local en formato yyyy-MM-dd (equivalente a LocalDate.now().toString())
export function hoyISO(): string {
    const hoy = new Date();
    const mes = String(hoy.getMonth() + 1).padStart(2, "0");
    const dia = String(hoy.getDate()).padStart(2, "0");
    return `${hoy.getFullYear()}-${mes}-${dia}`;
}
