<template>
    <div><pre>      \  ~~                                             ~~                                                                              
       \_               ~~                                                                                                   ~~         
         \___                                                                                     ~~                                    
             \                                                                 ~~                                  -unununu-            
              \____                             ~~                                                                  [ _#- ]             
                   \   ~~                                                               ~~                          |    _|             
                    \                                                                    _____________________      |- #  |   ~~        
             @       \                                             ~~                   /                     \     |   _ |       %%    
           /|_|\      \_             ~~                                                 \                      \___ | -#  | ___  %%%%   
         @   |          \___  ~~                                                         \                         \|_   -|/   \%%%%%%% 
       /|_|\   @            \                                               ~~            |                         |  #_ |======,%%%%%%
         |   /|_|\           \                         ~~                                 /                         | -   |      \%%%%% 
_______________|______________\__________________________________________________________/__________________________|__#__|_______\%%%%%</pre>
    <span @click="show('fighting')" class="clickable poke-type FIGHTING">FIGHTING {{fighting.length}}</span>
    <span @click="show('water')" class="clickable poke-type WATER">WATER {{water.length}}</span>
    <span @click="show('poison')" class="clickable poke-type POISON">POISON {{poison.length}}</span>
    <div class="locPokes" v-if="!!type && poke.length > 0">
      <span class="locPoke" v-for="(p,i) in poke" v-bind:key="i">
        <span>{{p.name}} {{
          (type=="fighting" ? fighting
          : type=="water" ? water
          : poison).filter(pk => pk.ID == p.id).length}}</span>
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
      ...mapGetters(['fighting','water','poison'])
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