<template>
  <header class="background-top">
    <img src="Logo/Logo-Wort-Bild.png"  class="logo-header-home" alt="">
    <h1 class="fontWhite introText">
      Der 
      »<span style="font-style: italic">RWU </span> 
      <span style="font-weight: 700; letter-spacing: 0.03em;">FluidDesigner</span>« hilft dir dabei, <br />
      Layouts automatisch und <br />
      Corporate Design konform zu erstellen!
    </h1>
    <div class="introButton">
      <Btn buttonType="Tertiary" buttonName="Erstelle ein neues Layout" buttonIcons="Hinzufuegen.png"
        class="btn-toFluid" @click="handleFormatChoice"/>
    </div>
  </header>


  <!-- Overlay&Format Auswahl -->
 <FormatChoice v-if="toFormatChoice" @click="handleFormatChoice"/>


</template>

<script>
import Btn from '@/components/Button.vue';
import FormatChoice from '@/components/FormatChoice.vue'

export default {
  name: 'Home',
  components: {
    Btn,
    FormatChoice
  },

  data() {
    return {
      toFormatChoice : false,
    }
  },

  methods: {
    handleFormatChoice() {
      this.toFormatChoice = !this.toFormatChoice;
    }
  },
}
</script>

<style scoped>
/* -----------------------------------------------------------Header Background */
.background-top {
  position: absolute;
  display: flex;
  padding-left: 10vw;
  align-items: center;
  box-sizing: border-box;
  top: 0;
  right: 0;
  left: 0;
  height: 65vh;
  background: linear-gradient(135deg, #05C3DE 5%, #6638B6 35%, #2D0764 85%);
  z-index: -1;
}

.logo-header-home {
  height: 100px;
  width: auto;
  position: absolute;
  top: 0;
  left: 0;

}

.introText {
  margin-right: 60px;
  line-height: 130%;
  font-weight: 400;
}

/* -----------------------------------------------------------Button Styling*/
.introButton {
  text-decoration: none;
}

.btn-toFluid {
  width: 350px;
}


</style>
