import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

import gui from './data/gui'
import ments from './data/award'
import dex from './data/dex'

export default new Vuex.Store({
  state: {
    gui,
    dex,
    ments,
    stats: { startRegion: null, maxTrainer: 0, maxPokemon: 0 },
    data: {
      trainers: [],
      pendingTrainers: [],
      lab: { pokemon: [], lobbySize: 1 /* max 4 */ },
      store: [],
      unlocks: { pokemon: {}, resource: {}, region: {} },
      currency: {
        normal: 0,
        water: 0,
        flying: 0,
        grass: 0,
        psychic: 0,
        bug: 0,
        fire: 0,
        poison: 0,
        ground: 0,
        rock: 0,
        fighting: 0,
        dark: 0,
        steel: 0,
        electric: 0,
        dragon: 0,
        fairy: 0,
        ghost: 0,
        ice: 0,
        _max: 25
      }
    },
    timers: { office: 60000, trainers: 1000 },
    messages: []
  },
  mutations: {
    addMsg: (state, msg) => {
      state.messages.push(msg);
      setTimeout(() => state.messages.shift(), 5000);
    }
    , delMsg: (state, idx) => { state.messages.splice(idx, 1); }
    , addPokemon: (state, pokemon) => {
      if(!state.data.unlocks.pokemon[pokemon.ID])
        state.data.unlocks.pokemon[pokemon.ID] = 1;
      else
        state.data.unlocks.pokemon[pokemon.ID]++;
      state.data.lab.pokemon.push(pokemon);
    }
    , gameStarted: state => {
      Vue.set(state.data.unlocks,"game",true);
    }
    , trainerReady: (state, idx) => {
      switch(state.data.trainers[idx].style){
        case "collect":
          state.data.trainers[idx].timer = 25;
          state.data.trainers[idx].max += .1;
          break;
        case "max":
          state.data.trainers[idx].timer = 25;
          state.data.trainers[idx].max += .1;
          break;
        case "fast":
          state.data.trainers[idx].timer = 30;
          state.data.trainers[idx].max += .05;
          break;
        default:
          state.data.trainers[idx].timer = 30;
          state.data.trainers[idx].max += .1;
      }
      if(state.data.trainers[idx].max > 10)
        state.data.trainers[idx].max = 10;
    }
    , newTrainer: (state) => {
      if(state.data.trainers.length == 0 && state.data.pendingTrainers.length == 0){
        state.data.pendingTrainers.push({ id: 0, style: "normal" });
      }
      else if(state.data.pendingTrainers.length < state.data.lab.lobbySize){
        let style="normal";
        let tmp = Math.floor(Math.random() * 100);
        
        if(tmp==0) style="lucky";
        else if(tmp<3) style="challenge";
        else if(tmp<10) style="fast";
        //else if(tmp<30) style="max";
        //else if(tmp<50) style="collect";
        else style="normal";

        state.data.pendingTrainers.push({
          id: state.data.pendingTrainers.length + state.data.trainers.length
          , style });
      }
    }
    , addTrainer: (state, trainer) => {
      let t = {
        ...trainer,
        ...state.data.pendingTrainers.filter(t=>t.id==trainer.id)[0]
        , timer: 30
        , max: 1.0
        , region: state.stats.startRegion.toLowerCase()
      };
      console.log(t);
      
      state.data.trainers.push(t);
      state.data.pendingTrainers = state.data.pendingTrainers.filter(t=>t.id!=trainer.id);
    }
    , moveTrainer: (state, ID) => {
      let rgn = state.data.trainers.filter(t=>t.id==ID).region;
      switch(Math.floor(Math.random()*7)){
        case 0:
          if(rgn!="kanto") rgn="kanto"; break;
        case 1:
          if(rgn!="johto") rgn="johto"; break;
        case 2:
          if(rgn!="hoenn") rgn="hoenn"; break;
        case 3:
          if(rgn!="sinnoh") rgn="sinnoh"; break;
        case 4:
          if(rgn!="unova") rgn="unova"; break;
        case 5:
          if(rgn!="kalos") rgn="kalos"; break;
        case 6:
          if(rgn!="alola") rgn="alola"; break;
        default:
          rgn="kanto"; break;
      }
      state.data.trainers.filter(t=>t.id==ID).max=1.0;
      state.data.trainers.filter(t=>t.id==ID).region=rgn;
      state.data.unlocks.region[rgn]=true;
    }
    , addResource: (state, payload) => {
      if(state.data.currency[payload.type] > state.data.currency._max){

        return false;
      }
      state.data.currency[payload.type] += payload.num;
    }
    , setTab: (state, tab) => { 
      state.gui.curTab = tab;
    }
    , unlock: (state, item) => {
      switch(item){
        case "field":
          state.gui.unlockedField = true;
      }
    }
    , award: (state, item) => {
      if(state.ments.hasOwnProperty(item)){
        state.ments[item].unlock = true;
      }
    }
  },
  actions: {
    addMsg: ({ commit }, msg) => { commit('addMsg', msg) }
    , delMsg: ({ commit }, msg) => { commit('delMsg', msg) }
    , unlock: ({ commit }, item) => { commit('unlock', item) }
    , award: ({ commit }, item) => { 
      if(ments[item].unlock === false)
        commit('addMsg', `Award: ${ments[item].name}`);
      commit('award', item);
    }
    , setTab: ({ commit }, tab) => { commit('setTab', tab) }
    , addPokemon: ({ commit, state, dispatch }, pokemon) => {
      let t1 = dex[pokemon.ID].type1.toLowerCase();
      let t2 = dex[pokemon.ID].type2.toLowerCase();
      if(!state.data.unlocks.pokemon[pokemon.ID]){
        commit('addMsg', `Received first ${dex[pokemon.ID].name}`);
      }
      commit('addPokemon', pokemon);
      if(!state.data.unlocks.resource[t1]){
        state.data.unlocks.resource[t1]=true;
        dispatch("tickCurrency", t1);
      }
      if(!state.data.unlocks.resource[t2]){
        state.data.unlocks.resource[t2]=true;
        dispatch("tickCurrency", t2);
      }
      
      if(state.data.lab.pokemon.length >= 10)
        dispatch("award","poke_10");
      if(state.data.lab.pokemon.length >= 50)
        dispatch("award","poke_50");
      if(state.data.lab.pokemon.length >= 100)
        dispatch("award","poke_100");
      if(state.data.lab.pokemon.length >= 500)
        dispatch("award","poke_500");
      if(state.data.lab.pokemon.length >= 1000)
        dispatch("award","poke_1000");
    }
    , moveTrainer: ({ commit }, ID) => {
      commit("moveTrainer", ID);
      if(state.data.unlocks.region["kanto"])
        dispatch("award","loc_1");
      if(state.data.unlocks.region["johto"])
        dispatch("award","loc_2");
      if(state.data.unlocks.region["hoenn"])
        dispatch("award","loc_3");
      if(state.data.unlocks.region["sinnoh"])
        dispatch("award","loc_4");
      if(state.data.unlocks.region["unova"])
        dispatch("award","loc_5");
      if(state.data.unlocks.region["kalos"])
        dispatch("award","loc_6");
      if(state.data.unlocks.region["alola"])
        dispatch("award","loc_7");
    }
    , tickCurrency: ({ commit, state, dispatch }, type) => {
      let num = state.data.lab.pokemon.filter(p => dex[p.ID].type1.toLowerCase() == type).length;
      num += state.data.lab.pokemon.filter(p => state.dex[p.ID].type2.toLowerCase() == type).length;
      
      let thisTimer = 999999;
      if(num < 1){
        return false;
      } else if(num > 100){
        thisTimer=1;
        commit("addResource", { type, num: 1 + Math.floor(num/100) });
      } else {
        thisTimer = 1 - ((num-100)/num);
        commit("addResource", { type, num: 1 });
      }
      setTimeout(function() { dispatch('tickCurrency', type) }.bind(dispatch), thisTimer*100);
    }
    , tickTrainers: ({ commit, state, dispatch }) => {
      state.data.trainers.forEach((t,i)=>{
        t.timer--;
        if(t.style=="fast")
          t.timer--;
        
        if(t.timer<1){
          commit("trainerReady", i);
          let list = state.dex.filter(p => p.region==t.region);
          if(t.style=="challenge") {
            list = list.filter(p => p.rarity <= t.max + 1 && p.rarity >= t.max - 2);
          } else if(t.style=="lucky") {
            list = list.filter(p => p.rarity <= t.max + 1);
          } else {
            list = list.filter(p => p.rarity <= t.max);
          }
          let rnd = Math.floor(Math.random() * list.length);
          console.log(`${t.name} caught a ${list[rnd].name}`);
          dispatch("addPokemon",{ ID: list[rnd].id })
        }
      });
      setTimeout(function() { dispatch('tickTrainers') }.bind(dispatch), state.timers.trainers);
    }
    , pendingTrainer: ({ commit, state, dispatch }) => {
      let tmpNew = state.data.pendingTrainers.length;
      commit('newTrainer');
      if(tmpNew < state.data.pendingTrainers.length)
        dispatch("addMsg", "A trainer arrived at the office");
      setTimeout(function() { dispatch('pendingTrainer') }.bind(dispatch), state.timers.office);
    }
    , startTrainer: ({ commit, state, dispatch}, trainer) => {
      if(trainer.id == null){
        return false;
      }
      if(state.data.lab.pokemon.length<1){
        dispatch("addMsg",`You have no Pokemon to take.`);
        return false;
      }
      
      let list = state.data.lab.pokemon;
      let rnd = Math.floor(Math.random() * list.length);
      let id = list[rnd].ID;
      trainer["pokemon"] = state.data.lab.pokemon.splice(rnd,1)[0];
      
      commit("addTrainer", trainer);
      dispatch("addMsg",`${trainer.name} has chosen ${state.dex[id].name} to start their journey.`);
      
      if(!state.gui.unlockedField){
        setTimeout(function() { dispatch('tickTrainers') }.bind(dispatch), state.timers.trainers);
        dispatch("unlock",'field');
      }

      if(state.data.trainers.length > 0)
        dispatch("award","trainer_1");
      if(state.data.trainers.length > 4)
        dispatch("award","trainer_5");
      if(state.data.trainers.length > 24)
        dispatch("award","trainer_25");
      if(state.data.trainers.length > 99)
        dispatch("award","trainer_100");
    }
    , gameStarted: ({ commit, state, dispatch }, input) => {
      switch(input){
        case 1:
          state.stats.startRegion='Kanto';
          state.data.unlocks.region="kanto";
          dispatch("award","loc_1");
          dispatch('addPokemon',{ ID: 0 });
          dispatch('addPokemon',{ ID: 3 });
          dispatch('addPokemon',{ ID: 6 });
          break;
        case 2:
          state.stats.startRegion='Johto';
          state.data.unlocks.region="johto";
          dispatch("award","loc_2");
          dispatch('addPokemon',{ ID: 151 });
          dispatch('addPokemon',{ ID: 154 });
          dispatch('addPokemon',{ ID: 157 });
          break;
        case 3:
          state.stats.startRegion='Hoenn';
          state.data.unlocks.region="hoenn";
          dispatch("award","loc_3");
          dispatch('addPokemon',{ ID: 251 });
          dispatch('addPokemon',{ ID: 254 });
          dispatch('addPokemon',{ ID: 257 });
          break;
        case 4:
          state.stats.startRegion='Sinnoh';
          state.data.unlocks.region="sinnoh";
          dispatch("award","loc_4");
          dispatch('addPokemon',{ ID: 386 });
          dispatch('addPokemon',{ ID: 389 });
          dispatch('addPokemon',{ ID: 392 });
          break;
        case 5:
          state.stats.startRegion='Unova';
          state.data.unlocks.region="unova";
          dispatch("award","loc_5");
          dispatch('addPokemon',{ ID: 494 });
          dispatch('addPokemon',{ ID: 497 });
          dispatch('addPokemon',{ ID: 500 });
          break;
        case 6:
          state.stats.startRegion='Kalos';
          state.data.unlocks.region="kalos";
          dispatch("award","loc_6");
          dispatch('addPokemon',{ ID: 649 });
          dispatch('addPokemon',{ ID: 652 });
          dispatch('addPokemon',{ ID: 655 });
          break;
        case 7:
          state.stats.startRegion='Alola';
          state.data.unlocks.region="alola";
          dispatch("award","loc_7");
          dispatch('addPokemon',{ ID: 721 });
          dispatch('addPokemon',{ ID: 724 });
          dispatch('addPokemon',{ ID: 727 });
          break;
      }
      commit('gameStarted');
      setTimeout(function() { dispatch('pendingTrainer') }.bind(dispatch), 2000);
    }
  },
  getters: {
    gen1: () => { return dex.filter( mon => mon.region === "kanto" ) }
    , gen2: () => { return dex.filter( mon => mon.region === "johto" ) }
    , gen3: () => { return dex.filter( mon => mon.region === "hoenn" ) }
    , gen4: () => { return dex.filter( mon => mon.region === "sinnoh" ) }
    , gen5: () => { return dex.filter( mon => mon.region === "unova" ) }
    , gen6: () => { return dex.filter( mon => mon.region === "kalos" ) }
    , gen7: () => { return dex.filter( mon => mon.region === "alola" ) }
    , gen8: () => { return dex.filter( mon => mon.region === "galar" ) }
    , normal: state => { return state.data.lab.pokemon.filter(p=>dex[p.ID].type1.toLowerCase()=='normal' || dex[p.ID].type2.toLowerCase()=='normal') }
    , water: state => { return state.data.lab.pokemon.filter(p=>dex[p.ID].type1.toLowerCase()=='water' || dex[p.ID].type2.toLowerCase()=='water') }
    , flying: state => { return state.data.lab.pokemon.filter(p=>dex[p.ID].type1.toLowerCase()=='flying' || dex[p.ID].type2.toLowerCase()=='flying') }
    , grass: state => { return state.data.lab.pokemon.filter(p=>dex[p.ID].type1.toLowerCase()=='grass' || dex[p.ID].type2.toLowerCase()=='grass') }
    , psychic: state => { return state.data.lab.pokemon.filter(p=>dex[p.ID].type1.toLowerCase()=='psychic' || dex[p.ID].type2.toLowerCase()=='psychic') }
    , bug: state => { return state.data.lab.pokemon.filter(p=>dex[p.ID].type1.toLowerCase()=='bug' || dex[p.ID].type2.toLowerCase()=='bug') }
    , fire: state => { return state.data.lab.pokemon.filter(p=>dex[p.ID].type1.toLowerCase()=='fire' || dex[p.ID].type2.toLowerCase()=='fire') }
    , poison: state => { return state.data.lab.pokemon.filter(p=>dex[p.ID].type1.toLowerCase()=='poison' || dex[p.ID].type2.toLowerCase()=='poison') }
    , ground: state => { return state.data.lab.pokemon.filter(p=>dex[p.ID].type1.toLowerCase()=='ground' || dex[p.ID].type2.toLowerCase()=='ground') }
    , rock: state => { return state.data.lab.pokemon.filter(p=>dex[p.ID].type1.toLowerCase()=='rock' || dex[p.ID].type2.toLowerCase()=='rock') }
    , fighting: state => { return state.data.lab.pokemon.filter(p=>dex[p.ID].type1.toLowerCase()=='fighting' || dex[p.ID].type2.toLowerCase()=='fighting') }
    , dark: state => { return state.data.lab.pokemon.filter(p=>dex[p.ID].type1.toLowerCase()=='dark' || dex[p.ID].type2.toLowerCase()=='dark') }
    , steel: state => { return state.data.lab.pokemon.filter(p=>dex[p.ID].type1.toLowerCase()=='steel' || dex[p.ID].type2.toLowerCase()=='steel') }
    , electric: state => { return state.data.lab.pokemon.filter(p=>dex[p.ID].type1.toLowerCase()=='electric' || dex[p.ID].type2.toLowerCase()=='electric') }
    , dragon: state => { return state.data.lab.pokemon.filter(p=>dex[p.ID].type1.toLowerCase()=='dragon' || dex[p.ID].type2.toLowerCase()=='dragon') }
    , fairy: state => { return state.data.lab.pokemon.filter(p=>dex[p.ID].type1.toLowerCase()=='fairy' || dex[p.ID].type2.toLowerCase()=='fairy') }
    , ghost: state => { return state.data.lab.pokemon.filter(p=>dex[p.ID].type1.toLowerCase()=='ghost' || dex[p.ID].type2.toLowerCase()=='ghost') }
    , ice: state => { return state.data.lab.pokemon.filter(p=>dex[p.ID].type1.toLowerCase()=='ice' || dex[p.ID].type2.toLowerCase()=='ice') }
    , awards: () => { return Object.values(ments).filter( award => award.unlock === true ) }
    , ttlAwards: () => { return Object.keys(ments).length }
    , pendingTrainers: state => state.data.pendingTrainers
    , activeTrainers: state => state.data.trainers
    , resources: state => state.data.currency
  }
})