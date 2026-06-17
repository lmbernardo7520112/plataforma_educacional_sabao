// ============================================================================
// EcoSabon — Curso Interativo | Main Entry Point (Standalone)
// ============================================================================
// Este é o ponto de entrada para o modo standalone (Nível 3).
// Inicializa os adapters e monta o renderer.
// ============================================================================

import { ecosabon } from './content/index.js';
import { VanillaRenderer } from './presentation/VanillaRenderer.js';
import { LocalStorageAdapter } from './infrastructure/adapters/LocalStorageAdapter.js';
import { ScormApiAdapter } from './infrastructure/adapters/ScormApiAdapter.js';
import { NullScormAdapter } from './infrastructure/adapters/NullScormAdapter.js';
import type { IScormPort } from './application/ports/index.js';

// ─── Bootstrap ──────────────────────────────────────────────────────

function bootstrap(): void {
  // Storage: sempre usa localStorage no standalone
  const storage = new LocalStorageAdapter();

  // SCORM: tenta conectar ao LMS; se não houver, usa NullAdapter
  let scorm: IScormPort;
  const scormAdapter = new ScormApiAdapter();
  if (scormAdapter.initialize()) {
    scorm = scormAdapter;
    console.log('[EcoSabon] SCORM 1.2 LMS detectado.');
  } else {
    scorm = new NullScormAdapter();
    console.log('[EcoSabon] Modo standalone (sem LMS).');
  }

  // Monta o renderer no container
  const container = document.getElementById('app');
  if (!container) {
    throw new Error('Elemento #app não encontrado no DOM.');
  }

  const renderer = new VanillaRenderer(ecosabon, storage, scorm);
  renderer.mount(container);

  // SCORM cleanup on page unload
  window.addEventListener('beforeunload', () => {
    scormAdapter.terminate();
  });
}

// Inicializa quando o DOM estiver pronto
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootstrap);
} else {
  bootstrap();
}
