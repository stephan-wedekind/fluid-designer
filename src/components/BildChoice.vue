<template>
 <div class="fix"></div>
 <div class="scroll">
    <div class="image-grid-container">
      <div v-for="image in images" :key="image.id" @click="setActiveImage(image.id)">
        <img :src="image.path" :alt="image.path"  :class="{ 'selected': isActiveImage(image.id) }">
      </div>
    </div>
 </div>
</template>

<script>
export default {
  name: 'BildChoice',

  data() {
    return {
      images: [
        {id : 1, path : "https://images.pexels.com/photos/16349261/pexels-photo-16349261/free-photo-of-blumen-rosen-flasche-stillleben.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"},
        {id : 2, path : "https://images.pexels.com/photos/17220398/pexels-photo-17220398/free-photo-of-holz-kunst-dreckig-mauer.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"},
        {id : 3, path : "https://images.pexels.com/photos/15652573/pexels-photo-15652573/free-photo-of-stadt-liebe-paris-strasse.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"},
        {id : 4, path : "https://images.pexels.com/photos/16124527/pexels-photo-16124527/free-photo-of-strasse-gehen-manner-big-ben.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"},
        {id : 5, path : "https://images.pexels.com/photos/1653090/pexels-photo-1653090.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"},
        {id : 6, path : "https://images.pexels.com/photos/3339045/pexels-photo-3339045.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"},
      ],
      activeImage: null,
      isSelected: true
    }
  },

  methods: {
    setActiveImage(Id){
      this.activeImage = Id;
      console.log(this.activeImage);
    },

    isActiveImage(Id){
      
      return this.activeImage == Id;
    }
  },
}
</script>

<style scoped>
.fix {
  width: 100%;
  padding-top: 60px;
  height: 50px;
  position: sticky;
  top:0;
  z-index: 1;
  background-color: aqua;
}

.scroll {
  width: 100%;
  padding: 60px;
  box-sizing: border-box;
  z-index: -1;
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


</style>
