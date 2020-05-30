<template>
  <span class="pendingTrainer">
    What was your name again?<br/>
    <input ref="name" type="text" placeholder="insert name" /><br/>
    Um, and are you a...<br/>
    <button @click="addTrainer(trainer,'m')">BOY</button><button @click="addTrainer(trainer,'f')">GIRL</button><br/>
  </span>
</template>

<script>
  import { mapActions } from 'vuex'
  
  export default{
    props: ['trainer'],
    data() { return { }; },
    methods: {
      ...mapActions(['addMsg', "startTrainer"]),
      addTrainer(idx, g){
        if(this.$refs.name.value==""){
          this.addMsg("Please enter a name.");
          return false;
        }
        idx['g'] = g;
        idx["name"] = this.$refs.name.value;
        this.startTrainer(idx);
      }
    },
  }
</script>

<style>
  .pendingTrainer{
    border: 1px solid #333333;
    display: inline-block;
    padding: 5px;
    margin: 0 3px;
  }
</style>