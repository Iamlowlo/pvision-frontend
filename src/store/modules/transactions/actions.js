import { TransactionsService } from '@/services/transactionsService';
import { mutationNames } from './mutations';
import { brandNames } from "@/config/statics";

export const actionNames = {
  GET_TRANSACTIONS: '[TRANSACTIONS]: Request available transactions',
  GET_CONFIG: '[TRANSACTIONS]: Request transactions config'
};

const getQueryParams = obj => {
  const params = Object.entries(obj);
  return params.length
    ? `?${params
        .filter(param => !!param[1])
        .map(param => param.join('='))
        .join('&')}`
    : '';
};

export default {
  [actionNames.GET_CONFIG]: ({ commit }) => {
    return new Promise(resolve => {
      commit(mutationNames.SET_CONFIG, {
        brandNames: brandNames
      });
      resolve();
    });
  },
  [actionNames.GET_TRANSACTIONS]: ({ state, commit }) => {
    return new Promise((resolve, reject) => {
      TransactionsService.getTransactions(getQueryParams(state.filters))
        .then(resp => {
          commit(mutationNames.SET_AVAILABLE_FILTERS, resp);
          commit(mutationNames.SET_TRANSACTIONS, resp);
          resolve(resp);
        })
        .catch(err => {
          console.log('error', err);
          reject(err);
        });
    });
  }
};
