import Vue from 'vue'
import App from './App.vue'
import store from './store'
import Message from './components/Message.vue'
import Navigation from './components/Navigation.vue'
import Office from './components/Office.vue'
import Home from './components/Home.vue'
import Field from './components/Field.vue'
import Stats from './components/Stats.vue'
import Dex from './components/Dex.vue'
import Pokemon from './components/Pokemon.vue'
import Pending from './components/office/Pending.vue'
import Active from './components/office/Active.vue'
import Cave from './components/field/Caves.vue'
import Mountain from './components/field/Mountains.vue'
import Lab from './components/field/Lab.vue'
import Lake from './components/field/Lake.vue'
import Plains from './components/field/Plains.vue'

Vue.component('app-messages', Message);
Vue.component('app-nav', Navigation);
Vue.component('app-home', Home);
Vue.component('app-office', Office);
Vue.component('app-field', Field);
Vue.component('app-stats', Stats);
Vue.component('app-dex', Dex);
Vue.component('app-poke', Pokemon);
Vue.component('app-pending', Pending);
Vue.component('app-trainer', Active);

Vue.component('field-cave', Cave);
Vue.component('field-mountain', Mountain);
Vue.component('field-lab', Lab);
Vue.component('field-lake', Lake);
Vue.component('field-plains', Plains);

new Vue({
  el: '#app',
  store,
  render: h => h(App)
})