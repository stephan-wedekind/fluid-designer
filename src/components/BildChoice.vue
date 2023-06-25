<template>
  <div class="fix padding-60">

    <input type="search" name="searchfield" id="searching-images" placeholder="Suche" v-model="searchInput"
      @keyup.enter="setSelectedCategory()" :class="{'filled': this.searchInput.length > 0}">
    <div class="buttons">
      <Btn buttonType="Secondary" buttonName="Fokus wählen" buttonIcons="Vorschau.png" class="btn-fokus" />
      <Btn buttonType="Primary" buttonName="Alle Bilder" buttonIcons="Bild.png" class="btn-fokus" @click="showAllImages"/>
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
import Btn from "@/components/Button.vue";

export default {
  name: 'BildChoice',

  components: {
    Btn,
  },

  data() {
    return {
      images: [
        { id: 1, name: "image1", path: "bild-server-ersatz/_MG_1398.jpg", tag: "flowers", humans: false },
        { id: 2, name: "image2", path: "bild-server-ersatz/Angewandte-Gesundheitswissenschaft--(4).jpg", tag: "flowers", humans: false },
        { id: 3, name: "image3", path: "bild-server-ersatz/Betriebswirtschaftslehre-und-Management-(4).jpg", tag: "flowers", humans: false },
        { id: 4, name: "image4", path: "bild-server-ersatz/Electrical-Engineering-(3).jpg", tag: "flowers", humans: false },
        { id: 5, name: "image5", path: "bild-server-ersatz/Elektromobilität-(4).jpg", tag: "flowers", humans: false },
        { id: 6, name: "image6", path: "bild-server-ersatz/Elektrotechnik-(1).jpg", tag: "flowers", humans: false },
        { id: 7, name: "image7", path: "bild-server-ersatz/Elektrotechnik-(3).jpg", tag: "flowers", humans: false },
        { id: 8, name: "image8", path: "bild-server-ersatz/Energie--und-Umwelttechnik-(2).jpg", tag: "flowers", humans: false },
        { id: 9, name: "image9", path: "bild-server-ersatz/Fahrzeugtechnik--(1).jpg", tag: "flowers", humans: false },
        { id: 10, name: "image10", path: "bild-server-ersatz/First-Responder-1.jpg", tag: "flowers", humans: false },
        { id: 11, name: "image11", path: "bild-server-ersatz/Foyer-H-Gebäude-(3).jpg", tag: "flowers", humans: false },
        { id: 12, name: "image12", path: "bild-server-ersatz/Frühling_Campus-1.jpg", tag: "flowers", humans: false },
        { id: 13, name: "image13", path: "bild-server-ersatz/Gesundheitsökonomie--(3).jpg", tag: "flowers", humans: false },
        { id: 14, name: "image14", path: "bild-server-ersatz/H.O.M.E.jpg", tag: "flowers", humans: false },
        { id: 15, name: "image15", path: "bild-server-ersatz/Informatik-(3).jpg", tag: "flowers", humans: false },
        { id: 16, name: "image16", path: "bild-server-ersatz/International-Business-Management-(6).jpg", tag: "flowers", humans: false },
        { id: 17, name: "image17", path: "bild-server-ersatz/Kaffeebar-(1).jpg", tag: "flowers", humans: false },
        { id: 18, name: "image18", path: "bild-server-ersatz/Kfz-Labor-2.jpg", tag: "flowers", humans: false },
        { id: 19, name: "image19", path: "bild-server-ersatz/Maschinenbau--(3).jpg", tag: "flowers", humans: false },
        { id: 20, name: "image20", path: "bild-server-ersatz/Mediendesign-(3).jpg", tag: "flowers", humans: false },
        { id: 21, name: "image21", path: "bild-server-ersatz/NZ-Labor-1.jpg", tag: "flowers", humans: false },
        { id: 22, name: "image22", path: "bild-server-ersatz/Pflege--(5).jpg", tag: "flowers", humans: false },
        { id: 23, name: "image23", path: "bild-server-ersatz/Wirtschaftsingenieurwesen-(4).jpg", tag: "flowers", humans: false },
      ],
      
      isSelected: true,
      selectedCategory: '',
      searchInput: '',
    }
  },

  methods: {

    ...mapMutations(['setImagePath', 'setActiveImage']),

    setActive(Id) {
      this.setActiveImage(Id);
    },

    isActiveImage(Id) {

      return this.activeImage == Id;
    },
    setSelectedCategory() {
      this.selectedCategory = this.searchInput.toLowerCase();
    },

    showAllImages() {
      this.selectedCategory = '';
      this.searchInput = '';
    }
  },

  computed: {
    ...mapState(['imagePath', 'activeImage']),

    filteredImages() {
      if (this.selectedCategory === '') {
        return this.images;
      } else {

        return this.images.filter(image => image.tag === this.selectedCategory);

      }

    }
  }

}
</script>

<style scoped>
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
