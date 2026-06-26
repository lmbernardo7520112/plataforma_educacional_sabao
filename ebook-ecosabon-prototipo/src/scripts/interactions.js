/**
 * EcoSabon — E-book Protótipo | Interactions Facade
 * Re-exports modular logic for backwards compatibility and test stability.
 */

export {
  scrollToSection,
  scrollToTop,
  initScrollObserver
} from './scroll.js';

export {
  activateModule,
  activateModuleFromHash,
  initModulePagination,
  setActiveNavItem,
  toggleSidebar,
  navigateToModule
} from './navigation.js';

export {
  toggleHotspotPanel,
  initSaponificationHotspots
} from './hotspots.js';

export {
  scrollToStation,
  initStationMap
} from './station-map.js';

export {
  toggleRevealBlock
} from './reveal.js';

export {
  evaluateChecklist
} from './checklist.js';

export {
  getMolecularStageStep,
  setMolecularStageStep,
  initMolecularStageStepper
} from './molecular-stage.js';

export {
  initPremium3DStage
} from './premium-3d-stage.js';

export {
  togglePlatformHotspotPanel,
  togglePlatformRoleCard,
  initPlatformShowcase
} from './platform-showcase.js';

