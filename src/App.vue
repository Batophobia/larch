<template>
  <div id="app">
    <div id="wrapp">
      <app-nav v-if="data.unlocks.game"></app-nav>
      <div v-else class="app-body">
        <h2>Hello Professor Larch!</h2>
        <div>Congratulations on starting your career as a researcher of Pokemon.</div>
        <div>Where would you like to open your office?</div>
        <div>
          <button @click="startGame(1)">Kanto</button>
          <button @click="startGame(2)">Johto</button>
          <button @click="startGame(3)">Hoenn</button>
          <button @click="startGame(4)">Sinnoh</button>
          <button @click="startGame(5)">Unova</button>
          <button @click="startGame(6)">Kalos</button>
          <button @click="startGame(7)">Alola</button>
          <!-- <button>Galar</button> -->
        </div>
      </div>
      <app-home v-if="gui.curTab=='home'"></app-home>
      <app-office v-if="gui.curTab=='office'"></app-office>
      <app-field v-if="gui.curTab=='field'"></app-field>
      <app-dex v-if="gui.curTab=='dex'"></app-dex>
      <app-stats v-if="gui.curTab=='stats'"></app-stats>
      <app-messages></app-messages>
    </div>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex'
  //import store from './store'

  export default{
      data() { return { } },
      methods: {
          ...mapActions(['addPokemon','gameStarted','award','setTab']),
          startGame(input) {
            this.gameStarted(input);
            this.award('starter');
            this.setTab('home')
          }
      },
      computed: {
          ...mapState(['gui', 'data'])
      }
  }
</script>

<style>
  body{
    background-color: rgb(103, 103, 113);
  }
  #app{
    margin: 0 auto;
    width: 850px;
    height: 100vh;
    position: relative;
    background-color: rgb(120, 143, 90);
  }
  .app-body {
      position: absolute;
      top: 30px;
      bottom: 0;
      left: 0;
      right: 0;
      overflow: auto;
      text-align: center;
  }
  pre{
    -moz-user-select: none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
    font-size: 10px;
  }
  .poke-type {
    margin-top: 5px;
    padding: 5px 3px;
    border-radius: 5px;
    background-color: #FFF;
  }
  .poke-type.GRASS {
    background-color: rgb(0, 182, 0);
  }.poke-type.POISON {
    background-color: rgb(202, 114, 253);
  }.poke-type.FIRE {
    background-color: rgb(255, 176, 30);
  }.poke-type.FLYING {
    background-color: rgb(38, 198, 226);
  }.poke-type.WATER {
    background-color: rgb(53, 73, 255);
    color: #EEE;
  }.poke-type.BUG {
    background-color: rgb(131, 255, 131);
  }.poke-type.ELECTRIC {
    background-color: rgb(252, 255, 50);
  }.poke-type.GROUND {
    background-color: rgb(199, 169, 106);
  }.poke-type.FAIRY {
    background-color: rgb(255, 202, 248);
  }.poke-type.FIGHTING {
    background-color: rgb(221, 38, 38);
    color: #EEE
  }.poke-type.PSYCHIC {
    background-color: rgb(255, 116, 213);
  }.poke-type.ICE {
    background-color: rgb(154, 248, 255);
  }.poke-type.GHOST {
    background-color: rgb(162, 0, 202);
    color: #FFF;
  }.poke-type.ROCK {
    background-color: rgb(112, 112, 112);
    color: #EEE;
  }.poke-type.STEEL {
    background-color: rgb(175, 175, 175);
  }.poke-type.DARK {
    background-color: rgb(55, 0, 77);
    color: #EEE;
  }.poke-type.DRAGON {
    background-color: rgb(255, 186, 122);
  }
  .clickable{
    cursor: pointer;
  }
</style>