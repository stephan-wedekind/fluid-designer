<template>
  <div class="padding-60">
    <div class="chooseStyle">
      <img src="Platzhalter/Tutorial/maple.png" alt="" @click="setActiveNavigation('style')">
      <h1 class="fontLila">Wähle einen der drei Styles</h1>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  name: 'WelcomeToFluid',

  methods: {
    ...mapMutations(['setActiveNavigation']),
  },
}
</script>

<style scoped>
.chooseStyle {
  text-align: center;
}
.chooseStyle img{
  width: 100%;
  cursor: pointer;
}

.chooseStyle h1 {
  font-weight: 500;
  margin-top: 30px;
}
</style>
