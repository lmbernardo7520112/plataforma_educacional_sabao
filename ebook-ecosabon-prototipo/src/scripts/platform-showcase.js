/**
 * EcoSabon — E-book Protótipo | Platform Showcase Section Logic
 * Handles interactive elements for the "Do Web-book à Plataforma" section:
 * - Platform map hotspots (one-at-a-time)
 * - Role flip cards (keyboard-accessible)
 * - Journey timeline step reveals
 */

/**
 * Toggle a platform map hotspot panel. Only one active at a time.
 * @param {string} hotspotId - The data-target of the hotspot button.
 * @param {Document} doc - The DOM document.
 * @returns {boolean} true if toggled successfully.
 */
export function togglePlatformHotspotPanel(hotspotId, doc) {
  const safeDoc = doc ?? (typeof document !== 'undefined' ? document : null);
  if (!safeDoc) return false;

  const btn = safeDoc.querySelector(`.platform-hotspot[data-target="${hotspotId}"]`);
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
    // Close all other hotspots first
    const allButtons = safeDoc.querySelectorAll('.platform-hotspot');
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

    btn.setAttribute('aria-expanded', 'true');
    panel.removeAttribute('hidden');
  }

  return true;
}

/**
 * Toggle a role flip card between front and back.
 * @param {string} cardId - The ID of the flip card container.
 * @param {Document} doc - The DOM document.
 * @returns {boolean} true if toggled successfully.
 */
export function togglePlatformRoleCard(cardId, doc) {
  const safeDoc = doc ?? (typeof document !== 'undefined' ? document : null);
  if (!safeDoc) return false;

  const card = safeDoc.getElementById(cardId);
  if (!card) return false;

  const isFlipped = card.classList.contains('platform-role-card--flipped');
  card.classList.toggle('platform-role-card--flipped', !isFlipped);

  // Update aria-live region
  const liveRegion = safeDoc.getElementById('platform-showcase-aria-status');
  if (liveRegion) {
    const label = card.getAttribute('data-role-name') || 'papel';
    liveRegion.textContent = isFlipped
      ? `Card ${label}: mostrando frente.`
      : `Card ${label}: mostrando detalhes.`;
  }

  return true;
}

/**
 * Initialize all platform showcase interactive elements.
 * @param {Document} doc - The DOM document.
 * @returns {number} Total interactive elements initialized.
 */
export function initPlatformShowcase(doc) {
  const safeDoc = doc ?? (typeof document !== 'undefined' ? document : null);
  if (!safeDoc) return 0;

  let count = 0;

  // Platform map hotspots
  const hotspots = safeDoc.querySelectorAll('.platform-hotspot[data-target]');
  hotspots.forEach((btn) => {
    const targetId = btn.getAttribute('data-target');
    if (!targetId) return;

    btn.addEventListener('click', () => {
      togglePlatformHotspotPanel(targetId, safeDoc);
    });

    btn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        togglePlatformHotspotPanel(targetId, safeDoc);
      }
    });

    count++;
  });

  // Role flip cards
  const flipCards = safeDoc.querySelectorAll('.platform-role-card[id]');
  flipCards.forEach((card) => {
    const trigger = card.querySelector('.platform-role-card__trigger');
    if (!trigger) return;

    trigger.addEventListener('click', () => {
      togglePlatformRoleCard(card.id, safeDoc);
    });

    trigger.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        togglePlatformRoleCard(card.id, safeDoc);
      }
    });

    count++;
  });

  // Escape to close hotspots
  safeDoc.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const activeBtn = safeDoc.querySelector('.platform-hotspot[aria-expanded="true"]');
      if (activeBtn) {
        const targetId = activeBtn.getAttribute('data-target');
        if (targetId) {
          togglePlatformHotspotPanel(targetId, safeDoc);
          activeBtn.focus();
        }
      }
    }
  });

  return count;
}
