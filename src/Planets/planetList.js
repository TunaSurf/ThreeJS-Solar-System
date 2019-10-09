const planetList = {
  mercury: {
    name: "Mercury",
    radius: 1,
    color: 0xd4934e,
    orbitRadius: 5.79,
    period: 0.241
  },
  venus: {
    name: "Venus",
    radius: 1.3,
    color: 0xc2b96e,
    orbitRadius: 10.8,
    period: 0.615
  },
  earth: {
    name: "Earth",
    radius: 2,
    color: 0x47a2ed,
    orbitRadius: 15,
    period: 1
  },
  mars: {
    name: "Mars",
    radius: 1.8,
    color: 0x993d00,
    orbitRadius: 22.8,
    period: 1.88
  },
  jupiter: {
    name: "Jupiter",
    radius: 4,
    color: 0xb07f35,
    orbitRadius: 77.8,
    period: 11.9
  },
  saturn: {
    name: "Saturn",
    radius: 3.2,
    color: 0xb08f36,
    orbitRadius: 143,
    period: 29.5
  },
  uranus: {
    name: "Uranus",
    radius: 2.7,
    color: 0x5580aa,
    orbitRadius: 287,
    period: 84
  },
  neptune: {
    name: "Neptune",
    radius: 2.9,
    color: 0x366896,
    orbitRadius: 450,
    period: 165
  },
  pluto: {
    name: "Pluto",
    radius: 0.7,
    color: 0x2f6a69,
    orbitRadius: 590,
    period: 248
  }
};

const starList = {
  sun: { name: "Sun", radius: 5, color: 0xecbd2c }
};

export { starList };
export default planetList;
