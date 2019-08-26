<template>
  <router-view />
</template>
<script>
import { mapMutations } from 'vuex';
import { mutationNames as globalMutationNames } from '@/store/modules/global/mutations';

export default {
  name: 'MainApp',
  methods: {
    ...mapMutations('global', [
      globalMutationNames.SET_IS_TABLET,
      globalMutationNames.SET_IS_DESKTOP])
  },
  mounted() {
    this[globalMutationNames.SET_IS_TABLET](window.innerWidth >= 1025);
    this[globalMutationNames.SET_IS_DESKTOP](window.innerWidth >= 1281);

    const bpTablet = window.matchMedia('(min-width: 1025px)');
    const bpDesktop = window.matchMedia('(min-width: 1281px)');

    bpTablet.addListener(e => {
      this[globalMutationNames.SET_IS_TABLET](e.matches);
    });
    bpDesktop.addListener(e => {
      this[globalMutationNames.SET_IS_DESKTOP](e.matches);
    });
  }
};
</script>
<style lang="scss"></style>
