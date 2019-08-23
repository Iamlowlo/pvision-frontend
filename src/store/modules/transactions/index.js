import actions from './actions';
import mutations from './mutations';

export const initialState = () => ({
  list: [],
  config: {
    brandNames: {}
  },
  filters: {},
  availableFilters: {}
});

export default {
  namespaced: true,
  state: initialState(),
  actions,
  mutations
};
