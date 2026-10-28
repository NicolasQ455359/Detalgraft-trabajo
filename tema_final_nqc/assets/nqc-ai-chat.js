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

  // 2. Submenú interactivo con las 5 Líneas Oficiales ("NUESTRAS LINEAS")
  function getProductCategoriesHtml() {
    return `
      <div class="nqc-chat-options-grid">
        <button type="button" class="nqc-chat-inline-pill" onclick="window.nqcChatTriggerAction('linea_aseo', '🧹 Productos de Aseo')">🧹 Productos de Aseo</button>
        <button type="button" class="nqc-chat-inline-pill" onclick="window.nqcChatTriggerAction('linea_bioseguridad', '🛡️ Productos de Bioseguridad')">🛡️ Productos de Bioseguridad</button>
        <button type="button" class="nqc-chat-inline-pill" onclick="window.nqcChatTriggerAction('linea_cafeteria', '☕ Productos de Cafetería')">☕ Productos de Cafetería</button>
        <button type="button" class="nqc-chat-inline-pill" onclick="window.nqcChatTriggerAction('linea_papeleria', '📄 Productos de Papelería')">📄 Productos de Papelería</button>
        <button type="button" class="nqc-chat-inline-pill" onclick="window.nqcChatTriggerAction('linea_seguridad', '🦺 Productos de Seguridad Industrial')">🦺 Productos de Seguridad Industrial</button>
        <button type="button" class="nqc-chat-inline-pill" onclick="window.nqcChatTriggerAction('linea_todas', '📦 Ver Todas las Líneas')">📦 Ver Todas las Líneas</button>
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
        case 'linea_aseo':
          recommendLineaAseo();
          break;
        case 'linea_bioseguridad':
          recommendLineaBioseguridad();
          break;
        case 'linea_cafeteria':
          recommendLineaCafeteria();
          break;
        case 'linea_papeleria':
          recommendLineaPapeleria();
          break;
        case 'linea_seguridad':
          recommendLineaSeguridad();
          break;
        case 'linea_todas':
          recommendLineaTodas();
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

  // Redirección directa al Catálogo filtrado por Línea Oficial
  window.goToLineCatalog = function (category) {
    closeChat();
    if (typeof window.switchView === 'function') {
      window.switchView('home');
    }
    if (typeof window.filterHomeCatalog === 'function') {
      window.filterHomeCatalog(category);
    }
    setTimeout(() => {
      const catalogEl = document.getElementById('catalogSection') || document.querySelector('.main-catalog-section') || document.querySelector('.category-filter-bar');
      if (catalogEl) {
        catalogEl.scrollIntoView({ behavior: 'smooth' });
      } else if (typeof window.scrollToCatalog === 'function') {
        window.scrollToCatalog();
      }
    }, 120);
  };

  // Visualización de Ficha Técnica / PDP directa desde el Chat
  window.viewProductDetail = function (productId, handle) {
    closeChat();
    if (typeof window.openPdpWithProduct === 'function' && document.getElementById('viewPdp')) {
      window.openPdpWithProduct(productId);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (handle) {
      window.location.href = '/products/' + handle;
    }
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

    // 6. CATÁLOGO GENERAL / RECOMENDACIONES / "QUÉ VENDEN" / "LÍNEAS"
    if (qLower.includes('recomendacion') || qLower.includes('recomendación') || qLower.includes('recomendar') || qLower.includes('recomiendas') || qLower.includes('catalogo') || qLower.includes('catálogo') || qLower.includes('que venden') || qLower.includes('qué venden') || qLower.includes('que tienen') || qLower.includes('qué tienen') || qLower.includes('lineas') || qLower.includes('líneas') || qLower.includes('nuestras lineas') || qLower.includes('nuestras líneas')) {
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

    // 12. CONSULTA DE LÍNEAS OFICIALES O CASOS DE LIMPIEZA ESPECÍFICOS
    if (qClean === 'aseo' || qClean === 'productos de aseo' || qClean === 'linea de aseo' || qClean === 'linea aseo') {
      setTyping(false);
      recommendLineaAseo();
      return;
    }

    if (qClean === 'bioseguridad' || qClean === 'productos de bioseguridad' || qClean === 'linea de bioseguridad' || qClean === 'linea bioseguridad') {
      setTyping(false);
      recommendLineaBioseguridad();
      return;
    }

    if (qClean === 'cafeteria' || qClean === 'cafetería' || qClean === 'productos de cafeteria' || qClean === 'linea de cafeteria' || qClean === 'linea cafeteria') {
      setTyping(false);
      recommendLineaCafeteria();
      return;
    }

    if (qClean === 'papeleria' || qClean === 'papelería' || qClean === 'productos de papeleria' || qClean === 'linea de papeleria' || qClean === 'linea papeleria') {
      setTyping(false);
      recommendLineaPapeleria();
      return;
    }

    if (qClean === 'seguridad' || qClean === 'seguridad industrial' || qClean === 'productos de seguridad industrial' || qClean === 'linea de seguridad industrial' || qClean === 'epp') {
      setTyping(false);
      recommendLineaSeguridad();
      return;
    }

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

  // Pregunta interactiva de categorías para Recomendaciones (Líneas Oficiales)
  function askProductCategory() {
    const text = `Te presentamos nuestras **5 Líneas Oficiales** de productos institucionales. Selecciona una línea para ver los productos recomendados o cuéntame qué necesidad específica buscas resolver:`;
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

  // =========================================================================
  // RECOMENDADORES DE LAS 5 LÍNEAS OFICIALES ("NUESTRAS LINEAS")
  // =========================================================================

  function getCatalogProducts() {
    if (typeof PRODUCTS_DATA !== 'undefined' && Array.isArray(PRODUCTS_DATA) && PRODUCTS_DATA.length > 0) {
      return PRODUCTS_DATA;
    }
    if (typeof window !== 'undefined' && window.SHOPIFY_STORE_PRODUCTS && Array.isArray(window.SHOPIFY_STORE_PRODUCTS)) {
      return window.SHOPIFY_STORE_PRODUCTS;
    }
    return [];
  }

  function getFeaturedProducts(lineOrCategory, keywords = []) {
    const catalog = getCatalogProducts();
    if (!catalog.length) return [];

    let filtered = [];
    const catLow = lineOrCategory.toLowerCase();

    // 1. Priorizar coincidencias por palabras clave
    for (const kw of keywords) {
      const kwLow = kw.toLowerCase();
      const match = catalog.find(p => {
        const titleLow = (p.title || '').toLowerCase();
        const pCatLow = (p.category || '').toLowerCase();
        const pSubcatLow = (p.subcat || '').toLowerCase();
        return titleLow.includes(kwLow) || pSubcatLow.includes(kwLow);
      });
      if (match && !filtered.some(f => String(f.id) === String(match.id))) {
        filtered.push(match);
      }
      if (filtered.length >= 2) break;
    }

    // 2. Rellenar con productos de la misma línea si faltan
    if (filtered.length < 2) {
      const more = catalog.filter(p => {
        const pCatLow = (p.category || '').toLowerCase();
        const matchCat = (catLow === 'bioseguridad')
          ? (pCatLow === 'seguridad' || /kleenex|antibacterial|alcohol|jabon/i.test(p.title || ''))
          : (pCatLow === catLow);
        return matchCat && !filtered.some(f => String(f.id) === String(p.id));
      });
      filtered = filtered.concat(more.slice(0, 2 - filtered.length));
    }

    return filtered.slice(0, 2);
  }

  function recommendLineaAseo() {
    const text = `En nuestra línea oficial de **Productos de Aseo Institucional** disponemos de soluciones para desinfección, lavado de manos, toallas de secado y mantenimiento de pisos y superficies.\n\nAquí tienes productos recomendados listos para agregar o revisar:`;
    const prods = getFeaturedProducts('Aseo', ['toalla mano z', 'desengrasante', 'mopa']);
    const extras = renderProductCardsHtml(prods) + `
      <div style="margin-top:8px; display:flex; gap:6px; flex-wrap:wrap;">
        <button type="button" class="nqc-chat-action-btn" onclick="window.goToLineCatalog('Aseo')">🛒 Ver Catálogo de Aseo</button>
        <button type="button" class="nqc-chat-action-btn" onclick="window.nqcChatTriggerAction('cotizar_b2b', '🏢 Cotizar empresas')">🏢 Cotizar por volumen</button>
      </div>
    `;
    appendMessage('bot', text, extras);
  }

  function recommendLineaBioseguridad() {
    const text = `Nuestra línea de **Productos de Bioseguridad** cuenta con registros sanitarios y formulaciones de grado institucional para clínicas, oficinas y manipulación segura (jabón espuma Kleenex Foam, pañitos antibacterial, alcohol antiséptico y gel).\n\nAquí tienes productos recomendados de esta línea:`;
    const prods = getFeaturedProducts('Bioseguridad', ['kleenex foam', 'antibacterial', 'alcohol']);
    const extras = renderProductCardsHtml(prods) + `
      <div style="margin-top:8px; display:flex; gap:6px; flex-wrap:wrap;">
        <button type="button" class="nqc-chat-action-btn" onclick="window.goToLineCatalog('Bioseguridad')">🛒 Ver Catálogo de Bioseguridad</button>
        <button type="button" class="nqc-chat-action-btn" onclick="window.nqcChatTriggerAction('cotizar_b2b', '🏢 Cotizar empresas')">🏢 Cotizar por volumen</button>
      </div>
    `;
    appendMessage('bot', text, extras);
  }

  function recommendLineaCafeteria() {
    const text = `En la línea de **Productos de Cafetería** cubrimos los insumos esenciales para casinos empresariales, cafeterías y oficinas (mezcladores de madera El Sol, infusiones naturales Isashii y Hindú, vasos térmicos y de cartón Barval).\n\nAquí tienes productos recomendados de esta línea:`;
    const prods = getFeaturedProducts('Cafeteria', ['mezclador', 'aromatica', 'vaso']);
    const extras = renderProductCardsHtml(prods) + `
      <div style="margin-top:8px; display:flex; gap:6px; flex-wrap:wrap;">
        <button type="button" class="nqc-chat-action-btn" onclick="window.goToLineCatalog('Cafeteria')">🛒 Ver Catálogo de Cafetería</button>
        <button type="button" class="nqc-chat-action-btn" onclick="window.nqcChatTriggerAction('cotizar_b2b', '🏢 Cotizar empresas')">🏢 Cotizar por volumen</button>
      </div>
    `;
    appendMessage('bot', text, extras);
  }

  function recommendLineaPapeleria() {
    const text = `Nuestra línea de **Productos de Papelería** abarca insumos operativos, embalaje y archivo de alto tráfico (papel kraft por rollo, bolsillos de laminación carta, cintas de empaque Tesa, sobres manila y yoyo vertical).\n\nAquí tienes productos recomendados de esta línea:`;
    const prods = getFeaturedProducts('Papeleria', ['bolsillo laminacion', 'kraft', 'tesa']);
    const extras = renderProductCardsHtml(prods) + `
      <div style="margin-top:8px; display:flex; gap:6px; flex-wrap:wrap;">
        <button type="button" class="nqc-chat-action-btn" onclick="window.goToLineCatalog('Papeleria')">🛒 Ver Catálogo de Papelería</button>
        <button type="button" class="nqc-chat-action-btn" onclick="window.nqcChatTriggerAction('cotizar_b2b', '🏢 Cotizar empresas')">🏢 Cotizar por volumen</button>
      </div>
    `;
    appendMessage('bot', text, extras);
  }

  function recommendLineaSeguridad() {
    const text = `En la línea de **Seguridad Industrial** proveemos equipos de protección personal (EPP) y suministros de embalaje industrial (paños Wypall X-75 Plus, dispensadores Kimberly, guantes de nitrilo sin polvo y film strech para paletizado).\n\nAquí tienes productos recomendados de esta línea:`;
    const prods = getFeaturedProducts('Seguridad', ['wypall x-75', 'dispensador wypall', 'nitrilo']);
    const extras = renderProductCardsHtml(prods) + `
      <div style="margin-top:8px; display:flex; gap:6px; flex-wrap:wrap;">
        <button type="button" class="nqc-chat-action-btn" onclick="window.goToLineCatalog('Seguridad')">🛒 Ver Catálogo de Seguridad Industrial</button>
        <button type="button" class="nqc-chat-action-btn" onclick="window.nqcChatTriggerAction('cotizar_b2b', '🏢 Cotizar empresas')">🏢 Cotizar por volumen</button>
      </div>
    `;
    appendMessage('bot', text, extras);
  }

  function recommendLineaTodas() {
    const text = `Disponemos de más de **900 referencias institucionales** con entregas de 24 a 48 horas en Bogotá y despachos a nivel nacional.\n\nTe llevo directamente al catálogo completo con todas las líneas organizadas:`;
    const extras = `
      <div style="margin-top:8px; display:flex; gap:6px; flex-wrap:wrap;">
        <button type="button" class="nqc-chat-action-btn" onclick="window.goToLineCatalog('Todos')">📦 Ver Todas las Líneas en Catálogo</button>
      </div>
    `;
    appendMessage('bot', text, extras);
    setTimeout(() => {
      window.goToLineCatalog('Todos');
    }, 1200);
  }

  // =========================================================================
  // SUB-RUTINAS ESPECÍFICAS DE CASOS DE LIMPIEZA
  // =========================================================================

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
    const catalog = getCatalogProducts();
    if (!catalog.length) return [];

    const words = query.toUpperCase().split(/\s+/).filter(w => w.length > 2);
    if (!words.length) return [];

    return catalog.filter(p => {
      const title = (p.title || '').toUpperCase();
      const subcat = (p.subcat || '').toUpperCase();
      const cat = (p.category || '').toUpperCase();
      return words.some(w => title.includes(w) || subcat.includes(w) || cat.includes(w));
    });
  }

  function renderProductCardsHtml(products) {
    if (!products || !products.length) return '';

    let html = '<div style="display:flex; flex-direction:column; gap:8px; margin-top:8px;">';
    products.forEach(p => {
      const priceFmt = (p.price ? Math.round(p.price) : 0).toLocaleString('es-CO');
      const img = p.image || 'https://cdn.shopify.com/s/files/1/0285/4309/0820/files/logo_detalshop_oficial.png';
      const handle = p.handle || '';
      const pid = String(p.id || '');

      const isTracked = p.inventory_management === 'shopify';
      const rawStock = (typeof p.inventory_quantity === 'number') ? p.inventory_quantity : 25;
      const isSoldOut = (p.available === false) || (isTracked && rawStock <= 0);

      const stockBadge = isSoldOut 
        ? `<span class="nqc-chat-stock-badge soldout">🚫 Agotado en Bodega</span>`
        : `<span class="nqc-chat-stock-badge available">✓ En Stock (${isTracked ? rawStock + ' uds' : 'Inmediato'})</span>`;

      const addBtnHtml = isSoldOut
        ? `<button type="button" class="nqc-chat-btn-product nqc-chat-btn-add" disabled>Agotado</button>`
        : `<button type="button" class="nqc-chat-btn-product nqc-chat-btn-add" onclick="window.nqcChatAddToCart('${pid}', this)">+ Agregar</button>`;

      html += `
        <div class="nqc-chat-product-card">
          <img src="${img}" alt="${escapeHtml(p.title)}" class="nqc-chat-product-img" onerror="this.src='https://cdn.shopify.com/s/files/1/0285/4309/0820/files/logo_detalshop_oficial.png'">
          <div class="nqc-chat-product-info">
            <div class="nqc-chat-product-title" title="${escapeHtml(p.title)}">${escapeHtml(p.title)}</div>
            <div class="nqc-chat-product-price">$${priceFmt} COP</div>
            <div>${stockBadge}</div>
            <div class="nqc-chat-product-actions">
              <button type="button" class="nqc-chat-btn-product nqc-chat-btn-view" onclick="window.viewProductDetail('${pid}', '${handle}')">Ver Producto</button>
              ${addBtnHtml}
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

  // Agregar al Carrito Conectado al Carrito Oficial y Actualización de Stock en Tiempo Real
  window.nqcChatAddToCart = async function (productId, btnElement) {
    if (!productId) return;
    const oldHtml = btnElement ? btnElement.innerHTML : '';
    if (btnElement) {
      btnElement.disabled = true;
      btnElement.innerHTML = '⏳ Agregando...';
    }

    try {
      if (typeof window.addToCart === 'function') {
        // Ejecución del método maestro: valida inventario, actualiza cart, sync UI y recalcula stock visual
        await window.addToCart(String(productId), 1);
        if (btnElement) {
          btnElement.innerHTML = '✓ ¡Agregado!';
          btnElement.style.background = '#059669';
          btnElement.style.color = '#ffffff';
        }
        if (typeof window.openCartDrawer === 'function') {
          setTimeout(() => window.openCartDrawer(), 350);
        }
      } else {
        // Fallback directo a la API de Shopify si el script maestro no estuviera listo
        let variantId = null;
        if (typeof PRODUCT_VARIANT_MAP !== 'undefined' && PRODUCT_VARIANT_MAP[String(productId)]) {
          variantId = PRODUCT_VARIANT_MAP[String(productId)];
        } else {
          variantId = productId;
        }
        const res = await fetch('/cart/add.js', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: parseInt(variantId), quantity: 1 })
        });
        if (res.ok) {
          if (btnElement) {
            btnElement.innerHTML = '✓ ¡Agregado!';
            btnElement.style.background = '#059669';
            btnElement.style.color = '#ffffff';
          }
          if (typeof window.openCartDrawer === 'function') {
            setTimeout(() => window.openCartDrawer(), 350);
          }
        } else {
          if (btnElement) btnElement.innerHTML = 'Sin existencias';
        }
      }
    } catch (e) {
      console.error('Error al agregar al carrito desde el chat:', e);
      if (btnElement) btnElement.innerHTML = 'Error';
    } finally {
      setTimeout(() => {
        if (btnElement) {
          btnElement.disabled = false;
          btnElement.innerHTML = oldHtml || '+ Agregar';
          btnElement.style.background = '';
          btnElement.style.color = '';
        }
      }, 2500);
    }
  };

})();
