import Vue from 'vue';
import Router from 'vue-router';
import Transactions from '@/containers/Transactions/Transactions';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'transactions',
      component: Transactions
    }
  ]
});
