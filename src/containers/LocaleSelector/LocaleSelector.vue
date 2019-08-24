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
import { mapState, mapMutations } from 'vuex';
import { mutationNames as globalMutationNames } from '@/store/modules/global/mutations';

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
    ...mapMutations('global', [globalMutationNames.SET_LOCALE]),
    setLocale: function(locale) {
      this[globalMutationNames.SET_LOCALE](locale);
    }
  }
};
</script>

<style lang="scss" scoped src="./LocaleSelector.scss"></style>
