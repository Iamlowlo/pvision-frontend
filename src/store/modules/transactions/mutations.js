const mutationNames = {
  SET_TRANSACTIONS: '[TRANSACTIONS]: Set available transactions',
  SET_FILTER: '[TRANSACTIONS]: Set transactions filter'
};

export default {
  [mutationNames.SET_TRANSACTIONS]: (state, transactions) => {
    state.list = transactions;
  },
  [mutationNames.SET_FILTER]: (state, filters) => {
    state.filters = {
      ...state.filters,
      ...filters
    };
  }
};
