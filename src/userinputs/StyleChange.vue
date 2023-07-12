<template>
  <div class="padding-60">
    <div class="steps">
      <h4 class="fontGrey indicator">Schritt 1 von 3 <span class="fontLila">Stil Auswahl</span></h4>
      <button class="prev-next" @click="setActive()" :disabled="styleSelected()"><h4>&rang;</h4></button>
    </div>
  
  <section class="stylePreview" id="style01"  @click="addBild(), changeStyle('style01'), setFocus(0.5)" v-if="this.classicPossible">
    <img src="Platzhalter/Stil/Stil-1.png" :class="{ 'selected': this.styleClassic }" alt="">
    <div class="styleDescription">
      <h1 class="fontLila">Klassisch</h1>
      <p>Bild + Farbfläche in RWU-Lila.</p>
    </div>
  </section>

  <section class="stylePreview forbidden" v-if="!this.classicPossible">
    <img src="Platzhalter/Stil/Stil-1-none.png" alt="">
    <div class="styleDescription">
      <h1 class="fontGrey">Klassisch</h1>
      <p class="fontGrey">Stil »Klassisch« bei diesem annähernd Quadratischen Formaten nicht verfügbar. Wähle ein Hochformat aus um diesen Stil verwenden zu können.</p>
    </div>
  </section>
  

  <section class="stylePreview" id="style02" @click="addBild(), changeStyle('style02'), setFocus(0.5)">
    <img src="Platzhalter/Stil/Stil-2.png" :class="{ 'selected': this.styleOverlay }" alt="">
    <div class="styleDescription">
      <h1 class="fontLila">Overlay</h1>
      <p>Hintergrundbild mit Overlay in RWU-Lila.</p>
    </div>
  </section>

  <section class="stylePreview" id="style03" @click="addPattern(), changeStyle('style03'), setFocus(0.5)">
    <img src="Platzhalter/Stil/Stil-3.png" :class="{ 'selected': this.stylePattern }" alt="">
    <div class="styleDescription">
      <h1 class="fontLila">Pattern</h1>
      <p>Hintergrund Pattern bestehend aus Viertelkreisen, Dreiecken und Quadraten.</p>
    </div>
  </section>
  <div class="button-group">
  
<!--   <Btn buttonType="Primary" buttonName="Weiter" buttonIcons="Pfeil-rechts.png" class="format-btn" @click="setActive()" :disabled="styleSelected()"/> -->
  </div>

</div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';
import Btn from "@/components/Button.vue";

export default {
  name: 'StyleChange',
  components: {
    Btn
  },

  data() {
    return {
      chosenStyle: ""
    }
  },

  computed: {
    ...mapState(['isImage', 'isPattern', 'styleClassic', 'styleOverlay', 'stylePattern', 'classicPossible']),
  },
  methods: {
    ...mapActions(['addBild', 'addPattern', 'changeStyle', 'handleFormatChoice']),
    ...mapMutations(['setFocus', 'setActiveNavigation']),

    setActive() {
      if (this.stylePattern) {
        this.setActiveNavigation('pattern')
      } else {
        this.setActiveNavigation('bild');
      }
    },

    styleSelected() {
      if (!this.styleOverlay && !this.styleClassic && !this.stylePattern) {
        return true;
      } else {
        return false;
      }
    },
  },
}
</script>

<style scoped>

.stylePreview {
  margin-bottom: 30px;
  display: flex;
  align-items: center;
  cursor: pointer;
}

.stylePreview img {
  
  width: 25%;
  height: auto;
  border-radius: 30px;
  margin-right: 10%;
}

.forbidden {
  cursor: default;
}


.format-btn {
  width: calc(50% - 15px);
  margin-bottom: 15px;
}


.button-group {
  display: flex;
  justify-content: space-between;
}

</style>