<template>
    <div><pre>                                                        `                                                                               
 .-+-. .-+-.           '                         ,                .                                               `    /\               
 |*^~| |^*~|                      .                                                   '                 ,             /' \      /\      
 |___| |___|                                                 '                                             /\        /_  _\    / .\     
 /  /  /  /          .                                                      `           .                 /  \        /  \    /_  _\    
/__/  /__/                     ,        .--..--..--..--.   .                                        /\   /_  _\      /    \    /  \     
               `                       / q / P / q / q /                                           / `\   /  \      /\   " \  /    \    
.-+-. .-+-.                           / q / p / p / p /                            ,              /_  _\ /'   \    / .\   __\/  :  /\   
|^~*| |*~^|                          / P / p / q / P /                                    /\       /  \ /    ; \  /_  _\  \ /\    /  \  
|___| |___|                         / p / q / q / q /                 '                  /  \     / *  \__    __\  /  \ ;  /  \  /_' _\ 
/  /  /  /  ,         '            /.-./.-./.-./.-./                                    /_  _\   /    . \/  /\\   /  " \  /_  _\  /  \  
__/  /__/      .                .                            ,              .      /\    /  \   /__ ,  __\ /` \\ / `    \  /  \` / :  \ 
__________________________________________________________________________________/__\__/____\____/____\__/____\/________\/____\/______\</pre>
    <span @click="show('ghost')" class="clickable poke-type GHOST">GHOST {{ghost.length}}</span>
    <span @click="show('grass')" class="clickable poke-type GRASS">GRASS {{grass.length}}</span>
    <span @click="show('bug')" class="clickable poke-type BUG">BUG {{bug.length}}</span>
    <span @click="show('fairy')" class="clickable poke-type FAIRY">FAIRY {{fairy.length}}</span>
    <div class="locPokes" v-if="!!type && poke.length > 0">
      <span class="locPoke" v-for="(p,i) in poke" v-bind:key="i">
        <span>{{p.name}} {{
          (type=="ghost" ? ghost
          : type=="grass" ? grass
          : type=="bug" ? bug
          : fairy).filter(pk => pk.ID == p.id).length}}</span>
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
      ...mapGetters(['ghost','grass','bug','fairy'])
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