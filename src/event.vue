<script>
    import specialEvent from './json/SpecialEvent.json'
    import pokemonData from './json/PokemonPersonalData.json'
 
    export default {
        data() {
            return {
                events: specialEvent,
                pokemo: pokemonData,
            }
        },
        methods: {
            getIds(id) {
                return Array.isArray(id) ? id : [id]
            },
            formatId(id) {
                return String(id).padStart(3, '0')
            },
            formatLevel(level) {
                if (level === null || level === undefined) return 'Varies'
                if (Array.isArray(level)) return level.join(' > ')
                return level
            },
            formatReqs(reqs) {
                if (!reqs || reqs.length === 0) return 'None'
                if (Array.isArray(reqs)) return reqs.join(', ')
                return reqs
            },
            getPokemonName(speciesOrId) {
                if (!speciesOrId) return ''
                if (typeof speciesOrId === 'number') {
                    const p = pokemonData.find(x => x.ID === speciesOrId)
                    return p ? p.Name : String(speciesOrId)
                }
                const byName = pokemonData.find(x => x.Name === speciesOrId)
                return byName ? byName.Name : speciesOrId
            },
            goToPokemon(speciesOrId) {
                const name = this.getPokemonName(speciesOrId)
                this.$router.push({ path: '/pokemonList', query: { search: name } })
            }
        }
    }
</script>
 
<template>
    <main>
 
        <!-- ── Non-Legendary ── -->
        <h2>Non-Legendary Encounters</h2>
 
        <div v-for="nonLegendary in events.Non_Legendary_Encounters" :key="String(nonLegendary.id ?? nonLegendary.name)" class="divs">
            <!-- Pseudo-Legend (has options array, no direct id) -->
            <template v-if="nonLegendary.options">
                <h3 class="tag">Pseudo-Legend</h3>
                <div v-for="option in nonLegendary.options" :key="option.pokemon_id" class="option_div">
                    <div class="option_row">
                        <p>{{ option.channel }}</p>
                        <ion-icon name="arrow-forward-outline"></ion-icon>
                        <p>#{{ formatId(option.pokemon_id) }} {{ option.pokemon }}</p>
                    </div>
                    <img
                        :src="`/src/assets/img/pokemon_animated_sprite/${option.pokemon_id}.gif`"
                        :alt="option.pokemon + ' sprite'"
                        @error="e => e.target.style.display = 'none'"
                        @click="goToPokemon(option.pokemon)"
                        style="cursor: pointer;"
                    >
                </div>
                <h4>Level : {{ formatLevel(nonLegendary.level) }}</h4>
                <h5>Requirements : {{ formatReqs(nonLegendary.requirements) }}</h5>
                <p>Guide : {{ nonLegendary.guide }}</p>
            </template>
 
            <!-- Normal non-legendary (single id) -->
            <template v-else>
                <h3>#{{ formatId(nonLegendary.id) }} {{ nonLegendary.name }}</h3>
                <img
                    :src="`/src/assets/img/pokemon_animated_sprite/${nonLegendary.id}.gif`"
                    :alt="nonLegendary.name + ' sprite'"
                    @error="e => e.target.style.display = 'none'"
                    @click="goToPokemon(nonLegendary.name)"
                    style="cursor: pointer;"
                >
                <h4>Level : {{ formatLevel(nonLegendary.level) }}</h4>
                <h5>Requirements : {{ formatReqs(nonLegendary.requirements) }}</h5>
                <p>Guide : {{ nonLegendary.guide }}</p>
            </template>
        </div>
 
        <!-- ── Gifted ── -->
        <h2>Gifted Pokémon</h2>
 
        <div v-for="gifted in events.Gifted_Pokemon" :key="String(gifted.id)" class="divs">
            <h3>#{{ getIds(gifted.id).map(id => formatId(id)).join(', ') }} {{ gifted.name }}</h3>
            <div class="sprites_row">
                <img
                    v-for="id in getIds(gifted.id)"
                    :key="id"
                    :src="`/src/assets/img/pokemon_animated_sprite/${id}.gif`"
                    :alt="gifted.name + ' sprite'"
                    @error="e => e.target.style.display = 'none'"
                    @click="goToPokemon(gifted.name)"
                    style="cursor: pointer;"
                >
            </div>
            <h4>Level : {{ formatLevel(gifted.level) }}</h4>
            <h5>Requirements : {{ formatReqs(gifted.requirements) }}</h5>
            <p>Guide : {{ gifted.guide }}</p>
        </div>
 
        <!-- ── Legendary ── -->
        <h2>Legendary Pokémon</h2>
 
        <div v-for="legendary in events.Legendary_Pokemon" :key="String(legendary.id)" class="divs">
            <h3>{{ legendary.name }}</h3>
            <h4>Level : {{ formatLevel(legendary.level) }}</h4>
            <h5>Requirements : {{ formatReqs(legendary.requirements) }}</h5>
            <p>Guide : {{ legendary.guide }}</p>
            <div class="sprites_row">
                <img
                    v-for="id in getIds(legendary.id)"
                    :key="id"
                    :src="`/src/assets/img/pokemon_animated_sprite/${id}.gif`"
                    :alt="legendary.name + ' sprite'"
                    @error="e => e.target.style.display = 'none'"
                    @click="goToPokemon(legendary.name)"
                    style="cursor: pointer;"
                >
            </div>
        </div>
 
    </main>
</template>

<style scoped>
    main{
        display: flex;
        flex-direction: column;
        gap: 16px;
        
        .divs{
            display: flex;
            flex-direction: column;
            justify-content: start;
            align-items: start;
            gap: 8px;
            padding: 16px;
            border-radius: 8px;

            .option_div{
                display: flex;
                flex-direction: column;
                justify-content: start;
                align-items: start;

                div{
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    height: 20px;
                }
            }
            .sprites_row {
                display: flex;
                align-items: end;
                gap: 8px;
            }
        }
    }
</style>