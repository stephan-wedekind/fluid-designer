<template>
  <div class="padding-60">
    <div class="steps">
      <h4 class="fontGrey"><span class="fontLila">Pattern bearbeiten</span> Schritt 2 von 3</h4>
    </div>
  <h2 class="fontLila">Pattern Stil</h2>
  <section class="pattern-styles">
    <div class="pattern-variation">
    <img src="Platzhalter/Pattern/mirror.png" @click="changePattern('mirror')" :class="{ 'selected': this.patternMirror }"
      alt="Gespiegelt">
      <label>Gespiegelt</label>
    </div>
    <div class="pattern-variation">
    <img src="Platzhalter/Pattern/stripe.png" @click="changePattern('stripe')" :class="{ 'selected': this.patternStripe }"
      alt="Streifen">
      <label>Streifen</label>
    </div>
    <div class="pattern-variation">
    <img src="Platzhalter/Pattern/random.png" @click="changePattern('random')" :class="{ 'selected': this.patternRandom }"
      alt="Zufällig">
      <label>Zufällig</label>
    </div>
  </section>

  <h2 class="fontLila">Pattern bearbeiten</h2>
  <section class="pattern-edit">

    <div class="edit-line" id="number-shapes" v-if="!patternStripe">
      <Btn class="edit-btn" buttonType="Primary" buttonName="" buttonIcons="Entfernen.png" @click="decreaseShapesFactor()" :disabled="shapesFactor===1"/>
      <div class="edit-label"><h2 class="fontLila">Formen Größe</h2></div>
      <Btn class="edit-btn" buttonType="Primary" buttonName="" buttonIcons="Hinzufuegen.png" @click="increaseShapesFactor()" :disabled="shapesFactor === maxShapesFactor"/>
    </div>

    <div class="edit-line" id="change-stripe" v-if="patternStripe">
      <Btn class="edit-btn" buttonType="Primary" buttonName="" buttonIcons="Entfernen.png" :disabled="checkPatternStartLow()" @click="decreasePatternStripeWidth()" />
      <div class="edit-label"><h2 class="fontLila">Streifen Breite</h2></div>
      <Btn class="edit-btn" buttonType="Primary" buttonName="" buttonIcons="Hinzufuegen.png" :disabled="checkPatternStartHigh()" @click="increasePatternStripeWidth()"/>
    </div>

    <div class="edit-line" id="change-pattern">
      <div class="edit-label randomPattern"><h2 class="fontLila">Formen neu mischen</h2></div>
      <Btn class="edit-btn" buttonType="Primary" buttonName="" buttonIcons="Wiederholen.png" @click="randomPatternSeed()"/>
    </div>

   

  </section>

  <section class="pattern-fill">
    <h2 class="fontLila">Flächen:</h2>
    <div class="shape-style" @click="patternFill('fill')">
      <img src="Platzhalter/Pattern/Pattern-Format/Fill.png" :class="{ 'selected': this.patternFilled }" alt="">
      <label>Gefüllt</label>
    </div>
    <div class="shape-style" @click="patternFill('outline')">
      <img src="Platzhalter/Pattern/Pattern-Format/Outline.png" :class="{ 'selected': !this.patternFilled }" alt="">
      <label>Linie</label>
    </div>
  </section>
  <section class="pattern-fill">
    <h2 class="fontLila">Formen:</h2>
    <div class="shape-style" @click="handleRectangle">
      <img src="Platzhalter/Pattern/Pattern-Format/Quad.png" :class="{ 'selected': this.isRectangle }" alt="">
      <label>Viereck</label>
    </div>
    <div class="shape-style" @click="handleTriangle">
      <img src="Platzhalter/Pattern/Pattern-Format/Triangle.png" :class="{ 'selected': this.isTriangle }" alt="">
      <label>Dreieck</label>
    </div>
    <div class="shape-style" @click="handleCircle">
      <img src="Platzhalter/Pattern/Pattern-Format/Circle.png" :class="{ 'selected': this.isCircle }" alt="">
      <label>Kreis</label>
    </div>
  </section>
</div>
</template>

<script>
import Btn from '@/components/Button.vue'
import { mapState, mapActions, mapMutations } from 'vuex';

export default {
  name: 'PatternChange',

  data() {
    return {
      
      maxShapesFactor: 2
    }
  },

  components: {
    Btn,
  },

  computed: {
    ...mapState(['selectedPattern', 'patternMirror', 'patternStripe', 'patternRandom' , 'patternFilled', 'isRectangle', 'isCircle', 'isTriangle', 'patternStripeWidth', 'patternSeed', 'shapesFactor']),

  },
  methods: {
    ...mapActions(['changePattern', 'patternFill', 'handleCircle', 'handleRectangle', 'handleTriangle']),
    ...mapMutations(['increasePatternStripeWidth', 'decreasePatternStripeWidth' ,'randomPatternSeed', 'increaseShapesFactor', 'decreaseShapesFactor']),

    checkPatternStartLow() {
      return this.patternStripeWidth<=1
    },
    checkPatternStartHigh() {
      return this.patternStripeWidth>=4;
    },
  },
  watch: {
    patternMirror(newValue, oldValue) {
     if (newValue) {
      this.maxShapesFactor = 2;
      if (newValue && this.shapesFactor === 4) {
        this.decreaseShapesFactor();
      }
    }
    },
    patternRandom(newValue, oldValue) {
      if (newValue) {
        this.maxShapesFactor = 4;
      }
    }
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

.pattern-variation {
  width: 28%;
  text-align: center;
}

.pattern-variation img {
  width: 100%;
  height: auto;
  border-radius: 30px;
  cursor: pointer;
  margin: 15px 0;
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

.randomPattern {
  width: 82.5%;
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
  text-align: center;
  margin-right: 30px;
  cursor: pointer;
}

.shape-style img {
  width: 100%;
  height: auto;
  margin: 10px 0;
  border-radius: 30px;
  box-sizing: border-box; 
}
</style>
