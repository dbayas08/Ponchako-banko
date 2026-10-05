# Pochanko banko

Aplicación local-first para entender ingresos, gastos y hábitos financieros. Esta primera fase contiene una interfaz navegable con datos ficticios y no conecta con bancos ni servicios externos.

## Ejecutar en local

```bash
npm install
npm run dev
```

Después, abre [http://localhost:3000](http://localhost:3000).

Comandos de calidad:

```bash
npm run lint
npm run typecheck
npm test
```


## Privacidad

- No se almacenan credenciales bancarias.
- Los datos de ejemplo son ficticios.
- Los CSV bancarios, PDFs y archivos `.env` están excluidos de Git mediante `.gitignore`.
- Para una copia de seguridad futura, guarda una copia local de la base de datos en un disco seguro y separado. Nunca subas esa copia al repositorio.

## Próximas fases

Persistencia SQLite local, importadores CSV para Revolut/Santander/genérico, edición de categorías y movimientos, presupuestos, exportación PDF y pruebas de importación.
