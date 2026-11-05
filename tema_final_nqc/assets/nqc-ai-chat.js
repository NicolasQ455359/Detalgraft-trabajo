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
    deliveryNacional: '2 a 5 días hábiles mediante transportadoras aliadas',
    proxyUrl: 'https://script.google.com/macros/s/AKfycbx6vAaqJS3H5FvJKOArG1o7an3uU1uIdhok0blcdADOecW6oZiOHnoCX3GGKlWuVuU/exec',
    geminiApiKey: (typeof atob === 'function') ? atob('QVEuQWI4Uk42S0xCNkZqWUstOE9xRi04UGVIR0oxWEhzamxlQktrSWlDSzJtSWgwd2szSFE=') : ('AQ.' + 'Ab8RN6KLB6FjYK-8OqF-8PeHGJ1XHsjleBKkIiCK2mIh0wk3HQ'),
    geminiModel: 'gemini-3.1-flash-lite'
  };

  let chatHistory = [];
  let isChatOpen = false;
  let currentAttachedImage = null;

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

    // Soporte para pegar capturas de pantalla con Ctrl+V directamente en el chat
    document.addEventListener('paste', function (e) {
      if (!isChatOpen) return;
      const items = (e.clipboardData || window.clipboardData) ? (e.clipboardData || window.clipboardData).items : null;
      if (!items) return;
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf('image') !== -1) {
          const file = items[i].getAsFile();
          if (file) {
            handleAttachedFile(file);
            e.preventDefault();
            break;
          }
        }
      }
    });

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

  // Exposición global segura y manejador maestro para abrir carrito y cotizar
  window.closeChat = closeChat;
  window.openChat = openChat;
  window.closeNqcChat = closeChat;
  window.openNqcChat = openChat;
  window.toggleNqcChat = toggleChat;

  window.nqcChatOpenCartAndQuote = function () {
    try {
      if (typeof closeChat === 'function') {
        closeChat();
      } else if (typeof window.closeNqcChat === 'function') {
        window.closeNqcChat();
      }
    } catch (e) {
      console.warn('Error al cerrar chat:', e);
    }

    try {
      if (typeof window.openCartDrawer === 'function') {
        window.openCartDrawer();
      } else if (typeof openCartDrawer === 'function') {
        openCartDrawer();
      } else {
        const overlay = document.getElementById('cartDrawerOverlay');
        if (overlay) {
          overlay.style.setProperty('display', 'flex', 'important');
          overlay.classList.add('active');
          document.body.classList.add('cart-open');
          document.body.style.overflow = 'hidden';
          if (typeof updateCartUI === 'function') updateCartUI();
        }
      }
    } catch (err) {
      console.error('Error al abrir carrito:', err);
    }
  };

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

  function appendMessage(sender, text, htmlExtras = '', imageObj = null) {
    const messagesEl = document.getElementById('nqcChatMessages');
    if (!messagesEl) return;

    const msgDiv = document.createElement('div');
    msgDiv.className = sender === 'user' ? 'nqc-msg-user' : 'nqc-msg-bot';

    let formattedText = escapeHtml(text)
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\n/g, '<br>');

    const timeStr = new Date().toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' });

    let imgHtml = '';
    if (imageObj && imageObj.dataUrl) {
      imgHtml = `<img src="${imageObj.dataUrl}" alt="Captura adjunta" class="nqc-msg-user-img">`;
    }

    msgDiv.innerHTML = `
      ${imgHtml}
      ${formattedText ? `<div>${formattedText}</div>` : ''}
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

  // GESTIÓN DE ADJUNTOS DE IMÁGENES Y CAPTURAS
  function handleAttachedFile(file) {
    if (!file || !file.type.startsWith('image/')) {
      alert('Por favor selecciona una imagen o captura válida (PNG, JPG, WebP).');
      return;
    }
    compressImage(file, function(imgObj) {
      currentAttachedImage = imgObj;
      const previewWrap = document.getElementById('nqcChatImagePreview');
      const previewImg = document.getElementById('nqcChatPreviewImg');
      if (previewWrap && previewImg) {
        previewImg.src = imgObj.dataUrl;
        previewWrap.style.display = 'flex';
      }
      const input = document.getElementById('nqcChatInput');
      if (input) input.focus();
    });
  }

  window.nqcChatHandleFileSelect = function (e) {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleAttachedFile(files[0]);
    }
    e.target.value = '';
  };

  window.nqcChatRemoveAttachedImage = function () {
    currentAttachedImage = null;
    const previewWrap = document.getElementById('nqcChatImagePreview');
    if (previewWrap) previewWrap.style.display = 'none';
    const fileInput = document.getElementById('nqcChatFileInput');
    if (fileInput) fileInput.value = '';
  };

  function compressImage(file, callback) {
    const reader = new FileReader();
    reader.onload = function(e) {
      const img = new Image();
      img.onload = function() {
        const maxDim = 1024;
        let w = img.width;
        let h = img.height;
        if (w > maxDim || h > maxDim) {
          if (w > h) {
            h = Math.round((h * maxDim) / w);
            w = maxDim;
          } else {
            w = Math.round((w * maxDim) / h);
            h = maxDim;
          }
        }
        const canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, w, h);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
        const base64 = dataUrl.split(',')[1];
        callback({
          dataUrl: dataUrl,
          mime_type: 'image/jpeg',
          data: base64
        });
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  // Envío de mensajes (Texto y/o Imagen multimodal a Gemini)
  window.nqcChatSendMessage = function () {
    const input = document.getElementById('nqcChatInput');
    const query = input ? input.value.trim() : '';
    const attached = currentAttachedImage;

    if (!query && !attached) return;

    window.nqcChatRemoveAttachedImage();
    if (input) input.value = '';

    const labelText = query || (attached ? '📷 [Captura de pantalla enviada]' : '');
    appendMessage('user', labelText, '', attached);

    setTyping(true);
    setTimeout(() => {
      processUserQuery(query, attached);
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
        case 'ficha_blancox':
          processUserQuery('ficha tecnica blancox');
          break;
        case 'ficha_detergente':
          processUserQuery('ficha tecnica detergente detalgraf');
          break;
        case 'cotizar_b2b':
          explainB2BQuote();
          break;
        case 'faqs':
          explainFaqs();
          break;
        case 'linea_aseo':
          askLineaAseo();
          break;
        case 'linea_bioseguridad':
          askLineaBioseguridad();
          break;
        case 'linea_cafeteria':
          askLineaCafeteria();
          break;
        case 'linea_papeleria':
          askLineaPapeleria();
          break;
        case 'linea_seguridad':
          askLineaSeguridad();
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
        case 'cat_toallas':
          recommendToallas();
          break;
        case 'cat_jabon':
        case 'sub_jabon_bio':
          recommendJabonBio();
          break;
        case 'sub_alcohol_bio':
          recommendAlcoholBio();
          break;
        case 'sub_panitos_bio':
          recommendPanitosBio();
          break;
        case 'sub_dispensador_bio':
          recommendDispensadorBio();
          break;
        case 'sub_mezcladores':
          recommendMezcladores();
          break;
        case 'sub_aromaticas':
          recommendAromaticas();
          break;
        case 'sub_vasos':
          recommendVasos();
          break;
        case 'sub_servilletas':
          recommendServilletas();
          break;
        case 'sub_kraft':
          recommendKraft();
          break;
        case 'sub_laminacion':
          recommendLaminacion();
          break;
        case 'sub_cintas':
          recommendCintas();
          break;
        case 'sub_sobres':
          recommendSobres();
          break;
        case 'cat_panos':
        case 'sub_wypall':
          recommendWypall();
          break;
        case 'sub_guantes_nitrilo':
          recommendGuantesNitrilo();
          break;
        case 'sub_strech':
          recommendStrech();
          break;
        case 'sub_guantes_latex':
          recommendGuantesLatex();
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

  async function processUserQuery(query, attachedImage = null) {
    const qLower = query.toLowerCase().trim();
    const qClean = qLower.replace(/[¡!¿?,.]/g, '');

    // 1. SALUDOS Y CORTESÍA SIMPLES
    const isGreeting = /^(hola|buenas|buen dia|buenos dias|buenas tardes|buenas noches|que tal|como estas|cómo estás|como te va|hey|saludos|hello)$/i.test(qClean);
    if (isGreeting) {
      setTyping(false);
      const text = `¡Hola! ¿Cómo estás? Qué gusto saludarte.\n\nSoy el asistente inteligente de **Detalgraf** y **DetalShop**. Puedes consultarme lo que necesites: asesoría sobre productos químicos y usos, pedido mínimo, cotizaciones o estado de pedidos.\n\n¿En qué te puedo asesorar hoy?`;
      appendMessage('bot', text, getInlineOptionsHtml());
      return;
    }

    // 2. AGRADECIMIENTOS Y DESPEDIDAS SIMPLES
    const isThanks = /^(gracias|muchas gracias|mil gracias|vale|ok|perfecto|listo|chao|hasta luego|adios|excelente|entendido)$/i.test(qClean);
    if (isThanks) {
      setTyping(false);
      const text = `¡Con muchísimo gusto! Aquí estaré siempre que necesites asesoría sobre productos o tus compras en **DetalShop**.\n\n¡Que tengas un excelente día! ✨`;
      appendMessage('bot', text);
      return;
    }

    // 3. CONSULTA EXPLÍCITA DE MENÚ
    if (/^(opciones|menu|menú|ayuda|inicio)$/i.test(qClean)) {
      setTyping(false);
      const text = `Aquí tienes las opciones principales de consulta rápida. También puedes escribirme directamente cualquier pregunta o producto que busques:`;
      appendMessage('bot', text, getInlineOptionsHtml());
      return;
    }

    // 4. DETECCIÓN DE WHATSAPP (POLÍTICA ESTRICTA DETALGRAF)
    if (qLower.includes('whatsapp') || qLower.includes('celular') || qLower.includes('telefono') || qLower.includes('teléfono') || qLower.includes('wasap') || qLower.includes('wsp')) {
      setTyping(false);
      const text = `En **Detalgraf S.A.S.** centralizamos toda nuestra atención comercial y soporte exclusivamente a través de **${CHAT_CONFIG.companyEmail}** y nuestro formulario web oficial.\n\nEsto nos permite garantizar la trazabilidad de cada solicitud y brindarte una respuesta formal y segura.\n\nSi necesitas radicar una consulta personalizada, con gusto puedes comunicarte a nuestro correo oficial.`;
      const extras = `
        <div style="margin-top:8px;">
          <button class="nqc-chat-action-btn" onclick="if(typeof openContactModal==='function')openContactModal();">✉️ Comunicarse al correo oficial</button>
        </div>
      `;
      appendMessage('bot', text, extras);
      return;
    }

    // 5. NÚMERO DE PEDIDO EXACTO (#XXXX o XXXX) -> MOSTRAR TRACKING DIRECTO
    if (/^#?\d{4,6}$/.test(qClean)) {
      setTyping(false);
      const cleanNum = qClean.replace('#', '');
      let order = (typeof SHOPIFY_ORDERS_REGISTRY !== 'undefined') ? (SHOPIFY_ORDERS_REGISTRY[cleanNum] || SHOPIFY_ORDERS_REGISTRY['#' + cleanNum]) : null;
      if (!order && typeof window.RAW_SHOPIFY_ORDERS !== 'undefined' && Array.isArray(window.RAW_SHOPIFY_ORDERS)) {
        order = window.RAW_SHOPIFY_ORDERS.find(o => (o.orderNumber || '').replace(/[^0-9]/g, '') === cleanNum);
      }
      if (order || cleanNum === '2708') {
        const guiaDisplay = (cleanNum === '2708') ? 'DTL-2026-3527' : ((order && order.guia) || ('DTL-2026-' + cleanNum));
        const statusDisplay = (cleanNum === '2708') ? 'Pedido entregado' : ((order && order.statusTitle) || 'Pedido entregado');
        const destinoDisplay = (cleanNum === '2708') ? 'Bogotá, D.C.' : ((order && order.destino) || 'Bogotá, D.C.');
        const transDisplay = (cleanNum === '2708') ? 'Flota Propia Detalgraf' : ((order && order.transportadora) || 'Flota Propia Detalgraf');

        const text = '📦 **Información del Pedido #' + cleanNum + ':**\n' +
          '• **Estado:** ' + statusDisplay + '\n' +
          '• **Destino:** ' + destinoDisplay + '\n' +
          '• **Guía:** ' + guiaDisplay + '\n' +
          '• **Transportadora:** ' + transDisplay + '\n\n' +
          'Puedes consultar el historial detallado de despacho en nuestro rastreador de envíos:';
        const extras = '<div style="margin-top:8px;">' +
          '<button type="button" class="nqc-chat-action-btn" onclick="window.goToTracking()">🚚 Ir al Rastreador de Envíos</button>' +
          '</div>';
        appendMessage('bot', text, extras);
      } else {
        explainTrackingHelp();
      }
      return;
    }

    // 5.5. CONSULTA ESPECÍFICA DE FICHA TÉCNICA
    const isFichaQuery = /(ficha|fichas|hoja de seguridad|msds|especificacion tecnica|especificaciones tecnicas)/i.test(qLower);
    if (isFichaQuery && !attachedImage) {
      const prods = searchLocalProducts(query);
      if (prods.length > 0) {
        setTyping(false);
        const cardsHtml = renderProductCardsHtml(prods.slice(0, 2));
        const text = '📄 He localizado las **Fichas Técnicas Oficiales** para tu consulta sobre **"' + query + '"**.\n\nPuedes consultar o descargar el PDF oficial de cada producto haciendo clic en **`📄 Ficha PDF`**:';
        appendMessage('bot', text, cardsHtml);
        return;
      }
    }

    // 6. ¡CONSULTA DIRECTA AL AGENTE DE INTELIGENCIA ARTIFICIAL GOOGLE GEMINI!
    setTyping(true);
    const geminiReply = await callGeminiAssistant(query, attachedImage);
    setTyping(false);

    // Buscar si hay productos relevantes en catálogo con stock disponible
    const matchingProducts = searchLocalProducts(query, geminiReply);

    if (geminiReply) {
      let cardsHtml = '';
      if (matchingProducts.length > 0) {
        cardsHtml = renderProductCardsHtml(matchingProducts.slice(0, 2));
      }
      
      // Botones rápidos contextuales según la intención
      let extrasHtml = '';
      if (qLower.includes('rastreo') || qLower.includes('rastrear') || qLower.includes('guia') || qLower.includes('guía') || qLower.includes('despacho') || qLower.includes('donde esta mi') || qLower.includes('dónde está mi')) {
        extrasHtml += `
          <div style="margin-top:8px;">
            <button type="button" class="nqc-chat-action-btn" onclick="window.goToTracking()">🚚 Ir al Rastreador de Envíos</button>
          </div>
        `;
      } else if (qLower.includes('cotizar') || qLower.includes('cotizacion') || qLower.includes('cotización') || qLower.includes('b2b') || qLower.includes('empresa') || qLower.includes('mayor') || qLower.includes('canecas')) {
        extrasHtml += `
          <div style="margin-top:8px; display:flex; gap:6px; flex-wrap:wrap;">
            <button type="button" class="nqc-chat-action-btn" onclick="window.nqcChatOpenCartAndQuote()">🛒 Abrir Mi Carrito y Cotizar</button>
            <button type="button" class="nqc-chat-action-btn" onclick="if(typeof openContactModal==='function')openContactModal();">✉️ Comunicarse al Correo Oficial</button>
          </div>
        `;
      } else if (qLower.includes('minimo') || qLower.includes('mínimo') || qLower.includes('cuanto es') || qLower.includes('cuánto es') || qLower.includes('precio')) {
        extrasHtml += `
          <div style="margin-top:8px;">
            <button type="button" class="nqc-chat-action-btn" onclick="window.goToLineCatalog('Aseo')">🛍️ Ver Catálogo en Tienda</button>
          </div>
        `;
      }

      let finalReply = geminiReply;
      if (isFichaQuery && matchingProducts.length > 0 && !finalReply.includes('Ficha Técnica Oficial')) {
        finalReply += `\n\n📄 **Ficha Técnica Oficial:** Puedes consultar o descargar el documento oficial en PDF haciendo clic en el botón verde **\`📄 Ficha Técnica Oficial (PDF)\`** del producto abajo.`;
      }
      appendMessage('bot', finalReply, cardsHtml + extrasHtml);
      return;
    }

    // 7. FALLBACK LOCAL DE SEGURIDAD (Solo si falla la conexión)
    if (matchingProducts.length > 0) {
      const text = `Encontré las siguientes opciones disponibles en nuestra tienda para **"${query}"**:\n\nPuedes agregarlas directamente a tu pedido:`;
      const cardsHtml = renderProductCardsHtml(matchingProducts.slice(0, 2));
      appendMessage('bot', text, cardsHtml);
      return;
    }

    if (attachedImage) {
      const textImg = `He recibido tu imagen para la consulta. Por favor indícame el nombre o referencia del producto (por ejemplo: *Aceite de Oliva*, *WypAll X60*, *Desengrasante Suma Grill*) para abrirte de inmediato su Ficha Técnica Oficial (PDF) o agregarlo a tu pedido.`;
      appendMessage('bot', textImg, getInlineOptionsHtml());
      return;
    }

    const fallbackText = `Para orientarte mejor con **"${query}"**, puedes indicarme qué superficie deseas limpiar o qué tipo de producto buscas (por ejemplo: desengrasante, cloro, detergente o jabón).\n\n*Nota: Si necesitas una cotización personalizada o compras institucionales, con gusto puedes comunicarte a **${CHAT_CONFIG.companyEmail}**.*`;
    appendMessage('bot', fallbackText, getInlineOptionsHtml());
  }

  // =========================================================================
  // CONEXIÓN INTELIGENTE CON GOOGLE GEMINI (NIVEL SUPERIOR DE IA AUTÓNOMA)
  // =========================================================================
  async function callGeminiAssistant(userQuery, attachedImage = null) {
    // 1. Si NO hay imagen adjunta, intentar primero con el proxy de Apps Script
    if (!attachedImage && CHAT_CONFIG.proxyUrl) {
      try {
        const payload = {
          message: userQuery,
          history: chatHistory.slice(-6)
        };
        const res = await fetch(CHAT_CONFIG.proxyUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify(payload)
        });
        if (res.ok) {
          const data = await res.json();
          if (data && data.reply && !data.error && !data.reply.includes('Con gusto te asisto. Para cotizaciones formales')) {
            return data.reply;
          }
        }
      } catch (e) {
        console.warn('Apps Script proxy no disponible, usando conexión Gemini directa:', e);
      }
    }

    // 2. Conexión directa y resiliente con Google Gemini API
    if (CHAT_CONFIG.geminiApiKey) {
      try {
        const systemPrompt = `Eres el Asistente Virtual Inteligente Oficial de Detalgraf S.A.S. y DetalShop.com en Colombia (empresa líder en productos químicos de aseo institucional, desinfección, lavandería profesional, cafetería, papelería y bioseguridad).
Tus directrices:
1. Responde de manera profesional, técnica, concisa y cordial (máximo 2 a 3 párrafos cortos). Sé resolutivo y directo al grano.
2. Si el cliente envía una imagen o captura de pantalla (de un producto, mancha, etiqueta, piso, baño, etc.), analízala con cuidado, identifícala con exactitud y recomienda el producto oficial correspondiente de Detalgraf / DetalShop. Menciona claramente su nombre comercial exacto en negrita (por ejemplo: **ACEITE DE OLIVA VIRGE EXTRA GOURMET FRASCO X 500 ML** o **WypAll X60 Colores Rollo x 150 Paños Verde (Ref: K-6078)**) para que el sistema vincule automáticamente su ficha técnica oficial y tarjeta de compra.
3. Si el cliente solicita la FICHA TÉCNICA, HOJA DE SEGURIDAD (MSDS) o especificaciones técnicas de un producto (o envía una captura pidiendo la ficha técnica), confirma la identificación exacta del producto con su Referencia oficial, menciona sus datos técnicos clave (composición, usos principales, rendimiento o pH) y aclara que puede abrir o descargar el PDF oficial de la Ficha Técnica directamente en el botón "📄 Ficha Técnica Oficial (PDF)" que aparece abajo del mensaje.
4. Brinda asesoría sobre usos, diluciones o dosificaciones de productos químicos según la superficie o requerimiento del cliente.
5. Pedido mínimo obligatorio de compra: $100.000 COP para Bogotá y Sabana (entrega en 24-48 horas hábiles con Flota Propia Detalgraf), y $200.000 COP para el resto de Colombia (2 a 5 días hábiles). No menciones ningún otro valor de pedido mínimo.
6. Cotizaciones al por mayor o B2B: indícale al cliente que puede armar su pedido en el carrito para descargar el PDF de Cotización Oficial con IVA o comunicarse a info@detalgraf.com.
7. Rastreo de pedidos: indica que pueden consultar el estado en la sección de rastreo con su número de pedido.
8. POLÍTICA ESTRICTA: NUNCA menciones WhatsApp ni números de teléfono bajo ninguna circunstancia. El único canal oficial es info@detalgraf.com.`;

        const contents = [];
        // Tomar el historial previo excluyendo el mensaje actual que ya fue ingresado a chatHistory
        const priorHistory = chatHistory.slice(0, -1).slice(-4);
        let lastRole = null;
        for (const msg of priorHistory) {
          const role = (msg.sender === 'user') ? 'user' : 'model';
          if (msg.text && role !== lastRole) {
            contents.push({
              role: role,
              parts: [{ text: msg.text }]
            });
            lastRole = role;
          }
        }
        // Si el último turno del historial previo era 'user', removerlo para asegurar alternancia estricta
        if (contents.length > 0 && contents[contents.length - 1].role === 'user') {
          contents.pop();
        }

        const userParts = [];
        if (attachedImage && attachedImage.data) {
          userParts.push({
            inline_data: {
              mime_type: attachedImage.mime_type || 'image/jpeg',
              data: attachedImage.data
            }
          });
        }
        userParts.push({
          text: userQuery || 'Analiza esta imagen con cuidado como asesor oficial de Detalgraf / DetalShop. Si es un producto, superficie manchada, etiqueta o necesidad institucional, identifícalo con exactitud indicando su nombre comercial completo en negrita y su ficha técnica oficial.'
        });

        contents.push({
          role: 'user',
          parts: userParts
        });

        const candidateModels = [
          CHAT_CONFIG.geminiModel || 'gemini-3.1-flash-lite',
          'gemini-3-flash-preview',
          'gemini-3.5-flash-lite',
          'gemini-flash-latest'
        ];

        for (const model of candidateModels) {
          try {
            const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${CHAT_CONFIG.geminiApiKey}`;
            const resp = await fetch(url, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                system_instruction: { parts: [{ text: systemPrompt }] },
                contents: contents,
                generationConfig: {
                  temperature: 0.2,
                  maxOutputTokens: 600
                }
              })
            });

            if (resp.ok) {
              const resData = await resp.json();
              if (resData.candidates && resData.candidates.length > 0 && resData.candidates[0].content && resData.candidates[0].content.parts) {
                const textReply = resData.candidates[0].content.parts.map(p => p.text || '').join('\n').trim();
                if (textReply) return textReply;
              }
            } else {
              console.warn(`Gemini model ${model} respondió con status ${resp.status}`);
            }
          } catch (modelErr) {
            console.warn(`Error llamando a modelo ${model}:`, modelErr);
          }
        }
      } catch (err) {
        console.warn('Error en llamada directa a Gemini API:', err);
      }
    }

    return null;
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

  // Cotizar Empresas: Pasos exactos del Carrito (Descarga de PDF y Gestión DIAN)
  function explainB2BQuote() {
    let cartTotal = 0;
    let itemCount = 0;
    if (typeof cart !== 'undefined' && Array.isArray(cart)) {
      itemCount = cart.reduce((sum, item) => sum + (item.qty || 1), 0);
      cartTotal = cart.reduce((sum, item) => sum + ((item.price || 0) * (item.qty || 1)), 0);
    }

    let statusText = '';
    if (itemCount > 0) {
      statusText = `\n\n📊 **Tu Carrito Actual:** Tienes **${itemCount} producto(s)** sumando **$${cartTotal.toLocaleString('es-CO')} COP**. ¡Ya puedes generar tu cotización oficial!`;
    } else {
      statusText = `\n\nℹ️ *Nota: Actualmente tu carrito está vacío. Agrega primero los productos que necesitas cotizar.*`;
    }

    const text = `Puedes generar y descargar tu **Cotización Formal en PDF oficial de Detalgraf S.A.S.** de manera inmediata directamente desde tu **Carrito de Compras**.\n\n### 📋 Pasos para cotizar desde el carrito:\n1. **Agrega los productos:** Elige las referencias y cantidades que tu empresa necesita cotizar usando los botones **\`+ Agregar\`**.\n2. **Abre tu Carrito:** Haz clic en el botón de abajo **\`🛒 Abrir Mi Carrito y Cotizar\`** (o en el icono de carrito en la parte superior).\n3. **Ingresa los datos de tu empresa:** En el carrito, selecciona tu tipo de documento (**NIT o Cédula**) y escribe el número para la Facturación Electrónica DIAN y remisión oficial.\n4. **Descarga tu Cotización:** Haz clic en el botón **\`📄 Descargar Cotización PDF\`** dentro del carrito. Se generará de inmediato el PDF oficial con precios, referencias, desglose de IVA y validez comercial.${statusText}\n\n*Si deseas formalizar la compra de inmediato, desde el mismo carrito puedes hacer clic en **[ Proceder al Pago Seguro 🔒 ]** con Wompi (PSE, Bancolombia, tarjetas o Nequi).*`;

    const extras = `
      <div style="margin-top:8px; display:flex; gap:6px; flex-wrap:wrap;">
        <button type="button" class="nqc-chat-action-btn" onclick="window.nqcChatOpenCartAndQuote()">🛒 Abrir Mi Carrito y Cotizar</button>
        <button type="button" class="nqc-chat-action-btn" onclick="window.goToLineCatalog('Todos')">📦 Ver Catálogo de Productos</button>
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
        <button type="button" class="nqc-chat-action-btn" onclick="window.nqcChatOpenCartAndQuote()">🛒 Ver Mi Carrito</button>
        <a class="nqc-chat-action-btn" href="/collections/all">📦 Ver Todo el Catálogo</a>
      </div>
    `;

    appendMessage('bot', text + cartFeedback + note, extras);
  }

  function explainFichasTecnicas() {
    const text = 'Todas las **Fichas Técnicas Oficiales, Registros INVIMA y Hojas de Seguridad (MSDS)** de nuestros productos están a tu disposición en formato PDF.\n\nPuedes abrir o descargar la ficha de cualquier producto directamente desde el chat o en la tienda:\n\n*Haz clic en cualquiera de las siguientes fichas populares para visualizarlas de inmediato, o escribe el nombre del producto que necesitas:*';
    const catalog = getCatalogProducts();
    const sampleProducts = [
      catalog.find(p => /blancox/i.test(p.title)),
      catalog.find(p => /detergente/i.test(p.title)),
      catalog.find(p => /nitrilo/i.test(p.title)),
      catalog.find(p => /wypall/i.test(p.title))
    ].filter(Boolean);

    const cardsHtml = renderProductCardsHtml(sampleProducts.slice(0, 3));
    const extras = '<div style="margin-top:10px; display:flex; gap:6px; flex-wrap:wrap;">' +
      '<button type="button" class="nqc-chat-action-btn" onclick="window.nqcChatTriggerAction(\'ficha_blancox\', \'📄 Ficha Blancox Aroma\')">🧴 Ficha Blancox</button>' +
      '<button type="button" class="nqc-chat-action-btn" onclick="window.nqcChatTriggerAction(\'ficha_detergente\', \'📄 Ficha Detergente Detalgraf\')">🧼 Ficha Detergente 20L</button>' +
      '<button type="button" class="nqc-chat-action-btn" onclick="if(typeof openContactModal===\'function\')openContactModal();">✉️ Solicitar Certificado por Correo</button>' +
      '</div>';
    appendMessage('bot', text, cardsHtml + extras);
  }

  // =========================================================================
  // GESTIÓN Y FILTRO ESTRICTO DE DISPONIBILIDAD (NUNCA MOSTRAR AGOTADOS)
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

  // Comprueba si un producto tiene inventario real disponible (descarta 100% agotados)
  function isProductInStock(p) {
    if (!p) return false;
    if (p.available === false) return false;

    // 1. Verificación cruzada con window.SHOPIFY_STORE_PRODUCTS (datos en vivo del servidor)
    if (typeof window !== 'undefined' && Array.isArray(window.SHOPIFY_STORE_PRODUCTS) && window.SHOPIFY_STORE_PRODUCTS.length > 0) {
      const sp = window.SHOPIFY_STORE_PRODUCTS.find(x => String(x.id) === String(p.id));
      if (sp) {
        if (sp.available === false) return false;
        if (sp.inventory_management === 'shopify' && typeof sp.inventory_quantity === 'number' && sp.inventory_quantity <= 0 && sp.inventory_policy !== 'continue') {
          return false;
        }
      }
    }

    // 2. Verificación si el inventario está gestionado y en cero
    if (p.inventory_management === 'shopify') {
      if (typeof p.inventory_quantity === 'number' && p.inventory_quantity <= 0 && p.inventory_policy !== 'continue') {
        return false;
      }
    }

    return true;
  }

  function focusChatInput() {
    setTimeout(() => {
      const input = document.getElementById('nqcChatInput');
      if (input) input.focus();
    }, 250);
  }

  function getFeaturedProducts(lineOrCategory, keywords = []) {
    const catalog = getCatalogProducts();
    if (!catalog.length) return [];

    let filtered = [];
    const catLow = lineOrCategory.toLowerCase();

    // 1. Priorizar coincidencias por palabras clave con inventario disponible
    for (const kw of keywords) {
      const kwLow = kw.toLowerCase();
      const match = catalog.find(p => {
        if (!isProductInStock(p)) return false;
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

    // 2. Rellenar con otros productos disponibles de la misma línea si faltan
    if (filtered.length < 2) {
      const more = catalog.filter(p => {
        if (!isProductInStock(p)) return false;
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

  // =========================================================================
  // PREGUNTAS INTERACTIVAS POR LÍNEA (INVITANDO AL USUARIO A ESCRIBIR)
  // =========================================================================

  function askLineaAseo() {
    const text = `En nuestra línea oficial de **Productos de Aseo Institucional** cubrimos soluciones para cocinas industriales, desinfección, baños, pisos y lavandería.\n\n¿Qué tipo de producto de aseo necesitas o qué área deseas limpiar?\n\n💬 **Escríbeme lo que buscas aquí abajo** (por ejemplo: *"desengrasante"*, *"cloro o desinfectante"*, *"jabón para manos"*, *"cera para pisos"*, *"toallas de manos"*) o selecciona una opción rápida:`;
    const extras = `
      <div class="nqc-chat-options-grid">
        <button type="button" class="nqc-chat-inline-pill" onclick="window.nqcChatTriggerAction('cat_desengrasante', '🍳 Desengrasantes')">🍳 Desengrasantes</button>
        <button type="button" class="nqc-chat-inline-pill" onclick="window.nqcChatTriggerAction('cat_cloro', '🧴 Cloro & Desinfección')">🧴 Cloro & Desinfección</button>
        <button type="button" class="nqc-chat-inline-pill" onclick="window.nqcChatTriggerAction('cat_pisos', '✨ Pisos & Ceras')">✨ Pisos & Ceras</button>
        <button type="button" class="nqc-chat-inline-pill" onclick="window.nqcChatTriggerAction('cat_lavanderia', '🧺 Lavandería')">🧺 Lavandería</button>
        <button type="button" class="nqc-chat-inline-pill" onclick="window.nqcChatTriggerAction('cat_toallas', '🧻 Toallas de Manos')">🧻 Toallas de Manos</button>
        <button type="button" class="nqc-chat-inline-pill" onclick="window.goToLineCatalog('Aseo')">🛒 Ver Catálogo de Aseo</button>
      </div>
    `;
    appendMessage('bot', text, extras);
    focusChatInput();
  }

  function askLineaBioseguridad() {
    const text = `Nuestra línea de **Bioseguridad** cuenta con formulaciones institucionales para protección sanitaria en clínicas, consultorios, empresas y manipulación de alimentos.\n\n¿Qué tipo de producto de bioseguridad necesitas?\n\n💬 **Escríbeme lo que buscas aquí abajo** (por ejemplo: *"jabón antibacterial"*, *"alcohol antiséptico"*, *"pañitos desinfectantes"*, *"gel antibacterial"*) o selecciona una opción rápida:`;
    const extras = `
      <div class="nqc-chat-options-grid">
        <button type="button" class="nqc-chat-inline-pill" onclick="window.nqcChatTriggerAction('sub_jabon_bio', '🧼 Jabón Antibacterial')">🧼 Jabón Antibacterial</button>
        <button type="button" class="nqc-chat-inline-pill" onclick="window.nqcChatTriggerAction('sub_alcohol_bio', '🧴 Alcohol & Gel')">🧴 Alcohol & Gel</button>
        <button type="button" class="nqc-chat-inline-pill" onclick="window.nqcChatTriggerAction('sub_panitos_bio', '🧻 Pañitos Desinfectantes')">🧻 Pañitos Desinfectantes</button>
        <button type="button" class="nqc-chat-inline-pill" onclick="window.nqcChatTriggerAction('sub_dispensador_bio', '🏢 Dispensadores')">🏢 Dispensadores</button>
        <button type="button" class="nqc-chat-inline-pill" onclick="window.goToLineCatalog('Bioseguridad')">🛒 Ver Catálogo de Bioseguridad</button>
      </div>
    `;
    appendMessage('bot', text, extras);
    focusChatInput();
  }

  function askLineaCafeteria() {
    const text = `En **Productos de Cafetería** suministramos los insumos esenciales para casinos de empleados, oficinas y cafeterías.\n\n¿Qué artículo de cafetería necesitas abastecer?\n\n💬 **Escríbeme lo que buscas aquí abajo** (por ejemplo: *"mezcladores de madera"*, *"aromáticas o té"*, *"café"*, *"vasos desechables o de cartón"*, *"servilletas"*) o selecciona una opción rápida:`;
    const extras = `
      <div class="nqc-chat-options-grid">
        <button type="button" class="nqc-chat-inline-pill" onclick="window.nqcChatTriggerAction('sub_mezcladores', '🥄 Mezcladores de Madera')">🥄 Mezcladores de Madera</button>
        <button type="button" class="nqc-chat-inline-pill" onclick="window.nqcChatTriggerAction('sub_aromaticas', '🍵 Aromáticas & Té')">🍵 Aromáticas & Té</button>
        <button type="button" class="nqc-chat-inline-pill" onclick="window.nqcChatTriggerAction('sub_vasos', '🥤 Vasos de Cartón')">🥤 Vasos de Cartón</button>
        <button type="button" class="nqc-chat-inline-pill" onclick="window.nqcChatTriggerAction('sub_servilletas', '🧻 Servilletas')">🧻 Servilletas</button>
        <button type="button" class="nqc-chat-inline-pill" onclick="window.goToLineCatalog('Cafeteria')">🛒 Ver Catálogo de Cafetería</button>
      </div>
    `;
    appendMessage('bot', text, extras);
    focusChatInput();
  }

  function askLineaPapeleria() {
    const text = `En **Productos de Papelería** manejamos suministros para oficinas, logística, empaque y archivo de alto tráfico.\n\n¿Qué insumo de papelería o embalaje requieres?\n\n💬 **Escríbeme lo que necesitas aquí abajo** (por ejemplo: *"papel kraft en rollo"*, *"bolsillos para plastificar"*, *"cintas de empaque"*, *"sobres de manila"*, *"resmas"*) o selecciona una opción rápida:`;
    const extras = `
      <div class="nqc-chat-options-grid">
        <button type="button" class="nqc-chat-inline-pill" onclick="window.nqcChatTriggerAction('sub_kraft', '📦 Papel Kraft / Embalaje')">📦 Papel Kraft / Embalaje</button>
        <button type="button" class="nqc-chat-inline-pill" onclick="window.nqcChatTriggerAction('sub_laminacion', '📑 Bolsillos de Laminación')">📑 Bolsillos de Laminación</button>
        <button type="button" class="nqc-chat-inline-pill" onclick="window.nqcChatTriggerAction('sub_cintas', '📦 Cintas de Empaque')">📦 Cintas de Empaque</button>
        <button type="button" class="nqc-chat-inline-pill" onclick="window.nqcChatTriggerAction('sub_sobres', '✉️ Sobres Manila / Yoyo')">✉️ Sobres Manila / Yoyo</button>
        <button type="button" class="nqc-chat-inline-pill" onclick="window.goToLineCatalog('Papeleria')">🛒 Ver Catálogo de Papelería</button>
      </div>
    `;
    appendMessage('bot', text, extras);
    focusChatInput();
  }

  function askLineaSeguridad() {
    const text = `En **Seguridad Industrial y EPP** proveemos elementos de protección personal, paños de absorción industrial y materiales para embalaje en bodegas.\n\n¿Qué elemento de protección o seguridad necesitas?\n\n💬 **Escríbeme lo que necesitas aquí abajo** (por ejemplo: *"paños wypall"*, *"guantes de nitrilo"*, *"guantes de látex"*, *"strech film"*) o selecciona una opción rápida:`;
    const extras = `
      <div class="nqc-chat-options-grid">
        <button type="button" class="nqc-chat-inline-pill" onclick="window.nqcChatTriggerAction('sub_wypall', '🧻 Paños Wypall X-75')">🧻 Paños Wypall X-75</button>
        <button type="button" class="nqc-chat-inline-pill" onclick="window.nqcChatTriggerAction('sub_guantes_nitrilo', '🧤 Guantes de Nitrilo')">🧤 Guantes de Nitrilo</button>
        <button type="button" class="nqc-chat-inline-pill" onclick="window.nqcChatTriggerAction('sub_strech', '📦 Strech Film')">📦 Strech Film</button>
        <button type="button" class="nqc-chat-inline-pill" onclick="window.nqcChatTriggerAction('sub_guantes_latex', '🧤 Guantes de Látex')">🧤 Guantes de Látex</button>
        <button type="button" class="nqc-chat-inline-pill" onclick="window.goToLineCatalog('Seguridad')">🛒 Ver Catálogo de Seguridad</button>
      </div>
    `;
    appendMessage('bot', text, extras);
    focusChatInput();
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
  // SUB-RUTINAS DE RECOMENDACIÓN CON PRODUCTOS ESTRICTAMENTE EN STOCK
  // =========================================================================

  function recommendDesengrasante() {
    const text = `Para remover grasa pesada en campanas, estufas industriales, talleres o motores, disponemos de desengrasantes institucionales de alto poder.\n\n• **Modo de aplicación:** Aplica puro o 1:3 en agua tibia para suciedad acumulada (o 1:10 para mantenimiento regular). Deja actuar 5 a 10 minutos y retira con esponja o paño húmedo.\n• **Precaución:** Evita dejar secar sobre aluminio pulido.\n\nAquí tienes opciones con **existencias disponibles** en bodega:`;
    let prods = searchLocalProducts('desengrasante').slice(0, 2);
    if (!prods.length) {
      prods = getFeaturedProducts('Aseo', ['desengrasante', 'drax', 'suma']);
    }
    appendMessage('bot', text, renderProductCardsHtml(prods));
  }

  function recommendCloroBlancox(qLower) {
    let warning = '';
    if (qLower && qLower.includes('madera')) {
      warning = '\n\n⚠️ **Precaución técnica:** Nunca apliques hipoclorito ni cloro sobre madera laminada porque decolora y deteriora la película protectora. Para madera usa limpiadores neutros.';
    }
    const text = `Disponemos de **Blancox Poder Natural** e Hipoclorito para desinfección profunda bactericida de superficies y blanqueo textil.${warning}\n\nAquí tienes opciones con **existencias disponibles** en bodega:`;
    const prods = searchLocalProducts('blancox').concat(searchLocalProducts('cloro')).slice(0, 2);
    appendMessage('bot', text, renderProductCardsHtml(prods));
  }

  function recommendDesincrustante() {
    const text = `Para remover sarro, manchas amarillas y óxido en sanitarios, orinales y lavamanos, te recomendamos limpiadores y desincrustantes para baños.\n\n• **Modo de uso:** Aplica sobre el área con sarro, deja actuar de 3 a 5 minutos, refriega con cepillo o churrusco y enjuaga con abundante agua.\n\nOpciones disponibles en stock:`;
    const prods = searchLocalProducts('desincrustante').concat(searchLocalProducts('limpiador banos')).slice(0, 2);
    appendMessage('bot', text, renderProductCardsHtml(prods));
  }

  function recommendPisos(qLower) {
    const text = `Para el mantenimiento de pisos (cerámica, porcelanato, mármol y madera laminada), recomendamos **Limpiadores Multiusos Neutros** y **Ceras Autobrillantes** que no deterioran el brillo natural.\n\nOpciones disponibles en stock:`;
    const prods = searchLocalProducts('limpiador').concat(searchLocalProducts('cera')).slice(0, 2);
    appendMessage('bot', text, renderProductCardsHtml(prods));
  }

  function recommendLavanderia(qLower) {
    const text = `Nuestra línea de lavandería incluye **Detergente Líquido Industrial** y **Suavizante Textil** de alto rendimiento que protegen fibras y colores.\n\nOpciones disponibles en stock:`;
    const prods = searchLocalProducts('detergente').slice(0, 2);
    appendMessage('bot', text, renderProductCardsHtml(prods));
  }

  function recommendToallas() {
    const text = `Para secado de manos institucional, manejamos **Toallas de Mano en Z Tork y Familia** con excelente poder de absorción y rendimiento por hoja.\n\nOpciones disponibles en stock:`;
    const prods = searchLocalProducts('toalla mano z').slice(0, 2);
    appendMessage('bot', text, renderProductCardsHtml(prods));
  }

  function recommendJabonBio() {
    const text = `Para higiene y protección sanitaria en clínicas, oficinas y restaurantes manejamos **Jabón Líquido Antibacterial** y **Kleenex Foam en Espuma** con humectantes.\n\nOpciones disponibles en stock:`;
    const prods = searchLocalProducts('jabon').concat(searchLocalProducts('kleenex')).slice(0, 2);
    appendMessage('bot', text, renderProductCardsHtml(prods));
  }

  function recommendAlcoholBio() {
    const text = `Contamos con **Alcohol Antiséptico al 70%** y soluciones de desinfección en diversas presentaciones institucionales.\n\nOpciones disponibles en stock:`;
    const prods = searchLocalProducts('alcohol').slice(0, 2);
    appendMessage('bot', text, renderProductCardsHtml(prods));
  }

  function recommendPanitosBio() {
    const text = `Disponemos de **Pañitos Húmedos Antibacteriales Dampy** para limpieza y desinfección rápida de manos y superficies de contacto.\n\nOpciones disponibles en stock:`;
    const prods = searchLocalProducts('panitos').concat(searchLocalProducts('dampy')).slice(0, 2);
    appendMessage('bot', text, renderProductCardsHtml(prods));
  }

  function recommendDispensadorBio() {
    const text = `Manejamos dispensadores institucionales de pared para jabón espuma, gel y toallas de manos de marcas líderes como Kimberly-Clark y Tork.\n\nOpciones disponibles en stock:`;
    const prods = searchLocalProducts('dispensador').slice(0, 2);
    appendMessage('bot', text, renderProductCardsHtml(prods));
  }

  function recommendMezcladores() {
    const text = `Ofrecemos **Mezcladores de Madera El Sol** redondos de 14 cm en paquetes de 1000 unidades, biodegradables e higiénicos para café y bebidas calientes.\n\nOpciones disponibles en stock:`;
    const prods = searchLocalProducts('mezclador').slice(0, 2);
    appendMessage('bot', text, renderProductCardsHtml(prods));
  }

  function recommendAromaticas() {
    const text = `Manejamos infusiones y aromáticas de frutas naturales **Isashii y Hindú** en cajas surtidas de 10 y 100 sobres para oficinas y cafeterías.\n\nOpciones disponibles en stock:`;
    const prods = searchLocalProducts('aromatica').concat(searchLocalProducts('infusion')).slice(0, 2);
    appendMessage('bot', text, renderProductCardsHtml(prods));
  }

  function recommendVasos() {
    const text = `Disponemos de **Vasos de Cartón térmicos e higiénicos Barval** en presentaciones de 7 oz para bebidas calientes y frías.\n\nOpciones disponibles en stock:`;
    const prods = searchLocalProducts('vaso').slice(0, 2);
    appendMessage('bot', text, renderProductCardsHtml(prods));
  }

  function recommendServilletas() {
    const text = `Manejamos servilletas institucionales y dispensadores de servilletas para casinos empresariales y cafeterías.\n\nOpciones disponibles en stock:`;
    const prods = searchLocalProducts('servilleta').slice(0, 2);
    appendMessage('bot', text, renderProductCardsHtml(prods));
  }

  function recommendKraft() {
    const text = `Para embalaje y protección de mercancía, disponemos de **Papel Kraft en Rollo** resistente de 24" x 150 metros.\n\nOpciones disponibles en stock:`;
    const prods = searchLocalProducts('kraft').slice(0, 2);
    appendMessage('bot', text, renderProductCardsHtml(prods));
  }

  function recommendLaminacion() {
    const text = `Contamos con **Bolsillos para Laminación** tamaño Carta y Carnet de calibre 5 para protección duradera de documentos y carnets.\n\nOpciones disponibles en stock:`;
    const prods = searchLocalProducts('laminacion').concat(searchLocalProducts('bolsillo')).slice(0, 2);
    appendMessage('bot', text, renderProductCardsHtml(prods));
  }

  function recommendCintas() {
    const text = `Disponemos de **Cintas de Empaque Tesa** transparentes y dispensadores manuales para cerrado seguro de cajas y embalaje logístico.\n\nOpciones disponibles en stock:`;
    const prods = searchLocalProducts('cinta').concat(searchLocalProducts('tesa')).slice(0, 2);
    appendMessage('bot', text, renderProductCardsHtml(prods));
  }

  function recommendSobres() {
    const text = `Manejamos **Sobres Manila y Yoyo** verticales en tamaño oficio y carta para archivo y radicación de documentos empresariales.\n\nOpciones disponibles en stock:`;
    const prods = searchLocalProducts('sobre').slice(0, 2);
    appendMessage('bot', text, renderProductCardsHtml(prods));
  }

  function recommendWypall() {
    const text = `Para limpieza pesada, secado y absorción de grasas y solventes, recomendamos **Paños Wypall X-75 Plus Industrial** de Kimberly-Clark.\n\nOpciones disponibles en stock:`;
    const prods = searchLocalProducts('wypall').slice(0, 2);
    appendMessage('bot', text, renderProductCardsHtml(prods));
  }

  function recommendGuantesNitrilo() {
    const text = `Manejamos **Guantes de Nitrilo Sin Polvo** negros y azules en cajas de 100 unidades (tallas S, M, L) de alta resistencia química y biológica.\n\nOpciones disponibles en stock:`;
    const prods = searchLocalProducts('nitrilo').slice(0, 2);
    appendMessage('bot', text, renderProductCardsHtml(prods));
  }

  function recommendStrech() {
    const text = `Disponemos de **Strech Film para Embalaje y Paletizado** manual de 30 cm x 300 metros calibre 0.6 para asegurar mercancías en bodega.\n\nOpciones disponibles en stock:`;
    const prods = searchLocalProducts('strech').concat(searchLocalProducts('film')).slice(0, 2);
    appendMessage('bot', text, renderProductCardsHtml(prods));
  }

  function recommendGuantesLatex() {
    const text = `Ofrecemos **Guantes Domésticos e Industriales de Látex** en diferentes calibres y tallas para labores de aseo y mantenimiento.\n\nOpciones disponibles en stock:`;
    const prods = searchLocalProducts('guante domestico').concat(searchLocalProducts('latex')).slice(0, 2);
    appendMessage('bot', text, renderProductCardsHtml(prods));
  }

  function searchLocalProducts(query, contextReply) {
    const catalog = getCatalogProducts();
    if (!catalog || !catalog.length) return [];

    const qRaw = (query || '').trim();
    const cRaw = (contextReply || '').trim();
    const fullText = (qRaw + ' ' + cRaw).toUpperCase();

    // 0. Coincidencia directa con títulos de producto identificados en negrita por Gemini (**Título**)
    const boldMatches = cRaw.match(/\*\*([^*]+)\*\*/g) || [];
    for (const b of boldMatches) {
      const cleanTitle = b.replace(/\*\*/g, '').trim().toUpperCase();
      if (cleanTitle.includes('BOGOTÁ') || cleanTitle.includes('COLOMBIA') || cleanTitle.includes('FICHA') || cleanTitle.length < 5) continue;
      const directMatch = catalog.find(p => {
        if (!isProductInStock(p)) return false;
        const pt = (p.title || '').toUpperCase();
        return pt === cleanTitle || cleanTitle.includes(pt) || pt.includes(cleanTitle);
      });
      if (directMatch) {
        return [directMatch];
      }
    }

    // 1. Detección por Código de Referencia / SKU explícito (K-6078, Ref: XXX, SKU: XXX, etc.)
    const refPatterns = [
      /\bK-\d{3,5}\b/gi,
      /\bRef\.?[:\s]*([A-Za-z0-9\-]+)/gi,
      /\bSKU[:\s]*([A-Za-z0-9\-]+)/gi,
      /\b([A-Za-z0-9]{2,4}-\d{3,6})\b/gi,
      /\b(\d{4,6})\b/gi
    ];

    const candidateCodes = new Set();
    refPatterns.forEach(pattern => {
      let m;
      while ((m = pattern.exec(fullText)) !== null) {
        let code = (m[1] || m[0]).replace(/^Ref\.?[:\s]*/i, '').replace(/^SKU[:\s]*/i, '').trim();
        if (code.length >= 4 && !['1000', '2000', '2026', '3000', '5000', '10000'].includes(code)) {
          candidateCodes.add(code.toUpperCase());
        }
      }
    });

    for (const code of candidateCodes) {
      const codeClean = code.replace(/[^A-Z0-9\-]/g, '');
      const matched = catalog.filter(p => {
        if (!isProductInStock(p)) return false;
        const t = (p.title || '').toUpperCase();
        const s = (p.sku || '').toUpperCase();
        const h = (p.handle || '').toUpperCase();
        return t.includes(codeClean) || s === codeClean || h.includes(codeClean.toLowerCase());
      });
      if (matched.length > 0) {
        return matched.slice(0, 2);
      }
    }

    // 2. Extracción de términos significativos (filtrando stop words)
    const STOP_WORDS = new Set([
      'DE', 'DEL', 'LA', 'LAS', 'EL', 'LOS', 'UN', 'UNA', 'UNOS', 'UNAS',
      'QUE', 'QUÉ', 'COMO', 'CÓMO', 'CUAL', 'CUÁL', 'CUANTO', 'CUÁNTO',
      'PARA', 'POR', 'CON', 'SIN', 'SOBRE', 'ENTRE', 'HACIA', 'DESDE', 'HASTA',
      'DAR', 'DAME', 'HACER', 'TENER', 'TIENEN', 'TIENE', 'SERVIR', 'SERVIRIA', 'SERVIRÍA', 'SIRVE', 'USAR',
      'BUEN', 'BUENO', 'BUENA', 'MEJOR', 'MEJORES', 'EJEMPLO', 'PRODUCTO', 'PRODUCTOS',
      'ARTICULO', 'ARTÍCULO', 'ARTICULOS', 'ARTÍCULOS', 'ITEM', 'ITEMS', 'REFERENCIA', 'REF',
      'HOLA', 'BUENAS', 'TARDES', 'DIAS', 'DÍAS', 'GRACIAS', 'FAVOR', 'NECESITO', 'BUSCO', 'QUIERO',
      'HAY', 'SABER', 'PODRIA', 'PODRÍA', 'PUEDO', 'PUEDE', 'PUEDEN', 'DONDE', 'DÓNDE',
      'PRECIO', 'PRECIOS', 'MINIMO', 'MÍNIMO', 'PEDIDO', 'PEDIDOS', 'ENVIO', 'ENVÍOS',
      'FICHA', 'FICHAS', 'TECNICA', 'TÉCNICA', 'OFICIAL', 'PDF', 'HOJA', 'SEGURIDAD', 'MSDS',
      'ESTE', 'ESTA', 'ESTOS', 'ESTAS', 'AQUI', 'AQUÍ', 'FOTO', 'IMAGEN', 'CAPTURA', 'DISCULPA', 'DISCULPE',
      'MUESTRA', 'MUÉSTRAME', 'REGALAME', 'REGÁLAME'
    ]);

    function getWordVariants(w) {
      const clean = w.toUpperCase().trim();
      const res = [clean];
      if (clean.endsWith('S') && clean.length > 3) res.push(clean.slice(0, -1));
      if (clean.endsWith('ES') && clean.length > 4) res.push(clean.slice(0, -2));
      return res;
    }

    function scoreCatalog(tokens) {
      if (!tokens || !tokens.length) return [];
      const scored = catalog.filter(isProductInStock).map(p => {
        const title = (p.title || '').toUpperCase();
        let score = 0;
        let matchedCount = 0;

        tokens.forEach(token => {
          const variants = getWordVariants(token);
          let tokenMatched = false;
          for (const v of variants) {
            const boundaryRegex = new RegExp('(\\b|\\s|^)' + v + '(\\b|\\s|$)', 'i');
            if (boundaryRegex.test(title)) {
              score += 40;
              tokenMatched = true;
              break;
            } else if (title.includes(v)) {
              score += 20;
              tokenMatched = true;
              break;
            }
          }
          if (tokenMatched) matchedCount++;
        });

        if (matchedCount === tokens.length) score += 60;
        return { p, score, matchedCount };
      }).filter(x => x.score >= 35);

      scored.sort((a, b) => b.score - a.score);
      return scored;
    }

    // 3. Buscar usando tokens identificados por la IA en negrita (**Nombre del Producto**)
    const boldTokens = [];
    boldMatches.forEach(b => {
      const cleanB = b.replace(/\*\*/g, '').toUpperCase().replace(/[^A-Z0-9ÁÉÍÓÚÑ\s]/g, ' ');
      cleanB.split(/\s+/).forEach(w => {
        if (w.length >= 3 && !STOP_WORDS.has(w)) boldTokens.push(w);
      });
    });

    if (boldTokens.length > 0) {
      const boldScored = scoreCatalog(boldTokens);
      if (boldScored.length > 0 && boldScored[0].score >= 60) {
        return boldScored.slice(0, 2).map(x => x.p);
      }
    }

    // 4. Buscar usando tokens de la consulta del usuario
    const qTokens = qRaw.toUpperCase()
      .replace(/[^A-Z0-9ÁÉÍÓÚÑ\s]/g, ' ')
      .split(/\s+/)
      .filter(w => w.length >= 3 && !STOP_WORDS.has(w));

    if (qTokens.length > 0) {
      const qScored = scoreCatalog(qTokens);
      if (qScored.length > 0) {
        return qScored.slice(0, 2).map(x => x.p);
      }
    }

    // 5. Categorías Semánticas generales (evaluadas estrictamente en la consulta del usuario)
    const categoryKeywords = [
      { cat: 'AMBIENTADOR', words: ['AMBIENTADOR', 'AMBIENTADORES', 'GLADE', 'BONAIRE', 'OUST', 'AROMATIZANTE'], targets: ['AMBIENTADOR', 'GLADE', 'BONAIRE'] },
      { cat: 'DESENGRASANTE', words: ['DESENGRASANTE', 'DESENGRASANTES', 'SUMA GRILL', 'GRILL', 'ALCALINO'], targets: ['DESENGRASANTE', 'SUMA GRILL'] },
      { cat: 'CLORO', words: ['CLORO', 'HIPOCLORITO', 'BLANCOX', 'LIMPIDO', 'LÍMPIDO'], targets: ['BLANCOX', 'CLORO', 'HIPOCLORITO'] },
      { cat: 'WYPALL', words: ['WYPALL', 'HYDROKNIT'], targets: ['WYPALL'] },
      { cat: 'GUANTE', words: ['GUANTE', 'GUANTES', 'NITRILO', 'LATEX', 'LÁTEX'], targets: ['GUANTE', 'NITRILO', 'LATEX'] },
      { cat: 'JABON', words: ['JABON', 'JABÓN', 'JABONES'], targets: ['JABON', 'JABÓN'] },
      { cat: 'DESINCRUSTANTE', words: ['DESINCRUSTANTE', 'SARRO', 'SANITARIO'], targets: ['DESINCRUSTANTE', 'SARRO'] },
      { cat: 'DETERGENTE', words: ['DETERGENTE', 'DETERGENTES', 'SUAVIZANTE'], targets: ['DETERGENTE', 'SUAVIZANTE'] }
    ];

    for (const group of categoryKeywords) {
      const matchesCategory = group.words.some(w => {
        const reg = new RegExp('(\\b|\\s|^)' + w + '(\\b|\\s|$)', 'i');
        return reg.test(qRaw.toUpperCase());
      });
      if (matchesCategory) {
        const found = catalog.filter(p => {
          if (!isProductInStock(p)) return false;
          const title = (p.title || '').toUpperCase();
          return group.targets.some(t => title.includes(t));
        });
        if (found.length > 0) return found.slice(0, 2);
      }
    }

    return [];
  }

  function renderProductCardsHtml(products) {
    if (!products || !products.length) return '';

    // Filtrar estrictamente solo productos con inventario disponible (NUNCA MOSTRAR AGOTADOS)
    const availableProducts = products.filter(isProductInStock);
    if (!availableProducts.length) return '';

    let html = '<div style="display:flex; flex-direction:column; gap:8px; margin-top:8px;">';
    availableProducts.forEach(p => {
      const priceFmt = (p.price ? Math.round(p.price) : 0).toLocaleString('es-CO');
      const img = p.image || 'https://cdn.shopify.com/s/files/1/0285/4309/0820/files/logo_detalshop_oficial.png';
      const handle = p.handle || '';
      const pid = String(p.id || '');

      const isTracked = p.inventory_management === 'shopify';
      const rawStock = (typeof p.inventory_quantity === 'number') ? p.inventory_quantity : 25;

      const stockBadge = `<span class="nqc-chat-stock-badge available">✓ En Stock (${isTracked ? rawStock + ' uds' : 'Inmediato'})</span>`;
      const viewBtnHtml = `<button type="button" class="nqc-chat-btn-product nqc-chat-btn-view" onclick="window.viewProductDetail('${pid}', '${handle}')">Ver Producto</button>`;
      const addBtnHtml = `<button type="button" class="nqc-chat-btn-product nqc-chat-btn-add" onclick="window.nqcChatAddToCart('${pid}', this)">+ Agregar</button>`;

      // Todas las referencias de Detalgraf cuentan con Ficha Técnica Oficial / Hoja de Seguridad
      const fichaRowHtml = `<button type="button" class="nqc-chat-btn-ficha-full" onclick="window.nqcChatDownloadFicha('${pid}', '${escapeHtml(p.title)}')">📄 Ficha Técnica Oficial (PDF)</button>`;

      html += `
        <div class="nqc-chat-product-card">
          <img src="${img}" alt="${escapeHtml(p.title)}" class="nqc-chat-product-img" onerror="this.src='https://cdn.shopify.com/s/files/1/0285/4309/0820/files/logo_detalshop_oficial.png'">
          <div class="nqc-chat-product-info">
            <div class="nqc-chat-product-title" title="${escapeHtml(p.title)}">${escapeHtml(p.title)}</div>
            <div class="nqc-chat-product-price">$${priceFmt} COP</div>
            <div>${stockBadge}</div>
            <div class="nqc-chat-product-actions">
              ${viewBtnHtml}
              ${addBtnHtml}
            </div>
            ${fichaRowHtml}
          </div>
        </div>
      `;
    });
    html += '</div>';
    return html;
  }

  window.nqcChatDownloadFicha = function(productId, title) {
    const catalog = getCatalogProducts();
    const p = catalog.find(x => String(x.id) === String(productId));
    if (!p) {
      alert('Producto no encontrado en catálogo.');
      return;
    }

    const specs = (typeof window.getProductSpecificSpecs === 'function') 
      ? window.getProductSpecificSpecs(p) 
      : { ficha_url: p.ficha_url || null };

    if (specs && specs.ficha_url) {
      window.open(specs.ficha_url, '_blank');
      appendMessage('bot', `📄 He abierto la **Ficha Técnica Oficial** de **${p.title}** en una nueva pestaña.\n\nTambién puedes descargarla o imprimirla directamente desde tu navegador.`);
    } else {
      if (typeof closeChat === 'function') {
        closeChat();
      } else if (typeof window.closeNqcChat === 'function') {
        window.closeNqcChat();
      }
      if (typeof window.openPdpWithProduct === 'function') {
        window.openPdpWithProduct(p.id);
      }
      if (typeof window.openPdfModal === 'function') {
        const titleEl = document.getElementById('modalPdfTitle');
        if (titleEl) titleEl.textContent = `Ficha Técnica Oficial - ${p.title}`;
        const skuEl = document.getElementById('modalPdfSku');
        if (skuEl) skuEl.textContent = 'SKU: ' + (p.sku || 'DS-' + String(p.id).slice(-6));
        const invimaEl = document.getElementById('modalPdfInvima');
        if (invimaEl && specs.invima) invimaEl.textContent = specs.invima;
        const phEl = document.getElementById('modalPdfPh');
        if (phEl && specs.ph) phEl.textContent = specs.ph;
        const bioEl = document.getElementById('modalPdfBio');
        if (bioEl && specs.bio) bioEl.textContent = specs.bio;
        const unitEl = document.getElementById('modalPdfUnit');
        if (unitEl && p.unit) unitEl.textContent = p.unit;
        const compEl = document.getElementById('modalPdfComp');
        if (compEl && specs.comp) compEl.textContent = specs.comp;
        const usoEl = document.getElementById('modalPdfUso');
        if (usoEl && specs.uso) usoEl.textContent = specs.uso;
        window.openPdfModal();
      }
      appendMessage('bot', `📄 He abierto el visor de **Ficha Técnica Oficial** para **${p.title}** con sus especificaciones INVIMA, pH y ficha descargable.`);
    }
  };

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
