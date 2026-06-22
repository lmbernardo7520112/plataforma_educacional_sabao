import { describe, it, expect } from 'vitest';
import { SaponificationEngine } from 'shared/domain/SaponificationEngine';

describe('SaponificationEngine (Core Domain)', () => {
  const engine = new SaponificationEngine();

  describe('calculateSaponificationValue()', () => {
    it('deve calcular corretamente a quantidade de NaOH para 1000g de óleo com margem de segurança', () => {
      const result = engine.calculateSaponificationValue(1000);
      
      // Cálculo manual: (1000 * 191 / 1000) * 0.713 = 136.18g full NaOH
      // Margem 5% de segurança: 136.18 * 0.95 = ~129.37g
      expect(result.naohGrams).toBeCloseTo(129.37, 1);
      expect(result.waterGrams).toBeCloseTo(330, 0); // 33% de 1000g
      expect(result.safetyStatus).toBe('SAFE');
    });

    it('deve lançar erro se a massa de óleo for zero ou negativa', () => {
      expect(() => engine.calculateSaponificationValue(0)).toThrow('A massa de óleo deve ser positiva.');
      expect(() => engine.calculateSaponificationValue(-500)).toThrow('A massa de óleo deve ser positiva.');
    });
  });

  describe('validateEnergyRelease()', () => {
    it('deve retornar true se a variação térmica for de pelo menos 2 graus (reação exotérmica viva)', () => {
      expect(engine.validateEnergyRelease(25, 28)).toBe(true);
    });

    it('deve retornar false se a temperatura estabilizar ou cair (reação morta ou não iniciada)', () => {
      expect(engine.validateEnergyRelease(25, 26)).toBe(false);
      expect(engine.validateEnergyRelease(30, 25)).toBe(false);
    });

    it('deve lançar erro se os valores de temperatura forem absurdos ou negativos absolutos', () => {
      expect(() => engine.validateEnergyRelease(0, 5)).toThrow('Temperaturas inválidas.');
    });
  });

  describe('evaluatePHTolerance()', () => {
    it('deve aprovar pH seguro de sabonete artesanal (ex: pH 9.5)', () => {
      expect(engine.evaluatePHTolerance(9.5)).toBe(true);
      expect(engine.evaluatePHTolerance(10.5)).toBe(true);
      expect(engine.evaluatePHTolerance(8.0)).toBe(true);
    });

    it('deve reprovar pH perigosamente cáustico ou ácido (Falha de cura)', () => {
      expect(engine.evaluatePHTolerance(12.0)).toBe(false); // Altamente cáustico
      expect(engine.evaluatePHTolerance(7.0)).toBe(false);  // Neutro/Ácido (Falha na saponificação total)
    });

    it('deve lançar erro se o pH estiver fora da escala terrestre (0 a 14)', () => {
      expect(() => engine.evaluatePHTolerance(15)).toThrow('Escala de pH inválida.');
      expect(() => engine.evaluatePHTolerance(-2)).toThrow('Escala de pH inválida.');
    });
  });
});
