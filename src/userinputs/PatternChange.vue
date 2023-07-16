<template>
  <div class="padding-60">
    <div class="steps">
      <button class="prev-next" @click="setActiveNav('style')">
        <h4>&lang;</h4>
      </button>
      <h4 class="fontGrey indicator">Schritt 2 von 3 <span class="fontLila">Pattern bearbeiten</span></h4>
      <button class="prev-next" @click="setActiveNav('text')">
        <h4>&rang;</h4>
      </button>
    </div>
    <h2 class="fontLila">Pattern Stil</h2>
    <section class="pattern-styles">
      <div class="pattern-variation">
        <img src="Platzhalter/Pattern/mirror.png" @click="changePattern('mirror')"
          :class="{ 'selected': this.patternMirror }" alt="Gespiegelt">
        <label>Gespiegelt</label>
      </div>
      <div class="pattern-variation">
        <img src="Platzhalter/Pattern/stripe.png" @click="changePattern('stripe')"
          :class="{ 'selected': this.patternStripe }" alt="Streifen">
        <label>Streifen</label>
      </div>
      <div class="pattern-variation">
        <img src="Platzhalter/Pattern/random.png" @click="changePattern('random')"
          :class="{ 'selected': this.patternRandom }" alt="Zufällig">
        <label>Zufällig</label>
      </div>
    </section>

    <section class="pattern-edit">
      <div class="edit-line" v-if="!patternStripe">
        <div class="pattern-label">
          <h2 class="fontLila">Größe der Fromen:</h2>
        </div>
        <div class="pattern-buttons">
          <Btn class="edit-btn-small" buttonType="Primary" buttonName="" buttonIcons="Entfernen.png" :iconLeft="false"
            @click="decreaseShapesFactor()" :disabled="shapesFactor === 1" />
          <Btn class="edit-btn-small" buttonType="Primary" buttonName="" buttonIcons="Hinzufuegen.png" :iconLeft="false"
            @click="increaseShapesFactor()" :disabled="shapesFactor === maxShapesFactor" />
        </div>
      </div>
      <div class="edit-line" v-if="patternStripe">
        <div class="pattern-label">
          <h2 class="fontLila">Streifen Breite</h2>
        </div>
        <div class="pattern-buttons">
          <Btn class="edit-btn-small" buttonType="Primary" buttonName="" buttonIcons="Entfernen.png" :iconLeft="false"
            :disabled="checkPatternStartLow()" @click="decreasePatternStripeWidth()" />
          <Btn class="edit-btn-small" buttonType="Primary" buttonName="" buttonIcons="Hinzufuegen.png" :iconLeft="false"
            :disabled="checkPatternStartHigh()" @click="increasePatternStripeWidth()" />
        </div>
      </div>
      <div class="edit-line">
        <div class="pattern-label">
          <h2 class="fontLila">Formen neu Mischen:</h2>
        </div>
        <div class="pattern-buttons">
          <Btn class="edit-btn-large" buttonType="Primary" buttonName="" buttonIcons="Wiederholen.png" :iconLeft="false"
            @click="randomPatternSeed()" />
        </div>
      </div>
    </section>

    <section class="pattern-fill">
      <div class="shapes-label">
      <h2 class="fontLila">Flächen:</h2>
      </div>
      <div class="shapes-buttons">
      <div class="shape-style" @click="patternFill('fill')">
        <img src="Platzhalter/Pattern/Pattern-Format/Fill.png" :class="{ 'selected': this.patternFilled }" alt="">
        <label>Gefüllt</label>
      </div>
      <div class="shape-style" @click="patternFill('outline')">
        <img src="Platzhalter/Pattern/Pattern-Format/Outline.png" :class="{ 'selected': !this.patternFilled }" alt="">
        <label>Linie</label>
      </div>
    </div>
    </section>
    <section class="pattern-fill">
      <div class="shapes-label">
      <h2 class="fontLila">Formen:</h2>
    </div>
    <div class="shapes-buttons">
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
    ...mapState(['selectedPattern', 'patternMirror', 'patternStripe', 'patternRandom', 'patternFilled', 'isRectangle', 'isCircle', 'isTriangle', 'patternStripeWidth', 'patternSeed', 'shapesFactor']),

  },
  methods: {
    ...mapActions(['changePattern', 'patternFill', 'handleCircle', 'handleRectangle', 'handleTriangle']),
    ...mapMutations(['increasePatternStripeWidth', 'decreasePatternStripeWidth', 'randomPatternSeed', 'increaseShapesFactor', 'decreaseShapesFactor', 'setActiveNavigation']),

    setActiveNav(Id) {
      this.setActiveNavigation(Id);
    },

    checkPatternStartLow() {
      return this.patternStripeWidth <= 1
    },
    checkPatternStartHigh() {
      return this.patternStripeWidth >= 4;
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
  margin: 0 0 55px 0;
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
  margin-bottom: 55px;
}


.edit-line {
  display: flex;
  /* width: 75%; */
  align-items: center;
  flex-wrap: wrap;
  margin: 0 0 15px 0;
}


.pattern-label {
  width: 40%;
}

.pattern-buttons {
  width: 28%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.edit-line h2 {
  margin: 0;
}

.edit-btn-large {
  width: 100%;
}

.edit-btn-small {
  width: calc(50% - 7.5px);
}

.edit-label h2 {
  margin: 0;
}

.pattern-fill {
  display: flex;
  align-items: center;
  margin-bottom: 55px;
}

.pattern-fill h2 {
  width: 20%;
  margin: 0;
}

.shapes-label {
  width: 25%;
}

.shapes-buttons {
  width: 75%;
  display: flex;
  align-items: center;
}
.shape-style {
  width: 23%;
  text-align: center;
  margin-right: 40px;
  cursor: pointer;
}

.shape-style img {
  width: 100%;
  height: auto;
  margin: 10px 0;
  border-radius: 30px;
}</style>
