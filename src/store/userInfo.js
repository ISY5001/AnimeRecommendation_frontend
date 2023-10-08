// src/store/accountStore.js
import { defineStore } from 'pinia';

export const userInfoStore = defineStore('infor', {
  state: () => ({
    account_id: null,
    username: null,
    password: null,
  }),
  actions: {
    setUser(data) {
      this.account_id = data.account_id;
      this.username = data.username;
      this.password = data.password;
      console.log('save sucess');
    },
    clearUser() {
      this.account_id = null;
      this.username = null;
      this.password = null;
    },
  },
})
