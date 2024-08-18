// script.js

// Création de la scène Babylon.js
var canvas = document.getElementById("renderCanvas");
var engine = new BABYLON.Engine(canvas, true);

var createScene = function () {
    var scene = new BABYLON.Scene(engine);

    // Ajout d'une caméra et de la lumière
    var camera = new BABYLON.ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 4, 4, BABYLON.Vector3.Zero(), scene);
    camera.attachControl(canvas, true);

    var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(1, 1, 0), scene);
    light.intensity = 0.7;

    // Chargement du modèle GLTF
    BABYLON.SceneLoader.Append("assets/scene.gltf", "", scene, function (scene) {
        console.log("Modèle chargé avec succès !");
    }, null, function(scene, message) {
        console.error("Erreur lors du chargement du modèle:", message);
    });

    return scene;
};

var scene = createScene();
engine.runRenderLoop(function () {
    scene.render();
});

window.addEventListener("resize", function () {
    engine.resize();
});
