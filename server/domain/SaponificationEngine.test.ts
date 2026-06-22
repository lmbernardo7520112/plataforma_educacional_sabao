// server/domain/SaponificationEngine.test.ts

import { describe, it, expect } from 'vitest';
import { SaponificationEngine } from 'shared/domain/SaponificationEngine.js';

describe('SaponificationEngine (Server Domain)', () => {
  const engine = new SaponificationEngine();

  describe('calculateSaponificationValue()', () => {
    it('should calculate NaOH correctly for 1000g oil with safety margin', () => {
      const result = engine.calculateSaponificationValue(1000);

      // Manual: (1000 * 191 / 1000) * 0.713 = 136.18g full NaOH
      // 5% safety margin: 136.18 * 0.95 = ~129.37g
      expect(result.naohGrams).toBeCloseTo(129.37, 1);
      expect(result.waterGrams).toBeCloseTo(330, 0);
      expect(result.safetyStatus).toBe('SAFE');
    });

    it('should throw on zero or negative oil mass', () => {
      expect(() => engine.calculateSaponificationValue(0)).toThrow(
        'A massa de óleo deve ser positiva.'
      );
      expect(() => engine.calculateSaponificationValue(-500)).toThrow(
        'A massa de óleo deve ser positiva.'
      );
    });
  });

  describe('validateEnergyRelease()', () => {
    it('should return true for exothermic reaction (delta >= 2°C)', () => {
      expect(engine.validateEnergyRelease(25, 28)).toBe(true);
    });

    it('should return false for insufficient temperature rise', () => {
      expect(engine.validateEnergyRelease(25, 26)).toBe(false);
      expect(engine.validateEnergyRelease(30, 25)).toBe(false);
    });

    it('should throw on invalid temperatures', () => {
      expect(() => engine.validateEnergyRelease(0, 5)).toThrow('Temperaturas inválidas.');
    });
  });

  describe('evaluatePHTolerance()', () => {
    it('should approve safe pH range (8.0 to 10.5)', () => {
      expect(engine.evaluatePHTolerance(9.5)).toBe(true);
      expect(engine.evaluatePHTolerance(10.5)).toBe(true);
      expect(engine.evaluatePHTolerance(8.0)).toBe(true);
    });

    it('should reject dangerous pH levels', () => {
      expect(engine.evaluatePHTolerance(12.0)).toBe(false);
      expect(engine.evaluatePHTolerance(7.0)).toBe(false);
    });

    it('should throw on pH outside valid scale', () => {
      expect(() => engine.evaluatePHTolerance(15)).toThrow('Escala de pH inválida.');
      expect(() => engine.evaluatePHTolerance(-2)).toThrow('Escala de pH inválida.');
    });
  });
});
