<template>
  <div class="padding-60">

    <FormatChoice class="overlay" v-if="formatChanging" @click="handleFormatChanging"/>
  <section class="stylePreview" id="style01"  @click="addBild(), changeStyle('style01')" v-if="this.classicPossible">
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
  

  <section class="stylePreview" id="style02" @click="addBild(), changeStyle('style02')">
    <img src="Platzhalter/Stil/Stil-2.png" :class="{ 'selected': this.styleOverlay }" alt="">
    <div class="styleDescription">
      <h1 class="fontLila">Overlay</h1>
      <p>Hintergrundbild mit Overlay in RWU-Lila.</p>
    </div>
  </section>

  <section class="stylePreview" id="style03" @click="addPattern(), changeStyle('style03')">
    <img src="Platzhalter/Stil/Stil-3.png" :class="{ 'selected': this.stylePattern }" alt="">
    <div class="styleDescription">
      <h1 class="fontLila">Pattern</h1>
      <p>Hintergrund Pattern bestehend aus Viertelkreisen, Dreiecken und Quadraten.</p>
    </div>
  </section>
  <!-- <h3 class="fontLila" style="margin-bottom: 30px;" v-if="!this.classicPossible">Stil »Klassisch« mit diesem Format nicht verfügbar!</h3> -->
  <Btn buttonType="Secondary" buttonName="Format Ändern" buttonIcons="Vergroeßern.png" class="format-btn" @click="handleFormatChanging"/>

</div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import Btn from "@/components/Button.vue";
import FormatChoice from '@/components/FormatChoice.vue';

export default {
  name: 'StyleChange',
  components: {
    Btn,
    FormatChoice
  },

  data() {
    return {
      formatChanging: false,
    }
  },

  computed: {
    ...mapState(['isImage', 'isPattern', 'styleClassic', 'styleOverlay', 'stylePattern', 'classicPossible']),
  },
  methods: {
    ...mapActions(['addBild', 'addPattern', 'changeStyle']),

    handleFormatChanging() {
      this.formatChanging = !this.formatChanging;
    }
  }

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
  min-width: 130px;
  height: auto;
  border-radius: 30px;
  margin-right: 10%;
  box-sizing: border-box;
}

.forbidden {
  cursor: default;
}


.format-btn {
  width: 65%;
  margin-bottom: 15px;
}

.overlay{
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
}
</style>