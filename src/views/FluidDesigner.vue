<template>
  <div class="gird-container">

    <!-- navigation -->
    <nav>
      <div class="close">
        <img src="Icons/primary/Menue-schliessen.png" class="iconSidebar" alt="">
      </div>
      <ul>
        <li :class="{ 'active': styleActive }" @click="setActive('style')">
          <img src="Icons/primary/Module.png" alt="" class="iconSidebar" id="Style">
          <label>Style</label>
        </li>
        <li v-if="isImage" :class="{ 'active': bildActive }" @click="setActive('bild')">
          <img src="Icons/primary/Fotograf.png" alt="" class="iconSidebar" id="Bild">
          <label>Bild</label>
        </li>
        <li v-if="isPattern" :class="{ 'active': patternActive }" @click="setActive('pattern')">
          <img src="Icons/primary/Pattern.png" alt="" class="iconSidebar" id="Pattern">
          <label>Pattern</label>
        </li>
        <li :class="{ 'active': textActive }" @click="setActive('text')">
          <img src="Icons/primary/Text.png" alt="" class="iconSidebar" id="Text">
          <label>Text</label>
        </li>
      </ul>
    </nav>

    <!-- User Input Feld -->
    <div class="user-input-field">
      <h1 class="fontLila">User Input</h1>
      <ButtonComp buttonType="Secondary" buttonName="Change" buttonIcons="Wiederholen.png" buttonWidth="1"
        @click="switchPatternImage" />
    </div>

    <!-- Canvas Feld -->
    <div class="generated-content">
      <div class="canvas"></div>
    </div>
  </div>
</template>

<script>
import ButtonComp from '@/components/Button.vue';

export default {
  name: 'FluidDesigner',
  components: {
    ButtonComp
  },
  data() {
    return {
      styleActive: true,
      bildActive: false,
      patternActive: false,
      textActive: false,
      isImage: true,
      isPattern: false,

    }
  },
  methods: {
    setActive(activeItem) {
      this.styleActive = activeItem === 'style';
      this.bildActive = activeItem === 'bild';
      this.patternActive = activeItem === 'pattern';
      this.textActive = activeItem === 'text';
    },

    switchPatternImage() {

      this.isImage = !this.isImage;
      this.isPattern = !this.isPattern;

    }
  },

}
</script>

<style scoped>
.gird-container {
  display: grid;
  grid-template-columns: 70px 45vw auto;
  grid-template-rows: 100vh;
  grid-template-areas: "navigation userinput canvas";
}

/* -----------------------------SideBar */
nav {
  grid-area: navigation;
  height: 100vh;
  background: linear-gradient(144deg, #05C3DE 13%, #6638B6 55%, #2D0764 89%);
}

img.iconSidebar {
  width: 100%;
  height: auto;
}

/* navigation Tabs */
ul {
  padding: 0;
}

li {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* background: rgba(255, 255, 255, 0.5); */
  cursor: pointer;
  height: 15vh;
  list-style: none;
  color: white;
  margin-bottom: 30px;
}

li.active {
  background-color: white;
  border-radius: 30px 0 0 0;
  color: #6638B6;

  transition: ease-in;
}

li.active img path{
  color: #6638B6;
} 

/* SideBar -----------------------------*/
/* -----------------------------UserEingabe */
.user-input-field {
  grid-area: userinput;
  box-sizing: border-box;
  height: 100vh;
  padding: 60px;
  background-color: white;
}

/* UserEingabe -----------------------------*/
/* -----------------------------Canvas */

.generated-content {
  grid-area: canvas;
  box-sizing: border-box;
  padding: 60px;
}

.canvas {
  width: 100%;
  height: 100%;
  ;
  background-color: #6638B6;
  filter: drop-shadow(10px 10px 20px rgba(0, 0, 0, 0.1));
}
</style>
