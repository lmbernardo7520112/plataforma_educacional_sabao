/**
 * EcoSabon — E-book Protótipo | Sequenciador Molecular 4D Qualitativo (molecular-stage.js)
 */

let currentStep = 0;
let previousStep = 0;
const TOTAL_STEPS = 8;

const STEP_DATA = [
  {
    title: "Etapa 0: Contexto e Segurança",
    content: "Bem-vindo à visualização molecular qualitativa. Aqui, observamos uma representação esquemática dos átomos e ligações durante a fabricação do sabão. Lembre-se: esta é uma ilustração didática e não uma simulação em tempo real."
  },
  {
    title: "Etapa 1: Triglicerídeo como Reagente",
    content: "O óleo vegetal ou gordura animal é formado por triglicerídeos. Cada molécula possui uma estrutura de glicerol conectada a três cadeias de ácidos graxos."
  },
  {
    title: "Etapa 2: Presença de NaOH",
    content: "Para que a reação ocorra, adicionamos hidróxido de sódio (NaOH) dissolvido em água, gerando os íons sódio (Na⁺) e hidróxido (OH⁻)."
  },
  {
    title: "Etapa 3: Proporção didática 1:3",
    content: "Estequiometria: Note que 1 molécula de triglicerídeo necessita de exatamente 3 íons hidróxido (OH⁻) para clivar todas as suas três ligações éster."
  },
  {
    title: "Etapa 4: Clivagem qualitativa das ligações éster",
    content: "O íon hidróxido ataca a carbonila do éster. As ligações entre o oxigênio do glicerol e o carbono da carbonila são clivadas (quebradas)."
  },
  {
    title: "Etapa 5: Formação de sabão",
    content: "Os grupos carboxilatos liberados unem-se aos íons sódio (Na⁺), formando os sais de ácidos graxos: as moléculas de sabão."
  },
  {
    title: "Etapa 6: Formação de glicerol",
    content: "O backbone do glicerol liga-se aos hidrogênios remanescentes, formando a molécula de glicerol (glicerina), um subproduto umectante valioso."
  },
  {
    title: "Etapa 7: Química Verde e reaproveitamento",
    content: "Química Verde: Esta transformação aproveita todos os átomos dos reagentes originais, transformando o óleo residual em sabão biodegradável e glicerina purificada."
  },
  {
    title: "Etapa 8: Síntese conceitual",
    content: "Revisão Final da Reação: 1 Triglicerídeo (Óleo) + 3 NaOH (Base) → 3 Sais de Ácidos Graxos (Sabão) + 1 Glicerol (Glicerina). A matéria se conserva e se transforma."
  }
];

export function getMolecularStageStep() {
  return currentStep;
}

export function setMolecularStageStep(step, doc = document) {
  if (step < 0 || step > TOTAL_STEPS) {
    return false;
  }
  currentStep = step;
  updateUI(doc);
  return true;
}

function updateUI(doc = document) {
  const container = doc.getElementById("palco-molecular-secao");
  if (!container) return;

  // Toggle step classes
  container.classList.remove(`step-${previousStep}`);
  container.classList.add(`step-${currentStep}`);
  previousStep = currentStep;

  // Update step indicators
  const titleEl = doc.getElementById("molecular-stage-step-title");
  const contentEl = doc.getElementById("molecular-stage-step-content");
  const indicatorEl = doc.getElementById("molecular-stage-step-indicator");

  if (titleEl) titleEl.textContent = STEP_DATA[currentStep].title;
  if (contentEl) contentEl.textContent = STEP_DATA[currentStep].content;
  if (indicatorEl) indicatorEl.textContent = `Etapa ${currentStep} de ${TOTAL_STEPS}`;

  // Update buttons disabled state
  const prevBtn = doc.getElementById("molecular-stage-prev");
  const nextBtn = doc.getElementById("molecular-stage-next");

  if (prevBtn) prevBtn.disabled = currentStep === 0;
  if (nextBtn) nextBtn.disabled = currentStep === TOTAL_STEPS;
}

export function initMolecularStageStepper(doc = document) {
  const prevBtn = doc.getElementById("molecular-stage-prev");
  const nextBtn = doc.getElementById("molecular-stage-next");
  const container = doc.getElementById("palco-molecular-secao");

  if (!container) return false;

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      if (currentStep > 0) setMolecularStageStep(currentStep - 1, doc);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      if (currentStep < TOTAL_STEPS) setMolecularStageStep(currentStep + 1, doc);
    });
  }

  // Keyboard navigation on the section container
  container.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") {
      if (currentStep < TOTAL_STEPS) {
        setMolecularStageStep(currentStep + 1, doc);
        e.preventDefault();
      }
    } else if (e.key === "ArrowLeft") {
      if (currentStep > 0) {
        setMolecularStageStep(currentStep - 1, doc);
        e.preventDefault();
      }
    }
  });

  // Reset steps to 0 on init
  previousStep = 0;
  setMolecularStageStep(0, doc);
  return true;
}
