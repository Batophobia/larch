<template>
  <div><pre>                        _  ,-                 ____           _____                                                                       
       ____      ,-.__   \/                __/    '-.^,_  ,-'     `~.__                         .__,-._                ____,-.          .
   _.-'    '-,  |     '-.               ,-'             \/             '-.___       ,-.______,-'       `-.~^v^-.____,-'       \        / 
 ,V           \ |        |' ,'-.       /                                     \     |                                           \_      | 
/              \/        | /    \     /          _____   '       _____        \   /                                              |     | 
                         |/      \   /         _/ ::::\         / ::: \       |  /                                               |    /  
                                 |  /         / :::::  \       /  :::: )      \  |                                               \    |  
                                 |  |        ( :: __::  \_____/ ::::: /        \ \                                                \   |  
                                 \  |         \__/  \ :::::  :: _____/         | |                                                 |  /  
                                  | /                \___::::  /               \ \                                                  \ |  
                                  | |                    \____/                 ||          _.-\                                    | |   
    ,^-'~.                        /  \                                         / |         / :  |                   ,~`-._          / |  
___/_____|_______________________/___|________________________________________/___\_______(______\_________________{______)________/__\_ </pre>
    <span @click="show('dark')" class="clickable poke-type DARK">DARK {{dark.length}}</span>
    <span @click="show('ground')" class="clickable poke-type GROUND">GROUND {{ground.length}}</span>
    <span @click="show('rock')" class="clickable poke-type ROCK">ROCK {{rock.length}}</span>
    <div class="locPokes" v-if="!!type && poke.length > 0">
      <span class="locPoke" v-for="(p,i) in poke" v-bind:key="i">
        <span>{{p.name}} {{
          (type=="dark" ? dark
          : type=="ground" ? ground
          : rock).filter(pk => pk.ID == p.id).length}}</span>
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
      ...mapGetters(['dark','ground','rock'])
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