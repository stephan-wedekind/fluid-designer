<template>
  <FocusPoint v-if="chooseFocus" class="focus" />
  <div class="fix padding-60">

    <input type="search" name="searchfield" id="searching-images" placeholder="Suche" v-model="searchInput"
      @keyup="searchWithDebounce" :class="{ 'filled': this.searchInput.length > 0 }">
    <div class="buttons">
      <Btn buttonType="Secondary" buttonName="Bildauschnitt ändern" buttonIcons="Vorschau.png" class="btn-fokus"
        @click="setChooseFocus(true)" />
      <Btn buttonType="Primary" buttonName="Alle Bilder" buttonIcons="Bild.png" class="btn-fokus"
        @click="showAllImages" />
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
import { mapState, mapMutations } from 'vuex';
import { debounce } from 'lodash';
import Btn from "@/components/Button.vue";
import FocusPoint from "@/components/FocusPoint.vue";

export default {
  name: 'BildChoice',

  components: {
    Btn,
    FocusPoint,
  },

  data() {
    return {
      images: [
        { id: 1, name: "image1", path: "bild-server-ersatz/_MG_1398.jpg", tag: ["innen", "labor", "equipment", "chemie", "gesundheit", "wissenschaft", "gebäude", "raum"], humans: false },
        { id: 2, name: "image2", path: "bild-server-ersatz/Angewandte-Gesundheitswissenschaft--(4).jpg", tag: ["angewandte", "gesundheitswissenschaft", "person", "innen", "frau", "gruppenarbeit", "büro", "fenster", "sitzen", "computer", "lernen", "lerngruppe", "lerngruppen"], humans: false },
        { id: 3, name: "image3", path: "bild-server-ersatz/Betriebswirtschaftslehre-und-Management-(4).jpg", tag: ["betriebswirtschaftslehre", "management", "person", "innen", "frau", "mann", "gruppenarbeit", "büro", "fenster", "sitzen", "computer", "lernen", "lerngruppe", "lerngruppen"], humans: false },
        { id: 4, name: "image4", path: "bild-server-ersatz/Electrical-Engineering-(3).jpg", tag: ["electrical", "engineering", "person", "innen", "frau", "mann", "gruppenarbeit", "büro", "fenster", "sitzen", "computer", "lernen", "lerngruppe", "lerngruppen"], humans: false },
        { id: 5, name: "image5", path: "bild-server-ersatz/Elektromobilität-(4).jpg", tag: ["elektromobilität", "außen", "aussen", "windrad", "windenergie", "ökostrom", "elektroauto", "e-auto"], humans: false },
        { id: 6, name: "image6", path: "bild-server-ersatz/Elektrotechnik-(1).jpg", tag: ["elektrotechnik"], humans: false },
        { id: 7, name: "image7", path: "bild-server-ersatz/Elektrotechnik-(3).jpg", tag: ["elektrotechnik"], humans: false },
        { id: 8, name: "image8", path: "bild-server-ersatz/Energie--und-Umwelttechnik-(2).jpg", tag: ["energie", "umwelttechnik"], humans: false },
        { id: 9, name: "image9", path: "bild-server-ersatz/Fahrzeugtechnik--(1).jpg", tag: ["fahrzeugtechnik"], humans: false },
        { id: 10, name: "image10", path: "bild-server-ersatz/First-Responder-1.jpg", tag: ["first", "responder"], humans: false },
        { id: 11, name: "image11", path: "bild-server-ersatz/Foyer-H-Gebäude-(3).jpg", tag: ["foyer", "gebäude", "innen"], humans: false },
        { id: 12, name: "image12", path: "bild-server-ersatz/Frühling_Campus-1.jpg", tag: ["frühling", "baum", "campus"], humans: false },
        { id: 13, name: "image13", path: "bild-server-ersatz/Gesundheitsökonomie--(3).jpg", tag: ["gesundheitsökonomie"], humans: false },
        { id: 14, name: "image14", path: "bild-server-ersatz/H.O.M.E.jpg", tag: ["home"], humans: false },
        { id: 15, name: "image15", path: "bild-server-ersatz/Informatik-(3).jpg", tag: ["informatik"], humans: false },
        { id: 16, name: "image16", path: "bild-server-ersatz/International-Business-Management-(6).jpg", tag: ["international", "buisness", "management"], humans: false },
        { id: 17, name: "image17", path: "bild-server-ersatz/Kaffeebar-(1).jpg", tag: ["kaffee", "bar"], humans: false },
        { id: 18, name: "image18", path: "bild-server-ersatz/Kfz-Labor-2.jpg", tag: ["kfz", "labor"], humans: false },
        { id: 19, name: "image19", path: "bild-server-ersatz/Maschinenbau--(3).jpg", tag: ["maschinenbau"], humans: false },
        { id: 20, name: "image20", path: "bild-server-ersatz/Mediendesign-(3).jpg", tag: ["mediendesign"], humans: false },
        { id: 21, name: "image21", path: "bild-server-ersatz/NZ-Labor-1.jpg", tag: ["labor"], humans: false },
        { id: 22, name: "image22", path: "bild-server-ersatz/Pflege--(5).jpg", tag: ["pflege"], humans: false },
        { id: 23, name: "image23", path: "bild-server-ersatz/Wirtschaftsingenieurwesen-(4).jpg", tag: ["wirtschaftsingenieurwesen"], humans: false },
        { id: 25, name: "image24", path: "bild-server-ersatz/pexels-oladimeji-ajegbile-2861798.jpg", tag: ["wirtschaftsingenieurwesen"], humans: false },
      ],

      isSelected: true,
      searchedTag: '',
      searchInput: '',
    }
  },

  methods: {

    ...mapMutations(['setImagePath', 'setActiveImage', 'setChooseFocus', 'setFocus']),

    setActive(Id) {
      this.setActiveImage(Id);
    },

    isActiveImage(Id) {

      return this.activeImage == Id;
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
  margin-top: 30px;
  width: calc(50% - 7px);
}

.buttons {
  display: flex;
  justify-content: space-between;
}
</style>
