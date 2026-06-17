/**
 * ============================================================================
 * EcoSabon — E-book Protótipo | App Bootstrap (app.js)
 * ============================================================================
 * Inicialização do e-book: liga eventos de navegação, reveal toggles,
 * checklist Go/No-Go e scroll-to-top.
 * ============================================================================
 */

import { navigateToModule, toggleRevealBlock, evaluateChecklist, scrollToTop } from './interactions.js';

// ─── Navegação por módulos ───────────────────────────────────────────────────

document.querySelectorAll('[data-nav]').forEach((btn) => {
  btn.addEventListener('click', () => {
    const target = btn.getAttribute('data-nav');
    navigateToModule(target);

    // Atualizar estilo ativo na navbar
    document.querySelectorAll('.navbar__link').forEach((l) => l.classList.remove('active'));
    btn.classList.add('active');
  });
});

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

// ─── Inicialização: mostrar módulo Início ───────────────────────────────────

navigateToModule('mod-inicio');
