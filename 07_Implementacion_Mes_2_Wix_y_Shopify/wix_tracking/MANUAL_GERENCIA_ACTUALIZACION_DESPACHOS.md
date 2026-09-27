# MANUAL PARA GERENCIA: CÓMO ACTUALIZAR EL ESTADO DE LOS ENVÍOS EN WIX
## Detalgraf S.A.S. — Módulo de Rastreo Logístico (`/tracking`)
**Elaborado para:** Gerencia General y Dirección de Operaciones  
**Fecha:** Septiembre 2026  

---

### 🎯 Objetivo
Permitir que la Gerencia o el Encargado de Despachos actualice el estado de los pedidos de forma rápida y sencilla **sin necesidad de programar ni tocar código**.

---

### 📋 OPCIÓN 1 (Recomendada): Vía Wix CMS (Base de Datos Visual tipo Excel)

Wix Studio cuenta con un gestor de contenido nativo (**Wix CMS**) que funciona exactamente como una hoja de Excel en línea.

#### Paso a Paso para la Gerencia:
1. Iniciar sesión en el panel administrativo de Wix:  
   👉 `manage.wix.com`
2. En el menú lateral izquierdo, ir a **CMS** $\rightarrow$ **Colecciones** $\rightarrow$ seleccionar **`Despachos`** (o *Orders_Tracking*).
3. Aparecerá una tabla con los envíos de la empresa:
   | Número de Guía / Factura | Cliente / Destino | Estado Actual (Desplegable) | Novedad / Comentario | Transportadora |
   | :--- | :--- | :--- | :--- | :--- |
   | `DTL-2026-8941` | Bogotá D.C. | **En Tránsito** ▾ | En reparto con conductor | Envía / Flota Detalgraf |
   | `DTL-2026-1001` | Chía, Cundinamarca | **Entregado** ▾ | Recibido a satisfacción | Flota Propia |

4. **Para actualizar un pedido existente:**
   - La Gerencia solo hace clic en la celda **Estado Actual** y elige en el menú desplegable una de las 4 etapas:
     1. `Confirmado`
     2. `En Preparación`
     3. `En Tránsito`
     4. `Entregado`
   - Si lo desea, edita el campo de novedad (ej. *"Vehículo en ruta hacia Fontibón"*).
   - El cambio se guarda automáticamente en 1 segundo.

5. **Para agregar un nuevo pedido:**
   - Clic en el botón **+ Nuevo elemento** (fila nueva).
   - Escribir la guía (ej. `DTL-2026-9050`) y seleccionar el estado inicial `Confirmado`.

---

### 📊 OPCIÓN 2: Vía Hoja de Cálculo de Google Sheets (Directo desde el Teléfono)

Si la Gerencia prefiere no entrar al panel de Wix:
1. Se habilita una hoja compartida en Google Drive llamada **"Despachos Detalgraf"**.
2. La Gerencia o bodega actualiza la columna de estado desde su teléfono móvil en la app de Google Sheets.
3. Wix lee esa hoja en tiempo real mediante un Webhook automatizado.

---

### 📱 Experiencia del Cliente en `detalgraf.com/tracking`:
En el momento exacto en que la Gerencia cambia el estado a **"En Tránsito"** o **"Entregado"**, cualquier cliente que ingrese su número de guía verá:
* El círculo correspondiente iluminado en **Verde Esmeralda**.
* El paso activo con pulso dinámico.
* La fecha, hora y comentario ingresado por la Gerencia.
* El botón directo de WhatsApp para comunicarse con el conductor asignado.
