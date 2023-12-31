<template>
  <CloseWarning v-if="isCloseWarning" class="warning"/>
  <FormatChoice class="overlay" v-if="toFormatChoice"/>
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

    <!-- User Input Field -->
    <div class="user-input-field" ref="userInputField">
        <component :is="getActiveComponent()" />

        <div class="sticky-bottom">
          <div class="btn-container">
            <Btn buttonType="Secondary" buttonName="Format Ändern" buttonIcons="Vergroeßern.png" class="format-btn" :iconLeft="false" @click="handleFormatChoice(true)"/>
            <Btn buttonType="Primary" buttonName="Download" buttonIcons="Download.png" class="download-btn" :iconLeft="false" @click="incrementDownloadTriggerPDF" :disabled="disableDownload()" v-if="isPrint"/>
            <Btn buttonType="Primary" buttonName="Download" buttonIcons="Download.png" class="download-btn" :iconLeft="false" @click="incrementDownloadTriggerImage" :disabled="disableDownload()" v-if="!isPrint"/>
          </div>
        </div>
    </div>

    <!-- Canvas Field -->
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

import StyleChange from '@/userinputs/StyleChange.vue';
import TextInput from '@/userinputs/TextInput.vue';
import BildChoice from '@/userinputs/BildChoice.vue';
import PatternChange from '@/userinputs/PatternChange.vue';

import ClassicCanvas from '@/algorythms/Classic.vue';
import OverlayCanvas from '@/algorythms/Overlay.vue';
import PatternCanvas from '@/algorythms/Pattern.vue';
import DefaultCanvas from '@/algorythms/DefaultCanvas.vue';

import CloseWarning from '@/overlays/CloseWarning.vue';
import FormatChoice from '@/overlays/FormatChoice.vue';


export default {
  name: 'FluidDesigner',
  components: {
    Btn,
    StyleChange,
    TextInput,
    BildChoice,
    PatternChange,
    ClassicCanvas,
    OverlayCanvas,
    PatternCanvas,
    DefaultCanvas,
    CloseWarning,
    FormatChoice
  },
  computed: {
    ...mapState(['activeNavigation', 'navigations', 'styleClassic', 'styleOverlay', 'stylePattern', 'focus', 'isCloseWarning', 'toFormatChoice', 'isPrint']),
  },

  watch: {
   /*  focus() {
      const mainElement = document.querySelector('main');
        if (mainElement) {
          mainElement.parentNode.removeChild(mainElement);
        }
    } */
  },
  methods: {
    ...mapMutations(['setActiveNavigation', 'setIsCloseWarning', 'incrementDownloadTrigger', 'incrementDownloadTriggerPDF', 'incrementDownloadTriggerImage']),
    ...mapActions(['handleFormatChoice']),

    disableDownload() {
      return (!this.styleClassic && !this.styleOverlay && !this.stylePattern) ?  true :  false;
    },

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

.overlay{
  position: fixed;
  top: 0;
  left: 0;
  z-index: 3;
}
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
  background: linear-gradient(144deg, #05C3DE 21%, #6638B6 70%, #2D0764 100%);
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

/* li.active img path {
  color: #6638B6;
} */

/* SideBar -----------------------------*/
/* -----------------------------UserEingabe */
.user-input-field {
  grid-area: userinput;
  height: 100vh;
  background-color: white;
  box-shadow: 20px 0px 30px rgba(102, 56, 182, 0.1);
  overflow-y: auto;
  scroll-behavior: revert;
}

.btn-download {
  width: 65%;
}


.sticky-bottom {
  position: sticky;
  width: 100%;
  bottom: 0;
  z-index: 1;
  background-color: white;
  box-shadow: 10px 0px 20px 20px white;
  padding: 30px 60px;
}


.btn-container {
  display: flex;
  width: 100%;
  justify-content: space-between;
}

.format-btn, .download-btn {
  width: calc(50% - 7.5px);
}
/* UserEingabe -----------------------------*/

/* -----------------------------Canvas */

.generated-content {
  grid-area: canvas;
  display: flex;
  justify-content: center;
  align-items: center;
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
  left: calc(70px + 45vw);
  top: 60px;
  width: calc(100vw - (70px + 45vw));
  height: calc(100vh - 120px);
  z-index: -1;
}
</style>
