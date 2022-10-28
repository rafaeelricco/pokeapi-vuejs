<template>
  <vs-tooltip bottom>
    <div class="search-bar">
      <vs-input v-model="search" placeholder="Pesquise seu pokemon" icon-right>
        <template #icon>
          <i>
            <img style="width: 1rem" src="/icons/search.svg" alt="search" />
          </i>
        </template>
      </vs-input>
    </div>
    <template #tooltip> Digite o nome do seu Pokemon favorito </template>
  </vs-tooltip>
</template>
<script>
export default {
  name: 'SearchComponent',
  data() {
    // estado inicial
    return {
      search: ''
    }
  },
  methods: {
    // metodo para emitir o evento de pesquisa
    searchPokemon() {
      this.$emit('search', this.search)
    }
  },
  watch: {
    // observa o input de pesquisa
    search() {
      this.searchPokemon()
    }
  }
}
</script>
