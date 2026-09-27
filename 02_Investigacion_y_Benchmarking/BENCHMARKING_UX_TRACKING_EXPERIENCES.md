# BENCHMARKING DE EXPERIENCIAS DE TRACKING ADAPTADO AL ECOSISTEMA DETALGRAF & DETALSHOP
## Diagnóstico Competitivo y Matriz de Referentes para el Rediseño de `/tracking`

**Proyecto:** Prácticas Empresariales UX/UI — Detalgraf S.A.S. (B2B Wix) & DetalShop.com (Shopify E-commerce)  
**Elaborado por:** Nicolas Quintero Cardona  
**Fecha:** Agosto 2026  

---

## 1. CONTEXTUALIZACIÓN DE NUESTROS PROBLEMAS REALES

El rediseño de la experiencia de tracking en Detalgraf y DetalShop responde a **fricciones específicas identificadas en la Semana 1**:

1. **La brecha de "Página en Blanco" en Wix (`/tracking`):** Actualmente no existe un módulo claro de búsqueda pública donde el cliente pueda ingresar su número de orden o guía sin loguearse.
2. **La brecha entre Producción/Alistamiento y Despacho:** En empresas de empaques, suministros e impresión, hay una fase interna (*Orden Recibida ➔ En Producción/Alistamiento ➔ Empaque*) antes de que la transportadora genere movimiento. Si el tracking solo rastrea la guía de la transportadora, el cliente siente que su pedido "no avanza" y colapsa WhatsApp.
3. **Multiplicidad de Identificadores (El cliente no siempre tiene la guía):**
   - El cliente de **DetalShop (B2C)** tiene su `# de Pedido Shopify` (ej. `#1054`) o su `Cédula/Email`.
   - El cliente corporativo de **Detalgraf (B2B)** tiene su `# de Factura Electrónica`, `Orden de Compra` o `NIT`.
   - La transportadora externa solo reconoce su `# de Guía`.
4. **Saturación del Asesor Comercial:** El 70% de las consultas por chat son "¿Cómo va mi pedido?", restando tiempo valioso al equipo de ventas.

---

## 2. MATRIZ DE BENCHMARKING ADAPTADA A NUESTRO CONTEXTO Y PROBLEMAS

Comparamos cómo resuelven estos retos específicos 4 tipos de referentes:
- **A. Línea Base Actual (Detalgraf / DetalShop AS-IS):** El punto de partida que vamos a transformar.
- **B. E-commerce B2B de Empaques/Impresión (Referente de Industria: Ej. Pixartprinting / Printi / Carvajal Empaques):** Empresas con proceso de alistamiento/manufactura previo al envío.
- **C. E-commerce Retail Líder en Colombia (Mercado Libre Colombia / Falabella):** Estándar de claridad en entregas locales vs nacionales.
- **D. Sistema Especializado de Post-Compra E-commerce (AfterShip / Wonderment / Shopify Shop):** Soluciones de tracking integradas que unifican Shopify con transportadoras colombianas.

| Criterio de Evaluación / Problema a Resolver | 🔴 1. Estado Actual (Detalgraf / DetalShop AS-IS) | 🏭 2. Industria B2B / Empaques & Impresión | 🛒 3. E-commerce Retail Líder (Meli / Falabella) | 📱 4. Sistema Especializado (AfterShip / Shop App) |
| :--- | :--- | :--- | :--- | :--- |
| **1. Identificadores de Consulta Permitidos** *(¿Qué datos puede ingresar el usuario?)* | • Ninguno visible en `/tracking` (pantalla en blanco o requiere login complejo).<br>• Solo correo genérico de Shopify. | • Permite buscar por **# de Pedido**, **# de Factura** o **NIT/RUT** de la empresa. | • Vinculado a la cuenta del usuario + búsqueda por número de compra o documento. | • Búsqueda dual: **# de Pedido + Email / Teléfono** O **# de Guía de Transportadora**. |
| **2. Visibilidad de Etapas de Alistamiento / Producción** *(Antes de que la transportadora lo recoja)* | • Nula. El cliente queda a ciegas hasta que se genera una guía manual. | • Muestra fase de manufactura: *Aprobación de arte ➔ En prensa/corte ➔ Control de calidad ➔ Empacado*. | • Muestra: *Confirmado ➔ Preparando paquete ➔ Despachado*. | • Hito inicial: *Orden procesada en bodega ➔ En espera de recolección*. |
| **3. Manejo del Estado "Guía Generada sin Movimiento"** *(Evitar pánico post-compra)* | • Genera incertidumbre; el cliente escribe a preguntar si ya salió. | • Mensaje explicativo: *"Tu pedido está empacado con guía asignada. Sale en la ruta de hoy a las 4:00 PM"*. | • Muestra barra en preparación y aclara: *"El vendedor está empaquetando tus productos"*. | • Mensaje claro: *"Etiqueta creada, transportadora en camino a recoger el paquete"*. |
| **4. Integración y Descongestión de WhatsApp** *(Canal de soporte en 1 clic)* | • El cliente busca el número de WhatsApp y escribe un mensaje en blanco sin datos. | • Botón directo a asesor asignado con el número de factura/NIT pre-cargado. | • Centro de ayuda con árbol de decisión antes de abrir chat humano. | • Botón flotante *"¿Preguntas sobre este despacho?"* con enlace directo a WhatsApp API con texto predefinido. |
| **5. Diferenciación de Cobertura y Tiempos (Bogotá vs Nacional)** | • Tiempos ambiguos en checkout; no se recuerdan en el seguimiento. | • Especifica si es entrega local (camión propio/mensajería) o despacho intermunicipal por transportadora. | • Indica fecha estimada precisa según código postal/ciudad (ej. *"Llega mañana en Bogotá"*). | • Cuenta regresiva dinámica de días hábiles según la ciudad de entrega. |
| **6. Soporte para Comprador Corporativo B2B (Jefe de Compras)** | • No permite ver bultos ni descargar soporte de remisión. | • Descarga de factura electrónica PDF, remisión de entrega y soporte de transportadora. | • Enlace directo a factura electrónica y detalle de ítems comprados. | • Muestra lista detallada de SKU/productos contenidos en ese paquete específico. |

---

## 3. DECISIONES DE DISEÑO UX/UI PARA NUESTRO PROYECTO (FIGMA)

Basados en los hallazgos de este benchmarking, estas son las soluciones que diseñaremos en Figma para **Mes 1** y programaremos en **Mes 2**:

### 🎯 Solución 1: Módulo `/tracking` Universal para Detalgraf (Wix)
```
┌─────────────────────────────────────────────────────────────┐
│              Rastrea el Estado de tu Pedido                 │
│  Ingresa tu Número de Pedido, Factura o Guía de Envío       │
│                                                             │
│  [  Ej: #1054 / FACT-8920 / 987654321        ]  [ Rastrear ]│
│                                                             │
│  ¿No tienes tu número a mano? [ Consultar por WhatsApp 💬 ] │
└─────────────────────────────────────────────────────────────┘
```

### 🎯 Solución 2: Timeline de 4 Fases Claras (Cero Jerga Técnica)
1. **🟢 Pedido Recibido y Confirmado:** Factura emitida / Pago validado.
2. **🟡 En Alistamiento y Producción:** Nuestro equipo está empacando o imprimiendo tus productos.
3. **🔵 En Ruta / Despachado:** Guía asignada con `[ Coordinadora / Envia / Mensajería Bogotá ]` + Botón para ver guía externa.
4. **🟢 Entregado:** Confirmación de recepción.

### 🎯 Solución 3: Botón de WhatsApp Inteligente (Descongestión Comercial)
Cuando el usuario presione el botón de soporte dentro del tracking, abrirá WhatsApp con el mensaje ya escrito:
> *"Hola Detalgraf, estoy consultando el estado de mi pedido **#1054** a nombre de **[Nombre/Empresa]**. Quisiera más información."*  
*(Esto ahorra 3 intercambios de mensajes al vendedor y acelera la respuesta a segundos).*

---

## 4. IMPACTO ESPERADO EN NUESTROS KPIS

- **Reducción del 60%** en preguntas repetitivas de "¿Dónde está mi pedido?" en el WhatsApp comercial.
- **Transparencia total B2B:** Los jefes de compras podrán auditar si su pedido está en impresión o en transporte sin llamar por teléfono.
- **Confianza en DetalShop (B2C):** El comprador directo sabrá exactamente cuántos días hábiles faltan para su entrega en Bogotá o a nivel nacional.
