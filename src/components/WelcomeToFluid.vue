<template>
  <div class="container">
    <h1>WelcomeToFluid</h1>

    <h2>{{ this.canvasWidth }} x {{ this.canvasHeight }}</h2>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';

export default {
  name: 'WelcomeToFluid',

  computed: {
    ...mapState(['canvasWidth', 'canvasHeight']),
  },

}
</script>

<style scoped></style>
