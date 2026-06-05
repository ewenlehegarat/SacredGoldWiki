<script setup>
    import itemLocation from './json/ImportantItemLocations.json'

    const splitNames = (name) => {
        if (!name) return []
        return name.split(',').map(s => s.trim()).filter(s => s && s.toLowerCase() !== 'etc')
    }
</script>

<template>
    <main>
        <div class="divs" v-for="technicalMachine in itemLocation.technical_machines" :key="technicalMachine.id">
            <div class="info">
                <div class="title">
                    <img :src="technicalMachine.type ? `/src/assets/img/item/tm/image/${technicalMachine.type}.png` : '/src/assets/img/item/tm/image/Fighting.png'" :alt="technicalMachine.type ? technicalMachine.type + ' TM Location' : 'TM'" class="tm_image">
                    <h2>{{ technicalMachine.id }}</h2>
                </div>
                <h3>{{ technicalMachine.name }}</h3>
                <p>{{ technicalMachine.location }}</p>
            </div>
            <img 
                :src="`/src/assets/img/item/held/location/${technicalMachine.name.toLowerCase().replace(' ', '_')}.png`"
                @error="e => e.target.style.display = 'none'"
            >
        </div>
        <div class="divs" v-for="EvolutionaryItemLocations in itemLocation.Evolutionary_Item_Locations" :key="EvolutionaryItemLocations.id">
            <div class="info">
                <div class="title">
                    <img :src="EvolutionaryItemLocations.name ? `/src/assets/img/item/held/image/${EvolutionaryItemLocations.name.toLowerCase().replace(/\s+/g, '_')}.png` : '/src/assets/img/item/tm/image/Fighting.png'" :alt="EvolutionaryItemLocations.name" class="held_item_image">
                    <h2>{{ EvolutionaryItemLocations.id }}</h2>
                </div>
                <h3>{{ EvolutionaryItemLocations.name }}</h3>
                <p>{{ EvolutionaryItemLocations.location }}</p>
            </div>
            <img 
                :src="`/src/assets/img/item/held/location/${EvolutionaryItemLocations.name.toLowerCase().replace(' ', '_')}.png`"
                @error="e => e.target.style.display = 'none'"
            >
        </div>
        <div class="divs" v-for="New_Key_Item_Locations in itemLocation.New_Key_Item_Locations" :key="New_Key_Item_Locations.id">
            <div class="info">
                <div class="title">
                    <img :src="New_Key_Item_Locations.name ? `/src/assets/img/item/key/image/${New_Key_Item_Locations.name.toLowerCase().replace(/\s+/g, '_')}.png` : '/src/assets/img/item/tm/image/Fighting.png'" :alt="New_Key_Item_Locations.name" class="held_item_image">
                    <h2>{{ New_Key_Item_Locations.id }}</h2>
                </div>
                <h3>{{ New_Key_Item_Locations.name }}</h3>
                <p>{{ New_Key_Item_Locations.location }}</p>
            </div>
            <img 
                :src="`/src/assets/img/item/held/location/${New_Key_Item_Locations.name.toLowerCase().replace(' ', '_')}.png`"
                @error="e => e.target.style.display = 'none'"
            >
        </div>
        <div class="divs" v-for="New_Fossil_Locations in itemLocation.New_Fossil_Locations" :key="New_Fossil_Locations.id">
            <div class="info">
                <div class="title">
                    <img src="/src/assets/img/item/fossil/image/Armor_Fossil.png" alt="Armor Fossil Image" class="fossil_image">
                    <img src="/src/assets/img/item/fossil/image/Dome_Fossil.png" alt="Dome Fossil Image" class="fossil_image">
                    <img src="/src/assets/img/item/fossil/image/Hexil_Fossil.png" alt="Hexil Fossil Image" class="fossil_image">
                    <img src="/src/assets/img/item/fossil/image/Root_Fossil.png" alt="Root Fossil Image" class="fossil_image">
                    <img src="/src/assets/img/item/fossil/image/Skull_Fossil.png" alt="Skull Fossil Image" class="fossil_image">
                    <h2>{{ New_Fossil_Locations.id }}</h2>
                </div>
                <h3>{{ New_Fossil_Locations.name }}</h3>
                <p>{{ New_Fossil_Locations.location }}</p>
            </div>
            <div class="image_wrap">
                <img src="/src/assets/img/item/fossil/location/Armor_Location.png" alt="Armor Fossil  Location Image">
                <img src="/src/assets/img/item/fossil/location/Dome_Location.png" alt="Dome Fossil  Location Image">
                <img src="/src/assets/img/item/fossil/location/Hexil_Location.png" alt="Hexil Fossil  Location Image">
                <img src="/src/assets/img/item/fossil/location/Root_Location.png" alt="Root Fossil  Location Image">
                <img src="/src/assets/img/item/fossil/location/Skull_Location.png" alt="Skull Fossil  Location Image">
            </div>
        </div>
        <div class="divs" v-for="New_Other_Item_Locations in itemLocation.New_Other_Item_Locations" :key="New_Other_Item_Locations.id">
            <div class="info">
                <div class="title">
                    <div v-if="New_Other_Item_Locations.name && New_Other_Item_Locations.name.length >= 1">
                        <img v-for="(part, idx) in splitNames(New_Other_Item_Locations.name)" :key="idx" :src="`/src/assets/img/item/other/image/${part.toLowerCase().replace(/\s+/g, '_')}.png`" :alt="part" class="held_item_image">
                    </div>
                    <div v-else>
                        <img src="/src/assets/img/item/other/image/Thick_Club.png" alt="Thick Club">
                        <img src="/src/assets/img/item/other/image/Light_Ball.png" alt="Light Ball">
                        <img src="/src/assets/img/item/other/image/Stick.png" alt="Stick">
                    </div>
                    <h2>{{ New_Other_Item_Locations.id }}</h2>
                </div>
                <h3>{{ New_Other_Item_Locations.name }}</h3>
                <p>{{ New_Other_Item_Locations.location }}</p>
            </div>
            <img 
                :src="`/src/assets/img/item/held/location/${New_Other_Item_Locations.name.toLowerCase().replace(' ', '_')}.png`"
                @error="e => e.target.style.display = 'none'"
            >
        </div>
    </main>
</template>

<style scoped>
    main{
        padding: 150px 32px 32px 32px;
        display: flex;
        flex-wrap: wrap;
        flex-direction: column;
        gap: 16px;

        .divs{
            width: 100%;
            display: flex;
            flex-direction: column;
            padding: 16px;
            background-color: var(--White);
            gap: 32px;
            border-radius: 16px;
    
            img{
                width: 100%;
                max-width: 1000px;
                border-radius: 8px;
            }
            .info{
                display: flex;
                flex-direction: column;
                max-width: 700px;

                h3{
                    margin: 4px 0;
                }
                .title{
                    display: flex;
                    gap: 4px;

                    .tm_image{
                        width: 24px;
                    }
                    .held_item_image{
                        width: 50px;
                    }
                    .fossil_image{
                        width: 50px;
                    }
                }
            }
            .image_wrap{
                width: 100%;
                display: flex;
                flex-direction: column;
                gap: 8px;

                img{
                    border-radius: 4px;
                }
            }
        }
    }

    @media screen and (min-width: 950px){
        main{
            .divs{
                flex-direction: row;
                justify-content: space-between;
            }
        }
    }
</style>