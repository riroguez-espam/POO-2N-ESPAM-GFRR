public class Main {
    public static void main(String[] args) {
        System.out.println("==========================================");
        System.out.println("CASO VÁLIDO: Creación exitosa del lote");
        System.out.println("==========================================");

        // Paso 1: Asignacion del analista de turno (Instancia con constructor sobrecargado)
        Analista analista1 = new Analista("QA-02", "Maria Lopez");

        // Paso 2: Recepcion de lote -> se abre el formulario de control de calidad
        FormularioControlCalidad formulario1 = new FormularioControlCalidad("2026-10-14", "L-2026-A", analista1);

        // Producto que se va a evaluar
        Producto producto1 = new Producto("ATUN", "ALBACORA 70 - 120 Lb");

        // Paso 3: Preparar la sonda de temperatura calibrada (Instancia constructor sobrecargado)
        SondaTemperatura sonda1 = new SondaTemperatura("SONDA-01");
        sonda1.setCalibrada(true);

        // Pasos 3 y 4: Muestrear 15 pescados, medir temperatura y validar condicion
        for (int i = 1; i <= 15; i++) {
            Muestra muestra = new Muestra(producto1, sonda1.leerTemperatura());

            System.out.println("Muestra " + i + ": " + muestra.getProducto().getNombre() +
                    ", Temp: " + muestra.getTemperatura() + " °C" +
                    ", Resultado: " + muestra.getResultado());

            // Se registran aptas y no aptas para el balance final
            formulario1.agregarMuestra(muestra);
        }

        // Paso 5: Registro y cierre del analisis
        formulario1.cerrarAnalisis();
        
        System.out.println("\n==========================================");
        System.out.println("CASO INVÁLIDO: Captura de excepción (Fail-Fast)");
        System.out.println("==========================================");
        try {
            System.out.println("Intentando instanciar lote con código no apto / inválido...");
            new FormularioControlCalidad("2026-10-14", "LOTE-CORRUPTO", analista1);
        } catch (IllegalArgumentException e) {
            System.out.println(">> Excepción capturada con éxito: " + e.getMessage());
            System.out.println(">> Invariante protegida: El objeto no nació corrupto.");
        }
    }
}
