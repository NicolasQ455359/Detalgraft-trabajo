/**
 * NQC CORPORATE ANIMATIONS CONTROLLER — DETALGRAF S.A.S.
 * Observador de Scroll, Micro-Interacciones y Control de Activación / Reversión.
 */

(function () {
  'use strict';

  const STORAGE_KEY = 'nqc_animations_enabled';

  // Determinar si las animaciones están activas (por defecto: activas para prueba)
  let isAnimationsEnabled = localStorage.getItem(STORAGE_KEY) !== 'false';

  let scrollObserver = null;
  let gridObserver = null;

  document.addEventListener('DOMContentLoaded', () => {
    initAnimationsSystem();
  });

  function initAnimationsSystem() {
    if (!isAnimationsEnabled) {
      document.body.classList.remove('nqc-animations-active');
      return;
    }

    // 1. Activar clase maestra en body
    document.body.classList.add('nqc-animations-active');

    // 2. Configurar IntersectionObserver para aparición progresiva
    setupScrollReveal();

    // 3. Observar cambios dinámicos en el catálogo (filtrado de categorías o "cargar más")
    setupGridMutationObserver();

    // 4. Hook al botón de carrito para el pulso en el contador
    setupCartPulseHook();
  }

  function setupScrollReveal() {
    if (!('IntersectionObserver' in window)) return;

    scrollObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.08
    });

    // Registrar elementos iniciales a observar
    registerRevealElements();
  }

  function registerRevealElements() {
    if (!scrollObserver) return;

    const selectors = [
      '.nuestras-lineas-section',
      '.line-collection-card',
      '.category-filter-bar',
      '.p-card-store',
      '.benefit-item',
      '.tracking-form-card',
      '.pdp-card-gallery',
      '.pdp-card-details'
    ];

    selectors.forEach(sel => {
      document.querySelectorAll(sel).forEach(el => {
        if (!el.classList.contains('nqc-reveal')) {
          el.classList.add('nqc-reveal');
          // Si ya está dentro del viewport inicial, revelarlo de inmediato
          const rect = el.getBoundingClientRect();
          if (rect.top < window.innerHeight && rect.bottom > 0) {
            el.classList.add('is-revealed');
          } else {
            scrollObserver.observe(el);
          }
        }
      });
    });
  }

  function setupGridMutationObserver() {
    const grid = document.getElementById('homeProductsGrid');
    if (!grid || !('MutationObserver' in window)) return;

    gridObserver = new MutationObserver(() => {
      if (!isAnimationsEnabled) return;
      registerRevealElements();
    });

    gridObserver.observe(grid, { childList: true });
  }

  function setupCartPulseHook() {
    const origUpdateCartUI = window.updateCartUI;
    if (typeof origUpdateCartUI === 'function') {
      window.updateCartUI = function () {
        const res = origUpdateCartUI.apply(this, arguments);
        triggerBadgePulse();
        return res;
      };
    }
  }

  function triggerBadgePulse() {
    if (!isAnimationsEnabled) return;
    const badges = document.querySelectorAll('.header-cart-count, .cart-count-badge, #headerCartCount');
    badges.forEach(b => {
      b.classList.remove('cart-count-pulse');
      void b.offsetWidth; // Forzar reflow para reiniciar animación
      b.classList.add('cart-count-pulse');
      setTimeout(() => b.classList.remove('cart-count-pulse'), 500);
    });
  }

  // =========================================================================
  // API GLOBAL DE CONTROL Y REVERSIÓN (Para el usuario o pruebas en consola)
  // =========================================================================

  /**
   * Permite activar o desactivar todas las animaciones en tiempo real
   * Uso: window.toggleNqcAnimations(false) -> Desactiva todo al instante
   *      window.toggleNqcAnimations(true)  -> Vuelve a activar todo
   */
  window.toggleNqcAnimations = function (enable) {
    if (typeof enable !== 'boolean') {
      enable = !isAnimationsEnabled;
    }

    isAnimationsEnabled = enable;
    localStorage.setItem(STORAGE_KEY, enable ? 'true' : 'false');

    if (enable) {
      document.body.classList.add('nqc-animations-active');
      initAnimationsSystem();
      console.log('✨ [NQC] Animaciones Corporativas ACTIVADAS.');
    } else {
      document.body.classList.remove('nqc-animations-active');
      document.querySelectorAll('.nqc-reveal').forEach(el => {
        el.classList.remove('nqc-reveal', 'is-revealed');
      });
      if (scrollObserver) scrollObserver.disconnect();
      if (gridObserver) gridObserver.disconnect();
      console.log('🛑 [NQC] Animaciones Corporativas DESACTIVADAS (Estado clásico).');
    }

    return isAnimationsEnabled;
  };

  window.isNqcAnimationsActive = function () {
    return isAnimationsEnabled;
  };

})();
