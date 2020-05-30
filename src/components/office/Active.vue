<template>
  <span class="activeTrainer">
    <b>{{trainer.name}}</b><br/>
    Starter: {{dex[trainer.pokemon.ID].name}}<br/>
    Traveling: {{caps(trainer.region)}}<br/>
    <button v-if="trainer.max >= 10" @click="travel">Encourage</button>
  </span>
</template>

<script>
  import { mapActions, mapState } from 'vuex'
  
  export default{
    props: ['trainer'],
    data() { return { }; },
    methods: {
      ...mapActions(["moveTrainer"]),
      travel(){
        this.moveTrainer(trainer.id);
      },
      caps(str){
        return str[0].toUpperCase() + str.substr(1);
      }
    },
    computed: {
      ...mapState(['dex'])
    }
  }
</script>

<style>
  .activeTrainer{
    border: 1px solid #333333;
    display: inline-block;
    padding: 5px;
    margin: 0 3px;
  }
</style>