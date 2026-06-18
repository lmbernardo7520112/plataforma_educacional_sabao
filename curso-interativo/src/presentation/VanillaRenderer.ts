// ============================================================================
// EcoSabon — Curso Interativo | VanillaRenderer
// ============================================================================
// Motor de renderização que transforma dados tipados em HTML interativo.
// Zero dependências de framework — funciona em qualquer navegador moderno.
// RF: RF-CUR-002 (8 tipos de blocos), RF-CUR-007 (HTML auto-contido)
// ============================================================================

import type { Course, CourseModule, Lesson, Block } from '../domain/models/index.js';
import { ProgressTracker } from '../domain/services/ProgressTracker.js';
import { ContentValidator } from '../domain/services/ContentValidator.js';
import { EvaluateSorting } from '../application/usecases/EvaluateSorting.js';
import { EvaluateScenario } from '../application/usecases/EvaluateScenario.js';
import type { IStoragePort, IScormPort } from '../application/ports/index.js';

export class VanillaRenderer {
  private readonly course: Course;
  private tracker: ProgressTracker;
  private readonly storage: IStoragePort;
  private readonly scorm: IScormPort;
  private container: HTMLElement | null = null;

  constructor(course: Course, storage: IStoragePort, scorm: IScormPort) {
    ContentValidator.validate(course);
    this.course = course;
    this.storage = storage;
    this.scorm = scorm;

    // Tenta restaurar progresso salvo
    const saved = storage.load(course.id);
    this.tracker = saved
      ? ProgressTracker.fromJSON(course, saved)
      : new ProgressTracker(course);
  }

  mount(containerEl: HTMLElement): void {
    this.container = containerEl;
    this.render();
  }

  private render(): void {
    if (!this.container) return;
    const pct = this.tracker.getCompletionPercentage();

    this.container.innerHTML = `
      <div class="progress-tracker" id="progress-tracker">
        <div class="progress-bar">
          <div class="progress-bar__fill animate-progress" style="width:${pct}%"></div>
        </div>
        <p class="progress-text">${Math.round(pct)}% concluído — ${this.course.title}</p>
      </div>
      <div class="curso-container">
        <header class="curso-header">
          <h1 class="curso-header__title">${this.course.title}</h1>
          <p class="curso-header__subtitle">
            ${this.course.modules.length} módulos · ${ContentValidator.getLessonCount(this.course)} lições · Versão ${this.course.version}
          </p>
        </header>
        ${this.course.modules.map(m => this.renderModule(m)).join('')}
      </div>
    `;

    this.attachEventListeners();
  }

  // ─── Module Renderer ──────────────────────────────────────────────

  private renderModule(mod: CourseModule): string {
    return `
      <section class="module-section" data-module="${mod.id}">
        <div class="module-header animate-fade-in">
          <p class="module-header__number">Módulo ${mod.number} — ${mod.engineeringPhase}</p>
          <h2 class="module-header__title">${mod.title}</h2>
          <p class="module-header__subtitle">${mod.subtitle}</p>
        </div>
        ${mod.lessons.map(l => this.renderLesson(l)).join('')}
      </section>
    `;
  }

  // ─── Lesson Renderer ──────────────────────────────────────────────

  private renderLesson(lesson: Lesson): string {
    const canNavigate = true; // TEMPORARILY UNLOCKED: this.tracker.canNavigateTo(lesson.id);
    const isComplete = this.tracker.isLessonComplete(lesson.id);
    const lockClass = canNavigate ? '' : 'locked';
    const completeClass = isComplete ? 'complete' : '';

    return `
      <section class="lesson-section ${lockClass} ${completeClass}" data-lesson="${lesson.id}" id="lesson-${lesson.id}">
        ${!canNavigate ? '<div class="lesson-lock">🔒 Complete as lições anteriores para desbloquear</div>' : ''}
        <h3 class="lesson-section__title">${isComplete ? '✅ ' : ''}${lesson.title}</h3>
        <div class="lesson-section__meta">
          <span class="lesson-section__badge lesson-section__badge--time">⏱ ${lesson.estimatedMinutes} min</span>
          <span class="lesson-section__badge lesson-section__badge--bloom">🧠 ${lesson.bloomLevel}</span>
        </div>
        <p style="color: var(--color-text-secondary); margin-bottom: var(--space-6); font-style: italic;">
          Objetivo: ${lesson.objective}
        </p>
        ${canNavigate ? lesson.blocks.map((b, i) => this.renderBlock(b, lesson.id, i)).join('') : ''}
      </section>
    `;
  }

  // ─── Block Router ─────────────────────────────────────────────────

  private renderBlock(block: Block, lessonId: string, blockIndex: number): string {
    const isComplete = this.tracker.isBlockComplete(lessonId, blockIndex);
    const completeAttr = isComplete ? 'data-completed="true"' : '';
    const wrapper = (inner: string, icon: string, title: string) => `
      <div class="block animate-fade-in" data-lesson="${lessonId}" data-block="${blockIndex}" ${completeAttr}>
        ${title ? `<div class="block__title"><span class="block__icon">${icon}</span> ${title}</div>` : ''}
        ${inner}
      </div>
    `;

    const d = block.data as Record<string, unknown>;

    switch (block.type) {
      case 'text': return wrapper(this.renderTextBlock(d), '📖', '');
      case 'flashcards': return wrapper(this.renderFlashcards(d), '🃏', 'Flashcards');
      case 'process': return wrapper(this.renderProcess(d), '🔄', 'Passo a Passo');
      case 'accordion': return wrapper(this.renderAccordion(d), '📂', 'Explore os Detalhes');
      case 'sorting-activity': return wrapper(this.renderSortingActivity(d, lessonId, blockIndex), '🧩', 'Atividade de Classificação');
      case 'scenario': return wrapper(this.renderScenario(d, lessonId, blockIndex), '🎭', 'Cenário Interativo');
      case 'labeled-graphic': return wrapper(this.renderLabeledGraphic(d), '🖼️', 'Gráfico Interativo');
      case 'progress-tracker': return wrapper(this.renderProgressWidget(), '📊', 'Seu Progresso');
      default: return wrapper(`<p>Bloco não reconhecido: ${(block as Block).type}</p>`, '❓', 'Desconhecido');
    }
  }

  // ─── Individual Block Renderers ───────────────────────────────────

  private renderTextBlock(d: Record<string, unknown>): string {
    return `<div class="text-block">${d.content as string}</div>`;
  }

  private renderFlashcards(d: Record<string, unknown>): string {
    const cards = d.cards as Array<{ front: string; back: string }>;
    return `
      <div class="flashcards-grid">
        ${cards.map((c, i) => `
          <div class="flashcard flip-container">
            <div class="flip-card" data-flip="${i}">
              <div class="flip-card__face flip-card__face--front">${c.front}</div>
              <div class="flip-card__face flip-card__face--back">${c.back}</div>
            </div>
            <p class="flashcard__hint">Clique para virar</p>
          </div>
        `).join('')}
      </div>
    `;
  }

  private renderProcess(d: Record<string, unknown>): string {
    const steps = d.steps as Array<{ title: string; description: string }>;
    return `
      <div class="process-block__steps">
        ${steps.map((s, i) => `
          <div class="process-step">
            <div class="process-step__number">${i + 1}</div>
            <div class="process-step__content">
              <h4>${s.title}</h4>
              <p>${s.description}</p>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  private renderAccordion(d: Record<string, unknown>): string {
    const sections = d.sections as Array<{ title: string; content: string }>;
    return sections.map((s, i) => `
      <div class="accordion__item" data-accordion="${i}">
        <button class="accordion__trigger">${s.title}</button>
        <div class="accordion__panel">
          <div class="accordion__content">${s.content}</div>
        </div>
      </div>
    `).join('');
  }

  private renderSortingActivity(d: Record<string, unknown>, lessonId: string, blockIndex: number): string {
    const prompt = d.prompt as string;
    const categories = d.categories as string[];
    const items = d.items as Array<{ label: string; correctCategory: string }>;
    const uid = `sort-${lessonId}-${blockIndex}`;

    return `
      <p class="sorting-prompt">${prompt}</p>
      <div class="sorting-zones" id="${uid}-zones">
        ${categories.map(cat => `
          <div class="sorting-zone" data-category="${cat}" id="${uid}-zone-${cat.replace(/\s+/g, '-')}">
            <div class="sorting-zone__title">${cat}</div>
          </div>
        `).join('')}
      </div>
      <div class="sorting-pool" id="${uid}-pool">
        ${items.sort(() => Math.random() - 0.5).map(item => `
          <div class="sorting-item" draggable="true" data-label="${item.label}" data-correct="${item.correctCategory}">
            ${item.label}
          </div>
        `).join('')}
      </div>
      <button class="btn-check" id="${uid}-check" data-sorting="${uid}" data-lesson="${lessonId}" data-block="${blockIndex}">
        ✓ Verificar Respostas
      </button>
      <div id="${uid}-feedback" class="sorting-feedback" style="display:none"></div>
    `;
  }

  private renderScenario(d: Record<string, unknown>, lessonId: string, blockIndex: number): string {
    const context = d.context as string;
    const question = d.question as string;
    const options = d.options as Array<{ id: string; text: string; isCorrect: boolean; feedback: string }>;
    const uid = `scenario-${lessonId}-${blockIndex}`;

    return `
      <div class="scenario-context">${context}</div>
      <p class="scenario-question">${question}</p>
      <div class="scenario-options" id="${uid}-options">
        ${options.map(opt => `
          <button class="scenario-option" data-option="${opt.id}" data-scenario="${uid}" data-lesson="${lessonId}" data-block="${blockIndex}">
            <strong>${opt.id}.</strong> ${opt.text}
          </button>
        `).join('')}
      </div>
      <div id="${uid}-feedback" class="scenario-feedback" style="display:none"></div>
    `;
  }

  private renderLabeledGraphic(d: Record<string, unknown>): string {
    const hotspots = d.hotspots as Array<{ x: number; y: number; label: string; description: string }> | undefined;
    if (!hotspots) return '<p>Gráfico interativo (sem dados de hotspot)</p>';
    return `
      <div class="labeled-graphic">
        <div class="labeled-graphic__image" style="width:100%;height:300px;background:var(--color-surface-2);border-radius:var(--radius-lg);display:flex;align-items:center;justify-content:center;color:var(--color-text-muted);">
          📸 Imagem interativa
        </div>
        ${hotspots.map((h, i) => `
          <div class="labeled-graphic__hotspot" style="top:${h.y}%;left:${h.x}%" data-hotspot="${i}">
            ${i + 1}
          </div>
          <div class="labeled-graphic__tooltip" id="tooltip-${i}">
            <strong>${h.label}</strong><br/>${h.description}
          </div>
        `).join('')}
      </div>
    `;
  }

  private renderProgressWidget(): string {
    const pct = this.tracker.getCompletionPercentage();
    const total = ContentValidator.getLessonCount(this.course);
    const completed = Math.round((pct / 100) * total);
    return `
      <div style="text-align:center;">
        <div class="progress-bar" style="height:12px; margin-bottom: var(--space-4);">
          <div class="progress-bar__fill animate-progress" style="width:${pct}%"></div>
        </div>
        <p style="color:var(--color-text-primary);font-size:var(--text-2xl);font-weight:700;">${Math.round(pct)}%</p>
        <p style="color:var(--color-text-secondary);">${completed} de ${total} lições concluídas</p>
      </div>
    `;
  }

  // ─── Event Handling ───────────────────────────────────────────────

  private attachEventListeners(): void {
    if (!this.container) return;

    // Flashcard flip
    this.container.querySelectorAll('.flip-card').forEach(card => {
      card.addEventListener('click', () => {
        card.classList.toggle('flipped');
        const block = card.closest('.block') as HTMLElement | null;
        if (block) this.markBlockComplete(block);
      });
    });

    // Accordion toggle
    this.container.querySelectorAll('.accordion__trigger').forEach(trigger => {
      trigger.addEventListener('click', () => {
        const item = trigger.closest('.accordion__item');
        item?.classList.toggle('open');
        const block = trigger.closest('.block') as HTMLElement | null;
        if (block) this.markBlockComplete(block);
      });
    });

    // Text blocks — mark complete on scroll into view
    this.container.querySelectorAll('.text-block').forEach(textBlock => {
      const block = textBlock.closest('.block') as HTMLElement | null;
      if (block) {
        const observer = new IntersectionObserver(([entry]) => {
          if (entry?.isIntersecting) {
            setTimeout(() => this.markBlockComplete(block), 1500);
            observer.disconnect();
          }
        }, { threshold: 0.5 });
        observer.observe(block);
      }
    });

    // Process blocks — same as text
    this.container.querySelectorAll('.process-block__steps').forEach(processBlock => {
      const block = processBlock.closest('.block') as HTMLElement | null;
      if (block) {
        const observer = new IntersectionObserver(([entry]) => {
          if (entry?.isIntersecting) {
            setTimeout(() => this.markBlockComplete(block), 2000);
            observer.disconnect();
          }
        }, { threshold: 0.3 });
        observer.observe(block);
      }
    });

    // Progress tracker blocks — auto-complete
    this.container.querySelectorAll('.block').forEach(block => {
      const el = block as HTMLElement;
      if (el.querySelector('.progress-bar') && !el.querySelector('.text-block')) {
        this.markBlockComplete(el);
      }
    });

    // Sorting activity check buttons
    this.container.querySelectorAll('[data-sorting]').forEach(btn => {
      btn.addEventListener('click', (e) => this.handleSortingCheck(e));
    });

    // Scenario option buttons
    this.container.querySelectorAll('.scenario-option').forEach(btn => {
      btn.addEventListener('click', (e) => this.handleScenarioSelect(e));
    });

    // Drag and drop for sorting
    this.setupDragAndDrop();
  }

  private setupDragAndDrop(): void {
    if (!this.container) return;

    this.container.querySelectorAll('.sorting-item').forEach(item => {
      item.addEventListener('dragstart', (e) => {
        const ev = e as DragEvent;
        ev.dataTransfer?.setData('text/plain', (item as HTMLElement).dataset.label ?? '');
      });
    });

    this.container.querySelectorAll('.sorting-zone').forEach(zone => {
      zone.addEventListener('dragover', (e) => { e.preventDefault(); zone.classList.add('drag-over'); });
      zone.addEventListener('dragleave', () => { zone.classList.remove('drag-over'); });
      zone.addEventListener('drop', (e) => {
        e.preventDefault();
        zone.classList.remove('drag-over');
        const ev = e as DragEvent;
        const label = ev.dataTransfer?.getData('text/plain');
        if (!label) return;
        const item = this.container?.querySelector(`.sorting-item[data-label="${label}"]`);
        if (item) zone.appendChild(item);
      });
    });

    // Allow dragging back to pool
    this.container.querySelectorAll('.sorting-pool').forEach(pool => {
      pool.addEventListener('dragover', (e) => e.preventDefault());
      pool.addEventListener('drop', (e) => {
        e.preventDefault();
        const ev = e as DragEvent;
        const label = ev.dataTransfer?.getData('text/plain');
        if (!label) return;
        const item = this.container?.querySelector(`.sorting-item[data-label="${label}"]`);
        if (item) pool.appendChild(item);
      });
    });
  }

  private handleSortingCheck(e: Event): void {
    const btn = e.currentTarget as HTMLElement;
    const uid = btn.dataset.sorting ?? '';
    const lessonId = btn.dataset.lesson ?? '';
    const blockIndex = parseInt(btn.dataset.block ?? '0', 10);

    const zonesContainer = this.container?.querySelector(`#${uid}-zones`);
    if (!zonesContainer) return;

    // Collect user answers from zones
    const userAnswers = new Map<string, string>();
    zonesContainer.querySelectorAll('.sorting-zone').forEach(zone => {
      const category = (zone as HTMLElement).dataset.category ?? '';
      zone.querySelectorAll('.sorting-item').forEach(item => {
        const label = (item as HTMLElement).dataset.label ?? '';
        userAnswers.set(label, category);
      });
    });

    // Get the original items from the course data
    const block = this.findBlock(lessonId, blockIndex);
    if (!block || block.type !== 'sorting-activity') return;
    const data = block.data as unknown as { items: Array<{ label: string; correctCategory: string }>; feedbackCorrect: string; feedbackIncorrect: string };

    const result = EvaluateSorting.execute(data.items, userAnswers);

    // Show feedback
    const feedbackEl = this.container?.querySelector(`#${uid}-feedback`) as HTMLElement | null;
    if (feedbackEl) {
      feedbackEl.style.display = 'block';
      feedbackEl.className = `sorting-feedback ${result.correct ? 'correct' : 'incorrect'} animate-pop`;
      feedbackEl.textContent = result.correct ? data.feedbackCorrect : data.feedbackIncorrect;
    }

    // Highlight items
    zonesContainer.querySelectorAll('.sorting-item').forEach(item => {
      const el = item as HTMLElement;
      const label = el.dataset.label ?? '';
      const correct = el.dataset.correct ?? '';
      const category = userAnswers.get(label);
      el.classList.remove('correct', 'incorrect');
      el.classList.add(category === correct ? 'correct' : 'incorrect');
    });

    if (result.correct) {
      this.completeAndSave(lessonId, blockIndex);
    }
  }

  private handleScenarioSelect(e: Event): void {
    const btn = e.currentTarget as HTMLElement;
    const uid = btn.dataset.scenario ?? '';
    const optionId = btn.dataset.option ?? '';
    const lessonId = btn.dataset.lesson ?? '';
    const blockIndex = parseInt(btn.dataset.block ?? '0', 10);

    const block = this.findBlock(lessonId, blockIndex);
    if (!block || block.type !== 'scenario') return;
    const data = block.data as unknown as { options: Array<{ id: string; text: string; isCorrect: boolean; feedback: string }> };

    const result = EvaluateScenario.execute(data.options, optionId);

    // Highlight selected option
    const optionsContainer = this.container?.querySelector(`#${uid}-options`);
    optionsContainer?.querySelectorAll('.scenario-option').forEach(opt => {
      opt.classList.remove('selected', 'correct', 'incorrect');
      const el = opt as HTMLElement;
      if (el.dataset.option === optionId) {
        el.classList.add('selected', result.isCorrect ? 'correct' : 'incorrect');
      }
    });

    // Show feedback
    const feedbackEl = this.container?.querySelector(`#${uid}-feedback`) as HTMLElement | null;
    if (feedbackEl) {
      feedbackEl.style.display = 'block';
      feedbackEl.className = `scenario-feedback ${result.isCorrect ? 'correct' : 'incorrect'} animate-pop`;
      feedbackEl.textContent = result.feedback;
    }

    this.completeAndSave(lessonId, blockIndex);
  }

  // ─── Helpers ──────────────────────────────────────────────────────

  private findBlock(lessonId: string, blockIndex: number): Block | null {
    for (const mod of this.course.modules) {
      for (const lesson of mod.lessons) {
        if (lesson.id === lessonId && blockIndex < lesson.blocks.length) {
          return lesson.blocks[blockIndex] ?? null;
        }
      }
    }
    return null;
  }

  private markBlockComplete(blockEl: HTMLElement): void {
    if (blockEl.dataset.completed === 'true') return;
    const lessonId = blockEl.dataset.lesson;
    const blockIndex = blockEl.dataset.block;
    if (!lessonId || blockIndex === undefined) return;
    this.completeAndSave(lessonId, parseInt(blockIndex, 10));
  }

  private completeAndSave(lessonId: string, blockIndex: number): void {
    if (this.tracker.isBlockComplete(lessonId, blockIndex)) return;

    this.tracker.completeBlock(lessonId, blockIndex);
    this.storage.save(this.tracker.toJSON());

    // Update SCORM
    const pct = this.tracker.getCompletionPercentage();
    this.scorm.setScore(Math.round(pct));
    if (pct >= 100) {
      this.scorm.setStatus('completed');
    } else {
      this.scorm.setStatus('incomplete');
    }
    this.scorm.commit();

    // Re-render progress bar and unlock new lessons
    this.render();
  }
}
