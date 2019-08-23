export const mutationNames = {
  SET_IS_DESKTOP: '[GLOBAL]: set isDesktop property'
};

export default {
  [mutationNames.SET_IS_DESKTOP]: (state, isDesktop) => {
    state.isDesktop = isDesktop;
  }
};
