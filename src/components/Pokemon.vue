<template>
  <div>
    <div class="poke-name">{{ dex[pokeData.ID].name }}</div>
    <div
      :class="[dex[pokeData.ID].type1,'poke-type']"
    >{{ dex[pokeData.ID].type1 }}</div>
    <div
      v-if="dex[pokeData.ID].type1 != dex[pokeData.ID].type2"
      :class="[dex[pokeData.ID].type2,'poke-type']"
    >{{ dex[pokeData.ID].type2 }}</div>
  </div>
</template>

<script>
    import { mapState, mapGetters } from 'vuex'

    export default{
        props: ['pokeData'],
        data() { return { } },
        computed: {
            ...mapState(['dex'])
        }
    }
</script>

<style>
    .poke-name {
        font-weight: bold;
        font-size: 18px;
    }
</style>