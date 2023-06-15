<template>
  <section class="stylePreview" id="style01"  @click="addBild(), changeStyle('style01')">
    <img src="Platzhalter/Stil/Stil-1.png" :class="{ 'selected': this.styleClassic }" alt="">
    <div class="styleDescription">
      <h1 class="fontLila">Klassisch</h1>
      <p>Bild + Farbfläche in RWU-Lila.</p>
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

</template>

<script>
import { mapState, mapActions } from 'vuex';
import Btn from "@/components/Button.vue";
export default {
  name: 'StyleChange',
  components: {
    Btn,
  },

  computed: {
    ...mapState(['isImage', 'isPattern', 'selectedStyle', 'styleClassic', 'styleOverlay', 'stylePattern']),
  },
  methods: {
    ...mapActions(['addBild', 'addPattern', 'changeStyle']),
  }

}
</script>

<style scoped>
.stylePreview {
  margin-bottom: 30px;
  display: flex;
  align-items: center;
}

.stylePreview img {
  cursor: pointer;
  width: 25%;
  min-width: 130px;
  height: auto;
  border-radius: 30px;
  margin-right: 10%;
  box-sizing: border-box;
}

.stylePreview img.selected {

  border: 10px solid #05C3DE; 
  translate: ease-in 0.5s;
}
</style>