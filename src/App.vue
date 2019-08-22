<template>
  <router-view />
</template>
<script>
import { mapMutations } from 'vuex';
import { mutationNames as globalMutationNames } from '@/store/modules/global/mutations';

export default {
  name: 'MainApp',
  methods: {
    ...mapMutations('global', [globalMutationNames.SET_IS_DESKTOP])
  },
  mounted() {
    this[globalMutationNames.SET_IS_DESKTOP](window.innerWidth > 1280);
    const mql = window.matchMedia('(min-width: 1281px)');
    mql.addListener(e => {
      this[globalMutationNames.SET_IS_DESKTOP](e.matches);
    });
  }
};
</script>
<style lang="scss"></style>
