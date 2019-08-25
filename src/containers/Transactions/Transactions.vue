<template>
  <section class="app-wrapper transactions">
    <div class="transactions__header">
      <localeSelector class="transactions__header__locale-selector"></localeSelector>
      <dropdown
        v-for="(filterOptions, filterName) in availableFilters"
        :isDesktop="isDesktop"
        :options="filterOptions"
        :key="`dropdown-filter-${filterName}`"
        @onSelectOption="option => onFilterSelect(filterName, option)"
      ></dropdown>
      <button class="btn btn--loader" @click="onGetTransactions">
        <span class="btn__container">
          <transition name="fade" @enter="transitionEnter">
            <i v-if="isLoading" class="icon-spinner8"></i>
            <template v-else><span>{{ $t('messages.TRANSACTIONS_SEARCH') }}</span></template>
          </transition>
        </span>
      </button>
    </div>
    <div class="transactions__content">
      <transition name="fade">
        <responsiveTable
          v-if="tableInfo.length"
          :info="tableInfo"></responsiveTable>
        <div v-else class="transactions__content__empty-msg">{{ $t('messages.TRANSACTIONS_EMPTY_RESULTS') }}</div>
      </transition>
      <transition name="fade">
        <div v-if="isLoading" class="transactions__content__overlay">
          <i class="icon-spinner8 transactions__content__overlay__icon"></i>
        </div>
      </transition>
    </div>
  </section>
</template>

<script>
import get from 'lodash/get';
import { mapState, mapMutations, mapActions } from 'vuex';
import { mutationNames as transactionsMutationNames } from '@/store/modules/transactions/mutations';
import { actionNames as transactionsActionsNames } from '@/store/modules/transactions/actions';
import localeSelector from '@/containers/LocaleSelector/LocaleSelector.vue';
import dropdown from '@/components/Dropdown/Dropdown.vue';
import responsiveTable from '@/components/ResponsiveTable/ResponsiveTable.vue';

export default {
  name: 'Transactions',
  components: {
    localeSelector,
    dropdown,
    responsiveTable
  },
  data: () => ({
    isLoading: false
  }),
  computed: {
    ...mapState('global', ['isDesktop']),
    ...mapState('transactions', ['config', 'availableFilters', 'list']),
    tableInfo: function() {
      return this.list.map(transaction => ({
        id: get(transaction, 'id', ''),
        main: {
          [this.$t('messages.TRANSACTIONS_NAME')]: get(transaction, 'card.holderName', ''),
          [this.$t('messages.TRANSACTIONS_BRAND')]: this.config.brandNames[get(transaction, 'brandId', '')],
          [this.$t('messages.TRANSACTIONS_LAST_4_DIGITS')]: `XXXX ${get(transaction, 'card.lastFourDigits', '')}`,
          [this.$t('messages.TRANSACTIONS_TYPE')]: this.$t(`messages.APP_action_${get(transaction, 'action', 'none')}`),
          [this.$t('messages.TRANSACTIONS_AMOUNT')]: get(transaction, 'amount', 0),
          [this.$t('messages.TRANSACTIONS_CURRENCY')]: get(transaction, 'currencyCode', '')
        },
        extra: {
          [this.$t('messages.TRANSACTIONS_ID')]: get(transaction, 'id', ''),
          [this.$t('messages.TRANSACTIONS_TRACKING_CODE')]: get(transaction, 'trackingCode', ''),
          [this.$t('messages.TRANSACTIONS_BRAND_ID')]: get(transaction, 'brandId', ''),
          [this.$t('messages.TRANSACTIONS_FIRST_6_DIGITS')]: `${get(transaction, 'card.firstSixDigits', '')} XXXX`,
          [this.$t('messages.TRANSACTIONS_EXPIRY_MONTH')]: get(transaction, 'card.expiryMonth', '00'),
          [this.$t('messages.TRANSACTIONS_EXPIRY_YEAR')]: get(transaction, 'card.expiryYear', '2000')
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
      this.isLoading = true;
      this[transactionsActionsNames.GET_TRANSACTIONS]()
        .then(() => {
          this.isLoading = false;
        })
        .catch();
    },
    transitionEnter: function (el) {
      if (el.parentElement) {
        el.parentElement.style.minHeight = `${el.parentElement.offsetHeight}px`;
      }
    }
  },
  mounted() {
    this[transactionsActionsNames.GET_CONFIG]().then(() => {
      this.isLoading = true;
      this[transactionsActionsNames.GET_TRANSACTIONS]()
        .then(() => {
          this.isLoading = false;
        })
        .catch();
    });
  }
};
</script>

<style lang="scss" scoped src="./Transactions.scss"></style>
