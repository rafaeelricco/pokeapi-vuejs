<template>
  <div class="app">
    <img src="icons/copybase.png" class="copybase-logo" alt="copybase" />
    <!-- Search -->
    <vs-tooltip bottom>
      <div class="search-bar">
        <vs-input
          v-model="search"
          placeholder="Pesquise seu pokemon"
          icon-right
        >
          <template #icon>
            <i>
              <img style="width: 1rem" src="/icons/search.svg" alt="search" />
            </i>
          </template>
        </vs-input>
      </div>
      <template #tooltip> Digite o nome do seu Pokemon favorito </template>
    </vs-tooltip>
    <!-- Pokemon Cards -->
    <div class="cards">
      <div v-for="pokemon in filteredPokemons" :key="pokemon.id">
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
    <!-- Dialog modal -->
    <div class="center">
      <vs-dialog
        prevent-close
        v-if="selected_pokemon"
        blur
        auto-width
        v-model="active"
      >
        <div class="content-dialog">
          <img
            class="image-dialog"
            :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${selected_pokemon.id}.png`"
            :alt="selected_pokemon.name"
            width="80%"
          />
          <details class="details-dialog">
            <summary class="summary-dialog">Evoluções</summary>
            <div>
              <p
                class="evolutions-dialog"
                v-for="evolution in evolutions"
                :key="evolution"
              >
                <img
                  class="icon-dialog"
                  :src="`/icons/evolutions/level-${
                    evolutions.indexOf(evolution) + 1
                  }.svg`"
                  :alt="evolution"
                  width="24px"
                />
                {{ evolution }}
              </p>
            </div>
          </details>
          <div class="layout-container">
            <h1>{{ get_name(selected_pokemon) }}</h1>
            <h2 class="item-dialog">
              <i>
                <img class="icon-dialog" src="/icons/altura.svg" alt="icon" />
              </i>
              Altura: {{ selected_pokemon.height }}m
            </h2>
            <h2 class="item-dialog">
              <i>
                <img class="icon-dialog" src="/icons/peso.svg" alt="icon" /> </i
              >Peso: {{ selected_pokemon.weight }}kg
            </h2>
            <h2 class="item-dialog">
              <i>
                <img class="icon-dialog" src="/icons/nivel.svg" alt="icon" />
              </i>
              Experiência: {{ selected_pokemon.base_experience }}HP
            </h2>
            <h2 class="item-dialog">
              <i>
                <img class="icon-dialog" src="/icons/tipo.svg" alt="icon" /> </i
              >Tipos:
            </h2>
            <div class="chips-dialog">
              <div v-for="type in selected_pokemon.types" :key="type.type.name">
                <PokemonChips :text="type.type.name" />
              </div>
            </div>
            <h2 class="item-dialog">
              <i>
                <img
                  class="icon-dialog"
                  src="/icons/habilidades.svg"
                  alt="icon"
                /> </i
              >Habilidades:
            </h2>
            <div class="chips-dialog">
              <div
                v-for="ability in selected_pokemon.abilities"
                :key="ability.ability.name"
                color="primary"
                text-color="white"
              >
                <PokemonChips :text="ability.ability.name" />
              </div>
            </div>
            <h2>
              <i>
                <img
                  class="icon-dialog"
                  src="/icons/estatistica.svg"
                  alt="icon"
                /> </i
              >Estatísticas:
            </h2>
            <div class="chips-dialog">
              <div
                v-for="stat in selected_pokemon.stats"
                :key="stat.stat.name"
                text-color="white"
              >
                <PokemonChips :text="`${stat.base_stat}  ${stat.stat.name}`" />
              </div>
            </div>
          </div>
        </div>
      </vs-dialog>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import PokemonChips from './components/PokemonChips.vue'

export default {
  name: 'App',
  data() {
    return {
      search: '',
      pokemons: [],
      evolutions: [],
      active: false,
      selected_pokemon: null
    }
  },

  mounted() {
    axios
      // requisição para pegar todos os pokemons
      .get('https://pokeapi.co/api/v2/pokemon?limit=100')
      .then((response) => {
        this.pokemons = response.data.results
      })
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
        .get(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
        .then((response) => {
          const data = response.data
          const link = data.evolution_chain.url
          const id = link.split('/')[6]

          // requisição para pegar os nomes das evoluções
          axios
            .get(`https://pokeapi.co/api/v2/evolution-chain/${id}`)
            .then((response) => {
              const data = response.data
              const evolutio = data.chain.species.name
              const evolution_1 = data.chain.evolves_to[0].species.name
              const evolution_2 =
                data.chain.evolves_to[0].evolves_to[0].species.name
              const format = [evolutio, evolution_1, evolution_2]
              return (this.evolutions = format)
            })
        })
    }
  },

  computed: {
    // filtrar os pokemons pelo input de pesquisa
    filteredPokemons() {
      return this.pokemons.filter((pokemon) => {
        return pokemon.name.includes(this.search.toLowerCase())
      })
    }
  },
  components: { PokemonChips }
}
</script>

<style lang="scss">
/* Cards */
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
  border-radius: 1rem;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }

  .pokename-card {
    font-size: 1.218rem;
    text-align: center;
  }
}

/* Dialog */
.content-dialog {
  display: flex;
  padding: 1rem;
  flex-wrap: nowrap;
  flex-direction: column;
}

.layout-container {
  display: grid;
  gap: 4px;

  h1 {
    margin: 0 0 0.618rem 0;
  }
}

h2 {
  display: flex;
  gap: 5px;
  color: rgb(99, 99, 102);
  font-style: normal;
  font-weight: 500;
  font-size: 21px;
  margin: 6px 0;
}

.image-dialog {
  width: 100%;
}

.icon-dialog {
  width: 1.5rem;
  height: 1.5rem;
}

.name-dialog {
  font-style: normal;
  font-weight: 600;
  font-size: 40px;
  margin: 8px 0;
}

.chips-dialog {
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
  justify-content: flex-start;
  width: 272px;
  margin: -2px 0 0 0;
}

.item-dialog {
  color: rgb(99, 99, 102);
  font-style: normal;
  font-weight: 500;
  font-size: 21px;
  margin: 6px 0;
}

/* Details */
details[open] summary ~ * {
  animation: sweep 0.5s ease-in-out;
}

@keyframes sweep {
  0% {
    opacity: 0;
    margin-top: -10px;
  }

  100% {
    opacity: 1;
    margin-top: 0px;
  }
}

.summary-dialog {
  font-size: 21px;
  font-weight: 500;
  color: rgb(99, 99, 102);
  margin: 8px 0 8px 0;
  transition: all 0.2s ease-in-out;

  &:hover {
    color: rgb(16, 16, 16);
  }
}

.evolutions-dialog {
  display: flex;
  gap: 5px;
  font-size: 16px;
  margin: 8px 0 8px 0;
  font-weight: 600;
  color: rgb(99, 99, 102);
}
</style>
