/**
 * EcoSabon — E-book Protótipo | Scroll Helpers
 */

import { setActiveNavItem } from './navigation.js';

/**
 * Rola suavemente até a seção correspondente ao ID informado.
 * @param {string} sectionId - O ID da seção para a qual rolar.
 * @param {Document} doc - O documento DOM.
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
 * Rola a página suavemente para o topo.
 */
export function scrollToTop() {
  if (typeof window !== 'undefined') {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

/**
 * Inicializa o IntersectionObserver para detectar a seção visível
 * e atualizar o sumário lateral automaticamente (fallback / scroll legado).
 * @param {Document} doc - O documento DOM.
 * @param {Window} win - O objeto window.
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
