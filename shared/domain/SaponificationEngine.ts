// shared/domain/SaponificationEngine.ts
// ============================================================================
// EcoSabon — Motor de Saponificação (implementação canônica compartilhada)
// ============================================================================
// Regras estequiométricas, termodinâmicas e de qualidade para produção segura
// de sabão em contexto escolar. Consumido por server e client.
// ============================================================================

export interface SaponificationResult {
  oilMassGrams: number;
  naohGrams: number;
  waterGrams: number;
  safetyStatus: 'SAFE' | 'DANGER_CAUSTIC' | 'DANGER_EXCESS_FAT';
}

export class SaponificationEngine {
  // O Índice de Saponificação (SAP) padrão para óleo de soja (mais comum no Brasil escolar) é ~191 mg KOH/g
  // Fator de conversão de KOH para NaOH (Massa Molar NaOH 40.00 / Massa Molar KOH 56.11) = ~0.713
  private readonly KOH_TO_NAOH_RATIO = 0.713;
  private readonly DEFAULT_SOY_SAP_KOH = 191;

  /**
   * Calcula a estequiometria exata para a produção segura de sabão, garantindo
   * um "superfatting" (excesso de gordura) de segurança para o aluno.
   */
  public calculateSaponificationValue(oilMassGrams: number): SaponificationResult {
    if (oilMassGrams <= 0) {
      throw new Error('A massa de óleo deve ser positiva.');
    }

    // NaOH bruto = (massa_oleo * SAP_KOH / 1000) * fat_conversao
    const naohGramsFull = (oilMassGrams * this.DEFAULT_SOY_SAP_KOH / 1000) * this.KOH_TO_NAOH_RATIO;

    // Superfatting obrigatório de 5% p/ segurança (evitar sabão cáustico)
    const superfatMargin = 0.05;
    const safeNaohGrams = naohGramsFull * (1 - superfatMargin);

    // Razão hídrica segura: Água = 33% do peso do óleo (concentração da soda ~28%)
    const waterGrams = oilMassGrams * 0.33;

    return {
      oilMassGrams,
      naohGrams: Number(safeNaohGrams.toFixed(2)),
      waterGrams: Number(waterGrams.toFixed(2)),
      safetyStatus: 'SAFE',
    };
  }

  /**
   * Valida a Reação Exotérmica (Entalpia).
   * Em pequenas amostras laboratoriais escolares, espera-se aumento mínimo de 2°C a 5°C.
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
   * Sabão curado seguro opera no range entre 8.0 e 10.5.
   */
  public evaluatePHTolerance(ph: number): boolean {
    if (ph < 0 || ph > 14) {
      throw new Error('Escala de pH inválida.');
    }
    return ph >= 8 && ph <= 10.5;
  }
}
