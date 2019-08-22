import actions from './actions';
import mutations from './mutations';

export const initialState = () => ({
  list: [],
  filters: {}
});

export default {
  namespaced: true,
  state: initialState(),
  actions,
  mutations
};
