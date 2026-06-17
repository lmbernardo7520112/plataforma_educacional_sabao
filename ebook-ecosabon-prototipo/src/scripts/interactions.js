/**
 * ============================================================================
 * EcoSabon — E-book Protótipo | Interactions Module
 * ============================================================================
 * Lógica de interatividade do e-book: navegação por módulos, toggles de
 * conteúdo ("Plano B", "Dica de Mediação", "Erro Comum"), checklist Go/No-Go,
 * e scroll-to-top.
 *
 * Este módulo é testado via TDD (vitest + jsdom) antes da integração na UI.
 * O produto final continua exportável como web estático, sem dependência de backend.
 * ============================================================================
 */

/**
 * Mostra o módulo correspondente ao ID e esconde todos os outros.
 * @param {string} targetId - O ID da seção do módulo a exibir.
 * @param {Document} doc - O documento DOM (para testabilidade com jsdom).
 */
export function navigateToModule(targetId, doc = document) {
  const modules = doc.querySelectorAll('.module-section');
  modules.forEach((mod) => {
    mod.classList.remove('active');
    mod.setAttribute('aria-hidden', 'true');
  });

  const target = doc.getElementById(targetId);
  if (target) {
    target.classList.add('active');
    target.setAttribute('aria-hidden', 'false');
    if (typeof target.scrollIntoView === 'function') {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}

/**
 * Alterna a visibilidade de um bloco de conteúdo revelável
 * (ex: "Plano B", "Dica de Mediação", "Erro Comum dos Alunos").
 * @param {string} toggleId - O ID do bloco a revelar/esconder.
 * @param {Document} doc - O documento DOM.
 * @returns {boolean} O novo estado de visibilidade (true = visível).
 */
export function toggleRevealBlock(toggleId, doc = document) {
  const block = doc.getElementById(toggleId);
  if (!block) return false;

  const isCurrentlyHidden = block.classList.contains('hidden');
  block.classList.toggle('hidden', !isCurrentlyHidden);
  block.setAttribute('aria-hidden', String(!isCurrentlyHidden));

  // Atualizar o botão que controla este bloco
  const trigger = doc.querySelector(`[data-reveal="${toggleId}"]`);
  if (trigger) {
    trigger.setAttribute('aria-expanded', String(isCurrentlyHidden));
  }

  return isCurrentlyHidden; // retorna true se agora está visível
}

/**
 * Avalia se o checklist Go/No-Go está completo.
 * Retorna true somente se TODOS os checkboxes dentro do container estão marcados.
 * @param {string} checklistId - O ID do container do checklist.
 * @param {Document} doc - O documento DOM.
 * @returns {{ allChecked: boolean, total: number, checked: number }}
 */
export function evaluateChecklist(checklistId, doc = document) {
  const container = doc.getElementById(checklistId);
  if (!container) return { allChecked: false, total: 0, checked: 0 };

  const checkboxes = container.querySelectorAll('input[type="checkbox"]');
  const total = checkboxes.length;
  const checked = Array.from(checkboxes).filter((cb) => cb.checked).length;

  return {
    allChecked: total > 0 && checked === total,
    total,
    checked,
  };
}

/**
 * Rola a página suavemente para o topo.
 */
export function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
