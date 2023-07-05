<template>
    <div class="card" @mouseenter="isHovered = true" @mouseleave="isHovered = false">
    <router-link to="/fluidDesigner" class="link" @click="updateStoredStates(state), setEditExistingLayout(true)">
      <h2>{{ storedState.headline }}</h2>
      <p>{{ formatDate(storedState.timestamp) }}</p>
    </router-link>
      <Btn buttonType="Tertiary" buttonIcons="Menue-schliessen.png" v-if="isHovered" class="close-button" @click="removeButtonClicked()" />
    </div>
  </template>
  
  <script>
  import { mapMutations } from 'vuex';
  import Btn from '@/components/Button.vue'

  export default {
    name: 'Card',
    props: {
      storedState: Object,
    },
    components: {
        Btn
    },
    data() {
      return {
        isHovered: false
      };
    },
    methods: {
    ...mapMutations(['setStoredState', 'setEditExistingLayout']),

    removeButtonClicked() {
        console.log("removeButtonClicked was clicked: " + this.storedState.id);
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
    background: linear-gradient(135deg, #05C3DE 5%, #6638B6 35%, #2D0764 85%);
    border-radius: 30px;
    padding: 30px;
    color: white;
    position: relative;
  }
  
  .close-button {
    position: absolute;
    top: 10px;
    right: 10px;
    background-color: transparent;
    border: none;
    color: white;
    cursor: pointer;
  }
  </style>
  