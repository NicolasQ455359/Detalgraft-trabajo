# GUÍA DE IMPLEMENTACIÓN: MÓDULO DE RASTREO EN WIX STUDIO (`/tracking`)
## Detalgraf S.A.S. — Prácticas Empresariales (Mes 2 / Semanas 5 y 6)
**Elaborado por:** Nicolas Quintero Cardona  

---

### ¿Cómo instalar este módulo en Wix Studio (Detalgraf.com)?

Tienes dos opciones muy sencillas:

#### Opción 1: Vía Widget HTML Embed (Recomendada — Menos de 2 minutos)
1. Abre el editor de **Wix Studio** en `detalgraf.com`.
2. Dirígete a la página `/tracking`.
3. Elimina el antiguo contenedor iframe que causaba la pantalla en blanco.
4. En el panel izquierdo, haz clic en **+ Agregar elementos** $\rightarrow$ **Incrustar código** $\rightarrow$ **Incrustar HTML**.
5. Abre el archivo [`tracking_standalone_widget.html`](file:///c:/Users/Nicolas/OneDrive/Escritorio/Trabajo/07_Implementacion_Mes_2_Wix_y_Shopify/wix_tracking/tracking_standalone_widget.html), copia todo su contenido y pégalo en el recuadro.
6. Ajusta el ancho al 100% y dale en **Publicar**.
7. ¡Listo! Tu página `/tracking` queda funcionando con el diseño exacto de Figma, responsive, interactiva y con botón de WhatsApp dinámico.

#### Opción 2: Vía Wix Velo (Código Nativo)
1. En Wix Studio, activa el **Modo Dev (Velo)** arriba en la barra superior.
2. Agrega los elementos visuales de acuerdo a los IDs: `#inputGuia`, `#btnRastrear`, `#boxResultado`, `#boxError`, `#txtStatus`, `#btnWhatsapp`.
3. Abre el archivo [`tracking_page_code.js`](file:///c:/Users/Nicolas/OneDrive/Escritorio/Trabajo/07_Implementacion_Mes_2_Wix_y_Shopify/wix_tracking/tracking_page_code.js) y pega el código en el panel inferior de **Page Code**.
