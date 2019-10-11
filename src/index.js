import * as THREE from "three";

import planets, { sun } from "./Planets";

window.onload = () => {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  // Add each planet to a group and then the scene, along with their orbit path
  let planetGroup = new THREE.Group();

  planets.forEach(planet => {
    planetGroup.add(planet.addPlanet());
    scene.add(planet.orbitPath());
  });
  scene.add(planetGroup);

  camera.position.set(0, 25, 100);
  camera.lookAt(new THREE.Vector3(0, 0, 0));

  // *** LIGHTING ***
  // SET SUN
  const sunLight = sun.pointLightWithMesh;
  sunLight.position.set(0, 0, 0);
  scene.add(sunLight);
  // LIGHT UP ENTIRE SCENE
  const ambientLight = new THREE.AmbientLight(0x404040);
  scene.add(ambientLight);

  // *** RAYCASTING ***
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  function onMouseMove(event) {
    // calculate mouse position in normalized device coordinates
    // (-1 to +1) for both components
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  }

  // *** ANIMATION OF SCENE ***
  const planetNameElement = document.getElementById("planet-name");

  function animate() {
    requestAnimationFrame(animate);
    const time = Date.now();

    planets.forEach(planet => {
      const angle = time * planet.angularVelocity();

      planet.mesh.position.set(
        Math.cos(angle) * planet.orbit(),
        0,
        Math.sin(angle) * planet.orbit()
      );
    });

    // update the picking ray with the camera and mouse position
    raycaster.setFromCamera(mouse, camera);
    // calculate objects in planetGroup intersecting the picking ray
    const intersects = raycaster.intersectObjects(planetGroup.children);

    if (intersects.length === 0) {
      if (planetNameElement.innerHTML !== "") {
        planetNameElement.innerHTML = "";
      }
    }
    for (var i = 0; i < intersects.length; i++) {
      const hovering = intersects[i].object.userData.name;

      if (planetNameElement.innerHTML !== hovering) {
        planetNameElement.innerHTML = hovering;
      }
    }

    renderer.render(scene, camera);
  }

  window.addEventListener("mousemove", onMouseMove, false);

  animate();
};
