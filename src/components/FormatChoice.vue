<template>
  <div class="overlay-container">
    <div class="foreground">
      <div class="format-head">
        <h1 class="fontLila">{{ formatHeader }}</h1>
        <Btn buttonType="Tertiary" buttonName="" buttonIcons="Menue-schliessen.png" class="btn-close"
          @click="handleFormatChoice(!toFormatChoice)" />
      </div>

      <div v-if="!customFormatChoice" class="format-grid-container">

        <div to="/fluidDesigner" class="format-grid" v-for="format in formats" :key="format.name">
          <router-link to="/fluidDesigner" class="format-grid"
            @click="handleFormatChoice(!toFormatChoice), updateCanvasSize({ w: format.size.w, h: format.size.h, p: format.print }), setActiveFormat(format.id)">
            <img :src="format.image" alt="" :class="{ 'selected': isActiveFormat(format.id) }">
            <h3 class="fontLila">{{ format.name }}</h3>
          </router-link>
        </div>

        <div class="format-grid" @click="handleCustomFormat" id="eigenes-format">
          <img src="/Platzhalter/Formate/Freies Format.png" alt="">
          <h3 class="fontLila">Eigenes Format</h3>
        </div>

      </div>

      <div class="customFormat" v-if="customFormatChoice">
         
          <Btn buttonType="Secondary" buttonName="" buttonIcons="Zurueck.png" @click="this.customFormatChoice = false" />

          <input type="number" v-model="customWidth" placeholder="Breite">

          <img src="Icons/secondary/Menue-schliessen.png" alt="">

          <input type="number" v-model="customHeight" placeholder="Höhe">

          <router-link to="/fluidDesigner" class="format" @click="updateCanvasSize({ w: customWidth, h: customHeight, p: 'false' }), handleFormatChoice(!toFormatChoice)" :disabled="!inputIsMade">
            <Btn buttonType="Primary" buttonName="FluidDesigner" buttonIcons="Weiter.png" class="btn-submit" :disabled="!inputIsMade" />
          </router-link>

        </div>
    </div>
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
      formats: [
        { id: 1, name: 'DIN A4 Flyer', size: { w: 210, h: 297 }, image: '/Platzhalter/Formate/A4.png', print: true },
        { id: 2, name: 'DIN A5 Flyer', size: { w: 148, h: 210 }, image: '/Platzhalter/Formate/A4.png', print:true },
        { id: 3, name: '1x1 Social Media', size: { w: 1080, h: 1080 }, image: '/Platzhalter/Formate/1x1.png' , print: false},
        { id: 4, name: '4x5 Social Media', size: { w: 1080, h: 1350 }, image: '/Platzhalter/Formate/4x5.png', print: false },
        /* { name: '9x16 Social Media', size: { w: 1080, h: 1920 }, image: '/Platzhalter/Formate/9x16.png', print: false }, */
        /* { name: 'Eigenes Format', size: { w: 0, h: 0 }, image: '/Platzhalter/Formate/Freies Format.png' }, */

      ],
      formatHeader: 'Wähle ein Passendes format',
      customFormatChoice: false,
      customWidth: null,
      customHeight: null,
    }
  },

  components: {
    Btn,
  },

  computed: {
    ...mapState(['canvasWidth', 'canvasHeight', 'toFormatChoice', 'activeFormat']),

    inputIsMade() {
      return this.customWidth && this.customHeight;
    }
  },

  methods: {
    ...mapMutations(['setActiveFormat']),
    ...mapActions(['updateCanvasSize', 'handleFormatChoice']),

    handleCustomFormat() {
      this.customFormatChoice = !this.customFormatChoice;
    },

    isActiveFormat(Id) {
      return this.activeFormat == Id;
    }
  },
}
</script>

<style scoped>
.overlay-container {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background: rgba(102, 56, 182, 0.95);
  /* backdrop-filter: blur(20px); */
}

.foreground {
  width: 80vw;
  background-color: white;
  border-radius: 30px;
  padding: 60px;
  box-sizing: border-box;
}

.format-head {
  display: flex;
  justify-content: space-between;
}

.format-grid-container {
  padding: 30px;
  margin-top: 30px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 50px;
  text-align: center;
}

.format-grid {
  text-decoration: none;
}

.format-grid img {
  height: 20vh;
  border-radius: 30px;
  margin-bottom: 15px;
}

.customFormat {
  padding: 60px 0 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.customFormat input {
  width: 30%;
}

.customFormat img {
  height: 50px;
}

#eigenes-format {
  cursor: pointer;
}

.format {
  width: 20%;
  text-decoration: none;
}

.btn-submit {
  width: 100%;
}
</style>
