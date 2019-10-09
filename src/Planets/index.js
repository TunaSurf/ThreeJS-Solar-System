import * as THREE from "three";

import planetList, { starList } from "./planetList";

const PLAYBACK_SPEED = 0.0001;
const ORBIT_NORMALIZE = 0.8;

class CelestialBody {
  constructor({ name, radius }) {
    this.name = name;
    this.geometry = new THREE.SphereGeometry(radius, 32, 32);
  }
}

class Planet extends CelestialBody {
  constructor({ name, radius, color, orbitRadius, period }, star) {
    super({ name, radius });

    this.material = new THREE.MeshLambertMaterial({ color });
    this.mesh = new THREE.Mesh(this.geometry, this.material);

    this.orbitRadius = orbitRadius;
    this.period = period;
    this.star = star;

    this.orbit = this.orbit.bind(this);
  }

  addPlanet() {
    this.mesh.userData = {
      name: this.name
    };

    return this.mesh;
  }

  orbit() {
    return this.orbitRadius * ORBIT_NORMALIZE + this.star.radius;
  }

  angularVelocity() {
    return PLAYBACK_SPEED / this.period;
  }

  orbitPath() {
    const orbitRadius = this.orbit();
    const geometry = new THREE.RingGeometry(orbitRadius - 0.2, orbitRadius, 64);
    const material = new THREE.MeshBasicMaterial({
      color: 0x777788,
      side: THREE.DoubleSide
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.rotateX(Math.PI / 2);
    return mesh;
  }
}

class Star extends CelestialBody {
  constructor({ name, radius, color }) {
    super({ name, radius });

    this.material = new THREE.MeshLambertMaterial({
      color,
      emissive: color,
      emissiveIntensity: 0.7
    });
    this.mesh = new THREE.Mesh(this.geometry, this.material);

    this.pointLight = new THREE.PointLight(0xffffff, 1, 1000);
    this.pointLightWithMesh = this.pointLight.add(this.mesh);
  }
}

const sun = new Star(starList.sun);

const planets = Object.keys(planetList).map(planet => {
  return new Planet(planetList[planet], starList.sun);
});

export { sun };
export default planets;
