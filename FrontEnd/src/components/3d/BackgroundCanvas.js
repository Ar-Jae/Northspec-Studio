"use client";

import { useEffect, useRef } from "react";

export default function BackgroundCanvas() {
  const mountRef = useRef(null);

  useEffect(() => {
    let THREE;
    let animId;
    let renderer, scene, camera, particles, shapes = [];

    async function init() {
      THREE = (await import("three")).default || (await import("three"));

      if (!mountRef.current) return;

      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(
        60,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      camera.position.set(0, 0, 10);

      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(0x000000, 0);
      mountRef.current.appendChild(renderer.domElement);

      // ── Particle field ──────────────────────────────────────────────────────
      const count = window.innerWidth < 768 ? 400 : 800;
      const positions = new Float32Array(count * 3);
      const sizes = new Float32Array(count);

      for (let i = 0; i < count; i++) {
        positions[i * 3]     = (Math.random() - 0.5) * 60;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 60;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 40;
        sizes[i] = Math.random() * 0.05 + 0.01;
      }

      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      pGeo.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

      const pMat = new THREE.PointsMaterial({
        size: 0.04,
        color: 0xc6a668,
        transparent: true,
        opacity: 0.25,
        sizeAttenuation: true,
        blending: THREE.AdditiveBlending
      });

      particles = new THREE.Points(pGeo, pMat);
      scene.add(particles);

      // ── Floating Wireframe Grid System ──────────────────────────────────────
      // Create a large architectural wireframe grid
      const gridCount = 5;
      for (let i = 0; i < gridCount; i++) {
        const gridHelper = new THREE.GridHelper(40, 20, 0xc6a668, 0xc6a668);
        gridHelper.material.transparent = true;
        gridHelper.material.opacity = 0.05;
        gridHelper.position.y = (i - gridCount/2) * 15;
        gridHelper.rotation.x = Math.PI / 2;
        scene.add(gridHelper);
        shapes.push(Object.assign(gridHelper, { userData: { rotSpeed: { x: 0.0001, y: 0.0002 }, baseY: gridHelper.position.y } }));
      }

      // ── Neural Network Nodes ────────────────────────────────────────────────
      const nodeCount = 12;
      const nodeGeo = new THREE.IcosahedronGeometry(0.15, 1);
      const nodeMat = new THREE.MeshBasicMaterial({ color: 0xc6a668, transparent: true, opacity: 0.4 });
      
      for (let i = 0; i < nodeCount; i++) {
        const node = new THREE.Mesh(nodeGeo, nodeMat);
        node.position.set(
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 10
        );
        node.userData = { 
          velocity: new THREE.Vector3((Math.random() - 0.5) * 0.02, (Math.random() - 0.5) * 0.02, (Math.random() - 0.5) * 0.01),
          rotSpeed: { x: Math.random() * 0.01, y: Math.random() * 0.01 },
          baseY: node.position.y
        };
        scene.add(node);
        shapes.push(node);
      }

      // ── Large Data Flow Rings ───────────────────────────────────────────────
      const ringGeo = new THREE.TorusGeometry(15, 0.02, 16, 100);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0xc6a668,
        transparent: true,
        opacity: 0.06,
      });
      
      for (let i = 0; i < 3; i++) {
        const ring = new THREE.Mesh(ringGeo, ringMat);
        ring.rotation.x = Math.PI / (2 + i);
        ring.rotation.z = Math.PI / (4 + i);
        scene.add(ring);
        shapes.push(Object.assign(ring, { userData: { rotSpeed: { x: 0.0005, y: 0.0008 * (i+1) }, baseY: 0 } }));
      }

      // ── Scroll & mouse parallax ──────────────────────────────────────────────
      let scrollY = 0;
      let mouseX = 0;
      let mouseY = 0;

      const onScroll = () => {
        scrollY = window.scrollY;
      };

      const onMouseMove = (e) => {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
      };

      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("mousemove", onMouseMove, { passive: true });

      // ── Resize ───────────────────────────────────────────────────────────────
      const onResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };
      window.addEventListener("resize", onResize);

      // ── Animation loop ───────────────────────────────────────────────────────
      let time = 0;

      const animate = () => {
        animId = requestAnimationFrame(animate);
        time += 0.008;

        // Particles drift
        particles.rotation.y = time * 0.018;
        particles.rotation.x = time * 0.009;

        // Scroll: camera pulls back + tilts
        const maxScroll = document.body.scrollHeight - window.innerHeight;
        const progress = maxScroll > 0 ? scrollY / maxScroll : 0;
        camera.position.z = 10 - progress * 4;
        camera.position.y = -progress * 2;

        // Mouse parallax on camera
        camera.position.x += (mouseX * 0.6 - camera.position.x) * 0.05;

        // Animate floating shapes
        shapes.forEach((s, i) => {
          s.rotation.x += s.userData.rotSpeed.x;
          s.rotation.y += s.userData.rotSpeed.y;
          s.position.y =
            s.userData.baseY + Math.sin(time * 0.4 + i * 1.3) * 0.5;
        });

        renderer.render(scene, camera);
      };

      animate();

      // cleanup stored so teardown can find them
      mountRef.current.__cleanup = () => {
        cancelAnimationFrame(animId);
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("mousemove", onMouseMove);
        window.removeEventListener("resize", onResize);
        renderer.dispose();
      };
    }

    init();

    return () => {
      if (mountRef.current?.__cleanup) mountRef.current.__cleanup();
      if (renderer && mountRef.current?.contains(renderer.domElement)) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    />
  );
}
