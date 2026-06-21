import { createMoleculeScene } from './molecule-scene.js';

document.addEventListener("DOMContentLoaded", () => {
  const sceneController = createMoleculeScene('canvas-container', 'webgl-fallback');
  
  if (!sceneController) {
    console.warn("Visualizador 3D não pôde ser inicializado.");
    return;
  }

  const ariaStatus = document.getElementById("aria-status");
  const descriptionText = document.getElementById("scene-description");

  const viewpoints = {
    front: {
      pos: [0, 0, 12],
      aria: "Visão frontal selecionada. Mostra o alinhamento horizontal dos reagentes e produtos de forma plana.",
      desc: "<strong>Visão Frontal:</strong> Observamos os reagentes à esquerda (Triglicerídeo em verde) e à direita os produtos (Glicerol em laranja e as cadeias lineares de Sabão em azul). Os três mols de NaOH flutuam na zona intermediária."
    },
    side: {
      pos: [12, 0, 0],
      aria: "Visão lateral selecionada. Mostra a profundidade das cadeias hidrofóbicas dos ácidos graxos.",
      desc: "<strong>Visão Lateral:</strong> Foco no alinhamento das cadeias de carbono e hidrogênio. Notamos a espessura tridimensional das três caudas hidrofóbicas e as posições aproximadas dos íons de Sódio."
    },
    top: {
      pos: [0, 12, 0],
      aria: "Visão superior selecionada. Mostra o plano transversal de ataque químico dos reagentes.",
      desc: "<strong>Visão Superior:</strong> Uma perspectiva de cima para baixo revelando a separação espacial entre os reagentes e o ataque didático das carbonilas pelo hidróxido nas três posições verticais."
    },
    persp: {
      pos: [8, 6, 9],
      aria: "Visão de perspectiva tridimensional selecionada. Permite explorar a profundidade real do modelo.",
      desc: "<strong>Visão de Perspectiva:</strong> Exibe a profundidade espacial completa das cadeias lipídicas de sabão em azul e a estrutura tridimensional complexa do óleo vegetal original à esquerda."
    }
  };

  function updateView(key) {
    const view = viewpoints[key];
    if (!view) return;

    // Transition camera in 3D
    sceneController.setView(view.pos[0], view.pos[1], view.pos[2]);

    // Accessibility updates
    if (ariaStatus) ariaStatus.textContent = view.aria;
    if (descriptionText) descriptionText.innerHTML = view.desc;
  }

  // Hook buttons
  document.getElementById("btn-view-front")?.addEventListener("click", () => updateView("front"));
  document.getElementById("btn-view-side")?.addEventListener("click", () => updateView("side"));
  document.getElementById("btn-view-top")?.addEventListener("click", () => updateView("top"));
  document.getElementById("btn-view-persp")?.addEventListener("click", () => updateView("persp"));
  
  document.getElementById("btn-reset")?.addEventListener("click", () => {
    sceneController.reset();
    if (ariaStatus) ariaStatus.textContent = "Câmera resetada para a perspectiva padrão.";
    if (descriptionText) {
      descriptionText.innerHTML = "<strong>Visão de Perspectiva:</strong> Exibe a profundidade espacial completa das cadeias lipídicas de sabão em azul e a estrutura tridimensional complexa do óleo vegetal original à esquerda.";
    }
  });

  // Keyboard accessibility controls for rotation and zoom
  const container = document.getElementById("canvas-container");
  if (container) {
    container.addEventListener("keydown", (e) => {
      let moved = false;
      let actionText = "";

      if (e.key === "ArrowLeft") {
        sceneController.rotate(-0.08, 0);
        moved = true;
        actionText = "Girou a câmera para a esquerda";
      } else if (e.key === "ArrowRight") {
        sceneController.rotate(0.08, 0);
        moved = true;
        actionText = "Girou a câmera para a direita";
      } else if (e.key === "ArrowUp") {
        sceneController.rotate(0, -0.05);
        moved = true;
        actionText = "Inclinou a câmera para cima";
      } else if (e.key === "ArrowDown") {
        sceneController.rotate(0, 0.05);
        moved = true;
        actionText = "Inclinou a câmera para baixo";
      } else if (e.key === "+" || e.key === "=") {
        sceneController.zoom(-0.5);
        moved = true;
        actionText = "Aproximou o zoom";
      } else if (e.key === "-") {
        sceneController.zoom(0.5);
        moved = true;
        actionText = "Afastou o zoom";
      }

      if (moved) {
        e.preventDefault();
        const angles = sceneController.getCameraAngles();
        if (ariaStatus) {
          ariaStatus.textContent = `${actionText}. Ângulos atuais - Giro horizontal: ${angles.theta} graus, Inclinação vertical: ${angles.phi} graus, Distância da câmera: ${angles.zoom} unidades.`;
        }
      }
    });

    container.addEventListener("focus", () => {
      if (ariaStatus) {
        ariaStatus.textContent = "Visualizador 3D focado. Use as setas do teclado para rotacionar a câmera e as teclas mais (+) e menos (-) para ajustar o zoom.";
      }
    });
  }
});
