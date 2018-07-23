<template>
  <form @submit.prevent="formPlayer">
    <textarea v-model="message" />
    <input type="submit" value="DUNK!" />
  </form>
</template>

<script>
import { store } from './store';

export default {
  data() {
    return {
      message: null,
    };
  },
  methods: {
    formPlayer() {
      store.writePlayer(this.message);
    }
  },
}
</script>
