<template>
    <div class="app-messages">
        <div class="app-message" :key="messages.indexOf(msg)" v-for="msg in messages" @click="delMsg(messages.indexOf(msg))">{{ msg }}</div>
    </div>
</template>

<style>
.app-messages{
    position: absolute;
    bottom: 0;
    right: 5px;
    width: 40%;
}
.app-message{
    padding: 5px 10px;
    margin: 0 auto 5px auto;
    border-radius: 5px;
    background-color: rgb(217, 213, 206);
    max-width: 100%;
    cursor: pointer;
}
.app-message:hover{
    background-color: rgb(191, 189, 184);
}
</style>

<script>
    import { mapState, mapActions } from 'vuex'

    export default{
        data() { return { } },
        methods: {
            ...mapActions(['addMsg', 'delMsg'])
        },
        computed: {
            ...mapState(['messages'])
        }
    }
</script>