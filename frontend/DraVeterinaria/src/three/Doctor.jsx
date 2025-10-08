// Syringe.jsx
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import React, { useEffect, useRef } from "react";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const Syringe = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const w = container.clientWidth;
    const h = container.clientHeight;

    // Rendererizador
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    // Escena 
    const scene = new THREE.Scene();

    // Cámara
    const camera = new THREE.PerspectiveCamera(35, w / h, 0.1, 100);
    camera.position.z = 1;

    // Luz
    const light = new THREE.DirectionalLight(0xffffff, 2);
    light.position.set(2, 2, 3);
    scene.add(light);

    const spotlight = new THREE.SpotLight(0xffffff, 2); // color, intensidad
spotlight.position.set(5, 8, 5); // posición arriba del objeto
spotlight.angle = Math.PI / 6; // apertura del cono de luz
spotlight.penumbra = 0.3; // suaviza los bordes
spotlight.decay = 2; // atenuación con la distancia
spotlight.distance = 30; // hasta dónde llega la luz

// sombras
spotlight.castShadow = true;
spotlight.shadow.mapSize.width = 1024;
spotlight.shadow.mapSize.height = 1024;

// Añadir al scene
scene.add(spotlight);



    // Loader
    const loader = new GLTFLoader();
    loader.load(
      "/models/female_doctor_lowpoly_asset.glb",
      (gltf) => {
        const model = gltf.scene;
        model.scale.set(0.3, 0.3, 0.5);
        model.position.set(-0.1, -0.3, 0);
        scene.add(model);

        // Animación
        const animate = () => {
          requestAnimationFrame(animate);
          model.rotation.y += 0.001;
          
          renderer.render(scene, camera);
        };
        animate();
      },
      undefined,
      (error) => console.error("Error al cargar modelo:", error)
    );

    // Controles 
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enableZoom = false;
    controls.enablePan = false;

    // Limpieza
    return () => {
      renderer.dispose();
      container.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="h-40 w-40 bg-transparent cursor-pointer flex justify-center items-center"
    />
  );
};

export default Syringe;
