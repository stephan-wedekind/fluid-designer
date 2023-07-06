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
        <Btn buttonType="Tertiary" buttonName="Erstelle ein neues Layout" buttonIcons="Hinzufuegen.png"
          class="btn-toFluid" @click="handleFormatChoice(!toFormatChoice)" />
      </div>
    </section>
  </header>


  <!-- Overlay&Format Auswahl -->
  <FormatChoice v-if="toFormatChoice" class="overlay" />


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
      <h1 class="fontLila">5</h1>

      <img src="Platzhalter/Tutorial/format-tutorial.png" alt="">
      <img src="Platzhalter/Tutorial/maple.png" alt="">
      <img src="Platzhalter/Tutorial/background-tutorial.png" alt="">
      <img src="Platzhalter/Tutorial/style-tutorial.png" alt="">
      <img src="Platzhalter/Tutorial/download-tutorial.png" alt="">

      <h2 class="fontLila">Wähle zunächst ein geeignetes Format (z.B.&nbsp;DIN&nbsp;A4).</h2>
      <h2 class="fontLila">Danach entscheidest du dich für einen der drei Layoutstile.</h2>
      <h2 class="fontLila">Wähle dann ein Bild aus oder bearbeite das Pattern nach deinen Wünschen.</h2>
      <h2 class="fontLila">Jetzt musst du nur noch deinen Text eingeben...</h2>
      <h2 class="fontLila">...und kannst das Layout direkt herunterladen und verwenden.</h2>

    </section>
    <Btn buttonType="Primary" buttonName="Erstelle ein neues Layout" buttonIcons="Hinzufuegen.png" class="btn-tutorial"
      @click="handleFormatChoice(!toFormatChoice)" />

  </div>

  <!-- Zuletzt erstellt -->
  <div class="recently-made">
    
    <h1 class="fontLila recently-headline">Zuletzt erstellt</h1>
    <p v-if="checkStore()">»es wurden noch keine Layouts im FluidDesigner erstellt«</p>
    <div class="recently-grid">
      
         
          <div  v-for="state in storedStates" :key="state.id">
            <Card :storedState="state" class="recently-grid-item" @delete-clicked="removeState"/>
          </div>
     
    </div>
   
  </div>
</template>

<script>
import Btn from '@/components/Button.vue';
import FormatChoice from '@/components/FormatChoice.vue';
import Card from '@/components/Card.vue';
import { mapState, mapActions, mapMutations } from 'vuex';


export default {
  name: 'Home',
  components: {
    Btn,
    FormatChoice,
    Card
  },

  data() {
    return {
      storedStates: null,
    }
  },



  computed: {
    ...mapState(['toFormatChoice'])
  },


  methods: {
    ...mapActions(['handleFormatChoice']),
    ...mapMutations(['setStoredState', 'setEditExistingLayout']),

    removeMainElement() {
      setTimeout(() => {
        //Wenn man von /fluidDesigner hier her zurück kommt bleibt noch ein p5Canvas übrig der hier zerstört wird
        //Da mounted vor der erstellung des Main elements das den Canvas enthält passiert wurde ein timeout hinzugefügt
        const mainElement = document.querySelector('main');
        if (mainElement) {
          mainElement.parentNode.removeChild(mainElement);
        }
      }, 500);
    },

    formatDate(timestamp) {
      const date = new Date(timestamp);
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear();

      return `Erstellt am ${day}.${month}.${year}`;
    },

    updateStoredStates(storedState) {
      this.$store.commit('setStoredState', storedState);
    },

    checkStore() {
      return !this.storedStates || this.storedStates.length === 0;
    },

    removeState(id) {
      const storedData = localStorage.getItem('storedStates');
      if (storedData) {
        const localStates = JSON.parse(storedData);
        this.storedStates = localStates.filter((localStates) => localStates.id !== id);
        this.storedStates = this.storedStates.sort((a,b) => new Date(b.timestamp) - new Date(a.timestamp));
        
        localStorage.setItem('storedStates', JSON.stringify(this.storedStates));
      }
    }


  },

  mounted() {


    this.removeMainElement();


    const storedData = localStorage.getItem('storedStates');

    if (storedData) {
      this.storedStates = JSON.parse(storedData);
      this.storedStates = this.storedStates.sort((a,b) => new Date(b.timestamp) - new Date(a.timestamp));
    }
  }
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
  gap: 30px;
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

.btn-tutorial {
  width: 30%;
  margin: auto;
  margin-top: 30px;
}

/* -----------------------------------------------------------Recently Made Styling*/

.recently-made {
  width: 100vw;
  padding: 60px;
  background-color: white;
  box-sizing: border-box;
}

.recently-headline {
  margin: 0 0 45px 0;
}

.recently-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 30px;
}

.recently-grid-item {
  background: linear-gradient(135deg, #05C3DE 21%, #6638B6 55%, #2D0764 89%);
  width: 100%;
  aspect-ratio: 1/1;
  border-radius: 30px;
  display: flex;
  justify-content: stretch;
  align-items: center;
  flex-wrap: wrap;
  padding: 30px;
  color: white;
  box-sizing: border-box;
}



/* -----------------------------------------------------------Overlay Styling*/

.overlay {
  top: 0;
  left: 0;
  z-index: 2;
}
</style>
