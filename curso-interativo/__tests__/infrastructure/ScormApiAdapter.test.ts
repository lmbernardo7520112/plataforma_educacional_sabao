// ============================================================================
// EcoSabon — Curso Interativo | TDD RED: ScormApiAdapter Tests
// ============================================================================
// RF: RF-CUR-008 (exportável como SCORM 1.2)
// ============================================================================

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ScormApiAdapter } from '../../src/infrastructure/adapters/ScormApiAdapter.js';
import { NullScormAdapter } from '../../src/infrastructure/adapters/NullScormAdapter.js';

describe('ScormApiAdapter (Infrastructure)', () => {

  beforeEach(() => {
    // Clean up any mock API
    // @ts-expect-error - Mocking global window.API for SCORM
    delete (globalThis as Record<string, unknown>).API;
  });

  it('should return false from isConnected when no SCORM API is present', () => {
    const adapter = new ScormApiAdapter();
    adapter.initialize();
    expect(adapter.isConnected()).toBe(false);
  });

  it('should connect when window.API is available', () => {
    // Simulate LMS injecting the SCORM 1.2 API
    const mockApi = {
      LMSInitialize: vi.fn().mockReturnValue('true'),
      LMSSetValue: vi.fn().mockReturnValue('true'),
      LMSCommit: vi.fn().mockReturnValue('true'),
      LMSFinish: vi.fn().mockReturnValue('true'),
      LMSGetLastError: vi.fn().mockReturnValue('0'),
    };
    (globalThis as Record<string, unknown>).API = mockApi;

    const adapter = new ScormApiAdapter();
    const result = adapter.initialize();
    expect(result).toBe(true);
    expect(adapter.isConnected()).toBe(true);
    expect(mockApi.LMSInitialize).toHaveBeenCalledWith('');
  });

  it('should call LMSSetValue when setting score', () => {
    const mockApi = {
      LMSInitialize: vi.fn().mockReturnValue('true'),
      LMSSetValue: vi.fn().mockReturnValue('true'),
      LMSCommit: vi.fn().mockReturnValue('true'),
      LMSFinish: vi.fn().mockReturnValue('true'),
      LMSGetLastError: vi.fn().mockReturnValue('0'),
    };
    (globalThis as Record<string, unknown>).API = mockApi;

    const adapter = new ScormApiAdapter();
    adapter.initialize();
    adapter.setScore(85);
    expect(mockApi.LMSSetValue).toHaveBeenCalledWith('cmi.core.score.raw', '85');
  });

  it('should call LMSSetValue when setting status', () => {
    const mockApi = {
      LMSInitialize: vi.fn().mockReturnValue('true'),
      LMSSetValue: vi.fn().mockReturnValue('true'),
      LMSCommit: vi.fn().mockReturnValue('true'),
      LMSFinish: vi.fn().mockReturnValue('true'),
      LMSGetLastError: vi.fn().mockReturnValue('0'),
    };
    (globalThis as Record<string, unknown>).API = mockApi;

    const adapter = new ScormApiAdapter();
    adapter.initialize();
    adapter.setStatus('completed');
    expect(mockApi.LMSSetValue).toHaveBeenCalledWith('cmi.core.lesson_status', 'completed');
  });
});

describe('NullScormAdapter (Strategy Pattern)', () => {

  it('should initialize without error', () => {
    const adapter = new NullScormAdapter();
    expect(adapter.initialize()).toBe(false);
  });

  it('should always return false for isConnected', () => {
    const adapter = new NullScormAdapter();
    expect(adapter.isConnected()).toBe(false);
  });

  it('should accept all method calls silently (no-op)', () => {
    const adapter = new NullScormAdapter();
    expect(() => {
      adapter.setScore(100);
      adapter.setStatus('completed');
      adapter.commit();
      adapter.terminate();
    }).not.toThrow();
  });
});
