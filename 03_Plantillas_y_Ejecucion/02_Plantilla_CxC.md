# Plantilla: Control de Cuentas por Cobrar (CxC)

Este formato es el paso previo a la carga masiva en ERPNext. Úsese para limpiar la información actual.

| Cliente | # Factura | Fecha Emisión | Fecha Venc. | Monto ($) | Estatus | Días de Atraso | Observaciones |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| Ejemplo S.A. | F-123 | 2026-01-01 | 2026-01-15 | 2,500.00 | Pendiente | 0 | Promesa de pago martes |
| | | | | | | | |
| | | | | | | | |
| | | | | | | | |

---
### Instrucciones de Llenado:
1. **Monto**: Siempre en moneda nacional sin mezclar con otros conceptos.
2. **Estatus**: Usar solo: `Pendiente`, `Pagada`, `Vencida`, `Cancelada`.
3. **Registro**: Cada factura es una fila independiente.
