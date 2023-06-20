<template>
  <div class="gird-container">

    <!-- navigation -->
    <nav>
      <router-link to="/" class="close" @click="resetStore()">
      
        <img src="Icons/primary/Menue-schliessen.png" class="iconSidebar" alt="">
      
    </router-link>
      <ul>
        <li v-for="item in items" :key="item.id" :class="{ 'active': isActive(item.id) }" @click="setActive(item.id)">
          <img :src="getIconSrc(item.id)" :alt="item.label" class="iconSidebar" :id="item.id">
          <label>{{ item.label }}</label>
        </li>
      </ul>

      <img src="Logo/Logo-white.png" class="logo-nav" alt="">
    </nav>

    <!-- User Input Feld -->
    <div class="user-input-field">
        <component :is="getActiveComponent()" />
        <div class="btn-container">
        <Btn buttonType="Primary" buttonName="Download" buttonIcons="Download.png" class="btn-download"/>
        </div>
    </div>

    <!-- Canvas Feld -->
    <div class="generated-content">
      <div class="canvas"></div>
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


export default {
  name: 'FluidDesigner',
  components: {
    Btn,
    StyleChange,
    TextInput,
    BildChoice,
    PatternChange,
    WelcomeToFluid
  },
  computed: {
    ...mapState(['activeItem', 'items']),
  },
  methods: {
    ...mapMutations(['setActiveItem']),

    ...mapActions(['resetStore']),

    isActive(itemId) {
      return this.activeItem === itemId;
    },
    setActive(itemId) {
      this.setActiveItem(itemId);
    },
    getIconSrc(itemId) {
      const item = this.items.find((item) => item.id === itemId);
      if (item && this.isActive(itemId)) {
        return `Icons/secondary/${item.label}.png`;
      }
      return `Icons/primary/${item.label}.png`;
    },
    getActiveComponent() {
      const activeItemId = this.activeItem;
      switch (activeItemId) {
        case 'style':
          return 'StyleChange';
        case 'text':
          return 'TextInput';
        case 'bild':
          return 'BildChoice';
        case 'pattern':
          return 'PatternChange';
        default:
          return 'WelcomeToFluid';
      }
    },
  },
};
</script>

<style scoped>
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
  /* padding: 0 60px 60px 60px; */
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
