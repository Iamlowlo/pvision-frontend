import mutations from './mutations';

export const initialState = () => ({
  isDesktop: false
});

export default {
  namespaced: true,
  state: initialState(),
  mutations
};
