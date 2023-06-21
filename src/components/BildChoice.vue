<template>
  <div class="fix padding-60">

    <input type="search" name="searchfield" id="searching-images" placeholder="Suche" v-model="searchInput"
      @keyup.enter="setSelectedCategory()" :class="{'input-filled': this.searchInput.length > 0}">
    <div class="buttons">
      <Btn buttonType="Secondary" buttonName="Fokus wählen" buttonIcons="Vorschau.png" class="btn-fokus" />
      <Btn buttonType="Primary" buttonName="Alle Bilder" buttonIcons="Bild.png" class="btn-fokus" @click="showAllImages"/>
    </div>
  </div>
  <div class="scroll padding-60">
    <div class="image-grid-container">
      <div v-for="image in filteredImages" :key="image.id" @click="setActiveImage(image.id)">
        <img :src="image.path" :alt="image.name" :class="{ 'selected': isActiveImage(image.id) }">
      </div>
    </div>
  </div>
</template>

<script>
import Btn from "@/components/Button.vue";

export default {
  name: 'BildChoice',

  components: {
    Btn,
  },

  data() {
    return {
      images: [
        { id: 1, name: "image1", path: "https://images.pexels.com/photos/16349261/pexels-photo-16349261/free-photo-of-blumen-rosen-flasche-stillleben.jpeg", tag: "flowers", humans: false },
        { id: 2, name: "image2", path: "https://images.pexels.com/photos/17220398/pexels-photo-17220398/free-photo-of-holz-kunst-dreckig-mauer.jpeg", tag: "interior design", humans: false },
        { id: 3, name: "image3", path: "https://images.pexels.com/photos/15652573/pexels-photo-15652573/free-photo-of-stadt-liebe-paris-strasse.jpeg", tag: "building", humans: false },
        { id: 4, name: "image4", path: "https://images.pexels.com/photos/16124527/pexels-photo-16124527/free-photo-of-strasse-gehen-manner-big-ben.jpeg", tag: "street", humans: true },
        { id: 5, name: "image5", path: "https://images.pexels.com/photos/1653090/pexels-photo-1653090.jpeg", tag: "music", humans: false },
        { id: 6, name: "image6", path: "_MG_1398.jpg", tag: "music", humans: false },
      ],
      activeImage: null,
      isSelected: true,
      selectedCategory: '',
      searchInput: '',
    }
  },

  methods: {
    setActiveImage(Id) {
      this.activeImage = Id;
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
  height: 1000px;
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

.input-filled {
  border: 2px solid #05C3DE;
}
</style>
