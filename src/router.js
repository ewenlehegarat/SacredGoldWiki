import { createRouter, createWebHistory } from 'vue-router'
import Home from './components/Home.vue'
import pokemonList from './pokemonList.vue'
import encounters from './encounters.vue'
import fight from './fight.vue'
import item from './item.vue'
import event from './event.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/pokemonList',
    name: 'PokemonList',
    component: pokemonList
  },
  {
    path: '/encounters',
    name: 'encounters',
    component: encounters
  },
  {
    path:'/fight',
    name:'fight',
    component: fight
  },
  {
    path: '/item',
    name: 'item',
    component: item
  },
  {
    path: '/event',
    name: 'event',
    component: event
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
