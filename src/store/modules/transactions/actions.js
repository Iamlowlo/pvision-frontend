import { TransactionsService } from "@/services/transactionsService";

export const actionNames = {
  GET_TRANSACTIONS: '[TRANSACTIONS]: Request available transactions'
};

const getQueryParams = (obj) => {
  const params = Object.entries(obj);
  return params.length
    ? `?${params.map(param => param.join('=')).join('&')}`
    : '';
};

export default {
  [actionNames.GET_TRANSACTIONS]: ({state, commit}) => {
    return new Promise((resolve, reject) => {
      TransactionsService.getTransactions(getQueryParams(state.filters))
        .then(resp => {
          console.log('OK', resp)
        })
        .catch(err => {
          console.log('error', err)
        })
    })
  }
};
