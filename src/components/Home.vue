<template>
  <div class="app-body app-home">
    <h2>Bank</h2>
    <div>
      <span class="poke-type resource" :class="r.toUpperCase()" v-for="r in Object.keys(resources)" v-bind:key="r">
        <b>{{r.toUpperCase()}}</b><br/>{{resources[r]}}
      </span>
    </div>
    <h2>Shop</h2>
    <div>
      Receptionist - Auto start trainers<br/>
      Bigger Office - Max pending trainers +1<br/>
      Better Pokeballs - Max trainer levels +1<br/>
      Networking - Enable trainers to leave<br/>
      Larger [LOCATION] - Hold more pokemon<br/>
      Extended storage - Hold more resource<br/>
      Advertizing - Faster pending trainers<br/>
    </div>
  </div>
</template>

<script>
  import { mapState, mapGetters } from 'vuex'
  
  export default{
    data() { return { } },
    computed: {
      //...mapState(['data','dex']),
      ...mapGetters(['resources'])
    }
  }
</script>

<style>
  .office-item {
    display: inline-block;
    width: 100px;
    height: 110px;
    margin: 10px;
    padding: 5px;
    background-color: rgba(255,255,200,.3);
    border-radius: 10px;
    vertical-align: top;
  }
  .pendingTrainers{
    margin-bottom: 10px;
  }
  .activeTrainers{
    margin-top:10px;
  }
  .resource{
    display: inline-block;
    padding: 5px;
    border: 1px solid black;
    border-radius: 5px;
    margin: 3px;
    width: 120px;
    /* height: 100px; */
  }
</style>