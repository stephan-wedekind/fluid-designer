<template>
  <header class="background-top">
    <img src="Logo/Logo-Wort-Bild.png" class="logo-header-home" alt="">
    <section class="CTA-intro">
    <h1 class="fontWhite introText">
      Der
      »<span style="font-style: italic">RWU </span>
      <span style="font-weight: 700; letter-spacing: 0.03em;">FluidDesigner</span>« hilft dir dabei, <br />
      Layouts automatisch und <br />
      Corporate Design konform zu erstellen!
    </h1>
    <div class="introButton">
      <Btn buttonType="Tertiary" buttonName="Erstelle ein neues Layout" buttonIcons="Hinzufuegen.png" class="btn-toFluid"
        @click="handleFormatChoice" />
    </div>
    </section>
  </header>


  <!-- Overlay&Format Auswahl -->
  <FormatChoice v-if="toFormatChoice" @click="handleFormatChoice" class="overlay" />


  <!-- Tutorial -->
  <div class="tutorial">

    <section class="tutorial-headline">
      <h1 class="fontLila">So funktioniert der »<span style="font-style: italic">RWU </span>
        <span style="font-weight: 700; letter-spacing: 0.03em;">FluidDesigner</span>«
      </h1>
    </section>

    <section class="tutorial-steps">

      <h1 class="fontLila">1</h1>
      <h1 class="fontLila">2</h1>
      <h1 class="fontLila">3</h1>
      <h1 class="fontLila">4</h1>
      <h1 class="fontLila"></h1>

      <img src="Platzhalter/Tutorial/format-tutorial.png" alt="">
      <img src="Platzhalter/Tutorial/maple.png" alt="">
      <img src="Platzhalter/Tutorial/style-tutorial.png" alt="">
      <img src="Platzhalter/Tutorial/download-tutorial.png" alt="">
      <img src="Platzhalter/Tutorial/loslegen-tutorial.png" alt="" @click="handleFormatChoice" id="link">

      <h2 class="fontLila">Wähle zunächst ein geeignetes Format (z.B.&nbsp;DIN&nbsp;A4)</h2>
      <h2 class="fontLila">Als nächstes kannst du dich für einen der drei Layout&nbsp;Stile entscheiden</h2>
      <h2 class="fontLila">Dann füllst du das Layout mit deinen Inhalten.</h2>
      <h2 class="fontLila">Wenn du fertig bist, kannst du dir das Layout herunterladen und es direkt verwenden.</h2>

      <h2 class="fontLila">Probiere es gleich aus.</h2>

    </section>

  </div>

  <!-- Zuletzt erstellt -->
  <div class="recently-made">
    <h1 class="fontLila">Zuletzt erstellt</h1>
  </div>
</template>

<script>
import Btn from '@/components/Button.vue';
import FormatChoice from '@/components/FormatChoice.vue'

export default {
  name: 'Home',
  components: {
    Btn,
    FormatChoice
  },

  data() {
    return {
      toFormatChoice: false,
    }
  },

  methods: {
    handleFormatChoice() {
      this.toFormatChoice = !this.toFormatChoice;
    }
  },
}
</script>

<style scoped>
/* -----------------------------------------------------------Header Background */
.background-top {
  display: flex;
  padding: 60px;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  top: 0;
  right: 0;
  left: 0;
  height: 65vh;
  background: linear-gradient(135deg, #05C3DE 5%, #6638B6 35%, #2D0764 85%);
  z-index: -1;
}

.CTA-intro {
  display: flex;
  align-items: center;
}

.logo-header-home {
  height: 100px;
  width: auto;
  position: absolute;
  top: 0;
  left: 0;

}

.introText {
  margin-right: 60px;
  line-height: 130%;
  font-weight: 400;
}

/* -----------------------------------------------------------Button Styling*/
.introButton {
  text-decoration: none;
}

.btn-toFluid {
  width: 350px;
}


/* -----------------------------------------------------------Tutorial Styling*/
.tutorial {
  padding: 60px;
}

.tutorial-steps {
  padding-top: 30px;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 15px;
  text-align: center;
}


.tutorial-steps img {
  width: 100%;
  aspect-ratio: 1/1;
  object-fit: contain;
}

.tutorial-steps h2 {
  margin-top: 15px;
  line-height: 130%;
}

#link {
  cursor: pointer;
}

/* -----------------------------------------------------------Recently Made Styling*/

.recently-made {
  width: 100vw;
  padding: 60px;
  background-color: white;
}
/* -----------------------------------------------------------Overlay Styling*/

.overlay {
  top: 0;
  left: 0;
}
</style>
