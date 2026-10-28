const GOOGLE_SHEET_WEBAPP_URL = 'https://script.google.com/macros/s/AKfycby3eA645Jyhg5zco6zpZUZmv4JNFiPS19Ahwg3k5EoocpQO6okiUNJz0m7tnka27LEC/exec';

// Crear alarma automática cada 30 minutos al instalar o iniciar Chrome
chrome.runtime.onInstalled.addListener(() => {
  chrome.alarms.create('syncShopify30Min', { periodInMinutes: 30 });
  triggerSyncInShopifyTabs();
});

chrome.runtime.onStartup.addListener(() => {
  chrome.alarms.create('syncShopify30Min', { periodInMinutes: 30 });
  triggerSyncInShopifyTabs();
});

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'syncShopify30Min') {
    triggerSyncInShopifyTabs();
  }
});

async function triggerSyncInShopifyTabs() {
  const tabs = await chrome.tabs.query({ url: ['https://admin.shopify.com/store/detalgraf*'] });
  for (const tab of tabs) {
    try {
      chrome.tabs.sendMessage(tab.id, { action: 'RUN_SHOPIFY_SYNC' });
    } catch (e) {}
  }
}

// Escuchar órdenes extraídas desde content.js y enviarlas al Google Sheet
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg && msg.action === 'UPLOAD_ORDERS_TO_SHEET' && Array.isArray(msg.orders)) {
    fetch(GOOGLE_SHEET_WEBAPP_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({ orders: msg.orders })
    })
      .then(res => res.text())
      .then(txt => {
        chrome.storage.local.set({
          lastSyncTime: new Date().toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' }),
          lastSyncCount: msg.orders.length
        });
        sendResponse({ ok: true, count: msg.orders.length, response: txt });
      })
      .catch(err => {
        sendResponse({ ok: false, error: String(err) });
      });
    return true; // Mantener canal asíncrono abierto
  }
});
