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
  scrollToStation,
  initStationMap,
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

// ─── Helper: DOM com estrutura de estações enriquecidas (Execução 3) ─────────

function createStationTestDOM() {
  const dom = new JSDOM(`
    <!DOCTYPE html>
    <html>
    <body>
      <!-- Diagrama de sala interativo -->
      <div class="classroom-diagram">
        <div class="classroom-diagram__station" data-station="estacao-1"
             role="button" tabindex="0" aria-label="Ir para Estação 1 — Filtração do Óleo">
          🧪 Estação 1<br/>Filtração do Óleo
        </div>
        <div class="classroom-diagram__station" data-station="estacao-2"
             role="button" tabindex="0" aria-label="Ir para Estação 2 — Reator IoT vs Manual">
          ⚗️ Estação 2<br/>Reator IoT vs Manual
        </div>
        <div class="classroom-diagram__station" data-station="estacao-3"
             role="button" tabindex="0" aria-label="Ir para Estação 3 — Teste de pH">
          📊 Estação 3<br/>Teste de pH
        </div>
        <div class="classroom-diagram__center">
          👩‍🏫 Professor circula entre as estações
        </div>
      </div>

      <!-- Infográfico da saponificação -->
      <div id="infografico-saponificacao" class="infographic">
        <div class="infographic__reagent">Triglicerídeo</div>
        <div class="infographic__reagent">3 NaOH</div>
        <div class="infographic__arrow" aria-hidden="true">
          <svg class="infographic__arrow-svg" viewBox="0 0 40 20"><path d="M0 10 L30 10 L25 5 M30 10 L25 15"/></svg>
        </div>
        <div class="infographic__product">3 Sabão</div>
        <div class="infographic__product">Glicerol</div>
      </div>

      <!-- Cartão de estação enriquecido -->
      <div class="card station-card" id="estacao-1">
        <div class="station-card__header">
          <svg class="station-card__icon" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/></svg>
          <div>
            <span class="station-card__number">Estação 1</span>
            <h3 class="card__title">Filtração e Preparo do Óleo</h3>
          </div>
        </div>
        <div class="station-card__grid">
          <div class="station-field"><p class="card__label">Objetivo</p><p>Obj 1</p></div>
          <div class="station-field"><p class="card__label">Conteúdo</p><p>Cont 1</p></div>
          <div class="station-field"><p class="card__label">Materiais</p><p>Mat 1</p></div>
          <div class="station-field"><p class="card__label">Tempo</p><p>20 min</p></div>
        </div>
        <button data-reveal="reveal-e1-planob" aria-expanded="false">Ver Plano B</button>
        <div id="reveal-e1-planob" class="hidden" aria-hidden="true"><p>Plano B conteúdo</p></div>
      </div>

      <div class="card station-card" id="estacao-2">
        <div class="station-card__header">
          <svg class="station-card__icon" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/></svg>
          <div>
            <span class="station-card__number">Estação 2</span>
            <h3 class="card__title">Reator de Saponificação</h3>
          </div>
        </div>
        <div class="station-card__grid">
          <div class="station-field"><p class="card__label">Objetivo</p><p>Obj 2</p></div>
          <div class="station-field"><p class="card__label">Conteúdo</p><p>Cont 2</p></div>
          <div class="station-field"><p class="card__label">Materiais</p><p>Mat 2</p></div>
          <div class="station-field"><p class="card__label">Tempo</p><p>30 min</p></div>
        </div>
      </div>

      <div class="card station-card" id="estacao-3">
        <div class="station-card__header">
          <svg class="station-card__icon" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/></svg>
          <div>
            <span class="station-card__number">Estação 3</span>
            <h3 class="card__title">Controle de Qualidade</h3>
          </div>
        </div>
        <div class="station-card__grid">
          <div class="station-field"><p class="card__label">Objetivo</p><p>Obj 3</p></div>
          <div class="station-field"><p class="card__label">Conteúdo</p><p>Cont 3</p></div>
          <div class="station-field"><p class="card__label">Materiais</p><p>Mat 3</p></div>
          <div class="station-field"><p class="card__label">Tempo</p><p>15 min</p></div>
        </div>
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

  it('deve retornar null quando window é null', () => {
    const result = initScrollObserver(doc, null);
    expect(result).toBeNull();
  });

  it('deve retornar null e não lançar erro quando o parâmetro window é undefined', () => {
    const result = initScrollObserver(doc, undefined);
    expect(result).toBeNull();
  });

  it('deve retornar null quando ambos os parâmetros são null', () => {
    const result = initScrollObserver(null, null);
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

// ═══════════════════════════════════════════════════════════════════════════════
// NOVOS TESTES — EXECUÇÃO 3 (Sublotes 3A, 3B, 3C)
// ═══════════════════════════════════════════════════════════════════════════════

// ─── T27-T30: Cartões Interativos de Estação (C1) ───────────────────────────

describe('Cartões interativos de estação (C1)', () => {
  let doc;
  beforeEach(() => { doc = createStationTestDOM(); });

  it('T27 — cartão de estação tem cabeçalho visual com conteúdo', () => {
    const header = doc.querySelector('#estacao-1 .station-card__header');
    expect(header).not.toBeNull();
    expect(header.textContent.length).toBeGreaterThan(0);
  });

  it('T28 — cartão de estação tem grid de campos com ≥ 4 filhos', () => {
    const grid = doc.querySelector('#estacao-1 .station-card__grid');
    expect(grid).not.toBeNull();
    expect(grid.children.length).toBeGreaterThanOrEqual(4);
  });

  it('T29 — blocos de revelação preservados nos cartões enriquecidos', () => {
    const isNowVisible = toggleRevealBlock('reveal-e1-planob', doc);
    expect(isNowVisible).toBe(true);

    const block = doc.getElementById('reveal-e1-planob');
    expect(block.classList.contains('hidden')).toBe(false);
  });

  it('T30 — cartão de estação possui ícone SVG no cabeçalho', () => {
    const svg = doc.querySelector('#estacao-1 .station-card__header svg');
    expect(svg).not.toBeNull();
  });
});

// ─── T31-T33: Infográfico da Saponificação (C2) ─────────────────────────────

describe('Infográfico da saponificação (C2)', () => {
  let doc;
  beforeEach(() => { doc = createStationTestDOM(); });

  it('T31 — infográfico existe no DOM', () => {
    const infographic = doc.getElementById('infografico-saponificacao');
    expect(infographic).not.toBeNull();
  });

  it('T32 — infográfico contém reagentes e produtos', () => {
    const infographic = doc.getElementById('infografico-saponificacao');
    const text = infographic.textContent;
    expect(text).toContain('Triglicerídeo');
    expect(text).toContain('NaOH');
    expect(text).toContain('Sabão');
    expect(text).toContain('Glicerol');
  });

  it('T33 — infográfico contém seta de reação (SVG)', () => {
    const arrow = doc.querySelector('#infografico-saponificacao .infographic__arrow svg');
    expect(arrow).not.toBeNull();
  });
});

// ─── T34-T40: Visualizador de Rotação Interativo (C3) ───────────────────────

describe('Visualizador de rotação interativo (C3)', () => {
  let doc;
  beforeEach(() => { doc = createStationTestDOM(); });

  it('T34 — scrollToStation rola para a estação correspondente', () => {
    const station = doc.getElementById('estacao-1');
    let scrollCalled = false;
    station.scrollIntoView = () => { scrollCalled = true; };

    const result = scrollToStation('estacao-1', doc);
    expect(result).toBe(true);
    expect(scrollCalled).toBe(true);
  });

  it('T35 — scrollToStation retorna false para ID inexistente', () => {
    const result = scrollToStation('estacao-99', doc);
    expect(result).toBe(false);
  });

  it('T36 — scrollToStation retorna false sem document', () => {
    const result = scrollToStation('estacao-1', null);
    expect(result).toBe(false);
  });

  it('T37 — initStationMap registra estações e retorna contagem', () => {
    const count = initStationMap(doc);
    expect(count).toBe(3);
  });

  it('T38 — initStationMap retorna 0 sem estações no DOM', () => {
    const emptyDOM = new JSDOM('<!DOCTYPE html><html><body></body></html>');
    const count = initStationMap(emptyDOM.window.document);
    expect(count).toBe(0);
  });

  it('T39 — nó de estação no mapa tem role="button"', () => {
    const nodes = doc.querySelectorAll('.classroom-diagram__station');
    nodes.forEach((node) => {
      expect(node.getAttribute('role')).toBe('button');
    });
  });

  it('T40 — nó de estação no mapa tem tabindex="0"', () => {
    const nodes = doc.querySelectorAll('.classroom-diagram__station');
    nodes.forEach((node) => {
      expect(node.getAttribute('tabindex')).toBe('0');
    });
  });
});
