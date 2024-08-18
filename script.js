window.addEventListener('DOMContentLoaded', function() {
    const canvas = document.createElement('canvas');
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    document.body.appendChild(canvas);

    const engine = new BABYLON.Engine(canvas, true);
    const scene = new BABYLON.Scene(engine);

    // Ajout de l'image panoramique comme fond
    const backgroundMaterial = new BABYLON.StandardMaterial("backgroundMaterial", scene);
    backgroundMaterial.diffuseTexture = new BABYLON.Texture("https://content.app-sources.com/s/575462982018629301/uploads/Animation/pretville_street_4k-3928055.webp", scene);
    backgroundMaterial.diffuseTexture.uScale = -1; // Ajuste le sens horizontal si nécessaire
    backgroundMaterial.diffuseTexture.vScale = 1;  // Ajuste le sens vertical si nécessaire

    // Créer un plan pour appliquer l'image panoramique
    const backgroundPlane = BABYLON.MeshBuilder.CreatePlane("backgroundPlane", {width: 1000, height: 500}, scene);
    backgroundPlane.material = backgroundMaterial;
    backgroundPlane.position.z = -10; // Positionner derrière le modèle 3D

    const camera = new BABYLON.ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 2, 5, BABYLON.Vector3.Zero(), scene);
    camera.attachControl(canvas, true);

    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0), scene);
    light.intensity = 0.7;

    // Vérifier si l'URL du modèle fonctionne
    console.log("Chargement du modèle 3D...");

    BABYLON.SceneLoader.Append("https://eddy-chahed.github.io/3D-Model-Project/", "smartphone.glb", scene, function () {
        console.log("Modèle chargé avec succès !");
    }, function (scene, message) {
        console.error("Erreur lors du chargement du modèle:", message);
    });

    // Fonction de rotation du plan en arrière-plan
    engine.runRenderLoop(function() {
        backgroundPlane.rotation.y += 0.001; // Vitesse de rotation ajustable
        scene.render();
    });

    window.addEventListener('resize', function() {
        engine.resize();
    });
});
