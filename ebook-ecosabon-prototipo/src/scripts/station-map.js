/**
 * EcoSabon — E-book Protótipo | Station Map Logic
 */

import { scrollToSection } from './scroll.js';

/**
 * Rola suavemente até a estação correspondente ao ID informado.
 * @param {string} stationId - O ID da estação.
 * @param {Document} doc - O documento DOM.
 * @returns {boolean} true se a estação foi encontrada e o scroll iniciado.
 */
export function scrollToStation(stationId, doc) {
  return scrollToSection(stationId, doc);
}

/**
 * Inicializa o mapa interativo de estações.
 * @param {Document} doc - O documento DOM.
 * @returns {number} Quantidade de estações mapeadas.
 */
export function initStationMap(doc) {
  const safeDoc = doc ?? (typeof document !== 'undefined' ? document : null);
  if (!safeDoc) return 0;

  const stations = safeDoc.querySelectorAll('.classroom-diagram__station[data-station]');
  if (stations.length === 0) return 0;

  stations.forEach((node) => {
    const targetId = node.getAttribute('data-station');
    if (!targetId) return;

    node.addEventListener('click', () => {
      scrollToStation(targetId, safeDoc);
    });

    node.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        scrollToStation(targetId, safeDoc);
      }
    });
  });

  return stations.length;
}
