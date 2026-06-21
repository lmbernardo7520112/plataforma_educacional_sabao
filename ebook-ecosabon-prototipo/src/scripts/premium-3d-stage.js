import * as THREE from 'three';

export function initPremium3DStage(doc = document, win = window) {
  const container = doc.getElementById('premium-3d-canvas-container');
  const fallback = doc.getElementById('premium-3d-webgl-fallback');
  const ariaStatus = doc.getElementById('premium-3d-aria-status');
  const descriptionText = doc.getElementById('premium-3d-description');

  if (!container) return null;

  // WebGL Availability Check
  try {
    const canvasTest = doc.createElement('canvas');
    const webglSupport = !!(win.WebGLRenderingContext && (canvasTest.getContext('webgl') || canvasTest.getContext('experimental-webgl')));
    if (!webglSupport) {
      if (fallback) fallback.style.display = 'block';
      return null;
    }
  } catch (e) {
    if (fallback) fallback.style.display = 'block';
    return null;
  }

  // Check prefers-reduced-motion
  const mediaQuery = win.matchMedia && win.matchMedia('(prefers-reduced-motion: reduce)');
  const prefersReduced = mediaQuery ? mediaQuery.matches : false;

  // Scene Setup
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x0a0e17);

  // Camera Setup
  const initialWidth = container.clientWidth || 800;
  const initialHeight = container.clientHeight || 400;
  const camera = new THREE.PerspectiveCamera(45, initialWidth / initialHeight, 0.1, 100);
  const defaultTarget = new THREE.Vector3(0, 0, 0);
  let targetCameraPos = new THREE.Vector3(7, 5, 8);
  camera.position.copy(targetCameraPos);

  // Renderer Setup
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(initialWidth, initialHeight);
  renderer.setPixelRatio(Math.min(win.devicePixelRatio || 1, 2));
  container.appendChild(renderer.domElement);

  // Lights
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
  scene.add(ambientLight);

  const dirLight1 = new THREE.DirectionalLight(0xffffff, 0.8);
  dirLight1.position.set(5, 10, 7);
  scene.add(dirLight1);

  const dirLight2 = new THREE.DirectionalLight(0xa0c0ff, 0.4);
  dirLight2.position.set(-5, -5, -5);
  scene.add(dirLight2);

  // Procedural Materials
  const materials = {
    triglyceride: new THREE.MeshStandardMaterial({ color: 0x48bb78, roughness: 0.3, metalness: 0.1 }),
    naohRed: new THREE.MeshStandardMaterial({ color: 0xe53e3e, roughness: 0.2 }),
    naohGray: new THREE.MeshStandardMaterial({ color: 0xa0aec0, roughness: 0.5 }),
    soap: new THREE.MeshStandardMaterial({ color: 0x3182ce, roughness: 0.3, metalness: 0.1 }),
    glycerol: new THREE.MeshStandardMaterial({ color: 0xdd6b20, roughness: 0.3 }),
    bond: new THREE.MeshStandardMaterial({ color: 0x4a5568, roughness: 0.8 })
  };

  // Helper to create spheres
  function createAtom(x, y, z, radius, material) {
    const geo = new THREE.SphereGeometry(radius, 16, 16);
    const mesh = new THREE.Mesh(geo, material);
    mesh.position.set(x, y, z);
    return mesh;
  }

  // Helper to create cylindrical bonds
  function createBond(start, end, radius, material) {
    const distance = start.distanceTo(end);
    const geometry = new THREE.CylinderGeometry(radius, radius, distance, 8);
    const cylinder = new THREE.Mesh(geometry, material);
    
    const position = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
    cylinder.position.copy(position);
    
    const direction = new THREE.Vector3().subVectors(end, start).normalize();
    const up = new THREE.Vector3(0, 1, 0);
    const quaternion = new THREE.Quaternion().setFromUnitVectors(up, direction);
    cylinder.setRotationFromQuaternion(quaternion);
    
    return cylinder;
  }

  // 1. Triglyceride Molecule (Left Zone)
  const trigGroup = new THREE.Group();
  trigGroup.position.set(-3.5, 0, 0);
  
  const b1 = new THREE.Vector3(0, 1.2, 0);
  const b2 = new THREE.Vector3(0, 0, 0);
  const b3 = new THREE.Vector3(0, -1.2, 0);
  
  trigGroup.add(createAtom(b1.x, b1.y, b1.z, 0.4, materials.triglyceride));
  trigGroup.add(createAtom(b2.x, b2.y, b2.z, 0.4, materials.triglyceride));
  trigGroup.add(createAtom(b3.x, b3.y, b3.z, 0.4, materials.triglyceride));
  trigGroup.add(createBond(b1, b2, 0.1, materials.bond));
  trigGroup.add(createBond(b2, b3, 0.1, materials.bond));

  const chainExt = [
    { start: b1, dir: new THREE.Vector3(-1, 0.5, 0.5), len: 4 },
    { start: b2, dir: new THREE.Vector3(-1.2, 0, -0.3), len: 4 },
    { start: b3, dir: new THREE.Vector3(-1, -0.5, 0.4), len: 4 }
  ];

  chainExt.forEach(chain => {
    let currentPoint = chain.start.clone();
    for (let i = 0; i < chain.len; i++) {
      const nextPoint = currentPoint.clone().add(chain.dir.clone().multiplyScalar(0.9));
      nextPoint.y += (i % 2 === 0 ? 0.25 : -0.25);
      trigGroup.add(createAtom(nextPoint.x, nextPoint.y, nextPoint.z, 0.35, materials.triglyceride));
      trigGroup.add(createBond(currentPoint, nextPoint, 0.08, materials.bond));
      currentPoint = nextPoint;
    }
  });
  scene.add(trigGroup);

  // 2. NaOH Molecules
  const naohGroup = new THREE.Group();
  naohGroup.position.set(0, 0, 0);

  const naohPositions = [
    { o: new THREE.Vector3(0.5, 2, 0.5), na: new THREE.Vector3(1.2, 1.8, 1) },
    { o: new THREE.Vector3(-0.2, 0, 1.5), na: new THREE.Vector3(0.4, -0.2, 2.2) },
    { o: new THREE.Vector3(0.2, -1.8, -0.5), na: new THREE.Vector3(0.9, -2.1, 0.1) }
  ];

  naohPositions.forEach(pos => {
    naohGroup.add(createAtom(pos.o.x, pos.o.y, pos.o.z, 0.35, materials.naohRed));
    naohGroup.add(createAtom(pos.na.x, pos.na.y, pos.na.z, 0.28, materials.naohGray));
    naohGroup.add(createBond(pos.o, pos.na, 0.06, materials.bond));
  });
  scene.add(naohGroup);

  // 3. Products (Right Zone: Glycerol and 3 Soap molecules)
  const productsGroup = new THREE.Group();
  productsGroup.position.set(3.5, 0, 0);

  const g1 = new THREE.Vector3(0, 1.0, -1);
  const g2 = new THREE.Vector3(0, 0, -1);
  const g3 = new THREE.Vector3(0, -1.0, -1);
  
  productsGroup.add(createAtom(g1.x, g1.y, g1.z, 0.38, materials.glycerol));
  productsGroup.add(createAtom(g2.x, g2.y, g2.z, 0.38, materials.glycerol));
  productsGroup.add(createAtom(g3.x, g3.y, g3.z, 0.38, materials.glycerol));
  productsGroup.add(createBond(g1, g2, 0.09, materials.bond));
  productsGroup.add(createBond(g2, g3, 0.09, materials.bond));

  const soapChains = [
    { start: new THREE.Vector3(1, 1.2, 0.5), dir: new THREE.Vector3(1, 0.2, 0.2), len: 4 },
    { start: new THREE.Vector3(1, 0, 0.8), dir: new THREE.Vector3(1, -0.1, -0.2), len: 4 },
    { start: new THREE.Vector3(1, -1.2, 0.4), dir: new THREE.Vector3(1, -0.3, 0.1), len: 4 }
  ];

  soapChains.forEach(chain => {
    let currentPoint = chain.start.clone();
    productsGroup.add(createAtom(currentPoint.x, currentPoint.y, currentPoint.z, 0.36, materials.soap));
    for (let i = 0; i < chain.len; i++) {
      const nextPoint = currentPoint.clone().add(chain.dir.clone().multiplyScalar(0.85));
      nextPoint.y += (i % 2 === 0 ? 0.2 : -0.2);
      productsGroup.add(createAtom(nextPoint.x, nextPoint.y, nextPoint.z, 0.32, materials.soap));
      productsGroup.add(createBond(currentPoint, nextPoint, 0.07, materials.bond));
      currentPoint = nextPoint;
    }
  });
  scene.add(productsGroup);

  // Mouse Drag rotation
  let isDragging = false;
  let previousMousePosition = { x: 0, y: 0 };
  let theta = Math.atan2(camera.position.x, camera.position.z);
  let phi = Math.acos(Math.max(-0.99, Math.min(0.99, camera.position.y / camera.position.length())));
  let radius = camera.position.length();

  const domEl = renderer.domElement;
  
  domEl.addEventListener('mousedown', (e) => {
    isDragging = true;
    previousMousePosition = { x: e.clientX, y: e.clientY };
  });

  win.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    
    const deltaX = e.clientX - previousMousePosition.x;
    const deltaY = e.clientY - previousMousePosition.y;

    theta -= deltaX * 0.007;
    phi -= deltaY * 0.007;
    phi = Math.max(0.1, Math.min(Math.PI - 0.1, phi));

    updateCameraPositions();
    previousMousePosition = { x: e.clientX, y: e.clientY };
  });

  win.addEventListener('mouseup', () => {
    isDragging = false;
  });

  domEl.addEventListener('wheel', (e) => {
    radius += e.deltaY * 0.01;
    radius = Math.max(5, Math.min(25, radius));
    updateCameraPositions();
    e.preventDefault();
  }, { passive: false });

  function updateCameraPositions() {
    targetCameraPos.x = radius * Math.sin(phi) * Math.sin(theta);
    targetCameraPos.y = radius * Math.cos(phi);
    targetCameraPos.z = radius * Math.sin(phi) * Math.cos(theta);
  }

  function setView(x, y, z) {
    targetCameraPos.set(x, y, z);
    radius = targetCameraPos.length();
    theta = Math.atan2(targetCameraPos.x, targetCameraPos.z);
    phi = Math.acos(Math.max(-0.99, Math.min(0.99, targetCameraPos.y / radius)));
  }

  // Camera animation loop
  let animationFrameId;
  function animate() {
    animationFrameId = requestAnimationFrame(animate);

    if (prefersReduced) {
      camera.position.copy(targetCameraPos);
    } else {
      camera.position.lerp(targetCameraPos, 0.08);
    }
    camera.lookAt(defaultTarget);
    renderer.render(scene, camera);
  }
  animate();

  // Resize handling (Window Resize and Element Resize via ResizeObserver)
  let resizeObserver = null;
  const resizeHandler = () => {
    const width = container.clientWidth;
    const height = container.clientHeight;
    if (width > 0 && height > 0) {
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    }
  };

  if (win.ResizeObserver) {
    resizeObserver = new win.ResizeObserver((entries) => {
      for (let entry of entries) {
        const width = container.clientWidth;
        const height = container.clientHeight;
        if (width > 0 && height > 0) {
          camera.aspect = width / height;
          camera.updateProjectionMatrix();
          renderer.setSize(width, height);
        }
      }
    });
    resizeObserver.observe(container);
  }
  win.addEventListener('resize', resizeHandler);

  // Expose controls controller
  const sceneController = {
    setView,
    reset: () => setView(7, 5, 8),
    rotate: (deltaTheta, deltaPhi) => {
      theta += deltaTheta;
      phi = Math.max(0.1, Math.min(Math.PI - 0.1, phi + deltaPhi));
      updateCameraPositions();
    },
    zoom: (deltaRadius) => {
      radius = Math.max(5, Math.min(25, radius + deltaRadius));
      updateCameraPositions();
    },
    getCameraAngles: () => {
      return {
        theta: Math.round(theta * 180 / Math.PI),
        phi: Math.round(phi * 180 / Math.PI),
        zoom: Math.round(radius)
      };
    },
    destroy: () => {
      cancelAnimationFrame(animationFrameId);
      win.removeEventListener('resize', resizeHandler);
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
      renderer.dispose();
      if (domEl.parentNode) {
        domEl.parentNode.removeChild(domEl);
      }
    }
  };

  // Bind Viewpoints
  const viewpoints = {
    front: {
      pos: [0, 0, 12],
      aria: "Visão frontal selecionada. Mostra o alinhamento horizontal dos reagentes e produtos de forma plana.",
      desc: "<strong>Visão Frontal:</strong> Observamos os reagentes à esquerda (Triglicerídeo em verde) e à direita os produtos (Glicerol em laranja e as três cadeias lineares de Sabão em azul). Os três mols de NaOH flutuam na zona intermediária."
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

    sceneController.setView(view.pos[0], view.pos[1], view.pos[2]);

    if (ariaStatus) ariaStatus.textContent = view.aria;
    if (descriptionText) descriptionText.innerHTML = view.desc;
  }

  doc.getElementById('premium-btn-front')?.addEventListener('click', () => updateView('front'));
  doc.getElementById('premium-btn-side')?.addEventListener('click', () => updateView('side'));
  doc.getElementById('premium-btn-top')?.addEventListener('click', () => updateView('top'));
  doc.getElementById('premium-btn-persp')?.addEventListener('click', () => updateView('persp'));
  
  doc.getElementById('premium-btn-reset')?.addEventListener('click', () => {
    sceneController.reset();
    if (ariaStatus) ariaStatus.textContent = "Câmera resetada para a perspectiva padrão.";
    if (descriptionText) {
      descriptionText.innerHTML = "<strong>Visão de Perspectiva:</strong> Exibe a profundidade espacial completa das cadeias lipídicas de sabão em azul e a estrutura tridimensional complexa do óleo vegetal original à esquerda.";
    }
  });

  // Keyboard accessibility
  container.addEventListener('keydown', (e) => {
    let moved = false;
    let actionText = "";

    if (e.key === 'ArrowLeft') {
      sceneController.rotate(-0.08, 0);
      moved = true;
      actionText = "Girou a câmera para a esquerda";
    } else if (e.key === 'ArrowRight') {
      sceneController.rotate(0.08, 0);
      moved = true;
      actionText = "Girou a câmera para a direita";
    } else if (e.key === 'ArrowUp') {
      sceneController.rotate(0, -0.05);
      moved = true;
      actionText = "Inclinou a câmera para cima";
    } else if (e.key === 'ArrowDown') {
      sceneController.rotate(0, 0.05);
      moved = true;
      actionText = "Inclinou a câmera para baixo";
    } else if (e.key === '+' || e.key === '=') {
      sceneController.zoom(-0.5);
      moved = true;
      actionText = "Aproximou o zoom";
    } else if (e.key === '-') {
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

  container.addEventListener('focus', () => {
    if (ariaStatus) {
      ariaStatus.textContent = "Visualizador 3D focado. Use as setas do teclado para rotacionar a câmera e as teclas mais (+) e menos (-) para ajustar o zoom.";
    }
  });

  return sceneController;
}
