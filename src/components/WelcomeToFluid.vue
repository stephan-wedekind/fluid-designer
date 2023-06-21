<template>
  <div class="padding-60">
    <h1 class="fontPlaceholder">WelcomeToFluid</h1>
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
