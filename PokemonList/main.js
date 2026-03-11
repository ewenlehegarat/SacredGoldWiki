// ✅ Fonction utilitaire extraite — ne se recrée plus à chaque Pokémon
function createStat(label, value, className, buff = 0) {
  const div = document.createElement('div');
  div.classList.add(className);
  div.style.display = 'flex';
  div.style.alignItems = 'center';

  const statLabel = document.createElement('span');
  statLabel.textContent = `${label} : ${value}`;
  statLabel.style.marginRight = '8px';
  div.appendChild(statLabel);

  const bar = document.createElement('div');
  bar.classList.add(`barre_${className}`);
  bar.style.width = value + "px";
  bar.style.maxWidth = "150px";

  if (buff !== 0) {
    const text = document.createElement('span');
    text.style.position = "absolute";
    text.style.left = "50%";
    text.style.top = "50%";
    text.style.transform = "translate(-50%, -50%)";
    text.style.fontWeight = "bold";
    text.style.color = buff > 0 ? "#003cff" : "#B22222";
    text.textContent = `${buff > 0 ? '+' : ''}${buff}`;
    bar.appendChild(text);
  }

  div.appendChild(bar);
  return div;
}

// ✅ Fonction utilitaire extraite — évite la duplication de la logique sprite
function getSpriteUrl(pokemon) {
  const exceptions = ['Ho-Oh', 'Ho-oh', 'Nidoran-M', 'Nidoran-F', 'Porygon-Z', 'Porygon-z'];
  if (pokemon.Name.includes('-') && !exceptions.includes(pokemon.Name)) {
    const forme = pokemon.Name.split('-')[1].toLowerCase();
    return `img/pokemon_animated_sprite/${pokemon.ID}-${forme}.gif`;
  }
  return `img/pokemon_animated_sprite/${pokemon.ID}.gif`;
}

// ✅ Fonction utilitaire pour normaliser les noms d'items en nom de fichier
function itemFileName(s) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
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

    // ✅ searchInput déclaré AVANT le forEach pour être accessible dans les callbacks
    const searchInput = document.getElementById('searchInput') || document.querySelector('input[type="text"]');

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
      pokemonImg.src = getSpriteUrl(pokemon); // ✅ Utilise la fonction utilitaire

      // ✅ Ajustement immédiat dès le chargement — plus d'attente globale
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
        talentNom.target = '_blank'; // ✅ Fix : '_blank' avec underscore
        talentNom.rel = 'noopener noreferrer'; // ✅ Sécurité liens externes

        divNomTalent.appendChild(talentNom);
      });

      // — Types
      const typesContainer = document.createElement('div');
      typesContainer.classList.add('types_container');

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

      // — Attributs de recherche
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
            itemImg.style.width       = '32px';
            itemImg.style.height      = '32px';
            itemImg.style.objectFit   = 'contain';
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
          evoImg.style.cursor    = 'pointer'; // ✅ Curseur pour indiquer le clic
          evoImg.src = getSpriteUrl(targetPokemon); // ✅ Utilise la fonction utilitaire
          evoImg.title = "Search Evolution"

          // ✅ Fix : clic sur l'évolution → remplit la recherche avec le bon nom
          evoImg.addEventListener('click', () => {
            if (searchInput) {
              searchInput.value = evo.Target;
              searchInput.dispatchEvent(new Event('input')); // ✅ Déclenche le filtre
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

    // — Recherche par nom, type ou #Pokédex
    if (searchInput) {
      searchInput.addEventListener('input', () => {
        const raw = searchInput.value.trim().toLowerCase();
        const q = raw.replace('#', '');
        const cards = pokemonContainer.querySelectorAll('.pokemon_div');
        cards.forEach(card => {
          const name        = card.dataset.name    || '';
          const pokedex     = card.dataset.pokedex  || '';
          const types       = card.dataset.types    || '';
          const pokedexNum  = String(Number(pokedex));
          const match = !q
            || name.includes(q)
            || pokedex.includes(q.padStart(3, '0'))
            || pokedexNum.includes(q)
            || types.includes(q);
          card.style.display = match ? '' : 'none';
        });
      });
    }

  } catch (erreur) {
    console.error("Erreur :", erreur);
  }
}

getPokemon();