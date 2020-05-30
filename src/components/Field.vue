<template>
    <div class="app-body app-field">
        <div><span class="backBtn" v-if="loc!='field'" @click="goTo('field')">&lt; Back </span>Field<span v-if="loc!='field'"> - {{caps(loc)}}</span></div>
<pre v-if="loc=='field'"><span class="location" @click="goTo('cave')">  ___     O.          ____________________ o  ____/</span>                                     <span class="location" @click="goTo('mountain')">              /\      ()                /\       </span>
<span class="location" @click="goTo('cave')">8/| |\_______________/| .  _________     |\__/|   |</span>           ,                     .   <span class="location" @click="goTo('mountain')">             /  \    ()      /\        /  \      </span>
<span class="location" @click="goTo('cave')">/|| ||             , ||    /  | |  \   , ||  ||   |</span>                                     <span class="location" @click="goTo('mountain')">            /wwww\    ()    /ww\      /wwww\     </span>
<span class="location" @click="goTo('cave')">||| ||  .            ||    \       /     ||  ||___|</span>                                     <span class="location" @click="goTo('mountain')">     /\    /      \ :/\/\: /    \    /    . \    </span>
<span class="location" @click="goTo('cave')">|||_||   __    __    ||_____\     /_______|__|     </span>                           .         <span class="location" @click="goTo('mountain')">    /  \  /     ,  \/: : \/      \  /        \   </span>
<span class="location" @click="goTo('cave')">|||  |___||____||____|                             </span>          '                          <span class="location" @click="goTo('mountain')">   /    \/          \    /      . \/          \  </span>
<span class="location" @click="goTo('cave')">||                                                 </span>                                     <span class="location" @click="goTo('mountain')">  /     /    .       \  /         /            \ </span>
<span class="location" @click="goTo('cave')">|                                                  </span>                                     <span class="location" @click="goTo('mountain')"> / ,   /              \/         /              \</span>
      ,                                            <span class="location" @click="goTo('lab')">        _/                           </span><span class="location" @click="goTo('mountain')">/_____/________________\________/________________</span>
                                                   <span class="location" @click="goTo('lab')">   ____/         ____          ____      </span>                                             
                    .                         ,    <span class="location" @click="goTo('lab')">  /    \        /.::.\        /    \     </span>    '                     .                   
    '                                              <span class="location" @click="goTo('lab')"> {| () |}      /o   o \      {| () |}    </span>                                             
                                                   <span class="location" @click="goTo('lab')">  \____/      /   o   o\      \____/     </span>                                             
                                      '            <span class="location" @click="goTo('lab')">    /\        (########)        /\ \_    </span>               ,                        '    
            ,                                      <span class="location" @click="goTo('lab')">   /--\      / o   o   o\      /--\  \__ </span>                                             
                                                   <span class="location" @click="goTo('lab')">  / /\ \     |   o   o  |     / /\ \   \ </span>                                             
                                          .        <span class="location" @click="goTo('lab')"> /-/--\-\    (##########)    /-/--\-\    </span>    <span class="location" @click="goTo('plains')">, '  ,     '    .   ,   '        .       </span>
<span class="location" @click="goTo('lake')">    ____ .   _____________________   _____   </span>      <span class="location" @click="goTo('lab')">/ / /\ \ \   |  0 [] 0  |   / / /\ \ \   </span>    <span class="location" @click="goTo('plains')">    .    .    ///         .              </span>
<span class="location" @click="goTo('lake')">   /    \   /                     \_/     \  </span>                                                   <span class="location" @click="goTo('plains')">  nn    '    .       .     /|\ /|\       </span>
<span class="location" @click="goTo('lake')">  / ~    \_/               ~               \ </span>                                                   <span class="location" @click="goTo('plains')">   nn  ,          '        /|\ /|\ /|\   </span>
<span class="location" @click="goTo('lake')"> /              ~                           |</span>       '                                           <span class="location" @click="goTo('plains')">            ,            /|\ /|\ /|\ /|\ </span>
<span class="location" @click="goTo('lake')"> |                       __            ~    |</span>                                    .              <span class="location" @click="goTo('plains')">      .                , /|\ /|\ /|\ /|\ </span>
<span class="location" @click="goTo('lake')"> \      ~               /  \                |</span>                                                   <span class="location" @click="goTo('plains')">.  ,      ,        '     /|\ /|\ /|\ /|\ </span>
<span class="location" @click="goTo('lake')">  |           ~         |   \___            |</span>                .                                  <span class="location" @click="goTo('plains')">       .      .  ,     /|\ /|\ /|\ /|\   </span>
<span class="location" @click="goTo('lake')">  \                      \ -===-\          / </span>                                                   <span class="location" @click="goTo('plains')">  /|\  /|\   /|\ /|\   /|\ /|\ /|\ /|\   </span>
<span class="location" @click="goTo('lake')">   \                 ~    | |_|  \   ~    /  </span>                                                   <span class="location" @click="goTo('plains')">  /|\  /|\ . /|\^/|\   /|\ /|\ /|\ /|\   </span>
<span class="location" @click="goTo('lake')">    \  ~    __            / |_|   \______/   </span>                                                   <span class="location" @click="goTo('plains')">/|\ /|\ /|\ /|\/|\/|\ /|\ /|\ /|\ /|\ /|\</span>
<span class="location" @click="goTo('lake')">; ; ;\_____/  \  ~       /  |_|              </span>       ,                                           <span class="location" @click="goTo('plains')">/|\ /|\ /|\ /|\/|\/|\ /|\ /|\ /|\ /|\ /|\</span>
<span class="location" @click="goTo('lake')"> ; ;           \________/               .    </span>                                       '           <span class="location" @click="goTo('plains')">/|\ /|\ /|\ /|\/|\/|\ /|\ /|\ /|\ /|\ /|\</span></pre>
    <field-cave v-if="loc=='cave'"></field-cave>
    <field-mountain v-if="loc=='mountain'"></field-mountain>
    <field-lab v-if="loc=='lab'"></field-lab>
    <field-lake v-if="loc=='lake'"></field-lake>
    <field-plains v-if="loc=='plains'"></field-plains>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    
    export default{
        data() {
          let loc="field";
          return { loc }
        },
        computed: {
          ...mapState(['data','dex'])
        },
        methods: {
          goTo(l){
            this.loc = l;
          },
          caps(str){
            return str[0].toUpperCase() + str.substr(1);
          }
        }
    }
</script>

<style>
  .location {
    cursor: pointer;
  }
  .backBtn {
    cursor: pointer;
    float: left;
    margin-left: 10px;
  }
</style>