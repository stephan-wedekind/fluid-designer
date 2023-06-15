<template>
  <header class="background-top">
    <router-link to="/fluidDesigner" class="introButton">
    <Btn buttonType="Tertiary" buttonName="Erstelle ein neues Layout" buttonIcons="Hinzufuegen.png" buttonWidth="2" />
  </router-link>
  </header>
</template>

<script>
import Btn from '@/components/Button.vue';

export default {
  name: 'Home',
  components: {
    Btn
  },
}
</script>

<style scoped>
/* -----------------------------------------------------------Header Background */
.background-top {
  position: absolute;
  box-sizing: border-box;
  top: 0;
  right: 0;
  left: 0;
  height: 65vh;
  background: linear-gradient(135deg, #05C3DE 5%, #6638B6 35%, #2D0764 85%);
}

.introButton {
  text-decoration: none;
}
</style>
