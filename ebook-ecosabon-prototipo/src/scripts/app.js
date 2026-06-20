/**
 * ============================================================================
 * EcoSabon — E-book Protótipo | App Bootstrap (app.js)
 * ============================================================================
 * Inicialização do e-book: liga eventos de navegação, reveal toggles,
 * checklist Go/No-Go e scroll-to-top.
 * ============================================================================
 */

import {
  scrollToSection,
  setActiveNavItem,
  initScrollObserver,
  toggleSidebar,
  toggleRevealBlock,
  evaluateChecklist,
  scrollToTop,
  initStationMap,
  initSaponificationHotspots,
  activateModule,
  initModulePagination,
} from './interactions.js';

// ─── Botão toggle da sidebar (mobile) ───────────────────────────────────────
const toggleBtn = document.getElementById('btn-sidebar-toggle');
if (toggleBtn) {
  toggleBtn.addEventListener('click', () => {
    toggleSidebar();
  });
}

// ─── Cliques nas âncoras da sidebar ──────────────────────────────────────────
document.querySelectorAll('.sidebar__link').forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href').substring(1);
    
    // Tenta ativar a navegação por módulo paginado, senão rola até a seção (fallback)
    const activated = activateModule(targetId);
    if (!activated) {
      scrollToSection(targetId);
      setActiveNavItem(targetId);
    }

    // Fecha a sidebar no mobile se estiver aberta
    const sidebar = document.querySelector('.sidebar');
    if (sidebar && sidebar.classList.contains('sidebar--open')) {
      toggleSidebar();
    }
  });
});

// ─── Cliques em outros botões de navegação (ex: "Começar pelo Módulo 1") ─────
document.querySelectorAll('[data-nav]').forEach((btn) => {
  btn.addEventListener('click', () => {
    const targetId = btn.getAttribute('data-nav');
    const activated = activateModule(targetId);
    if (!activated) {
      scrollToSection(targetId);
      setActiveNavItem(targetId);
    }
  });
});

// ─── Inicialização do IntersectionObserver (Progressive Enhancement) ────────
initScrollObserver();

// ─── Inicialização do Mapa de Estações (Execução 3 — C3) ───────────────────
initStationMap();

// ─── Inicialização dos Hotspots do Infográfico (Execução 3B) ───────────────
initSaponificationHotspots();

// ─── Botões de reveal (Plano B, Dica de Mediação, etc.) ─────────────────────
document.querySelectorAll('[data-reveal]').forEach((btn) => {
  btn.addEventListener('click', () => {
    const target = btn.getAttribute('data-reveal');
    toggleRevealBlock(target);
  });
});

// ─── Checklist Go/No-Go ─────────────────────────────────────────────────────
const checklistContainer = document.getElementById('checklist-go');
const checklistResultEl = document.getElementById('checklist-result');

if (checklistContainer && checklistResultEl) {
  checklistContainer.addEventListener('change', () => {
    const { allChecked, checked, total } = evaluateChecklist('checklist-go');
    checklistResultEl.textContent = allChecked
      ? '✅ GO — Todas as dimensões verificadas. Produto pronto para revisão final.'
      : `⏳ ${checked}/${total} dimensões verificadas. Complete todas para aprovar.`;
    checklistResultEl.className = `checklist-result ${allChecked ? 'checklist-result--pass' : 'checklist-result--fail'}`;
  });
}

// ─── Scroll to Top ──────────────────────────────────────────────────────────
const topBtn = document.getElementById('btn-top');
if (topBtn) {
  topBtn.addEventListener('click', scrollToTop);
}

// ─── Inicialização: definir paginação por módulo ativo ──────────────────────
initModulePagination();
