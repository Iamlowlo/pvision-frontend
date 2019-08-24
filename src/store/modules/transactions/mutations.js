import merge from 'lodash/merge';
import Vue from 'vue';
import i18n from '@/i18n';

export const mutationNames = {
  SET_CONFIG: '[TRANSACTIONS]: Set transactions config',
  SET_TRANSACTIONS: '[TRANSACTIONS]: Set available transactions',
  SET_AVAILABLE_FILTERS: '[TRANSACTIONS]: Set available filter',
  SET_ACTIVE_FILTER: '[TRANSACTIONS]: Set active filter value'
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
  [mutationNames.SET_CONFIG]: (state, config) => {
    state.config = config;
  },
  [mutationNames.SET_TRANSACTIONS]: (state, transactions) => {
    Vue.set(state, 'list', transactions);
  },
  [mutationNames.SET_AVAILABLE_FILTERS]: (state, filters) => {
    const availableFilters = filters.reduce(
      (acc, transaction) => {
        acc = uniqueFilterMap(acc, transaction, 'action');
        acc = uniqueFilterMap(acc, transaction, 'currencyCode');
        return acc;
      },{
        action: [{
          msg:  i18n.t('messages.TRANSACTIONS_TYPE'),
          value: ''
        }],
        currencyCode: [{
          msg: i18n.t('messages.TRANSACTIONS_CURRENCY'),
          value: ''
        }]
      }
    );
    state.availableFilters = merge({ ...state.availableFilters}, availableFilters);
  },
  [mutationNames.SET_ACTIVE_FILTER]: (state, filters) => {
    state.filters = {
      ...state.filters,
      ...filters
    };
  }
};
