<template>
  <ul class="locale-selector">
    <li
      v-for="(localeElement, key) in localeList"
      :key="`locale-element-${key}`"
      class="locale-selector__element"
      :class="[localeElement === locale ? 'locale-selector__element--active' : '']"
      @click="setLocale(localeElement)"
    ><img :src="require(`@/assets/images/${localeElement}.jpg`)" alt=""></li>
  </ul>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { actionNames as globalActionNames } from '@/store/modules/global/actions';

export default {
  name: 'LocaleSelector',
  data: () => {
    return {
      localeList: [
        'en',
        'es'
      ]
    }
  },
  computed: {
    ...mapState('global', ['locale'])
  },
  methods: {
    ...mapActions('global', [globalActionNames.SET_LOCALE_AND_UPDATE]),
    setLocale: function(locale) {
      this[globalActionNames.SET_LOCALE_AND_UPDATE](locale);
    }
  }
};
</script>

<style lang="scss" scoped src="./LocaleSelector.scss"></style>
