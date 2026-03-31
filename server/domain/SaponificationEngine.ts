// server/domain/SaponificationEngine.ts
// Migrated from frontend — server-side validation of stoichiometry, enthalpy, and pH.

export interface SaponificationResult {
  oilMassGrams: number;
  naohGrams: number;
  waterGrams: number;
  safetyStatus: 'SAFE' | 'DANGER_CAUSTIC' | 'DANGER_EXCESS_FAT';
}

export class SaponificationEngine {
  // SAP padrão para óleo de soja = ~191 mg KOH/g
  // Fator KOH → NaOH (40.00 / 56.11) = ~0.713
  private readonly KOH_TO_NAOH_RATIO = 0.713;
  private readonly DEFAULT_SOY_SAP_KOH = 191;

  /**
   * Calcula a estequiometria exata para produção segura de sabão,
   * com "superfatting" de 5% para segurança do aluno.
   */
  public calculateSaponificationValue(oilMassGrams: number): SaponificationResult {
    if (oilMassGrams <= 0) {
      throw new Error('A massa de óleo deve ser positiva.');
    }

    // NaOH bruto = (massa_oleo * SAP_KOH / 1000) * fat_conversao
    const naohGramsFull =
      (oilMassGrams * this.DEFAULT_SOY_SAP_KOH / 1000) * this.KOH_TO_NAOH_RATIO;

    // Superfatting obrigatório de 5% (evitar sabão cáustico)
    const superfatMargin = 0.05;
    const safeNaohGrams = naohGramsFull * (1 - superfatMargin);

    // Razão hídrica segura: Água = 33% do peso do óleo
    const waterGrams = oilMassGrams * 0.33;

    return {
      oilMassGrams,
      naohGrams: Number(safeNaohGrams.toFixed(2)),
      waterGrams: Number(waterGrams.toFixed(2)),
      safetyStatus: 'SAFE',
    };
  }

  /**
   * Valida Reação Exotérmica (Entalpia).
   * Erro se não houver variação térmica positiva mínima de 2°C.
   */
  public validateEnergyRelease(startTemp: number, currentTemp: number): boolean {
    if (startTemp <= 0 || currentTemp <= 0) {
      throw new Error('Temperaturas inválidas.');
    }

    const delta = currentTemp - startTemp;
    return delta >= 2;
  }

  /**
   * Audita o nível de alcalinidade do sabão curado.
   * Sabão seguro: pH entre 8.0 e 10.5.
   */
  public evaluatePHTolerance(ph: number): boolean {
    if (ph < 0 || ph > 14) {
      throw new Error('Escala de pH inválida.');
    }
    return ph >= 8 && ph <= 10.5;
  }
}
