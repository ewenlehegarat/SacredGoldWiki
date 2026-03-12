const searchInput = document.getElementById('searchInput') || document.querySelector('input[type="text"]');

if (searchInput) {
  searchInput.addEventListener('input', () => {
    const q = searchInput.value.trim().toLowerCase().replace('#', '');
    const routes = document.querySelectorAll('.divs');

    routes.forEach(route => {
      const routeName = route.querySelector('h2')?.textContent.toLowerCase() || '';
      route.style.display = !q || routeName.includes(q) ? '' : 'none';
    });
  });
}

async function getLocations() {
  const data = await fetch("../json/Encounters.json").then(res => res.json());
  const main = document.querySelector('main');

  // Search input
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      const q = searchInput.value.trim().toLowerCase();
      document.querySelectorAll('.divs').forEach(zone => {
        const name = zone.querySelector('h2')?.textContent.toLowerCase() || '';
        zone.style.display = !q || name.includes(q) ? '' : 'none';
      });
    });
  }

  data.forEach(location => {
    const div = document.createElement('div');
    div.className = `${location.id} divs`;

    let html = `<h2>${location.name} :</h2>`;
    if (location.levels && location.levels !== 'N/A') {
      html += `<h4>Wild Levels : ${location.levels}</h4>`;
    }

    html += `
      <div class="container">
        <img src="${location.image}" alt="location image" class="route_image top_image">
        <div class="encounter">
    `;

    Object.entries(location.methods).forEach(([key, method]) => {
      if (!method.pokemon || method.pokemon.length === 0) return;

      html += `<div class="${key} encounters"><h3>${method.label} :</h3>`;
      method.pokemon.forEach(p => {
        html += `<p><img src="../PokemonList/img/pokemon_animated_sprite/${p.id}.gif" alt="pokemon" class="pokemon_image">${p.pct || ''}</p>`;
      });
      html += `</div>`;
    });

    html += `</div></div>`;
    div.innerHTML = html;
    main.appendChild(div);
  });
}

getLocations();