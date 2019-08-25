<template>
  <table class="responsive-table" cellspacing="0" cellpadding="0">
    <tr class="responsive-table__row responsive-table__row--head">
      <td
        v-for="(th, key) in thList"
        :key="`thead-${key}`"
        class="responsive-table__cell responsive-table__cell--head">{{th}}</td>
    </tr>
    <template v-for="(tr, trKey) in info">
      <tr
        :key="`tr-${trKey}`"
        class="responsive-table__row"
        :class="[openedTrId === tr.id ? 'responsive-table__row--open' : '']"
        @click="setOpenedRow(tr.id)">
        <td
          v-for="(td, tdKey) in tr.main"
          :key="`td-${trKey}-${tdKey}`"
          class="responsive-table__cell">{{td}}</td>
      </tr>
      <tr v-if="openedTrId === tr.id"
          :key="`extra-tr-${trKey}`"
          class="responsive-table__extra">
        <td class="" :colspan="thList.length">
          <dl
            :key="`extra-dl-${trKey}`"
            class="responsive-table__extra__row">
            <template v-for="(extraDd, extraDt, index) in tr.extra">
              <dt
                :key="`extra-dt-${trKey}-${extraDt}-${index}`"
                class="responsive-table__extra__term">{{extraDt}}</dt>
              <dd
                :key="`extra-dd-${trKey}-${extraDt}-${index}`"
                class="responsive-table__extra__definition">{{extraDd}}</dd>
            </template>
          </dl>
        </td>
      </tr>
    </template>
  </table>
</template>

<script>
export default {
  name: 'ResponsiveTable',
  data: () => {
    return {
      openedTrId: ''
    };
  },
  props: {
    info: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    thList: function() {
      return this.info.length ? Object.keys(this.info[0].main) : []
    }
  },
  methods: {
    setOpenedRow: function(trId) {
      this.openedTrId = this.openedTrId === trId ? '' : trId;
    }
  }
};
</script>

<style lang="scss" scoped src="./ResponsiveTable.scss"></style>
