<template>
  <div class="gird-container">

    <!-- navigation -->
    <nav>
      <div class="close">
        <img src="Icons/primary/Menue-schliessen.png" class="iconSidebar" alt="">
      </div>
      <ul>
        <li v-for="item in items" :key="item.id" :class="{ 'active': isActive(item.id) }" @click="setActive(item.id)">
          <img :src="getIconSrc(item.id)" :alt="item.label" class="iconSidebar" :id="item.id">
          <label>{{ item.label }}</label>
        </li>
      </ul>
    </nav>

    <!-- User Input Feld -->
    <div class="user-input-field">
      <h1 class="fontLila">User Input</h1>
      <ButtonComp buttonType="Secondary" buttonName="Change" buttonIcons="Wiederholen.png" buttonWidth="1"
        @click="switchPatternImage" />
        <component :is="getActiveComponent()"/>
    </div>

    <!-- Canvas Feld -->
    <div class="generated-content">
      <div class="canvas"></div>
    </div>
  </div>
</template>



<script>
import ButtonComp from '@/components/Button.vue';
import StyleChange from '@/components/StyleChange.vue';
import TextInput from '@/components/TextInput.vue';
import BildChoice from '@/components/BildChoice.vue';
import PatternChange from '@/components/PatternChange.vue';


export default {
  name: 'FluidDesigner',
  components: {
    ButtonComp,
    StyleChange,
    TextInput,
    BildChoice,
    PatternChange
  },
  data() {
    return {
      isImage: false,
      isPattern: false,
      activeItem: '',
      items: [
        { id: 'style', label: 'Style', isImage: true },
        { id: 'text', label: 'Text', isImage: true }
      ]
    };
  },
  methods: {
    isActive(itemId) {
      return this.activeItem === itemId;
    },
    setActive(itemId) {
      this.activeItem = itemId;
    },
    getIconSrc(itemId) {
      const item = this.items.find(item => item.id === itemId);
      if (item && this.isActive(itemId)) {
        return `Icons/secondary/${item.label}.png`;
      }
      return `Icons/primary/${item.label}.png`;
    },
    switchPatternImage() {
      const activeItemId = this.activeItem; // Save the ID of the active item

      this.isImage = !this.isImage;
      this.isPattern = !this.isPattern;

      // Update items array based on isImage and isPattern values
      if (this.isImage) {
        this.items.push({ id: 'bild', label: 'Bild', isImage: true });
        const patternIndex = this.items.findIndex(item => item.id === 'pattern');
        if (patternIndex !== -1) {
          this.items.splice(patternIndex, 1);
        }
      } else {
        this.items.push({ id: 'pattern', label: 'Pattern', isImage: true });
        const bildIndex = this.items.findIndex(item => item.id === 'bild');
        if (bildIndex !== -1) {
          this.items.splice(bildIndex, 1);
        }
      }
      // Set the active item back to the preserved active item
      this.activeItem = activeItemId;
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
          return null;
      }
    },
  },
};
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

li.active img path {
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
