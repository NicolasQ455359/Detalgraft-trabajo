# INFORME DE SISTEMA DE DISEÑO, DESIGN TOKENS Y WIREFRAMES LO-FI — SEMANA 3
## Proyecto de Prácticas Empresariales | Detalgraf S.A.S. & DetalShop.com

**Fecha:** Semana 3 (07/09/2026 – 11/09/2026)  
**Elaborado por:** Nicolas Quintero Cardona  
**Objetivo:** Establecer el Sistema de Diseño unificado (Design System & Tokens), definir la arquitectura de componentes y construir la estructura de Wireframes Lo-Fi navegables en Figma para las 3 soluciones clave: Ficha de Producto Dinámica (PDP), Smart Cart Drawer y Portal de Rastreo (`/tracking`).

---

## 1. IDEAS DE SOLUCIÓN E HITOS VISUALES

Tras los User Flows definidos en la Semana 2, se consolidan los 3 hitos de solución que guían el diseño:

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                      HITOS VISUALES Y SOLUCIONES CLAVE                          │
└─────────────────────────────────────────────────────────────────────────────────┘
         │                                 │                                │
         ▼                                 ▼                                ▼
┌─────────────────┐               ┌─────────────────┐              ┌─────────────────┐
│ 1. PDP Dinámica │               │ 2. Smart Cart   │              │ 3. Universal    │
│    & Modular    │               │    Drawer       │              │    Tracking     │
├─────────────────┤               ├─────────────────┤              ├─────────────────┤
│ • Subtotal vivo │               │ • Barra $100k / │              │ • Buscador con  │
│ • Tabs para PDF │               │   $200k reactiva│              │   multi-id      │
│ • Selector +/-  │               │ • Cross-sell de │              │ • Timeline de   │
│   reactivo      │               │   1 solo clic   │              │   4 estados     │
└─────────────────┘               └─────────────────┘              └─────────────────┘
```

1. **Hito 1 — PDP Modular & Dinámica:** Convertir la ficha de producto estática en un panel interactivo que responde en tiempo real a las cantidades y expone la ficha técnica en PDF con 1 clic.
2. **Hito 2 — Smart Cart Drawer Transparente:** Erradicar el rebote en el checkout guiando al comprador visualmente sobre cuánto le falta para el pedido mínimo ($100.000 Bogotá / $200.000 Nacional) y ofreciéndole adiciones rápidas.
3. **Hito 3 — Portal de Rastreo Universal (`/tracking`):** Brindar autonomía de consulta tanto a compradores B2C (Shopify) como a clientes corporativos B2B (Wix) mediante un buscador unificado y timeline visual.

---

## 2. CONCEPTO DEL PRODUCTO & DESIGN TOKENS (FIGMA VARIABLES)

Se crea el sistema de variables globales para garantizar consistencia visual entre Shopify (DetalShop) y Wix (Detalgraf), facilitando además la exportación a CSS nativo en el Mes 2 y 3.

### 🎨 A. Paleta de Colores (Formato HSL / HEX)

| Token Figma / CSS Variable | HEX | HSL | Rol semántico & Uso |
| :--- | :---: | :---: | :--- |
| `--color-primary` | `#1A4B8C` | `hsl(214, 68%, 33%)` | Azul Corporativo Detalgraf (Botones primarios, Headers, Énfasis) |
| `--color-primary-hover` | `#133869` | `hsl(214, 70%, 24%)` | Hover de botones y elementos interactivos primarios |
| `--color-secondary` | `#00A86B` | `hsl(158, 100%, 33%)` | Verde Éxito / Conversión (Barra 100%, Pedido mínimo cumplido, Badge stock) |
| `--color-accent-amber` | `#E67E22` | `hsl(28, 80%, 52%)` | Ámbar / Alerta (Barra incompleta de pedido mínimo, Saldo faltante) |
| `--color-accent-blue` | `#0084FF` | `hsl(209, 100%, 50%)` | Enlaces, Tags de información técnica y Timeline de despacho activo |
| `--color-bg-body` | `#F8FAFC` | `hsl(210, 40%, 98%)` | Fondo general de páginas y canvas de aplicación |
| `--color-surface-card` | `#FFFFFF` | `hsl(0, 0%, 100%)` | Superficie de tarjetas, cajón del carrito y modales |
| `--color-surface-muted` | `#F1F5F9` | `hsl(210, 40%, 96%)` | Fondos de inputs, tabs inactivas y divisores |
| `--color-text-main` | `#0F172A` | `hsl(222, 47%, 11%)` | Tipografía principal (Títulos y textos de alto contraste) |
| `--color-text-muted` | `#64748B` | `hsl(215, 16%, 47%)` | Subtítulos, labels secundarios y notas aclaratorias |
| `--color-border-subtle` | `#E2E8F0` | `hsl(214, 32%, 91%)` | Bordes de inputs, divisores y contornos de tarjetas |

---

### ✍️ B. Tipografía (Google Fonts: *Inter* & *Outfit*)

* **Fuente Display / Títulos:** **Outfit** (Moderna, geométrica, de gran impacto comercial).
* **Fuente UI / Cuerpo de Texto:** **Inter** (Alta legibilidad en números, tablas y textos pequeños).

| Nivel Tipográfico | Fuente | Tamaño (px / rem) | Peso | Line Height | Uso |
| :--- | :--- | :---: | :---: | :---: | :--- |
| **Display H1** | Outfit | `32px / 2.0rem` | SemiBold (600) | `1.2` | Títulos principales de PDP y `/tracking` |
| **Heading H2** | Outfit | `24px / 1.5rem` | SemiBold (600) | `1.3` | Títulos de Cart Drawer y Secciones |
| **Heading H3** | Outfit | `18px / 1.125rem` | Medium (500) | `1.4` | Títulos de Cross-selling y Tabs |
| **Body Large** | Inter | `16px / 1.0rem` | Regular (400) | `1.5` | Párrafos descriptivos y precios destacados |
| **Body Base** | Inter | `14px / 0.875rem` | Regular (400) | `1.5` | Textos generales de UI, botones y labels |
| **Body Small** | Inter | `12px / 0.75rem` | Regular (400) | `1.4` | Micro-textos, notas de envío y leyendas |
| **Numeric Highlight** | Inter | `18px / 1.125rem` | Bold (700) | `1.2` | Subtotales dinámicos y contadores |

---

### 📐 C. Sistema de Espaciado (8pt Grid System) y Bordes

* `--space-2xs`: `4px` (Alineaciones micro / iconos)
* `--space-xs`: `8px` (Gaps en botones y badges)
* `--space-sm`: `12px` (Padding interno de inputs)
* `--space-md`: `16px` (Padding estándar de cards y modales)
* `--space-lg`: `24px` (Separación entre secciones internas)
* `--space-xl`: `32px` (Gaps de layout)
* `--space-2xl`: `48px` (Márgenes de secciones principales)

**Radios de Borde (Border Radius):**
* `--radius-sm`: `6px` (Badges y tags pequeños)
* `--radius-md`: `10px` (Botones, inputs y selectores de cantidad)
* `--radius-lg`: `16px` (Cards, Cart Drawer y Contenedores)
* `--radius-full`: `9999px` (Píldoras y avatares)

---

### 🌫️ D. Elevaciones y Sombras (Shadows)

* `--shadow-sm`: `0 1px 2px 0 rgba(0, 0, 0, 0.05)` (Tarjetas en reposo e inputs)
* `--shadow-md`: `0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.05)` (Cards en hover)
* `--shadow-drawer`: `-8px 0 24px -4px rgba(15, 23, 42, 0.15)` (Slide-out Cart Drawer lateral)

---

## 3. ESTRUCTURA DE LA EXPERIENCIA Y COMPONENTES ATÓMICOS

Se definen las especificaciones de los 6 componentes nucleares para los Wireframes Lo-Fi:

```
┌───────────────────────────┐      ┌───────────────────────────┐
│ 1. BOTÓN PRIMARIO / CTA   │      │ 2. SELECTOR DE CANTIDAD   │
├───────────────────────────┤      ├───────────────────────────┤
│ [ 🛒 Agregar al Carrito ] │      │  [ - ]   [ 12 ]   [ + ]   │
│ Estados: Default, Hover,  │      │ Auto-recalcula subtotal   │
│ Loading (Micro-animación) │      │ al pulsar o digitar       │
└───────────────────────────┘      └───────────────────────────┘

┌───────────────────────────┐      ┌───────────────────────────┐
│ 3. PESTAÑAS MODULARES PDP │      │ 4. BARRA DE PEDIDO MÍNIMO │
├───────────────────────────┤      ├───────────────────────────┤
│ [Desc] [Espec.] [📄 PDF] │      │ [==== 70% ======       ]  │
│ Tab PDF con botón directo │      │ Switch: [Bogotá][Nacional]│
│ de descarga oficial       │      │ Texto reactivo de saldo   │
└───────────────────────────┘      └───────────────────────────┘
```

1. **Botón Primario / CTA:**
   * Altura fija `48px` en Desktop / `52px` en Mobile para área táctil óptima.
   * Estados: *Default*, *Hover*, *Active*, *Loading ("Agregando...")*, *Disabled*.
2. **Stepper / Selector de Cantidad Dinámico:**
   * Controles `[-]` e `[+]` con input numérico central editable.
   * Micro-interacción: Cambia inmediatamente el label de precio `Total: $XX.XXX`.
3. **Módulo de Pestañas PDP (Tabs Component):**
   * Pestaña 1: *Descripción Comercial*.
   * Pestaña 2: *Especificaciones y Gramajes*.
   * Pestaña 3: *Ficha Técnica Oficial PDF* (con botón de vista previa y descarga directa).
4. **Barra de Progreso Reactiva del Carrito:**
   * Switch superior para seleccionar destino (`Bogotá ($100k)` vs `Nacional ($200k)`).
   * Barra proporcional dinámica: `(Subtotal / Meta) * 100%`.
   * Cambio de color: Ámbar (<100%) a Verde (>=100%).
5. **Card de Cross-selling (Adición Rápida en 1 Clic):**
   * Imagen miniatura (48x48px), nombre del producto, precio unitario y botón `+ Agregar`.
6. **Timeline de Rastreo (4 Fases):**
   * Estados: `1. Pedido Confirmado` ➔ `2. En Preparación` ➔ `3. En Despacho / Tránsito` ➔ `4. Entregado`.

---

## 4. ARQUITECTURA DE LA INTERFAZ EN FIGMA (LAYOUT & GRIDS)

Para la diagramación en Figma, se configuran las siguientes grillas maestras:

* **Desktop (Frame: `1440px × 1024px`):**
  * Grilla: **12 Columnas**.
  * Márgenes laterales: `80px`.
  * Medianil (*Gutter*): `24px`.
  * Cart Drawer ancho: `420px` anclado a la derecha sobre backdrop semitransparente.

* **Mobile (Frame: `390px × 844px` - iPhone 14/15/16 Base):**
  * Grilla: **4 Columnas**.
  * Márgenes laterales: `16px`.
  * Medianil (*Gutter*): `12px`.
  * Cart Drawer: `100%` ancho de pantalla.

---

## 5. ESPECIFICACIÓN DE WIREFRAMES LO-FI NAVEGABLES

A continuación se presentan los planos esquemáticos en baja fidelidad (Lo-Fi) para montar en Figma:

### 📱 Wireframe 1: Ficha de Producto (PDP) en Desktop y Mobile

```text
+-------------------------------------------------------------------------------+
| [Logo DetalShop]         [Buscar producto...]          [Mi Cuenta]  [🛒 (3)]   |
+-------------------------------------------------------------------------------+
| Breadcrumb: Inicio > Limpieza Institucional > Detergente Líquido 20L          |
|                                                                               |
| +-------------------------+   +---------------------------------------------+ |
| |                         |   | DETERGENTE LÍQUIDO CONCENTRADO 20L          | |
| |                         |   | Ref: DL-20L-IND | Marca: Detalgraf           | |
| |                         |   | [⭐⭐⭐⭐⭐ 4.9/5] (24 reseñas)              | |
| |   [ IMAGEN PRINCIPAL    |   +---------------------------------------------+ |
| |     DEL PRODUCTO ]      |   | PRECIO UNITARIO: $48.500 COP                | |
| |                         |   | [ En Stock - Entrega en 24-48h ]            | |
| |                         |   +---------------------------------------------+ |
| | +-----+ +-----+ +-----+ |   | Cantidad:                                   | |
| | |thm1 | |thm2 | |thm3 | |   | [ - ] [  4  ] [ + ]   TOTAL: $194.000 COP   | |
| +-+-----+-+-----+-+-----+-+   |                       (Calculado en vivo)   | |
|                               +---------------------------------------------+ |
|                               | [ 🛒 AGREGAR AL CARRITO ]                   | |
|                               | [ 💬 Cotizar por WhatsApp con Asesor ]      | |
|                               +---------------------------------------------+ |
|                                                                               |
| +---------------------------------------------------------------------------+ |
| | [ DESCRIPCIÓN GENERAL ] | [ ESPECIFICACIONES ] | [ 📄 FICHA TÉCNICA PDF ] | |
| +---------------------------------------------------------------------------+ |
| | Contenido de Ficha Técnica:                                               | |
| | • Nombre químico, PH, Biodegradabilidad y registro INVIMA.                 | |
| | • Documento oficial para auditorías y compras institucionales.            | |
| |                                                                           | |
| | [ ⬇️ DESCARGAR FICHA TÉCNICA OFICIAL (PDF) ]                               | |
| +---------------------------------------------------------------------------+ |
+-------------------------------------------------------------------------------+
```

---

### 🛒 Wireframe 2: Smart Slide-out Cart Drawer (Panel Lateral)

```text
                                                +-------------------------------+
                                                | TU CARRITO DE COMPRAS   [ X ] |
                                                +-------------------------------+
                                                | Enviar a:                     |
                                                | (o) Bogotá D.C.  ( ) Nacional |
                                                +-------------------------------+
                                                | META PEDIDO MÍNIMO: $100.000  |
                                                | [==============       ] 75%   |
                                                | ⚠️ ¡Te faltan $25.000 COP      |
                                                | para completar tu despacho!   |
                                                +-------------------------------+
                                                | PRODUCTOS EN TU CARRITO:      |
                                                | +---------------------------+ |
                                                | | [Img] Detergente 20L      | |
                                                | | Cant: 1    Sub: $48.500   | |
                                                | | [-] [1] [+]     [Eliminar]| |
                                                | +---------------------------+ |
                                                | | [Img] Jabón Manos 4L      | |
                                                | | Cant: 1    Sub: $26.500   | |
                                                | | [-] [1] [+]     [Eliminar]| |
                                                | +---------------------------+ |
                                                +-------------------------------+
                                                | COMPLETA TU PEDIDO (1 CLIC):  |
                                                | +---------------------------+ |
                                                | | [Img] Desengrasante 1L    | |
                                                | | $25.000 COP  [+ Agregar]  | |
                                                | +---------------------------+ |
                                                +-------------------------------+
                                                | SUBTOTAL:         $75.000 COP |
                                                | ENVÍO:   Calculado en checkout| |
                                                |                               |
                                                | [ 🔒 COMPLETAR PEDIDO MÍNIMO] |
                                                | (Bloqueado hasta alcanzar meta|
                                                |  con aviso pedagógico claro)  |
                                                +-------------------------------+
```

---

### 📦 Wireframe 3: Portal de Rastreo Universal (`/tracking`)

```text
+-------------------------------------------------------------------------------+
| [Logo Detalgraf]                  PORTAL DE RASTREO               [Soporte]   |
+-------------------------------------------------------------------------------+
|                                                                               |
|                     CONSULTA EL ESTADO DE TU DESPACHO                         |
|      Ingresa tu número de Pedido (Shopify), Factura (B2B) o Guía Logística    |
|                                                                               |
|      +--------------------------------------------------+ +-----------------+ |
|      | Ej: FE-8942 o #10423 o 98234123                  | | [ 🔍 RASTREAR ] | |
|      +--------------------------------------------------+ +-----------------+ |
|                                                                               |
| +---------------------------------------------------------------------------+ |
| | DETALLE DEL DESPACHO #FE-8942                                             | |
| | Cliente: DISTRIBUIDORA ANDINA S.A.S. | Destino: Bogotá D.C. (Zona Industrial) |
| | Transportadora: Envía Colvanes | Guía: #0293848123                        | |
| +---------------------------------------------------------------------------+ |
| |                                                                           | |
| | (🟢) ─────────── (🟢) ─────────── (🔵) ─────────── (⚪)                   | |
| | Pedido           En               En                Entregado             | |
| | Confirmado       Preparación      Tránsito                                | |
| | [31 Ago, 09:00]  [31 Ago, 14:30]  [01 Sep, 08:15]   [Estimado: Hoy 17:00] | |
| |                                                                           | |
| +---------------------------------------------------------------------------+ |
| | ¿Tienes dudas con la entrega?                                             | |
| | [ 💬 Hablar con Logística por WhatsApp (Guía #0293848123) ]               | |
| +---------------------------------------------------------------------------+ |
+-------------------------------------------------------------------------------+
```

---

## 6. ESTADO DEL CRONOGRAMA — SEMANA 3

- [x] **1. Ideas de solución e hitos visuales** *(Completado y documentado)*
- [x] **2. Concepto del producto & Design Tokens (HSL, Tipografía, 8pt Grid)** *(Completado)*
- [x] **3. Estructura de la experiencia & Componentes atómicos** *(Completado)*
- [x] **4. Arquitectura de la interfaz en Figma (Grillas 12 col / 4 col)** *(Completado)*
- [x] **5. Primeros wireframes Lo-Fi navegables (PDP, Cart Drawer y /tracking)** *(Completado)*

---
*Documentación lista para la fase de Prototipado Hi-Fi y micro-interacciones interactivas en Figma (Semana 4).*
