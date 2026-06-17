// ============================================================================
// EcoSabon — Curso Interativo | TDD RED: LocalStorageAdapter Tests
// ============================================================================
// RF: RF-CUR-006 (persistência de progresso)
// ============================================================================

import { describe, it, expect, beforeEach } from 'vitest';
import { LocalStorageAdapter } from '../../src/infrastructure/adapters/LocalStorageAdapter.js';
import type { ProgressState } from '../../src/domain/models/index.js';

const mockProgress: ProgressState = {
  courseId: 'test-course',
  currentModuleIndex: 1,
  currentLessonIndex: 2,
  lessons: {
    'lesson-1': {
      lessonId: 'lesson-1',
      completed: true,
      completedAt: '2026-01-01T00:00:00Z',
      blocks: [{ blockIndex: 0, completed: true, completedAt: '2026-01-01T00:00:00Z' }],
    },
  },
  startedAt: '2026-01-01T00:00:00Z',
  lastAccessedAt: '2026-06-16T00:00:00Z',
};

describe('LocalStorageAdapter (Infrastructure)', () => {
  let adapter: LocalStorageAdapter;

  beforeEach(() => {
    localStorage.clear();
    adapter = new LocalStorageAdapter();
  });

  it('should return null when no progress is saved', () => {
    expect(adapter.load('nonexistent')).toBeNull();
  });

  it('should save and load progress correctly', () => {
    adapter.save(mockProgress);
    const loaded = adapter.load('test-course');
    expect(loaded).toEqual(mockProgress);
  });

  it('should clear saved progress', () => {
    adapter.save(mockProgress);
    adapter.clear('test-course');
    expect(adapter.load('test-course')).toBeNull();
  });

  it('should handle corrupted localStorage data gracefully', () => {
    localStorage.setItem('ecosabon-curso-test-course', 'not-valid-json{{{');
    expect(adapter.load('test-course')).toBeNull();
  });

  it('should isolate courses by ID', () => {
    adapter.save(mockProgress);
    const otherProgress: ProgressState = { ...mockProgress, courseId: 'other-course' };
    adapter.save(otherProgress);

    expect(adapter.load('test-course')).toEqual(mockProgress);
    expect(adapter.load('other-course')).toEqual(otherProgress);
  });
});
