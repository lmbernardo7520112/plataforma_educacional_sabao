/**
 * EcoSabon — E-book Protótipo | Module Navigation Logic
 */

import { scrollToSection } from './scroll.js';

/**
 * Atualiza o item ativo no sumário lateral.
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

/**
 * Alterna a visibilidade da sidebar em telas pequenas (mobile).
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

/**
 * Navega para um módulo/seção (compatibilidade com botões internos).
 * @param {string} targetId - O ID da seção do módulo a exibir.
 * @param {Document} doc - O documento DOM.
 */
export function navigateToModule(targetId, doc) {
  const safeDoc = doc ?? (typeof document !== 'undefined' ? document : null);
  scrollToSection(targetId, safeDoc);
  setActiveNavItem(targetId, safeDoc);
}

/**
 * Ativa uma seção/módulo e oculta as demais.
 * Retorna true se a ativação foi bem sucedida, false caso contrário.
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

  // Atualizar o hash na URL de forma segura
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
 */
export function initModulePagination(doc, win) {
  const safeDoc = doc ?? (typeof document !== 'undefined' ? document : null);
  const safeWin = win ?? (typeof window !== 'undefined' ? window : null);
  if (!safeDoc || !safeDoc.body) return false;

  safeDoc.body.classList.add('js-enabled');

  // Ativar o módulo inicial
  activateModuleFromHash(safeDoc, safeWin);

  // Escutar eventos de hashchange e popstate
  if (safeWin) {
    const handler = () => {
      activateModuleFromHash(safeDoc, safeWin);
    };
    safeWin.addEventListener('hashchange', handler);
    safeWin.addEventListener('popstate', handler);
  }

  return true;
}
