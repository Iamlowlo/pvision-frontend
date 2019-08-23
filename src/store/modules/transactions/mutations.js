import merge from 'lodash/merge';

export const mutationNames = {
  SET_TRANSACTIONS: '[TRANSACTIONS]: Set available transactions',
  SET_AVAILABLE_FILTERS: '[TRANSACTIONS]: Set available filter',
  SET_ACTIVE_FILTER: '[TRANSACTIONS]: Set active filter value'
};

export default {
  [mutationNames.SET_TRANSACTIONS]: (state, transactions) => {
    state.list = transactions;
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
