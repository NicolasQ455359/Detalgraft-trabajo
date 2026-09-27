# INFORME DE DIAGNÓSTICO UX/UI Y AUDITORÍA HEURÍSTICA — SEMANA 1
## Proyecto de Prácticas Empresariales | Detalgraf S.A.S. & DetalShop.com

**Fecha:** Agosto 2026  
**Elaborado por:** Nicolas Quintero Cardona  
**Objetivo:** Identificar fricciones visuales, barreras de conversión e inconsistencias de interacción en Detalgraf.com (Wix B2B) y DetalShop.com (Shopify E-commerce) para fundamentar el rediseño en Figma.

---

## 1. EVALUACIÓN HEURÍSTICA Y HALLAZGOS CRÍTICOS

### 🔴 Hallazgos Críticos en Detalgraf.com (Portal B2B - Wix)
1. **Página de Rastreo (`/tracking`) Defectuosa:**
   - *Problema:* Al ingresar a la sección de seguimiento, la pantalla carga en blanco o no ofrece una caja clara de búsqueda de guía/factura.
   - *Impacto UX:* Genera desconfianza e incrementa la saturación de llamadas telefónicas y chats pidiendo estado de despachos.
   - *Solución Propuesta:* Rediseñar la vista con una caja limpia `[ Escribe tu número de guía / factura ]` + botón `[ Rastrear ]` con respuestas dinámicas y botón directo a asistencia WhatsApp.

2. **Captura y Calificación de Prospectos B2B:**
   - *Problema:* Formularios extensos o poco adaptados a compradores corporativos que requieren cotización rápida con NIT y volumen.
   - *Solución Propuesta:* Prototipar flujo rápido de solicitud B2B y cualificación automática para agilizar el envío a WhatsApp del asesor comercial.

---

### 🔴 Hallazgos Críticos en DetalShop.com (E-commerce - Shopify)
1. **Falta de Cálculo Dinámico de Precio por Cantidad:**
   - *Problema:* En la Ficha de Producto (PDP), cuando el cliente incrementa la cantidad de 1 a 10 unidades, el precio unitario no refleja el monto total acumulado hasta ingresar al carrito o recargar.
   - *Impacto UX:* El usuario debe calcular mentalmente el costo total, generando incertidumbre antes de presionar "Agregar al Carrito".
   - *Solución Propuesta:* Programar actualización dinámica en vivo (`Precio Unitario × Cantidad = Subtotal acumulado`) visible al instante.

2. **Fricción por Regla de Pedido Mínimo ($100k Bogotá / $200k Nacional):**
   - *Problema:* El usuario solo descubre que no cumple el monto mínimo al intentar finalizar la compra en el Checkout, causando frustración y abandono de carrito.
   - *Solución Propuesta:* *Slide-out Cart Drawer* (carrito lateral desplegable) con barra de progreso visual interactiva que indica exactamente cuánto dinero falta para alcanzar la meta según la ciudad seleccionada, complementado con productos de adición rápida (*cross-selling*).

3. **Acceso Incomodo a Fichas Técnicas PDF:**
   - *Problema:* Las especificaciones y documentos técnicos PDF están desorganizados o requieren navegación externa.
   - *Solución Propuesta:* Módulo de pestañas integradas en la vista de producto (*Descripción*, *Especificaciones Visibles*, *Documento Técnico PDF*) conectado automáticamente mediante *Metafields*.

---

## 2. MAPA DE BUYER PERSONAS Y EMPATÍA

### 👧 Perfil 1: Comprador Corporativo B2B (Detalgraf)
- **Rol:** Jefe de Compras / Auxiliar Administrativo.
- **Necesidad Principal:** Fichas técnicas oficiales en PDF para licitaciones/auditorías, precios claros por volumen, factura electrónica con NIT y atención rápida.
- **Frustración:** Páginas de rastreo caídas, falta de respuesta fuera de horario laboral y proceso lento de cotización.

### 👦 Perfil 2: Comprador Directo B2C / Detal (DetalShop)
- **Rol:** Cliente de hogar o pequeño negocio.
- **Necesidad Principal:** Saber de forma transparente si alcanza el pedido mínimo para envío, proceso de pago en 1 clic y seguimiento claro de su paquete.
- **Frustración:** Sorpresas al momento del pago por no cumplir pedidos mínimos y no ver el total acumulado al cambiar cantidades.

---

## 3. MATRIZ DE EVALUACIÓN HEURÍSTICA (Nielsen Norman Group)

| Heurística Evaluada | Estado Actual | Diagnóstico | Acción Correctiva en Figma (Mes 1) |
| :--- | :--- | :--- | :--- |
| **Visibilidad del Estado del Sistema** | ❌ Crítico | El rastreo en Wix carga en blanco; el carrito no muestra barra de avance. | Implementar módulo `/tracking` interactivo y barra dinámica de pedido mínimo. |
| **Relación entre Sistema y Mundo Real** | ⚠️ Regular | Términos de envío y pedido mínimo poco visibles antes del checkout. | Selector claro de destino (Bogotá $100k / Nacional $200k) en el carrito lateral. |
| **Control y Libertad del Usuario** | ⚠️ Regular | Falta de pestañas organizadas para documentos técnicos PDF. | Módulo PDP con pestañas (*Descripción*, *Especificaciones*, *Ficha PDF*). |
| **Consistencia y Estándares** | ⚠️ Regular | Diferencias visuales entre el portal B2B (Wix) y E-commerce (Shopify). | Creación del *Design System* corporativo unificado. |
| **Prevención de Errores** | ❌ Crítico | Clientes intentan pagar montos menores a $100k/$200k y son bloqueados al final. | Indicador dinámico de saldo faltante con adición rápida de productos. |

---

## 4. ESTRUCTURA RECOMENDADA EN FIGMA PARA EL PROYECTO

Para organizar la cuenta de Figma, se sugiere la siguiente arquitectura de páginas dentro del archivo corporativo:

```
📁 Proyecto: Detalgraf & DetalShop - Rediseño Digital 2026
 ├── 📄 Page 1: ❖ Design System (Tokens HSL, Tipografía, Botones, Inputs, Badges)
 ├── 📄 Page 2: 📐 Wireframes Lo-Fi (User Flows Cart Drawer, /tracking, PDP)
 ├── 📄 Page 3: 📱 Prototipo Hi-Fi Desktop & Mobile (Pantallas 1440px y 375px)
 └── 📄 Page 4: 🧪 Pruebas de Interacción & Micro-animaciones
```

---

## 5. PRÓXIMOS PASOS (SEMANA 2)
1. Iniciar la diagramación de **User Flows** y diseño de **Wireframes de Baja Fidelidad (Lo-Fi)** en Figma.
2. Definir los esquemas de la vista PDP, Slide-out Cart Drawer y la sección `/tracking`.
