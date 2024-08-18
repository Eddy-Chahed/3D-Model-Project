let scene, camera, renderer, controls, smartphone;

function init() {
    // Création de la scène
    scene = new THREE.Scene();

    // Configuration de la caméra
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 1, 5);

    // Configuration du rendu
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Lumière ambiante
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.5); // Lumière pour éclairer la scène
    scene.add(ambientLight);

    // Charger le modèle 3D du smartphone
    const gltfLoader = new THREE.GLTFLoader();
    gltfLoader.load('https://github.com/Eddy-Chahed/3D-Model-Project/raw/main/smartphone.glb', function(gltf) {
        smartphone = gltf.scene;
        smartphone.position.set(0, 0, 0);  // Positionne le modèle au centre de la scène
        smartphone.scale.set(0.5, 0.5, 0.5);  // Ajuste l'échelle si nécessaire
        scene.add(smartphone);
        animate();
    }, undefined, function(error) {
        console.error('Erreur lors du chargement du modèle:', error);
    });

    // Configurer les contrôles de la caméra
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.enableZoom = true;

    // Redimensionner la fenêtre
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

function animate() {
    requestAnimationFrame(animate);

    if (smartphone) {
        smartphone.rotation.y += 0.01;  // Rotation du modèle pour le voir sous tous les angles
    }

    controls.update();
    renderer.render(scene, camera);
}

init();
