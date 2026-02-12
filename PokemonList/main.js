async function getPokemon() {
  try {
    const response = await fetch("../json/PokemonPersonalData.json");
    const data = await response.json();

    const resultat = data;

    const pokemonContainer = document.querySelector('.pokemon_container');

    if (!pokemonContainer) {
      throw new Error("Le conteneur '.pokemon_container' n'existe pas dans le DOM");
    }

    resultat.forEach(pokemon => {

      const pokemonDiv = document.createElement('div');
      pokemonDiv.classList.add('pokemon_div');

      const pokemonTop = document.createElement('div');
      pokemonTop.classList.add('pokemon_top');

      const pokemonNom = document.createElement('h2');
      pokemonNom.textContent = pokemon.Name;

      const pokemonPokedexId = document.createElement('h3');
      pokemonPokedexId.textContent = '#' + String(pokemon.ID).padStart(3, '0');

      pokemonTop.append(pokemonNom, pokemonPokedexId);

      const pokemonImg = document.createElement('img');
      pokemonImg.alt = pokemon.Name;
      pokemonImg.classList.add('pokemon_sprite');
      
      // Gérer les formes alternatives (Deoxys-Attack, etc.)
      if (pokemon.Name.includes('-')) {
        const forme = pokemon.Name.split('-')[1].toLowerCase();
        pokemonImg.src = `img/pokemon_animated_sprite/${pokemon.ID}-${forme}.gif`;
      } else {
        pokemonImg.src = `img/pokemon_animated_sprite/${pokemon.ID}.gif`;
      }

      // TALENTS
      const divTalent = document.createElement('div');
      divTalent.classList.add('talent');

      const talentText = document.createElement('h3');
      talentText.classList.add('talent_text');
      talentText.textContent = 'Talents :';

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
        talentNom.href = `https://www.pokepedia.fr/${ability.name}`;
        talentNom.title = `Lien vers Poképedia`;
        divNomTalent.appendChild(talentNom);
      });

      // TYPES
      const typesContainer = document.createElement('div');
      typesContainer.classList.add('types_container');

      const types = [pokemon.Type1, pokemon.Type2].filter(t => t);
      types.forEach(type => {
        const typeImg = document.createElement('img');
        typeImg.src = `./img/type/${type.toLowerCase()}.png`;
        typeImg.alt = type;
        typeImg.width = 75;
        typeImg.classList.add('type_image');
        typesContainer.appendChild(typeImg);
      });

      // STATS
      function createStat(label, value, className) {
        const div = document.createElement('div');
        div.classList.add(className);

        const title = document.createElement('h4');
        title.textContent = `${label} : ${value}`;

        const bar = document.createElement('div');
        bar.classList.add(`barre_${className}`);
        bar.style.width = value + "px";

        div.append(title, bar);
        return div;
      }

      const divStats = document.createElement('div');
      divStats.classList.add('div_stats');

      divStats.append(
        createStat("Hp", pokemon.BaseHP, "hp"),
        createStat("Atk", pokemon.BaseAttack, "atk"),
        createStat("Def", pokemon.BaseDefense, "def"),
        createStat("Spa", pokemon.BaseSpecialAttack, "spa"),
        createStat("Spd", pokemon.BaseSpecialDefense, "spd"),
        createStat("Spe", pokemon.BaseSpeed, "spe")
      );

      pokemonDiv.append(
        pokemonTop,
        pokemonImg,
        divTalent,
        typesContainer,
        divStats
      );

      pokemonContainer.appendChild(pokemonDiv);
    });

    console.log(resultat);
    

  } catch (erreur) {
    console.error("Erreur :", erreur);
  }
}

getPokemon();