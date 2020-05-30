<template>
    <div><pre>     )               ,sdRBbs.                                     _d$$$$$$$$b                                                           
  )   '-._          ;$$$$$$$$:                                   d`"'Y''"Y"''b              __                 __                       
__________)        d$Y'"Y"'"Y$b                                _/        |    \         _,-(  '~._          ,sdRBbs.                    
                  d"     \    "b                            __/         / \    \_____  (__________)        d''Y$$Y''b                   
                 /    |   \     \___                       /`          /            '\                    /    `'    \_____             
               _/    / \   |       '\                     |           |               |              ____/   \             '\           
            __/         |            |                   /           /                 \__          /`        |     \_       |          
         __/`           |          \_ \___          ____/           /              \_     '\       |           \      '\      \         
       /`                \   |       \   '\_       /`   _/         |                 '\     \ ____/                     \      |        
   ___/           /       \   \             `-._  /    /          / \         _/            |/`    _/                    |      \____   
  /`  _/          |        |   |                \/               /          /`           ___/    /`                      |          '\  
 /   /            /       / \                    \_              |         /           /`       /                       / \           \ 
/__________________________________________________\__________________________________/________________________________________________\</pre>
    <span @click="show('dragon')" class="clickable poke-type DRAGON">DRAGON {{dragon.length}}</span>
    <span @click="show('flying')" class="clickable poke-type FLYING">FLYING {{flying.length}}</span>
    <span @click="show('fire')" class="clickable poke-type FIRE">FIRE {{fire.length}}</span>
    <span @click="show('ice')" class="clickable poke-type ICE">ICE {{ice.length}}</span>
    <div class="locPokes" v-if="!!type && poke.length > 0">
      <span class="locPoke" v-for="(p,i) in poke" v-bind:key="i">
        <span>{{p.name}} {{
          (type=="dragon" ? dragon
          : type=="flying" ? flying
          : type=="fire" ? fire
          : ice).filter(pk => pk.ID == p.id).length}}</span>
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
      ...mapGetters(['dragon','flying','fire','ice'])
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