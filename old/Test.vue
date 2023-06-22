<template>
  <div>
  
    <h1>Test</h1>
    <input 
      v-model="textInput"
      @keyup.enter="changeText"
      type="text"
    >
  
    <div class="mainCanvas" ref="layoutContainer"></div>
  </div>
</template>

<script>
import p5 from "p5";

export default {
  name: "Test",

  data() {
    return {
      p: null,
      canvas: null,
      resizeTimeout: null,
      textInput: "",
    };
  },

  mounted() {
    this.createCanvas();
    window.addEventListener("resize", this.handleResize);
  },

  beforeUnmount() {
    window.removeEventListener("resize", this.handleResize);
  },

  methods: {
    createCanvas() {
      let font;
      let primaryC; 

      this.p = new p5((p) => {
        p.preload = () => {
          font = p.loadFont("fonts/Barlow-Semicondensed/BarlowSemiCondensed-Bold.ttf");
        };

        p.setup = () => {
          p.pixelDensity(10);
          this.canvas = p
            .createCanvas(
              visualViewport.height * 0.8,
              visualViewport.height * 0.8
            )
            .parent(this.$refs.layoutContainer);
          primaryC = p.color(33);
          p.background(primaryC);
          p.fill(255);
          p.noStroke();
          p.rectMode(p.CENTER);
          p.rect(p.width/2, p.height/2, 50, 50);

          p.textFont(font);
          p.textSize(20);
          p.textLeading(24);
          p.text(
            this.textInput, //Inhalt
            100, //x-Position
            50, //y-Position
            100 //Textbreite
          );
        };

        p.draw = () => {
          ;
        };
      });
    },

    changeText() {
      if (this.canvas) {
        this.canvas.remove();
      }
      this.createCanvas();
    },

    resizeCanvas() {
      if (this.canvas) {
        this.canvas.remove();
      } 
      this.createCanvas();
    },

    handleResize() {
      clearTimeout(this.resizeTimeout);
      this.resizeTimeout = setTimeout(() => {
        this.resizeCanvas();
      }, 500);
    },

    removeCanvas() {
      if (this.p) {
        this.p.remove();
      }
      if (this.canvas) {
        this.canvas.remove();
      }
    },
  },

  
  beforeRouteLeave(to, from, next) {
    this.removeCanvas();
    next();
  },
};
</script>

<style scoped>

</style>
