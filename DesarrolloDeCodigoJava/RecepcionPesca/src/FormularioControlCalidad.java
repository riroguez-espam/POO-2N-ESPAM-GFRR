import java.time.LocalDate;
import java.time.format.DateTimeParseException;
import java.util.ArrayList;
import java.util.List;

public class FormularioControlCalidad {

    // Atributos
    private String fechaProduccion;
    private String lote;
    private Analista analista;
    private List<Muestra> muestras;
    private boolean cerrado;

    // Constructor por defecto
    public FormularioControlCalidad() {
        this.fechaProduccion = LocalDate.now().toString();
        this.muestras = new ArrayList<>();
        this.cerrado = false;
    }

    // Constructor parametrizado
    public FormularioControlCalidad(String fechaProduccion, String lote, Analista analista) {
        setFechaProduccion(fechaProduccion);
        setLote(lote);
        setAnalista(analista);
        this.muestras = new ArrayList<Muestra>();
        this.cerrado = false;
    }

    // Getters y Setters
    public String getFechaProduccion() {
        return fechaProduccion;
    }

    public void setFechaProduccion(String fechaProduccion) {
        // Validamos que sea una fecha real con formato yyyy-MM-dd
        try {
            LocalDate.parse(fechaProduccion);
            this.fechaProduccion = fechaProduccion;
        } catch (DateTimeParseException | NullPointerException e) {
            throw new IllegalArgumentException("La fecha de produccion debe ser valida (yyyy-MM-dd)");
        }
    }

    public String getLote() {
        return lote;
    }

    public void setLote(String lote) {
        // Validamos el formato del lote (ej: L-2026-A)
        if (lote == null || !lote.matches("L-\\d{4}-[A-Z]")) {
            throw new IllegalArgumentException("El lote debe tener el formato L-0000-A");
        } else {
            this.lote = lote;
        }
    }

    public Analista getAnalista() {
        return analista;
    }

    public void setAnalista(Analista analista) {
        // Trazabilidad: el analista debe tener codigo y fecha de inicio de muestra
        if (analista == null || analista.getCodigoEmpleado() == null || analista.getFechaInicioMuestra() == null) {
            throw new IllegalArgumentException("El analista debe tener codigo de empleado y fecha de inicio de muestra");
        } else {
            this.analista = analista;
        }
    }

    public boolean isCerrado() {
        return cerrado;
    }

    // Agregar una muestra analizada al formulario
    public void agregarMuestra(Muestra muestra) {
        // El lote debe estar bien identificado (fecha y codigo)
        if (fechaProduccion == null || lote == null) {
            System.out.println("El formulario debe tener fecha de produccion y lote validos");
            return;
        }
        // No se aceptan muestras sin analista o con el formulario cerrado
        if (analista == null) {
            System.out.println("Debe asignar un analista antes de registrar muestras");
            return;
        }
        if (cerrado) {
            System.out.println("El formulario ya esta cerrado");
            return;
        }
        // Solo se registran muestras con producto y temperatura validada
        if (muestra == null || muestra.getProducto() == null || !muestra.isValidada()) {
            System.out.println("La muestra debe tener producto y lectura de temperatura");
            return;
        }

        if (muestras == null) {
            // Generar lista de muestras vacia
            muestras = new ArrayList<Muestra>();
        }

        muestras.add(muestra);
    }

    // Mostrar muestras del formulario
    public List<Muestra> getMuestras() {
        return muestras;
    }

    // Contar muestras APTAS
    public int contarAptos() {
        int aptos = 0;
        if (muestras != null) {
            for (Muestra muestra : muestras) {
                if (muestra.isApto()) {
                    aptos++;
                }
            }
        }
        return aptos;
    }

    // Contar muestras NO APTAS
    public int contarNoAptos() {
        int total = (muestras == null) ? 0 : muestras.size();
        return total - contarAptos();
    }

    // Metodo de cierre: consolida y reporta el balance final del lote
    public void cerrarAnalisis() {
        // No se puede cerrar sin lote identificado, sin analista ni dos veces
        if (fechaProduccion == null || lote == null) {
            System.out.println("El formulario debe tener fecha de produccion y lote validos");
            return;
        }
        if (analista == null) {
            System.out.println("No se puede cerrar el analisis sin analista asignado");
            return;
        }
        if (cerrado) {
            System.out.println("El analisis ya fue cerrado");
            return;
        }

        cerrado = true;

        int total = (muestras == null) ? 0 : muestras.size();

        System.out.println("===== BATCH SUMMARY =====");
        System.out.println("Lote: " + lote + " | Fecha produccion: " + fechaProduccion);
        System.out.println("Analista: " + analista.getNombre() + " (" + analista.getCodigoEmpleado() + ")"
                + " | Inicio muestra: " + analista.getFechaInicioMuestra());
        System.out.println("Total Muestras: " + total);
        System.out.println("Aptos: " + contarAptos());
        System.out.println("No Aptos: " + contarNoAptos());
    }

}
