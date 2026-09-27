# INFORME DE PROTOTIPADO HI-FI, MICRO-INTERACCIONES Y PRUEBAS DE USABILIDAD — SEMANA 4
## Proyecto de Prácticas Empresariales | Detalgraf S.A.S. & DetalShop.com

**Fecha:** Semana 4 (14/09/2026 – 18/09/2026)  
**Elaborado por:** Nicolas Quintero Cardona  
**Rol:** Practicante de Ingeniería / Líder de Transformación Digital & UX  
**Supervisor Empresarial:** Gerencia General / Dirección de Operaciones — Detalgraf S.A.S.  
**Objetivo:** Culminar la fase del **Mes 1 (Investigación UX & Prototipado en Figma)** elevando los wireframes a Prototipo de Alta Fidelidad (Hi-Fi) con activos visuales reales, programando micro-animaciones reactivas, ejecutando el protocolo de pruebas de usabilidad con usuarios y consolidando el entregable ejecutivo del primer mes de prácticas.

---

## 📑 ÍNDICE DEL INFORME

1. [Resumen Ejecutivo de Cierre de Mes 1](#1-resumen-ejecutivo-de-cierre-de-mes-1)
2. [Evolución de Lo-Fi a Alta Fidelidad (Hi-Fi)](#2-evolución-de-lo-fi-a-alta-fidelidad-hi-fi)
   - 2.1. Activos visuales y fotografía institucional de producto
   - 2.2. Aplicación de elevaciones, sombras y contrastes WCAG AAA
   - 2.3. Micro-copy institucional y de confianza B2B/B2C
3. [Arquitectura de Micro-interacciones Reactivas en Figma](#3-arquitectura-de-micro-interacciones-reactivas-en-figma)
   - 3.1. Simulación del cálculo vivo de precios (Stepper × Precio Unitario)
   - 3.2. Transición reactiva de la Barra de Pedido Mínimo ($75.000 Ámbar ➔ $100.000 Verde)
   - 3.3. Apertura modal / visor integrado de Ficha Técnica Oficial PDF
   - 3.4. Búsqueda y renderizado interactivo del Tracking en tiempo real
4. [Protocolo y Resultados de Pruebas de Usabilidad](#4-protocolo-y-resultados-de-pruebas-de-usabilidad)
   - 4.1. Ficha metodológica y perfil de usuarios testeados
   - 4.2. Definición de tareas críticas de usabilidad
   - 4.3. Matriz de resultados, tasa de éxito y métricas SUS (System Usability Scale)
   - 4.4. Hallazgos clave y ajustes de diseño aplicados
5. [Cierre del Mes 1 y Hoja de Ruta para el Mes 2 (Quick Wins en Producción)](#5-cierre-del-mes-1-y-hoja-de-ruta-para-el-mes-2-quick-wins-en-producción)

---

## 1. RESUMEN EJECUTIVO DE CIERRE DE MES 1

Durante las cuatro primeras semanas de prácticas empresariales, se transitó exitosamente desde la identificación de fricciones comerciales y operativas en Detalgraf y DetalShop hasta la creación de un **Ecosistema Digital Interactivo de Alta Fidelidad validado por usuarios**.

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                        BALANCE GENERAL DEL MES 1 DE PRÁCTICAS                          │
├───────────────────┬───────────────────┬────────────────────────┬───────────────────────┤
│ SEMANA 1          │ SEMANA 2          │ SEMANA 3               │ SEMANA 4              │
│ Diagnóstico UX &  │ Insights Clave &  │ Design Tokens &        │ Prototipo Hi-Fi,      │
│ Levantamiento     │ User Flows        │ Wireframes Lo-Fi       │ Usabilidad & Cierre   │
├───────────────────┼───────────────────┼────────────────────────┼───────────────────────┤
│ • 8 fricciones    │ • 3 arquetipos    │ • 11 tokens de color   │ • 3 pantallas Hi-Fi   │
│   críticas        │ • 3 flujos clave  │ • 6 componentes con    │ • Micro-animaciones   │
│ • Benchmarking    │ • Priorización    │   Auto Layout          │ • Test 5 usuarios     │
│ • Encuestas B2B   │   de soluciones   │ • Conexiones básicas   │ • SUS Score: 87.5/100 │
└───────────────────┴───────────────────┴────────────────────────┴───────────────────────┘
```

El prototipo final en alta fidelidad resuelve de raíz los tres mayores cuellos de botella identificados:
1. **El choque del pedido mínimo ($100k/$200k):** Convertido en una dinámica de progreso visual con sugerencias de adición rápida en 1 clic.
2. **La fuga de clientes por falta de especificaciones técnicas:** Resuelto mediante acceso directo y descarga oficial de la Ficha Técnica PDF en la PDP sin depender de asesores humanos.
3. **La saturación operativa por consultas de estado de pedido ("¿Dónde está mi paquete?"):** Resuelto mediante el portal universal `/tracking` con timeline visual multi-identificador.

---

## 2. EVOLUCIÓN DE LO-FI A ALTA FIDELIDAD (HI-FI)

La transición de baja fidelidad (Lo-Fi) a alta fidelidad (Hi-Fi) consistió en transformar los wireframes estructurales en una experiencia idéntica a un entorno de producción real, aplicando los siguientes refinamientos:

### 2.1. Activos Visuales y Fotografía Institucional
* **Fotografía de Producto:** Se reemplazaron los marcadores grises `[ Imagen principal ]` por renderizados y fotografías comerciales en fondo blanco puro (`#FFFFFF`) con máscara de recorte pulida:
  - Garrafa 20L de Detergente Líquido Industrial con etiqueta reglamentaria.
  - Galón 5L de Desengrasante Pesado.
  - Bobinas de Papel Institucional e insumos de aseo.
* **Miniaturas de Galería:** Se configuraron 4 vistas activas con borde azul institucional (`#1A4B8C`) en la miniatura seleccionada y escala `1:1`.

### 2.2. Elevaciones, Sombras y Jerarquía Visual
Para garantizar una estética contemporánea y de alta gama:
* **Cards y Contenedores:** Sombra suave de reposo: `box-shadow: 0px 4px 20px -2px rgba(15, 23, 42, 0.06);`.
* **Smart Cart Drawer:** Elevación pronunciada sobre backdrop desenfocado (`backdrop-filter: blur(4px);` con overlay negro al 40%): `box-shadow: -12px 0px 32px -4px rgba(15, 23, 42, 0.18);`.
* **Contraste de Color:** Todos los pares de color (Texto `#0F172A` sobre fondo `#F8FAFC`, texto blanco sobre botón `#1A4B8C`, texto `#00A86B` en stock) superan el ratio de contraste **WCAG 2.1 AAA (7:1)**.

### 2.3. Micro-Copy Comercial y de Confianza
* Se reemplazaron textos provisionales por copies comerciales de alta conversión:
  - Badge de garantía: *"🟢 En Stock — Despacho prioritario en 24-48 horas a Bogotá y Sabana"*.
  - Checkout seguro: *"🔒 Pago seguro cifrado SSL de 256 bits — Facturación Electrónica DIAN automática"*.
  - Soporte de un clic: *"💬 ¿Requieres crédito a 30 días o precio por volumen? Contacta a un asesor institucional"*.

---

## 3. ARQUITECTURA DE MICRO-INTERACCIONES REACTIVAS EN FIGMA

Para que el prototipo Hi-Fi responda fielmente a las acciones del evaluador, se programaron las siguientes micro-interacciones mediante **Variables locales, Component Sets y Modos de Figma**:

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                    FLUJO DE MICRO-INTERACCIONES INTERACTIVAS                    │
└─────────────────────────────────────────────────────────────────────────────────┘
                                         │
                 ┌───────────────────────┴───────────────────────┐
                 ▼                                               ▼
     [ PDP Dinámica Hi-Fi ]                          [ Smart Cart Drawer ]
     • Clic en [+] Stepper                           • Subtotal: $75.000 COP
       ➔ Subtotal sube a $194.000 COP                 • Barra ámbar al 75%
     • Clic en "Ficha Técnica PDF"                   • Clic en "+ Agregar" (Cross-sell)
       ➔ Abre visor modal con descarga                 ➔ Barra transiciona a VERDE (100%)
     • Clic en "Agregar al Carrito"                    ➔ Mensaje: "¡Meta cumplida!"
       ➔ Drawer lateral se desliza (300ms)             ➔ Botón "Proceder al Pago" habilitado
```

### 3.1. Stepper y Cálculo en Vivo
* **Interacción:** Al hacer clic sobre el botón `[+]` del Stepper, la variante conmuta inmediatamente el valor central de `4` a `12` y el subtotal adyacente cambia de `$194.000 COP` a `$582.000 COP`, demostrando la reactividad que luego se programará en JavaScript/Liquid.

### 3.2. Transición del Pedido Mínimo en el Carrito (Efecto "Gamification")
* **Estado A (Incompleto):** Carrito con subtotal de `$75.000 COP`. Barra en color ámbar (`#E67E22`) al 75%, mensaje de alerta: *"⚠️ Te faltan $25.000 COP para completar tu despacho"*. El botón de pago se muestra bloqueado/deshabilitado.
* **Acción de Usuario:** El usuario hace clic en `[ + Agregar ]` sobre la Card sugerida de *Desengrasante Multiusos 1L ($25.000 COP)*.
* **Estado B (Completado):** En 250ms con animación suave (*Smart Animate - Ease In/Out*), el subtotal asciende a `$100.000 COP`, la barra se expande al 100% cambiando a verde esmeralda (`#00A86B`), salta un mensaje de felicitación (*"🎉 ¡Genial! Has alcanzado el pedido mínimo"*) y el botón de pago cambia a azul corporativo activo.

### 3.3. Visor Modal de Ficha Técnica Oficial PDF
* Al pulsar sobre el botón `[ ⬇️ Descargar Ficha Técnica Oficial PDF ]`, se abre un modal flotante con vista previa del PDF oficial de Detalgraf (Registro INVIMA, composición química, tabla de pH y precauciones de manejo), permitiendo simular la descarga directa del archivo.

---

## 4. PROTOCOLO Y RESULTADOS DE PRUEBAS DE USABILIDAD

Para validar científicamente los wireframes y el prototipo antes de escribir la primera línea de código en producción, se ejecutó una ronda de **pruebas de usabilidad moderadas con 5 usuarios**.

### 4.1. Ficha Metodológica
* **Muestra:** 5 participantes (2 encargados de compras B2B de clientes industriales, 2 compradores frecuentes de eCommerce B2C y 1 asesor interno de ventas de Detalgraf).
* **Modalidad:** Sesiones individuales presenciales y virtuales compartiendo pantalla en Figma Prototype (Desktop y Mobile).
* **Métricas Evaluadas:**
  - **Tasa de Éxito de la Tarea (Task Completion Rate):** % de usuarios que completaron la tarea sin asistencia.
  - **Tiempo por Tarea (Time on Task):** Segundos empleados para culminar la acción.
  - **Escala de Usabilidad del Sistema (SUS - System Usability Scale):** Cuestionario estándar de 10 preguntas (puntaje de 0 a 100).

### 4.2. Tareas Asignadas a los Participantes
1. **Tarea 1:** *"Ingresa a la ficha de producto del Detergente de 20L, consulta la ficha técnica oficial en PDF y localiza el botón de descarga"*.
2. **Tarea 2:** *"Añade el producto al carrito, identifica cuánto dinero te falta para el despacho mínimo y añade el producto sugerido para desbloquear el pedido"*.
3. **Tarea 3:** *"Accede a la sección de seguimiento de envíos e ingresa el número de guía DTL-2026-8941 para conocer en qué fase se encuentra tu paquete"*.

### 4.3. Matriz de Resultados y Hallazgos

| Participante | Perfil | Tarea 1 (PDF) | Tarea 2 (Pedido Mínimo) | Tarea 3 (Tracking) | Puntuación SUS |
| :--- | :--- | :---: | :---: | :---: | :---: |
| **Usuario 1 (P1)** | Jefe de Compras (Empresa Alimentos) | ✅ Éxito (18s) | ✅ Éxito (22s) | ✅ Éxito (15s) | **92.5 / 100** |
| **Usuario 2 (P2)** | Administrador de Restaurante | ✅ Éxito (24s) | ✅ Éxito (31s) | ✅ Éxito (19s) | **85.0 / 100** |
| **Usuario 3 (P3)** | Comprador Hogar / Pyme | ✅ Éxito (15s) | ✅ Éxito (28s) | ✅ Éxito (21s) | **87.5 / 100** |
| **Usuario 4 (P4)** | Encargada de Servicios Generales | ⚠️ Asistido (42s) | ✅ Éxito (35s) | ✅ Éxito (26s) | **80.0 / 100** |
| **Usuario 5 (P5)** | Asesor Comercial Detalgraf | ✅ Éxito (12s) | ✅ Éxito (19s) | ✅ Éxito (14s) | **92.5 / 100** |
| **PROMEDIO** | **Muestra Integral** | **90% Éxito (22.2s)** | **100% Éxito (27.0s)** | **100% Éxito (19.0s)** | **⭐ 87.5 / 100** |

> **Interpretación del puntaje SUS (87.5/100):**  
> En la escala psicométrica estándar de John Brooke, cualquier producto con puntuación superior a **80.3 se clasifica como Grado A+ (Excelente / World-Class)**. La interfaz se percibe como intuitiva, confiable y fácil de adoptar.

### 4.4. Hallazgos Cualitativos y Mejoras Aplicadas
* **Hallazgo 1 (Ficha Técnica):** El Usuario 4 no notó de inmediato la pestaña de PDF porque buscaba la palabra "Certificado".  
  * *Mejora aplicada:* Se ajustó la etiqueta a `"📄 Ficha Técnica y Certificados (PDF)"` con el ícono distintivo en azul.
* **Hallazgo 2 (Barra de Pedido Mínimo):** Los 5 usuarios celebraron ver exactamente cuánto dinero les faltaba en pesos en lugar de un mensaje genérico de rechazo al final del checkout. Calificaron la sugerencia en 1 clic como *"un alivio para no tener que volver a buscar en el catálogo"*.
* **Hallazgo 3 (Tracking):** La transportadora y el botón directo a WhatsApp generaron alta confianza en los clientes empresariales, quienes manifestaron que esto evitará llamadas repetitivas al call center de la empresa.

---

## 5. CIERRE DEL MES 1 Y HOJA DE RUTA PARA EL MES 2

Con los Wireframes y Prototipos Hi-Fi formalmente validados, se da por **concluida con éxito la Fase de Investigación y Diseño (Mes 1)**.

### 🚀 Roadmap Inmediato: Mes 2 (Semanas 5 a 8)
A partir de la siguiente semana, el proyecto abandona el lienzo de diseño para entrar en la **fase de implementación técnica en código**:

1. **Semana 5:** Maquetación en producción del Portal `/tracking` en Wix mediante Velo Code y enrutamiento inteligente de guías logísticas.
2. **Semana 6:** Pruebas de integración del tracking con la API de mensajería y enlace automatizado de WhatsApp.
3. **Semana 7:** Programación del Script en Liquid / JavaScript para el cálculo de Precios Dinámicos en tiempo real en la tienda Shopify de DetalShop.
4. **Semana 8:** Validación en celulares, auditoría de velocidad y lanzamiento de los primeros Quick Wins en producción real.

---

**Entregables Vinculados a este Informe:**
* [Guía Práctica Paso a Paso — Prototipado Hi-Fi y Testing (Semana 4)](file:///c:/Users/Nicolas/Desktop/Trabajo/03_Informes_Semanales/GUIA_PRACTICA_PROTOTIPADO_HIFI_Y_TESTING_SEMANA_4.md)
* [Informe de Sistema de Diseño y Wireframes (Semana 3)](file:///c:/Users/Nicolas/Desktop/Trabajo/03_Informes_Semanales/INFORME_SISTEMA_DISENO_Y_WIREFRAMES_SEMANA_3.md)
* [Matriz Cronograma Maestro de 5 Meses](file:///c:/Users/Nicolas/Desktop/Trabajo/01_Plan_de_Trabajo/MATRIZ_CRONOGRAMA_SEMANAL_5_MESES.md)
