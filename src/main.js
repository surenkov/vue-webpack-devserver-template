import 'babel-polyfill';

import Vue from 'vue';
import Vuex, { Store } from 'vuex';
import VueRouter from 'vue-router';
import { sync } from 'vuex-router-sync';

import App from './App';

Vue.use(Vuex);
Vue.use(VueRouter);

const store = new Store({});
const router = new VueRouter({
  mode: 'history',
  base: '/manager',
});

sync(store, router);

new Vue({
  components: { App },
  render: h => h(App),
  store,
  router,
}).$mount('#app');

