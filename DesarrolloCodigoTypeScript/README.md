# hackathon-refactor-ts

Refactorización a Node.js + TypeScript del proyecto Java de `Grupo1` (control de calidad en planta de proceso).

## Uso

```bash
npm install
npm start          # ejecuta el flujo: 15 muestras + BATCH SUMMARY
npm test           # tests con node:test
npm run typecheck  # verificación de tipos
npm run build      # compila a dist/
```

## Equivalencias Java → TypeScript

| Java | TypeScript |
|------|------------|
| Constructores sobrecargados con `this(...)` | Parámetros por defecto (`calibrada = false`, `fechaInicioMuestra = hoyISO()`) |
| `IllegalArgumentException` | `IllegalArgumentError` (`src/errors.ts`) |
| `getX()` / `setX()` / `isX()` | Accessors `get x` / `set x` sobre campos privados `#x` |
| `LocalDate.parse` | `esFechaValida` (`src/validaciones.ts`) |
| `List<Muestra>` + comprobaciones `null` | `Muestra[]` siempre inicializada; `muestras` devuelve una copia de solo lectura |
| `Math.random()` dentro de la sonda | Generador inyectable en `SondaTemperatura` para tests deterministas |
