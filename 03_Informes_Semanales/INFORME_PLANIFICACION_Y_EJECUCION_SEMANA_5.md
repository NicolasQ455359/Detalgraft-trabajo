# INFORME DE PLANIFICACIÓN Y EJECUCIÓN TÉCNICA — SEMANA 5
## INICIO DEL MES 2: ARQUITECTURA TÉCNICA, ENTORNO "PRUEBAS NQC" EN SHOPIFY Y MAQUETACIÓN DE TRACKING EN WIX
### Proyecto de Prácticas Empresariales | Detalgraf S.A.S. & DetalShop.com

**Fecha:** Semana 5 (21/09/2026 – 27/09/2026)  
**Elaborado por:** Nicolas Quintero Cardona  
**Rol:** Practicante de Ingeniería / Líder de Transformación Digital & UX  
**Supervisor Empresarial:** Gerencia General / Dirección de Operaciones — Detalgraf S.A.S.  
**Plataformas:** Shopify (`admin.shopify.com/store/detalgraf`) & Wix Studio (Detalgraf.com)  
**Tema de Desarrollo:** `Pruebas NQC` (Versión 3.0.2 - Borrador Aislado)  

---

## 📑 ÍNDICE DEL INFORME

1. [Objetivo y Contexto de la Semana 5](#1-objetivo-y-contexto-de-la-semana-5)
2. [Hito de Acceso y Entorno de Desarrollo Seguro](#2-hito-de-acceso-y-entorno-de-desarrollo-seguro)
   - 2.1. Confirmación de acceso al panel administrativo de Shopify
   - 2.2. Aislamiento operacional: Tema `Pruebas NQC` vs. Tema Activo
3. [Diagnóstico Técnico del Portal Wix (`/tracking`)](#3-diagnóstico-técnico-del-portal-wix-tracking)
   - 3.1. Causa raíz de la pantalla en blanco
   - 3.2. Estructura de maquetación UI aprobada en Figma
4. [Plan de Trabajo Diario (Lunes a Domingo)](#4-plan-de-trabajo-diario-lunes-a-domingo)
5. [Especificación de Código y Componentes para la Semana 5](#5-especificación-de-código-y-componentes-para-la-semana-5)
   - 5.1. Estructura HTML/CSS y Velo para `/tracking` en Wix
   - 5.2. Preparación de selectores en Shopify `Pruebas NQC`
6. [Criterios de Aceptación y Checklist de la Semana 5](#6-criterios-de-aceptación-y-checklist-de-la-semana-5)

---

## 1. OBJETIVO Y CONTEXTO DE LA SEMANA 5

La **Semana 5 (21/09/2026 – 27/09/2026)** marca el inicio oficial del **Mes 2 de Prácticas Empresariales**. Tras haber concluido exitosamente el ciclo de investigación, levantamiento de requerimientos y prototipado en alta fidelidad en Figma durante el Mes 1, se da el paso crucial de la teoría y el diseño visual hacia la **implementación directa en las plataformas tecnológicas de la compañía**.

El objetivo central de esta semana es doble:
1. **Configurar y blindar el entorno de desarrollo en Shopify:** Establecer el flujo de trabajo sobre el tema borrador `Pruebas NQC` (Versión 3.0.2), asegurando que la tienda en vivo (`Copia de Haseven | Detalshop`) no sufra ninguna alteración durante las fases de programación.
2. **Diagnosticar y maquetar la solución de `/tracking` en Wix:** Erradicar la pantalla en blanco que afecta a Detalgraf.com, construyendo la interfaz de usuario con caja de búsqueda, estados de paquete y botón de derivación a WhatsApp según las especificaciones del Design System de Figma.

---

## 2. HITO DE ACCESO Y ENTORNO DE DESARROLLO SEGURO

### 2.1. Confirmación de Acceso a Shopify Admin
Se ha validado el acceso formal al panel de administración de Shopify bajo la organización `detalgraf`:
* **URL de Administración:** `admin.shopify.com/store/detalgraf/themes`
* **Tienda:** DetalShop (`detalgraf.myshopify.com`)
* **Tema Activo en Producción:** `Copia de Haseven | Detalshop` (Versión 3.0.2 - Publicado y recibiendo tráfico real).
* **Tema Borrador de Prácticas:** `Pruebas NQC` (Versión 3.0.2 - Creado como clon idéntico para desarrollo seguro).

### 2.2. Principio de Aislamiento Operacional
Para proteger las ventas y la estabilidad transaccional de DetalShop:
* **Zero-Downtime / Zero-Risk:** Toda edición de plantillas Liquid (`.liquid`), hojas de estilo CSS (`.css`) y scripts de cliente (`.js`) se ejecutará exclusivamente dentro de la instancia de `Pruebas NQC`.
* **Modo Previsualización (Theme Preview):** La validación se llevará a cabo mediante enlaces temporales de previsualización de Shopify (*Share preview link*), permitiendo a la Gerencia y al equipo de prácticas interactuar con los cambios sin exponerlos al público general.

---

## 3. DIAGNÓSTICO TÉCNICO DEL PORTAL WIX (`/tracking`)

### 3.1. Causa Raíz de la Pantalla en Blanco
En la auditoría del Mes 1 se identificó que la URL `detalgraf.com/tracking` presentaba un bloqueo de renderizado. El análisis técnico preliminar evidencia:
* Un contenedor iframe desactualizado que apuntaba a una integración externa inexistente o con certificado SSL vencido.
* Ausencia de un formulario nativo de consulta que gestione el estado vacío (*empty state*), provocando que un usuario sin sesión o sin cookies previas visualice un espacio completamente desierto.

### 3.2. Solución Estructural Basada en Figma
La nueva maquetación de `/tracking` resuelve este problema mediante tres capas funcionales:
1. **Hero de Búsqueda:** Título descriptivo + subtítulo de orientación + campo de texto amplio + botón primario accesible.
2. **Timeline de Estado:** Panel gráfico de 4 etapas con íconos claros (Confirmado, Bodega, En Tránsito, Entregado).
3. **Tarjeta de Contingencia Humana:** Módulo permanente con botón de WhatsApp para casos donde el número de guía sea incorrecto, esté en trámite reciente o requiera atención personalizada.

---

## 4. PLAN DE TRABAJO DIARIO (SEMANA 5)

| Día | Fecha | Actividad Principal | Horas | Estado |
| :--- | :---: | :--- | :---: | :---: |
| **Lunes** | 21/09/2026 | Verificación de accesos en Shopify/Wix y respaldo de temas base | 8h | En curso |
| **Martes** | 22/09/2026 | Auditoría de código en `Pruebas NQC` y limpieza de scripts residuales | 8h | Programado |
| **Miércoles** | 23/09/2026 | Creación de página sandbox `/tracking-dev` y maquetación en Wix Studio | 8h | Programado |
| **Jueves** | 24/09/2026 | Construcción del componente visual Timeline y tarjeta de resultados | 8h | Programado |
| **Viernes** | 25/09/2026 | Integración de botón WhatsApp con prellenado de texto y validaciones | 8h | Programado |
| **Sábado** | 26/09/2026 | Pruebas de maquetación responsive en móviles Android y iPhone | — | QA |
| **Domingo** | 27/09/2026 | Consolidación de informe de avances de Semana 5 y pase a Semana 6 | — | Cierre |

---

## 5. ESPECIFICACIÓN DE CÓDIGO Y COMPONENTES PARA LA SEMANA 5

### 5.1. Estructura y Código Base para `/tracking` en Wix (Velo JS)
A implementar en el panel de desarrollador de Wix Studio:

```javascript
// Archivo de página: Page Code en Wix Studio (/tracking)
import wixLocation from 'wix-location';

$w.onReady(function () {
    // 1. Ocultar contenedores de respuesta al cargar
    $w("#boxResultado").collapse();
    $w("#boxError").collapse();
    
    // 2. Evento click en botón Rastrear
    $w("#btnRastrear").onClick(() => {
        procesarRastreo();
    });
    
    // 3. Permitir rastreo al presionar 'Enter' en el input
    $w("#inputGuia").onKeyPress((event) => {
        if (event.key === "Enter") {
            procesarRastreo();
        }
    });
});

function procesarRastreo() {
    const guia = $w("#inputGuia").value.trim().toUpperCase();
    
    if (!guia || guia.length < 4) {
        $w("#textFeedback").text = "Por favor ingrese un número de guía o factura válido.";
        $w("#boxError").expand();
        $w("#boxResultado").collapse();
        return;
    }
    
    // Configurar enlace de WhatsApp de contingencia con el número ingresado
    const telefonoComercial = "573001234567"; // Número oficial de soporte Detalgraf
    const mensajeWA = encodeURIComponent(`Hola Detalgraf, deseo verificar el estado de mi pedido. Mi número de guía/factura es: ${guia}`);
    $w("#btnWhatsapp").link = `https://wa.me/${telefonoComercial}?text=${mensajeWA}`;
    
    // Simulación / Muestra de resultados (A conectar a base de datos en Semana 6)
    $w("#boxError").collapse();
    $w("#boxResultado").expand();
    $w("#txtGuiaDisplay").text = `Guía: ${guia}`;
}
```

### 5.2. Inspección Preparatoria en Shopify (`Pruebas NQC`)
Para preparar el cálculo dinámico de precio de la Semana 7:
* Se localiza el contenedor de precio en `sections/main-product.liquid`.
* Se prepara el contenedor DOM para inyectar el subtotal reactivo:
  ```html
  <!-- Contenedor inyectable NQC para cálculo en tiempo real -->
  <div id="nqc-dynamic-pricing-wrapper" class="nqc-price-box" style="margin: 12px 0; padding: 10px; background: #F8F9FA; border-radius: 8px; border-left: 4px solid #1A4B8C;">
    <span class="nqc-label" style="font-size: 13px; color: #555;">Subtotal por cantidad seleccionada:</span>
    <div id="nqc-dynamic-price-value" style="font-size: 18px; font-weight: 700; color: #1A4B8C;">
      {{ product.selected_or_first_available_variant.price | money_with_currency }}
    </div>
  </div>
  ```

---

## 6. CRITERIOS DE ACEPTACIÓN Y CHECKLIST DE LA SEMANA 5

- [ ] **Acceso y Respaldo:** Acceso verificado y tema `Pruebas NQC` activo como entorno de pruebas seguro.
- [ ] **Erradicación de Pantalla en Blanco en Wix:** La página `/tracking` presenta un encabezado claro, input de guía y botón de acción.
- [ ] **Diseño Fiel a Figma:** Tipografía corporativa (*Inter*), colores HSL y espaciados idénticos a los prototipos de la Semana 4.
- [ ] **Responsive Design:** La vista de tracking se adapta perfectamente a pantallas móviles de 375px a 430px sin desbordamiento horizontal.
- [ ] **Enlace a WhatsApp:** El botón de asistencia genera correctamente la URL de WhatsApp con el texto prellenado conteniendo el número de guía.

---

**Siguiente Paso:**  
Aprobada la maquetación de la Semana 5, la **Semana 6** procederá con la programación de los estados logísticos dinámicos y la integración con la base de datos de órdenes de Wix.
