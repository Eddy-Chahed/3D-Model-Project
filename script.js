let scene, camera, renderer, controls, skybox, smartphone;

function init() {
    // Création de la scène
    scene = new THREE.Scene();

    // Configuration de la caméra
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 1, 5);

    // Configuration du rendu
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.5; // Ajuste l'exposition pour plus de luminosité
    document.body.appendChild(renderer.domElement);

    // Lumière ambiante
    const ambientLight = new THREE.AmbientLight(0xffffff, 2.5); // Éclaire la scène uniformément
    scene.add(ambientLight);

    // Charger et configurer l'image de fond (skybox)
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load('assets/pretville_street_4k-3928055.webp', function(texture) {
        texture.encoding = THREE.sRGBEncoding;
        texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
        texture.minFilter = THREE.LinearFilter;
        texture.magFilter = THREE.LinearFilter;

        const geometry = new THREE.SphereGeometry(500, 60, 40);
        geometry.scale(-1, 1, 1); // Inverser la géométrie pour que l'intérieur soit visible
        const material = new THREE.MeshBasicMaterial({ map: texture });
        material.color.setHSL(0, 0.3, 1.3); // Augmente la saturation et la luminosité
        skybox = new THREE.Mesh(geometry, material);
        scene.add(skybox);

        animate();
    });

    // Charger le modèle 3D du smartphone
    const gltfLoader = new THREE.GLTFLoader();
    gltfLoader.load('smartphone.glb', function(gltf) {
        smartphone = gltf.scene;
        smartphone.position.set(0, 0, 0);  // Positionne le modèle au centre de la scène
        smartphone.scale.set(0.5, 0.5, 0.5);  // Ajuste l'échelle si nécessaire
        scene.add(smartphone);
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

    // Faire tourner l'image de fond
    if (skybox) {
        skybox.rotation.y += 0.001; // Rotation lente pour un effet immersif
    }

    // Faire tourner le smartphone
    if (smartphone) {
        smartphone.rotation.y += 0.01;
    }

    controls.update();
    renderer.render(scene, camera);
}

init();
