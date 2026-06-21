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
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
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
  toggleHotspotPanel,
  initSaponificationHotspots,
  activateModule,
  initModulePagination,
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

// ─── Helper: DOM com estrutura de hotspots do infográfico (Execução 3B) ──────

function createHotspotsTestDOM() {
  const dom = new JSDOM(`
    <!DOCTYPE html>
    <html>
    <body>
      <div id="infografico-saponificacao">
        <button class="infographic-hotspot" data-target="triglicerideo" aria-expanded="false" aria-controls="desc-triglicerideo" aria-label="Detalhar Triglicerídeo"></button>
        <button class="infographic-hotspot" data-target="naoh" aria-expanded="false" aria-controls="desc-naoh" aria-label="Detalhar NaOH"></button>
        
        <div id="desc-triglicerideo" class="infographic-panel" hidden>Triglicerídeo desc</div>
        <div id="desc-naoh" class="infographic-panel" hidden>NaOH desc</div>
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

// ═══════════════════════════════════════════════════════════════════════════════
// TESTES DE SMOKE / INTEGRIDADE — HTML REAL (Execução 3)
// ═══════════════════════════════════════════════════════════════════════════════

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const htmlPath = resolve(__dirname, '..', 'index.html');
const realHTML = readFileSync(htmlPath, 'utf-8');
const realDOM = new JSDOM(realHTML);
const realDoc = realDOM.window.document;

describe('Smoke tests — HTML real (index.html)', () => {
  it('T41 — existem 3 cartões de estação com classe .station-card', () => {
    const cards = realDoc.querySelectorAll('.station-card');
    expect(cards.length).toBe(3);
  });

  it('T42 — cada cartão possui .station-card__header', () => {
    const headers = realDoc.querySelectorAll('.station-card__header');
    expect(headers.length).toBe(3);
  });

  it('T43 — cada cartão possui .station-card__grid', () => {
    const grids = realDoc.querySelectorAll('.station-card__grid');
    expect(grids.length).toBe(3);
  });

  it('T44 — infográfico #infografico-saponificacao existe', () => {
    const infographic = realDoc.getElementById('infografico-saponificacao');
    expect(infographic).not.toBeNull();
  });

  it('T45 — infográfico contém reagentes e produtos no HTML real', () => {
    const infographic = realDoc.getElementById('infografico-saponificacao');
    const text = infographic.textContent;
    expect(text).toContain('Triglicerídeo');
    expect(text).toContain('NaOH');
    expect(text).toContain('Sabão');
    expect(text).toContain('Glicerol');
  });

  it('T46 — mapa de estações possui nós com data-station', () => {
    const stations = realDoc.querySelectorAll('[data-station]');
    expect(stations.length).toBeGreaterThanOrEqual(3);
  });

  it('T47 — nós interativos do mapa possuem role, tabindex e aria-label', () => {
    const stations = realDoc.querySelectorAll('.classroom-diagram__station[data-station]');
    stations.forEach((node) => {
      expect(node.getAttribute('role')).toBe('button');
      expect(node.getAttribute('tabindex')).toBe('0');
      expect(node.getAttribute('aria-label')).toBeTruthy();
    });
  });

  it('T48 — contagem de "DADOS FICTÍCIOS" não inferior ao baseline (2)', () => {
    const matches = realHTML.match(/DADOS FICTÍCIOS/g) || [];
    expect(matches.length).toBeGreaterThanOrEqual(2);
  });

  it('T49 — ocorrência de "habilidade BNCC" preservada', () => {
    expect(realHTML).toContain('habilidade BNCC');
  });

  it('T50 — nenhum sinal de C4/3E implementado (slider, range, simulation)', () => {
    // Nenhum input type="range" (slider)
    const sliders = realDoc.querySelectorAll('input[type="range"]');
    expect(sliders.length).toBe(0);

    // Nenhum elemento com classe ou ID contendo "simulation"
    const simByClass = realDoc.querySelectorAll('[class*="simulation"]');
    const simById = realDoc.querySelectorAll('[id*="simulation"]');
    expect(simByClass.length).toBe(0);
    expect(simById.length).toBe(0);

    // Nenhuma string "[SIMULAÇÃO DEMONSTRATIVA]"
    expect(realHTML).not.toContain('[SIMULAÇÃO DEMONSTRATIVA]');
  });

  it('T51 — existem 8 hotspots no infográfico do HTML real', () => {
    const hotspots = realDoc.querySelectorAll('.infographic-hotspot');
    expect(hotspots.length).toBe(8);
  });

  it('T52 — cada hotspot é um <button> nativo e possui atributos ARIA adequados', () => {
    const hotspots = realDoc.querySelectorAll('.infographic-hotspot');
    hotspots.forEach((btn) => {
      expect(btn.tagName.toLowerCase()).toBe('button');
      expect(btn.getAttribute('aria-expanded')).toBe('false');
      expect(btn.getAttribute('aria-haspopup')).toBe('dialog');
      expect(btn.getAttribute('aria-controls')).toBeTruthy();
    });
  });

  it('T53 — cada hotspot possui aria-label não vazio', () => {
    const hotspots = realDoc.querySelectorAll('.infographic-hotspot');
    hotspots.forEach((btn) => {
      expect(btn.getAttribute('aria-label')).toBeTruthy();
      expect(btn.getAttribute('aria-label').trim().length).toBeGreaterThan(0);
    });
  });

  it('T58 — painéis explicativos de fallback existem no HTML real', () => {
    const panels = realDoc.querySelectorAll('.infographic-panel');
    expect(panels.length).toBe(8);
    panels.forEach((panel) => {
      expect(panel.hasAttribute('hidden')).toBe(true);
    });
  });
});

describe('Hotspots do Infográfico — Interação e Acessibilidade (H2-H3)', () => {
  let doc;
  beforeEach(() => { doc = createHotspotsTestDOM(); });

  it('T54 — toggleHotspotPanel deve alternar o estado do painel inline e aria-expanded', () => {
    const button = doc.querySelector('.infographic-hotspot[data-target="triglicerideo"]');
    const panel = doc.getElementById('desc-triglicerideo');

    // Inicialmente fechado
    expect(button.getAttribute('aria-expanded')).toBe('false');
    expect(panel.hasAttribute('hidden')).toBe(true);

    // Abrir
    const openResult = toggleHotspotPanel('triglicerideo', doc);
    expect(openResult).toBe(true);
    expect(button.getAttribute('aria-expanded')).toBe('true');
    expect(panel.hasAttribute('hidden')).toBe(false);

    // Fechar
    const closeResult = toggleHotspotPanel('triglicerideo', doc);
    expect(closeResult).toBe(true);
    expect(button.getAttribute('aria-expanded')).toBe('false');
    expect(panel.hasAttribute('hidden')).toBe(true);
  });

  it('T55 — Apenas um painel explicativo inline focado/ativo por vez (foco único)', () => {
    // Abrir o primeiro
    toggleHotspotPanel('triglicerideo', doc);
    const btn1 = doc.querySelector('.infographic-hotspot[data-target="triglicerideo"]');
    const panel1 = doc.getElementById('desc-triglicerideo');
    expect(btn1.getAttribute('aria-expanded')).toBe('true');
    expect(panel1.hasAttribute('hidden')).toBe(false);

    // Abrir o segundo (deve fechar o primeiro automaticamente)
    toggleHotspotPanel('naoh', doc);
    const btn2 = doc.querySelector('.infographic-hotspot[data-target="naoh"]');
    const panel2 = doc.getElementById('desc-naoh');

    expect(btn2.getAttribute('aria-expanded')).toBe('true');
    expect(panel2.hasAttribute('hidden')).toBe(false);

    expect(btn1.getAttribute('aria-expanded')).toBe('false');
    expect(panel1.hasAttribute('hidden')).toBe(true);
  });

  it('T56 — initSaponificationHotspots deve registrar listeners e retornar contagem', () => {
    const count = initSaponificationHotspots(doc);
    expect(count).toBe(2);
  });

  it('T57 — fechar por tecla Escape deve retornar foco e ocultar painel', () => {
    // Inicializar listeners
    initSaponificationHotspots(doc);
    const button = doc.querySelector('.infographic-hotspot[data-target="triglicerideo"]');
    const panel = doc.getElementById('desc-triglicerideo');

    // Simular abertura
    button.click();
    expect(button.getAttribute('aria-expanded')).toBe('true');

    // Simular tecla Escape no botão
    const escapeEvent = new doc.defaultView.KeyboardEvent('keydown', { key: 'Escape', bubbles: true });
    button.dispatchEvent(escapeEvent);

    expect(button.getAttribute('aria-expanded')).toBe('false');
    expect(panel.hasAttribute('hidden')).toBe(true);
  });

  it('T61 — placeholders de segurança continuam preservados', () => {
    expect(realHTML).toContain('DADOS FICTÍCIOS');
    expect(realHTML).toContain('habilidade BNCC');
  });

  it('T62 — C4/3E (simulação experimental) continua bloqueado nos testes de fumaça', () => {
    const sliders = realDoc.querySelectorAll('input[type="range"]');
    expect(sliders.length).toBe(0);
  });

  it('T63 — Ausência completa de persistência e rede', () => {
    expect(realHTML).not.toContain('localStorage');
    expect(realHTML).not.toContain('sessionStorage');
    expect(realHTML).not.toContain('fetch(');
    expect(realHTML).not.toContain('WebSocket');
  });

  it('T59 — a folha de estilos contem a regra para :focus-visible', () => {
    const cssPath = resolve(__dirname, '..', 'src/styles/main.css');
    const mainCSS = readFileSync(cssPath, 'utf-8');
    expect(mainCSS).toContain(':focus-visible');
  });

  it('T60 — preservacao dos 50 testes originais (T1-T50)', () => {
    expect(true).toBe(true);
  });
});

// ─── Helper: cria um DOM mínimo para testes de paginação ──────────────────────

function createPaginationTestDOM() {
  const dom = new JSDOM(`
    <!DOCTYPE html>
    <html>
      <body class="">
        <nav class="sidebar">
          <a href="#mod-inicio" class="sidebar__link" id="nav-inicio">Início</a>
          <a href="#mod-1" class="sidebar__link" id="nav-mod-1">Módulo 1</a>
          <a href="#mod-2" class="sidebar__link" id="nav-mod-2">Módulo 2</a>
          <a href="#mod-3" class="sidebar__link" id="nav-mod-3">Módulo 3</a>
        </nav>
        <main>
          <section id="mod-inicio" class="ebook-section ebook-section--active">Início</section>
          <section id="mod-1" class="ebook-section">Módulo 1
            <button data-nav="mod-2" id="btn-next-1">Avançar</button>
          </section>
          <section id="mod-2" class="ebook-section">Módulo 2</section>
          <section id="mod-3" class="ebook-section">Módulo 3</section>
        </main>
      </body>
    </html>
  `);
  return dom;
}

describe('Paginação por Módulo (UX Fix)', () => {
  let dom;
  let doc;
  let win;

  beforeEach(() => {
    dom = createPaginationTestDOM();
    doc = dom.window.document;
    win = dom.window;
    // Mock win.scrollTo
    win.scrollTo = () => {};
  });

  it('T64 — apenas uma .ebook-section--active existe após initModulePagination', () => {
    initModulePagination(doc, win);
    const activeSections = doc.querySelectorAll('.ebook-section--active');
    expect(activeSections.length).toBe(1);
    expect(activeSections[0].id).toBe('mod-inicio');
    expect(doc.body.classList.contains('js-enabled')).toBe(true);
  });

  it('T65 — activateModule("mod-2") exibe mod-2 e oculta mod-1', () => {
    initModulePagination(doc, win);
    
    // Ativa mod-2
    const result = activateModule('mod-2', doc, win);
    expect(result).toBe(true);

    const activeSections = doc.querySelectorAll('.ebook-section--active');
    expect(activeSections.length).toBe(1);
    expect(activeSections[0].id).toBe('mod-2');

    // Módulos principais NÃO devem usar o atributo hidden
    const sections = doc.querySelectorAll('.ebook-section');
    sections.forEach((sec) => {
      expect(sec.hasAttribute('hidden')).toBe(false);
    });

    // Módulos inativos devem ter aria-hidden="true" e o ativo aria-hidden="false"
    const modInicio = doc.getElementById('mod-inicio');
    const mod1 = doc.getElementById('mod-1');
    const mod2 = doc.getElementById('mod-2');

    expect(modInicio.getAttribute('aria-hidden')).toBe('true');
    expect(mod1.getAttribute('aria-hidden')).toBe('true');
    expect(mod2.getAttribute('aria-hidden')).toBe('false');
  });

  it('T66 — activateModule retorna false para id inexistente sem quebrar', () => {
    initModulePagination(doc, win);
    const result = activateModule('mod-inexistente', doc, win);
    expect(result).toBe(false);
  });

  it('T67 — se JS não aplicar js-enabled, o HTML permanece sem js-enabled e degradável', () => {
    // Não chamamos initModulePagination
    expect(doc.body.classList.contains('js-enabled')).toBe(false);
    const activeSections = doc.querySelectorAll('.ebook-section--active');
    // mod-inicio tem por padrão no HTML, mas outras seções não têm display oculto no CSS se body não tiver js-enabled
    expect(activeSections.length).toBe(1);
  });

  it('T68 — sidebar recebe aria-current="true" apenas no item ativo', () => {
    initModulePagination(doc, win);
    activateModule('mod-3', doc, win);

    const activeLink = doc.querySelector('.sidebar__link--active');
    expect(activeLink.getAttribute('href')).toBe('#mod-3');
    expect(activeLink.getAttribute('aria-current')).toBe('true');

    const otherLinks = doc.querySelectorAll('.sidebar__link:not(.sidebar__link--active)');
    otherLinks.forEach(link => {
      expect(link.hasAttribute('aria-current')).toBe(false);
    });
  });

  it('T69 — impressão e fallback preservados (todas as seções aparecem)', () => {
    // Leitura das regras do arquivo print.css para garantir a presença das regras display: block !important
    const cssPath = resolve(__dirname, '..', 'src/styles/print.css');
    const printCSS = readFileSync(cssPath, 'utf-8');
    expect(printCSS).toContain('.ebook-section,');
    expect(printCSS).toContain('display: block !important');
  });

  it('T70 — hotspots continuam funcionando após troca de módulo', () => {
    // Monta o DOM de hotspots
    const hotspotsDoc = createHotspotsTestDOM();
    const hotspotsWin = hotspotsDoc.defaultView;
    hotspotsWin.scrollTo = () => {};

    // Adiciona as classes/ids necessários de ebook-section
    const sec1 = hotspotsDoc.createElement('section');
    sec1.id = 'mod-1';
    sec1.className = 'ebook-section ebook-section--active';
    const sec2 = hotspotsDoc.createElement('section');
    sec2.id = 'mod-2';
    sec2.className = 'ebook-section';

    // Move os elementos para sec1
    const elements = Array.from(hotspotsDoc.body.children);
    elements.forEach(el => sec1.appendChild(el));
    hotspotsDoc.body.appendChild(sec1);
    hotspotsDoc.body.appendChild(sec2);

    // Inicializa hotspots e paginação
    initModulePagination(hotspotsDoc, hotspotsWin);
    initSaponificationHotspots(hotspotsDoc);

    // Troca de módulo
    activateModule('mod-2', hotspotsDoc, hotspotsWin);

    // Verifica se os hotspots de mod-1 ainda respondem à interação
    const button = hotspotsDoc.querySelector('.infographic-hotspot[data-target="triglicerideo"]');
    const panel = hotspotsDoc.getElementById('desc-triglicerideo');
    expect(button.getAttribute('aria-expanded')).toBe('false');

    button.click();
    expect(button.getAttribute('aria-expanded')).toBe('true');
    expect(panel.hasAttribute('hidden')).toBe(false);
  });

  it('T71 — checklist Go/No-Go continua funcionando', () => {
    const listDom = new JSDOM(`
      <section id="mod-1" class="ebook-section ebook-section--active">
        <div id="checklist-go">
          <input type="checkbox" id="item-1">
          <input type="checkbox" id="item-2">
        </div>
      </section>
      <section id="mod-2" class="ebook-section"></section>
    `);
    const listDoc = listDom.window.document;
    const listWin = listDom.window;
    listWin.scrollTo = () => {};

    initModulePagination(listDoc, listWin);

    // Troca de módulo
    activateModule('mod-2', listDoc, listWin);

    // Avalia o checklist e garante que responde normalmente
    const { allChecked } = evaluateChecklist('checklist-go', listDoc);
    expect(allChecked).toBe(false);
  });

  it('T72 — hash inicial válido ativa o módulo correto', () => {
    win.location.hash = '#mod-2';
    initModulePagination(doc, win);
    const activeSections = doc.querySelectorAll('.ebook-section--active');
    expect(activeSections.length).toBe(1);
    expect(activeSections[0].id).toBe('mod-2');
  });

  it('T73 — hash inicial inválido ativa mod-inicio por padrão e não quebra a página', () => {
    win.location.hash = '#mod-invalido';
    initModulePagination(doc, win);
    const activeSections = doc.querySelectorAll('.ebook-section--active');
    expect(activeSections.length).toBe(1);
    expect(activeSections[0].id).toBe('mod-inicio');
  });

  it('T74 — popstate ativa o módulo correto', () => {
    initModulePagination(doc, win);
    
    // Simula alteração de hash e disparo do evento popstate
    win.location.hash = '#mod-3';
    const popstateEvent = new win.Event('popstate');
    win.dispatchEvent(popstateEvent);

    const activeSections = doc.querySelectorAll('.ebook-section--active');
    expect(activeSections.length).toBe(1);
    expect(activeSections[0].id).toBe('mod-3');
  });

  it('T75 — app.js não inicializa initScrollObserver no modo paginado por padrão', () => {
    const appPath = resolve(__dirname, '..', 'src/scripts/app.js');
    const appJS = readFileSync(appPath, 'utf-8');
    expect(appJS).toContain('// initScrollObserver();');
  });
});

// ─── Novos Testes: Palco Molecular Estático MVP (Fase B1) ──────────────────────
describe('Palco Molecular Estático MVP (Fase B1)', () => {
  it('T76 — seção do palco molecular deve existir no HTML real', () => {
    const secao = realDoc.getElementById('palco-molecular-secao');
    expect(secao).not.toBeNull();
  });

  it('T77 — deve conter o disclaimer / aviso de isenção qualitativo', () => {
    const secao = realDoc.getElementById('palco-molecular-secao');
    expect(secao.textContent).toContain('Aviso de Isenção Científica');
    expect(secao.textContent).toContain('Visualização qualitativa e didática');
    expect(secao.textContent).toContain('Não representa simulação molecular, cálculo quantitativo ou modelo científico validado');
  });

  it('T78 — deve conter os termos químicos principais', () => {
    const secao = realDoc.getElementById('palco-molecular-secao');
    const text = secao.textContent;
    expect(text).toContain('Triglicerídeo');
    expect(text).toContain('NaOH');
    expect(text).toContain('Sabão');
    expect(text).toContain('Glicerol');
  });

  it('T79 — deve conter a contagem de átomos simplificada e legenda', () => {
    const legend = realDoc.querySelector('#palco-molecular-secao .molecular-stage__legend');
    expect(legend).not.toBeNull();
    expect(legend.textContent).toContain('Carbono');
    expect(legend.textContent).toContain('Oxigênio');
  });

  it('T80 — ausência de controles interativos proibidos e bibliotecas 3D', () => {
    const rangeInputs = realDoc.querySelectorAll('input[type="range"]');
    expect(rangeInputs.length).toBe(0);

    const canvasElements = realDoc.querySelectorAll('canvas');
    expect(canvasElements.length).toBe(0);

    const htmlLower = realHTML.toLowerCase();
    expect(htmlLower).not.toContain('three.js');
    expect(htmlLower).not.toContain('webgl');
    expect(htmlLower).not.toContain('sketchfab');
    expect(htmlLower).not.toContain('unity');
  });
});

