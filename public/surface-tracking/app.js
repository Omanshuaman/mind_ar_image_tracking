// ====== Imports ======

import OnirixSDK from "./onitrix.js";
import * as THREE from "https://cdn.skypack.dev/three@0.127.0";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.127.0/examples/jsm/loaders/GLTFLoader.js";
import { UnrealBloomPass } from "https://cdn.skypack.dev/three@0.127.0/examples/jsm/postprocessing/UnrealBloomPass.js";
import { EffectComposer } from "https://cdn.skypack.dev/three@0.127.0/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "https://cdn.skypack.dev/three@0.127.0/examples/jsm/postprocessing/RenderPass.js";

import { GlitchPass } from "https://cdn.skypack.dev/three@0.127.0/examples/jsm/postprocessing/GlitchPass.js";
// ====== ThreeJS ======
const params = {
  threshold: 0,
  strength: 1,
  radius: 0,
  exposure: 1,
};

var renderer,
  scene,
  camera,
  floor,
  raycaster,
  clock,
  animationMixers,
  started,
  width,
  height;

var composer;
function setupPostprocessing(rendererCanvas) {
  const width = rendererCanvas.width;
  const height = rendererCanvas.height;
  console.log(width);
  console.log(height);

  const renderPass = new RenderPass(scene, camera);

  const bloomPass = new UnrealBloomPass(
    new THREE.Vector2(width, height),
    1.5,
    0.4,
    0.85
  );
  bloomPass.threshold = params.threshold;
  bloomPass.strength = params.strength;
  bloomPass.radius = params.radius;

  composer = new EffectComposer(renderer);
  composer.addPass(renderPass);
  composer.addPass(bloomPass);
}
function setupRenderer(rendererCanvas) {
  width = rendererCanvas.width;
  height = rendererCanvas.height;

  // Initialize renderer with rendererCanvas provided by Onirix SDK
  renderer = new THREE.WebGLRenderer({ canvas: rendererCanvas, alpha: true });
  renderer.setClearColor(0x000000, 0);
  renderer.setSize(width, height);

  // Ask Onirix SDK for camera parameters to create a 3D camera that fits with the AR projection.
  const cameraParams = OX.getCameraParameters();
  camera = new THREE.PerspectiveCamera(
    cameraParams.fov,
    cameraParams.aspect,
    0.1,
    1000
  );
  camera.matrixAutoUpdate = false;

  // Create an empty scene
  scene = new THREE.Scene();

  // Add some lights
  const hemisphereLight = new THREE.HemisphereLight(0xbbbbff, 0x444422);
  scene.add(hemisphereLight);
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(0, 10, 0);
  scene.add(directionalLight);

  // Add transparent floor for model placement using raycasting
  floor = new THREE.Mesh(
    new THREE.PlaneGeometry(100, 100),
    new THREE.MeshBasicMaterial({
      color: 0xff00ff,
      transparent: true,
      opacity: 0.0,
      side: THREE.DoubleSide,
    })
  );

  // Rotate floor to be horizontal and place it 1 meter below camera
  floor.rotateX(Math.PI / 2);
  floor.position.set(0, -1, 0);
  scene.add(floor);

  // Create a raycaster
  raycaster = new THREE.Raycaster();

  animationMixers = [];
  clock = new THREE.Clock(true);
}

function updatePose(pose) {
  // When a new pose is detected, update the 3D camera
  let modelViewMatrix = new THREE.Matrix4();
  modelViewMatrix = modelViewMatrix.fromArray(pose);
  camera.matrix = modelViewMatrix;
  camera.matrixWorldNeedsUpdate = true;
}

function onResize() {
  // When device orientation changes, it is required to update camera params.
  const width = renderer.domElement.width;
  const height = renderer.domElement.height;
  const cameraParams = OX.getCameraParameters();
  camera.fov = cameraParams.fov;
  camera.aspect = cameraParams.aspect;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
}

function render() {
  // Just render the scene
  composer.render();
}

function onTouch(touchPos) {
  // Raycast
  raycaster.setFromCamera(touchPos, camera);
  const intersects = raycaster.intersectObject(floor);

  if (intersects.length > 0 && intersects[0].object == floor) {
    // Load a 3D model and add it to the scene over touched position
    const gltfLoader = new GLTFLoader();
    gltfLoader.load(
      "https://res.cloudinary.com/dd3c4j1sm/image/upload/v1704371477/groot_dancing_dpkibq.glb",
      (gltf) => {
        const model = gltf.scene;
        const animations = gltf.animations;
        model.scale.set(0.1, 0.1, 0.1);

        model.position.set(
          intersects[0].point.x,
          intersects[0].point.y,
          intersects[0].point.z
        );
        // Model looking to the camera on Y axis
        model.rotation.y = Math.atan2(
          camera.position.x - model.position.x,
          camera.position.z - model.position.z
        );

        scene.add(model);
        // Play model animation
        const mixer = new THREE.AnimationMixer(model);
        const action = mixer.clipAction(animations[0]);
        action.play();
        animationMixers.push(mixer);
      }
    );

    if (!started) {
      // Start tracking on first touch
      OX.start();
      started = true;
    }
  }
}

// ====== Onirix SDK ======

const OX = new OnirixSDK("");

const config = {
  mode: OnirixSDK.TrackingMode.Surface,
};

OX.init(config)
  .then((rendererCanvas) => {
    started = false;

    // Setup ThreeJS renderer
    setupRenderer(rendererCanvas);
    setupPostprocessing(rendererCanvas);

    // All loaded, so hide loading screen
    document.getElementById("loading-screen").style.display = "none";

    // Subscribe to events
    OX.subscribe(OnirixSDK.Events.OnPose, function (pose) {
      updatePose(pose);
    });

    OX.subscribe(OnirixSDK.Events.OnResize, function () {
      onResize();
    });

    OX.subscribe(OnirixSDK.Events.OnTouch, function (touchPos) {
      onTouch(touchPos);
    });

    OX.subscribe(OnirixSDK.Events.OnFrame, function () {
      const delta = clock.getDelta();
      animationMixers.forEach((mixer) => {
        mixer.update(delta);
      });
      render();
    });
  })
  .catch((error) => {
    // An error ocurred, chech error type and display it
    document.getElementById("loading-screen").style.display = "none";

    switch (error.name) {
      case "INTERNAL_ERROR":
        document.getElementById("error-title").innerText = "Internal Error";
        document.getElementById("error-message").innerText =
          "An unespecified error has occurred. Your device might not be compatible with this experience.";
        break;

      case "CAMERA_ERROR":
        document.getElementById("error-title").innerText = "Camera Error";
        document.getElementById("error-message").innerText =
          "Could not access to your device's camera. Please, ensure you have given required permissions from your browser settings.";
        break;

      case "SENSORS_ERROR":
        document.getElementById("error-title").innerText = "Sensors Error";
        document.getElementById("error-message").innerText =
          "Could not access to your device's motion sensors. Please, ensure you have given required permissions from your browser settings.";
        break;

      case "LICENSE_ERROR":
        document.getElementById("error-title").innerText = "License Error";
        document.getElementById("error-message").innerText =
          "This experience does not exist or has been unpublished.";
        break;
    }

    document.getElementById("error-screen").style.display = "flex";
  });
