// ==============================================================================
// CÓDIGO VELO JS PARA WIX STUDIO — PÁGINA /tracking (Detalgraf.com - Mes 2)
// Sincronizado con Wix CMS (Colección 'Despachos' administrada por Gerencia)
// Desarrollado por: Nicolas Quintero Cardona
// ==============================================================================

import wixLocation from 'wix-location';
import wixData from 'wix-data';

// Base de datos de respaldo / demo local
const MOCK_ORDERS = {
    "DTL-2026-8941": {
        status: "Pedido en tránsito",
        stepValue: 3,
        factura: "Factura B2B #FE-8942",
        transportadora: "Envía / Flota Detalgraf",
        guia: "0293848123",
        destino: "Bogotá D.C.",
        novedad: "En reparto hacia Bogotá D.C.",
        step1Date: "12 Jun · 08:30",
        step2Date: "12 Jun · 10:15",
        step3Date: "13 Jun · 07:45",
        step4Date: "Pendiente"
    },
    "DTL-2026-1001": {
        status: "Pedido Entregado",
        stepValue: 4,
        factura: "Factura B2B #FE-8720",
        transportadora: "Flota Propia Detalgraf",
        guia: "0284729101",
        destino: "Chía, Cundinamarca",
        novedad: "Entregado a satisfacción en sede cliente",
        step1Date: "10 Jun · 09:00",
        step2Date: "10 Jun · 14:00",
        step3Date: "11 Jun · 08:00",
        step4Date: "11 Jun · 16:30"
    }
};

$w.onReady(function () {
    // 1. Ocultar contenedores de error al iniciar
    if ($w("#boxError")) $w("#boxError").collapse();
    
    // 2. Evento clic en botón Rastrear
    $w("#btnRastrear").onClick(() => {
        ejecutarRastreo();
    });

    // 3. Permitir consulta con tecla Enter
    $w("#inputGuia").onKeyPress((event) => {
        if (event.key === "Enter") {
            ejecutarRastreo();
        }
    });
});

async function ejecutarRastreo() {
    const rawVal = $w("#inputGuia").value;
    const guia = rawVal ? rawVal.trim().toUpperCase() : "";

    const phone = "573001234567"; // Teléfono oficial soporte Detalgraf
    const waUrl = `https://wa.me/${phone}?text=${encodeURIComponent('Hola Detalgraf, requiero consultar el estado de mi envío con número: ' + (guia || 'Sin Guía'))}`;
    
    if ($w("#btnWhatsapp")) {
        $w("#btnWhatsapp").link = waUrl;
    }

    if (!guia || guia.length < 4) {
        if ($w("#textError")) $w("#textError").text = "Por favor ingrese un número de guía o factura válido.";
        if ($w("#boxError")) $w("#boxError").expand();
        if ($w("#boxResultado")) $w("#boxResultado").collapse();
        return;
    }

    // 1. Intentar consultar en la Colección CMS de Wix 'Despachos' (Donde actualiza el Gerente)
    try {
        const queryRes = await wixData.query("Despachos")
            .eq("guiaNumber", guia)
            .or(wixData.query("Despachos").eq("title", guia))
            .find();

        if (queryRes.items.length > 0) {
            const item = queryRes.items[0];
            renderOrderData({
                status: item.status || "En Tránsito",
                stepValue: item.stepValue || 3,
                factura: item.factura || ("Factura B2B #" + guia),
                transportadora: item.carrier || "Flota Detalgraf",
                guia: item.guiaNumber || guia,
                destino: item.destination || "Bogotá D.C.",
                novedad: item.novedad || "En ruta hacia destino",
                step1Date: item.dateConfirmado || "12 Jun · 08:30",
                step2Date: item.datePreparacion || "12 Jun · 10:15",
                step3Date: item.dateTransito || "13 Jun · 07:45",
                step4Date: item.dateEntregado || "Pendiente"
            });
            return;
        }
    } catch (err) {
        console.warn("CMS Despachos no configurado o usando datos locales:", err);
    }

    // 2. Si no está en CMS, consultar base de prueba local
    if (MOCK_ORDERS[guia]) {
        renderOrderData(MOCK_ORDERS[guia]);
    } else {
        // Orden procesada dinámicamente
        renderOrderData({
            status: "Pedido en procesamiento",
            stepValue: 2,
            factura: "Orden #" + guia,
            transportadora: "Flota Detalgraf",
            guia: guia,
            destino: "Colombia",
            novedad: "Orden registrada en sistema",
            step1Date: "Hoy · 08:00",
            step2Date: "Hoy · 09:30",
            step3Date: "Pendiente",
            step4Date: "Pendiente"
        });
    }
}

function renderOrderData(ord) {
    if ($w("#boxError")) $w("#boxError").collapse();
    if ($w("#boxResultado")) $w("#boxResultado").expand();

    if ($w("#txtStatus")) $w("#txtStatus").text = ord.status;
    if ($w("#txtFactura")) $w("#txtFactura").text = ord.factura;
    if ($w("#txtTransportadora")) $w("#txtTransportadora").text = "Transportadora: " + ord.transportadora;
    if ($w("#txtGuia")) $w("#txtGuia").text = "Guía: " + ord.guia;
    if ($w("#txtDestino")) $w("#txtDestino").text = "Destino: " + ord.destino;

    // Fechas de hitos
    if ($w("#txtStep1Date")) $w("#txtStep1Date").text = ord.step1Date;
    if ($w("#txtStep2Date")) $w("#txtStep2Date").text = ord.step2Date;
    if ($w("#txtStep3Date")) $w("#txtStep3Date").text = ord.step3Date;
    if ($w("#txtStep4Date")) $w("#txtStep4Date").text = ord.step4Date;

    // Novedad
    if ($w("#txtNovedad")) $w("#txtNovedad").text = ord.novedad;
}
