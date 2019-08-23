import { TransactionsService } from '@/services/transactionsService';
import { mutationNames } from './mutations';

export const actionNames = {
  GET_TRANSACTIONS: '[TRANSACTIONS]: Request available transactions'
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
      filterVal => filterVal.msg === value[filterName]
    ) < 0
  ) {
    acc[filterName].push({
      msg: value[filterName],
      value: value[filterName]
    });
  }
  return acc;
};

export default {
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
          console.log('OK', resp);
          resolve(resp);
        })
        .catch(err => {
          console.log('error', err);
          reject(err);
        });
    });
  }
};
