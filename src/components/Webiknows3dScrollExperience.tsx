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
    scene.fog = new THREE.FogExp2(theme === 'dark' ? 0x07070a : 0xf1f5f9, 0.012);

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
    renderer.toneMappingExposure = 1.0; // Reduced exposure to eliminate blinding gloss
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(renderer.domElement);

    // 2. Studio Environment Reflection Map (Subtle)
    try {
      const pmremGenerator = new THREE.PMREMGenerator(renderer);
      scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.01).texture;
      pmremGenerator.dispose();
    } catch {
      // fallback
    }

    // 3. Cinematic 3-Point Directional & Ambient Lighting Rig
    const hemisphereLight = new THREE.HemisphereLight(
      theme === 'dark' ? 0x38bdf8 : 0xffffff,
      theme === 'dark' ? 0x991b1b : 0x1e293b,
      theme === 'dark' ? 1.4 : 2.0
    );
    scene.add(hemisphereLight);

    const headlight = new THREE.PointLight(0xffffff, theme === 'dark' ? 2.0 : 3.0, 70, 1.2);
    headlight.position.set(0, 0, 2);
    camera.add(headlight);
    scene.add(camera);

    const keyLight = new THREE.DirectionalLight(0x991b1b, 3.8);
    keyLight.position.set(14, 18, 14);
    if (!isSoftwareGl) {
      keyLight.castShadow = true;
      keyLight.shadow.mapSize.width = 2048;
      keyLight.shadow.mapSize.height = 2048;
      keyLight.shadow.bias = -0.0001;
      keyLight.shadow.radius = 4;
    }
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x0284c7, 2.6);
    fillLight.position.set(-16, -8, -12);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xc084fc, 3.0);
    rimLight.position.set(0, 14, -24);
    scene.add(rimLight);

    // 4. POST-PROCESSING EFFECTCOMPOSER (Soft Bloom, Minimal Bokeh)
    let composer: EffectComposer | null = null;
    let bloomPass: UnrealBloomPass | null = null;
    let bokehPass: BokehPass | null = null;

    if (!isSoftwareGl) {
      composer = new EffectComposer(renderer);

      const renderPass = new RenderPass(scene, camera);
      composer.addPass(renderPass);

      bloomPass = new UnrealBloomPass(
        new THREE.Vector2(window.innerWidth, window.innerHeight),
        0.35,  // reduced bloom for less glossy glare
        0.45,
        0.90
      );
      composer.addPass(bloomPass);

      bokehPass = new BokehPass(scene, camera, {
        focus: 16.0,
        aperture: 0.0012,
        maxblur: 0.008,
      });
      composer.addPass(bokehPass);

      const outputPass = new OutputPass();
      composer.addPass(outputPass);
    }

    // 5. MATTE / NON-GLOSSY PBR PHYSICAL MATERIALS (Higher roughness, low/zero clearcoat)
    const titaniumMaterial = new THREE.MeshPhysicalMaterial({
      color: theme === 'dark' ? 0x1e1e24 : 0x0f172a,
      metalness: 0.45,
      roughness: 0.65, // matte non-glossy finish
      clearcoat: 0.0,
    });

    const maroonCoreMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x991b1b,
      metalness: 0.40,
      roughness: 0.55,
      clearcoat: 0.0,
    });

    const goldAccentMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xd97706,
      metalness: 0.45,
      roughness: 0.60,
      clearcoat: 0.0,
    });

    const cyanCodeMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x0ea5e9,
      metalness: 0.40,
      roughness: 0.55,
      clearcoat: 0.0,
      emissive: 0x0284c7,
      emissiveIntensity: 0.2,
    });

    const crystalGlassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      metalness: 0.05,
      roughness: 0.35, // matte translucent glass
      transmission: isSoftwareGl ? 0 : 0.80,
      transparent: true,
      opacity: 0.75,
      ior: 1.45,
      thickness: 1.5,
    });

    const brushedChromeMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xf1f5f9,
      metalness: 0.50,
      roughness: 0.50, // satin finish instead of shiny chrome
      clearcoat: 0.0,
    });

    const glowingRedMaterial = new THREE.MeshStandardMaterial({
      color: 0xef4444,
      emissive: 0x991b1b,
      emissiveIntensity: 1.0,
      roughness: 0.6,
    });

    // Helper: Create 3D Curly Brace `{ }` or Angle Bracket `< / >`
    const createAngleBracket = (isOpening: boolean, mat: THREE.Material) => {
      const group = new THREE.Group();
      const topBar = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.2, 0.2), mat);
      topBar.position.set(isOpening ? 0.4 : -0.4, 0.6, 0);
      topBar.rotation.z = isOpening ? -Math.PI / 4 : Math.PI / 4;
      group.add(topBar);

      const botBar = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.2, 0.2), mat);
      botBar.position.set(isOpening ? 0.4 : -0.4, -0.6, 0);
      botBar.rotation.z = isOpening ? Math.PI / 4 : -Math.PI / 4;
      group.add(botBar);
      return group;
    };

    const createCurlyBrace = (isLeft: boolean, mat: THREE.Material) => {
      const group = new THREE.Group();
      const seg1 = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.2, 0.2), mat);
      seg1.position.set(isLeft ? -0.4 : 0.4, 1.2, 0);
      seg1.rotation.z = isLeft ? Math.PI / 4 : -Math.PI / 4;
      group.add(seg1);

      const seg2 = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.2, 0.2), mat);
      seg2.position.set(isLeft ? -0.8 : 0.8, 0.4, 0);
      seg2.rotation.z = isLeft ? -Math.PI / 12 : Math.PI / 12;
      group.add(seg2);

      const seg3 = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.2, 0.2), mat);
      seg3.position.set(isLeft ? -0.8 : 0.8, -0.4, 0);
      seg3.rotation.z = isLeft ? Math.PI / 12 : -Math.PI / 12;
      group.add(seg3);

      const seg4 = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.2, 0.2), mat);
      seg4.position.set(isLeft ? -0.4 : 0.4, -1.2, 0);
      seg4.rotation.z = isLeft ? -Math.PI / 4 : Math.PI / 4;
      group.add(seg4);
      return group;
    };

    // 6. BUILD 3D REALISTIC VOLUMETRIC CODING ECOSYSTEM
    const worldGroup = new THREE.Group();
    scene.add(worldGroup);

    // ========================================================
    // PILLAR 1: SILICON PROCESSOR & 3D CODE WORKSTATION (Z = 6 to Z = -10)
    // ========================================================
    const webDevGroup = new THREE.Group();
    webDevGroup.position.set(3.8, 0.2, -4);

    const chipBaseGeom = new THREE.BoxGeometry(6.4, 0.4, 4.8);
    const chipBase = new THREE.Mesh(chipBaseGeom, titaniumMaterial);
    chipBase.position.y = -2.2;
    webDevGroup.add(chipBase);

    for (let pin = 0; pin < 16; pin++) {
      const x = -2.8 + (pin % 8) * 0.8;
      const z = pin < 8 ? 2.3 : -2.3;
      const pinGeom = new THREE.CylinderGeometry(0.08, 0.08, 0.6, 12);
      const pinMesh = new THREE.Mesh(pinGeom, goldAccentMaterial);
      pinMesh.position.set(x, -2.0, z);
      webDevGroup.add(pinMesh);
    }

    for (let fin = 0; fin < 7; fin++) {
      const finGeom = new THREE.BoxGeometry(5.2, 0.08, 3.8);
      const finMesh = new THREE.Mesh(finGeom, brushedChromeMaterial);
      finMesh.position.set(0, -1.8 + fin * 0.18, 0);
      webDevGroup.add(finMesh);
    }

    const displayShellGeom = new THREE.BoxGeometry(6.8, 4.4, 0.35);
    const displayShell = new THREE.Mesh(displayShellGeom, crystalGlassMaterial);
    displayShell.position.set(0, 0.6, 0);
    webDevGroup.add(displayShell);

    const screenInnerGeom = new THREE.BoxGeometry(6.4, 4.0, 0.1);
    const screenInner = new THREE.Mesh(screenInnerGeom, titaniumMaterial);
    screenInner.position.set(0, 0.6, 0.05);
    webDevGroup.add(screenInner);

    const codeBlock1 = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.25, 0.08), maroonCoreMaterial);
    codeBlock1.position.set(-1.4, 1.6, 0.28);
    webDevGroup.add(codeBlock1);

    const codeBlock2 = new THREE.Mesh(new THREE.BoxGeometry(3.6, 0.22, 0.08), goldAccentMaterial);
    codeBlock2.position.set(-0.8, 1.1, 0.28);
    webDevGroup.add(codeBlock2);

    const codeBlock3 = new THREE.Mesh(new THREE.BoxGeometry(2.8, 0.22, 0.08), cyanCodeMaterial);
    codeBlock3.position.set(-1.2, 0.6, 0.28);
    webDevGroup.add(codeBlock3);

    const codeBlock4 = new THREE.Mesh(new THREE.BoxGeometry(4.2, 0.22, 0.08), brushedChromeMaterial);
    codeBlock4.position.set(-0.5, 0.1, 0.28);
    webDevGroup.add(codeBlock4);

    const leftBrace = createCurlyBrace(true, maroonCoreMaterial);
    leftBrace.position.set(-2.8, 0.6, 1.2);
    webDevGroup.add(leftBrace);

    const rightBrace = createCurlyBrace(false, cyanCodeMaterial);
    rightBrace.position.set(2.8, 0.6, 1.2);
    webDevGroup.add(rightBrace);

    const openAngle = createAngleBracket(true, goldAccentMaterial);
    openAngle.position.set(2.4, 2.2, 0.8);
    webDevGroup.add(openAngle);

    worldGroup.add(webDevGroup);

    // ========================================================
    // PILLAR 2: AI NEURAL NUCLEUS & CODE COMPILER ORB (Z = -18 to Z = -30)
    // ========================================================
    const aiGroup = new THREE.Group();
    aiGroup.position.set(-3.2, -0.2, -22);

    const glassSphereGeom = new THREE.SphereGeometry(3.4, 48, 48);
    const glassSphere = new THREE.Mesh(glassSphereGeom, crystalGlassMaterial);
    aiGroup.add(glassSphere);

    const ringX = new THREE.Mesh(new THREE.TorusGeometry(2.6, 0.12, 16, 64), titaniumMaterial);
    aiGroup.add(ringX);

    const ringY = new THREE.Mesh(new THREE.TorusGeometry(2.2, 0.10, 16, 64), brushedChromeMaterial);
    ringY.rotation.x = Math.PI / 2;
    aiGroup.add(ringY);

    const ringZ = new THREE.Mesh(new THREE.TorusGeometry(1.8, 0.08, 16, 64), cyanCodeMaterial);
    ringZ.rotation.y = Math.PI / 4;
    aiGroup.add(ringZ);

    const coreOpenAngle = createAngleBracket(true, maroonCoreMaterial);
    coreOpenAngle.scale.set(1.4, 1.4, 1.4);
    aiGroup.add(coreOpenAngle);

    const coreLight = new THREE.PointLight(0xef4444, 3.0, 12);
    aiGroup.add(coreLight);

    const tokenGroup = new THREE.Group();
    for (let i = 0; i < 6; i++) {
      const angle = (i / 6) * Math.PI * 2;
      const radius = 4.4;
      const bracket = i % 2 === 0 ? createCurlyBrace(i % 4 === 0, goldAccentMaterial) : createAngleBracket(true, cyanCodeMaterial);
      bracket.position.set(Math.cos(angle) * radius, Math.sin(angle * 2) * 1.2, Math.sin(angle) * radius);
      tokenGroup.add(bracket);
    }
    aiGroup.add(tokenGroup);

    worldGroup.add(aiGroup);

    // ========================================================
    // PILLAR 3: MODULAR CLOUD & API SERVER RACKS (Z = -38 to Z = -50)
    // ========================================================
    const cloudGroup = new THREE.Group();
    cloudGroup.position.set(3.5, 0.4, -42);

    for (let col = -1; col <= 1; col++) {
      const height = 6.2 + (col === 0 ? 1.4 : 0);
      const serverChassisGeom = new THREE.BoxGeometry(2.2, height, 2.2);
      const serverChassis = new THREE.Mesh(serverChassisGeom, titaniumMaterial);
      serverChassis.position.set(col * 2.6, 0, 0);
      cloudGroup.add(serverChassis);

      for (let slot = 0; slot < 8; slot++) {
        const slotY = -height / 2 + 0.6 + slot * (height / 9);
        const slotGeom = new THREE.BoxGeometry(1.9, 0.4, 0.15);
        const slotMesh = new THREE.Mesh(slotGeom, brushedChromeMaterial);
        slotMesh.position.set(col * 2.6, slotY, 1.1);
        cloudGroup.add(slotMesh);

        const ledGeom = new THREE.SphereGeometry(0.08, 12, 12);
        const ledMat = slot % 2 === 0 ? glowingRedMaterial : cyanCodeMaterial;
        const ledMesh = new THREE.Mesh(ledGeom, ledMat);
        ledMesh.position.set(col * 2.6 - 0.7, slotY, 1.2);
        cloudGroup.add(ledMesh);
      }
    }

    const apiBrace1 = createAngleBracket(false, cyanCodeMaterial);
    apiBrace1.position.set(-4.2, 2.0, 0);
    cloudGroup.add(apiBrace1);

    const apiBrace2 = createAngleBracket(true, maroonCoreMaterial);
    apiBrace2.position.set(4.2, -2.0, 0);
    cloudGroup.add(apiBrace2);

    worldGroup.add(cloudGroup);

    // ========================================================
    // PILLAR 4: EXPLODED UI ARCHITECTURE & CODE MODULES (Z = -58 to Z = -70)
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

      if (layer === 0) {
        for (let b = 0; b < 3; b++) {
          const badge = b === 0 ? createCurlyBrace(true, maroonCoreMaterial) : b === 1 ? createAngleBracket(true, goldAccentMaterial) : createCurlyBrace(false, cyanCodeMaterial);
          badge.scale.set(0.6, 0.6, 0.6);
          badge.position.set(-1.8 + b * 1.8, 1.1, 0.2);
          badge.rotation.x = -Math.PI / 10;
          badge.rotation.y = Math.PI / 7;
          uiGroup.add(badge);
        }
      }
    }

    worldGroup.add(uiGroup);

    // ========================================================
    // PILLAR 5: GLOBAL ECOSYSTEM & CODE MATRIX SPHERE (Z = -78 to Z = -95)
    // ========================================================
    const horizonGroup = new THREE.Group();
    horizonGroup.position.set(0, 0.5, -82);

    const horizonGeodesicGeom = new THREE.IcosahedronGeometry(5.4, 2);
    const horizonGeodesic = new THREE.Mesh(
      horizonGeodesicGeom,
      new THREE.MeshBasicMaterial({ color: 0x0ea5e9, wireframe: true, transparent: true, opacity: 0.30 })
    );
    horizonGroup.add(horizonGeodesic);

    const horizonCoreBrace = createCurlyBrace(true, maroonCoreMaterial);
    horizonCoreBrace.scale.set(2.2, 2.2, 2.2);
    horizonGroup.add(horizonCoreBrace);

    const horizonSatRing = new THREE.Mesh(new THREE.TorusGeometry(7.2, 0.12, 16, 64), goldAccentMaterial);
    horizonSatRing.rotation.x = Math.PI / 3;
    horizonGroup.add(horizonSatRing);

    worldGroup.add(horizonGroup);

    // ========================================================
    // MATTE HIGH-VISIBILITY FLOATING CODING LANGUAGE TOKENS
    // ========================================================
    const codeLanguages = ['JS', 'TS', 'Python', 'SQL', 'React', 'Node', '{ }', '< / >', 'API', 'async', 'const', 'JSON', 'HTML', 'AWS', 'Git'];
    const tokenMeshes: { mesh: THREE.Mesh; rotSpeed: number }[] = [];
    const tokensGroup = new THREE.Group();
    scene.add(tokensGroup);

    const createTextTexture = (text: string) => {
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 256;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        // Clean matte solid dark background with no glossy reflection
        ctx.fillStyle = 'rgba(15, 23, 42, 0.98)';
        ctx.fillRect(0, 0, 512, 256);
        
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 8;
        ctx.strokeRect(8, 8, 496, 240);

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 64px monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(text, 256, 128);
      }
      const texture = new THREE.CanvasTexture(canvas);
      texture.colorSpace = THREE.SRGBColorSpace;
      return texture;
    };

    const numTokens = isSoftwareGl ? 16 : 30;
    for (let t = 0; t < numTokens; t++) {
      const lang = codeLanguages[t % codeLanguages.length];
      const textTexture = createTextTexture(lang);
      const tokenMat = new THREE.MeshBasicMaterial({ 
        map: textTexture, 
        transparent: true, 
        opacity: 0.95,
        depthWrite: false 
      });
      const tokenGeom = new THREE.PlaneGeometry(3.6, 1.8);
      const tokenMesh = new THREE.Mesh(tokenGeom, tokenMat);

      tokenMesh.position.set(
        (Math.random() - 0.5) * 38,
        (Math.random() - 0.5) * 24,
        14 - Math.random() * 125
      );

      tokensGroup.add(tokenMesh);
      tokenMeshes.push({
        mesh: tokenMesh,
        rotSpeed: (Math.random() - 0.5) * 0.008,
      });
    }

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
      keyIntensity: 3.8,
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
      keyLightR: 0.05,
      keyLightG: 0.65,
      keyLightB: 0.92,
      keyIntensity: 3.8,
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
      keyIntensity: 4.0,
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
      keyLightR: 0.05,
      keyLightG: 0.85,
      keyLightB: 0.45,
      keyIntensity: 3.8,
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
      keyIntensity: 3.8,
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
      keyIntensity: 4.2,
      ease: 'power1.inOut',
      duration: 2.5,
    });

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

    // 9. RENDER LOOP WITH EXPONENTIAL PHYSICAL DAMPING
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const tick = () => {
      animationFrameId = requestAnimationFrame(tick);
      const elapsedTime = clock.getElapsedTime();

      currentMouse.x += (targetMouse.x - currentMouse.x) * 0.05;
      currentMouse.y += (targetMouse.y - currentMouse.y) * 0.05;

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

      if (bokehPass) {
        const distanceToTarget = Math.abs(currentCamPos.z - currentLookAt.z);
        (bokehPass.uniforms as Record<string, THREE.IUniform>)['focus'].value = Math.max(distanceToTarget, 2.0);
      }

      keyLight.position.set(
        currentCamPos.x + 10 + currentMouse.x * 2,
        currentCamPos.y + 12 - currentMouse.y * 2,
        currentCamPos.z + 8
      );
      keyLight.target.position.set(currentLookAt.x, currentLookAt.y, currentLookAt.z);
      keyLight.target.updateMatrixWorld();
      keyLight.color.setRGB(camState.keyLightR, camState.keyLightG, camState.keyLightB);
      keyLight.intensity = camState.keyIntensity;

      webDevGroup.rotation.y = Math.sin(elapsedTime * 0.2) * 0.06;
      leftBrace.rotation.y = elapsedTime * 0.3;
      rightBrace.rotation.y = -elapsedTime * 0.3;

      ringX.rotation.x = elapsedTime * 0.3;
      ringY.rotation.y = -elapsedTime * 0.4;
      ringZ.rotation.z = elapsedTime * 0.2;
      coreOpenAngle.rotation.y = elapsedTime * 0.35;
      tokenGroup.rotation.z = Math.sin(elapsedTime * 0.25) * 0.12;

      cloudGroup.rotation.y = Math.sin(elapsedTime * 0.18) * 0.05;
      uiGroup.rotation.y = Math.sin(elapsedTime * 0.2) * 0.05;

      horizonGeodesic.rotation.y = elapsedTime * 0.1;
      horizonSatRing.rotation.z = elapsedTime * 0.15;
      horizonCoreBrace.rotation.y = -elapsedTime * 0.2;

      tokenMeshes.forEach((item, idx) => {
        item.mesh.position.y += Math.sin(elapsedTime * 1.2 + idx) * 0.006;
        item.mesh.rotation.z += item.rotSpeed;
        item.mesh.quaternion.copy(camera.quaternion);
      });

      if (composer) {
        composer.render();
      } else {
        renderer.render(scene, camera);
      }
    };

    tick();

    // 10. RESIZE OBSERVER
    let resizeRafId: number | null = null;
    const handleResize = () => {
      if (resizeRafId !== null) cancelAnimationFrame(resizeRafId);
      resizeRafId = requestAnimationFrame(() => {
        const width = window.innerWidth;
        const height = window.innerHeight;
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

    // 11. WAYPOINT MONITORING & INTERACTIVE RAYCASTING FOR 3D TOKENS
    const raycaster = new THREE.Raycaster();
    const mouseVector = new THREE.Vector2();

    const handlePointerDown = (e: MouseEvent) => {
      mouseVector.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseVector.y = -(e.clientY / window.innerHeight) * 2 + 1;
      raycaster.setFromCamera(mouseVector, camera);
      const intersects = raycaster.intersectObjects(tokensGroup.children);
      if (intersects.length > 0) {
        const hit = intersects[0].object as THREE.Mesh;
        const found = tokenMeshes.find(t => t.mesh === hit);
        if (found) {
          const lang = codeLanguages[tokenMeshes.indexOf(found) % codeLanguages.length];
          gsap.to(hit.scale, { x: 1.4, y: 1.4, z: 1.4, duration: 0.25, yoyo: true, repeat: 1, ease: 'power2.out' });
          const event = new CustomEvent('3d-token-click', { detail: { token: lang } });
          window.dispatchEvent(event);
        }
      }
    };

    window.addEventListener('pointerdown', handlePointerDown);

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
      window.removeEventListener('pointerdown', handlePointerDown);
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

  const [activeZone, setActiveZone] = React.useState(0);
  const [toast, setToast] = React.useState<string | null>(null);

  React.useEffect(() => {
    const handleWaypoint = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail && typeof detail.index === 'number') {
        setActiveZone(detail.index);
      }
    };

    const handleTokenClick = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail && detail.token) {
        setToast(`Interactive 3D Code Token Selected: ${detail.token}`);
        setTimeout(() => setToast(null), 3500);
      }
    };

    window.addEventListener('3d-waypoint-change', handleWaypoint);
    window.addEventListener('3d-token-click', handleTokenClick);
    return () => {
      window.removeEventListener('3d-waypoint-change', handleWaypoint);
      window.removeEventListener('3d-token-click', handleTokenClick);
    };
  }, []);

  const zones = [
    '01 / SILICON CORE & WORKSTATION',
    '02 / AI NEURAL COMPILER ORB',
    '03 / CLOUD API SERVER RACKS',
    '04 / EXPLODED UI ARCHITECTURE',
    '05 / GLOBAL CODE MATRIX'
  ];

  return (
    <>
      <div
        ref={containerRef}
        className="fixed inset-0 w-full h-full pointer-events-auto z-0 overflow-hidden cursor-grab active:cursor-grabbing"
      />

      {/* Floating Interactive 3D HUD Waypoint & Status Bar */}
      <div className="fixed bottom-6 left-6 z-20 pointer-events-none hidden sm:flex flex-col gap-2">
        <div className={`px-4 py-2.5 rounded-xl backdrop-blur-md border text-xs font-mono font-bold tracking-wider shadow-xl transition-all duration-300 ${
          theme === 'dark'
            ? 'bg-neutral-950/80 border-neutral-800 text-neutral-300 shadow-black/80'
            : 'bg-white/90 border-neutral-200 text-neutral-800 shadow-rose-900/10'
        }`}>
          <div className="flex items-center gap-2 mb-1 text-[10px] text-rose-600 uppercase tracking-widest font-extrabold">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-600 animate-ping" />
            Active 3D Architectural Zone
          </div>
          <div className="text-sm font-black tracking-tight">
            {zones[activeZone]}
          </div>
        </div>
      </div>

      {/* Interactive Token Click Toast Notification */}
      {toast && (
        <div className="fixed top-28 left-1/2 -translate-x-1/2 z-50 pointer-events-none animate-bounce">
          <div className="px-5 py-3 rounded-2xl bg-neutral-950 text-white border border-rose-600/60 shadow-2xl shadow-rose-900/50 flex items-center gap-3 text-xs font-mono font-bold tracking-wider">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
            <span>{toast}</span>
          </div>
        </div>
      )}
    </>
  );
};
