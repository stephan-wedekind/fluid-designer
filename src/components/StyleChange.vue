<template>
  <section class="stylePreview" id="style01" @click="addBild()">
    <img src="Platzhalter/Stil/Stil-1.png" alt="">
    <div class="styleDescription">
      <h1 class="fontLila">Klassisch</h1>
      <p>Bild + Farbfläche in RWU-Lila.</p>
    </div>
  </section>

  <section class="stylePreview" id="style02" @click="addBild()">
    <img src="Platzhalter/Stil/Stil-2.png" class="selected" alt="">
    <div class="styleDescription">
      <h1 class="fontLila">Overlay</h1>
      <p>Hintergrundbild mit Overlay in RWU-Lila.</p>
    </div>
  </section>

  <section class="stylePreview" id="style03" @click="addPattern()">
    <img src="Platzhalter/Stil/Stil-3.png" alt="">
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
    ...mapState(['isImage', 'isPattern']),
  },
  methods: {
    ...mapActions(['addBild', 'addPattern'])
  }

}
</script>

<style scoped>
.stylePreview {
  margin-bottom: 30px;
  display: flex;
  align-items: center;
  box-sizing: border-box;
}

.stylePreview img {
  cursor: pointer;
  width: 25%;
  height: auto;
  border-radius: 30px;
  margin-right: 10%;
}

.stylePreview img.selected {
  box-sizing: border-box;
  border: 10px solid #05C3DE; 
}
</style>