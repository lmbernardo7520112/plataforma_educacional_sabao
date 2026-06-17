/**
 * ============================================================================
 * EcoSabon — E-book Protótipo | TDD — Testes de Interatividade
 * ============================================================================
 * Testes unitários para as funções de interação do e-book.
 * Executados com Vitest + jsdom.
 * ============================================================================
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { JSDOM } from 'jsdom';
import { navigateToModule, toggleRevealBlock, evaluateChecklist } from '../src/scripts/interactions.js';

// ─── Helper: cria um DOM mínimo para testes ──────────────────────────────────

function createTestDOM() {
  const dom = new JSDOM(`
    <!DOCTYPE html>
    <html>
    <body>
      <!-- Módulos -->
      <section id="mod-1" class="module-section active" aria-hidden="false">
        <h2>Módulo 1</h2>
      </section>
      <section id="mod-2" class="module-section" aria-hidden="true">
        <h2>Módulo 2</h2>
      </section>
      <section id="mod-3" class="module-section" aria-hidden="true">
        <h2>Módulo 3</h2>
      </section>

      <!-- Bloco revelável -->
      <button data-reveal="plano-b-1" aria-expanded="false">Ver Plano B</button>
      <div id="plano-b-1" class="hidden" aria-hidden="true">
        <p>Conteúdo do Plano B</p>
      </div>

      <!-- Checklist Go/No-Go -->
      <div id="checklist-go">
        <label><input type="checkbox" /> Item 1</label>
        <label><input type="checkbox" /> Item 2</label>
        <label><input type="checkbox" /> Item 3</label>
      </div>
    </body>
    </html>
  `);
  return dom.window.document;
}

// ─── Teste 1: Navegação entre módulos ────────────────────────────────────────

describe('navigateToModule', () => {
  let doc;
  beforeEach(() => { doc = createTestDOM(); });

  it('deve esconder todos os módulos e mostrar apenas o alvo', () => {
    navigateToModule('mod-2', doc);

    const mod1 = doc.getElementById('mod-1');
    const mod2 = doc.getElementById('mod-2');
    const mod3 = doc.getElementById('mod-3');

    expect(mod1.classList.contains('active')).toBe(false);
    expect(mod1.getAttribute('aria-hidden')).toBe('true');

    expect(mod2.classList.contains('active')).toBe(true);
    expect(mod2.getAttribute('aria-hidden')).toBe('false');

    expect(mod3.classList.contains('active')).toBe(false);
    expect(mod3.getAttribute('aria-hidden')).toBe('true');
  });

  it('deve manter tudo escondido se o ID alvo não existir', () => {
    navigateToModule('mod-inexistente', doc);

    const sections = doc.querySelectorAll('.module-section');
    sections.forEach((s) => {
      expect(s.classList.contains('active')).toBe(false);
    });
  });
});

// ─── Teste 2: Toggle de blocos revelados ─────────────────────────────────────

describe('toggleRevealBlock', () => {
  let doc;
  beforeEach(() => { doc = createTestDOM(); });

  it('deve mostrar o bloco oculto e retornar true', () => {
    const isNowVisible = toggleRevealBlock('plano-b-1', doc);

    const block = doc.getElementById('plano-b-1');
    expect(isNowVisible).toBe(true);
    expect(block.classList.contains('hidden')).toBe(false);
    expect(block.getAttribute('aria-hidden')).toBe('false');
  });

  it('deve esconder o bloco visível ao chamar novamente', () => {
    toggleRevealBlock('plano-b-1', doc); // mostra
    const isNowVisible = toggleRevealBlock('plano-b-1', doc); // esconde

    const block = doc.getElementById('plano-b-1');
    expect(isNowVisible).toBe(false);
    expect(block.classList.contains('hidden')).toBe(true);
  });

  it('deve atualizar aria-expanded no botão trigger', () => {
    toggleRevealBlock('plano-b-1', doc);

    const trigger = doc.querySelector('[data-reveal="plano-b-1"]');
    expect(trigger.getAttribute('aria-expanded')).toBe('true');
  });

  it('deve retornar false se o bloco não existir', () => {
    const result = toggleRevealBlock('bloco-inexistente', doc);
    expect(result).toBe(false);
  });
});

// ─── Teste 3: Checklist Go/No-Go ─────────────────────────────────────────────

describe('evaluateChecklist', () => {
  let doc;
  beforeEach(() => { doc = createTestDOM(); });

  it('deve retornar allChecked=false quando nenhum item está marcado', () => {
    const result = evaluateChecklist('checklist-go', doc);
    expect(result.allChecked).toBe(false);
    expect(result.total).toBe(3);
    expect(result.checked).toBe(0);
  });

  it('deve retornar allChecked=false quando apenas alguns estão marcados', () => {
    const checkboxes = doc.querySelectorAll('#checklist-go input[type="checkbox"]');
    checkboxes[0].checked = true;
    checkboxes[1].checked = true;

    const result = evaluateChecklist('checklist-go', doc);
    expect(result.allChecked).toBe(false);
    expect(result.checked).toBe(2);
  });

  it('deve retornar allChecked=true quando TODOS estão marcados', () => {
    const checkboxes = doc.querySelectorAll('#checklist-go input[type="checkbox"]');
    checkboxes.forEach((cb) => { cb.checked = true; });

    const result = evaluateChecklist('checklist-go', doc);
    expect(result.allChecked).toBe(true);
    expect(result.total).toBe(3);
    expect(result.checked).toBe(3);
  });

  it('deve retornar allChecked=false se o container não existir', () => {
    const result = evaluateChecklist('container-inexistente', doc);
    expect(result.allChecked).toBe(false);
    expect(result.total).toBe(0);
  });
});
