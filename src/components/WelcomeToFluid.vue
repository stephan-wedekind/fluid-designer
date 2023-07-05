<template>
  <div class="padding-60">
    <div class="chooseStyle" @click="setActiveNavigation('style')" >
      <!-- <img src="Platzhalter/Tutorial/maple.png" alt="" @click="setActiveNavigation('style')">
      <h1 class="fontLila">Wähle einen der drei Styles</h1> -->
      <img src="Icons/primary/Pfeil-links.png" alt="">
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
  cursor: pointer;
  padding: 0 30px;
  border-radius: 30px;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #6638B6;
  left: calc(70px + 60px);
  top: calc(70px + 60px - 20px);
}

.chooseStyle img {
  height: 80px;
  width: auto;
  margin-right: 15px;
}

.chooseStyle h1 {
  color: white;
  font-weight: 500;
  margin: 0;
}
</style>
