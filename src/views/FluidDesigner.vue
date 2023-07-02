<template>
  <CloseWarning v-if="isCloseWarning" class="warning"/>
  <div class="gird-container">

    <!-- navigation -->
    <nav>
      <div class="close" @click="setIsCloseWarning(!isCloseWarning)">
      
        <img src="Icons/primary/Menue-schliessen.png" class="iconSidebar" alt="">
      
      </div>
      <ul>
        <li v-for="navigation in navigations" :key="navigation.id" :class="{ 'active': isActive(navigation.id) }" @click="setActive(navigation.id)">
          <img :src="getIconSrc(navigation.id)" :alt="navigation.label" class="iconSidebar" :id="navigation.id">
          <label>{{ navigation.label }}</label>
        </li>
      </ul>

      <img src="Logo/Logo-white.png" class="logo-nav" alt="">
    </nav>

    <!-- User Input Feld -->
    <div class="user-input-field">
        <component :is="getActiveComponent()" />
    </div>

    <!-- Canvas Feld -->
    <div class="generated-content">
      <component :is="getCanvas()" />
      <div class="loading">
        <div class="loading-container">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </div>
      </div>
    </div>
  </div>
  
</template>



<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import Btn from '@/components/Button.vue';
import StyleChange from '@/components/StyleChange.vue';
import TextInput from '@/components/TextInput.vue';
import BildChoice from '@/components/BildChoice.vue';
import PatternChange from '@/components/PatternChange.vue';
import WelcomeToFluid from '@/components/WelcomeToFluid.vue';
import ClassicCanvas from '@/algorythms/Classic.vue';
import OverlayCanvas from '@/algorythms/Overlay.vue';
import PatternCanvas from '@/algorythms/Pattern.vue';
import DefaultCanvas from '@/algorythms/DefaultCanvas.vue';
import CloseWarning from '@/components/CloseWarning.vue'


export default {
  name: 'FluidDesigner',
  components: {
    Btn,
    StyleChange,
    TextInput,
    BildChoice,
    PatternChange,
    WelcomeToFluid,
    ClassicCanvas,
    OverlayCanvas,
    PatternCanvas,
    DefaultCanvas,
    CloseWarning
  },
  computed: {
    ...mapState(['activeNavigation', 'navigations', 'styleClassic', 'styleOverlay', 'stylePattern', 'focus', 'isCloseWarning']),
  },

  watch: {
    focus() {
      const mainElement = document.querySelector('main');
        if (mainElement) {
          mainElement.parentNode.removeChild(mainElement);
        }
    }
  },
  methods: {
    ...mapMutations(['setActiveNavigation', 'setIsCloseWarning']),

    

    isActive(navigationId) {
      return this.activeNavigation === navigationId;
    },
    setActive(navigationId) {
      this.setActiveNavigation(navigationId);
    },
    getIconSrc(navigationId) {
      const navigation = this.navigations.find((navigation) => navigation.id === navigationId);
      if (navigation && this.isActive(navigationId)) {
        return `Icons/secondary/${navigation.label}.png`;
      }
      return `Icons/primary/${navigation.label}.png`;
    },
    getActiveComponent() {
      const activeNavigationId = this.activeNavigation;
      switch (activeNavigationId) {
        case 'style':
          return 'StyleChange';
        case 'text':
          return 'TextInput';
        case 'bild':
          return 'BildChoice';
        case 'pattern':
          return 'PatternChange';
        default:
          this.setActive('style');
          return 'StyleChange';

      }
    },

    getCanvas() {
      if (this.styleClassic) {
        return 'ClassicCanvas';
      } else if (this.styleOverlay) {
        return 'OverlayCanvas';
      } else if (this.stylePattern) {
        return 'PatternCanvas';
      } else {
        return 'DefaultCanvas';
      }
    },
  },
};
</script>

<style scoped>
.close {
  cursor: pointer;
}
.gird-container {
  display: grid;
  grid-template-columns: 70px 45vw auto;
  grid-template-areas: "navigation userinput canvas";
  transition: ease-in 0.1s;
}

/* -----------------------------SideBar */
nav {
  grid-area: navigation;
  height: 100vh;
  background: linear-gradient(144deg, #05C3DE 13%, #6638B6 55%, #2D0764 89%);
}

img.logo-nav {
  width: 70px;
  height: auto;
  position: absolute;
  bottom: 30px;
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
  cursor: pointer;
  height: 120px;
  list-style: none;
  color: white;
  margin-bottom: 30px;
}

li.active {
  background-color: white;
  border-radius: 30px 0 0 0;
  color: #6638B6;
}

li.active img path {
  color: #6638B6;
}

/* SideBar -----------------------------*/
/* -----------------------------UserEingabe */
.user-input-field {
  grid-area: userinput;
  box-sizing: border-box;
  height: 100vh;
  background-color: white;
  box-shadow: 20px 0px 30px rgba(102, 56, 182, 0.1);
  overflow-y: auto;
  scroll-behavior: revert;
}

.btn-download {
  width: 65%;
}

.btn-container {
  width: calc(100%-60px);
  padding-left: 60px;
  padding-bottom: 60px;
}

/* UserEingabe -----------------------------*/

/* -----------------------------Canvas */

.generated-content {
  grid-area: canvas;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  /* padding: 60px; */
}

.canvas {
  width: 100%;
  height: 100%;
  ;
  background-color: #6638B6;
  filter: drop-shadow(10px 10px 20px rgba(0, 0, 0, 0.1));
}

.warning{
z-index: 20; 
}

.loading{

  position: absolute;
  box-sizing: border-box;
  left: calc(70px + 45vw);
  top: 60px;
  width: calc(100vw - (70px + 45vw));
  height: calc(100vh - 120px);
  z-index: -1;
}
</style>
