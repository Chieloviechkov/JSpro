
const planetsContainer = document.getElementById('planetsContainer');
const sortButton = document.getElementById('sortButton');
const searchInput = document.getElementById('searchInput');

async function getPlanets() {
  try {
    const response = await fetch('https://swapi.dev/api/planets/');
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

function displayPlanets(planets) {
  planetsContainer.innerHTML = '';
  planets.forEach(planet => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
      <h2>${planet.name}</h2>
      <p>Rotation Period: ${planet.rotation_period}</p>
      <p>Orbital Period: ${planet.orbital_period}</p>
      <p>Diameter: ${planet.diameter}</p>
      <button class="film-button">Films</button>
    `;
    planetsContainer.appendChild(card);
  });
}

function sortPlanetsByDiameter(planets) {
  return planets.slice().sort((a, b) => a.diameter - b.diameter);
}

function filterPlanetsByName(planets, keyword) {
  return planets.filter(planet => planet.name.toLowerCase().includes(keyword.toLowerCase()));
}

getPlanets().then(planets => displayPlanets(planets));

sortButton.addEventListener('click', () => {
  getPlanets().then(planets => {
    const sortedPlanets = sortPlanetsByDiameter(planets);
    displayPlanets(sortedPlanets);
  });
});

searchInput.addEventListener('input', () => {
  const keyword = searchInput.value;
  getPlanets().then(planets => {
    const filteredPlanets = filterPlanetsByName(planets, keyword);
    displayPlanets(filteredPlanets);
  });
});

planetsContainer.addEventListener('click', async event => {
  if (event.target.classList.contains('film-button')) {
    const planetName = event.target.parentNode.querySelector('h2').textContent;
    const planets = await getPlanets();
    const planet = planets.find(p => p.name === planetName);
    if (planet && planet.films.length > 0) {
      const films = await Promise.all(planet.films.map(async filmUrl => {
        const response = await fetch(filmUrl);
        const filmData = await response.json();
        return filmData.title;
      }));
      alert(`Films featuring ${planetName}: ${films.join(', ')}`);
    } else {
      alert(`${planetName} does not appear in any films.`);
    }
  }
});


