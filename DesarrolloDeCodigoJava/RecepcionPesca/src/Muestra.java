public class Muestra {

    // Limite critico de temperatura (invariante de negocio)
    public static final double TEMPERATURA_MAXIMA = 4.0;

    // Atributos
    private Producto producto;
    private Double temperatura;
    private Boolean apto; // null = aun sin validar

    public Muestra(Producto producto, Double temperatura) {
        setProducto(producto);
        setTemperatura(temperatura);
    }

    // Getters y Setters
    public Producto getProducto() {
        return producto;
    }

    public void setProducto(Producto producto) {
        // Validamos que la muestra tenga un producto evaluado
        if (producto == null) {
            throw new IllegalArgumentException("El producto no puede estar vacio");
        } else {
            this.producto = producto;
        }
    }

    public Double getTemperatura() {
        return temperatura;
    }

    public void setTemperatura(Double temperatura) {
        // Validamos que exista una lectura de la sonda
        if (temperatura == null) {
            throw new IllegalArgumentException("La temperatura no puede estar vacia");
        } else {
            this.temperatura = temperatura;
            // Cada nueva lectura se valida automaticamente
            validarCondicion();
        }
    }

    // Solo lectura: el resultado lo decide validarCondicion()
    public boolean isApto() {
        return apto != null && apto;
    }

    // Indica si la muestra ya tiene lectura validada
    public boolean isValidada() {
        return apto != null;
    }

    // Metodo para validar la condicion critica: APTO si <= 4.0 °C, NO APTO si > 4.0 °C
    public boolean validarCondicion() {
        if (temperatura == null) {
            System.out.println("No se puede validar una muestra sin temperatura");
            return false;
        }
        apto = temperatura <= TEMPERATURA_MAXIMA;
        return apto;
    }

    // Texto del resultado para el reporte
    public String getResultado() {
        if (apto == null) {
            return "SIN LECTURA";
        }
        return apto ? "APTO" : "NO APTO";
    }

}
