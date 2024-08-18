document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.createElement('canvas');
    document.body.appendChild(canvas);

    const engine = new BABYLON.Engine(canvas, true);
    const scene = new BABYLON.Scene(engine);

    // Ajout de la caméra
    const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2, 5, BABYLON.Vector3.Zero(), scene);
    camera.attachControl(canvas, true);

    // Lumière dans la scène
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0), scene);
    light.intensity = 0.7;

    // Chargement de l'image de fond
    const background = new BABYLON.Layer('background', 'assets/pretville_street_4k-3928055.webp', scene);

    // Chargement du modèle GLTF
    BABYLON.SceneLoader.Append("./assets/", "scene.gltf", scene, function () {
        console.log("Modèle chargé avec succès !");
        scene.createDefaultCameraOrLight(true, true, true);
    }, function (progress) {
        console.log(`Chargement du modèle : ${progress.loaded}/${progress.total} bytes`);
    }, function (scene, message, exception) {
        console.error("Erreur lors du chargement du modèle : " + message, exception);
    });

    // Render Loop
    engine.runRenderLoop(() => {
        scene.render();
    });

    // Redimensionnement
    window.addEventListener('resize', () => {
        engine.resize();
    });
});
