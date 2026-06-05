<script>
  import Nav from './components/nav.vue'
  import PokemonData from './json/PokemonPersonalData.json'
  import PokemonLearnSet from './json/LearnsetData.json'
  import PokemonEvolutionData from './json/EvolutionData.json'

  export default {
    components: { Nav },
    data() {
      return {
        selectedFilter: 'alltype',
        selectedSort: 'pokedex01',
        searchQuery: ''
      }
    },
    computed: {
      filteredPokemon() {
        const search = this.searchQuery.trim().toLowerCase()
        let list = this.selectedFilter === 'alltype'
          ? PokemonData
          : PokemonData.filter(p => {
              const filter = this.selectedFilter.toUpperCase()
              return p.Type1 === filter || p.Type2 === filter
            })

        if (search) {
          list = list.filter(p =>
            p.Name.toLowerCase().includes(search) ||
            String(p.ID).includes(search)
          )
        }

        const sorted = [...list]
        if (this.selectedSort === 'pokedex01') {
          sorted.sort((a, b) => a.ID - b.ID)
        } else if (this.selectedSort === 'pokedex10') {
          sorted.sort((a, b) => b.ID - a.ID)
        } else if (this.selectedSort === 'pokemonaz') {
          sorted.sort((a, b) => a.Name.localeCompare(b.Name))
        } else if (this.selectedSort === 'pokemonza') {
          sorted.sort((a, b) => b.Name.localeCompare(a.Name))
        }
        return sorted
      }
    },
    methods: {
      formatID(id) {
        return String(id).padStart(3, '0')
      },
      getSprite(id, form = null) {
        if (form) {
          return `./src/assets/img/pokemon_animated_sprite/${id}-${form}.gif`
        }
        return `./src/assets/img/pokemon_animated_sprite/${id}.gif`
      },
      getType(type) {
        return `./src/assets/img/type/${type}.png`
      },
      getLearnset(id) {
        return PokemonLearnSet.find(p => p.ID === id)
      },
      getEvolution(id) {
        return PokemonEvolutionData.find(p => p.ID === id)
      },
      formatMethod(method) {
        const methods = {
          'LevelingUp': 'Level',
          'PartyPokemonPresence': 'Party presence',
          'Item': ''
        }
        return methods[method] ?? method
      },
      getPokemonIDByName(name) {
        return PokemonData.find(p => p.Name === name)?.ID
      },
      searchAbility(ability) {
        if (!ability) return '#'
        return `https://pokemondb.net/ability/${ability.toLowerCase().replace(' ', '-')}`
      },
      searchPokemon(name) {
        this.searchQuery = name
      }
    },
    mounted() {
        if (this.$route.query.search) {
            this.searchQuery = String(this.$route.query.search)
        }
    }
  }
</script>

<template>
  <main>
    <div class="input">
      <input type="text" placeholder="Search a pokemon" v-model="searchQuery">
      <ion-icon name="close-outline" v-if="searchQuery.length > 0" @click="searchQuery = ''" ></ion-icon>
    </div>
    <select name="sort" id="sort" v-model="selectedSort">
        <option value="pokedex01">Pokedex #0 > #493</option>
        <option value="pokedex10">Pokedex #493 > #0</option>
        <option value="pokemonaz">Pokemon A > Z</option>
        <option value="pokemonza">Pokemon Z > A</option>
    </select>
    <select name="filter" id="filter" v-model="selectedFilter">
        <option value="alltype">Pokemon all type</option>
        <option value="bug">Type Bug</option>
        <option value="dark">Type Dark</option>
        <option value="dragon">Type Dragon</option>
        <option value="electric">Type Electric</option>
        <option value="fighting">Type Fighting</option>
        <option value="fire">Type Fire</option>
        <option value="flying">Type Flying</option>
        <option value="ghost">Type Ghost</option>
        <option value="grass">Type Grass</option>
        <option value="ground">Type Ground</option>
        <option value="ice">Type Ice</option>
        <option value="normal">Type Normal</option>
        <option value="poison">Type Poison</option>
        <option value="psychic">Type Psychic</option>
        <option value="rock">Type Rock</option>
        <option value="steel">Type Steel</option>
        <option value="water">Type Water</option>
    </select>
    <div class="cards">
      <div class="card" v-for="pokemon in filteredPokemon" :key="pokemon.ID + '-' + (pokemon.Form ?? 'base') + '-' + pokemon.Name">
        <div class="name">
          <h2>{{ pokemon.Name }}</h2>
          <h2>{{ formatID(pokemon.ID) }}</h2>
        </div>
        <img :src="getSprite(pokemon.ID, pokemon.Form)" :alt="pokemon.Name"/>
        <h3>Ability :</h3>
        <a :href="searchAbility(pokemon.Ability1)" target="_blank">{{ pokemon.Ability1 }}</a>
        <a v-if="pokemon.Ability2 && pokemon.Ability2 !== '-'" :href="searchAbility(pokemon.Ability2)" target="_blank">{{ pokemon.Ability2 }}</a>
        <div class="type_container">
        <img :src="getType(pokemon.Type1)" :alt="pokemon.Type1">
        <img v-if="pokemon.Type1 !== pokemon.Type2"
          :src="getType(pokemon.Type2)"
          :alt="getType(pokemon.Type2)"
        >
      </div>
      <div class="stats_container">
        <div class="text_stats">
          <h5>Hp : {{ pokemon.BaseHP }}</h5>
          <h5>Atk : {{ pokemon.BaseAttack }}</h5>
          <h5>Def : {{ pokemon.BaseDefense }}</h5>
          <h5>Spa : {{ pokemon.BaseSpecialAttack }}</h5>
          <h5>Spd : {{ pokemon.BaseSpecialDefense }}</h5>
          <h5>Spe : {{ pokemon.BaseSpeed }}</h5>
        </div>
        <div class="barre_stats">
          <div class="barre_hp barre" :style="{ width: pokemon.BaseHP + 'px' }">
            <span v-if="pokemon.buffs?.hp" :class="pokemon.buffs.hp > 0 ? 'buff' : 'debuff'"> {{ `${pokemon.buffs.hp > 0 ? '+' : ''}${pokemon.buffs.hp}` }}</span>
          </div>
          <div class="barre_atk barre" :style="{ width: pokemon.BaseAttack + 'px' }">
            <span v-if="pokemon.buffs?.atk":class="pokemon.buffs.atk > 0 ? 'buff' : 'debuff'"> {{ `${pokemon.buffs.atk > 0 ? '+' : ''}${pokemon.buffs.atk}` }}</span>
          </div>
          <div class="barre_def barre" :style="{ width: pokemon.BaseDefense + 'px' }">
            <span v-if="pokemon.buffs?.def":class="pokemon.buffs.def > 0 ? 'buff' : 'debuff'"> {{ `${pokemon.buffs.def > 0 ? '+' : ''}${pokemon.buffs.def}` }}</span>
          </div>
          <div class="barre_spa barre" :style="{ width: pokemon.BaseSpecialAttack + 'px' }">
            <span v-if="pokemon.buffs?.spa":class="pokemon.buffs.spa > 0 ? 'buff' : 'debuff'"> {{ `${pokemon.buffs.spa > 0 ? '+' : ''}${pokemon.buffs.spa}` }}</span>
          </div>
          <div class="barre_spd barre" :style="{ width: pokemon.BaseSpecialDefense + 'px' }">
            <span v-if="pokemon.buffs?.spd":class="pokemon.buffs.spd > 0 ? 'buff' : 'debuff'"> {{ `${pokemon.buffs.spd > 0 ? '+' : ''}${pokemon.buffs.spd}` }}</span>
          </div>
          <div class="barre_spe barre" :style="{ width: pokemon.BaseSpeed + 'px' }">
            <span v-if="pokemon.buffs?.spe":class="pokemon.buffs.spe > 0 ? 'buff' : 'debuff'"> {{ `${pokemon.buffs.spe > 0 ? '+' : ''}${pokemon.buffs.spe}` }}</span>
          </div>
        </div>
      </div>
      <h3>Learnset :</h3>
      <div class="learn_set">
        <div v-for="move in getLearnset(pokemon.ID)?.Learnset" :key="move.Level + move.Move">
          <h5>{{ move.Level }} - {{ move.Move }}</h5>
        </div>
      </div>
      <div class="evo" v-if="getEvolution(pokemon.ID)?.Evolutions?.length">
        <h3>Evolution :</h3>
        <div v-for="evolution in getEvolution(pokemon.ID)?.Evolutions" :key="evolution.Method + evolution.Param + evolution.Target">
          <div class="method">
            <h5>{{ formatMethod(evolution.Method) }} {{ evolution.Param }}</h5>
            <img :src="getSprite(getPokemonIDByName(evolution.Target))" :alt="evolution.Target" @click="searchPokemon(evolution.Target)" style="cursor: pointer;"/>
          </div>
        </div>
      </div>
    </div>
  </div>
  </main>
</template>

<style scoped>
  h5{
    font-size: 17px;
  }
  a{
    margin-left: 8px;
  }
  select{
    cursor: pointer;
    width: 100%;
    max-width: 300px;
    margin: 0 auto;
    padding: 8px;
    background-color: var(--White);
    border: none;
    border-radius: 4px;
    box-shadow: 0 1px 5px var(--Black);
    position: absolute;
  }
  #sort{
    top: 160px;
  }
  #filter{
    top: 210px;
  }
  .input{
    width: 300px;
    position: sticky;
    z-index: 20;
    top: 85px;
    
    input {
      width: 100%;
      height: 50px;
      padding-left: 15px;
      margin-bottom: 150px;
      border-radius: 50px;
      outline: none;
      border: 2px solid var(--Black);
      box-shadow: 0 1px 5px var(--Black);
    }
    ion-icon{
      position: absolute;
      top: 17.5px;
      right: 15px;
      cursor: pointer;
    }
  }
  main{
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 85px;

    .cards{
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 16px 14px;
      margin: 0 14px 32px 14px;

      .card{
        display: flex;
        flex-direction: column;
        align-items: start;
        gap: 16px;
        width: 300px;
        background-color: #ededed;
        padding: 8px 16px;
        border-radius: 8px;
        color: var(--Black);
        
        h3{
          font-size: 17px;
          color: rgb(0, 0, 191);
        }
        .name{
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .type_container{
          display: flex;
          gap: 8px;

          img{
            width: 85px;
          }
        }
        .stats_container{
          display: flex;
          gap: 8px;

          .text_stats{
            display: flex;
            flex-direction: column;
            gap: 7px;
          }
          .barre_stats{
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: center;
            font-weight: 700;
            font-size: 17px;
            gap: 7px;
            
            .barre{
              display: flex;
              justify-content: center;
              align-items: center;
              max-width: 150px;
              height: 20px;
              border: 1px solid var(--Black);
            }
            .barre_hp{
              background-color: #a0f0a0;
            }
            .barre_atk{
              background-color: #F6E979;
            }
            .barre_def{
              background-color: #F8B277;
            }
            .barre_spa{
              background-color: #81DEE6;
            }
            .barre_spd{
              background-color: #86A5F7;
            }
            .barre_spe{
              background-color: #CB81F2;
            }
            .buff{
              color: #003cff;
            }
            .debuff{
              color: #B22222;
            }
          }
        }
        .learn_set{
          width: 100%;
          max-height: 200px;
          overflow-y: auto;
          padding: 0 16px;
        }
        .evo{
          .method{
            display: flex;
            align-items: center;
            padding: 16px;
            
            img{
              margin-left: 8px;
            }
          }
        }
      }
    }
  }

  @media screen and (min-width: 950px){
    select{ 
      left: 50px;
    }
    main{
      align-items: start;
    }
  }
</style>