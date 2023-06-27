<template>
 <button :class="['btn'+ buttonType]">
        <img :src="getButtonIcon(buttonIcons)" class="buttonIcon" alt="">
        <h4>{{buttonName}}</h4>
      </button>
</template>

<script>
export default {
  name: 'ButtonIconLeft',
  props: {
    buttonType: String,
    buttonName: String,
    buttonIcons: String,
  },


  methods: {
    getButtonIcon(btnSrc) {
      if (this.buttonType === 'Primary' || this.buttonType === 'DEV') {
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

button h4 {
  font-weight: 500;
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
  border: 2px solid #6638B6;
  color: #6638B6;
  background: none;
}

button.btnSecondary:hover {
  background-color: #f2f2f2;
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

/* DEV ONLY BUTTON - REMOVE BEVORE BUILT*/

button.btnDEV{
  border: none;
  color: white;
  background-color: #ff00ff;
}
</style>
