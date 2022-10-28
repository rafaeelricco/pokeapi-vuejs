<template>
  <div class="app">
    <Search :search="search" @search="search = $event" />
    <Cards :filteredPokemons="filteredPokemons" />
  </div>
</template>

<script>
import axios from 'axios'
import Cards from './components/Cards.vue'
import Search from './components/Search.vue'

export default {
  name: 'App',
  data() {
    // estado inicial
    return {
      search: '',
      pokemons: [],
      active: false
    }
  },

  mounted() {
    axios
      // requisição para obter todos os pokemons
      .get('https://pokeapi.co/api/v2/pokemon?limit=100')
      .then((response) => {
        this.pokemons = response.data.results
      })
  },

  computed: {
    // filtrar os pokemons pelo input de pesquisa
    filteredPokemons() {
      return this.pokemons.filter((pokemon) => {
        return pokemon.name.includes(this.search.toLowerCase())
      })
    }
  },
  components: { Search, Cards }
}
</script>
