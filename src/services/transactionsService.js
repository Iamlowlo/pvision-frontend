import { http } from './http';

class TransactionsService {
  static getTransactions = (queryParams) => {
    return http.get(`transactions${queryParams}`).then(resp => resp.data)
  }
}

export {
  TransactionsService
};
