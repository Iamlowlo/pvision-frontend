<template>
  <ul class="responsive-table">
    <li class="responsive-table__row responsive-table__row--head">
      <span
        v-for="(th, key) in thList"
        :key="`thead-${key}`"
        class="responsive-table__cell responsive-table__cell--head">{{th}}</span>
    </li>
    <template v-for="(tr, trKey) in info">
      <li
        :key="`tr-${trKey}`"
        class="responsive-table__row"
        :class="[openedTrId === tr.id ? 'responsive-table__row--open' : '']"
        @click="setOpenedRow(tr.id)">
        <span
          v-for="(td, tdKey) in tr.main"
          :key="`td-${trKey}-${tdKey}`"
          class="responsive-table__cell">{{td}}</span>
      </li>
      <dl
        v-if="openedTrId === tr.id"
        :key="`extra-tr-${trKey}`"
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
    </template>
  </ul>
</template>

<script>
export default {
  name: "ResponsiveTable",
  data: () => {
    return {
      openedTrId: ''
    }
  },
  props: {
    isDesktop: {
      type: Boolean,
      default: false
    },
    info: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    thList: function() {
      return this.info.length
      ? Object.keys(this.info[0].main)
      : []
    }
  },
  methods: {
    setOpenedRow: function(trId) {
      this.openedTrId = this.openedTrId === trId
        ? ''
        : trId;
    }
  }
}
</script>

<style lang="scss" scoped src="./ResponsiveTable.scss"></style>