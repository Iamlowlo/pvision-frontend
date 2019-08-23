import merge from 'lodash/merge';
import Vue from 'vue';

export const mutationNames = {
  SET_CONFIG: '[TRANSACTIONS]: Set transactions config',
  SET_TRANSACTIONS: '[TRANSACTIONS]: Set available transactions',
  SET_AVAILABLE_FILTERS: '[TRANSACTIONS]: Set available filter',
  SET_ACTIVE_FILTER: '[TRANSACTIONS]: Set active filter value'
};

export default {
  [mutationNames.SET_CONFIG]: (state, config) => {
    state.config = config;
  },
  [mutationNames.SET_TRANSACTIONS]: (state, transactions) => {
    Vue.set(state, 'list', transactions);
  },
  [mutationNames.SET_AVAILABLE_FILTERS]: (state, filters) => {
    state.availableFilters = merge({ ...state.availableFilters}, filters);
  },
  [mutationNames.SET_ACTIVE_FILTER]: (state, filters) => {
    state.filters = {
      ...state.filters,
      ...filters
    };
  }
};
