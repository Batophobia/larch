<template>
    <div class="app-body app-stats">
        <div class="app-stat-numbers">
            <div class="title">Stats</div>
            <div class="app-stat">Starting Region: {{ stats.startRegion }}</div>
            <div class="app-stat">Total Trainers: {{ data.trainers.length }}</div>
            <div class="app-stat">Total Pokemon: {{ data.lab.pokemon.length }}</div>
            <div class="app-stat">Best Trainer: {{ stats.maxTrainer }}</div>
            <div class="app-stat">Best Pokemon: {{ stats.maxPokemon }}</div>
        </div>
        <div class="app-achievements" v-if="awards != null">
            <div class="title">Awards ( {{ awards.length }} / {{ ttlAwards }} )</div>
            <div :key="a.name" v-for="a in awards" class="app-achievement">{{ a.name }}</div>
        </div>
    </div>
</template>

<style>
    .app-stat-numbers{
        width: 100%;
        height: 50%;
    }
    .app-stat{
        width: 30%;
        margin-top: 5px;
        display: inline-block;
    }
    .app-achievements{
        width: 100%;
        height: 50%;
    }   
    .app-achievement{
        width: 15%;
        height: 50px;
        border: 1px solid black;
        border-radius: 10px;
        margin-top: 5px;
        display: inline-block;
    } 
</style>

<script>
    import { mapState, mapGetters } from 'vuex'
    
    export default{
        data() { return { } },
        computed: {
            ...mapState(['stats', 'data']),
            ...mapGetters(['awards', 'numAwards', 'ttlAwards'])
        }
    }
</script>