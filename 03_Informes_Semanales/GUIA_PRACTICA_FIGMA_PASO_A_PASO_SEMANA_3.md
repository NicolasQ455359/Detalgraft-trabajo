# 🎨 GUÍA PRÁCTICA PASO A PASO: EJECUCIÓN EN FIGMA — SEMANA 3
## Sistema de Diseño, Design Tokens y Wireframes Lo-Fi Interactivos
**Proyecto:** Prácticas Empresariales | Detalgraf S.A.S. & DetalShop.com  
**Semana:** 3 (07/09/2026 – 11/09/2026)  
**Autor:** Nicolas Quintero Cardona

---

## 📑 ÍNDICE DE LA GUÍA

1. [Estructura del Archivo en Figma](#1-estructura-del-archivo-en-figma)
2. [Paso 1: Configurar Design Tokens (Local Variables y Estilos)](#paso-1-configurar-design-tokens-local-variables-y-estilos)
3. [Paso 2: Crear Grillas y Layout Styles](#paso-2-crear-grillas-y-layout-styles)
4. [Paso 3: Construcción de Componentes Atómicos (Auto Layout + Variantes)](#paso-3-construcción-de-componentes-atómicos-auto-layout--variantes)
   - Componente 1: Botón Primario / CTA con estados
   - Componente 2: Selector de Cantidad (Stepper)
   - Componente 3: Pestañas PDP (Tabs) con descarga de PDF
   - Componente 4: Barra de Progreso Reactiva del Carrito
   - Componente 5: Card de Cross-selling (1 Clic)
   - Componente 6: Timeline de Rastreo (4 Fases)
5. [Paso 4: Montaje de los 3 Wireframes Lo-Fi](#paso-4-montaje-de-los-3-wireframes-lo-fi)
   - Wireframe 1: PDP Dinámica (Desktop 1440px & Mobile 390px)
   - Wireframe 2: Smart Cart Drawer Lateral
   - Wireframe 3: Portal de Rastreo Universal (`/tracking`)
6. [Paso 5: Conexión de Prototipado Interactivo en Figma](#paso-5-conexión-de-prototipado-interactivo-en-figma)
7. [Checklist de Entrega](#checklist-de-entrega)

---

## 1. ESTRUCTURA DEL ARCHIVO EN FIGMA

Crea un nuevo archivo en Figma llamado:  
👉 `Detalgraf & DetalShop - UX System & Wireframes (Semana 3)`

Organiza las **Páginas (Pages)** en el panel izquierdo de Figma:
```
📄 01. Cover & Overview         -> Portada con datos del practicante, empresa y objetivos
📄 02. Design Tokens & Styles   -> Paleta de color, tipografía, espaciados y sombras
📄 03. Atomic Components        -> Master components con variantes y propiedades
📄 04. Wireframes Lo-Fi         -> Pantallas Desktop (1440px) y Mobile (390px)
📄 05. Prototype Flow           -> Flujos navegables conectados para test de usabilidad
```

---

## PASO 1: CONFIGURAR DESIGN TOKENS (LOCAL VARIABLES Y ESTILOS)

Ve a la página `02. Design Tokens & Styles` o abre el panel **Local Variables** (ícono de ajustes a la derecha cuando no hay nada seleccionado).

### A. Paleta de Colores (Local Variables / Color Styles)
Crea una colección llamada **`Colors`** y define:

| Nombre del Token | Valor HEX | Rol en el Diseño |
| :--- | :---: | :--- |
| `primary/default` | `#1A4B8C` | Azul institucional Detalgraf (Botones primarios, encabezados) |
| `primary/hover` | `#133869` | Estado hover de botones primarios |
| `secondary/success` | `#00A86B` | Verde éxito (Barra 100%, pedido mínimo alcanzado, badge stock) |
| `accent/amber` | `#E67E22` | Ámbar alerta (Barra <100%, saldo faltante en carrito) |
| `accent/blue` | `#0084FF` | Azul interactivo (Enlaces, etiquetas de ficha técnica, timeline activo) |
| `bg/body` | `#F8FAFC` | Fondo de página general (Gris muy suave y limpio) |
| `surface/card` | `#FFFFFF` | Fondo de tarjetas, cajón del carrito y modales |
| `surface/muted` | `#F1F5F9` | Fondo de inputs, pestañas inactivas y grillas |
| `text/main` | `#0F172A` | Texto principal (Títulos y datos de alto contraste) |
| `text/muted` | `#64748B` | Texto secundario, subtítulos y notas |
| `border/subtle` | `#E2E8F0` | Bordes de tarjetas, divisores e inputs |

### B. Tipografías (Text Styles)
Instala/activa las fuentes gratuitas de Google Fonts: **`Outfit`** e **`Inter`**.

1. **`H1 - Display`**: `Outfit` SemiBold (600), `32px`, Line height `120%`
2. **`H2 - Section`**: `Outfit` SemiBold (600), `24px`, Line height `130%`
3. **`H3 - Subtitle`**: `Outfit` Medium (500), `18px`, Line height `140%`
4. **`Body/Large`**: `Inter` Regular (400), `16px`, Line height `150%`
5. **`Body/Base`**: `Inter` Regular (400), `14px`, Line height `150%`
6. **`Body/Small`**: `Inter` Regular (400), `12px`, Line height `140%`
7. **`Numeric/Bold`**: `Inter` Bold (700), `18px` o `20px` (para subtotales y precios vivos)

### C. Espaciado y Radios de Borde (Number Variables)
Crea una colección **`Spacing & Radius`**:
* **Espaciados:** `space-xs = 8px`, `space-sm = 12px`, `space-md = 16px`, `space-lg = 24px`, `space-xl = 32px`
* **Radios de Borde:** `radius-sm = 6px`, `radius-md = 10px` (inputs y botones), `radius-lg = 16px` (cards y drawer), `radius-pill = 9999px`

---

## PASO 2: CREAR GRILLAS Y LAYOUT STYLES

Crea 2 estilos de Layout Grid en Figma:

1. **`Grid / Desktop 1440`**:
   - Tipo: **Columns** | Count: **12**
   - Margin: **80px** | Gutter: **24px** | Color: Rojo al 5% de opacidad.
2. **`Grid / Mobile 390`**:
   - Tipo: **Columns** | Count: **4**
   - Margin: **16px** | Gutter: **12px** | Color: Rojo al 5% de opacidad.

---

## PASO 3: CONSTRUCCIÓN DE COMPONENTES ATÓMICOS (AUTO LAYOUT + VARIANTES)

Ve a la página `03. Atomic Components`. Construye cada componente usando **Auto Layout (`Shift + A`)**:

---

### 🔹 Componente 1: Botón Primario / CTA (`Button/Primary`)

**Cómo crearlo:**
1. Escribe el texto: `"Agregar al Carrito"` (Fuente: Inter SemiBold 14px, color Blanco `#FFFFFF`).
2. Agrega un ícono a la izquierda: 🛒 (tamaño 20x20px).
3. Selecciona texto + ícono y presiona `Shift + A` (Auto Layout).
4. Ajustes del Frame:
   - Direction: Horizontal
   - Alignment: Center
   - Spacing between items: `8px`
   - Padding horizontal: `24px` | Padding vertical: `12px` (Altura resultante: `48px`).
   - Fill: `primary/default` (`#1A4B8C`).
   - Corner Radius: `10px`.
5. Convierte en Componente (`Ctrl + Alt + K` o botón "Create Component").
6. Añade variantes:
   - **`State=Default`**: Color `#1A4B8C`.
   - **`State=Hover`**: Color `#133869`.
   - **`State=Loading`**: Texto `"Agregando..."` + ícono de spinner rotativo.
   - **`State=Disabled`**: Fill `#E2E8F0`, texto `#94A3B8`.

---

### 🔹 Componente 2: Selector de Cantidad Dinámico (`Stepper/Quantity`)

**Cómo crearlo:**
1. Crea un botón circular o cuadrado `36x36px` con el texto `"-"` (Corner radius `8px`, Fill `#F1F5F9`, texto Inter SemiBold 16px).
2. Crea una caja de texto central para el número `" 12 "` (Ancho `48px`, Center aligned, Inter Bold 16px).
3. Crea el botón `"+"` idéntico al primero.
4. Selecciona los 3 elementos y aplica Auto Layout horizontal (`Shift + A`), Gap: `4px`, Padding: `4px`, Borde: `1px solid #E2E8F0`, Corner radius: `10px`.
5. Al lado o debajo agrega un texto de cálculo en vivo: `"Total: $194.000 COP"` (Inter SemiBold 14px, color `#1A4B8C`).

---

### 🔹 Componente 3: Pestañas PDP (`Tabs/Product`)

**Cómo crearlo:**
1. Crea 3 botones de pestaña horizontales con Auto Layout:
   - **Tab 1:** `"Descripción"` (Inactivo: fondo transparente, texto gris `#64748B`).
   - **Tab 2:** `"Especificaciones"` (Inactivo).
   - **Tab 3:** `"📄 Ficha Técnica (PDF)"` (Activo: borde inferior azul `#1A4B8C` de 3px o píldora con fondo `#1A4B8C` y texto blanco).
2. Crea el contenedor de contenido inferior (`Width: 100%`, Padding: `20px`, Borde: `1px solid #E2E8F0`, Radius: `12px`):
   - Muestra el resumen de ficha técnica: Registro INVIMA, pH, biodegradabilidad.
   - Botón CTA secundario: `[ ⬇️ Descargar Ficha Técnica Oficial PDF ]` (Fondo `#F1F5F9`, borde `#1A4B8C`, texto azul con ícono de PDF).

---

### 🔹 Componente 4: Barra de Progreso Reactiva del Carrito (`Cart/ProgressBar`)

**Cómo crearlo:**
1. **Selector de Zona (Segmented Control):**
   - Auto layout horizontal con dos opciones: `[ Bogotá ($100.000) ]` y `[ Nacional ($200.000) ]`.
   - La opción seleccionada tiene fondo blanco y sombra leve.
2. **Barra de Progreso:**
   - Frame contenedor: Ancho `100%` (ej. `360px`), Altura `10px`, Fill `#E2E8F0`, Radius `9999px`.
   - Frame interno (Relleno): Altura `10px`, Ancho `75%` (ej. `270px`), Fill `accent/amber` (`#E67E22`) si está incompleto, o `secondary/success` (`#00A86B`) si llega al 100%.
3. **Texto Dinámico de Estado:**
   - Si Subtotal < $100.000: `"⚠️ Te faltan $25.000 COP para completar tu pedido mínimo"`.
   - Si Subtotal >= $100.000: `"🎉 ¡Genial! Has alcanzado el pedido mínimo para despacho"`.

---

### 🔹 Componente 5: Card de Cross-selling en 1 Clic (`Card/CrossSell`)

**Cómo crearlo:**
1. Imagen cuadrada miniatura `48x48px` (placeholder con ícono o bote de producto, Radius `6px`).
2. Contenedor de texto (Auto Layout vertical):
   - Título del producto: `"Desengrasante Multiusos 1L"` (Inter SemiBold 13px).
   - Precio: `"$25.000 COP"` (Inter Bold 13px, color `#1A4B8C`).
3. Botón de acción rápida: `[ + Agregar ]` (Píldora pequeña, padding `6px 12px`, Inter Medium 12px, Fill `#1A4B8C`, texto Blanco).
4. Agrupa todo en Auto Layout horizontal con `Space between`, Padding: `12px`, Borde: `1px solid #E2E8F0`, Radius: `10px`, Fill `#FFFFFF`.

---

### 🔹 Componente 6: Timeline de Rastreo de 4 Fases (`Tracking/Timeline`)

**Cómo crearlo:**
1. Diseña el nodo de estado (Círculo `32x32px` con ícono de check o número):
   - Estado 1: `Completado` (Círculo verde `#00A86B` con check blanco).
   - Estado 2: `Activo / En curso` (Círculo azul `#0084FF` con pulso o borde grueso).
   - Estado 3: `Pendiente` (Círculo gris `#E2E8F0` con texto gris).
2. Conecta los 4 nodos con líneas horizontales de `2px` de grosor:
   - **Nodo 1:** *Pedido Confirmado* (Completado).
   - **Nodo 2:** *En Preparación* (Completado).
   - **Nodo 3:** *En Despacho / Tránsito* (Activo).
   - **Nodo 4:** *Entregado* (Pendiente).
3. Debajo de cada nodo, agrega su etiqueta y fecha/hora (ej: `"31 Ago, 14:30"`).

---

## PASO 4: MONTAJE DE LOS 3 WIREFRAMES LO-FI

Ve a la página `04. Wireframes Lo-Fi`. Crea los siguientes Frames:

### 🖥️ 1. Wireframe PDP Dinámica (Desktop `1440 × 1024px` y Mobile `390 × 844px`)
* **Header:** Barra superior con Logo DetalShop, buscador central, links de categorías y carrito `🛒 (3)`.
* **Breadcrumb:** `Inicio > Limpieza Institucional > Detergente Líquido 20L`.
* **Cuerpo en 2 Columnas (Desktop):**
  - **Columna Izquierda (Ancho 600px):** Galería de imágenes (Imagen principal de 500x500px + carrusel de miniaturas).
  - **Columna Derecha (Ancho 540px):**
    - Título H1: `"DETERGENTE LÍQUIDO CONCENTRADO 20L"`.
    - SKU / Marca / Calificación con estrellas.
    - Precio unitario: `"$48.500 COP"`.
    - Selector de Cantidad Dinámico (`Stepper` con subtotal vivo en tiempo real).
    - Botón primario: `[ 🛒 Agregar al Carrito ]`.
    - Botón secundario: `[ 💬 Cotizar por WhatsApp con un Asesor ]`.
* **Sección Inferior:** Módulo de Pestañas (`Tabs`) con la Ficha Técnica PDF y botón de descarga.

---

### 🛒 2. Wireframe Smart Cart Drawer (Slide-out lateral)
* **Desktop:** Frame superpuesto de `420px` de ancho anclado a la derecha, con un fondo semitransparente oscuro (`rgba(15, 23, 42, 0.4)`) cubriendo la PDP.
* **Contenido Interno (Auto Layout Vertical):**
  1. Header: `"Tu Carrito de Compras (2 productos)"` + botón `[ X ]` cerrar.
  2. Componente de **Barra de Progreso** ($100.000 / $200.000) con el aviso de cuánto falta.
  3. Lista de items agregados con control de cantidad `[-] 1 [+]` y botón eliminar.
  4. Sección **"Completa tu pedido mínimo (1 clic)"** con 1 o 2 Cards de Cross-sell de $25.000.
  5. Footer fijo:
     - Subtotal: `"$75.000 COP"`.
     - Aviso: `"Envío calculado en el siguiente paso"`.
     - Botón Checkout bloqueado/habilitado según la meta alcanzada.

---

### 📦 3. Wireframe Portal de Rastreo Universal (`/tracking`)
* **Header:** Logo Detalgraf + título `"Portal de Rastreo de Despachos"`.
* **Hero Search:**
  - Título central H1: `"Consulta el estado de tu despacho"`.
  - Subtítulo: *"Ingresa tu número de pedido Shopify, factura B2B o guía de transporte"*.
  - Input amplio con placeholder `"Ej: FE-8942 o #10423"` + Botón `[ 🔍 Rastrear ]`.
* **Card de Resultados:**
  - Resumen del despacho: Cliente, Ciudad de Destino, Transportadora y Número de Guía.
  - **Componente Timeline de 4 Estados** indicando la fase exacta en tiempo real.
  - Botón de soporte: `[ 💬 ¿Dudas con la entrega? Hablar con Logística por WhatsApp ]`.

---

## PASO 5: CONEXIÓN DE PROTOTIPADO INTERACTIVO EN FIGMA

Ve a la pestaña **Prototype** (arriba a la derecha en Figma):

1. **Abrir el Smart Cart Drawer:**
   - Selecciona el botón `[ 🛒 Agregar al Carrito ]` de la PDP.
   - Arrastra el conector azul hacia el Frame del Cart Drawer.
   - Trigger: `On Click`.
   - Action: `Open Overlay`.
   - Overlay Settings: `Top Right`, activa `Close when clicking outside` y `Add background (black 40%)`.
   - Animation: `Move In` -> From Right (300ms Ease Out).

2. **Cerrar el Cart Drawer:**
   - Selecciona el botón `[ X ]` dentro del Cart Drawer.
   - Trigger: `On Click` -> Action: `Close Overlay`.

3. **Interacción de Pestañas PDP:**
   - En la pestaña `"📄 Ficha Técnica (PDF)"`, conecta `On Click` -> `Change to` hacia la variante con el contenido técnico visible.

4. **Simulación de Cross-selling en el Carrito:**
   - En el botón `[ + Agregar ]` de la card de cross-sell, conecta `On Click` -> Transición hacia el estado del carrito donde el total sube a $100.000 y la barra de progreso cambia de **Ámbar (75%)** a **Verde (100% Pedido Completo)**.

5. **Consulta de Rastreo (`/tracking`):**
   - En el botón `[ 🔍 Rastrear ]`, conecta `On Click` -> `Navigate to` hacia la pantalla con el Timeline cargado.

---

## ✅ CHECKLIST DE ENTREGA — SEMANA 3

- [ ] **Variables y Tokens configurados:** Colores HSL/HEX, tipografías Inter/Outfit y espaciados 8pt.
- [ ] **Componentes con Auto Layout:** Botones, Stepper, Tabs, Barra de Progreso y Cards.
- [ ] **3 Wireframes en Desktop (1440px):** PDP, Cart Drawer y Portal de Rastreo.
- [ ] **Adaptaciones a Mobile (390px):** PDP y Drawer en pantalla completa.
- [ ] **Prototipo navegable básico:** Flujo de agregar al carrito, abrir cajón lateral y ver barra reactiva.
- [ ] **Exportación de capturas:** Guardar imágenes para incluir en el entregable o informe de avance.
