/**
 * ============================================================================
 * EcoSabon — E-book Protótipo | Interactions Module
 * ============================================================================
 * Lógica de interatividade do e-book: navegação por seções (scroll contínuo),
 * toggles de conteúdo ("Plano B", "Dica de Mediação", "Erro Comum"),
 * checklist Go/No-Go, sidebar de navegação e scroll-to-top.
 *
 * Este módulo é testado via TDD (vitest + jsdom) antes da integração na UI.
 * O produto final continua exportável como web estático, sem dependência de backend.
 * ============================================================================
 */

// ─── Navegação para Seção (scroll contínuo) ─────────────────────────────────

/**
 * Rola suavemente até a seção correspondente ao ID informado.
 * Substitui o antigo navigateToModule (que alternava display:none).
 * @param {string} sectionId - O ID da seção para a qual rolar.
 * @param {Document} doc - O documento DOM (para testabilidade com jsdom).
 * @returns {boolean} true se a seção foi encontrada e o scroll iniciado.
 */
export function scrollToSection(sectionId, doc) {
  const safeDoc = doc ?? (typeof document !== 'undefined' ? document : null);
  if (!safeDoc) return false;
  const section = safeDoc.getElementById(sectionId);
  if (!section) return false;

  if (typeof section.scrollIntoView === 'function') {
    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  return true;
}

/**
 * Atualiza o item ativo no sumário lateral.
 * Remove aria-current e classe ativa de todos os itens, aplica no alvo.
 * @param {string} sectionId - O ID da seção atualmente visível.
 * @param {Document} doc - O documento DOM.
 * @returns {boolean} true se o item foi encontrado e atualizado.
 */
export function setActiveNavItem(sectionId, doc) {
  const safeDoc = doc ?? (typeof document !== 'undefined' ? document : null);
  if (!safeDoc) return false;
  const navItems = safeDoc.querySelectorAll('.sidebar__link');
  if (navItems.length === 0) return false;

  let found = false;
  navItems.forEach((item) => {
    const href = item.getAttribute('href');
    const isTarget = href === `#${sectionId}`;
    item.classList.toggle('sidebar__link--active', isTarget);
    item.setAttribute('aria-current', isTarget ? 'true' : 'false');
    if (isTarget) found = true;
  });

  return found;
}

// ─── IntersectionObserver (progressive enhancement) ──────────────────────────

/**
 * Inicializa o IntersectionObserver para detectar a seção visível
 * e atualizar o sumário lateral automaticamente.
 *
 * Usa detecção de feature: se IntersectionObserver não existir, retorna
 * sem erro (fallback gracioso — sumário continua navegável por cliques).
 *
 * @param {Document} doc - O documento DOM.
 * @param {Window} win - O objeto window (para detecção de feature).
 * @returns {IntersectionObserver|null} A instância do observer ou null se indisponível.
 */
export function initScrollObserver(doc, win) {
  const safeDoc = doc ?? (typeof document !== 'undefined' ? document : null);
  const safeWin = win ?? (typeof window !== 'undefined' ? window : null);
  if (!safeDoc || !safeWin || !('IntersectionObserver' in safeWin)) return null;

  const sections = safeDoc.querySelectorAll('.ebook-section');
  if (sections.length === 0) return null;

  const observer = new safeWin.IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio > 0) {
          setActiveNavItem(entry.target.id, safeDoc);
        }
      });
    },
    {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0,
    }
  );

  sections.forEach((section) => observer.observe(section));
  return observer;
}

// ─── Sidebar Toggle (mobile) ────────────────────────────────────────────────

/**
 * Alterna a visibilidade da sidebar em telas pequenas.
 * @param {Document} doc - O documento DOM.
 * @returns {boolean} true se a sidebar está agora visível.
 */
export function toggleSidebar(doc) {
  const safeDoc = doc ?? (typeof document !== 'undefined' ? document : null);
  if (!safeDoc) return false;
  const sidebar = safeDoc.querySelector('.sidebar');
  if (!sidebar) return false;

  const isOpen = sidebar.classList.toggle('sidebar--open');
  sidebar.setAttribute('aria-hidden', String(!isOpen));

  const toggle = safeDoc.querySelector('.sidebar-toggle');
  if (toggle) {
    toggle.setAttribute('aria-expanded', String(isOpen));
  }

  return isOpen;
}

// ─── Funções preservadas da Execução 1 ──────────────────────────────────────

/**
 * Navega para um módulo/seção (mantida para compatibilidade com botões internos).
 * Na Execução 2, esta função rola até a seção ao invés de alternar display.
 * @param {string} targetId - O ID da seção do módulo a exibir.
 * @param {Document} doc - O documento DOM (para testabilidade com jsdom).
 */
export function navigateToModule(targetId, doc) {
  const safeDoc = doc ?? (typeof document !== 'undefined' ? document : null);
  scrollToSection(targetId, safeDoc);
  setActiveNavItem(targetId, safeDoc);
}

/**
 * Alterna a visibilidade de um bloco de conteúdo revelável
 * (ex: "Plano B", "Dica de Mediação", "Erro Comum dos Alunos").
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

/**
 * Avalia se o checklist Go/No-Go está completo.
 * Retorna true somente se TODOS os checkboxes dentro do container estão marcados.
 * @param {string} checklistId - O ID do container do checklist.
 * @param {Document} doc - O documento DOM.
 * @returns {{ allChecked: boolean, total: number, checked: number }}
 */
export function evaluateChecklist(checklistId, doc) {
  const safeDoc = doc ?? (typeof document !== 'undefined' ? document : null);
  if (!safeDoc) return { allChecked: false, total: 0, checked: 0 };
  const container = safeDoc.getElementById(checklistId);
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
