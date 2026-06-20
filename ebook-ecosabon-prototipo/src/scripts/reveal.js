/**
 * EcoSabon — E-book Protótipo | Content Reveal Blocks Logic
 */

/**
 * Alterna a visibilidade de um bloco de conteúdo revelável.
 * @param {string} toggleId - O ID do bloco a revelar/esconder.
 * @param {Document} doc - O documento DOM.
 * @returns {boolean} O novo estado de visibilidade (true = visível).
 */
export function toggleRevealBlock(toggleId, doc) {
  const safeDoc = doc ?? (typeof document !== 'undefined' ? document : null);
  if (!safeDoc) return false;
  const block = safeDoc.getElementById(toggleId);
  if (!block) return false;

  const isCurrentlyHidden = block.classList.contains('hidden');
  block.classList.toggle('hidden', !isCurrentlyHidden);
  block.setAttribute('aria-hidden', String(!isCurrentlyHidden));

  // Atualizar o botão que controla este bloco
  const trigger = safeDoc.querySelector(`[data-reveal="${toggleId}"]`);
  if (trigger) {
    trigger.setAttribute('aria-expanded', String(isCurrentlyHidden));
  }

  return isCurrentlyHidden; // retorna true se agora está visível
}
