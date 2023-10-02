// userState.js
import { reactive } from 'vue';

export const userState = reactive({
  username: '',
});

export function setUsername(username) {
  userState.username = username;
}
