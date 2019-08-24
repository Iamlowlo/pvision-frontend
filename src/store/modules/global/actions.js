import { mutationNames } from "./mutations";
import { mutationNames as transactionMutationNames } from "@/store/modules/transactions/mutations";

export const actionNames = {
  SET_LOCALE_AND_UPDATE: '[GLOBAL]: trigger set locale and required update values'
};

export default {
  [actionNames.SET_LOCALE_AND_UPDATE]: ({commit, rootState}, locale) => {
    commit(mutationNames.SET_LOCALE, locale);
    console.log('transactionMutationNames', transactionMutationNames)
    commit(`transactions/${transactionMutationNames.SET_AVAILABLE_FILTERS}`, rootState.transactions.list, { root: true });
  }
};
