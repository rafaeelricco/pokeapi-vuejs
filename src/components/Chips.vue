<template>
  <div class="pokemon-chips">
    <p class="text-chips">{{ text }}</p>
  </div>
</template>
<script>
export default {
  name: 'ChipsComponent',
  props: {
    // propriedade para receber o texto do chip
    text: String
  }
}
</script>

<style lang="scss">
.pokemon-chips {
  padding: 1px 16px;
  width: fit-content;
  height: 24px;
  background: #007aff;
  border-radius: 8px;
  text-transform: uppercase;
  display: flex;
  align-content: center;
  justify-content: center;
  align-items: center;
  .text-chips {
    font-size: 12px;
    font-weight: 600;
    color: #ffff;
  }
}
</style>
