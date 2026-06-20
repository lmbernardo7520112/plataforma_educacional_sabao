/**
 * EcoSabon — E-book Protótipo | Saponification Hotspots Logic
 */

/**
 * Alterna a visibilidade de um painel explicativo inline do infográfico (Hotspot).
 * Garante que apenas um painel esteja aberto por vez.
 * @param {string} hotspotId - O ID ou data-target do hotspot.
 * @param {Document} doc - O documento DOM.
 * @returns {boolean} true se a alternância ocorreu com sucesso.
 */
export function toggleHotspotPanel(hotspotId, doc) {
  const safeDoc = doc ?? (typeof document !== 'undefined' ? document : null);
  if (!safeDoc) return false;

  const btn = safeDoc.querySelector(`.infographic-hotspot[data-target="${hotspotId}"]`);
  if (!btn) return false;

  const panelId = btn.getAttribute('aria-controls');
  if (!panelId) return false;

  const panel = safeDoc.getElementById(panelId);
  if (!panel) return false;

  const isExpanded = btn.getAttribute('aria-expanded') === 'true';

  if (isExpanded) {
    btn.setAttribute('aria-expanded', 'false');
    panel.setAttribute('hidden', '');
  } else {
    // Fechar todos os outros hotspots primeiro
    const allButtons = safeDoc.querySelectorAll('.infographic-hotspot');
    allButtons.forEach((otherBtn) => {
      if (otherBtn !== btn) {
        otherBtn.setAttribute('aria-expanded', 'false');
        const otherPanelId = otherBtn.getAttribute('aria-controls');
        if (otherPanelId) {
          const otherPanel = safeDoc.getElementById(otherPanelId);
          if (otherPanel) {
            otherPanel.setAttribute('hidden', '');
          }
        }
      }
    });

    // Abrir o atual
    btn.setAttribute('aria-expanded', 'true');
    panel.removeAttribute('hidden');
  }

  return true;
}

/**
 * Inicializa a interatividade dos hotspots no infográfico.
 * @param {Document} doc - O documento DOM.
 * @returns {number} Quantidade de hotspots mapeados.
 */
export function initSaponificationHotspots(doc) {
  const safeDoc = doc ?? (typeof document !== 'undefined' ? document : null);
  if (!safeDoc) return 0;

  const hotspots = safeDoc.querySelectorAll('.infographic-hotspot[data-target]');
  if (hotspots.length === 0) return 0;

  hotspots.forEach((btn) => {
    const targetId = btn.getAttribute('data-target');
    if (!targetId) return;

    btn.addEventListener('click', () => {
      toggleHotspotPanel(targetId, safeDoc);
    });

    btn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleHotspotPanel(targetId, safeDoc);
      }
    });
  });

  // Listener global/documento para fechar painel aberto ao pressionar Escape
  safeDoc.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const activeBtn = safeDoc.querySelector('.infographic-hotspot[aria-expanded="true"]');
      if (activeBtn) {
        const targetId = activeBtn.getAttribute('data-target');
        if (targetId) {
          toggleHotspotPanel(targetId, safeDoc);
          activeBtn.focus();
        }
      }
    }
  });

  return hotspots.length;
}
