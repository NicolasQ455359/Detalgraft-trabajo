# MASTER PROMPT PARA CODEX: SISTEMA DE ICONOS VECTORIALES SVG Y COMPONENTES FIGMA B2B

> **Propósito:** Proporcionar a **Codex** (o cualquier asistente de código/diseño en Figma) la instrucción maestra definitiva para generar el sistema completo de iconos vectoriales SVG con identidad corporativa propia para **Detalgraf S.A.S. / DetalShop.com**, erradicando por completo el aspecto de emojis 3D o gráficos genéricos generados por IA.

---

## 📋 INSTRUCCIONES DE USO
Copia todo el bloque delimitado dentro del cuadro **`[INICIO PROMPT PARA CODEX]`** y pégalo directamente en Codex (o en tu plugin de Figma / LLM).

---

```markdown
[INICIO PROMPT PARA CODEX]

# ROL Y OBJETIVO
Actúa como un **Senior Design Systems Architect y Especialista en Iconografía Vectorial SVG**.
Tu misión es diseñar y codificar en formato SVG limpio (y como componentes de Figma) el sistema de iconografía oficial para **"DetalShop.com"** (unidad de comercio electrónico de **Detalgraf S.A.S.**), una empresa colombiana B2B líder en suministro de químicos industriales, bioseguridad, aseo profesional y dotación institucional.

# PROBLEMA A RESOLVER
El diseño actual utiliza emojis 3D genéricos estilo "clay/plastilina" (jabón rosado 3D, guante morado 3D, taza 3D, caja de cartón 3D, chaleco 3D). Esto genera desconfianza empresarial, se percibe como una plantilla generada por IA sin identidad de marca y no proyecta la solidez técnica, química y legal que exige un comprador corporativo o jefe de compras en Colombia.

# DIRECTRICES DE IDENTIDAD VISUAL Y ESTILO (DESIGN TOKENS)
1. **Estilo Gráfico:** Monoline técnico industrial con acentos duotono limpios. Sin gradientes borrosos ni sombras 3D de baja calidad.
2. **Rejillas y ViewBox:**
   - **Tamaño Base (UI y Garantías):** `viewBox="0 0 24 24"`, dimensiones `24x24 px`.
   - **Tamaño Destacado (Líneas Institucionales / Categorías):** `viewBox="0 0 48 48"`, dimensiones `48x48 px`.
3. **Trazo (Stroke):**
   - Espesor uniforme de `stroke-width="2"` en iconos de 24px y `stroke-width="2.5"` en iconos de 48px.
   - Terminaciones: `stroke-linecap="round"` y `stroke-linejoin="round"`.
   - Relleno: `fill="none"` por defecto, con capas de acento opcionales usando opacidades sutiles (`fill="rgba(26, 75, 140, 0.08)"`).
4. **Paleta Cromática Institucional:**
   - **Azul Primario Corporativo:** `#1A4B8C` (Confianza, química, corporativo).
   - **Azul Secundario Sombra:** `#005091` / `#0F172A` (Estructura, contraste).
   - **Verde Acento Operativo:** `#00A86B` (Aprobación, entrega rápida, bioseguridad ambiental).
   - **Ámbar / Precaución Técnica:** `#F39C12` (Alertas operativas, pendientes).
   - **Superficie de Contenedor:** `#F8FAFC` con borde `#E2E8F0`.

---

# TAXONOMÍA COMPLETA DE ICONOS A GENERAR

Debes entregar el código SVG semántico, optimizado (sin tags basura de Illustrator) y las especificaciones para convertirlos en componentes en Figma para los siguientes 5 bloques:

---

### BLOQUE 1: BARRA DE PROPUESTAS DE VALOR Y GARANTÍAS (ViewBox 24x24)
1. **`icon-shipping-truck` (Envío Gratis B2B):**
   - *Metáfora visual:* Camión de reparto institucional tipo furgón de carga urbana con cabina aerodinámica y línea de movimiento horizontal en la base (NO camión de juguete ni emoji amarillo).
   - *Trazo:* 2px, Navy `#1A4B8C` con acento verde en la cabina o detalle de rueda.
2. **`icon-express-clock` (Entregas 24 a 48 Horas):**
   - *Metáfora visual:* Cronómetro técnico o reloj de precisión con manecillas marcando velocidad y un rayo angular integrado de despacho prioritario.
3. **`icon-dian-shield` (Facturación DIAN Legal):**
   - *Metáfora visual:* Escudo de seguridad perimetral que contiene en su interior un documento con líneas de datos contables y un check `✓` de validación legal tributaria.
4. **`icon-b2b-support` (Soporte Corporativo WhatsApp):**
   - *Metáfora visual:* Auricular/diadema de atención empresarial o burbuja de diálogo con dos líneas de conversación formal y ondas de conexión directa.

---

### BLOQUE 2: LÍNEAS INSTITUCIONALES / CATEGORÍAS (ViewBox 48x48)
*Estos iconos reemplazarán a los 5 emojis 3D de la página de inicio y el catálogo:*

1. **`cat-aseo-profesional` (Aseo Profesional):**
   - *Metáfora visual:* Garrafa industrial/bidón institucional de 20 Litros con asa superior reforzada, tapón dosificador ergonómico y franja graduada de nivel de líquido en el costado con una gota química limpia.
   - *NO hacer:* Pastilla de jabón de tocador rosada.
2. **`cat-bioseguridad` (Bioseguridad y Protección):**
   - *Metáfora visual:* Guante de nitrilo clínico en perspectiva anatómica técnica sobre un escudo perimetral con cruz médica o de salubridad central.
   - *NO hacer:* Guante de lavar platos de cocina morado inflado.
3. **`cat-cafeteria` (Cafetería Empresarial):**
   - *Metáfora visual:* Jarra térmica dispensadora de acero inoxidable institucional con palanca de servicio o taza corporativa sobria con dos granos de café estilizados y vapor lineal minimalista.
   - *NO hacer:* Taza de caricatura 3D.
4. **`cat-papeleria` (Papelería y Descartables):**
   - *Metáfora visual:* Bobina industrial de papel secante jumbo con centro cilíndrico visible y una hoja desplegándose con corte limpio y líneas técnicas de metraje (300m).
   - *NO hacer:* Caja de encomienda de cartón genérica.
5. **`cat-seguridad-industrial` (Seguridad Industrial y Dotación):**
   - *Metáfora visual:* Casco de protección industrial de perfil con visor envolvente y barbiquejo de anclaje, acompañado de lentes de seguridad química superpuestos.
   - *NO hacer:* Chaleco reflectivo de juguete.

---

### BLOQUE 3: STEPPER DE RASTREO LOGÍSTICO (4 ESTADOS) (ViewBox 24x24)
1. **`step-order-confirmed` (1. Pedido Recibido y Facturado DIAN):**
   - Documento contable con sello de factura electrónica y visto bueno.
2. **`step-warehouse-prep` (2. Alistamiento y Control de Calidad en Bodega):**
   - Estiba o caja paletizada con checklist de verificación de lotes y fechas de vencimiento.
3. **`step-in-transit` (3. Despacho en Ruta / Móvil Asignado):**
   - Furgón en movimiento con ondas de señal GPS o punto de geolocalización.
4. **`step-delivered` (4. Entregado en Sede / Conforme):**
   - Mano recibiendo paquete o tabla de recepción con firma de recibido a satisfacción.

---

### BLOQUE 4: CARRITO Y MÓDULO INTELIGENTE DE PEDIDO MÍNIMO (ViewBox 24x24)
1. **`ui-cart-b2b`:** Carrito de compras robusto con indicador de volumen.
2. **`ui-target-progress`:** Diana o flecha alcanzando la barra de umbral de despacho gratuito ($100k / $200k).
3. **`ui-trash-clean`:** Papelera lineal minimalista para descartar items sin alertar visualmente de forma agresiva.
4. **`ui-sparkle-complete`:** Destello de éxito sutil para notificar que el producto agregado cubre el 100% del saldo faltante.

---

# ESTRUCTURA DE RESPUESTA QUE DEBES ENTREGAR:
1. **Colección de Código SVG:** Para cada uno de los iconos solicitados, entrega el bloque `<svg>` completo, validado, auto-contenido y listo para usar como componente o archivo `.svg` exportable.
2. **Estructura de Componentes en Figma:** Instrucciones detalladas de cómo agruparlos en un Frame llamado `Library / Icons / Detalgraf-B2B` usando:
   - Variantes por tamaño: `Size: 24px` | `Size: 48px`.
   - Variantes por color/estado: `Color: Navy (#1A4B8C)` | `Green (#00A86B)` | `Monochrome (#0F172A)`.
   - Propiedad booleana: `HasContainer: true / false` (caja contenedora `#F8FAFC` con radio de 8px y borde `#E2E8F0`).

[FIN PROMPT PARA CODEX]
```

---

## 🎨 PALETA DE REFERENCIA RÁPIDA PARA FIGMA

| Token de Color | Hex | Uso en la Iconografía |
| :--- | :--- | :--- |
| **`brand-primary`** | `#1A4B8C` | Trazos principales de los iconos, énfasis institucional |
| **`brand-secondary`** | `#005091` | Trazos secundarios, detalles estructurales |
| **`brand-success`** | `#00A86B` | Entregas completadas, checks de DIAN, pedidos cumplidos |
| **`brand-warning`** | `#F39C12` | Alertas de saldo faltante, pedidos pendientes en bodega |
| **`surface-icon`** | `#F8FAFC` | Fondo de los contenedores circulares o cuadrados en tarjetas |
| **`border-icon`** | `#E2E8F0` | Borde de 1px perimetral en los botones y tarjetas |
| **`text-dark`** | `#0F172A` | Títulos y etiquetas de categorías en la interfaz |

---

## 📐 ESPECIFICACIONES TÉCNICAS SVG

Para garantizar que los iconos funcionen perfectamente tanto en **Figma** como directamente en los templates `.liquid` de Shopify y código HTML de Wix:

```xml
<!-- Estructura estándar 24px para UI, Garantías y Stepper -->
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1A4B8C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <!-- Rutas vectoriales optimizadas -->
</svg>

<!-- Estructura estándar 48px para Líneas Institucionales (Tarjetas de Inicio) -->
<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="#1A4B8C" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
  <!-- Rutas vectoriales optimizadas con mayor riqueza de detalle técnico -->
</svg>
```
