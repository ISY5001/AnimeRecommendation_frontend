// src/store/accountStore.js
import { defineStore } from 'pinia';

export const useAccountStore = defineStore({
  // unique id of the store across your application
  id: 'account_id',

  // state
  state: () => ({
    account_id: null
  }),

  // getters (optional)
  getters: {
    getAccountId(account_id) {
      return this.account_id;
    }
  },

  // actions
  actions: {
    setAccountId(id) {
      this.account_id = id;
      return this.account_id;
    }
  }
});
