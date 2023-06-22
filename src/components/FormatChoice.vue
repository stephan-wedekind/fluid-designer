<template>
  <div class="overlay">
    <section class="formatWindow">

      <h1 class="fontLila">Wähle ein Gewünschtes Format</h1>

      <div class="formatContainer">

        <router-link to="/fluidDesigner" class="format" @click="updateCanvasSize({ w: 1080, h: 1080 })">
          <img src="/Platzhalter/Formate/1x1.png" alt="">
          <h4 class="fontLila">1x1 Social Media</h4>
        </router-link>

        <router-link to="/fluidDesigner" class="format" @click="updateCanvasSize({ w: 1080, h: 1350 })">
          <img src="/Platzhalter/Formate/4x5.png" alt="">
          <h4 class="fontLila">4x5 Social Media</h4>
        </router-link>

        <router-link to="/fluidDesigner" class="format" @click="updateCanvasSize({ w: 1080, h: 1920 })">
          <img src="/Platzhalter/Formate/9x16.png" alt="">
          <h4 class="fontLila">9x16 Social Media</h4>
        </router-link>

        <router-link to="/fluidDesigner" class="format" @click="updateCanvasSize({ w: 210, h: 297 })">
          <img src="/Platzhalter/Formate/A4.png" alt="">
          <h4 class="fontLila">DIN A4 Flyer</h4>
        </router-link>

        <router-link to="/fluidDesigner" class="format" @click="updateCanvasSize({ w: 148, h: 210 })">
          <img src="/Platzhalter/Formate/A4.png" alt="">
          <h4 class="fontLila">DIN A5 Flyer</h4>
        </router-link>

        <div class="format" @click="handleCustomFormat">
          <img src="/Platzhalter/Formate/Freies Format.png" alt="">
          <h4 class="fontLila">Eigenes Format</h4>
        </div>

      </div>
    </section>

    <div class="customFormat" v-if="customFormat" >
      <div class="customWindow">
        <section class="headline-section">
        <h1 class="fontLila">Gebe dein gewünschtes Format ein</h1>
        <Btn buttonType="Tertiary" buttonName="" buttonIcons="Menue-schliessen.png" class="btn-close"/>
      </section>
    
        <div class="inputFormat">
          <input type="number" v-model="customWidth" placeholder="Breite">
           <img src="Icons/secondary/Menue-schliessen.png" alt="">
          <input type="number" v-model="customHeight" placeholder="Höhe">
        </div>
        <router-link to="/fluidDesigner" class="format" @click="updateCanvasSize({ w: customWidth, h: customHeight })" :disabled="!inputIsMade">
        <Btn buttonType="Primary" buttonName="Zum FluidDesigner" buttonIcons="Weiter.png" class="btn-submit" :disabled="!inputIsMade"/>
        </router-link>

      </div>
    </div>


    <div class="overlayBlur"></div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import Btn from '@/components/Button.vue'

export default {
  //updateCanvasSize({ w: 222, h: 333 })
  name: 'FormatChoice',

  data() {
    return {
      customFormat: false,
      customWidth: null,
      customHeight: null,
    }
  },

  components: {
    Btn,
  },

  computed: {
    ...mapState(['canvasWidth', 'canvasHeight']),

    inputIsMade() {
      return this.customWidth && this.customHeight;
    }
  },

  methods: {
    ...mapActions(['updateCanvasSize']),

    handleCustomFormat() {
      this.customFormat = !this.customFormat;
    },
  },
}
</script>

<style scoped>
.overlay {
  position: fixed;
  display: flex;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
}

.formatWindow {
  box-sizing: border-box;
  padding: 45px;
  width: 80vw;
  height: 80vh;
  max-width: 1080px;
  max-height: 800px;

  background-color: white;
  border-radius: 30px;
  z-index: 2;
}

.overlayBlur {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(102, 56, 182, 0.6);
  backdrop-filter: blur(20px);
  z-index: 1;
}


/* Formate */

.formatContainer {
  width: 70%;
  height: 80%;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin: 60px auto;

}

.format {
  text-decoration: none;
  width: 30%;
  height: 40%;
  min-width: 50px;
  text-align: center;
}

.format img {
  width: auto;
  height: 85%;
  border-radius: 30px;
  margin-bottom: 15px;
}


/* Choose Custom Format*/

.btn-close {
  width: 50px;
  height: 50px;
}
.customFormat {
  box-sizing: border-box;
  position: absolute;
  left: calc((100vw / 2) - 37.5vw);
  top: calc((100vh / 2) - 40vh);
  z-index: 3;
  width: 75vw;
  height: 80vh;
  border-radius: 30px;
  background-color: white;
}
.customWindow {
  padding: 45px;
}

.inputFormat{
display: flex;
margin-top: 25vh;
justify-content: space-between;
align-items: center;
}

.inputFormat input {
  width: 45%;
}

.inputFormat img {
  height: 50px;
  width: auto;
}

.btn-submit {

  width: 30%;
  margin-top: 30px;
}
</style>
