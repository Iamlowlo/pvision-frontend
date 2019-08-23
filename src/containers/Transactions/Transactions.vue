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
        @onSelectOption="option => onFilterSelect('currencyCode', option)"
      ></dropdown>
      <button class="btn" @click="onGetTransactions">Search</button>
    </div>
  </section>
</template>

<script>
  import {mapState, mapMutations, mapActions } from 'vuex';
import { mutationNames as transactionsMutationNames } from '@/store/modules/transactions/mutations';
import { actionNames as transactionsActionsNames } from '@/store/modules/transactions/actions';
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
    ...mapMutations('transactions', [transactionsMutationNames.SET_FILTER]),
    ...mapActions('transactions', [transactionsActionsNames.GET_TRANSACTIONS]),
    onFilterSelect: function(filterName, option) {
      this[transactionsMutationNames.SET_FILTER]({[filterName]: option.value})
    },
    onGetTransactions: function(){
      this[transactionsActionsNames.GET_TRANSACTIONS]().then().catch();
    }
  }
};
</script>

<style lang="scss" scoped src="./Transactions.scss"></style>
