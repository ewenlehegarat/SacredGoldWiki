<script>
    import Nav from './components/nav.vue'
    import encountersData from './json/Encounters.json'
    import PokemonData from './json/PokemonPersonalData.json'

    export default {
        components: { Nav },
        data() {
            return {
                encounters: encountersData,
                searchQuery: ''
            }
        },
        methods: {
            getImage(path) {
                return `/src/assets/img/location/${path}`
            },
            getSprite(pokemon) {
                if (pokemon.sprite) {
                    return `/src/assets/img/pokemon_animated_sprite/${pokemon.sprite}`
                }
                if (pokemon.form) {
                    return `/src/assets/img/pokemon_animated_sprite/${pokemon.id}-${pokemon.form}.gif`
                }
                return `/src/assets/img/pokemon_animated_sprite/${pokemon.id}.gif`
            },
            getPokemonName(id) {
                return PokemonData.find(p => p.ID === id)?.Name ?? id
            },
            goToPokemon(id) {
                const name = this.getPokemonName(id)
                this.$router.push({ path: '/pokemonList', query: { search: name } })
            }
        },
        computed: {
            filteredEncounters() {
                const search = (this.searchQuery || '').trim().toLowerCase()

                if (!search) {
                    return this.encounters
                }

                return this.encounters.filter(encounter => {
                    // Recherche sur le nom du lieu
                    if (encounter.name.toLowerCase().includes(search)) {
                        return true
                    }

                    // Recherche sur les Pokémon présents
                    return Object.values(encounter.methods).some(method =>
                        method.pokemon.some(pokemon =>
                            this.getPokemonName(pokemon.id)
                                .toLowerCase()
                                .includes(search)
                        )
                    )
                })
            }
        }
    }
</script>
 
<template>
    <Nav />
    <main>
        <div class="input">
            <input type="text" placeholder="Search a pokemon" v-model="searchQuery">
            <ion-icon name="close-outline" v-if="searchQuery.length > 0" @click="searchQuery = ''" ></ion-icon>
        </div>
        <div class="divs" v-for="encounter in filteredEncounters" :key="encounter.id">
            <h2>{{ encounter.name }} :</h2>
            <h4 v-if="encounter.levels !== 'N/A'">Wild Levels: {{ encounter.levels }}</h4>
            <div class="container">
                <img :src="getImage(encounter.image)" :alt="encounter.name + ' image'" class="location_image">
                <div class="method_container">
                    <div v-for="(method, key) in encounter.methods" :key="key" class="method">
                        <h3>{{ method.label }} :</h3>
                        <div class="pokemon_list">
                            <div v-for="(pokemon, pIndex) in method.pokemon" :key="pokemon.id" class="pokemon">
                                <span v-if="method.label === 'Pokemon Trade' && pIndex > 0" class="trade-sep">&gt;</span>
                                <img :src="getSprite(pokemon)" @click="goToPokemon(pokemon.id)">
                                <span v-if="pokemon.pct">{{ pokemon.pct }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<style scoped>
  
    .input{
        width: 100%;
        max-width: 300px;
        position: sticky;
        z-index: 20;
        top: 85px;
        margin: 0 auto;
        
        input {
            width: 100%;
            height: 50px;
            padding-left: 15px;
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
        padding: 85px 8px 32px 8px;
        gap: 25px;
        
        .divs{
            display: flex;
            flex-direction: column;
            width: 100%;
            padding: 12px 16px 24px 16px;
            background-color: var(--White);
            gap: 20px;
            border-radius: 10px;
            overflow-x: auto;

            h4{
                font-size: 18px;
                margin-left: 8px;
                color: rgb(0, 110, 194);
            }
            .container{
                display: flex;
                flex-direction: column;
                gap: 16px;
                
                .location_image{
                    width: 100%;
                    height: auto;
                    max-height: 300px;
                    object-fit: cover;
                    border-radius: 8px;
                }
                .method_container{
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    gap: 32px;

                    .method{
                        display: flex;
                        flex-direction: column;
                        gap: 16px;

                        h3{
                            font-size: 1rem;
                        }
                        .trade-sep{
                            align-self: center;
                        }
                        .pokemon_list{
                            width: 100%;
                            display: flex;
                            flex-wrap: wrap;
                            align-items: flex-end;
                            margin-left: 16px;
                            gap: 16px;

                            .pokemon{
                                display: flex;
                                align-items: flex-end;
                                gap: 8px;

                                img{
                                    cursor: pointer;
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    /* Tablet - 600px+ */
    @media screen and (min-width: 600px) {
        .input{
            margin: 0;
        }
        main{
            padding: 85px 24px 32px 24px;
            gap: 32px;
            
            .divs{
                padding: 20px 32px 40px 32px;
                gap: 24px;
                
                .container{
                    gap: 24px;
                    
                    .location_image{
                        max-height: 350px;
                    }
                }
            }
        }
    }

    /* Desktop - 950px+ */
    @media screen and (min-width: 950px) {
        main{
            padding: 85px 32px 40px 32px;
            gap: 40px;
            
            .divs{
                padding: 24px 40px 48px 40px;
                gap: 28px;
                
                h2{
                    font-size: 1.75rem;
                }
                
                h4{
                    font-size: 1.1rem;
                    margin-left: 12px;
                }
                
                .container{
                    flex-direction: row;
                    gap: 40px;
                    align-items: flex-start;

                    .location_image{
                        flex: 0 0 40%;
                        max-height: 400px;
                        width: auto;
                    }
                    
                    .method_container{
                        flex: 1;
                        gap: 40px;

                        .method{
                            gap: 20px;

                            h3{
                                font-size: 1.1rem;
                                min-width: 180px;
                            }
                            
                            .pokemon_list{
                                margin-left: 20px;
                                gap: 20px;
                            }
                        }
                    }
                }
            }
        }
    }

    /* Large Desktop - 1400px+ */
    @media screen and (min-width: 1400px) {
        main{
            padding: 85px 40px 40px 40px;
            
            .divs{
                padding: 28px 48px 56px 48px;
                gap: 32px;
                
                .container{
                    gap: 48px;

                    .location_image{
                        max-height: 450px;
                    }
                    
                    .method_container{
                        gap: 48px;

                        .method{
                            h3{
                                font-size: 1.15rem;
                            }
                        }
                    }
                }
            }
        }
    }
</style>