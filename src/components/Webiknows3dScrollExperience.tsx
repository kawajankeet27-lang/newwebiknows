import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Theme, Page } from '../types';

gsap.registerPlugin(ScrollTrigger);

interface Webiknows3dScrollExperienceProps {
  theme: Theme;
  currentPage?: Page | 'cms';
}

export const Webiknows3dScrollExperience: React.FC<Webiknows3dScrollExperienceProps> = ({
  theme,
  currentPage = 'home',
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [activeZone, setActiveZone] = useState(0);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Detect software WebGL / low-spec environment
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

    // 1. Scene, Camera, and Background Color
    // Ultra-premium background colors:
    // Dark: Luxurious midnight obsidian slate (0x0a0e1a) - rich contrast with crimson red and cyan
    // Light: Crisp crystal platinum alabaster (0xf1f4f9)
    const scene = new THREE.Scene();
    const isDark = theme === 'dark';

    const camera = new THREE.PerspectiveCamera(
      46,
      window.innerWidth / window.innerHeight,
      0.1,
      1200
    );
    camera.position.set(-0.8, 0.5, 18);
    camera.lookAt(1.5, 0.0, -2);

    // 2. High-Performance WebGL Renderer (with safe context creation & transparent canvas)
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: !isSoftwareGl,
        alpha: true,
        powerPreference: 'high-performance',
        stencil: false,
      });
      renderer.setClearColor(0x000000, 0); // Transparent background
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = isDark ? 1.55 : 1.35;
      renderer.shadowMap.enabled = !isSoftwareGl;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;

      container.appendChild(renderer.domElement);
    } catch (e) {
      console.warn('WebGL initialization could not be completed:', e);
      return;
    }

    // 3. Directional & Atmospheric Lighting Rig (Soft, Matte & Clean)
    const hemisphereLight = new THREE.HemisphereLight(
      isDark ? 0x38bdf8 : 0xffffff,
      isDark ? 0x991b1b : 0x1e293b,
      isDark ? 1.8 : 2.0
    );
    scene.add(hemisphereLight);

    const headlight = new THREE.PointLight(0xffffff, isDark ? 2.0 : 2.2, 90, 1.0);
    headlight.position.set(0, 0, 3);
    camera.add(headlight);
    scene.add(camera);

    // Key Light - Soft Crimson Webiknows Brand Glow
    const keyLight = new THREE.DirectionalLight(0xef4444, 3.2);
    keyLight.position.set(16, 20, 16);
    scene.add(keyLight);

    // Fill Light - Soft Cyan Cloud Glow
    const fillLight = new THREE.DirectionalLight(0x0ea5e9, 2.5);
    fillLight.position.set(-18, -6, -14);
    scene.add(fillLight);

    // Rim Light - Soft Amethyst Accent
    const rimLight = new THREE.DirectionalLight(0xc084fc, 2.5);
    rimLight.position.set(0, 18, -26);
    scene.add(rimLight);

    // 4. Post-Processing (Soft Subtle Bloom)
    let composer: EffectComposer | null = null;
    if (!isSoftwareGl) {
      try {
        composer = new EffectComposer(renderer);
        const renderPass = new RenderPass(scene, camera);
        composer.addPass(renderPass);

        const bloomPass = new UnrealBloomPass(
          new THREE.Vector2(window.innerWidth, window.innerHeight),
          0.15, // Subtle non-glare bloom
          0.25,
          0.9
        );
        composer.addPass(bloomPass);

        const outputPass = new OutputPass();
        composer.addPass(outputPass);
      } catch (err) {
        console.warn('Post-processing composer disabled:', err);
        composer = null;
      }
    }

    // 5. High-Definition Visual Materials (Matte, Refined & Less Glossy)
    const highContrastCobaltMat = new THREE.MeshStandardMaterial({
      color: isDark ? 0x2563eb : 0x1d4ed8,
      emissive: 0x1e40af,
      emissiveIntensity: 0.2,
      metalness: 0.2,
      roughness: 0.6,
    });

    const emeraldChipMat = new THREE.MeshStandardMaterial({
      color: 0x059669,
      emissive: 0x047857,
      emissiveIntensity: 0.2,
      metalness: 0.2,
      roughness: 0.6,
    });

    const cyberTerminalScreenMat = new THREE.MeshStandardMaterial({
      color: 0x0284c7,
      emissive: 0x0369a1,
      emissiveIntensity: 0.25,
      metalness: 0.2,
      roughness: 0.55,
    });

    // 3D File Folder Materials in Matte Tones
    const folderAmberMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      emissive: 0xd97706,
      emissiveIntensity: 0.25,
      metalness: 0.15,
      roughness: 0.55,
    });

    const folderCrimsonMat = new THREE.MeshStandardMaterial({
      color: 0xe11d48,
      emissive: 0xbe123c,
      emissiveIntensity: 0.25,
      metalness: 0.15,
      roughness: 0.55,
    });

    const folderCyanMat = new THREE.MeshStandardMaterial({
      color: 0x06b6d4,
      emissive: 0x0891b2,
      emissiveIntensity: 0.25,
      metalness: 0.15,
      roughness: 0.55,
    });

    const maroonCoreMat = new THREE.MeshStandardMaterial({
      color: 0x991b1b,
      emissive: 0x7f1d1d,
      emissiveIntensity: 0.35,
      metalness: 0.2,
      roughness: 0.6,
    });

    const neonCrimsonMat = new THREE.MeshStandardMaterial({
      color: 0xef4444,
      emissive: 0xdc2626,
      emissiveIntensity: 0.6,
      metalness: 0.15,
      roughness: 0.5,
    });

    const electricCyanMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x0284c7,
      emissiveIntensity: 0.6,
      metalness: 0.2,
      roughness: 0.55,
    });

    const cyberGoldMat = new THREE.MeshStandardMaterial({
      color: 0xfbbf24,
      emissive: 0xd97706,
      emissiveIntensity: 0.4,
      metalness: 0.25,
      roughness: 0.55,
    });

    const crystalGlassMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      metalness: 0.05,
      roughness: 0.45,
      transmission: isSoftwareGl ? 0 : 0.75,
      transparent: true,
      opacity: 0.8,
      ior: 1.4,
      thickness: 1.0,
    });

    const chromeMat = new THREE.MeshStandardMaterial({
      color: 0xe2e8f0,
      metalness: 0.3,
      roughness: 0.55,
    });

    // Helpers to create 3D volumetric code glyphs
    const create3dBracket = (isOpening: boolean, mat: THREE.Material) => {
      const g = new THREE.Group();
      const topBar = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.25, 0.25), mat);
      topBar.position.set(isOpening ? 0.5 : -0.5, 0.75, 0);
      topBar.rotation.z = isOpening ? -Math.PI / 4 : Math.PI / 4;
      g.add(topBar);

      const botBar = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.25, 0.25), mat);
      botBar.position.set(isOpening ? 0.5 : -0.5, -0.75, 0);
      botBar.rotation.z = isOpening ? Math.PI / 4 : -Math.PI / 4;
      g.add(botBar);
      return g;
    };

    const create3dCurly = (isLeft: boolean, mat: THREE.Material) => {
      const g = new THREE.Group();
      const s1 = new THREE.Mesh(new THREE.BoxGeometry(1.0, 0.25, 0.25), mat);
      s1.position.set(isLeft ? -0.5 : 0.5, 1.4, 0);
      s1.rotation.z = isLeft ? Math.PI / 4 : -Math.PI / 4;
      g.add(s1);

      const s2 = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.25, 0.25), mat);
      s2.position.set(isLeft ? -0.9 : 0.9, 0.5, 0);
      g.add(s2);

      const s3 = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.25, 0.25), mat);
      s3.position.set(isLeft ? -0.9 : 0.9, -0.5, 0);
      g.add(s3);

      const s4 = new THREE.Mesh(new THREE.BoxGeometry(1.0, 0.25, 0.25), mat);
      s4.position.set(isLeft ? -0.5 : 0.5, -1.4, 0);
      s4.rotation.z = isLeft ? -Math.PI / 4 : Math.PI / 4;
      g.add(s4);
      return g;
    };

    // 6. BUILD HIGH-DENSITY 3D MULTI-ZONE ECOSYSTEM
    const worldGroup = new THREE.Group();
    scene.add(worldGroup);

    // ========================================================
    // ZONE 1: SILICON PROCESSOR & HOLOGRAPHIC WORKSTATION (Z = 2 to -12)
    // ========================================================
    const zone1Group = new THREE.Group();
    zone1Group.position.set(3.5, 0.0, -4);

    // Motherboard Chip Base (Vibrant Emerald Circuit Board instead of black)
    const chipBase = new THREE.Mesh(new THREE.BoxGeometry(7.2, 0.5, 5.4), emeraldChipMat);
    chipBase.position.y = -2.4;
    zone1Group.add(chipBase);

    // Gold Processor Pins
    for (let p = 0; p < 24; p++) {
      const px = -3.2 + (p % 12) * 0.58;
      const pz = p < 12 ? 2.6 : -2.6;
      const pin = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 0.8, 12), cyberGoldMat);
      pin.position.set(px, -2.1, pz);
      zone1Group.add(pin);
    }

    // Cooling Fin Array
    for (let f = 0; f < 9; f++) {
      const fin = new THREE.Mesh(new THREE.BoxGeometry(5.8, 0.09, 4.2), chromeMat);
      fin.position.set(0, -1.9 + f * 0.18, 0);
      zone1Group.add(fin);
    }

    // Holographic Translucent Workstation Display Shell
    const displayShell = new THREE.Mesh(new THREE.BoxGeometry(7.6, 5.0, 0.4), crystalGlassMat);
    displayShell.position.set(0, 0.8, 0);
    zone1Group.add(displayShell);

    // Screen Core (Vibrant Cyber Cyan Terminal Screen instead of black)
    const screenCore = new THREE.Mesh(new THREE.BoxGeometry(7.2, 4.6, 0.15), cyberTerminalScreenMat);
    screenCore.position.set(0, 0.8, 0.05);
    zone1Group.add(screenCore);

    // Animated Code Lines on Screen
    const lineColors = [maroonCoreMat, cyberGoldMat, electricCyanMat, neonCrimsonMat, chromeMat];
    for (let l = 0; l < 6; l++) {
      const lineWidth = 2.4 + (l % 3) * 1.3;
      const lineMesh = new THREE.Mesh(new THREE.BoxGeometry(lineWidth, 0.28, 0.1), lineColors[l % lineColors.length]);
      lineMesh.position.set(-1.4 + (l % 2) * 0.4, 2.2 - l * 0.6, 0.3);
      zone1Group.add(lineMesh);
    }

    // Floating 3D Brackets around Zone 1
    const z1LeftBrace = create3dCurly(true, neonCrimsonMat);
    z1LeftBrace.position.set(-3.2, 0.8, 1.5);
    zone1Group.add(z1LeftBrace);

    const z1RightBrace = create3dCurly(false, electricCyanMat);
    z1RightBrace.position.set(3.2, 0.8, 1.5);
    zone1Group.add(z1RightBrace);

    const z1Angle = create3dBracket(true, cyberGoldMat);
    z1Angle.position.set(2.6, 2.6, 1.0);
    zone1Group.add(z1Angle);

    worldGroup.add(zone1Group);

    // ========================================================
    // ZONE 2: AI NEURAL NUCLEUS & QUANTUM COMPILER ORB (Z = -18 to -32)
    // ========================================================
    const zone2Group = new THREE.Group();
    zone2Group.position.set(-3.8, -0.2, -24);

    const glassOrb = new THREE.Mesh(new THREE.SphereGeometry(3.6, 48, 48), crystalGlassMat);
    zone2Group.add(glassOrb);

    const ringX = new THREE.Mesh(new THREE.TorusGeometry(3.0, 0.14, 16, 64), cyberGoldMat);
    zone2Group.add(ringX);

    const ringY = new THREE.Mesh(new THREE.TorusGeometry(2.5, 0.12, 16, 64), electricCyanMat);
    ringY.rotation.x = Math.PI / 2;
    zone2Group.add(ringY);

    const ringZ = new THREE.Mesh(new THREE.TorusGeometry(2.0, 0.10, 16, 64), neonCrimsonMat);
    ringZ.rotation.y = Math.PI / 4;
    zone2Group.add(ringZ);

    const innerIcosa = new THREE.Mesh(new THREE.IcosahedronGeometry(1.2, 1), maroonCoreMat);
    zone2Group.add(innerIcosa);

    const aiCoreLight = new THREE.PointLight(0xef4444, 4.5, 18);
    zone2Group.add(aiCoreLight);

    // Orbiting Satellites around Quantum Core
    const orbitingGroup = new THREE.Group();
    for (let s = 0; s < 8; s++) {
      const angle = (s / 8) * Math.PI * 2;
      const radius = 5.2;
      const sat = s % 2 === 0
        ? new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.6, 0.6), cyberGoldMat)
        : new THREE.Mesh(new THREE.OctahedronGeometry(0.5, 0), electricCyanMat);
      sat.position.set(Math.cos(angle) * radius, Math.sin(angle * 2) * 1.4, Math.sin(angle) * radius);
      orbitingGroup.add(sat);
    }
    zone2Group.add(orbitingGroup);

    worldGroup.add(zone2Group);

    // ========================================================
    // ZONE 3: MODULAR CLOUD DATA CENTERS & API RACKS (Z = -38 to -54)
    // ========================================================
    const zone3Group = new THREE.Group();
    zone3Group.position.set(4.0, 0.3, -44);

    for (let c = -1; c <= 1; c++) {
      const towerHeight = 7.0 + (c === 0 ? 1.6 : 0);
      const chassis = new THREE.Mesh(new THREE.BoxGeometry(2.4, towerHeight, 2.4), highContrastCobaltMat);
      chassis.position.set(c * 3.0, 0, 0);
      zone3Group.add(chassis);

      // Server Blade Slots & Blinking Status LEDs
      for (let s = 0; s < 10; s++) {
        const sy = -towerHeight / 2 + 0.6 + s * (towerHeight / 11);
        const blade = new THREE.Mesh(new THREE.BoxGeometry(2.1, 0.45, 0.18), chromeMat);
        blade.position.set(c * 3.0, sy, 1.2);
        zone3Group.add(blade);

        const ledMesh = new THREE.Mesh(
          new THREE.SphereGeometry(0.09, 12, 12),
          s % 2 === 0 ? neonCrimsonMat : electricCyanMat
        );
        ledMesh.position.set(c * 3.0 - 0.8, sy, 1.32);
        zone3Group.add(ledMesh);
      }
    }

    const cloudPillarBrace = create3dBracket(false, electricCyanMat);
    cloudPillarBrace.position.set(-4.6, 2.2, 0);
    zone3Group.add(cloudPillarBrace);

    const cloudPillarBrace2 = create3dCurly(true, neonCrimsonMat);
    cloudPillarBrace2.position.set(4.6, -1.8, 0);
    zone3Group.add(cloudPillarBrace2);

    worldGroup.add(zone3Group);

    // ========================================================
    // ZONE 4: 3D PROJECT FILE FOLDERS & DESIGN TOKEN CANVAS (Z = -58 to -74)
    // High-contrast vibrant folders (Amber, Ruby Crimson, Cyan & Crystal) - Zero Black
    // ========================================================
    const zone4Group = new THREE.Group();
    zone4Group.position.set(-3.8, 0.0, -64);

    const folderMats = [crystalGlassMat, folderAmberMat, folderCrimsonMat, folderCyanMat];

    for (let l = 0; l < 4; l++) {
      const folderGroup = new THREE.Group();
      folderGroup.position.set(l * 0.7, l * 0.8, l * 1.1);
      folderGroup.rotation.x = -Math.PI / 10;
      folderGroup.rotation.y = Math.PI / 7;

      // Main 3D File Folder Cover (High Contrast Colors)
      const folderCover = new THREE.Mesh(
        new THREE.BoxGeometry(7.0, 4.8, 0.16),
        folderMats[l]
      );
      folderGroup.add(folderCover);

      // Authentic 3D File Folder Top Tab
      const tab = new THREE.Mesh(
        new THREE.BoxGeometry(2.1, 0.65, 0.18),
        folderMats[l]
      );
      tab.position.set(-2.2 + l * 1.5, 2.7, 0);
      folderGroup.add(tab);

      // Inner Document File Sheets inside the Folder
      if (l > 0) {
        const fileSheet = new THREE.Mesh(
          new THREE.BoxGeometry(6.6, 4.4, 0.08),
          chromeMat
        );
        fileSheet.position.set(0, 0.15, -0.06);
        folderGroup.add(fileSheet);
      }

      // Floating UI badge components on front folder
      if (l === 0) {
        for (let b = 0; b < 3; b++) {
          const badgeMat = b === 0 ? neonCrimsonMat : b === 1 ? cyberGoldMat : electricCyanMat;
          const badge = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.55, 0.12), badgeMat);
          badge.position.set(-2.0 + b * 2.0, 1.2, 0.25);
          folderGroup.add(badge);
        }
      }

      zone4Group.add(folderGroup);
    }

    worldGroup.add(zone4Group);

    // ========================================================
    // ZONE 5: GLOBAL WEB MATRIX & DEEP HORIZON SPHERE (Z = -78 to -100)
    // ========================================================
    const zone5Group = new THREE.Group();
    zone5Group.position.set(0, 0.6, -88);

    const horizonGeodesic = new THREE.Mesh(
      new THREE.IcosahedronGeometry(6.2, 2),
      new THREE.MeshStandardMaterial({
        color: 0x0ea5e9,
        wireframe: true,
        emissive: 0x0284c7,
        emissiveIntensity: 0.6,
      })
    );
    zone5Group.add(horizonGeodesic);

    const horizonRing = new THREE.Mesh(new THREE.TorusGeometry(8.4, 0.16, 16, 64), cyberGoldMat);
    horizonRing.rotation.x = Math.PI / 3;
    zone5Group.add(horizonRing);

    const horizonCoreBrace = create3dCurly(true, neonCrimsonMat);
    horizonCoreBrace.scale.set(2.6, 2.6, 2.6);
    zone5Group.add(horizonCoreBrace);

    worldGroup.add(zone5Group);

    // ========================================================
    // SELECT 3D INTERACTIVE FLOATING TECH PODS (CLEAN, ELEGANT & BALANCED)
    // ========================================================
    const codeTechs = [
      { name: 'React', icon: '⚛', color: '#06b6d4', tag: 'UI' },
      { name: 'TypeScript', icon: 'TS', color: '#3b82f6', tag: 'LANG' },
      { name: 'Figma', icon: '❖', color: '#f43f5e', tag: 'DESIGN' },
      { name: 'Node.js', icon: '⬢', color: '#22c55e', tag: 'ENGINE' },
      { name: 'Python', icon: 'PY', color: '#eab308', tag: 'AI' },
      { name: 'Next.js', icon: '▲', color: '#ec4899', tag: 'FRAMEWORK' },
      { name: 'Tailwind', icon: '≋', color: '#0ea5e9', tag: 'STYLE' },
      { name: 'GraphQL', icon: '◈', color: '#e11d48', tag: 'API' },
      { name: 'Docker', icon: '🐳', color: '#0284c7', tag: 'OPS' },
      { name: 'PostgreSQL', icon: '🐘', color: '#6366f1', tag: 'SQL' },
    ];

    const tokensGroup = new THREE.Group();
    scene.add(tokensGroup);

    // Texture cache to prevent redundant canvas allocations
    const tokenTextureCache = new Map<string, THREE.CanvasTexture>();
    const tokenMeshes: { mesh: THREE.Mesh; rotSpeed: number; text: string }[] = [];

    // Helper to generate razor-sharp, high-contrast, crystal-clear 1024x512 badge textures
    const createTokenTexture = (techItem: { name: string; icon: string; color: string; tag: string }) => {
      const cacheKey = `${techItem.name}_${techItem.color}_v3`;
      if (tokenTextureCache.has(cacheKey)) {
        return tokenTextureCache.get(cacheKey)!;
      }

      const canvas = document.createElement('canvas');
      canvas.width = 1024;
      canvas.height = 512;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        // High-contrast, solid ultra-dark slate/obsidian container (100% opaque)
        ctx.fillStyle = '#090d16';
        ctx.beginPath();
        const x = 20, y = 20, w = 984, h = 472, r = 84;
        ctx.moveTo(x + r, y);
        ctx.arcTo(x + w, y, x + w, y + h, r);
        ctx.arcTo(x + w, y + h, x, y + h, r);
        ctx.arcTo(x, y + h, x, y, r);
        ctx.arcTo(x, y, x + w, y, r);
        ctx.closePath();
        ctx.fill();

        // Glowing vibrant outer neon border matching tech branding color
        ctx.strokeStyle = techItem.color;
        ctx.lineWidth = 26;
        ctx.shadowColor = techItem.color;
        ctx.shadowBlur = 36;
        ctx.stroke();

        // Secondary inner crisp contrast ring
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 5;
        ctx.shadowBlur = 0;
        ctx.stroke();

        // Circular Icon Badge on the Left
        ctx.fillStyle = techItem.color;
        ctx.beginPath();
        ctx.arc(175, 256, 110, 0, Math.PI * 2);
        ctx.fill();

        // Icon inside circle: Pure Solid White
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 96px system-ui, -apple-system, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(techItem.icon, 175, 258);

        // Language / Tech Name Text: ULTRA-CRISP BOLD WHITE WITH DARK CONTRAST OUTLINE
        ctx.font = '900 92px system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';
        
        // Deep contrast halo outline
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 14;
        ctx.lineJoin = 'round';
        ctx.strokeText(techItem.name, 330, 256);

        // Solid pure white fill
        ctx.fillStyle = '#ffffff';
        ctx.fillText(techItem.name, 330, 256);

        // Category Tag Badge on Top Right
        ctx.fillStyle = techItem.color;
        ctx.font = 'bold 46px monospace';
        ctx.textAlign = 'right';
        ctx.fillText(`[ ${techItem.tag} ]`, 940, 115);
      }

      // Linear filtering with no downsampling for maximum edge sharpness
      const tex = new THREE.CanvasTexture(canvas);
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.minFilter = THREE.LinearFilter;
      tex.magFilter = THREE.LinearFilter;
      tex.generateMipmaps = false;
      tex.needsUpdate = true;
      tokenTextureCache.set(cacheKey, tex);
      return tex;
    };

    const numTokens = isSoftwareGl ? 8 : 20; // Balanced, non-cluttered distribution

    for (let t = 0; t < numTokens; t++) {
      const techItem = codeTechs[t % codeTechs.length];
      const texture = createTokenTexture(techItem);

      const tokenMat = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        opacity: 0.85,
        depthWrite: false,
        side: THREE.DoubleSide,
        toneMapped: false,
      });

      // 4.2 x 2.1 Plane matches 2:1 aspect ratio cleanly
      const tokenMesh = new THREE.Mesh(new THREE.PlaneGeometry(4.2, 2.1), tokenMat);

      // Keep tokens away from center X=0 to preserve clean reading lane in center
      const side = t % 2 === 0 ? 1 : -1;
      tokenMesh.position.set(
        side * (12 + (t % 3) * 6),
        (Math.random() - 0.5) * 24,
        18 - (t * 8.5)
      );

      tokensGroup.add(tokenMesh);
      tokenMeshes.push({
        mesh: tokenMesh,
        rotSpeed: (Math.random() - 0.5) * 0.005,
        text: techItem.name,
      });
    }

    // ========================================================
    // EXPANSIVE 2,500+ DUST PARTICLE & DATA GRID FIELD
    // ========================================================
    const particleCount = isSoftwareGl ? 500 : 2500;
    const particleGeom = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    const c1 = new THREE.Color(0xef4444);
    const c2 = new THREE.Color(0x38bdf8);
    const c3 = new THREE.Color(0xfbbf24);
    const c4 = new THREE.Color(isDark ? 0xffffff : 0x0ea5e9);

    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePos[i] = (Math.random() - 0.5) * 80;
      particlePos[i + 1] = (Math.random() - 0.5) * 50;
      particlePos[i + 2] = 25 - Math.random() * 150;

      const pickColor = [c1, c2, c3, c4][Math.floor(Math.random() * 4)];
      particleColors[i] = pickColor.r;
      particleColors[i + 1] = pickColor.g;
      particleColors[i + 2] = pickColor.b;
    }

    particleGeom.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));
    particleGeom.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.38,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const particleField = new THREE.Points(particleGeom, particleMat);
    scene.add(particleField);

    // Floor Cyber Wireframe Perspective Grid (Vibrant Rose & Cyan - Zero Dull Black)
    const gridHelper = new THREE.GridHelper(160, 60, 0xef4444, isDark ? 0x0284c7 : 0xf43f5e);
    gridHelper.position.y = -8;
    gridHelper.position.z = -50;
    scene.add(gridHelper);

    // ========================================================
    // SCROLL-DRIVEN CAMERA MOTION PIPELINE (GSAP + Lenis + Native)
    // ========================================================
    const camState = {
      x: -0.8,
      y: 0.5,
      z: 18,
      lookX: 1.5,
      lookY: 0.0,
      lookZ: -2,
    };

    // Camera keyframes across 5 zones
    const zoneWaypoints = [
      { x: -0.8, y: 0.5, z: 18, lookX: 1.5, lookY: 0.0, lookZ: -2 },     // Home / Zone 1
      { x: 3.2, y: -0.6, z: -10, lookX: -1.2, lookY: 0.2, lookZ: -26 },   // Zone 2 / AI Core
      { x: -3.5, y: 0.8, z: -30, lookX: 1.5, lookY: -0.2, lookZ: -46 },   // Zone 3 / Cloud API
      { x: 3.0, y: -0.4, z: -52, lookX: -1.0, lookY: 0.2, lookZ: -68 },   // Zone 4 / UI Architecture
      { x: 0.0, y: 1.2, z: -76, lookX: 0.0, lookY: 0.0, lookZ: -95 },    // Zone 5 / Global Horizon
    ];

    // Map page to initial preferred vantage zone
    const pageZoneMap: Record<string, number> = {
      home: 0,
      services: 1,
      about: 2,
      casestudies: 3,
      team: 1,
      blogs: 3,
      contact: 4,
    };

    const targetZoneIndex = pageZoneMap[currentPage] ?? 0;

    // Direct scroll sync function
    const syncCameraWithScroll = () => {
      const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      const scrollY = window.scrollY || window.pageYOffset || 0;
      const progress = Math.min(Math.max(scrollY / maxScroll, 0), 1);

      // Smooth interpolation through waypoints
      const segmentCount = zoneWaypoints.length - 1;
      const scaledProgress = progress * segmentCount;
      const index = Math.min(Math.floor(scaledProgress), segmentCount - 1);
      const subT = scaledProgress - index;

      const pA = zoneWaypoints[index];
      const pB = zoneWaypoints[index + 1];

      // Smooth cosine easing
      const easeT = 0.5 - 0.5 * Math.cos(subT * Math.PI);

      camState.x = pA.x + (pB.x - pA.x) * easeT;
      camState.y = pA.y + (pB.y - pA.y) * easeT;
      camState.z = pA.z + (pB.z - pA.z) * easeT;
      camState.lookX = pA.lookX + (pB.lookX - pA.lookX) * easeT;
      camState.lookY = pA.lookY + (pB.lookY - pA.lookY) * easeT;
      camState.lookZ = pA.lookZ + (pB.lookZ - pA.lookZ) * easeT;

      const activeIdx = Math.min(Math.round(progress * 4), 4);
      setActiveZone(activeIdx);
    };

    window.addEventListener('scroll', syncCameraWithScroll, { passive: true });
    syncCameraWithScroll();

    // GSAP ScrollTrigger for seamless Lenis scrub synchronization
    const scrollTriggerInstance = ScrollTrigger.create({
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: () => syncCameraWithScroll(),
      onRefresh: () => syncCameraWithScroll(),
    });

    // 7. Interactive Mouse & Touch Parallax
    const targetMouse = { x: 0, y: 0 };
    const currentMouse = { x: 0, y: 0 };

    const handleMouseMove = (e: MouseEvent) => {
      targetMouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
      targetMouse.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // 8. Interactive Raycasting for 3D Click
    const raycaster = new THREE.Raycaster();
    const mouseVector = new THREE.Vector2();

    const handlePointerDown = (e: MouseEvent) => {
      mouseVector.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseVector.y = -(e.clientY / window.innerHeight) * 2 + 1;
      raycaster.setFromCamera(mouseVector, camera);

      const intersects = raycaster.intersectObjects(tokensGroup.children);
      if (intersects.length > 0) {
        const hit = intersects[0].object as THREE.Mesh;
        const found = tokenMeshes.find((t) => t.mesh === hit);
        if (found) {
          gsap.to(hit.scale, {
            x: 1.5,
            y: 1.5,
            z: 1.5,
            duration: 0.25,
            yoyo: true,
            repeat: 1,
            ease: 'power2.out',
          });
          setToast(`Interactive 3D Technology Pod: ${found.text}`);
          setTimeout(() => setToast(null), 3000);
        }
      }
    };
    window.addEventListener('pointerdown', handlePointerDown);

    // 9. Resize Handling
    let resizeTimer: number | null = null;
    const handleResize = () => {
      if (resizeTimer !== null) cancelAnimationFrame(resizeTimer);
      resizeTimer = requestAnimationFrame(() => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        camera.fov = width < 768 ? 56 : 46;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
        if (composer) {
          composer.setSize(width, height);
        }
        ScrollTrigger.refresh();
        syncCameraWithScroll();
      });
    };
    window.addEventListener('resize', handleResize);
    handleResize();

    // 10. Main Animation Render Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();
    const currentCamPos = new THREE.Vector3(camState.x, camState.y, camState.z);
    const currentLookAt = new THREE.Vector3(camState.lookX, camState.lookY, camState.lookZ);

    const tick = () => {
      animationFrameId = requestAnimationFrame(tick);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse interpolation
      currentMouse.x += (targetMouse.x - currentMouse.x) * 0.06;
      currentMouse.y += (targetMouse.y - currentMouse.y) * 0.06;

      // Camera positions with mouse parallax
      const targetX = camState.x + currentMouse.x * 0.5;
      const targetY = camState.y - currentMouse.y * 0.4;
      const targetZ = camState.z;

      const targetLookX = camState.lookX + currentMouse.x * 0.25;
      const targetLookY = camState.lookY - currentMouse.y * 0.2;
      const targetLookZ = camState.lookZ;

      currentCamPos.x += (targetX - currentCamPos.x) * 0.12;
      currentCamPos.y += (targetY - currentCamPos.y) * 0.12;
      currentCamPos.z += (targetZ - currentCamPos.z) * 0.12;

      currentLookAt.x += (targetLookX - currentLookAt.x) * 0.12;
      currentLookAt.y += (targetLookY - currentLookAt.y) * 0.12;
      currentLookAt.z += (targetLookZ - currentLookAt.z) * 0.12;

      camera.position.set(currentCamPos.x, currentCamPos.y, currentCamPos.z);
      camera.lookAt(currentLookAt.x, currentLookAt.y, currentLookAt.z);

      // Dynamic light tracking
      keyLight.position.set(
        currentCamPos.x + 12 + currentMouse.x * 2,
        currentCamPos.y + 14 - currentMouse.y * 2,
        currentCamPos.z + 8
      );

      // Model rotations and micro-animations
      zone1Group.rotation.y = Math.sin(elapsedTime * 0.25) * 0.05;
      z1LeftBrace.rotation.y = elapsedTime * 0.4;
      z1RightBrace.rotation.y = -elapsedTime * 0.4;

      ringX.rotation.x = elapsedTime * 0.4;
      ringY.rotation.y = -elapsedTime * 0.45;
      ringZ.rotation.z = elapsedTime * 0.3;
      innerIcosa.rotation.x = elapsedTime * 0.5;
      innerIcosa.rotation.y = elapsedTime * 0.6;
      orbitingGroup.rotation.z = elapsedTime * 0.3;

      zone3Group.rotation.y = Math.sin(elapsedTime * 0.2) * 0.04;
      zone4Group.rotation.y = Math.sin(elapsedTime * 0.22) * 0.04;

      horizonGeodesic.rotation.y = elapsedTime * 0.12;
      horizonRing.rotation.z = elapsedTime * 0.18;
      horizonCoreBrace.rotation.y = -elapsedTime * 0.25;

      // Particle floating drift
      particleField.rotation.y = elapsedTime * 0.015;

      // Billboard tokens to face camera with subtle floating bob and correct non-mirrored orientation
      tokenMeshes.forEach((item, idx) => {
        item.mesh.position.y += Math.sin(elapsedTime * 1.4 + idx) * 0.005;
        item.mesh.rotation.z += item.rotSpeed;
        item.mesh.quaternion.copy(camera.quaternion);
      });

      try {
        if (composer) {
          composer.render();
        } else {
          renderer.render(scene, camera);
        }
      } catch (renderError) {
        console.warn('WebGL postprocessing or render loop fallback triggered:', renderError);
        composer = null;
        try {
          renderer.render(scene, camera);
        } catch {
          // If WebGL context is completely lost, stop the animation loop cleanly
          cancelAnimationFrame(animationFrameId);
        }
      }
    };

    tick();

    return () => {
      window.removeEventListener('scroll', syncCameraWithScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (resizeTimer !== null) cancelAnimationFrame(resizeTimer);

      scrollTriggerInstance.kill();
      scene.clear();
      tokenTextureCache.forEach((tex) => tex.dispose());
      renderer.dispose();
      if (container && renderer.domElement && renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [theme, currentPage]);

  const zones = [
    '01 / SILICON PROCESSOR & WORKSTATION',
    '02 / AI NEURAL NUCLEUS & QUANTUM ORB',
    '03 / HIGH-SPEED CLOUD DATA CENTERS',
    '04 / EXPLODED UI ARCHITECTURE & DESIGN TOKENS',
    '05 / GLOBAL WEB MATRIX & HORIZON SPHERE',
  ];

  return (
    <>
      {/* Full Page 3D Viewport Canvas */}
      <div
        ref={containerRef}
        className="fixed inset-0 w-full h-full pointer-events-auto z-0 overflow-hidden cursor-grab active:cursor-grabbing"
      />


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
