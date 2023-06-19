<template>
  <h2 class="fontLila">Pattern Stil</h2>
  <section class="pattern-styles">
    <img src="Platzhalter/Pattern/mirror.png" @click="changePattern('mirror')" :class="{ 'selected': this.patternMirror }"
      alt="Gespiegelt">
    <img src="Platzhalter/Pattern/stripe.png" @click="changePattern('stripe')" :class="{ 'selected': this.patternStripe }"
      alt="Streifen">
    <img src="Platzhalter/Pattern/random.png" @click="changePattern('random')" :class="{ 'selected': this.patternRandom }"
      alt="Zufällig">
  </section>
  <h2 class="fontLila">Pattern bearbeiten</h2>
  <section class="pattern-edit">
    <div class="edit-line" id="number-shapes">
      <Btn class="edit-btn" buttonType="Primary" buttonName="" buttonIcons="Entfernen.png" />
      <div class="edit-label"><h2 class="fontLila">Anzahl Formen</h2></div>
      <Btn class="edit-btn" buttonType="Primary" buttonName="" buttonIcons="Hinzufuegen.png" />
    </div>
    <div class="edit-line" id="change-pattern">
      <Btn class="edit-btn" buttonType="Primary" buttonName="" buttonIcons="Pfeil-links.png" />
      <div class="edit-label"><h2 class="fontLila">Pattern Ändern</h2></div>
      <Btn class="edit-btn" buttonType="Primary" buttonName="" buttonIcons="Pfeil-rechts.png" />
    </div>
    <div class="edit-line" id="change-stripe" v-if="patternStripe">
      <Btn class="edit-btn" buttonType="Primary" buttonName="" buttonIcons="Entfernen.png"/>
      <div class="edit-label"><h2 class="fontLila">Streifen Breite</h2></div>
      <Btn class="edit-btn" buttonType="Primary" buttonName="" buttonIcons="Hinzufuegen.png" />
    </div>
  </section>
  <section class="pattern-fill">
    <h2 class="fontLila">Flächen:</h2>
    <div class="shape-style" @click="patternFill('fill')">
      <img src="Platzhalter/Pattern/Pattern-Format/Fill.png" :class="{ 'fill-selected': this.patternFilled }" alt="">
      <label>Gefüllt</label>
    </div>
    <div class="shape-style" @click="patternFill('outline')">
      <img src="Platzhalter/Pattern/Pattern-Format/Outline.png" :class="{ 'fill-selected': !this.patternFilled }" alt="">
      <label>Linie</label>
    </div>
  </section>
  <section class="pattern-fill">
    <h2 class="fontLila">Formen:</h2>
    <div class="shape-style" @click="handleRectangle">
      <img src="Platzhalter/Pattern/Pattern-Format/Quad.png" :class="{ 'fill-selected': this.isRectangle }" alt="">
      <label>Viereck</label>
    </div>
    <div class="shape-style" @click="handleTriangle">
      <img src="Platzhalter/Pattern/Pattern-Format/Triangle.png" :class="{ 'fill-selected': this.isTriangle }" alt="">
      <label>Dreieck</label>
    </div>
    <div class="shape-style" @click="handleCircle">
      <img src="Platzhalter/Pattern/Pattern-Format/Circle.png" :class="{ 'fill-selected': this.isCircle }" alt="">
      <label>Kreis</label>
    </div>
  </section>
</template>

<script>
import Btn from '@/components/Button.vue'
import { mapState, mapActions } from 'vuex';

export default {
  name: 'PatternChange',

  data() {
    return {
      limitReached: false,
    }
  },

  components: {
    Btn,
  },

  computed: {
    ...mapState(['selectedPattern', 'patternMirror', 'patternStripe', 'patternRandom' , 'patternFilled', 'isRectangle', 'isCircle', 'isTriangle']),
  },
  methods: {
    ...mapActions(['changePattern', 'patternFill', 'handleCircle', 'handleRectangle', 'handleTriangle']),
  }
}

</script>

<style scoped>
.pattern-styles {
  padding: 0;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin: 0 0 30px 0;
}

.pattern-styles img {
  width: 28%;
  height: auto;
  border-radius: 30px;
  cursor: pointer;
  box-sizing: border-box;
}

.pattern-styles img.selected {
  border: 10px solid #05C3DE;
  translate: ease-in 0.5s;
}

.pattern-edit {
  margin-bottom: 30px;
}

.edit-line {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin: 0 0 15px 0;
}

.edit-btn {
  width: 15%;
}

.edit-label {
  display: flex;
  height: 50px;
  width: 65%;
  background-color: #F2F2F2;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
}

.edit-label h2 {
  margin: 0;
}

.pattern-fill {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 30px;
}

.pattern-fill h2 {
  width: 20%;
  margin: 0;
}

.shape-style {
  width: 20%;
  margin-right: 15px;
  text-align: center;
  cursor: pointer;
}

.shape-style img {
  width: 100%;
  height: auto;
  border-radius: 30px;
  box-sizing: border-box; 
}

.fill-selected {
  border: 10px solid #05C3DE;
}



</style>
