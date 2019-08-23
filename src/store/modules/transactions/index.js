import actions from './actions';
import mutations from './mutations';

export const initialState = () => ({
  list: [],
  filters: {},
  availableFilters: {}
});

export default {
  namespaced: true,
  state: initialState(),
  actions,
  mutations
};
