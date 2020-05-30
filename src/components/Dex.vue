<template>
  <div class="app-body app-dex" v-if="dex != null">
    <div class="app-dex-item" :key="p.name" v-for="(p,i) in dex">
      <app-poke
        :title="`Currently have ${data.lab.pokemon.filter(pk=>pk.ID==i).length}`"
        :pokeData="{ID: i}"
        v-if="!!data.unlocks.pokemon[i]"
      ></app-poke>
    </div>
  </div>
</template>

<script>
    import { mapState, mapGetters } from 'vuex'

    export default{
        data() { return { } },
        computed: {
            ...mapState(['dex','data'])
        }
    }
</script>

<style>
    .app-dex-item {
        display: inline-block;
        width: 100px;
        height: 100px;
        margin: 10px;
        padding: 5px;
        background-color: rgba(255,255,200,.3);
        border-radius: 10px;
        vertical-align: top;
    }
</style>