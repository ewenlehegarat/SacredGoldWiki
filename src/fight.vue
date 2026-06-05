<script>
    import trainerData from './json/TrainerData.json'
    import pokemonData from './json/PokemonPersonalData.json'

    export default {
        data() {
            return {
                trainerData,
                pokemonData,
                selectedSplit: 'all'
            }
        },
        methods: {
            getPokemonSprite(speciesName) {
                const pokemon = pokemonData.find(p => p.Name === speciesName)
                if (!pokemon) return ''
                return `/src/assets/img/pokemon_animated_sprite/${pokemon.ID}.gif`
            },
            formatText(text) {
                if (!text) return ''
                return text.replace(/\n/g, '<br>')
            },
            handleTrainerSpriteError(e, name) {
                e.target.onerror = null
                e.target.removeAttribute('src')
                const base = name.replace(/ /g, '_')
                e.target.src = `/src/assets/img/trainer/Sprite_${base}.png`
            },
            getPokemonName(speciesName) {
                const pokemon = pokemonData.find(p => p.Name === speciesName)
                return pokemon ? pokemon.Name : speciesName
            },
            goToPokemon(speciesName) {
                const name = this.getPokemonName(speciesName)
                this.$router.push({ path: '/pokemonList', query: { search: name } })
            }
        },
        computed: {
            filteredTrainerData() {
                const splits = Object.values(this.trainerData)
                if (this.selectedSplit === 'all') return splits
                return splits.filter(splitData =>
                    splitData.split.toLowerCase() === this.selectedSplit
                )
            }
        }
    }
</script>

<template>
    <main>
        <div class="first_div divs">
            <table border="1" cellspacing="0" cellpadding="6">
                <thead>
                    <tr>
                        <th colspan="8">KEY</th>
                    </tr>
                    <tr>
                        <th rowspan="2">Trainer Sprite</th>
                        <th rowspan="2">Pokemon Sprite</th>
                        <th rowspan="2">Pokemon Sprite</th>
                        <th rowspan="2">Pokemon Sprite</th>
                        <th rowspan="2">Pokemon Sprite</th>
                        <th rowspan="2">Pokemon Sprite</th>
                        <th rowspan="2">Pokemon Sprite</th>
                        <th rowspan="2">Pokemon Sprite</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>Trainer Name</th>
                        <th>Pokemon 1</th>
                        <th>Pokemon 2</th>
                        <th>Pokemon 3</th>
                        <th>Pokemon 4</th>
                        <th>Pokemon 5</th>
                        <th>Pokemon 6</th>
                        <th>Pokemon Name</th>
                    </tr>
                    <tr>
                        <th>Notes</th>
                        <th>Level</th>
                        <th>Level</th>
                        <th>Level</th>
                        <th>Level</th>
                        <th>Level</th>
                        <th>Level</th>
                        <th>Level</th>
                    </tr>
                    <tr>
                        <th rowspan="2">RED = MANDATORY BATTLE</th>
                        <th>Nature<br>(+Stat -Stat)</th>
                        <th>Nature<br>(+Stat -Stat)</th>
                        <th>Nature<br>(+Stat -Stat)</th>
                        <th>Nature<br>(+Stat -Stat)</th>
                        <th>Nature<br>(+Stat -Stat)</th>
                        <th>Nature<br>(+Stat -Stat)</th>
                        <th>Nature<br>(+Stat -Stat)</th>
                    </tr>
                    <tr>
                        <th>Ability</th>
                        <th>Ability</th>
                        <th>Ability</th>
                        <th>Ability</th>
                        <th>Ability</th>
                        <th>Ability</th>
                        <th>Ability</th>
                    </tr>
                    <tr>
                        <th rowspan="3">BLUE = OPTIONAL BATTLE</th>
                        <th>Held Item</th>
                        <th>Held Item</th>
                        <th>Held Item</th>
                        <th>Held Item</th>
                        <th>Held Item</th>
                        <th>Held Item</th>
                        <th>Held Item</th>
                    </tr>
                    <tr>
                        <th>Move 1</th>
                        <th>Move 1</th>
                        <th>Move 1</th>
                        <th>Move 1</th>
                        <th>Move 1</th>
                        <th>Move 1</th>
                        <th>Move 1</th>
                    </tr>
                    <tr>
                        <th>Move 2</th>
                        <th>Move 2</th>
                        <th>Move 2</th>
                        <th>Move 2</th>
                        <th>Move 2</th>
                        <th>Move 2</th>
                        <th>Move 2</th>
                    </tr>
                    <tr>
                        <th rowspan="3">GREEN = ALLY TRAINER</th>
                        <th>Move 3</th>
                        <th>Move 3</th>
                        <th>Move 3</th>
                        <th>Move 3</th>
                        <th>Move 3</th>
                        <th>Move 3</th>
                        <th>Move 3</th>
                    </tr>
                    <tr>
                        <th>Move 4</th>
                        <th>Move 4</th>
                        <th>Move 4</th>
                        <th>Move 4</th>
                        <th>Move 4</th>
                        <th>Move 4</th>
                        <th>Move 4</th>
                    </tr>
                </tbody>
            </table>
        </div>
        <select v-model="selectedSplit" name="filter" id="filter">
            <option value="all">All Split</option>
            <option value="falkner split">Falkner Split</option>
            <option value="bugsy split">Bugsy Split</option>
            <option value="whitney split">Witney Split</option>
            <option value="morty split">Morty Split</option>
            <option value="chuck split">Chuck Split</option>
            <option value="jasmine split">Jasmine Split</option>
            <option value="pryce split">Pryce Split</option>
            <option value="clair split">Clair Split</option>
            <option value="champion split">Champion Split</option>
        </select>
        <div class="split" v-for="(splitData, splitKey) in filteredTrainerData" :key="splitKey">
            <div class="information_split">
                <h2>{{ splitData.split }}</h2>
                <h3>(Level Cap : {{ splitData.levelCap }})</h3>
            </div>

            <div v-for="location in splitData.locations" :key="location.name" class="divs">
                <table border="1" cellspacing="0" cellpadding="6">
                    <thead>
                        <tr>
                            <th colspan="8">{{ location.name }}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="trainer in location.trainers" :key="trainer.name" :class="trainer.importance">
                            <th>
                                <img
                                    loading="lazy"
                                    :src="`/src/assets/img/trainer/Sprite_${trainer.name.replace(/ /g, '_')}.gif`"
                                    @error="handleTrainerSpriteError($event, trainer.name)"
                                    :alt="trainer.name"
                                >
                                <h3>{{ trainer.name }}</h3>
                                <h3 v-html="formatText(trainer.notes)"></h3>
                            </th>
                            <th v-for="slotIndex in 6" :key="slotIndex" class="battle_poke">
                                <template v-if="trainer.pokemon[slotIndex - 1]">
                                    <div class="pokemon_case">
                                        <img 
                                            loading="lazy"
                                            :src="getPokemonSprite(trainer.pokemon[slotIndex - 1].species)" 
                                            :alt="trainer.pokemon[slotIndex - 1].species"
                                            @click="goToPokemon(trainer.pokemon[slotIndex - 1].species)"
                                            style="cursor: pointer;"
                                        >
                                        <span>{{ trainer.pokemon[slotIndex - 1].species }}</span>
                                        <span>{{ trainer.pokemon[slotIndex - 1].level }}</span>
                                        <span v-html="formatText(trainer.pokemon[slotIndex - 1].nature)"></span>
                                        <span>{{ trainer.pokemon[slotIndex - 1].ability }}</span>
                                        <span>{{ trainer.pokemon[slotIndex - 1].item }}</span>
                                        <span v-for="(move, moveIndex) in trainer.pokemon[slotIndex - 1].moves" :key="moveIndex">{{ move }}</span>
                                    </div>
                                </template>
                            </th>
                        </tr> 
                    </tbody>
                </table>
            </div>
        </div>
    </main>
</template>

<style scoped>
    .nav_space{
        padding-top: 150px;
    }

    .battle_poke{
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        box-sizing: border-box;
    }

    tr.obligation th:first-child {
        background-color: var(--Red);
    }
    tr.optionnal th:first-child {
        background-color: var(--Blue);
    }
    tr.ally th:first-child {
        background-color: var(--Green);
    }

    a{
        color: var(--Black);
    }

    .first_div{
        tbody{
            tr:nth-child(3){
                th:first-child{
                    background-color: var(--Red);
                }
            }
            tr:nth-child(5){
                th:first-child{
                    background-color: var(--Blue);
                }
            }
            tr:nth-child(8){
                th:first-child{
                    background-color: var(--Green);
                }
            }
        }
    }

    .divs{
        padding: 16px;
        background-color: var(--White);
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 20px;
        border-radius: 10px;
        overflow-y: hidden;
        box-sizing: border-box;

        table{
            width: 100%;
            min-width: 1000px;
            display: block;
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
            box-sizing: border-box;

            thead{
                tr{
                    background-color: var(--Black);
                    color: var(--White);
                }
            }

            tbody{
                tr{
                    display: table-row;
                }
            }

            tbody{
                tr{
                    th{
                        display: table-cell;
                        text-align: center;
                        width: 300px;

                        .pokemon_case {
                            display: flex;
                            flex-direction: column;
                            align-items: center;
                            gap: 4px;

                            img {
                                cursor: pointer;
                            }
                        }
                    }
                }
            }
        }
    }

    .split {
        display: flex;
        flex-direction: column;
        gap: 16px;
        width: 100%;
        box-sizing: border-box;
    }

    .information_split {
        display: flex;
        align-items: center;
        gap: 16px;
        margin: 0 0 0 56px;
        flex-wrap: wrap;

        h2{
            font-size: 2rem;
        }
        h3{
            color: rgb(8, 0, 255);
        }
    }

    select#filter {
        display: block;
        margin: 16px auto;
        max-width: 300px;
        width: 100%;
        padding: 6px 10px;
        font-size: 1rem;
        box-sizing: border-box;
    }

    @media (min-width: 200px) {
        .nav_space{
            padding-top: 120px;
        }

        .divs {
            padding: 6px;
            gap: 10px;

            table{
                min-width: 100%;
            }
        }

        .battle_poke {
            font-size: 0.6rem;
            min-width: 56px;
        }

        table th, table td {
            padding: 2px !important;
            font-size: 0.6rem;
        }

        .information_split {
            margin: 0;
            gap: 8px;

            h2 {
                font-size: 1rem;
            }
            h3 {
                font-size: 0.8rem;
            }
        }
    }

    @media (min-width: 480px) {
        .divs {
            padding: 8px;
            gap: 12px;

            table{
                min-width: 100%;
            }
        }

        .battle_poke {
            font-size: 0.65rem;
            min-width: 60px;
        }

        table th, table td {
            padding: 3px !important;
            font-size: 0.68rem;
        }

        .information_split {
            h2 {
                font-size: 1.05rem;
            }
            h3 {
                font-size: 0.85rem;
            }
        }
    }

    @media (min-width: 768px) {
        select#filter {
            margin: 16px 0;
        }
        
        .divs {
            padding: 10px;
            gap: 14px;

            table{
                min-width: 100%;
            }
        }

        .battle_poke {
            font-size: 0.72rem;
            min-width: 70px;
        }

        table th, table td {
            padding: 4px !important;
            font-size: 0.72rem;
        }

        .information_split {
            h2 {
                font-size: 1.2rem;
            }
            h3 {
                font-size: 0.9rem;
            }
        }
    }

    @media (min-width: 1024px) {
        .divs {
            padding: 14px;
            gap: 16px;

            table{
                min-width: 1200px;
            }
        }

        .battle_poke {
            font-size: 0.8rem;
            min-width: 80px;
        }

        table th, table td {
            padding: 5px !important;
            font-size: 0.8rem;
        }

        .information_split {
            margin: 0 0 0 36px;

            h2 {
                font-size: 1.6rem;
            }
            h3 {
                font-size: 1rem;
            }
        }
    }

    @media (min-width: 1440px) {
        .divs {
            padding: 18px;
            gap: 18px;

            table{
                min-width: 1400px;
            }
        }

        .battle_poke {
            font-size: 0.9rem;
            min-width: 90px;
        }

        table th, table td {
            padding: 6px !important;
            font-size: 0.9rem;
        }

        .information_split {
            margin: 0 0 0 48px;

            h2 {
                font-size: 1.8rem;
            }
            h3 {
                font-size: 1rem;
            }
        }
    }

    @media (min-width: 1600px) {
        .divs {
            padding: 24px;
            gap: 22px;

            table{
                min-width: 1500px;
            }
        }

        .battle_poke {
            font-size: 1rem;
            min-width: 100px;
        }

        table th, table td {
            padding: 8px !important;
            font-size: 1rem;
        }

        .information_split {
            margin: 0 0 0 56px;

            h2 {
                font-size: 2rem;
            }
            h3 {
                font-size: 1rem;
            }
        }
    }
</style>