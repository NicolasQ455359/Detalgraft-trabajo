# PLAN DE TRABAJO Y PROPUESTA DE PRÁCTICAS EMPRESARIALES (5 MESES)
## OPTIMIZACIÓN DIGITAL, MEJORA DE EXPERIENCIA DE COMPRA E INTEGRACIÓN DE INTELIGENCIA ARTIFICIAL

**Para:** Dirección General y Jefatura Comercial  
**Empresa:** Detalgraf S.A.S.  
**Plataformas:** Detalgraf.com (Wix B2B) y DetalShop.com (Shopify E-commerce)  
**Elaborado por:** Nicolas Quintero Cardona (Estudiante en Prácticas Empresariales)  
**Duración de Prácticas:** 5 Meses (20 Semanas) — Jornada de 9 Horas Diarias (~800 Horas Laborales)  
**Fecha de Inicio:** Agosto 2026  

---

## 1. RESUMEN EJECUTIVO Y ENFOQUE DE PRÁCTICAS

El presente plan de trabajo constituye el **proyecto integral de prácticas empresariales** a desarrollar durante un periodo de **5 meses (20 semanas / ~800 horas laborales)** en Detalgraf S.A.S.

El objetivo general es **transformar el ecosistema digital de la empresa**, resolviendo la desconexión entre el portal B2B (Wix) y el canal transaccional (Shopify), eliminando fricciones visuales de compra (cálculo de precio dinámico, barra de pedido mínimo de $100k Bogotá / $200k Nacional, reorganización de Fichas Técnicas PDF y reparación del rastreo `/tracking`), implementando la metodología **Design-First con Figma**, integrando un **Asistente Virtual con IA 24/7** y desplegando un **Tablero de Analítica y Estadísticas** para medir cuantitativamente los resultados.

---

## 2. METODOLOGÍA: "DISEÑO PRIMERO CON FIGMA" (DESIGN-FIRST)

Para garantizar la máxima calidad visual y cero riesgos operativos en las plataformas activas de la empresa, todo desarrollo seguirá la metodología **Design-First en Figma**.

### Beneficios para la Empresa:
1. **Aprobación Gerencial Previa:** La gerencia navegará prototipos 100% clicables en computador y celular antes de modificar el código real en Wix o Shopify.
2. **Sistema de Diseño Unificado:** Creación de la guía de estilo de la empresa (Design Tokens, paleta de colores HSL, tipografía corporativa *Inter/Outfit* y componentes reutilizables).
3. **Cero Interrupción de Ventas:** Las pruebas y validaciones con usuarios se realizan en el entorno simulado de Figma.

---

## 3. DESGLOSE DEL PLAN DE TRABAJO POR MESES Y MÓDULOS (ROADMAP DE 5 MESES)

### 🎨 MES 1 (Semanas 1 - 4): Investigación UX, Sistema de Diseño y Prototipado en Figma
* **Horas Dedicadas:** ~160 Horas
* **Objetivo:** Auditar a fondo los flujos de compra, construir la librería de diseño corporativa y prototipar las soluciones interactivas en Figma.
* **Tecnología:** Figma (Design Tokens, Auto Layout 5.0, Interactive Components), FigJam.
* **Actividades Paso a Paso:**
  1. **Investigación de Usuarios y Negocio:** Entrevistar al equipo comercial y analizar el comportamiento de compradores B2B y B2C en ambas plataformas.
  2. **Creación del Design System:** Definir paleta de colores corporativos, tipografía, escala de botones, alertas y formularios.
  3. **Maquetación de Pantallas en Figma:**
     - Ficha de Producto con calculador dinámico de precio y pestañas para Ficha Técnica PDF.
     - Carrito lateral (*Slide-out Cart Drawer*) con barra dinámica de progreso para pedidos mínimos ($100k Bogotá / $200k Nacional).
     - Vista renovada de rastreo de pedidos (`/tracking`) en Wix.
  4. **Prototipo Clicable e Inspección Gerencial:** Crear los flujos interactivos y presentar el prototipo a la gerencia para visto bueno formal.

---

### ⚡ MES 2 (Semanas 5 - 8): Quick Wins, Sección `/tracking` en Wix y Cálculo Dinámico de Precios en Shopify
* **Horas Dedicadas:** ~160 Horas
* **Objetivo:** Solucionar los fallos críticos de UX/UI en el portal Wix y programar la actualización de precios en tiempo real en la ficha de producto de Shopify.
* **Tecnología:** Wix Studio / Velo (JavaScript), Shopify Liquid, JavaScript Vanilla.
* **Actividades Paso a Paso:**
  1. **Reestructuración de `/tracking` en Wix:**
     - *Diagnóstico:* La página carga en blanco. Aunque un usuario no haya comprado, una web profesional debe mostrar el buscador visible.
     - *Desarrollo:* Crear la interfaz con caja de entrada de guía `[ Escribe tu número de guía / factura ]`, botón `[ Rastrear ]` e integración de respuestas según el estado del paquete o desvío a WhatsApp.
  2. **Cálculo Dinámico de Precio por Cantidad (Shopify):**
     - Programar el script de actualización en vivo (`Precio Unitario × Cantidad = Subtotal Total`) para que cuando el cliente cambie de 1 a 10 unidades vea el monto acumulado al instante sin recargar la página.
  3. **Limpieza Visual:** Desactivar widgets innecesarios en Shopify y optimizar la validación de Cédula/NIT en la vista de carrito.

---

### 📄 MES 3 (Semanas 9 - 12): Fichas Técnicas PDF y Carrito Lateral con Barra de Pedido Mínimo
* **Horas Dedicadas:** ~160 Horas
* **Objetivo:** Reorganizar la presentación de las Fichas Técnicas PDF y desarrollar el Carrito Lateral (*Slide-out Cart*) con motivador de compra mínima.
* **Tecnología:** Shopify Liquid, Metafields, Ajax API (`/cart/add.js`, `/cart/change.js`), HTML5/CSS3.
* **Actividades Paso a Paso:**
  1. **Módulo de Ficha Técnica PDF Integrado:**
     - Organizar la vista de producto en pestañas limpias (*Descripción*, *Especificaciones Visibles en Pantalla*, *Documento Técnico PDF*).
     - Configurar Metafields en Shopify y realizar la carga masiva/automática de archivos PDF (ej. *Blancox Poder Natural*). *"No hay que programar producto por producto. Se programará la plantilla una sola vez para que los datos se muestren automáticamente cargándolos de forma masiva por Excel o IA."*
  2. **Desarrollo del Slide-out Cart Drawer:**
     - Programar el carrito lateral que aparece desde el borde derecho al presionar "Agregar al Carrito".
     - **Barra de Progreso para Pedido Mínimo:** Selector de destino (*Bogotá $100.000* / *Nacional $200.000*) con cálculo dinámico: *"Llevas $60.000 COP. Te faltan $40.000 COP para el pedido mínimo"*.
     - **Cross-Selling de Adición Rápida:** Mostrar sugerencias de productos complementarios económicos en el pie del carrito para completar el saldo en 1 solo clic.

---

### 🤖 MES 4 (Semanas 13 - 16): Arquitectura, Entrenamiento e Integración del Asistente Virtual con IA
* **Horas Dedicadas:** ~160 Horas
* **Objetivo:** Desplegar un chatbot inteligente 24/7 en Wix y Shopify entrenado con el catálogo, políticas y automatización de cotizaciones.
* **Tecnología:** Voiceflow / Tidio AI, WhatsApp Business API, JavaScript Embeds.
* **Actividades Paso a Paso:**
  1. **Estructuración de Base de Conocimiento:** Consolidar precios, cobertura, regla de pedido mínimo ($100k/$200k), FAQs y lectura de PDFs de Fichas Técnicas para que la IA los entregue por chat.
  2. **Construcción de Agentes IA:**
     - *Agente Shopper (DetalShop):* Recomienda productos, resuelve dudas de despacho y entrega estado de pedidos.
     - *Agente B2B (Detalgraf):* Califica empresas (NIT, Teléfono, volumen de compra) y envía la cotización pre-armada al WhatsApp del asesor comercial.
  3. **Despliegue y Pruebas en Vivo:** Instalar los widgets en ambas webs y realizar pruebas masivas de conversación y calibración de respuestas.

---

### 📊 MES 5 (Semanas 17 - 20): Sistema de Analítica, Tablero de KPIs, Capacitación y Memoria de Prácticas
* **Horas Dedicadas:** ~160 Horas
* **Objetivo:** Desplegar el sistema de medición de estadísticas en tiempo real, capacitar al equipo comercial, realizar optimización de velocidad de carga y SEO, y redactar la Memoria Final de Prácticas.
* **Tecnología:** Google Analytics 4 (GA4), Shopify Analytics, Looker Studio / Panel Tidio, Lighthouse Audit.
* **Actividades Paso a Paso:**
  1. **Configuración de Eventos de Analítica y Dashboard:** Medir interacción del chatbot, conversión de pedidos mínimos y descargas de PDFs técnicos.
  2. **Capacitación al Equipo Comercial:** Entrenar a los asesores sobre el seguimiento de leads cualificados recibidos por WhatsApp.
  3. **Optimización de Velocidad y SEO:** Acelerar el tiempo de carga en celulares y optimizar títulos para mejorar posicionamiento en motores de búsqueda.
  4. **Documentación Final:** Redactar la Memoria Final de Prácticas Empresariales para la Universidad y la Dirección General.

---

## 4. CRONOGRAMA DE EJECUCIÓN (ROADMAP RESUMIDO DE 5 MESES)

| Mes | Fase del Proyecto | Entregables Clave | Horas Est. |
| :--- | :--- | :--- | :--- |
| **Mes 1** (Sem. 1 - 4) | **Investigación UX & Prototipado Figma** | Design System, Prototipo Clicable 100% navegable en Figma | **~160 hrs** |
| **Mes 2** (Sem. 5 - 8) | **Quick Wins, `/tracking` Wix & Precios Dinámicos** | Módulo de rastreo funcional en Wix + Calculador de precios en Shopify | **~160 hrs** |
| **Mes 3** (Sem. 9 - 12) | **Fichas Técnicas PDF & Cart Drawer con Mínimos** | Pestañas de PDF en PDP + Carrito Lateral con barra $100k/$200k | **~160 hrs** |
| **Mes 4** (Sem. 13 - 16) | **Asistente Virtual IA & Conexión WhatsApp** | Chatbot 24/7 en Wix y Shopify con enrutamiento comercial | **~160 hrs** |
| **Mes 5** (Sem. 17 - 20) | **Analítica, Tablero KPIs & Memoria de Prácticas** | Dashboard de métricas, capacitación comercial e Informe Final de Prácticas | **~160 hrs** |
| **TOTAL** | **Proyecto Integral de Prácticas Empresariales** | **Ecosistema Digital Renovado, Optimizado e Integrado con IA** | **~800 hrs** |

---

## 5. IMPACTO Y RESULTADOS ESPERADOS PARA LA EMPRESA

1. **Cumplimiento Efectivo de Pedidos Mínimos:** La barra dinámica guía visualmente al cliente para alcanzar los $100.000 en Bogotá o $200.000 a Nivel Nacional, incrementando el ticket promedio de compra sin generar confusión.
2. **Reducción del Abandono de Carrito (15% a 25%):** El cálculo dinámico de precio en tiempo real y el carrito lateral desplegable eliminan la incertidumbre antes de pagar.
3. **Posicionamiento Corporativo B2B:** La descarga limpia de Fichas Técnicas PDF y la solución del seguimiento de envíos proyectan una imagen de alta confiabilidad.
4. **Ventas y Cotizaciones 24/7:** El Asistente de IA atenderá consultas fuera del horario laboral y entregará prospectos calificados directamente al equipo comercial en WhatsApp.

---

## 6. SISTEMA DE MEDICIÓN Y ESTADÍSTICAS (ANALYSIS & DASHBOARD KPIs)

Para evaluar el retorno de inversión y el éxito del proyecto semana a semana, se configurará un **Tablero de Analítica Ejecutiva** con las siguientes métricas clave:

### 📈 A. Estadísticas del Asistente Virtual con IA (Chatbot B2B & Shopper)
* **Tasa de Resolución Autónoma (%):** Medición de cuántas consultas de usuarios/empresas son resueltas al instante por el bot sin intervención humana (preguntas frecuentes, cobertura, Fichas Técnicas).
* **Volumen de Leads B2B Generados:** Cantidad de empresas (NIT, Razón Social) que completan la solicitud de cotización y son derivadas con datos al WhatsApp del asesor comercial.
* **Tiempo Promedio de Respuesta:** Reducción del tiempo de atención de horas/días a **menos de 3 segundos** las 24 horas del día.

### 🛒 B. Estadísticas de Conversión en Carrito y Pedidos Mínimos
* **Efectividad de la Barra de Pedido Mínimo:** Porcentaje de carritos que incrementaron su valor para alcanzar los $100.000 (Bogotá) o $200.000 (Nacional) guiados por la barra de progreso.
* **Impacto del Cross-Selling:** Medición de ventas adicionales logradas mediante los productos sugeridos en el pie del carrito lateral.
* **Tasa de Abandono de Carrito:** Monitoreo semanal de la disminución en el porcentaje de clientes que dejan productos sin comprar.

### 📄 C. Estadísticas de Uso de Fichas Técnicas y Rastreo
* **Métrica de Descargas de Fichas Técnicas PDF:** Conteo de solicitudes y descargas de documentación técnica por categoría de producto.
* **Uso de la Sección de Rastreo (`/tracking`):** Número de clientes que consultan de forma autónoma el estado de su envío en Wix sin congestionar el canal telefónico.

---

## 7. PRESUPUESTO ESTIMADO DE LICENCIAS Y HERRAMIENTAS (SOFTWARE SUBSCRIPTIONS)

Para la ejecución del proyecto se aprovecharán al máximo las plataformas que la empresa **ya tiene activas** y se usarán los planes gratuitos (*Free Tiers*) durante las etapas iniciales de desarrollo.

| Herramienta / Plataforma | Uso en el Proyecto | Estado / Plan Recomendado | Costo Estimado |
| :--- | :--- | :--- | :--- |
| **Shopify** (DetalShop.com) | E-commerce, Metafields, Liquid, Cart Drawer, Analytics | **Activo** (Suscripción actual de la empresa) | **$0 COP** (Ya cubierto) |
| **Wix Studio / Editor** (Detalgraf.com) | Portal B2B, Velo, Módulo de Tracking, Formularios | **Activo** (Suscripción actual de la empresa) | **$0 COP** (Ya cubierto) |
| **Google Analytics 4 & Looker Studio** | Medición de eventos, conversiones y tablero de KPIs | **Gratuito** (Servicio oficial de Google) | **$0 COP** |
| **Figma** | Design System, Wireframes y Prototipos Clicables | **Figma Starter** (Plan Gratuito para diseño) | **$0 COP** (Opción Pro opcional: ~$15 USD/mes) |
| **Tidio AI / Voiceflow** | Asistente Virtual 24/7 entrenado con catálogo y PDFs | **Fase 1-3:** Plan Gratuito ($0 COP)<br>**Fase 4-5:** Plan Starter/Pro (Producción) | **~$29 a $49 USD / mes** (Solo a partir del Mes 4) |
| **WhatsApp Business API** | Enrutamiento directo de cotizaciones B2B | **Opción A:** Enlace Directo (`wa.me`) gratis<br>**Opción B:** API Oficial según consumo | **$0 COP** (Opción A recomendada) |

> 📌 **Recomendación para Gerencia:** Los Meses 1, 2 y 3 no generan ningún costo adicional de licencias ($0 COP). Únicamente a partir del Mes 4 (cuando el Asistente Virtual de IA se despliegue en vivo a clientes reales), se sugiere activar el plan Pro del proveedor de IA seleccionado (aprox. **$29 a $49 USD/mes**).
> 
> 📌 **Nota Logística:** Se contemplan dos viajes a Bogotá para fases clave de investigación presencial de usuarios/negocio y capacitación directa al equipo comercial.
