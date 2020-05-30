<template>
    <div><pre>         /              ||__.                               .-------------.                                                             
        /               ''  |                      ||       | .---------. |                                    __                       
       /                ____|        /--|--\       ||       | | ~~ ~ ~~ | |  (-       ||           __          }{                       
      /                /_____\      ()  |  ()     /__\      | |  ~~~ ~ ~| |  |       /__\         (~~)        /  \      _         .-`-. 
     /     ||     _                   __|__                 | .---------. | / \                    >&lt;         ]__[    -{ }-       +-o-+ 
    /     /__\   ( )                 /_____\                '-------------'                       (__)                 '-'        '-.-' 
   /             /~\         ______________________________________|______________________________________________________________      
  /              \_/        /|      _______________________       ______________________        _______________________          |\     
 /    ||                   / |     |  .-.     .-.        .-|     |   /  \     .-.       |      |\       ,-._.-'     \  |         | \    
/    (__)                 /  |     |-/---\---/---\------/--|     |--/----\---/---\------|      |-\-----/-------------\-|         |  \   
_________________________/   |     |/     `-'     \    /   |     |-`      `-'     \     |      |  `-.-`              | |         |   \  
|                       |    |     |_______________\__/____|     |_________________\____|      |______________________\|         |    \ 
|_______________________|____|___________________________________________________________________________________________________|_____\</pre>
    <span @click="show('psychic')" class="clickable poke-type PSYCHIC">PSYCHIC {{psychic.length}}</span>
    <span @click="show('electric')" class="clickable poke-type ELECTRIC">ELECTRIC {{electric.length}}</span>
    <span @click="show('steel')" class="clickable poke-type STEEL">STEEL {{steel.length}}</span>
    <span @click="show('normal')" class="clickable poke-type NORMAL">NORMAL {{normal.length}}</span>
    <div class="locPokes" v-if="!!type && poke.length > 0">
      <span class="locPoke" v-for="(p,i) in poke" v-bind:key="i">
        <span>{{p.name}} {{
          (type=="psychic" ? psychic
          : type=="electric" ? electric
          : type=="steel" ? steel
          : normal).filter(pk => pk.ID == p.id).length}}</span>
      </span>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapState } from 'vuex'
  
  export default{
    data() {
      let type = null;
      let poke = [];
      return { poke, type }
    },
    methods: {
      show(t){
        if(this.type == t){
          this.poke=[];
          this.type=null;
          return false;
        }
        this.type = t;
        this.poke = this.dex.filter(p => (p.type1.toLowerCase()==t || p.type2.toLowerCase()==t) && this[t].filter(pk => pk.ID == p.id).length);
      }
    },
    computed: {
      ...mapGetters(['psychic','electric','steel','normal'])
      , ...mapState(['dex'])
    }
  }
</script>

<style>
  .locPokes{
    margin-top: 15px;
  }.locPoke {
    padding: 5px;
    display: inline-block;
  } .locPoke:not(:first-child) {
    border-left: 1px solid black;
  }
</style>