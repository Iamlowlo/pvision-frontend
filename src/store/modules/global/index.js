import actions from './actions';
import mutations from './mutations';

export const initialState = () => ({
  isTablet: false,
  isDesktop: false,
  locale: 'en'
});

export default {
  namespaced: true,
  state: initialState(),
  mutations,
  actions
};
