<template>
 <button :class="['btn'+ buttonType]" :disabled="isDisabled">
        <h4>{{buttonName}}</h4>
        <img :src="getButtonIcon(buttonIcons)" class="buttonIcon" alt="">
      </button>
</template>

<script>
export default {
  name: 'Button',
  props: {
    buttonType: String,
    buttonName: String,
    buttonIcons: String,
    isDisabled: Boolean,
  },


  methods: {
    getButtonIcon(btnSrc) {
      if (this.buttonType === 'Primary') {
        return 'Icons/primary/' + btnSrc;
      } else if (this.buttonType === 'Secondary' || this.buttonType ==='Tertiary') {
        return 'Icons/secondary/' + btnSrc;
      }
    }
  },
}
</script>

<style scoped>

/* ----------------------------------------Button Styling */
button {
  cursor: pointer;
  display: flex;
  height: 50px;
  border: none;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
}

img.buttonIcon {
  height: 50px;
  width: 50px;
}

/*Primary Button*/
button.btnPrimary {
  border: none;
  color: white;
  background-color: #6638B6;
}

button.btnPrimary:hover {
  background-color: #2D0764;
}

button.btnPrimary:active {
  background-color: #0E0819;
}

button.btnPrimary:disabled {
  background-color: #B3B3B3;
}

/*Secondary Button*/
button.btnSecondary {
  border: 3px solid #6638B6;
  color: #6638B6;
  background: none;
}

button.btnSecondary:hover {
  border:5px solid #6638B6;
}

button.btnSecondary:active {
  background-color: rgba(102, 56, 182, 0.2);
}

/*Tertiary Button*/

button.btnTertiary{
  border: none;
  color: #6638B6;
  background-color: white;
}
button.btnTertiary:hover {
  background-color: #f2f2f2;
}

button.btnTertiary:active {
  background-color: #f2f2f2;
} 
</style>
