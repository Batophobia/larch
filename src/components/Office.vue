<template>
  <div class="app-body app-office">
    <h2>Office of Professor Larch</h2>
    <div>
      <div class="pendingTrainers">
        <app-pending class="pendingTrainer" v-for="(t,i) in pendingTrainers" v-bind:key="i" :trainer="t"></app-pending>
      </div>
      <div class="activeTrainers" v-if="activeTrainers.length > 0">
        <div>Active Trainers</div>
        <app-trainer class="activeTrainer" v-for="(t,i) in activeTrainers" v-bind:key="i" :trainer="t"></app-trainer>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState, mapGetters } from 'vuex'
  
  export default{
    data() { return { } },
    computed: {
      ...mapState(['data','dex']),
      ...mapGetters(['pendingTrainers', 'activeTrainers'])
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
</style>