import mutations from './mutations';

export const initialState = () => ({
  isDesktop: false,
  locale: 'en'
});

export default {
  namespaced: true,
  state: initialState(),
  mutations
};
