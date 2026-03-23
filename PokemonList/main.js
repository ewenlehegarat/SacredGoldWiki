// On defini les types avec leurs faiblesses, résitances et imunités
const TYPE_CHART = {
  NORMAL:   { ROCK:0.5, GHOST:0, STEEL:0.5 },
  FIRE:     { FIRE:0.5, WATER:0.5, GRASS:2, ICE:2, BUG:2, ROCK:0.5, DRAGON:0.5, STEEL:2 },
  WATER:    { FIRE:2, WATER:0.5, GRASS:0.5, GROUND:2, ROCK:2, DRAGON:0.5 },
  ELECTRIC: { WATER:2, ELECTRIC:0.5, GRASS:0.5, GROUND:0, FLYING:2, DRAGON:0.5 },
  GRASS:    { FIRE:0.5, WATER:2, GRASS:0.5, POISON:0.5, GROUND:2, FLYING:0.5, BUG:0.5, ROCK:2, DRAGON:0.5, STEEL:0.5 },
  ICE:      { FIRE:0.5, WATER:0.5, GRASS:2, ICE:0.5, GROUND:2, FLYING:2, DRAGON:2, STEEL:0.5 },
  FIGHTING: { NORMAL:2, ICE:2, POISON:0.5, FLYING:0.5, PSYCHIC:0.5, BUG:0.5, ROCK:2, GHOST:0, DARK:2, STEEL:2, FAIRY:0.5 },
  POISON:   { GRASS:2, POISON:0.5, GROUND:0.5, ROCK:0.5, GHOST:0.5, STEEL:0, FAIRY:2 },
  GROUND:   { FIRE:2, ELECTRIC:2, GRASS:0.5, POISON:2, FLYING:0, BUG:0.5, ROCK:2, STEEL:2 },
  FLYING:   { ELECTRIC:0.5, GRASS:2, FIGHTING:2, BUG:2, ROCK:0.5, STEEL:0.5 },
  PSYCHIC:  { FIGHTING:2, POISON:2, PSYCHIC:0.5, DARK:0, STEEL:0.5 },
  BUG:      { FIRE:0.5, GRASS:2, FIGHTING:0.5, FLYING:0.5, PSYCHIC:2, GHOST:0.5, DARK:2, STEEL:0.5, FAIRY:0.5 },
  ROCK:     { FIRE:2, ICE:2, FIGHTING:0.5, GROUND:0.5, FLYING:2, BUG:2, STEEL:0.5 },
  GHOST:    { NORMAL:0, PSYCHIC:2, GHOST:2, DARK:0.5 },
  DRAGON:   { DRAGON:2, STEEL:0.5, FAIRY:0 },
  DARK:     { FIGHTING:0.5, PSYCHIC:2, GHOST:2, DARK:0.5, FAIRY:0.5 },
  STEEL:    { FIRE:0.5, WATER:0.5, ELECTRIC:0.5, ICE:2, ROCK:2, STEEL:0.5, FAIRY:2 },
  FAIRY:    { FIRE:0.5, FIGHTING:2, POISON:0.5, DRAGON:2, DARK:2, STEEL:0.5 },
};

function computeMatchups(type1, type2) {
  const result = { immune: [], double_resistant: [], resistant: [], weak: [], double_weak: [] };
  
  // la key de chaque objet est le type chat
  Object.keys(TYPE_CHART).forEach(attacker => {
    // On defini le resultat soit imunisé soit resisant x0.5 ou 0.25 ou alors faiblesse x2 ou x4
    const m1 = TYPE_CHART[attacker]?.[type1] ?? 1;
    // et celui la voir le type de dégats si le pokemon à un double type
    const m2 = type2 ? (TYPE_CHART[attacker]?.[type2] ?? 1) : 1;
    // le resultat est égal au dégats 1 * dégats 2
    const total = m1 * m2;
    
    // si le total est stictement égal à 0 alors le pokemon est imunisé à l'attaque
    if (total === 0)      result.immune.push(attacker);
    // sinon si est égal à 0.25 alors on dit qu'il est très resistant(x0.25)
    else if (total === 0.25) result.double_resistant.push(attacker);
    // sinon si est inférieur à 1 alors on dit qu'il est resistant(x0.5)
    else if (total < 1)   result.resistant.push(attacker);
    // sinon si est égal = 4 alors on dit que c'est une grosse faiblesse(x4)
    else if (total === 4) result.double_weak.push(attacker);
    // sinon si est égal = 2 alors on dit que c'est une faiblesse(x2)
    else if (total === 2) result.weak.push(attacker);
  });
  // et on renvoit le resultat
  return result;
}

// La table de type quand on survol le type du pokemon
const typeTooltip = document.createElement('div');
// on defini l'id de type tooltip
typeTooltip.id = 'type_tooltip';
// et on le rajoute dans le html
document.body.appendChild(typeTooltip);

function positionTooltip(e) {
  // sa position est celle de client + 16 en x et y
  const x = e.clientX + 16;
  const y = e.clientY + 16;
  // son left et right par rapport à la taille du client - 14 pixel
  typeTooltip.style.left = (x + typeTooltip.offsetWidth  > window.innerWidth  ? e.clientX - typeTooltip.offsetWidth  - 14 : x) + 'px';
  typeTooltip.style.top  = (y + typeTooltip.offsetHeight > window.innerHeight ? e.clientY - typeTooltip.offsetHeight - 14 : y) + 'px';
}

// la function pour montré les type dans la table par rapport au résultat
function showTypeTooltip(e, type1, type2) {
  // le matchup est égal au type 1 + type 2
  const matchups = computeMatchups(type1, type2);
  // le text pour dire le resultat
  const sections = [
    { label: 'Immune to :',           key: 'immune' },
    { label: 'Double resistant to :', key: 'double_resistant' },
    { label: 'Resistant to :',        key: 'resistant' },
    { label: 'Weak to :',             key: 'weak' },
    { label: 'Double weak to :',      key: 'double_weak' },
  ];

  typeTooltip.innerHTML = sections
    // dans la section on filtre les matchup qui sont supérieur à 0
    .filter(s => matchups[s.key].length > 0)
    // et on affiche le type de resultat dans la div
    .map(s => `
      <div style="margin-bottom:8px;">
        <div style="font-size:11px;color:#aaa;margin-bottom:4px;">${s.label}</div>
        <div style="display:flex;flex-wrap:wrap;gap:4px;">
          ${matchups[s.key].map(t => `
            <img src="./img/type/${t.toLowerCase()}.png"
                 alt="${t}"
                 style="width:75px;height:30px;object-fit:contain;">
          `).join('')}
        </div>
      </div>
    `).join('');

  // et on affiche la div
  typeTooltip.style.display = 'block';
  // on appelle la function positionTooltip pour placé la div
  positionTooltip(e);
}

// on défini les buff et nerf des pokemon, car certains pokémons
// on eu des stats modifier par rapport au jeux officiels,
// il faut donc les affiché pour montrés les modifications
function createStat(label, value, className, buff = 0) {
  // oncrée la div pour contenir la stat
  const div = document.createElement('div');
  div.classList.add(className);
  div.style.display = 'flex';
  div.style.alignItems = 'center';

  // on crée le texte
  const statLabel = document.createElement('span');
  statLabel.textContent = `${label} : ${value}`;
  statLabel.style.marginRight = '8px';
  div.appendChild(statLabel);

  // on crée la barre de stat
  const bar = document.createElement('div');
  bar.classList.add(`barre_${className}`);
  bar.style.width = value + "px";
  bar.style.maxWidth = "150px";

  // si le buff est strictement inégal à 0 alors on crée le buff ou nerf
  if (buff !== 0) {
    const text = document.createElement('span');
    text.style.position = "absolute";
    text.style.left = "50%";
    text.style.top = "50%";
    text.style.transform = "translate(-50%, -50%)";
    text.style.fontWeight = "bold";
    // si le buff est supérieur à 0 on met la couleur bleu ou sinon la couleur rouge
    text.style.color = buff > 0 ? "#003cff" : "#B22222";
    text.textContent = `${buff > 0 ? '+' : ''}${buff}`;
    bar.appendChild(text);
  }

  div.appendChild(bar);
  return div;
}

// Fonction utilitaire extraite — évite la duplication de la logique sprite
function getSpriteUrl(pokemon) {
  // On défini les exceptions
  const exceptions = ['Ho-Oh', 'Ho-oh', 'Nidoran-M', 'Nidoran-F', 'Porygon-Z', 'Porygon-z'];

  // si le nom inclus "-" et est différent des exceptions alors on suprime le "-",
  // et on va chercher l'id du pokemon - sa forme
  if (pokemon.Name.includes('-') && !exceptions.includes(pokemon.Name)) {
    const forme = pokemon.Name.split('-')[1].toLowerCase();
    return `img/pokemon_animated_sprite/${pokemon.ID}-${forme}.gif`;
  }
  // et on retourne l'id du pokemon pour allé chercher l'image
  return `img/pokemon_animated_sprite/${pokemon.ID}.gif`;
}

// Fonction utilitaire pour normaliser les noms d'items en nom de fichier
function itemFileName(s) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

// ── Filtre + Tri ─────────────────────────────────────────────────────────────
function applyFiltersAndSort(pokemonContainer, searchInput, sortSelect, filterSelect) {
  // la const enlève les # et espaces dans le resultat
  const raw        = (searchInput?.value.trim().toLowerCase() || '').replace('#', '');
  const sortVal    = sortSelect?.value   || 'pokedex01';
  const filterVal  = filterSelect?.value || 'alltype';

  // Extraire le type depuis la valeur du filtre (ex: "typegrass" → "grass")
  const typeFilter = filterVal === 'alltype' ? null : filterVal;

  // defini les cards de chaques pokémons
  const cards = [...pokemonContainer.querySelectorAll('.pokemon_div')];

  cards.forEach(card => {
    // on defini le nom du pokemon, son id de pokedex, son type ou ces types  et son numéro de pokedex
    const name       = card.dataset.name    || '';
    const pokedex    = card.dataset.pokedex || '';
    const types      = card.dataset.types   || '';
    const pokedexNum = String(Number(pokedex));

    const matchSearch = !raw
      || name.includes(raw)
      // pour le numéro de pokedex fasse 001, 002 etc
      || pokedex.includes(raw.padStart(3, '0'))
      || pokedexNum.includes(raw)
      || types.includes(raw);

    // on enlève les virgules dans le type
    const matchType = !typeFilter || types.split(',').includes(typeFilter);

    // si il n'ya pas de recherche alors ne rien affiché
    card.style.display = (matchSearch && matchType) ? '' : 'none';
  });

  // Tri uniquement sur les cartes visibles
  const visible = cards.filter(c => c.style.display !== 'none');
  const hidden  = cards.filter(c => c.style.display === 'none');

  visible.sort((a, b) => {
    const numA  = Number(a.dataset.pokedex);
    const numB  = Number(b.dataset.pokedex);
    const nameA = a.dataset.name || '';
    const nameB = b.dataset.name || '';

    switch (sortVal) {
      case 'pokedex01': return numA - numB;
      case 'pokedex10': return numB - numA;
      case 'pokemonaz': return nameA.localeCompare(nameB);
      case 'pokemonza': return nameB.localeCompare(nameA);
      default:          return numA - numB;
    }
  });

  // Réinsérer dans le DOM dans le bon ordre
  [...visible, ...hidden].forEach(card => pokemonContainer.appendChild(card));
}

async function getPokemon() {
  try {
    const [data, dataLearn, dataEvo, dataTM] = await Promise.all([
      fetch("../json/PokemonPersonalData.json").then(res => res.json()),
      fetch("../json/LearnsetData.json").then(res => res.json()),
      fetch("../json/EvolutionData.json").then(res => res.json()),
      fetch("../json/TMHMData.json").then(res => res.json())
    ]);

    const pokemonContainer = document.querySelector('.pokemon_container');
    if (!pokemonContainer) throw new Error("Le conteneur '.pokemon_container' n'existe pas dans le DOM");

    // ✅ Contrôles déclarés AVANT le forEach
    const searchInput  = document.getElementById('searchInput') || document.querySelector('input[type="text"]');
    const sortSelect   = document.getElementById('sort');
    const filterSelect = document.getElementById('filter');

    // ✅ Fonction d'ajustement individuel — chaque sprite s'ajuste dès son chargement
    function adjustSprite(img) {
      const DESIRED_MAX = 250;
      const DESIRED_MIN = 80;
      const w = img.naturalWidth;
      if (w > 0) {
        img.style.width = Math.round(Math.max(DESIRED_MIN, Math.min(DESIRED_MAX, w * 2))) + 'px';
        img.style.height = 'auto';
      }
    }

    data.forEach(pokemon => {
      const pokemonDiv = document.createElement('div');
      pokemonDiv.classList.add('pokemon_div');

      // — Top : nom + #Pokédex
      const pokemonTop = document.createElement('div');
      pokemonTop.classList.add('pokemon_top');

      const pokemonNom = document.createElement('h2');
      pokemonNom.textContent = pokemon.Name;

      const pokemonPokedexId = document.createElement('h2');
      pokemonPokedexId.textContent = '#' + String(pokemon.ID).padStart(3, '0');

      pokemonTop.append(pokemonNom, pokemonPokedexId);

      // — Sprite
      const pokemonImg = document.createElement('img');
      pokemonImg.alt = pokemon.Name;
      pokemonImg.classList.add('pokemon_sprite');
      pokemonImg.src = getSpriteUrl(pokemon);

      if (pokemonImg.complete) {
        adjustSprite(pokemonImg);
      } else {
        pokemonImg.addEventListener('load', () => adjustSprite(pokemonImg));
        pokemonImg.addEventListener('error', () => {});
      }

      // — Talents
      const divTalent = document.createElement('div');
      divTalent.classList.add('talent');

      const talentText = document.createElement('h3');
      talentText.classList.add('talent_text');
      talentText.textContent = 'Ability :';

      const divNomTalent = document.createElement('div');
      divNomTalent.classList.add('nom_talent');

      divTalent.append(talentText, divNomTalent);

      const abilities = [
        { name: pokemon.Ability1, label: '1' },
        { name: pokemon.Ability2, label: '2' }
      ].filter(a => a.name && a.name !== '-');

      abilities.forEach((ability) => {
        const talentNom = document.createElement('a');
        talentNom.textContent = `${ability.name} (${ability.label})`;
        talentNom.classList.add('talent_nom');
        talentNom.style.cursor = "pointer";
        talentNom.style.display = 'block';
        talentNom.title = 'Search ability';

        const urlName = ability.name.toLowerCase().replace(/\s+/g, '-');
        talentNom.href = `https://pokemondb.net/ability/${urlName}`;
        talentNom.target = '_blank';
        talentNom.rel = 'noopener noreferrer';

        divNomTalent.appendChild(talentNom);
      });

      // — Types (ton code existant)
      const typesContainer = document.createElement('div');
      typesContainer.classList.add('types_container');
      typesContainer.style.cursor = 'default';

      const types = [pokemon.Type1, pokemon.Type2].filter(
        (t, index, arr) => t && t !== '-' && arr.indexOf(t) === index
      );
      types.forEach(type => {
        const typeImg = document.createElement('img');
        typeImg.src = `./img/type/${type.toLowerCase()}.png`;
        typeImg.alt = type;
        typeImg.classList.add('type_image');
        typesContainer.appendChild(typeImg);
      });

      // ✅ NOUVEAU — Tooltip matchups au hover
      const t1 = pokemon.Type1?.toUpperCase();
      const t2 = pokemon.Type2 && pokemon.Type2 !== '-' ? pokemon.Type2.toUpperCase() : null;

      typesContainer.addEventListener('mouseenter', e => showTypeTooltip(e, t1, t2));
      typesContainer.addEventListener('mousemove',  positionTooltip);
      typesContainer.addEventListener('mouseleave', () => typeTooltip.style.display = 'none');

      // — Stats
      const divStats = document.createElement('div');
      divStats.classList.add('div_stats');

      divStats.append(
        createStat("Hp",  pokemon.BaseHP,             "hp",  pokemon.buffs?.hp),
        createStat("Atk", pokemon.BaseAttack,          "atk", pokemon.buffs?.atk),
        createStat("Def", pokemon.BaseDefense,         "def", pokemon.buffs?.def),
        createStat("Spa", pokemon.BaseSpecialAttack,   "spa", pokemon.buffs?.spa),
        createStat("Spd", pokemon.BaseSpecialDefense,  "spd", pokemon.buffs?.spd),
        createStat("Spe", pokemon.BaseSpeed,           "spe", pokemon.buffs?.spe)
      );

      // — Assemblage principal
      pokemonDiv.append(pokemonTop, pokemonImg, divTalent, typesContainer, divStats);

      // — Attributs de recherche/tri/filtre
      pokemonDiv.dataset.name    = String(pokemon.Name || '').toLowerCase();
      pokemonDiv.dataset.pokedex = String(pokemon.ID).padStart(3, '0');
      pokemonDiv.dataset.types   = types.join(',').toLowerCase();

      // — Learnset
      const learnEntry = dataLearn.find(entry => entry.ID === pokemon.ID || entry.Name === pokemon.Name);
      if (learnEntry && Array.isArray(learnEntry.Learnset) && learnEntry.Learnset.length) {
        const learnDiv = document.createElement('div');
        learnDiv.classList.add('learnset');

        const learnTitle = document.createElement('h3');
        learnTitle.textContent = 'Learnset :';
        learnDiv.appendChild(learnTitle);

        const ul = document.createElement('ul');
        learnEntry.Learnset.forEach(item => {
          const li = document.createElement('li');
          li.textContent = `${item.Level} — ${item.Move}`;
          ul.appendChild(li);
        });
        learnDiv.appendChild(ul);
        pokemonDiv.appendChild(learnDiv);

        // — TM / HM
        const tmEntry = dataTM.find(entry => entry.ID === pokemon.ID || entry.Name === pokemon.Name);
        if (tmEntry) {
          const tmDiv = document.createElement('div');
          tmDiv.classList.add('tmhm');

          const tmTitle = document.createElement('h3');
          tmTitle.textContent = 'TM / HM :';
          tmDiv.appendChild(tmTitle);

          const ulTm = document.createElement('ul');
          Object.keys(tmEntry).forEach(key => {
            if (/^(TM|HM)/i.test(key)) {
              const val = String(tmEntry[key]).toLowerCase();
              if (val.includes('true')) {
                const li = document.createElement('li');
                li.textContent = key.replace(/\[|\]|"/g, '').trim();
                ulTm.appendChild(li);
              }
            }
          });
          if (ulTm.childElementCount > 0) tmDiv.appendChild(ulTm);
          pokemonDiv.appendChild(tmDiv);
        }
      }

      // — Évolutions
      const evoEntry = dataEvo.find(entry => entry.ID === pokemon.ID || entry.Name === pokemon.Name);
      if (evoEntry && Array.isArray(evoEntry.Evolutions) && evoEntry.Evolutions.length > 0) {
        const evoDiv = document.createElement('div');
        evoDiv.classList.add('evolution');

        const evoTitle = document.createElement('h3');
        evoTitle.textContent = 'Evolutions :';
        evoDiv.appendChild(evoTitle);

        const evoContainer = document.createElement('div');
        evoContainer.classList.add('evo_container');
        evoContainer.style.display    = 'flex';
        evoContainer.style.gap        = '10px';
        evoContainer.style.flexWrap   = 'wrap';
        evoContainer.style.alignItems = 'center';

        evoEntry.Evolutions.forEach(evo => {
          const targetPokemon = data.find(p => p.Name === evo.Target);
          if (!targetPokemon) return;

          const itemDiv = document.createElement('div');
          itemDiv.style.textAlign = 'center';

          // — Méthode d'évolution
          let methodElement;
          if (evo.Method === 'LevelingUp') {
            methodElement = document.createElement('p');
            methodElement.style.marginBottom = '10px';
            methodElement.style.fontSize = '12px';
            methodElement.textContent = `Level ${evo.Param}`;

          } else if (evo.Method === 'Item') {
            const itemImg = document.createElement('img');
            itemImg.alt = evo.Param;
            itemImg.src = `./img/items/${itemFileName(evo.Param)}.png`;
            itemImg.style.width        = '32px';
            itemImg.style.height       = '32px';
            itemImg.style.objectFit    = 'contain';
            itemImg.style.marginBottom = '8px';
            itemImg.addEventListener('error', () => {
              const span = document.createElement('span');
              span.textContent = evo.Param;
              span.style.fontSize = '12px';
              if (itemImg.parentNode) itemImg.parentNode.replaceChild(span, itemImg);
            });
            methodElement = itemImg;

          } else if (evo.Method === 'Trade') {
            methodElement = document.createElement('p');
            methodElement.style.marginBottom = '10px';
            methodElement.style.fontSize = '12px';
            methodElement.textContent = 'Trade';

          } else {
            methodElement = document.createElement('p');
            methodElement.style.marginBottom = '10px';
            methodElement.style.fontSize = '12px';
            methodElement.textContent = `${evo.Method}${evo.Param ? ' (' + evo.Param + ')' : ''}`;
          }

          // — Sprite de l'évolution
          const evoImg = document.createElement('img');
          evoImg.alt = evo.Target;
          evoImg.style.maxWidth  = '100px';
          evoImg.style.maxHeight = '100px';
          evoImg.style.cursor    = 'pointer';
          evoImg.src = getSpriteUrl(targetPokemon);
          evoImg.title = "Search Evolution";

          evoImg.addEventListener('click', () => {
            if (searchInput) {
              searchInput.value = evo.Target;
              searchInput.dispatchEvent(new Event('input'));
            }
          });

          itemDiv.append(methodElement, evoImg);
          evoContainer.appendChild(itemDiv);
        });

        evoDiv.appendChild(evoContainer);
        pokemonDiv.appendChild(evoDiv);
      }

      pokemonContainer.appendChild(pokemonDiv);
    });

    // — Recherche + Tri + Filtre
    const refresh = () => applyFiltersAndSort(pokemonContainer, searchInput, sortSelect, filterSelect);

    searchInput?.addEventListener('input',  refresh);
    sortSelect?.addEventListener('change',  refresh);
    filterSelect?.addEventListener('change', refresh);

    // Tri initial (pokedex croissant par défaut)
    refresh();

    // — Lecture du paramètre URL ?search=NomPokemon (venant de la page Fight)
    const params = new URLSearchParams(window.location.search);
    const searchParam = params.get('search');
    if (searchParam && searchInput) {
      searchInput.value = searchParam;
      refresh();
    }

  } catch (erreur) {
    console.error("Erreur :", erreur);
  }
}

getPokemon();