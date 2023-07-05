<template>
    <div class="card" @mouseenter="isHovered = true" @mouseleave="isHovered = false">
    <router-link to="/fluidDesigner" class="link card-link" @click="updateStoredStates(storedState), setEditExistingLayout(true)">
      <h2>{{ storedState.headline }}</h2>
      <p>{{ formatDate(storedState.timestamp) }}</p>
    </router-link>
      <button buttonType="Tertiary" buttonIcons="Menue-schliessen.png" v-if="isHovered" class="close-button" @click="removeButtonClicked()" ><h4 class="fontLila">&times;</h4></button>
    </div>
  </template>
  
  <script>
  import { mapMutations, mapActions } from 'vuex';


  export default {
    name: 'Card',
    props: {
      storedState: Object,
    },
    data() {
      return {
        isHovered: false
      };
    },
    methods: {
    ...mapMutations(['setStoredState', 'setEditExistingLayout']),
      
    updateStoredStates(storedState) {
      this.$store.commit('setStoredState', storedState);
    },

    removeButtonClicked() {
        this.$emit('delete-clicked', this.storedState.id);
      },
      formatDate(timestamp) {
      const date = new Date(timestamp);
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear();

      return `Erstellt am ${day}.${month}.${year}`;
    },
    }
  };
  </script>
  
  <style>
  .card {

    border-radius: 30px;
    padding: 30px;
    color: white;
    position: relative;
  }

  .card-link {
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }
  
  .close-button {
    width: 34px;
    height: 34px;
    border-radius: 100%;
    position: absolute;
    top: -10px;
    right: -10px;
    background-color: #f2f2f2;
    border: none;
    cursor: pointer;
  }
  </style>
  