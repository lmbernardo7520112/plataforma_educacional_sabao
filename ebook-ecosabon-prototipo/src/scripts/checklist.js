/**
 * EcoSabon — E-book Protótipo | Checklist Evaluation Logic
 */

/**
 * Avalia se o checklist Go/No-Go está completo.
 * Retorna true somente se TODOS os checkboxes dentro do container estão marcados.
 * @param {string} checklistId - O ID do container do checklist.
 * @param {Document} doc - O documento DOM.
 * @returns {{ allChecked: boolean, total: number, checked: number }}
 */
export function evaluateChecklist(checklistId, doc) {
  const safeDoc = doc ?? (typeof document !== 'undefined' ? document : null);
  if (!safeDoc) return { allChecked: false, total: 0, checked: 0 };
  const container = safeDoc.getElementById(checklistId);
  if (!container) return { allChecked: false, total: 0, checked: 0 };

  const checkboxes = container.querySelectorAll('input[type="checkbox"]');
  const total = checkboxes.length;
  const checked = Array.from(checkboxes).filter((cb) => cb.checked).length;

  return {
    allChecked: total > 0 && checked === total,
    total,
    checked,
  };
}
