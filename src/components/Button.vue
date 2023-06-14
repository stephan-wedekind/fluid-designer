<template>
 <button :class="['btn'+ buttonType]" :id="['btnWidth' + buttonWidth]" :disabled="isDisabled">
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
    buttonWidth: String,
    isDisabled: Boolean,
  },


  methods: {
    getButtonIcon(btnSrc) {
      if (this.buttonType === 'Primary') {
        return 'Icons/primary/' + btnSrc;
      } else if (this.buttonType === 'Secondary') {
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

button.btnSecondary {
  border: 3px solid #6638B6;
  color: #6638B6;
  background: none;
}

button.btnSecondary:hover {
  border: 3px solid #05c3de;
}

button.btnSecondary:active {
  background-color: rgba(5, 195, 222, 0.1);
}
#btnWidth0 {
  width: 100px;
}
#btnWidth1 {
  width: 200px;
}
#btnWidth2 {
  width: 300px;
}
img.buttonIcon {
  height: 50px;
  width: 50px;
}
</style>
