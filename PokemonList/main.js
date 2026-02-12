async function getPokemon() {
  try {
    const response = await fetch("./pokemon.json");
    const data = await response.json();

    const resultat = data.filter(pokemon =>
      pokemon.pokedex_id &&
      pokemon.pokedex_id <= 721
    );

    const pokemonContainer = document.querySelector('.pokemon_container');

    resultat.forEach(pokemon => {

      const pokemonDiv = document.createElement('div');
      pokemonDiv.classList.add('pokemon_div');

      const pokemonTop = document.createElement('div');
      pokemonTop.classList.add('pokemon_top');

      const pokemonNom = document.createElement('h2');
      pokemonNom.textContent = pokemon.name.fr;

      const pokemonPokedexId = document.createElement('h3');
      pokemonPokedexId.textContent = '#' + String(pokemon.pokedex_id).padStart(3, '0');

      pokemonTop.append(pokemonNom, pokemonPokedexId);

      const pokemonImg = document.createElement('img');
      pokemonImg.alt = pokemon.name.fr;
      pokemonImg.style.width = '80px';

      if (pokemon.pokedex_id < 650) {
        pokemonImg.src = `img/pokemon_animated_sprite/${pokemon.pokedex_id}.gif`;
      } else {
        pokemonImg.src = pokemon.sprites.regular;
      }

      // TALENTS
      const divTalent = document.createElement('div');
      divTalent.classList.add('talent');

      const talentText = document.createElement('h3');
      talentText.classList.add('talent_text');
      talentText.textContent = 'Talents :';

      const divNomTalent = document.createElement('div')
      divNomTalent.classList.add('nom_talent')

      divTalent.append(talentText, divNomTalent);

      pokemon.talents.forEach((talent, index) => {
      const talentNom = document.createElement('a');

        let suffixe;

        if (talent.tc === true) {
          suffixe = "(H)";
        } else {
          suffixe = `(${index + 1})`;
        }

        talentNom.textContent = `${talent.name} ${suffixe}`;
        talentNom.classList.add('talent_nom');
        talentNom.href = `https://www.pokepedia.fr/${talent.name}`
        talentNom.title = `Lien vers Poképedia : https://www.pokepedia.fr/${encodeURIComponent(talent.name)}`;

        divNomTalent.appendChild(talentNom);
      });


      // TYPES
      const typesContainer = document.createElement('div');
      typesContainer.classList.add('types_container');

      pokemon.types.forEach(type => {
        const typeImg = document.createElement('img');
        typeImg.src = `./img/type/${type.name}.png`;
        typeImg.alt = type.name;
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
        createStat("Hp", pokemon.stats.hp, "hp"),
        createStat("Atk", pokemon.stats.atk, "atk"),
        createStat("Def", pokemon.stats.def, "def"),
        createStat("Spa", pokemon.stats.spe_atk, "spa"),
        createStat("Spd", pokemon.stats.spe_def, "spd"),
        createStat("Spe", pokemon.stats.vit, "spe")
      );

      // RESISTANCES
      const textResistances = document.createElement('h4');
      textResistances.classList.add('text_resistances')
      textResistances.textContent = "Resistances :";

      const resDiv = document.createElement('div');
      resDiv.classList.add('res_div');

      resDiv.innerHTML = `
        <div class="df_res res_0"><h5>Immune:</h5><div class="right"></div></div>
        <div class="df_res res_025"><h5>0.25x:</h5><div class="right"></div></div>
        <div class="df_res res_05"><h5>0.5x:</h5><div class="right"></div></div>
        <div class="df_res res_1"><h5>1x:</h5><div class="right"></div></div>
        <div class="df_res weak_2"><h5>2x:</h5><div class="right"></div></div>
        <div class="df_res weak_4"><h5>4x:</h5><div class="right"></div></div>
      `;

      pokemon.resistances.forEach(resistance => {

        const img = document.createElement('img');
        img.src = `./img/type/${resistance.name}.png`;
        img.alt = resistance.name;
        img.classList.add('type_icon');

        const multiplier = resistance.multiplier;

        if (multiplier === 0)
          resDiv.querySelector('.res_0 .right').appendChild(img);
        else if (multiplier === 0.25)
          resDiv.querySelector('.res_025 .right').appendChild(img);
        else if (multiplier === 0.5)
          resDiv.querySelector('.res_05 .right').appendChild(img);
        else if (multiplier === 1)
          resDiv.querySelector('.res_1 .right').appendChild(img);
        else if (multiplier === 2)
          resDiv.querySelector('.weak_2 .right').appendChild(img);
        else if (multiplier === 4)
          resDiv.querySelector('.weak_4 .right').appendChild(img);
      });

      pokemonDiv.append(
        pokemonTop,
        pokemonImg,
        divTalent,
        typesContainer,
        divStats,
        textResistances,
        resDiv
      );

      pokemonContainer.appendChild(pokemonDiv);
    });

    console.log(resultat);
    

  } catch (erreur) {
    console.error("Erreur :", erreur);
  }
}

getPokemon();
