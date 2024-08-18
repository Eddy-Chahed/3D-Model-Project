window.addEventListener('DOMContentLoaded', function() {
    // Création de la scène Babylon.js
    const canvas = document.createElement('canvas');
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    document.body.appendChild(canvas);

    const engine = new BABYLON.Engine(canvas, true);
    const scene = new BABYLON.Scene(engine);

    // Création de la caméra
    const camera = new BABYLON.ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 2, 5, BABYLON.Vector3.Zero(), scene);
    camera.attachControl(canvas, true);

    // Lumière hémisphérique
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0), scene);
    light.intensity = 0.7;

    // Charger le modèle .glb depuis le serveur Simvoly
    BABYLON.SceneLoader.Append("", "https://content.app-sources.com/s/575462982018629301/uploads/Animation/smartphone-3990373.glb", scene, function (scene) {
        // Modèle chargé avec succès
        console.log("Modèle chargé avec succès.");
    }, function (scene, message) {
        console.error("Erreur lors du chargement du modèle:", message);
    });

    // Boucle de rendu
    engine.runRenderLoop(function() {
        scene.render();
    });

    // Adapter la scène lors du redimensionnement
    window.addEventListener('resize', function() {
        engine.resize();
    });
});
