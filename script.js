window.addEventListener('DOMContentLoaded', function() {
    const canvas = document.createElement('canvas');
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    document.body.appendChild(canvas);

    const engine = new BABYLON.Engine(canvas, true);
    const scene = new BABYLON.Scene(engine);

    const camera = new BABYLON.ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 2, 5, BABYLON.Vector3.Zero(), scene);
    camera.attachControl(canvas, true);

    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0), scene);
    light.intensity = 0.7;

    // Utilisation de l'URL GitHub Pages pour charger le modèle 3D
    console.log("Chargement du modèle 3D...");

    BABYLON.SceneLoader.Append("", "https://eddy-chahed.github.io/3D-Model-Project/smartphone.glb", scene, function () {
        console.log("Modèle chargé avec succès !");
    }, function (scene, message) {
        console.error("Erreur lors du chargement du modèle:", message);
    });

    engine.runRenderLoop(function() {
        scene.render();
    });

    window.addEventListener('resize', function() {
        engine.resize();
    });
});
