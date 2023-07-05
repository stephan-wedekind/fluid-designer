<template>
  <div class="overlay-container">
    <div class="foreground">
      <div class="format-head">
        <h1 class="fontLila">{{ formatHeader }}</h1>
        <Btn buttonType="Tertiary" buttonName="" buttonIcons="Menue-schliessen.png" class="btn-close"
          @click="handleFormatChoice(!toFormatChoice)" v-if="!customFormatChoice"/>
        <Btn buttonType="Tertiary" buttonName="" buttonIcons="Menue-schliessen.png" class="btn-close"
          @click="handleCustomFormat" v-if="customFormatChoice"/>
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
          <img src="/Platzhalter/Formate/Freies Format.png" alt="" :class="{ 'selected': isActiveFormat(5) }">
          <h3 class="fontLila">Eigenes Format</h3>
        </div>

      </div>

      <div class="customFormat" v-if="customFormatChoice">
         
          

          <input type="number" v-model="customWidth" placeholder="Breite">

          <img src="Icons/secondary/Menue-schliessen.png" alt="" >

          <input type="number" v-model="customHeight" placeholder="Höhe">

          <a v-if="!inputIsMade" class="format">
            <Btn buttonType="Primary" buttonName="FluidDesigner" buttonIcons="Weiter.png" class="btn-submit" :disabled="!inputIsMade" />
          </a>
          <router-link v-if="inputIsMade" to="/fluidDesigner" class="format" @click="updateCanvasSize({ w: customWidth, h: customHeight, p: false }), handleFormatChoice(!toFormatChoice), setActiveFormat(5)" :disabled="!inputIsMade">
            <Btn buttonType="Primary" buttonName="FluidDesigner" buttonIcons="Weiter.png" class="btn-submit" :disabled="!inputIsMade" />
          </router-link>

        </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import Btn from '@/components/Button.vue'
import formatsData from "../assets/formats.json";

export default {
  //updateCanvasSize({ w: 222, h: 333 })
  name: 'FormatChoice',

  data() {
    return {
      formatHeader: 'Wähle ein passendes Format',
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
    },

    formats() {
      return formatsData;
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
    },
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
}

.foreground {
  width: 80vw;
  background-color: white;
  border-radius: 30px;
  padding: 60px;
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
