import { TransactionsService } from '@/services/transactionsService';
import { mutationNames } from './mutations';
import { brandNames } from "@/config/statics";
import i18n from '@/i18n';

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

const uniqueFilterMap = (acc, value, filterName) => {
  if (
    acc[filterName].findIndex(
      filterVal => filterVal.value === value[filterName]
    ) < 0
  ) {
    acc[filterName].push({
      msg: i18n.t(`messages.APP_${filterName}_${value[filterName]}`),
      value: value[filterName]
    });
  }
  return acc;
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
          const availableFilters = resp.reduce(
            (acc, transaction) => {
              acc = uniqueFilterMap(acc, transaction, 'action');
              acc = uniqueFilterMap(acc, transaction, 'currencyCode');
              return acc;
            },
            {
              action: [
                {
                  msg: 'Transaction type',
                  value: ''
                }
              ],
              currencyCode: [
                {
                  msg: 'Currency',
                  value: ''
                }
              ]
            }
          );
          commit(mutationNames.SET_AVAILABLE_FILTERS, availableFilters);
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
