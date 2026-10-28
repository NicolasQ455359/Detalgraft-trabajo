/**
 * NQC AI CHATBOT — ASISTENTE VIRTUAL OFICIAL DETALGRAF S.A.S.
 * Respuestas autónomas, técnicas, resolutivas y sin rodeos.
 */

(function () {
  'use strict';

  const CHAT_CONFIG = {
    botName: 'Asistente Detalgraf',
    companyEmail: 'info@detalgraf.com',
    minBogota: 100000,
    minNacional: 200000,
    deliveryBogota: '24 a 48 horas hábiles con Flota Propia Detalgraf',
    deliveryNacional: '2 a 5 días hábiles mediante transportadoras aliadas'
  };

  let chatHistory = [];
  let isChatOpen = false;

  document.addEventListener('DOMContentLoaded', () => {
    initChatInterface();
    showTooltipWelcome();
  });

  function initChatInterface() {
    const launcher = document.getElementById('nqcChatLauncher');
    const closeBtn = document.getElementById('nqcChatCloseBtn');
    const restartBtn = document.getElementById('nqcChatRestartBtn');

    if (launcher) launcher.addEventListener('click', toggleChat);
    if (closeBtn) closeBtn.addEventListener('click', closeChat);
    if (restartBtn) restartBtn.addEventListener('click', restartChat);

    if (chatHistory.length === 0) {
      sendWelcomeMessage();
    }
  }

  function showTooltipWelcome() {
    const tooltip = document.getElementById('nqcChatTooltip');
    if (!tooltip) return;

    setTimeout(() => {
      if (!isChatOpen) {
        tooltip.classList.add('show');
        setTimeout(() => tooltip.classList.remove('show'), 7000);
      }
    }, 3500);
  }

  function toggleChat() {
    isChatOpen ? closeChat() : openChat();
  }

  function openChat() {
    const windowEl = document.getElementById('nqcChatWindow');
    const launcher = document.getElementById('nqcChatLauncher');
    const tooltip = document.getElementById('nqcChatTooltip');
    const input = document.getElementById('nqcChatInput');

    if (windowEl) {
      windowEl.style.display = 'flex';
      isChatOpen = true;
    }
    if (launcher) launcher.classList.add('is-active');
    if (tooltip) tooltip.classList.remove('show');
    if (input) setTimeout(() => input.focus(), 300);

    scrollToBottom();
  }

  function closeChat() {
    const windowEl = document.getElementById('nqcChatWindow');
    const launcher = document.getElementById('nqcChatLauncher');

    if (windowEl) {
      windowEl.style.display = 'none';
      isChatOpen = false;
    }
    if (launcher) launcher.classList.remove('is-active');
  }

  function restartChat() {
    const messagesEl = document.getElementById('nqcChatMessages');
    if (messagesEl) messagesEl.innerHTML = '';
    chatHistory = [];
    sendWelcomeMessage();
  }

  function scrollToBottom() {
    const messagesEl = document.getElementById('nqcChatMessages');
    if (messagesEl) {
      messagesEl.scrollTop = messagesEl.scrollHeight;
    }
  }

  function setTyping(isTyping) {
    const indicator = document.getElementById('nqcChatTyping');
    if (indicator) {
      indicator.style.display = isTyping ? 'inline-flex' : 'none';
      if (isTyping) scrollToBottom();
    }
  }

  // 1. Menú Principal de Opciones en el Chat (6 opciones claras)
  function getInlineOptionsHtml() {
    return `
      <div class="nqc-chat-options-grid">
        <button type="button" class="nqc-chat-inline-pill" onclick="window.nqcChatTriggerAction('pedido_minimo', '📦 Pedido mínimo')">📦 Pedido mínimo</button>
        <button type="button" class="nqc-chat-inline-pill" onclick="window.nqcChatTriggerAction('rastreo', '🚚 Rastrear pedido')">🚚 Rastrear pedido</button>
        <button type="button" class="nqc-chat-inline-pill" onclick="window.nqcChatTriggerAction('recomendaciones', '💡 Recomendación de productos')">💡 Recomendación de productos</button>
        <button type="button" class="nqc-chat-inline-pill" onclick="window.nqcChatTriggerAction('fichas', '📑 Fichas técnicas')">📑 Fichas técnicas</button>
        <button type="button" class="nqc-chat-inline-pill" onclick="window.nqcChatTriggerAction('cotizar_b2b', '🏢 Cotizar empresas')">🏢 Cotizar empresas</button>
        <button type="button" class="nqc-chat-inline-pill" onclick="window.nqcChatTriggerAction('faqs', '❓ Preguntas frecuentes')">❓ Preguntas frecuentes</button>
      </div>
    `;
  }

  // 2. Submenú interactivo para Categorías de Productos
  function getProductCategoriesHtml() {
    return `
      <div class="nqc-chat-options-grid">
        <button type="button" class="nqc-chat-inline-pill" onclick="window.nqcChatTriggerAction('cat_desengrasante', '🍳 Cocina & Grasa')">🍳 Cocina & Grasa</button>
        <button type="button" class="nqc-chat-inline-pill" onclick="window.nqcChatTriggerAction('cat_cloro', '🧴 Cloro & Desinfección')">🧴 Cloro & Desinfección</button>
        <button type="button" class="nqc-chat-inline-pill" onclick="window.nqcChatTriggerAction('cat_lavanderia', '🧺 Lavandería & Ropa')">🧺 Lavandería & Ropa</button>
        <button type="button" class="nqc-chat-inline-pill" onclick="window.nqcChatTriggerAction('cat_pisos', '✨ Cuidado de Pisos')">✨ Cuidado de Pisos</button>
        <button type="button" class="nqc-chat-inline-pill" onclick="window.nqcChatTriggerAction('cat_jabon', '🧼 Higiene & Manos')">🧼 Higiene & Manos</button>
        <button type="button" class="nqc-chat-inline-pill" onclick="window.nqcChatTriggerAction('cat_panos', '🧻 Paños & Wypall')">🧻 Paños & Wypall</button>
      </div>
    `;
  }

  function sendWelcomeMessage() {
    const text = `¡Hola! 👋 Te damos la bienvenida a **Detalgraf / DetalShop**.\n\nSoy tu asesor técnico y comercial. Puedes preguntarme libremente lo que necesites o seleccionar una opción rápida:`;
    appendMessage('bot', text, getInlineOptionsHtml());
  }

  function appendMessage(sender, text, htmlExtras = '') {
    const messagesEl = document.getElementById('nqcChatMessages');
    if (!messagesEl) return;

    const msgDiv = document.createElement('div');
    msgDiv.className = sender === 'user' ? 'nqc-msg-user' : 'nqc-msg-bot';

    let formattedText = escapeHtml(text)
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\n/g, '<br>');

    const timeStr = new Date().toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' });

    msgDiv.innerHTML = `
      <div>${formattedText}</div>
      ${htmlExtras}
      <div class="nqc-msg-time">${timeStr}</div>
    `;

    messagesEl.appendChild(msgDiv);
    chatHistory.push({ sender, text });
    scrollToBottom();
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  // Envío libre de mensajes desde la caja de texto (Enter o Botón Enviar)
  window.nqcChatSendMessage = function () {
    const input = document.getElementById('nqcChatInput');
    if (!input) return;

    const query = input.value.trim();
    if (!query) return;

    appendMessage('user', query);
    input.value = '';

    setTyping(true);
    setTimeout(() => {
      processUserQuery(query);
    }, 400);
  };

  // Clics en Opciones Rápidas Integradas
  window.nqcChatTriggerAction = function (action, label) {
    appendMessage('user', label);
    setTyping(true);

    setTimeout(() => {
      switch (action) {
        case 'pedido_minimo':
          explainMinimumOrder();
          break;
        case 'rastreo':
          explainTrackingHelp();
          break;
        case 'recomendaciones':
          askProductCategory();
          break;
        case 'fichas':
          explainFichasTecnicas();
          break;
        case 'cotizar_b2b':
          explainB2BQuote();
          break;
        case 'faqs':
          explainFaqs();
          break;
        case 'cat_desengrasante':
          recommendDesengrasante();
          break;
        case 'cat_cloro':
          recommendCloroBlancox('');
          break;
        case 'cat_lavanderia':
          recommendLavanderia('detergente');
          break;
        case 'cat_pisos':
          recommendPisos('');
          break;
        case 'cat_jabon':
          recommendJabonManos();
          break;
        case 'cat_panos':
          recommendPanos();
          break;
        default:
          processUserQuery(label);
      }
    }, 400);
  };

  // Redirección directa al Tracking (Punto 2 del usuario)
  window.goToTracking = function () {
    closeChat();
    if (typeof switchView === 'function' && document.getElementById('viewTrack')) {
      switchView('track');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.location.href = '/#tracking';
    }
  };

  // =========================================================================
  // MOTOR CONVERSACIONAL AUTÓNOMO
  // =========================================================================

  async function processUserQuery(query) {
    const qLower = query.toLowerCase().trim();
    const qClean = qLower.replace(/[¡!¿?,.]/g, '');

    // 1. SALUDOS Y CORTESÍA (Respuesta humana y autónoma)
    const isGreeting = /^(hola|buenas|buen dia|buenos dias|buenas tardes|buenas noches|que tal|como estas|cómo estás|como te va|hey|saludos|hello)\b/i.test(qClean);
    if (isGreeting) {
      setTyping(false);
      const text = `¡Hola! ¿Cómo estás? Qué gusto saludarte.\n\nCon gusto te asesoro. Puedes consultarme sobre productos de limpieza, usos y dosificaciones, pedidos mínimos, el estado de tus envíos o cotizaciones al por mayor.\n\n¿Qué te gustaría saber hoy?`;
      appendMessage('bot', text, getInlineOptionsHtml());
      return;
    }

    // 2. AGRADECIMIENTOS Y DESPEDIDAS
    const isThanks = /^(gracias|muchas gracias|mil gracias|vale|ok|perfecto|listo|chao|hasta luego|adios|excelente|entendido)\b/i.test(qClean);
    if (isThanks) {
      setTyping(false);
      const text = `¡Con muchísimo gusto! Aquí estaré siempre que necesites asesoría sobre productos o tus compras en **DetalShop**.\n\n¡Que tengas un excelente día! ✨`;
      appendMessage('bot', text);
      return;
    }

    // 3. CONSULTA DE OPCIONES / MENÚ
    if (qLower.includes('opciones') || qLower.includes('menu') || qLower.includes('menú') || qLower.includes('ayuda') || qLower.includes('inicio')) {
      setTyping(false);
      const text = `Aquí tienes las opciones principales de consulta rápida. También puedes escribirme directamente cualquier pregunta o producto que busques:`;
      appendMessage('bot', text, getInlineOptionsHtml());
      return;
    }

    // 4. IDENTIDAD: "¿QUIÉN ERES?" / "¿QUÉ HACES?"
    if (qLower.includes('quien eres') || qLower.includes('quién eres') || qLower.includes('que eres') || qLower.includes('qué eres') || qLower.includes('que haces') || qLower.includes('qué haces')) {
      setTyping(false);
      const text = `Soy el asistente virtual de **Detalgraf S.A.S.** y **DetalShop.com**.\n\nConozco todo nuestro catálogo de productos de aseo, desinfección, lavandería e insumos institucionales. Puedo ayudarte a elegir el producto adecuado, verificar pedidos mínimos, guiarte al rastreo de despachos o cotizar compras por volumen.`;
      appendMessage('bot', text, getInlineOptionsHtml());
      return;
    }

    // 5. UBICACIÓN / "¿DÓNDE ESTÁN?" / "¿TIENEN TIENDA FÍSICA?"
    if (qLower.includes('donde estan') || qLower.includes('dónde están') || qLower.includes('ubicacion') || qLower.includes('ubicación') || qLower.includes('direccion') || qLower.includes('dirección') || qLower.includes('tienda fisica') || qLower.includes('tienda física')) {
      setTyping(false);
      const text = `Nuestra planta de producción y centro logístico principal está en **Bogotá D.C., Colombia**.\n\n• **Despachos:** Entregamos en Bogotá y Sabana en 24 a 48 horas hábiles con nuestra flota propia, y realizamos envíos a todo el país.\n• **Ventas:** Puedes comprar directamente en esta tienda virtual las 24 horas del día.`;
      appendMessage('bot', text);
      return;
    }

    // 6. CATÁLOGO GENERAL / RECOMENDACIONES / "QUÉ VENDEN"
    if (qLower.includes('recomendacion') || qLower.includes('recomendación') || qLower.includes('recomendar') || qLower.includes('recomiendas') || qLower.includes('catalogo') || qLower.includes('catálogo') || qLower.includes('que venden') || qLower.includes('qué venden') || qLower.includes('que tienen') || qLower.includes('qué tienen')) {
      setTyping(false);
      askProductCategory();
      return;
    }

    // 7. DETECCIÓN DE WHATSAPP (REGLA CORPORATIVA ESTRICTA)
    if (qLower.includes('whatsapp') || qLower.includes('celular') || qLower.includes('telefono') || qLower.includes('teléfono') || qLower.includes('wasap') || qLower.includes('wsp')) {
      setTyping(false);
      const text = `En **Detalgraf S.A.S.** centralizamos toda nuestra atención comercial y soporte exclusivamente a través de **${CHAT_CONFIG.companyEmail}** y nuestro formulario web oficial.\n\nEsto nos permite garantizar la trazabilidad de cada solicitud y brindarte una respuesta ordenada y segura.\n\nSi necesitas algo más o deseas radicar una consulta personalizada, con gusto puedes comunicarte a nuestro correo oficial.`;
      const extras = `
        <div style="margin-top:8px;">
          <button class="nqc-chat-action-btn" onclick="if(typeof openContactModal==='function')openContactModal();">✉️ Comunicarse al correo oficial</button>
        </div>
      `;
      appendMessage('bot', text, extras);
      return;
    }

    // 8. RASTREO DE PEDIDOS (REDIRECCIÓN DIRECTA AL TRACKING)
    if (qLower.includes('rastrear') || qLower.includes('rastreo') || qLower.includes('pedido') || qLower.includes('orden') || qLower.includes('guia') || qLower.includes('guía') || qLower.includes('donde esta mi pedido') || qLower.includes('dónde está mi pedido') || qLower.includes('mi paquete') || /#?\d{4}/.test(qLower)) {
      setTyping(false);
      explainTrackingHelp();
      return;
    }

    // 9. PEDIDO MÍNIMO / DESPACHOS / PAGOS
    if (qLower.includes('pedido minimo') || qLower.includes('pedido mínimo') || qLower.includes('cuanto es lo minimo') || qLower.includes('cuánto es lo mínimo') || qLower.includes('no me deja pagar') || qLower.includes('envio') || qLower.includes('envío') || qLower.includes('cobertura') || qLower.includes('flete')) {
      setTyping(false);
      await explainMinimumOrder();
      return;
    }

    // 10. FICHAS TÉCNICAS / HOJAS DE SEGURIDAD / CERTIFICADOS
    if (qLower.includes('ficha') || qLower.includes('tecnica') || qLower.includes('técnica') || qLower.includes('seguridad') || qLower.includes('msds') || qLower.includes('hds') || qLower.includes('invima') || qLower.includes('certificado')) {
      setTyping(false);
      explainFichasTecnicas();
      return;
    }

    // 11. COTIZACIÓN B2B / POR MAYOR
    if (qLower.includes('cotizar') || qLower.includes('cotizacion') || qLower.includes('cotización') || qLower.includes('empresa') || qLower.includes('mayor') || qLower.includes('volumen') || qLower.includes('canecas') || qLower.includes('tambor') || qLower.includes('nit')) {
      setTyping(false);
      explainB2BQuote();
      return;
    }

    // 12. CASOS DE LIMPIEZA ESPECÍFICOS Y PRODUCTOS
    if (qLower.includes('grasa') || qLower.includes('campana') || qLower.includes('estufa') || qLower.includes('motor') || qLower.includes('taller') || qLower.includes('desengrasante')) {
      setTyping(false);
      recommendDesengrasante();
      return;
    }

    if (qLower.includes('blancox') || qLower.includes('cloro') || qLower.includes('hipoclorito') || qLower.includes('desinfectante')) {
      setTyping(false);
      recommendCloroBlancox(qLower);
      return;
    }

    if (qLower.includes('sarro') || qLower.includes('oxido') || qLower.includes('óxido') || qLower.includes('inodoro') || qLower.includes('sanitario') || qLower.includes('desincrustante') || qLower.includes('baño') || qLower.includes('baños')) {
      setTyping(false);
      recommendDesincrustante();
      return;
    }

    if (qLower.includes('piso') || qLower.includes('madera') || qLower.includes('porcelanato') || qLower.includes('marmol') || qLower.includes('mármol') || qLower.includes('cera')) {
      setTyping(false);
      recommendPisos(qLower);
      return;
    }

    if (qLower.includes('detergente') || qLower.includes('lavanderia') || qLower.includes('lavandería') || qLower.includes('ropa') || qLower.includes('suavizante')) {
      setTyping(false);
      recommendLavanderia(qLower);
      return;
    }

    if (qLower.includes('jabon') || qLower.includes('jabón') || qLower.includes('manos') || qLower.includes('quirurgico') || qLower.includes('quirúrgico') || qLower.includes('kleenex')) {
      setTyping(false);
      recommendJabonManos();
      return;
    }

    if (qLower.includes('wypall') || qLower.includes('paño') || qLower.includes('toalla') || qLower.includes('papel') || qLower.includes('tork')) {
      setTyping(false);
      recommendPanos();
      return;
    }

    // 13. BÚSQUEDA DIRECTA EN EL CATÁLOGO (934 PRODUCTOS)
    const matchingProducts = searchLocalProducts(query);
    if (matchingProducts.length > 0) {
      setTyping(false);
      const text = `Encontré las siguientes opciones disponibles en nuestra tienda para **"${query}"**:\n\nPuedes ver los detalles o agregarlos directamente a tu carrito:`;
      const cardsHtml = renderProductCardsHtml(matchingProducts.slice(0, 2));
      appendMessage('bot', text, cardsHtml);
      return;
    }

    // 14. RESPUESTA RESOLUTIVA GENERAL AUTÓNOMA
    setTyping(false);
    const resolvedText = `En **Detalgraf** fabricamos y distribuimos insumos de aseo institucional, desinfección, lavandería y tratamiento de superficies.\n\nPara orientarte mejor con **"${query}"**, puedes indicarme qué superficie deseas limpiar o qué tipo de producto buscas (por ejemplo: desengrasante, cloro, detergente o jabón).\n\n*Nota: Si necesitas algo más o una cotización personalizada con un asesor, con gusto también puedes comunicarte a **${CHAT_CONFIG.companyEmail}**.*`;
    appendMessage('bot', resolvedText, getInlineOptionsHtml());
  }

  // =========================================================================
  // SUB-RUTINAS DE RESPUESTAS CONCRETAS Y TÉCNICAS
  // =========================================================================

  // Pregunta interactiva de categorías para Recomendaciones
  function askProductCategory() {
    const text = `¿Para qué área o necesidad buscas producto? Selecciona una categoría o cuéntame qué deseas limpiar:`;
    appendMessage('bot', text, getProductCategoriesHtml());
  }

  // Rastrear Pedido: Explicación y botón directo a tracking
  function explainTrackingHelp() {
    const text = `Puedes consultar la ubicación y estado de tu despacho en tiempo real ingresando tu número de pedido (#XXXX) o número de guía en nuestro portal oficial de seguimiento.`;
    const extras = `
      <div style="margin-top:8px;">
        <button type="button" class="nqc-chat-action-btn" onclick="window.goToTracking()">🚚 Ir al Rastreador de Envíos</button>
      </div>
    `;
    appendMessage('bot', text, extras);
  }

  // Cotizar Empresas: Pasos claros y ÚNICO botón
  function explainB2BQuote() {
    const text = `Para solicitar una **cotización empresarial por volumen** con precios directos de fábrica, los pasos son muy sencillos:\n\n1. **Abre nuestro canal oficial:** Haz clic en el botón de abajo para abrir el formulario de correo.\n2. **Indica los datos de tu empresa:** Razón Social, NIT y Ciudad de entrega.\n3. **Especifica los productos requeridos:** Menciona las referencias y cantidades estimadas (ej: 10 canecas de 20L de jabón, 5 garrafas de desengrasante).\n\nNuestro equipo comercial revisará tu requerimiento y te enviará la propuesta formal con tiempos de despacho.`;
    const extras = `
      <div style="margin-top:8px;">
        <button type="button" class="nqc-chat-action-btn" onclick="if(typeof openContactModal==='function')openContactModal();">✉️ Comunicarse al correo oficial</button>
      </div>
    `;
    appendMessage('bot', text, extras);
  }

  // Preguntas Frecuentes (6ta opción)
  function explainFaqs() {
    const text = `Aquí tienes respuestas a las consultas más frecuentes:\n\n• **¿Cuáles son los medios de pago?** Pagos 100% seguros mediante Wompi (tarjetas de crédito/débito, PSE, Nequi y transferencias verificadas).\n• **¿Emiten Factura Electrónica?** Sí, todas nuestras ventas cuentan con Factura Electrónica DIAN. Recuerda diligenciar tu Cédula o NIT en el carrito.\n• **¿Tiempos de entrega?** 24 a 48 horas hábiles en Bogotá y Sabana, y de 2 a 5 días hábiles a nivel nacional.\n\n*Si necesitas algo más o una atención personalizada, con gusto también nos puedes escribir a **${CHAT_CONFIG.companyEmail}**.*`;
    const extras = `
      <div style="margin-top:8px;">
        <button type="button" class="nqc-chat-action-btn" onclick="if(typeof openContactModal==='function')openContactModal();">✉️ Comunicarse al correo oficial</button>
      </div>
    `;
    appendMessage('bot', text, extras);
  }

  async function explainMinimumOrder() {
    let cartTotal = 0;
    let itemCount = 0;

    try {
      const res = await fetch('/cart.js');
      const cart = await res.json();
      cartTotal = cart.total_price / 100;
      itemCount = cart.item_count;
    } catch (e) {}

    let text = `Nuestras políticas oficiales de despacho son:\n\n• **Bogotá y Sabana:** Pedido mínimo de **$100.000 COP** (${CHAT_CONFIG.deliveryBogota}).\n• **Resto del País:** Pedido mínimo de **$200.000 COP** (${CHAT_CONFIG.deliveryNacional}).`;

    let cartFeedback = '';
    if (itemCount > 0) {
      const diffBogota = CHAT_CONFIG.minBogota - cartTotal;
      const diffNac = CHAT_CONFIG.minNacional - cartTotal;

      cartFeedback = `\n\n📊 **Tu Carrito Actual:** Tienes **${itemCount} producto(s)** sumando **$${cartTotal.toLocaleString('es-CO')} COP**.\n`;
      if (diffBogota > 0) {
        cartFeedback += `• Te faltan **$${diffBogota.toLocaleString('es-CO')} COP** para pedidos en Bogotá.\n`;
      } else {
        cartFeedback += `• ✅ ¡Ya alcanzas el pedido mínimo para Bogotá!\n`;
      }
      if (diffNac > 0) {
        cartFeedback += `• Te faltan **$${diffNac.toLocaleString('es-CO')} COP** para despachos Nacionales.`;
      } else {
        cartFeedback += `• ✅ ¡Ya alcanzas el pedido mínimo Nacional!`;
      }
    }

    const note = `\n\n*Si necesitas algo más sobre coberturas especiales, con gusto también nos puedes escribir a **${CHAT_CONFIG.companyEmail}**.*`;

    const extras = `
      <div style="margin-top:8px; display:flex; gap:6px; flex-wrap:wrap;">
        <button type="button" class="nqc-chat-action-btn" onclick="if(typeof openCartDrawer==='function')openCartDrawer();">🛒 Ver Mi Carrito</button>
        <a class="nqc-chat-action-btn" href="/collections/all">📦 Ver Todo el Catálogo</a>
      </div>
    `;

    appendMessage('bot', text + cartFeedback + note, extras);
  }

  function explainFichasTecnicas() {
    const text = `Todas las **Fichas Técnicas y Hojas de Seguridad oficiales** están disponibles en nuestra tienda.\n\nPara consultar la ficha de cualquier producto:\n1. Ingresa a la página del producto.\n2. Haz clic en la pestaña **'Ficha Técnica'**.\n3. Allí encontrarás el botón directo para visualizar y descargar el PDF oficial.\n\n*Si necesitas algo más o requieres certificados de lote para auditorías, con gusto también nos puedes escribir a **${CHAT_CONFIG.companyEmail}**.*`;
    const extras = `
      <div style="margin-top:8px;">
        <button type="button" class="nqc-chat-action-btn" onclick="if(typeof openContactModal==='function')openContactModal();">✉️ Comunicarse al correo oficial</button>
      </div>
    `;
    appendMessage('bot', text, extras);
  }

  function recommendDesengrasante() {
    const text = `Para remover grasa pesada en campanas, estufas industriales, talleres o motores, el producto indicado es nuestro **Desengrasante Multiusos Industrial Detalgraf**.\n\n• **Modo de aplicación:** Aplica puro o 1:3 en agua tibia para suciedad acumulada (o 1:10 para mantenimiento regular). Deja actuar 5 a 10 minutos y retira con esponja o paño húmedo.\n• **Precaución:** Evita dejar secar sobre aluminio pulido.\n\n*Si necesitas algo más sobre fichas técnicas o compras por volumen, con gusto también nos puedes escribir a **${CHAT_CONFIG.companyEmail}**.*`;
    const prods = searchLocalProducts('desengrasante').slice(0, 2);
    appendMessage('bot', text, renderProductCardsHtml(prods));
  }

  function recommendCloroBlancox(qLower) {
    let warning = '';
    if (qLower && qLower.includes('madera')) {
      warning = '\n\n⚠️ **Precaución técnica:** Nunca apliques hipoclorito ni cloro sobre madera laminada porque decolora y deteriora la película protectora. Para madera usa limpiadores neutros.';
    }
    const text = `Disponemos de **Blancox Poder Natural** e Hipoclorito de Sodio para desinfección profunda bactericida de superficies y blanqueo textil.${warning}\n\n• **Presentaciones:** Frascos de 1L, Galón (4L) y Garrafa de 20L.\n\n*Si necesitas algo más o fichas de seguridad, con gusto también nos puedes escribir a **${CHAT_CONFIG.companyEmail}**.*`;
    const prods = searchLocalProducts('blancox').concat(searchLocalProducts('cloro')).slice(0, 2);
    appendMessage('bot', text, renderProductCardsHtml(prods));
  }

  function recommendDesincrustante() {
    const text = `Para remover sarro, manchas amarillas y óxido en sanitarios, orinales y lavamanos, te recomendamos el **Desincrustante Ácido para Baños**.\n\n• **Modo de uso:** Aplica directamente sobre el área con sarro, deja actuar de 3 a 5 minutos, refriega con churrusco o cepillo abrasivo y enjuaga con abundante agua.\n• **Recomendación:** Usa guantes y mantén ventilada el área.`;
    const prods = searchLocalProducts('desincrustante').concat(searchLocalProducts('limpiador banos')).slice(0, 2);
    appendMessage('bot', text, renderProductCardsHtml(prods));
  }

  function recommendPisos(qLower) {
    const text = `Para el mantenimiento de pisos (cerámica, porcelanato, mármol y madera laminada), recomendamos **Limpiadores Multiusos Neutros** y **Ceras Poliméricas Autobrillantes**.\n\n• **Ventaja:** No deterioran el brillo natural ni dejan película resbalosa. Para madera laminada usa trapero apenas húmedo.`;
    const prods = searchLocalProducts('limpiador').concat(searchLocalProducts('cera')).slice(0, 2);
    appendMessage('bot', text, renderProductCardsHtml(prods));
  }

  function recommendLavanderia(qLower) {
    const text = `Nuestra línea de lavandería incluye **Detergente Líquido Industrial de Alto Rendimiento** y **Suavizante Textil** que protegen fibras y colores.\n\n• **Dosificación recomendada:** 80ml a 120ml por carga de lavadora de 20kg.`;
    const prods = searchLocalProducts('detergente').slice(0, 2);
    appendMessage('bot', text, renderProductCardsHtml(prods));
  }

  function recommendJabonManos() {
    const text = `Para higiene en oficinas, clínicas y restaurantes manejamos **Jabón Líquido Antibacterial** y **Kleenex Foam / Espuma** con humectantes que evitan resequedad en la piel.`;
    const prods = searchLocalProducts('jabon').concat(searchLocalProducts('kleenex')).slice(0, 2);
    appendMessage('bot', text, renderProductCardsHtml(prods));
  }

  function recommendPanos() {
    const text = `Para secado y limpieza sin pelusa, recomendamos **Wypall X-75 Plus Industrial** y paños de microfibra Tork de alta resistencia a solventes y grasas.`;
    const prods = searchLocalProducts('wypall').concat(searchLocalProducts('tork')).slice(0, 2);
    appendMessage('bot', text, renderProductCardsHtml(prods));
  }

  function searchLocalProducts(query) {
    const catalog = (typeof PRODUCTS_DATA !== 'undefined' && Array.isArray(PRODUCTS_DATA)) ? PRODUCTS_DATA : (window.SHOPIFY_STORE_PRODUCTS || []);
    if (!catalog.length) return [];

    const words = query.toUpperCase().split(/\s+/).filter(w => w.length > 2);
    if (!words.length) return [];

    return catalog.filter(p => {
      const title = (p.title || '').toUpperCase();
      return words.some(w => title.includes(w));
    });
  }

  function renderProductCardsHtml(products) {
    if (!products || !products.length) return '';

    let html = '<div style="display:flex; flex-direction:column; gap:8px; margin-top:8px;">';
    products.forEach(p => {
      const priceFmt = (p.price ? Math.round(p.price) : 0).toLocaleString('es-CO');
      const img = p.image || 'https://cdn.shopify.com/s/files/1/0285/4309/0820/files/logo_detalshop_oficial.png';
      const handle = p.handle || '';
      const variantId = p.variant_id || '';

      html += `
        <div class="nqc-chat-product-card">
          <img src="${img}" alt="${escapeHtml(p.title)}" class="nqc-chat-product-img" onerror="this.src='https://cdn.shopify.com/s/files/1/0285/4309/0820/files/logo_detalshop_oficial.png'">
          <div class="nqc-chat-product-info">
            <div class="nqc-chat-product-title" title="${escapeHtml(p.title)}">${escapeHtml(p.title)}</div>
            <div class="nqc-chat-product-price">$${priceFmt} COP</div>
            <div class="nqc-chat-product-actions">
              <a href="/products/${handle}" class="nqc-chat-btn-product nqc-chat-btn-view">Ver Producto</a>
              ${variantId ? `<button type="button" class="nqc-chat-btn-product nqc-chat-btn-add" onclick="window.nqcChatAddToCart(${variantId}, this)">+ Agregar</button>` : ''}
            </div>
          </div>
        </div>
      `;
    });
    html += '</div>';
    return html;
  }

  // Funciones globales expuestas
  window.openNqcChat = openChat;
  window.closeNqcChat = closeChat;
  window.toggleNqcChat = toggleChat;

  window.nqcChatAddToCart = async function (variantId, btnElement) {
    if (!variantId) return;
    const oldText = btnElement ? btnElement.textContent : '';
    if (btnElement) {
      btnElement.disabled = true;
      btnElement.textContent = 'Agregando...';
    }

    try {
      const res = await fetch('/cart/add.js', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: variantId, quantity: 1 })
      });
      if (res.ok) {
        if (btnElement) btnElement.textContent = '✓ Agregado';
        if (typeof openCartDrawer === 'function') {
          setTimeout(() => openCartDrawer(), 400);
        }
      } else {
        if (btnElement) btnElement.textContent = 'Error';
      }
    } catch (e) {
      if (btnElement) btnElement.textContent = 'Error';
    } finally {
      setTimeout(() => {
        if (btnElement) {
          btnElement.disabled = false;
          btnElement.textContent = oldText || '+ Agregar';
        }
      }, 2000);
    }
  };

})();
