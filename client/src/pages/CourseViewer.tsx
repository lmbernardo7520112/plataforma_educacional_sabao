// ============================================================================
// EcoSabon — Curso Interativo | React CourseViewer Component (Nível 4)
// ============================================================================
// Wrapper React que carrega o VanillaRenderer dentro de um componente React.
// Permite embutir o curso na plataforma EcoSabon via rota /curso.
//
// RF: RF-CUR-007 (integrado na plataforma React)
// ============================================================================

import { useEffect, useRef } from 'react';
import { ecosabon } from '@curso/content/index';
import { VanillaRenderer } from '@curso/presentation/VanillaRenderer';
import { LocalStorageAdapter } from '@curso/infrastructure/adapters/LocalStorageAdapter';
import { NullScormAdapter } from '@curso/infrastructure/adapters/NullScormAdapter';

// Import CSS — Design System "Dark Science"
import '@curso/presentation/styles/design-tokens.css';
import '@curso/presentation/styles/layout.css';
import '@curso/presentation/styles/components.css';
import '@curso/presentation/styles/animations.css';

/**
 * React component that wraps the VanillaRenderer for embedding
 * within the EcoSabon React app.
 *
 * When running inside the platform (Nível 4), SCORM is not used
 * since progress can be synced via the existing JWT + API.
 */
export default function CourseViewer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<VanillaRenderer | null>(null);

  useEffect(() => {
    if (!containerRef.current || rendererRef.current) return;

    const storage = new LocalStorageAdapter();
    const scorm = new NullScormAdapter(); // No SCORM when embedded in React app

    const renderer = new VanillaRenderer(ecosabon, storage, scorm);
    renderer.mount(containerRef.current);
    rendererRef.current = renderer;
  }, []);

  return (
    <div
      ref={containerRef}
      id="curso-interativo-root"
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--color-bg, #0a0f1a)',
      }}
    />
  );
}
