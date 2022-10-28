<template>
  <div class="center">
    <vs-dialog v-model="active" prevent-close blur auto-width>
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
            <i> <img class="icon-dialog" src="/icons/peso.svg" alt="icon" /> </i
            >Peso: {{ selected_pokemon.weight }}kg
          </h2>
          <h2 class="item-dialog">
            <i>
              <img class="icon-dialog" src="/icons/nivel.svg" alt="icon" />
            </i>
            Experiência: {{ selected_pokemon.base_experience }}HP
          </h2>
          <h2 class="item-dialog">
            <i> <img class="icon-dialog" src="/icons/tipo.svg" alt="icon" /> </i
            >Tipos:
          </h2>
          <div class="chips-dialog">
            <div v-for="type in selected_pokemon.types" :key="type.type.name">
              <Chips :text="type.type.name" />
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
              <Chips :text="ability.ability.name" />
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
              <Chips :text="`${stat.base_stat}  ${stat.stat.name}`" />
            </div>
          </div>
        </div>
      </div>
    </vs-dialog>
  </div>
</template>

<script>
import Chips from './Chips.vue'

export default {
  name: 'DialogComponent',
  components: {
    Chips
  },
  props: {
    // recebe o pokemon selecionado
    selected_pokemon: {
      type: Object,
      required: true
    },
    // recebe as evoluções do pokemon selecionado
    evolutions: {
      type: Array,
      required: true
    }
  },
  data() {
    // estado inicial
    return {
      active: false
    }
  },
  methods: {
    // metodo para formatar o nome do pokemon
    get_name(pokemon) {
      return pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)
    }
  },
  watch: {
    // observa o pokemon selecionado e abre o dialog
    selected_pokemon() {
      this.active = true
    }
  }
}
</script>

<style lang="scss" scoped>
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

.icon-dialog {
  width: 1.5rem;
  height: 1.5rem;
  transition: all 0.2s ease-in-out;
  &:hover {
    transform: scale(1.1);
  }
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
