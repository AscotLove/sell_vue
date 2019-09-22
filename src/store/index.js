import Vue from 'vue';
import Vuex, { Store } from 'vuex';


import mutations from './mutations';
import state from './state';
import getters from './getters';
import actions from './actions';


Vue.use(Vuex);


export default new Store({
  state,
  getters,
  mutations,
  actions,
})