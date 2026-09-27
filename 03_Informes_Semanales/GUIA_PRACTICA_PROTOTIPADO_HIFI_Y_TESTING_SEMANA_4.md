# 🎨 GUÍA PRÁCTICA PASO A PASO: EJECUCIÓN EN FIGMA — SEMANA 4
## Prototipado en Alta Fidelidad (Hi-Fi), Micro-interacciones y Testing de Usabilidad
**Proyecto:** Prácticas Empresariales | Detalgraf S.A.S. & DetalShop.com  
**Semana:** 4 (14/09/2026 – 18/09/2026)  
**Autor:** Nicolas Quintero Cardona  

---

## 📑 ÍNDICE DE LA GUÍA

1. [Estructura del Archivo en Figma para la Semana 4](#1-estructura-del-archivo-en-figma-para-la-semana-4)
2. [Paso 1: Transformación de Activos de Lo-Fi a Hi-Fi](#paso-1-transformación-de-activos-de-lo-fi-a-hi-fi)
3. [Paso 2: Prompts de Ejecución para Codex / Figma MCP](#paso-2-prompts-de-ejecución-para-codex--figma-mcp)
   - Prompt Hi-Fi 1: PDP Desktop & Mobile en Alta Fidelidad
   - Prompt Hi-Fi 2: Smart Cart Drawer con Estados A/B (Ámbar ➔ Verde Reactivo)
   - Prompt Hi-Fi 3: Visor Modal de Ficha Técnica PDF y Portal de Tracking Hi-Fi
4. [Paso 3: Conexión de Micro-animaciones Avanzadas (Smart Animate)](#paso-3-conexión-de-micro-animaciones-avanzadas-smart-animate)
5. [Paso 4: Protocolo de Pruebas de Usabilidad con Usuarios](#paso-4-protocolo-de-pruebas-de-usabilidad-con-usuarios)
   - Guion de facilitación para las sesiones de prueba
   - Plantilla de toma de notas y cálculo del SUS Score
6. [Checklist de Cierre del Mes 1](#checklist-de-cierre-del-mes-1)

---

## 1. ESTRUCTURA DEL ARCHIVO EN FIGMA PARA LA SEMANA 4

En tu archivo maestro de Figma:  
👉 `Detalgraf & DetalShop - UX System & Wireframes`

Organiza las páginas en el panel lateral izquierdo agregando las nuevas secciones de Alta Fidelidad:

```
📄 01. Cover & Overview         -> Portada general de prácticas y equipo
📄 02. Design Tokens & Styles   -> Paleta HSL, variables locales y estilos de texto
📄 03. Atomic Components        -> Componentes maestros con variantes (Botón, Stepper, Tabs, etc.)
📄 04. Wireframes Lo-Fi         -> Wireframes estructurales en baja fidelidad (Completado en Sem 3)
📄 05. Prototipo Hi-Fi          -> Pantallas finales fotorrealistas con micro-interacciones (Sem 4)
📄 06. Usability Testing Flow   -> Flujo navegable exclusivo para test con usuarios reales
```

---

## PASO 1: TRANSFORMACIÓN DE ACTIVOS DE LO-FI A HI-FI

Para que el prototipo pase de un plano técnico a una tienda institucional realista:

1. **Fotografía de Producto:**
   * Sustituye los recuadros `[ Imagen principal ]` por imágenes nítidas en fondo transparente o blanco puro:
     - Garrafa industrial de 20L de Detergente Concentrado Detalgraf.
     - Galón de 5L de Desengrasante Multiusos.
     - Bobina industrial de papel secante institucional.
2. **Aplicación de Sombras (Shadow Tokens):**
   * Tarjetas en reposo: `0 4px 20px -2px rgba(15, 23, 42, 0.06)`.
   * Cart Drawer: `-12px 0 32px -4px rgba(15, 23, 42, 0.18)` con backdrop blur `4px`.
3. **Badges Institucionales:**
   * Badge verde esmeralda: `🟢 Despacho garantizado en 24-48h a Bogotá y Sabana`.
   * Certificación técnica: `📋 Registro Sanitario INVIMA & Biodegradabilidad OECD 301`.

---

## PASO 2: PROMPTS DE EJECUCIÓN PARA CODEX / FIGMA MCP

Utiliza estos prompts estructurados para que Codex genere directamente los Frames en alta fidelidad en la página `05. Prototipo Hi-Fi`:

---

### 🌟 PROMPT HI-FI 1: PDP Desktop y Mobile en Alta Fidelidad

```text
En la página "05. Prototipo Hi-Fi" de Figma, crea la versión en Alta Fidelidad (Hi-Fi) de la Ficha de Producto Dinámica (PDP) en Desktop (1440 × 1080px) y Mobile (390 × 1150px):

Ajustes visuales Hi-Fi:
1. En Desktop (1440px):
   - Header Hi-Fi: Barra superior con logo DetalShop, buscador institucional con placeholder enriquecido, links de categorías con efecto hover y botón de carrito "[ 🛒 Carrito (2) · $175.000 ]".
   - Galería de Producto: Contenedor principal con imagen fotorrealista de garrafa de 20L sobre fondo blanco impecable, badge flotante "Bestseller Institucional" y carrusel inferior de 4 vistas con borde azul activo en la miniatura seleccionada.
   - Columna de Compra:
     * Título H1: "DETERGENTE LÍQUIDO CONCENTRADO 20L" (Outfit SemiBold 30px, color #0F172A).
     * Fila de valor: SKU: DL-20L-IND | Registro INVIMA vigente | Calificación 4.9 ★★★★★ (24 clientes B2B).
     * Badge de logística: "🟢 Despacho prioritario en 24-48h a Bogotá y Alrededores" (fondo #ECFDF5, borde #A7F3D0, texto #065F46).
     * Precio destacado: "$48.500 COP" con IVA incluido (Inter Bold 28px, color #1A4B8C) y nota "Precio especial por estiba o volumen".
     * Stepper Hi-Fi con subtotal dinámico activo ("Total: $194.000 COP").
     * Botón Primario Hi-Fi: "[ 🛒 Agregar al Carrito ]" (alto 52px, fondo #1A4B8C, sombra suave azul).
     * Botón B2B Secundario: "[ 💬 Cotizar por Volumen con Asesor WhatsApp ]" (alto 48px, borde verde #00A86B, texto verde con icono WhatsApp).
   - Bloque Inferior de Pestañas: Ancho 1140px, pestaña activa "📄 Ficha Técnica y Certificados (PDF)", tarjeta técnica con tabla estilizada (pH, biodegradabilidad, registro) y botón llamativo de descarga oficial.

2. En Mobile (390px):
   - Mismo diseño adaptado con imagen táctil 350x350px y barra fija inferior (Sticky Bar) con precio y botón de compra rápido.
```

---

### 🛒 PROMPT HI-FI 2: Smart Cart Drawer con Estados Reactivos A y B

```text
En la página "05. Prototipo Hi-Fi" de Figma, crea los dos estados del Smart Cart Drawer para simular la micro-interacción de Pedido Mínimo:

1. Frame "Cart Drawer - Estado A (Incompleto)" (Ancho 420px, Alto 1024px, fondo #FFFFFF):
   - Cabecera: "Tu Carrito (1 producto)" + botón cerrar "[ ✕ ]".
   - Barra de Pedido Mínimo en Estado Alerta:
     * Switch de destino: [ Bogotá ($100k) ] activo y [ Nacional ($200k) ].
     * Barra de progreso al 48% en color ámbar (#E67E22).
     * Texto: "⚠️ Saldo actual: $48.500 / Meta: $100.000 (Faltan $51.500 COP para habilitar despacho)".
   - Item en Carrito: 1 Garrafa Detergente 20L ($48.500 COP) con control de cantidad.
   - Módulo de Cross-selling inteligente:
     * Título: "Completa tu pedido mínimo con estos insumos recomendados:"
     * Card 1: "Desengrasante Industrial 5L - $29.500 COP" con botón "[ + Agregar ]".
     * Card 2: "Bobina Papel Secante 300m - $25.000 COP" con botón "[ + Agregar ]".
   - Footer: Total $48.500 COP y botón "[ Proceder al Pago ]" en estado DESHABILITADO (fondo gris #E2E8F0, texto gris #94A3B8, cursor not-allowed).

2. Frame "Cart Drawer - Estado B (Meta Cumplida)" (Mismo tamaño, idéntico layout pero simulando la adición del Desengrasante y la Bobina):
   - Cabecera: "Tu Carrito (3 productos)".
   - Barra de Pedido Mínimo en Estado Éxito:
     * Barra al 100% en color verde esmeralda (#00A86B).
     * Texto: "🎉 ¡Felicitaciones! Has superado el pedido mínimo de $100.000 COP para despacho".
   - Total: "$103.000 COP" (Inter Bold 22px, #1A4B8C).
   - Botón "[ Proceder al Pago Seguro 🔒 ]" HABILITADO en color azul #1A4B8C con sombra suave.
```

---

### 📦 PROMPT HI-FI 3: Portal de Rastreo Hi-Fi y Visor Modal de PDF

```text
En la página "05. Prototipo Hi-Fi" de Figma, crea los siguientes 2 elementos finales:

1. Frame "Wireframe - Portal de Rastreo Hi-Fi" (1440 × 960px, fondo #F8FAFC):
   - Header institucional DetalShop.
   - Contenedor de 840px centrado:
     * Título H1: "Centro de Seguimiento y Logística de Despachos" (Outfit SemiBold 32px).
     * Buscador Hi-Fi: Input estilizado de 54px de alto con icono de paquete, texto "DTL-2026-8941" y botón azul oscuro "[ Rastrear Envío ]".
     * Card de Resultados Hi-Fi (fondo blanco, borde #E2E8F0, sombra suave, radius 16px):
       - Metadatos: Factura B2B #FE-8942 | Transportadora: Envía / Flota Detalgraf | Guía: 0293848123 | Destino: Bogotá D.C.
       - Timeline de 4 estados activo en Fase 3 ("En Despacho / Tránsito").
       - Historial cronológico con viñetas conectadas por línea vertical gris.
       - Botón directo: "[ 💬 Contactar al Conductor o Logística por WhatsApp ]" (#00A86B).

2. Frame "Modal - Visor Ficha Técnica PDF" (Ancho 600px, Alto 720px, fondo blanco, radius 16px, sombra modal pronunciada):
   - Cabecera: "Ficha Técnica Oficial — Detergente Líquido 20L Detalgraf" + botón "[ X ]".
   - Vista previa gráfica del documento PDF con membrete oficial, datos de laboratorio y sello INVIMA.
   - Barra inferior: Botón primario "[ ⬇️ Descargar Archivo PDF Original (1.2 MB) ]" (#1A4B8C).
```

---

## PASO 3: CONEXIÓN DE MICRO-ANIMACIONES AVANZADAS (SMART ANIMATE)

Ve a la pestaña **`Prototipo`** en Figma y configura la micro-animación estrella para sorprender a la gerencia:

### 🪄 El efecto de "Desbloqueo de Pedido Mínimo":
1. Abre el Frame `Cart Drawer - Estado A (Incompleto)`.
2. Selecciona el botón `[ + Agregar ]` de la card de cross-sell (o el control de cantidad).
3. Arrastra la flecha azul hacia el Frame `Cart Drawer - Estado B (Meta Cumplida)`.
4. En el panel de interacción:
   * **Trigger:** `On click`
   * **Action:** `Change to` (o `Navigate to`)
   * **Animation:** **`Smart Animate`**
   * **Easing:** `Ease Out` | **Duración:** `300ms`

> **Resultado visual:** Cuando hagas clic en el botón en modo presentación, la barra de progreso crecerá fluidamente de color naranja a verde y el total se actualizará sin saltos bruscos.

---

## PASO 4: PROTOCOLO DE PRUEBAS DE USABILIDAD CON USUARIOS

Para validar la experiencia antes del desarrollo, aplica este guion de prueba rápida con 3 a 5 personas:

### 🎙️ Guion de Facilitación (10 minutos por sesión)

```text
"Hola [Nombre]. Gracias por ayudarnos a probar esta nueva versión de la tienda online de Detalgraf / DetalShop. 
Queremos ver si la página es fácil y clara para ti. Recuerda que no te estamos evaluando a ti, sino evaluando la interfaz. 
Por favor, piensa en voz alta mientras navegas y dime todo lo que te llame la atención o te genere dudas."
```

### 📋 Las 3 Tareas de Prueba:
* **Tarea 1 (Ficha Técnica):**  
  *"Imagina que necesitas comprar detergente para tu empresa y tu jefe te pide el documento técnico oficial para seguridad industrial. Encuentra la ficha técnica y descárgala."*
* **Tarea 2 (Pedido Mínimo y Cross-selling):**  
  *"Agrega el producto al carrito. La tienda te avisará que falta saldo para el pedido mínimo de despacho a Bogotá. Completa la meta utilizando las opciones rápidas del carrito y avanza hacia el pago."*
* **Tarea 3 (Rastreo en vivo):**  
  *"Revisa en qué estado se encuentra tu pedido con el número DTL-2026-8941."*

### 📊 Plantilla de Evaluación del SUS Score (System Usability Scale)
Pídele a cada usuario que califique de 1 (Totalmente en desacuerdo) a 5 (Totalmente de acuerdo):

1. Creo que me gustaría usar este sistema con frecuencia.
2. Encontré el sistema innecesariamente complejo.
3. Pensé que el sistema era fácil de usar.
4. Creo que necesitaría del apoyo de una persona técnica para usarlo.
5. Sentí que las diversas funciones estaban bien integradas.
6. Pensé que había demasiada inconsistencia en este sistema.
7. Imagino que la mayoría de la gente aprendería a usar este sistema rápidamente.
8. Encontré el sistema muy engorroso de usar.
9. Me sentí muy seguro/a usando el sistema.
10. Necesité aprender muchas cosas antes de poder empezar con el sistema.

> **Cálculo:**  
> - Suma de preguntas impares (1, 3, 5, 7, 9): restar 1 a cada respuesta.  
> - Suma de preguntas pares (2, 4, 6, 8, 10): restar la respuesta a 5.  
> - Suma total multiplicada por `2.5` = **Puntaje SUS final (0 - 100)**. Meta: Superar los **80 puntos (Grado A+)**.

---

## ✅ CHECKLIST DE CIERRE DEL MES 1

- [ ] **Página 05 (Hi-Fi) creada:** Pantallas con fotografías de producto, sombras e inputs completos.
- [ ] **Estados A y B del Carrito modelados:** Simulación fluida de $75k a $100k con Smart Animate.
- [ ] **Visor Modal de PDF conectado:** Simulación de visualización y descarga de documento técnico.
- [ ] **Pruebas de usabilidad ejecutadas:** Al menos 3 usuarios evaluados con tiempos y métricas SUS.
- [ ] **Informe de la Semana 4 completado:** Documento oficial listo para entrega a Gerencia y Universidad.
- [ ] **Enlace de Figma verificado:** Permisos de lectura abiertos para la presentación ejecutiva.
