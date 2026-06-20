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

// ─── Mapa Interativo de Estações (Execução 3 — C3) ─────────────────────────

/**
 * Rola suavemente até a estação correspondente ao ID informado.
 * Delega para scrollToSection para manter consistência.
 * @param {string} stationId - O ID da estação (ex: 'estacao-1').
 * @param {Document} doc - O documento DOM.
 * @returns {boolean} true se a estação foi encontrada e o scroll iniciado.
 */
export function scrollToStation(stationId, doc) {
  return scrollToSection(stationId, doc);
}

/**
 * Inicializa o mapa interativo de estações.
 * Registra event listeners de click e keydown nos nós `.classroom-diagram__station`
 * que possuem `data-station`, rolando até a estação detalhada correspondente.
 * @param {Document} doc - O documento DOM.
 * @returns {number} Quantidade de estações mapeadas (0 se nenhuma encontrada).
 */
export function initStationMap(doc) {
  const safeDoc = doc ?? (typeof document !== 'undefined' ? document : null);
  if (!safeDoc) return 0;

  const stations = safeDoc.querySelectorAll('.classroom-diagram__station[data-station]');
  if (stations.length === 0) return 0;

  stations.forEach((node) => {
    const targetId = node.getAttribute('data-station');
    if (!targetId) return;

    node.addEventListener('click', () => {
      scrollToStation(targetId, safeDoc);
    });

    node.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        scrollToStation(targetId, safeDoc);
      }
    });
  });

  return stations.length;
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

/**
 * Alterna a visibilidade de um painel explicativo inline do infográfico (Hotspot).
 * Garante que apenas um painel esteja aberto por vez (foco único).
 * @param {string} hotspotId - O ID ou data-target do hotspot (ex: 'triglicerideo').
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
    // Fechar
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
 * Registra listeners de clique, Enter/Espaço e atalhos de teclado como Escape.
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

// ─── Paginação por Módulo (UX Fix) ──────────────────────────────────────────

/**
 * Ativa uma seção/módulo e oculta as demais.
 * Atualiza classes, aria-hidden/hidden, aria-current na sidebar, rola para o topo e altera o hash de forma segura.
 * Retorna true se a ativação foi bem sucedida, false caso o ID não exista ou ocorra um erro.
 */
export function activateModule(moduleId, doc, win) {
  const safeDoc = doc ?? (typeof document !== 'undefined' ? document : null);
  const safeWin = win ?? (typeof window !== 'undefined' ? window : null);
  if (!safeDoc) return false;
  
  const targetSection = safeDoc.getElementById(moduleId);
  if (!targetSection || !targetSection.classList.contains('ebook-section')) {
    return false;
  }

  const sections = safeDoc.querySelectorAll('.ebook-section');
  sections.forEach((sec) => {
    if (sec.id === moduleId) {
      sec.classList.add('ebook-section--active');
      sec.setAttribute('aria-hidden', 'false');
    } else {
      sec.classList.remove('ebook-section--active');
      sec.setAttribute('aria-hidden', 'true');
    }
  });

  // Atualizar a sidebar
  const sidebarLinks = safeDoc.querySelectorAll('.sidebar__link');
  sidebarLinks.forEach((link) => {
    const href = link.getAttribute('href');
    if (href === `#${moduleId}`) {
      link.classList.add('sidebar__link--active');
      link.setAttribute('aria-current', 'true');
    } else {
      link.classList.remove('sidebar__link--active');
      link.removeAttribute('aria-current');
    }
  });

  // Atualizar o hash na URL de forma segura (sem disparar rolagem default do navegador)
  try {
    if (safeWin && safeWin.history && safeWin.history.pushState) {
      safeWin.history.pushState(null, '', `#${moduleId}`);
    } else if (safeWin && safeWin.location) {
      safeWin.location.hash = `#${moduleId}`;
    }
  } catch (e) {
    if (safeWin && safeWin.location) {
      safeWin.location.hash = `#${moduleId}`;
    }
  }

  // Rolar para o topo
  if (safeWin) {
    safeWin.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return true;
}

/**
 * Ativa o módulo correspondente ao hash atual da URL.
 * Se o hash for vazio ou inválido, ativa o módulo padrão ("mod-inicio").
 */
export function activateModuleFromHash(doc, win) {
  const safeDoc = doc ?? (typeof document !== 'undefined' ? document : null);
  const safeWin = win ?? (typeof window !== 'undefined' ? window : null);
  if (!safeDoc) return false;

  let moduleId = 'mod-inicio';
  if (safeWin && safeWin.location && safeWin.location.hash) {
    const hashId = safeWin.location.hash.substring(1);
    const targetSec = safeDoc.getElementById(hashId);
    if (targetSec && targetSec.classList.contains('ebook-section')) {
      moduleId = hashId;
    }
  }

  return activateModule(moduleId, safeDoc, safeWin);
}

/**
 * Inicializa a paginação por módulos.
 * Adiciona a classe js-enabled no body, ativa o módulo padrão ("mod-inicio" ou o hash atual)
 * e retorna true se inicializou com sucesso.
 */
export function initModulePagination(doc, win) {
  const safeDoc = doc ?? (typeof document !== 'undefined' ? document : null);
  const safeWin = win ?? (typeof window !== 'undefined' ? window : null);
  if (!safeDoc || !safeDoc.body) return false;

  safeDoc.body.classList.add('js-enabled');

  // Ativar o módulo inicial
  activateModuleFromHash(safeDoc, safeWin);

  // Escutar eventos de hashchange e popstate para suportar navegação pelo histórico/hash
  if (safeWin) {
    const handler = () => {
      activateModuleFromHash(safeDoc, safeWin);
    };
    safeWin.addEventListener('hashchange', handler);
    safeWin.addEventListener('popstate', handler);
  }

  return true;
}

