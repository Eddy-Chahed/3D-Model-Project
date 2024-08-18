window.addEventListener('DOMContentLoaded', function() {
    const canvas = document.createElement('canvas');
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    document.body.appendChild(canvas);

    const engine = new BABYLON.Engine(canvas, true);
    const scene = new BABYLON.Scene(engine);

    // Créer une sphère pour l'image panoramique
    const skySphere = BABYLON.MeshBuilder.CreateSphere("skySphere", {segments: 32, diameter: 1000}, scene);
    const skySphereMaterial = new BABYLON.StandardMaterial("skySphereMaterial", scene);
    skySphereMaterial.backFaceCulling = false; // Pour que la texture soit visible de l'intérieur de la sphère

    // Charger la texture panoramique
    const texture = new BABYLON.Texture("https://content.app-sources.com/s/575462982018629301/uploads/Animation/pretville_street_4k-3928055.webp", scene, false, false, BABYLON.Texture.BILINEAR_SAMPLINGMODE, function() {
        console.log("Texture chargée avec succès !");
        skySphereMaterial.diffuseTexture = texture;
    }, function(message) {
        console.error("Erreur lors du chargement de la texture :", message);
    });

    // Appliquer la texture à la skySphere avec l'orientation corrigée
    skySphereMaterial.diffuseTexture = texture;
    skySphereMaterial.diffuseTexture.wrapU = BABYLON.Texture.CLAMP_ADDRESSMODE;
    skySphereMaterial.diffuseTexture.wrapV = BABYLON.Texture.CLAMP_ADDRESSMODE;
    skySphere.material = skySphereMaterial;

    // Inverse la normale pour que la texture soit visible de l'intérieur de la sphère
    skySphere.scaling.x = -1;

    // Corriger l'orientation de la texture en inversant autour de l'axe Y
    skySphere.rotation.x = Math.PI;

    const camera = new BABYLON.ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 2, 5, BABYLON.Vector3.Zero(), scene);
    camera.attachControl(canvas, true);

    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0), scene);
    light.intensity = 0.7;

    // Charger le modèle GLB
    console.log("Chargement du modèle 3D...");
    BABYLON.SceneLoader.Append("https://eddy-chahed.github.io/3D-Model-Project/", "smartphone.glb", scene, function () {
        console.log("Modèle chargé avec succès !");
    }, function (scene, message) {
        console.error("Erreur lors du chargement du modèle :", message);
    });

    // Rotation de la skySphere
    engine.runRenderLoop(function() {
        skySphere.rotation.y += 0.001; // Ajustez cette valeur pour modifier la vitesse de rotation
        scene.render();
    });

    window.addEventListener('resize', function() {
        engine.resize();
    });

    console.log("Scène initialisée.");
});
