import i18n from "@/i18n";

export const mutationNames = {
  SET_IS_DESKTOP: '[GLOBAL]: set isDesktop property',
  SET_IS_TABLET: '[GLOBAL]: set isTablet property',
  SET_LOCALE: '[GLOBAL]: set locale'
};

export default {
  [mutationNames.SET_IS_DESKTOP]: (state, isDesktop) => {
    state.isDesktop = isDesktop;
  },
  [mutationNames.SET_IS_TABLET]: (state, isTablet) => {
    state.isTablet = isTablet;
  },
  [mutationNames.SET_LOCALE]: (state, locale) => {
    i18n.locale = locale;
    state.locale = locale;
  }
};
