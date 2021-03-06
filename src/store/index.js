import Vue from 'vue';
import Vuex from 'vuex';
import transactions from './modules/transactions';
import global from './modules/global';

Vue.use(Vuex);

export default new Vuex.Store({
  mutations: {},
  actions: {},
  modules: {
    global,
    transactions
  }
});
