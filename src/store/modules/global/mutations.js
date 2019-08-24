export const mutationNames = {
  SET_IS_DESKTOP: '[GLOBAL]: set isDesktop property',
  SET_LOCALE: '[GLOBAL]: set locale'
};

export default {
  [mutationNames.SET_IS_DESKTOP]: (state, isDesktop) => {
    state.isDesktop = isDesktop;
  },
  [mutationNames.SET_LOCALE]: (state, locale) => {
    state.locale = locale;
  }
};
