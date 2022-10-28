<template>
  <div>
    <div class="cards">
      <div
        v-for="pokemon in filteredPokemons"
        :key="pokemon.id"
        :v-model="active"
      >
        <div
          class="card"
          @click="show_pokemon(get_id(pokemon)), show_specie(get_id(pokemon))"
        >
          <img
            class="image-card"
            :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${get_id(
              pokemon
            )}.png`"
            :alt="pokemon.name"
            width="32%"
          />
          <h2 class="pokename-card">{{ get_name(pokemon) }}</h2>
        </div>
      </div>
    </div>
    <Dialog
      :active="active"
      :selected_pokemon="selected_pokemon"
      :evolutions="evolutions"
    />
  </div>
</template>
<script>
import axios from 'axios'
import Dialog from './Dialog.vue'

export default {
  name: 'CardsComponent',
  props: {
    // receber os pokemons filtrados
    filteredPokemons: Array
  },
  data() {
    // estado inicial
    return {
      active: false,
      selected_pokemon: {},
      evolutions: []
    }
  },
  methods: {
    get_id(pokemon) {
      // método para pegar o id do pokemon
      return pokemon.url.split('/')[6]
    },
    get_name(pokemon) {
      // método para formatar o nome do pokemon
      return pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)
    },
    show_pokemon(id) {
      // requisição para pegar as informações do pokemon
      axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`).then((response) => {
        this.selected_pokemon = response.data
        this.active = true
      })
    },
    show_specie(id) {
      axios
        // requisição para pegar o id da cadeia de evolução
        .get(`https://pokeapi.co/api/v2/pokemon-species/${id}/`)
        .then((response) => {
          const data = response.data
          const link = data.evolution_chain.url
          const id = link.split('/')[link.split('/').length - 2]

          // requisição para pegar a cadeia de evolução
          axios
            .get(`https://pokeapi.co/api/v2/evolution-chain/${id}/`)
            .then((response) => {
              const data = response.data // cadeia de evolução
              const chain = data.chain.species.name // primeira evolução
              const evolutions = [] // array para armazenar as evoluções
              if (data.chain.evolves_to.length > 0) {
                // se o pokemon tiver evolução
                const next = data.chain.evolves_to[0].species.name
                evolutions.push(next)
                if (data.chain.evolves_to[0].evolves_to.length > 0) {
                  // se o pokemon tiver segunda evolução
                  const next =
                    data.chain.evolves_to[0].evolves_to[0].species.name
                  evolutions.push(next)
                }
              }
              const evo = [chain, ...evolutions] // array com todas as evoluções
              this.evolutions = evo // atribuindo as evoluções ao estado
            })
        })
    }
  },
  components: { Dialog }
}
</script>

<style lang="scss" scoped>
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
}
.card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 8px;
  padding: 8px;
  border: 1px solid #ccc;
  cursor: pointer;
  border-radius: 1rem;
  transition: all 0.2s ease-out;
  &:hover {
    transform: scale(1.1);
    border-radius: 1.618rem;
  }
  .pokename-card {
    font-size: 1.218rem;
    text-align: center;
    transition: all 0.2s ease-in-out;
    &:hover {
      transform: scale(1.1);
      color: #1e1e1e;
    }
  }
}
</style>
