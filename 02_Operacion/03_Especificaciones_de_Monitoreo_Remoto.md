# Especificaciones Técnicas: Monitoreo Remoto de Impresoras

Este documento detalla la infraestructura tecnológica, lógica de extracción y estrategias de despliegue para el control automatizado y remoto de la flota de impresoras en renta.

---

## 1. Arquitectura del Agente (Probe)
El agente es un "puente" lógico ligero (script en Python o contenedor Docker) que reside en la red local del cliente. Su función es interrogar a los dispositivos y enviar la telemetría al orquestador central.

### 1.1 Comparativa de Métodos de Extracción
Se evaluaron dos enfoques técnicos para la captura de datos, seleccionando **SNMP** como el estándar operativo:

| Característica | Lectura SNMP (Estandarizado) | Web Scraping (Puppeteer/Node) |
| :--- | :--- | :--- |
| **Consumo de Recursos** | **Extremadamente Bajo**: Consultas de pocos bytes. | **Alto**: Requiere levantar un navegador en memoria. |
| **Velocidad** | Instantánea (milisegundos). | Lenta (segundos por equipo). |
| **Estabilidad** | Alta: Protocolo diseñado para gestión. | Baja: Sensible a cambios en el firmware/web. |
| **Fiabilidad** | Diseñado para monitoreo profesional. | Propenso a bloqueos de la interfaz web. |

---

## 2. Variables y Telemetría Granular
El sistema debe recolectar y estructurar los siguientes puntos de datos para su procesamiento en ERPNext:

### A. Gestión de Facturación (Contadores)
*   **Total Page Count**: Conteo acumulado histórico (Vida del equipo).
*   **Color vs Mono**: Desglose crítico para contratos con tarifas diferenciadas.
*   **Scan/Copy Count**: Monitoreo de uso de funciones multifuncionales.

### B. Mantenimiento Preventivo (Insumos)
*   **Niveles de Tóner (C, M, Y, K)**: Porcentaje restante para logística proactiva de consumibles.
*   **Vida de Kits de Mantenimiento**: Porcentaje de desgaste de tambores, fusores y rodillos.

### C. Alertas Técnicas (Eventos en Tiempo Real)
*   **Device Status**: Detección de estados (Atasco de papel, Puerta abierta, Sin papel).
*   **Log de Errores**: Captura de códigos específicos para diagnóstico remoto antes de la visita técnica.

---

## 3. Infraestructura y Hardware en Sitio

### 3.1 Modelos de Dispositivos (SBC)

| Hardware | Viabilidad | Observaciones |
| :--- | :--- | :--- |
| **Orange Pi Zero 3** | **Recomendada (Costo/Beneficio)** | Pequeña, barata y con Ethernet nativa. Ideal para despliegues masivos. |
| **Raspberry Pi 3B+** | **Recomendada (Estabilidad)** | Puerto Ethernet nativo, muy robusta para racks empresariales. |
| **PC del Cliente** | **Uso en Pilotos** | Sin costo de hardware, pero depende de que la PC no sea apagada. |

> [!IMPORTANT]
> Para cualquier SBC (Raspberry/Orange), es obligatorio el uso de tarjetas **MicroSD High Endurance** (grado industrial) para prevenir la corrupción de datos por fallos eléctricos.

### 3.2 Estrategia de Red Redundante
Para garantizar la continuidad del servicio sin causar conflictos de red:
*   **Interferencia**: SNMP es ultra-ligero; múltiples consultas concurrentes no estresan al equipo.
*   **Deduplicación en n8n**: Se prefiere un esquema donde varios agentes puedan reportar (redundancia), y el orquestador descarte reportes duplicados de una misma impresora en un rango de 5 minutos.

---

## 4. Seguridad y Cumplimiento
1. **Comunicación Outbound**: El agente inicia la conexión hacia la nube; no se requiere abrir puertos en el firewall del cliente.
2. **SNMP v3**: Siempre que el equipo lo soporte, se usará la versión 3 por su capacidad de cifrado y autenticación.
3. **Comunidad Read-Only**: El acceso a la impresora debe ser estrictamente de "Solo Lectura".
