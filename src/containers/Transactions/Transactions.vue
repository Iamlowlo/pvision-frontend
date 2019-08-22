<template>
  <section class="app-wrapper transactions">
    <div class="transactions__header">
      <dropdown
        :isDesktop="isDesktop"
        defaultMsg="Transaction Type"
        :options="actionFilterOptions"
        @onSelectOption="option => onFilterSelect('action', option)"
      ></dropdown>
      <dropdown
        :isDesktop="isDesktop"
        defaultMsg="Currency"
        :options="currencyFilterOptions"
        @onSelectOption="option => onFilterSelect('currency', option)"
      ></dropdown>
      <button class="btn">Search</button>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex';
import dropdown from '@/components/Dropdown/Dropdown.vue';
export default {
  name: 'Transactions',
  components: {
    dropdown
  },
  data: () => ({
    actionFilterOptions: [
      { msg: 'Payment', value: 'payment' },
      { msg: 'Credit', value: 'credit' },
      { msg: 'Authorize', value: 'authorize' }
    ],
    currencyFilterOptions: [
      { msg: 'Payment', value: 'payment' },
      { msg: 'Credit', value: 'credit' },
      { msg: 'Authorize', value: 'authorize' }
    ]
  }),
  computed: {
    ...mapState('global', ['isDesktop'])
  },
  methods: {
    onFilterSelect: function(filterName, option) {
      console.log(filterName, option);
    }
  }
};
</script>

<style lang="scss" scoped src="./Transactions.scss"></style>
