import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { BokehPass } from 'three/examples/jsm/postprocessing/BokehPass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Theme } from '../types';

gsap.registerPlugin(ScrollTrigger);

interface Webiknows3dScrollExperienceProps {
  theme: Theme;
}

export const Webiknows3dScrollExperience: React.FC<Webiknows3dScrollExperienceProps> = ({ theme }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Detect Software WebGL
    const isSoftwareGl = (() => {
      try {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
        if (!gl) return true;
        const ext = gl.getExtension('WEBGL_debug_renderer_info');
        const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
        const gpu = String(gl.getParameter(param));
        return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
      } catch {
        return false;
      }
    })();

    // 1. Scene, Atmospheric Fog, Camera, and High-Performance Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(theme === 'dark' ? 0x07070a : 0xf1f5f9, 0.014);

    const camera = new THREE.PerspectiveCamera(
      48,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    camera.position.set(-1.0, 0.8, 16);
    camera.lookAt(1.8, 0.2, -2);

    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(renderer.domElement);

    // 2. Studio Environment Reflection Map for Real Metals & Glass
    try {
      const pmremGenerator = new THREE.PMREMGenerator(renderer);
      scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
      pmremGenerator.dispose();
    } catch {
      // fallback
    }

    // 3. Cinematic 3-Point Directional & Ambient Lighting Rig
    const hemisphereLight = new THREE.HemisphereLight(
      theme === 'dark' ? 0x38bdf8 : 0xffffff,
      theme === 'dark' ? 0x991b1b : 0x1e293b,
      theme === 'dark' ? 1.8 : 2.4
    );
    scene.add(hemisphereLight);

    const headlight = new THREE.PointLight(0xffffff, theme === 'dark' ? 3.0 : 4.0, 70, 1.2);
    headlight.position.set(0, 0, 2);
    camera.add(headlight);
    scene.add(camera);

    const keyLight = new THREE.DirectionalLight(0x991b1b, 5.2);
    keyLight.position.set(14, 18, 14);
    if (!isSoftwareGl) {
      keyLight.castShadow = true;
      keyLight.shadow.mapSize.width = 2048;
      keyLight.shadow.mapSize.height = 2048;
      keyLight.shadow.bias = -0.0001;
      keyLight.shadow.radius = 4;
    }
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x0284c7, 3.6);
    fillLight.position.set(-16, -8, -12);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xc084fc, 4.0);
    rimLight.position.set(0, 14, -24);
    scene.add(rimLight);

    // 4. POST-PROCESSING EFFECTCOMPOSER WITH BLOOM & DEPTH OF FIELD (DOF)
    let composer: EffectComposer | null = null;
    let bloomPass: UnrealBloomPass | null = null;
    let bokehPass: BokehPass | null = null;

    if (!isSoftwareGl) {
      composer = new EffectComposer(renderer);

      // Render Scene Pass
      const renderPass = new RenderPass(scene, camera);
      composer.addPass(renderPass);

      // 1. Cinematic Unreal Bloom Pass for soft optical highlights & specular glows
      bloomPass = new UnrealBloomPass(
        new THREE.Vector2(window.innerWidth, window.innerHeight),
        0.55,  // bloom strength
        0.45,  // bloom radius
        0.82   // bloom threshold
      );
      composer.addPass(bloomPass);

      // 2. Optical Bokeh Depth of Field Pass for photorealistic camera lens depth
      bokehPass = new BokehPass(scene, camera, {
        focus: 16.0,      // Initial focus distance to hero model
        aperture: 0.0018, // Subtle lens blur for out-of-focus elements
        maxblur: 0.012,
      });
      composer.addPass(bokehPass);

      // 3. Output Pass with Tone Mapping
      const outputPass = new OutputPass();
      composer.addPass(outputPass);
    }

    // 5. PHOTOREALISTIC PBR PHYSICAL MATERIALS
    const titaniumMaterial = new THREE.MeshPhysicalMaterial({
      color: theme === 'dark' ? 0x1e1e24 : 0x0f172a,
      metalness: 0.96,
      roughness: 0.14,
      clearcoat: 1.0,
      clearcoatRoughness: 0.04,
    });

    const maroonCoreMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x991b1b,
      metalness: 0.94,
      roughness: 0.10,
      clearcoat: 1.0,
      clearcoatRoughness: 0.03,
    });

    const goldAccentMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xd97706,
      metalness: 0.95,
      roughness: 0.12,
      clearcoat: 1.0,
    });

    const crystalGlassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      metalness: 0.04,
      roughness: 0.05,
      transmission: isSoftwareGl ? 0 : 0.95,
      transparent: true,
      opacity: 0.88,
      ior: 1.54,
      thickness: 2.2,
      clearcoat: 1.0,
      clearcoatRoughness: 0.02,
    });

    const brushedChromeMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xf1f5f9,
      metalness: 0.98,
      roughness: 0.08,
      clearcoat: 1.0,
    });

    const glowingRedMaterial = new THREE.MeshStandardMaterial({
      color: 0xef4444,
      emissive: 0x991b1b,
      emissiveIntensity: 1.8,
      roughness: 0.2,
    });

    // 6. BUILD 3D REALISTIC VOLUMETRIC ECOSYSTEM
    const worldGroup = new THREE.Group();
    scene.add(worldGroup);

    // ========================================================
    // PILLAR 1: REALISTIC SILICON PROCESSOR ENGINE & WORKSTATION (Z = 6 to Z = -10)
    // ========================================================
    const webDevGroup = new THREE.Group();
    webDevGroup.position.set(3.8, 0.2, -4);

    // Volumetric 3D Silicon Chip Base Substrate
    const chipBaseGeom = new THREE.BoxGeometry(6.4, 0.4, 4.8);
    const chipBase = new THREE.Mesh(chipBaseGeom, titaniumMaterial);
    chipBase.position.y = -2.2;
    webDevGroup.add(chipBase);

    // Extruded Gold Pins along the chip perimeter
    for (let pin = 0; pin < 16; pin++) {
      const x = -2.8 + (pin % 8) * 0.8;
      const z = pin < 8 ? 2.3 : -2.3;
      const pinGeom = new THREE.CylinderGeometry(0.08, 0.08, 0.6, 12);
      const pinMesh = new THREE.Mesh(pinGeom, goldAccentMaterial);
      pinMesh.position.set(x, -2.0, z);
      webDevGroup.add(pinMesh);
    }

    // Heatsink Metallic Fins Stack
    for (let fin = 0; fin < 7; fin++) {
      const finGeom = new THREE.BoxGeometry(5.2, 0.08, 3.8);
      const finMesh = new THREE.Mesh(finGeom, brushedChromeMaterial);
      finMesh.position.set(0, -1.8 + fin * 0.18, 0);
      webDevGroup.add(finMesh);
    }

    // Central Glass Display Monolith Shell
    const displayShellGeom = new THREE.BoxGeometry(6.8, 4.4, 0.35);
    const displayShell = new THREE.Mesh(displayShellGeom, crystalGlassMaterial);
    displayShell.position.set(0, 0.6, 0);
    webDevGroup.add(displayShell);

    // Dark Inner Screen Matrix
    const screenInnerGeom = new THREE.BoxGeometry(6.4, 4.0, 0.1);
    const screenInner = new THREE.Mesh(screenInnerGeom, titaniumMaterial);
    screenInner.position.set(0, 0.6, 0.05);
    webDevGroup.add(screenInner);

    // 3D Physical Extruded Code Blocks floating in front of screen
    const codeBlock1 = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.25, 0.08), maroonCoreMaterial);
    codeBlock1.position.set(-1.4, 1.6, 0.28);
    webDevGroup.add(codeBlock1);

    const codeBlock2 = new THREE.Mesh(new THREE.BoxGeometry(3.6, 0.22, 0.08), goldAccentMaterial);
    codeBlock2.position.set(-0.8, 1.1, 0.28);
    webDevGroup.add(codeBlock2);

    const codeBlock3 = new THREE.Mesh(new THREE.BoxGeometry(2.8, 0.22, 0.08), glowingRedMaterial);
    codeBlock3.position.set(-1.2, 0.6, 0.28);
    webDevGroup.add(codeBlock3);

    const codeBlock4 = new THREE.Mesh(new THREE.BoxGeometry(4.2, 0.22, 0.08), brushedChromeMaterial);
    codeBlock4.position.set(-0.5, 0.1, 0.28);
    webDevGroup.add(codeBlock4);

    // Orbiting 3D Gyro Ring with Metallic Gears
    const gyroRingGeom = new THREE.TorusGeometry(2.2, 0.12, 16, 64);
    const gyroRing = new THREE.Mesh(gyroRingGeom, brushedChromeMaterial);
    gyroRing.position.set(-2.8, -0.6, 1.2);
    gyroRing.rotation.x = Math.PI / 3;
    webDevGroup.add(gyroRing);

    const floatingCrystal = new THREE.Mesh(new THREE.OctahedronGeometry(0.85), maroonCoreMaterial);
    floatingCrystal.position.set(2.8, 2.0, 1.2);
    webDevGroup.add(floatingCrystal);

    worldGroup.add(webDevGroup);

    // ========================================================
    // PILLAR 2: REALISTIC GYROSCOPE NEURAL NUCLEUS & GLASS SPHERE (Z = -18 to Z = -30)
    // ========================================================
    const aiGroup = new THREE.Group();
    aiGroup.position.set(-3.2, -0.2, -22);

    // Outer Heavy Glass Dome
    const glassSphereGeom = new THREE.SphereGeometry(3.4, 48, 48);
    const glassSphere = new THREE.Mesh(glassSphereGeom, crystalGlassMaterial);
    aiGroup.add(glassSphere);

    // Inner 3-Axis Counter-Rotating Gyroscope Rings
    const ringX = new THREE.Mesh(new THREE.TorusGeometry(2.6, 0.12, 16, 64), titaniumMaterial);
    aiGroup.add(ringX);

    const ringY = new THREE.Mesh(new THREE.TorusGeometry(2.2, 0.10, 16, 64), brushedChromeMaterial);
    ringY.rotation.x = Math.PI / 2;
    aiGroup.add(ringY);

    const ringZ = new THREE.Mesh(new THREE.TorusGeometry(1.8, 0.08, 16, 64), goldAccentMaterial);
    ringZ.rotation.y = Math.PI / 4;
    aiGroup.add(ringZ);

    // Faceted Ruby Core Crystal
    const coreCrystalGeom = new THREE.IcosahedronGeometry(1.1, 0);
    const coreCrystal = new THREE.Mesh(coreCrystalGeom, maroonCoreMaterial);
    aiGroup.add(coreCrystal);

    // Internal Light
    const coreLight = new THREE.PointLight(0xef4444, 4.0, 12);
    aiGroup.add(coreLight);

    // Orbiting Floating Node Spheres & Laser Lines
    const nodeGroup = new THREE.Group();
    for (let i = 0; i < 10; i++) {
      const angle = (i / 10) * Math.PI * 2;
      const radius = 4.8;
      const node = new THREE.Mesh(new THREE.SphereGeometry(0.2, 16, 16), maroonCoreMaterial);
      node.position.set(Math.cos(angle) * radius, Math.sin(angle * 2) * 1.4, Math.sin(angle) * radius);
      nodeGroup.add(node);
    }
    aiGroup.add(nodeGroup);

    worldGroup.add(aiGroup);

    // ========================================================
    // PILLAR 3: MODULAR SERVER MONOLITH TOWERS (Z = -38 to Z = -50)
    // ========================================================
    const cloudGroup = new THREE.Group();
    cloudGroup.position.set(3.5, 0.4, -42);

    for (let col = -1; col <= 1; col++) {
      const height = 6.2 + (col === 0 ? 1.4 : 0);
      const serverChassisGeom = new THREE.BoxGeometry(2.2, height, 2.2);
      const serverChassis = new THREE.Mesh(serverChassisGeom, titaniumMaterial);
      serverChassis.position.set(col * 2.6, 0, 0);
      cloudGroup.add(serverChassis);

      // Recessed Metallic Drive Slots
      for (let slot = 0; slot < 8; slot++) {
        const slotY = -height / 2 + 0.6 + slot * (height / 9);
        const slotGeom = new THREE.BoxGeometry(1.9, 0.4, 0.15);
        const slotMesh = new THREE.Mesh(slotGeom, brushedChromeMaterial);
        slotMesh.position.set(col * 2.6, slotY, 1.1);
        cloudGroup.add(slotMesh);

        // LED Indicator Node
        const ledGeom = new THREE.SphereGeometry(0.08, 12, 12);
        const ledMat = slot % 2 === 0 ? glowingRedMaterial : goldAccentMaterial;
        const ledMesh = new THREE.Mesh(ledGeom, ledMat);
        ledMesh.position.set(col * 2.6 - 0.7, slotY, 1.2);
        cloudGroup.add(ledMesh);
      }
    }

    worldGroup.add(cloudGroup);

    // ========================================================
    // PILLAR 4: EXPLODED GLASS UI CARDS & FIGMA TOKENS (Z = -58 to Z = -70)
    // ========================================================
    const uiGroup = new THREE.Group();
    uiGroup.position.set(-3.5, 0.0, -62);

    for (let layer = 0; layer < 3; layer++) {
      const cardGeom = new THREE.BoxGeometry(6.2, 4.2, 0.15);
      const cardMat = layer === 0 ? crystalGlassMaterial : titaniumMaterial;
      const cardMesh = new THREE.Mesh(cardGeom, cardMat);
      cardMesh.position.set(layer * 0.5, layer * 0.7, layer * 0.9);
      cardMesh.rotation.x = -Math.PI / 10;
      cardMesh.rotation.y = Math.PI / 7;
      uiGroup.add(cardMesh);

      // 3D Physical Token Swatch Buttons on top card
      if (layer === 0) {
        for (let b = 0; b < 3; b++) {
          const btnGeom = new THREE.BoxGeometry(1.4, 0.6, 0.12);
          const btnMat = b === 0 ? maroonCoreMaterial : b === 1 ? goldAccentMaterial : brushedChromeMaterial;
          const btnMesh = new THREE.Mesh(btnGeom, btnMat);
          btnMesh.position.set(-1.8 + b * 1.8, 1.1, 0.15);
          btnMesh.rotation.x = -Math.PI / 10;
          btnMesh.rotation.y = Math.PI / 7;
          uiGroup.add(btnMesh);
        }
      }
    }

    worldGroup.add(uiGroup);

    // ========================================================
    // PILLAR 5: GLOBAL ECOSYSTEM & HORIZON SPHERE (Z = -78 to Z = -95)
    // ========================================================
    const horizonGroup = new THREE.Group();
    horizonGroup.position.set(0, 0.5, -82);

    const horizonGeodesicGeom = new THREE.IcosahedronGeometry(5.4, 3);
    const horizonGeodesic = new THREE.Mesh(
      horizonGeodesicGeom,
      new THREE.MeshBasicMaterial({ color: 0xef4444, wireframe: true, transparent: true, opacity: 0.4 })
    );
    horizonGroup.add(horizonGeodesic);

    const horizonCoreSphere = new THREE.Mesh(new THREE.SphereGeometry(2.8, 32, 32), maroonCoreMaterial);
    horizonGroup.add(horizonCoreSphere);

    const horizonSatRing = new THREE.Mesh(new THREE.TorusGeometry(7.2, 0.12, 16, 64), brushedChromeMaterial);
    horizonSatRing.rotation.x = Math.PI / 3;
    horizonGroup.add(horizonSatRing);

    worldGroup.add(horizonGroup);

    // ========================================================
    // DUST STAR PARTICLES GALAXY
    // ========================================================
    const particleCount = isSoftwareGl ? 400 : 1200;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 38;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 26;
      particlePositions[i * 3 + 2] = 22 - Math.random() * 125;

      const colorType = Math.random();
      if (colorType > 0.6) {
        particleColors[i * 3] = 0.95;
        particleColors[i * 3 + 1] = 0.15;
        particleColors[i * 3 + 2] = 0.25;
      } else if (colorType > 0.3) {
        particleColors[i * 3] = 0.22;
        particleColors[i * 3 + 1] = 0.74;
        particleColors[i * 3 + 2] = 0.97;
      } else {
        particleColors[i * 3] = 0.98;
        particleColors[i * 3 + 1] = 0.75;
        particleColors[i * 3 + 2] = 0.15;
      }
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.15,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
    });
    const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particleSystem);

    // 7. GSAP SCROLLTRIGGER CAMERA PATH TIMELINE
    const camState = {
      x: -1.0,
      y: 0.8,
      z: 16,
      lookX: 1.8,
      lookY: 0.2,
      lookZ: -2,
      keyLightR: 0.93,
      keyLightG: 0.26,
      keyLightB: 0.26,
      keyIntensity: 5.2,
    };

    const scrollTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.6,
        invalidateOnRefresh: true,
      },
    });

    scrollTimeline.to(camState, {
      x: -2.8,
      y: 1.2,
      z: -2,
      lookX: 2.2,
      lookY: 0.2,
      lookZ: -10,
      keyLightR: 0.22,
      keyLightG: 0.74,
      keyLightB: 0.97,
      keyIntensity: 5.2,
      ease: 'power1.inOut',
      duration: 2.5,
    }, 0)
    .to(camState, {
      x: 3.6,
      y: -0.8,
      z: -20,
      lookX: -1.0,
      lookY: 0.4,
      lookZ: -32,
      keyLightR: 0.95,
      keyLightG: 0.25,
      keyLightB: 0.35,
      keyIntensity: 5.5,
      ease: 'power1.inOut',
      duration: 2.5,
    })
    .to(camState, {
      x: -3.5,
      y: 1.0,
      z: -40,
      lookX: 1.2,
      lookY: -0.2,
      lookZ: -54,
      keyLightR: 0.13,
      keyLightG: 0.77,
      keyLightB: 0.36,
      keyIntensity: 5.0,
      ease: 'power1.inOut',
      duration: 2.5,
    })
    .to(camState, {
      x: 3.2,
      y: -0.4,
      z: -60,
      lookX: -1.0,
      lookY: 0.2,
      lookZ: -74,
      keyLightR: 0.75,
      keyLightG: 0.52,
      keyLightB: 0.98,
      keyIntensity: 5.2,
      ease: 'power1.inOut',
      duration: 2.5,
    })
    .to(camState, {
      x: 0,
      y: 1.8,
      z: -80,
      lookX: 0,
      lookY: 0,
      lookZ: -98,
      keyLightR: 0.95,
      keyLightG: 0.25,
      keyLightB: 0.25,
      keyIntensity: 5.8,
      ease: 'power1.inOut',
      duration: 2.5,
    });

    // Smooth camera state vectors for exponential damping across all devices
    const currentCamPos = new THREE.Vector3(-1.0, 0.8, 16);
    const currentLookAt = new THREE.Vector3(1.8, 0.2, -2);

    // 8. MOUSE & TOUCH PARALLAX TRACKING
    const targetMouse = { x: 0, y: 0 };
    const currentMouse = { x: 0, y: 0 };

    const handleMouseMove = (e: MouseEvent) => {
      targetMouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
      targetMouse.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // 9. RENDER LOOP WITH EXPONENTIAL PHYSICAL DAMPING & KINEMATICS
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const tick = () => {
      animationFrameId = requestAnimationFrame(tick);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse damping
      currentMouse.x += (targetMouse.x - currentMouse.x) * 0.05;
      currentMouse.y += (targetMouse.y - currentMouse.y) * 0.05;

      // Exponential damping for silky smooth camera transitions across all devices
      const targetX = camState.x + currentMouse.x * 0.4;
      const targetY = camState.y - currentMouse.y * 0.3;
      const targetZ = camState.z;

      const targetLookX = camState.lookX + currentMouse.x * 0.2;
      const targetLookY = camState.lookY - currentMouse.y * 0.2;
      const targetLookZ = camState.lookZ;

      currentCamPos.x += (targetX - currentCamPos.x) * 0.15;
      currentCamPos.y += (targetY - currentCamPos.y) * 0.15;
      currentCamPos.z += (targetZ - currentCamPos.z) * 0.15;

      currentLookAt.x += (targetLookX - currentLookAt.x) * 0.15;
      currentLookAt.y += (targetLookY - currentLookAt.y) * 0.15;
      currentLookAt.z += (targetLookZ - currentLookAt.z) * 0.15;

      camera.position.set(currentCamPos.x, currentCamPos.y, currentCamPos.z);
      camera.lookAt(currentLookAt.x, currentLookAt.y, currentLookAt.z);

      // Dynamic Depth-of-Field focal pull
      if (bokehPass) {
        const distanceToTarget = Math.abs(currentCamPos.z - currentLookAt.z);
        (bokehPass.uniforms as Record<string, THREE.IUniform>)['focus'].value = Math.max(distanceToTarget, 2.0);
      }

      // Light positioning
      keyLight.position.set(
        currentCamPos.x + 10 + currentMouse.x * 2,
        currentCamPos.y + 12 - currentMouse.y * 2,
        currentCamPos.z + 8
      );
      keyLight.target.position.set(currentLookAt.x, currentLookAt.y, currentLookAt.z);
      keyLight.target.updateMatrixWorld();
      keyLight.color.setRGB(camState.keyLightR, camState.keyLightG, camState.keyLightB);
      keyLight.intensity = camState.keyIntensity;

      // Realistic Kinematics & Rotations
      webDevGroup.rotation.y = Math.sin(elapsedTime * 0.2) * 0.06;
      gyroRing.rotation.y = elapsedTime * 0.4;
      floatingCrystal.rotation.x = elapsedTime * 0.5;

      ringX.rotation.x = elapsedTime * 0.3;
      ringY.rotation.y = -elapsedTime * 0.4;
      ringZ.rotation.z = elapsedTime * 0.2;
      coreCrystal.rotation.y = elapsedTime * 0.35;
      nodeGroup.rotation.z = Math.sin(elapsedTime * 0.25) * 0.12;

      cloudGroup.rotation.y = Math.sin(elapsedTime * 0.18) * 0.05;

      uiGroup.rotation.y = Math.sin(elapsedTime * 0.2) * 0.05;

      horizonGeodesic.rotation.y = elapsedTime * 0.1;
      horizonSatRing.rotation.z = elapsedTime * 0.15;

      // Render with EffectComposer when available, or fallback to standard renderer
      if (composer) {
        composer.render();
      } else {
        renderer.render(scene, camera);
      }
    };

    tick();

    // 10. RESIZE OBSERVER WITH RESPONSIVE FOV
    let resizeRafId: number | null = null;
    const handleResize = () => {
      if (resizeRafId !== null) cancelAnimationFrame(resizeRafId);
      resizeRafId = requestAnimationFrame(() => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        // Responsive camera FOV for mobile / tablet / desktop
        camera.fov = width < 768 ? 58 : 48;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
        if (composer) {
          composer.setSize(width, height);
        }
        ScrollTrigger.refresh();
      });
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    const refreshTimers = [
      setTimeout(() => ScrollTrigger.refresh(), 300),
      setTimeout(() => ScrollTrigger.refresh(), 1000),
    ];

    // 11. WAYPOINT MONITORING
    const updateActiveWaypoint = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll <= 0) return;
      const progress = Math.min(Math.max(window.scrollY / maxScroll, 0), 1);
      
      let index = 0;
      if (progress < 0.12) index = 0;
      else if (progress < 0.37) index = 1;
      else if (progress < 0.62) index = 2;
      else if (progress < 0.87) index = 3;
      else index = 4;

      const event = new CustomEvent('3d-waypoint-change', { detail: { index, progress } });
      window.dispatchEvent(event);
    };

    window.addEventListener('scroll', updateActiveWaypoint, { passive: true });
    updateActiveWaypoint();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', updateActiveWaypoint);
      cancelAnimationFrame(animationFrameId);
      if (resizeRafId !== null) cancelAnimationFrame(resizeRafId);
      refreshTimers.forEach(clearTimeout);

      scrollTimeline.kill();
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === document.body) {
          trigger.kill();
        }
      });

      scene.clear();
      renderer.dispose();
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [theme]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden"
    />
  );
};
