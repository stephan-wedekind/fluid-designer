<template>
  <FocusPoint v-if="chooseFocus" class="focus" />
  <div class="fix padding-60">
    <div class="steps">
      <button class="prev-next" @click="setActiveNav('style')"><h4>&lang;</h4></button>
      <h4 class="fontGrey indicator">Schritt 2 von 3 <span class="fontLila">Bild auswählen </span></h4>
      <button class="prev-next" @click="setActiveNav('text')"><h4>&rang;</h4></button>
    </div>
    <input type="search" name="searchfield" id="searching-images" placeholder="Suche" v-model="searchInput"
      @keyup="searchWithDebounce" :class="{ 'filled': this.searchInput.length > 0 }">
    <div class="buttons">
      <Btn buttonType="Secondary" buttonName="Alle Bilder" buttonIcons="Bild.png"  :iconLeft="false" class="btn-all-images"
        @click="showAllImages" :disabled="false"/>
      <Btn buttonType="Primary" buttonName="Bildauschnitt ändern" buttonIcons="Vorschau.png"  :iconLeft="false" class="btn-fokus" 
        @click="setChooseFocus(true)" />
      
    </div>
  </div>
  <div class="scroll padding-60">
    <div class="image-grid-container">
      <div v-for="image in filteredImages" :key="image.id" @click="setActiveImage(image.id), setImagePath(image.path)">
        <img :src="image.path" :alt="image.name" :class="{ 'selected': isActiveImage(image.id) }">
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapState, mapMutations } from 'vuex';
import { debounce } from 'lodash';
import Btn from "@/components/Button.vue";
import FocusPoint from "@/overlays/FocusPoint.vue";

export default {
  name: 'BildChoice',

  components: {
    Btn,
    FocusPoint,
  },

  data() {
    return {
      images : [],

      isSelected: true,
      searchedTag: '',
      searchInput: '',
    }
  },

  mounted() {
    axios.get("http://localhost:3030/allData").then((response) => {
      this.images = response.data;
    }). catch((error) => {
      console.error(error);
    });
  },

  methods: {

    ...mapMutations(['setImagePath', 'setActiveImage', 'setChooseFocus', 'setFocus', 'setActiveNavigation']),

    setActive(Id) {
      this.setActiveImage(Id);
    },

    isActiveImage(Id) {

      return this.activeImage == Id;
    },

    setActiveNav(Id) {
      this.setActiveNavigation(Id);
    },

    searchWithDebounce: debounce(function () {
      this.setSearchedTag();
    }, 100),

    setSearchedTag() {
      this.searchedTag = this.searchInput.toLowerCase();
    },

    showAllImages() {
      this.searchedTag = '';
      this.searchInput = '';
    },


  },

  computed: {
    ...mapState(['imagePath', 'activeImage', 'chooseFocus']),

    filteredImages() {
      if (!this.searchedTag) {
        return this.images; // Wenn nichts gesucht wurde, werden alle Bilder angezeigt
      }

      const searchTerms = this.searchedTag.toLowerCase().split(" ");
      return this.images.filter(image => {
        for (const term of searchTerms) {
          if (image.tag.some(tag => tag.includes(term))) {
            return true; // Wenn ein Suchbegriff gefunden wurde, bleibt das Bild im Filter
          }
        }
        return false; // Wenn kein Suchbegriff gefunden wurde, wird das Bild aus dem Filter entfernt
      });
    }
  },

  watch: {
    imagePath() {
      this.setFocus(0.5);
    }
  }

}
</script>

<style scoped>
.focus {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 3;
}

.fix {
  width: 100%;
  position: sticky;
  top: 0;
  z-index: 1;
  background-color: white;
  box-shadow: 10px 0px 20px 20px white;
  padding-bottom: 30px;
}

.scroll {
  width: 100%;
  z-index: -1;
  padding-top: 30px;
}

.image-grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.image-grid-container img {
  width: 100%;
  aspect-ratio: 1/1;
  object-fit: cover;
  border-radius: 10px;
  cursor: pointer;
}

#searching-images {
  width: 100%;
}

.btn-fokus {
  width: calc(60% - 15px);
}

.btn-all-images {
  width: 40%;
}

.buttons {
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
}
</style>
