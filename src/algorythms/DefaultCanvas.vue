<template>
  <div ref="defaultCanvas"></div>
</template>

<script>
import p5 from "p5";
import QrCode from "qrcode";

import { mapState, mapActions, mapMutations } from 'vuex';

export default {
  name: 'Default',

  data() {
    return {
      p: null,
      canvas: null,
    }
  },

  mounted() {
    this.createCanvas();
    window.addEventListener("resize", this.handleResize);
  },

  beforeUnmount() {
    window.removeEventListener("resize", this.handleResize);
  },
  
  /* beforeRouteLeave(to, from, next) {
    console.log('beforeRouteLeave in DefaultCanvas');
    this.removeCanvas();
    next();
  }, */

  computed: {
    ...mapState(['headline', 'subheadline', 'copyText', 'urlQR', 'canvasWidth', 'canvasHeight', 'imagePath', 'canvasDestroyer'])
  },

  watch: {
    canvasWidth() {
      this.removeCanvas();
      this.createCanvas();
    },
    canvasHeight() {
      this.removeCanvas();
      this.createCanvas();
    },
    canvasDestroyer(){
      this.removeCanvas();
    },
  },

  methods: {
    ...mapMutations(['setHeadline', 'setSubheadline', 'setCopyText', 'setUrlQR']),

    createCanvas() {
      //Canvas Größe
      let ratioW;
      let ratioH;
      let viewHeight;
      let viewWidth;
      let maxWidth;
      let maxHeight;

      //Bild
      let chosenImage;
      let imageWidth;
      let imageHeight;
      let scaleFactor;
      let offsetX;
      let offsetY;

      //CD Logo
      let logo;

      //Font
      let fontBold;
      let fontMedium;
      let fontRegular;

      //Font Sizing

      let headlineSize;
      let subheadlineSize;
      let copyTextSize;
      let moreInfoSize;

      //Farben
      let rwLila;
      let rwLilaDark;
      let rwCyan;
      let rwCyanLight;

      //Layout Grid
      let horizontalMargin;
      let verticalMargin;
      let gridHorizontal = 12;
      let gridVertical;
      let gridWidth;
      let gridHeight;

      //Base Unit
      let unit

      //QR Code
      let imageQR;
      this.p = new p5((p) => {

        p.preload = () => {
          chosenImage = p.loadImage("Platzhalter/Tutorial/maple.png")
          fontBold = p.loadFont("fonts/Barlow-Semicondensed/BarlowSemiCondensed-Bold.ttf");
        },

        p.setup = () => {
          //Canvas Size is Calculated
          ratioW = this.canvasWidth/this.canvasHeight;
          ratioH = this.canvasHeight/this.canvasWidth;
          maxHeight = visualViewport.height - 120;
          maxWidth = visualViewport.width - (70 + 0.45*visualViewport.width + 120);
          
          viewHeight = maxHeight;
          viewWidth = maxWidth;

          if (viewWidth > maxWidth ) {
            viewWidth = maxWidth;
            viewHeight = viewWidth * ratioH;
          }


          this.canvas = p.createCanvas(viewWidth, viewHeight).parent(this.$refs.defaultCanvas);
          rwLila = p.color(102, 56, 182);
          rwLilaDark = p.color(45,7,100);
          rwCyan = p.color(0, 169, 206);
          rwCyanLight = p.color(5, 195, 222);
          p.background(rwLilaDark);
          
          imageWidth = p.width - 50;
          scaleFactor = imageWidth / chosenImage.width;
          imageHeight = chosenImage.height * scaleFactor;

          let imagePositionY = p.height/2.5 - imageHeight/2;

          p.image(
            chosenImage,
            25,
            imagePositionY,
            imageWidth,
            imageHeight,
          );
          
          p.push()
          p.fill(255);
          p.textFont(fontBold);
          p.textSize(imageHeight * 0.1);
          p.textAlign(p.CENTER, p.CENTER);
          p.text("Wähle einen Style aus", p.width/2, imagePositionY + imageHeight + 30);
          p.pop();
        }
      })//END P5 js
    },//END createCanvas()

    handleResize() {
      clearTimeout(this.resizeTimeout);
      this.resizeTimeout = setTimeout(() => {
        this.resizeCanvas();
      }, 500);
    },

    resizeCanvas() {
      if (this.canvas) {
        this.canvas.remove();
      } 
      this.createCanvas();
    },

    removeCanvas() {
      if (this.p) {
        this.p.remove();
      }
      if (this.canvas) {
        this.canvas.remove();
        console.log('default destroyed');
      }
    },

  },//methods
}//export default
</script>

<style scoped>
</style>
