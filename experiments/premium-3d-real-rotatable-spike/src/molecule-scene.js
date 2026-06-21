import * as THREE from 'three';

export function createMoleculeScene(containerId, fallbackId) {
  const container = document.getElementById(containerId);
  const fallback = document.getElementById(fallbackId);
  
  if (!container) return null;

  // WebGL Availability Check
  try {
    const canvasTest = document.createElement('canvas');
    const webglSupport = !!(window.WebGLRenderingContext && (canvasTest.getContext('webgl') || canvasTest.getContext('experimental-webgl')));
    if (!webglSupport) {
      if (fallback) fallback.style.display = 'block';
      return null;
    }
  } catch (e) {
    if (fallback) fallback.style.display = 'block';
    return null;
  }

  // Scene Setup
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x0a0e17);

  // Camera Setup
  const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100);
  const defaultTarget = new THREE.Vector3(0, 0, 0);
  let targetCameraPos = new THREE.Vector3(7, 5, 8);
  camera.position.copy(targetCameraPos);

  // Renderer Setup
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
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
    
    // Position cylinder in middle of start and end
    const position = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
    cylinder.position.copy(position);
    
    // Align cylinder orientation to start->end vector
    const direction = new THREE.Vector3().subVectors(end, start).normalize();
    const up = new THREE.Vector3(0, 1, 0);
    const quaternion = new THREE.Quaternion().setFromUnitVectors(up, direction);
    cylinder.setRotationFromQuaternion(quaternion);
    
    return cylinder;
  }

  // 1. Triglyceride Molecule (Left Zone)
  const trigGroup = new THREE.Group();
  trigGroup.position.set(-3.5, 0, 0);
  
  // Backbone atoms
  const b1 = new THREE.Vector3(0, 1.2, 0);
  const b2 = new THREE.Vector3(0, 0, 0);
  const b3 = new THREE.Vector3(0, -1.2, 0);
  
  trigGroup.add(createAtom(b1.x, b1.y, b1.z, 0.4, materials.triglyceride));
  trigGroup.add(createAtom(b2.x, b2.y, b2.z, 0.4, materials.triglyceride));
  trigGroup.add(createAtom(b3.x, b3.y, b3.z, 0.4, materials.triglyceride));
  trigGroup.add(createBond(b1, b2, 0.1, materials.bond));
  trigGroup.add(createBond(b2, b3, 0.1, materials.bond));

  // Three chains (R1, R2, R3) extending outwards
  const chainExt = [
    { start: b1, dir: new THREE.Vector3(-1, 0.5, 0.5), len: 4 },
    { start: b2, dir: new THREE.Vector3(-1.2, 0, -0.3), len: 4 },
    { start: b3, dir: new THREE.Vector3(-1, -0.5, 0.4), len: 4 }
  ];

  chainExt.forEach(chain => {
    let currentPoint = chain.start.clone();
    for (let i = 0; i < chain.len; i++) {
      const nextPoint = currentPoint.clone().add(chain.dir.clone().multiplyScalar(0.9));
      // Zigzag slightly
      nextPoint.y += (i % 2 === 0 ? 0.25 : -0.25);
      trigGroup.add(createAtom(nextPoint.x, nextPoint.y, nextPoint.z, 0.35, materials.triglyceride));
      trigGroup.add(createBond(currentPoint, nextPoint, 0.08, materials.bond));
      currentPoint = nextPoint;
    }
  });
  scene.add(trigGroup);

  // 2. NaOH Molecules (3 separate pairs floating around the middle)
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

  // Glycerol product
  const g1 = new THREE.Vector3(0, 1.0, -1);
  const g2 = new THREE.Vector3(0, 0, -1);
  const g3 = new THREE.Vector3(0, -1.0, -1);
  
  productsGroup.add(createAtom(g1.x, g1.y, g1.z, 0.38, materials.glycerol));
  productsGroup.add(createAtom(g2.x, g2.y, g2.z, 0.38, materials.glycerol));
  productsGroup.add(createAtom(g3.x, g3.y, g3.z, 0.38, materials.glycerol));
  productsGroup.add(createBond(g1, g2, 0.09, materials.bond));
  productsGroup.add(createBond(g2, g3, 0.09, materials.bond));

  // Soap chains (3 individual chains)
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

  // Interactive Orbit Orbit controls emulation (simple drag rotation)
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

  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    
    const deltaX = e.clientX - previousMousePosition.x;
    const deltaY = e.clientY - previousMousePosition.y;

    theta -= deltaX * 0.007;
    phi -= deltaY * 0.007;

    // Limit vertical angle (phi)
    phi = Math.max(0.1, Math.min(Math.PI - 0.1, phi));

    // Update target position
    targetCameraPos.x = radius * Math.sin(phi) * Math.sin(theta);
    targetCameraPos.y = radius * Math.cos(phi);
    targetCameraPos.z = radius * Math.sin(phi) * Math.cos(theta);

    previousMousePosition = { x: e.clientX, y: e.clientY };
  });

  window.addEventListener('mouseup', () => {
    isDragging = false;
  });

  // Support scroll/zoom
  domEl.addEventListener('wheel', (e) => {
    radius += e.deltaY * 0.01;
    radius = Math.max(5, Math.min(25, radius));
    
    targetCameraPos.x = radius * Math.sin(phi) * Math.sin(theta);
    targetCameraPos.y = radius * Math.cos(phi);
    targetCameraPos.z = radius * Math.sin(phi) * Math.cos(theta);
    e.preventDefault();
  }, { passive: false });

  // Camera animation interpolation loop
  function animate() {
    requestAnimationFrame(animate);

    // Smoothly interpolate camera position to target position
    camera.position.lerp(targetCameraPos, 0.08);
    camera.lookAt(defaultTarget);

    renderer.render(scene, camera);
  }
  animate();

  // Resize handler
  window.addEventListener('resize', () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  });

  // Method to set specific viewpoints
  function setView(x, y, z) {
    targetCameraPos.set(x, y, z);
    
    // Update theta, phi, radius based on new target
    radius = targetCameraPos.length();
    theta = Math.atan2(targetCameraPos.x, targetCameraPos.z);
    phi = Math.acos(Math.max(-0.99, Math.min(0.99, targetCameraPos.y / radius)));
  }

  return {
    setView,
    reset: () => setView(7, 5, 8)
  };
}
