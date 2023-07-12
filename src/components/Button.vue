<template>
 <button :class="['btn'+ buttonType]">
       <img :src="getButtonIcon(buttonIcons)" class="buttonIcon iconL" alt="" v-if="iconLeft">
        <h4>{{buttonName}}</h4>
        <img :src="getButtonIcon(buttonIcons)" class="buttonIcon iconR" alt="" v-if="!iconLeft">
      </button>
</template>

<script>
export default {
  name: 'Button',
  props: {
    buttonType: String,
    buttonName: String,
    buttonIcons: String,
    iconLeft: Boolean,
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
  padding: 0 32px;
}

button h4 {
  font-weight: 500;
}

img.buttonIcon {
  height: 44px;
  width: 44px;
}

img.iconL {
  margin-left: -12px;
}

img.iconR {
  margin-right: -12px;
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
