/* Spike — Premium 3D Rotatable logic (spike.js) */

document.addEventListener("DOMContentLoaded", () => {
  const angles = [0, 90, 180, 270];
  const labels = {
    0: "Ângulo Ativo: 0° (Perspectiva Frontal)",
    90: "Ângulo Ativo: 90° (Perspectiva Lateral Direita)",
    180: "Ângulo Ativo: 180° (Perspectiva Traseira)",
    270: "Ângulo Ativo: 270° (Perspectiva Lateral Esquerda)"
  };

  const descriptions = {
    0: "Nesta perspectiva frontal, observamos o alinhamento plano dos reagentes: o Triglicerídeo (óleo/gordura) à esquerda e os três mols de hidróxido de sódio (NaOH) à direita, preparados para a clivagem qualitativa.",
    90: "Na perspectiva lateral direita, o Triglicerídeo rotaciona para o plano frontal enquanto a estrutura de NaOH desliza para o plano de fundo, destacando a profundidade espacial didática do Palco Molecular.",
    180: "Na perspectiva traseira, observamos a inversão espacial dos reagentes: os três mols de NaOH passam para o lado esquerdo e o Triglicerídeo se posiciona ao lado direito, mantendo as conexões e a proporção da reação intactas.",
    270: "Na perspectiva lateral esquerda, o Triglicerídeo se desloca para o fundo enquanto o NaOH assume o primeiro plano, demonstrando a relação espacial e a distribuição dos grupos funcionais sob este ângulo."
  };

  let currentIndex = 0;

  const container = document.getElementById("spike-container");
  const display = document.getElementById("angle-display");
  const description = document.getElementById("description-text");
  const btnLeft = document.getElementById("btn-rotate-left");
  const btnRight = document.getElementById("btn-rotate-right");

  if (!container || !display || !description || !btnLeft || !btnRight) {
    console.error("Spike DOM elements missing.");
    return;
  }

  function updateAngle(newIndex) {
    currentIndex = (newIndex + angles.length) % angles.length;
    const activeAngle = angles[currentIndex];

    // Update state attribute
    container.setAttribute("data-angle", activeAngle.toString());

    // Update indicators
    display.textContent = labels[activeAngle];
    description.textContent = descriptions[activeAngle];
  }

  btnLeft.addEventListener("click", () => {
    updateAngle(currentIndex - 1);
  });

  btnRight.addEventListener("click", () => {
    updateAngle(currentIndex + 1);
  });
});
