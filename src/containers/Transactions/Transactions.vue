<template>
  <section class="app-wrapper transactions">
    <div class="transactions__header">
      <dropdown
        v-for="(filterOptions, filterName) in availableFilters"
        :isDesktop="isDesktop"
        :options="filterOptions"
        :key="`dropdown-filter-${filterName}`"
        @onSelectOption="option => onFilterSelect(filterName, option)"
      ></dropdown>
      <button class="btn" @click="onGetTransactions">Search</button>
    </div>
    <responsiveTable :info="tableInfo"></responsiveTable>
  </section>
</template>

<script>
import get from 'lodash/get';
import { mapState, mapMutations, mapActions } from 'vuex';
import { mutationNames as transactionsMutationNames } from '@/store/modules/transactions/mutations';
import { actionNames as transactionsActionsNames } from '@/store/modules/transactions/actions';
import dropdown from '@/components/Dropdown/Dropdown.vue';
import responsiveTable from '@/components/ResponsiveTable/ResponsiveTable.vue';
export default {
  name: 'Transactions',
  components: {
    dropdown,
    responsiveTable
  },
  data: () => ({
    thList: [],
    trList: []
  }),
  computed: {
    ...mapState('global', ['isDesktop']),
    ...mapState('transactions', ['config', 'availableFilters', 'list']),
    tableInfo: function() {
      return this.list.map(transaction => ({
        id: get(transaction, 'id', ''),
        main: {
          ['Name']: get(transaction, 'card.holderName', ''),
          ['Brand']: this.config.brandNames[get(transaction, 'brandId', '')],
          ['Last 4 digits']: `XXXX ${get(transaction, 'card.lastFourDigits', '')}`,
          ['Transaction type']: get(transaction, 'action', ''),
          ['Amount']: get(transaction, 'amount', 0),
          ['Currency']: get(transaction, 'currencyCode', '')
        },
        extra: {
          ['ID']: get(transaction, 'id', ''),
          ['Tracking code']: get(transaction, 'trackingCode', ''),
          ['Brand ID']: get(transaction, 'brandId', ''),
          ['First 6 digits']: `${get(transaction, 'card.firstSixDigits', '')} XXXX`,
          ['Expiry month']: get(transaction, 'card.expiryMonth', '00'),
          ['Expiry year']: get(transaction, 'card.expiryYear', '2000')
        }
      }));
    }
  },
  methods: {
    ...mapMutations('transactions', [
      transactionsMutationNames.SET_ACTIVE_FILTER
    ]),
    ...mapActions('transactions', [
      transactionsActionsNames.GET_TRANSACTIONS,
      transactionsActionsNames.GET_CONFIG
    ]),
    onFilterSelect: function(filterName, option) {
      this[transactionsMutationNames.SET_ACTIVE_FILTER]({
        [filterName]: option.value
      });
    },
    onGetTransactions: function() {
      this[transactionsActionsNames.GET_TRANSACTIONS]()
        .then()
        .catch();
    }
  },
  mounted() {
    this[transactionsActionsNames.GET_CONFIG]().then(() => {
      this[transactionsActionsNames.GET_TRANSACTIONS]()
        .then()
        .catch();
    });
  }
};
</script>

<style lang="scss" scoped src="./Transactions.scss"></style>
