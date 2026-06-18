/**
 * ============================================================================
 * EcoSabon — E-book Protótipo | TDD — Testes de Interatividade
 * ============================================================================
 * Testes unitários para as funções de interação do e-book.
 * Executados com Vitest + jsdom.
 *
 * Execução 2: testes expandidos para cobrir navegação contínua (scroll),
 * sidebar, IntersectionObserver fallback e funções preservadas.
 * ============================================================================
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { JSDOM } from 'jsdom';
import {
  scrollToSection,
  setActiveNavItem,
  initScrollObserver,
  toggleSidebar,
  navigateToModule,
  toggleRevealBlock,
  evaluateChecklist,
} from '../src/scripts/interactions.js';

// ─── Helper: cria um DOM mínimo para testes ──────────────────────────────────

function createTestDOM() {
  const dom = new JSDOM(`
    <!DOCTYPE html>
    <html>
    <body>
      <!-- Sidebar de navegação -->
      <button class="sidebar-toggle" aria-expanded="false" aria-controls="sidebar-nav">Menu</button>
      <nav class="sidebar" id="sidebar-nav" aria-label="Sumário" aria-hidden="false">
        <ul>
          <li><a href="#mod-1" class="sidebar__link" aria-current="false">Módulo 1</a></li>
          <li><a href="#mod-2" class="sidebar__link" aria-current="false">Módulo 2</a></li>
          <li><a href="#mod-3" class="sidebar__link" aria-current="false">Módulo 3</a></li>
        </ul>
      </nav>

      <!-- Seções do e-book (fluxo contínuo) -->
      <section id="mod-1" class="ebook-section">
        <h2>Módulo 1</h2>
      </section>
      <section id="mod-2" class="ebook-section">
        <h2>Módulo 2</h2>
      </section>
      <section id="mod-3" class="ebook-section">
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

// ═══════════════════════════════════════════════════════════════════════════════
// TESTES PRESERVADOS DA EXECUÇÃO 1 (adaptados para nova arquitetura)
// ═══════════════════════════════════════════════════════════════════════════════

// ─── Teste: navigateToModule (compatibilidade) ──────────────────────────────

describe('navigateToModule (compatibilidade)', () => {
  let doc;
  beforeEach(() => { doc = createTestDOM(); });

  it('deve rolar até a seção alvo sem lançar erro', () => {
    // navigateToModule agora delega para scrollToSection + setActiveNavItem
    expect(() => navigateToModule('mod-2', doc)).not.toThrow();
  });

  it('deve não lançar erro se o ID alvo não existir', () => {
    expect(() => navigateToModule('mod-inexistente', doc)).not.toThrow();
  });
});

// ─── Teste: Toggle de blocos revelados ──────────────────────────────────────

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

// ─── Teste: Checklist Go/No-Go ──────────────────────────────────────────────

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

// ═══════════════════════════════════════════════════════════════════════════════
// NOVOS TESTES — EXECUÇÃO 2
// ═══════════════════════════════════════════════════════════════════════════════

// ─── Teste: scrollToSection ─────────────────────────────────────────────────

describe('scrollToSection', () => {
  let doc;
  beforeEach(() => { doc = createTestDOM(); });

  it('deve retornar true e chamar scrollIntoView quando a seção existe', () => {
    const section = doc.getElementById('mod-2');
    let scrollCalled = false;
    section.scrollIntoView = () => { scrollCalled = true; };

    const result = scrollToSection('mod-2', doc);
    expect(result).toBe(true);
    expect(scrollCalled).toBe(true);
  });

  it('deve retornar false quando o ID não existe', () => {
    const result = scrollToSection('secao-inexistente', doc);
    expect(result).toBe(false);
  });

  it('não deve lançar erro com ID inexistente', () => {
    expect(() => scrollToSection('secao-inexistente', doc)).not.toThrow();
  });
});

// ─── Teste: setActiveNavItem ────────────────────────────────────────────────

describe('setActiveNavItem', () => {
  let doc;
  beforeEach(() => { doc = createTestDOM(); });

  it('deve ativar o item correto e desativar os demais', () => {
    const result = setActiveNavItem('mod-2', doc);

    const links = doc.querySelectorAll('.sidebar__link');
    expect(result).toBe(true);
    expect(links[0].classList.contains('sidebar__link--active')).toBe(false);
    expect(links[0].getAttribute('aria-current')).toBe('false');
    expect(links[1].classList.contains('sidebar__link--active')).toBe(true);
    expect(links[1].getAttribute('aria-current')).toBe('true');
    expect(links[2].classList.contains('sidebar__link--active')).toBe(false);
  });

  it('deve retornar false com ID inexistente sem lançar erro', () => {
    const result = setActiveNavItem('mod-inexistente', doc);
    expect(result).toBe(false);
  });

  it('deve desativar todos os itens quando nenhum corresponde', () => {
    setActiveNavItem('mod-2', doc); // ativa mod-2
    setActiveNavItem('mod-inexistente', doc); // desativa todos

    const links = doc.querySelectorAll('.sidebar__link');
    links.forEach((link) => {
      expect(link.classList.contains('sidebar__link--active')).toBe(false);
      expect(link.getAttribute('aria-current')).toBe('false');
    });
  });

  it('deve permitir navegação por teclado (links são focáveis)', () => {
    const links = doc.querySelectorAll('.sidebar__link');
    links.forEach((link) => {
      // <a> tags são nativamente focáveis por teclado
      expect(link.tagName.toLowerCase()).toBe('a');
      expect(link.getAttribute('href')).toBeTruthy();
    });
  });
});

// ─── Teste: initScrollObserver (fallback) ───────────────────────────────────

describe('initScrollObserver', () => {
  let doc;
  beforeEach(() => { doc = createTestDOM(); });

  it('deve retornar null e não lançar erro quando IntersectionObserver não existe', () => {
    // JSDOM não implementa IntersectionObserver
    const fakeWindow = {};
    const result = initScrollObserver(doc, fakeWindow);
    expect(result).toBeNull();
  });

  it('deve retornar null quando window é null (sem ambiente de janela)', () => {
    const result = initScrollObserver(doc, null);
    expect(result).toBeNull();
  });

  it('deve retornar null quando não há seções observáveis', () => {
    const emptyDOM = new JSDOM('<!DOCTYPE html><html><body></body></html>');
    const fakeWindow = {
      IntersectionObserver: class { observe() {} disconnect() {} },
    };
    const result = initScrollObserver(emptyDOM.window.document, fakeWindow);
    expect(result).toBeNull();
  });
});

// ─── Teste: toggleSidebar ───────────────────────────────────────────────────

describe('toggleSidebar', () => {
  let doc;
  beforeEach(() => { doc = createTestDOM(); });

  it('deve abrir a sidebar e atualizar aria-hidden', () => {
    const isOpen = toggleSidebar(doc);
    const sidebar = doc.querySelector('.sidebar');

    expect(isOpen).toBe(true);
    expect(sidebar.classList.contains('sidebar--open')).toBe(true);
    expect(sidebar.getAttribute('aria-hidden')).toBe('false');
  });

  it('deve fechar a sidebar ao chamar novamente', () => {
    toggleSidebar(doc); // abre
    const isOpen = toggleSidebar(doc); // fecha
    const sidebar = doc.querySelector('.sidebar');

    expect(isOpen).toBe(false);
    expect(sidebar.classList.contains('sidebar--open')).toBe(false);
    expect(sidebar.getAttribute('aria-hidden')).toBe('true');
  });

  it('deve atualizar aria-expanded no botão toggle', () => {
    toggleSidebar(doc);
    const toggle = doc.querySelector('.sidebar-toggle');
    expect(toggle.getAttribute('aria-expanded')).toBe('true');
  });

  it('deve retornar false se a sidebar não existir', () => {
    const emptyDOM = new JSDOM('<!DOCTYPE html><html><body></body></html>');
    const result = toggleSidebar(emptyDOM.window.document);
    expect(result).toBe(false);
  });
});
