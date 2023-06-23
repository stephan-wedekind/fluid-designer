<template>
  <div ref="patternCanvas"></div>
</template>

<script>
import p5 from "p5";
import QrCode from "qrcode";

import { mapState, mapActions, mapMutations } from 'vuex';

export default {
  name: 'Pattern',

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

    console.log('beforeRouteLeave in Pattern');
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
        
        p.setup = () => {
          //Canvas Size is Calculated
          ratioW = this.canvasWidth/this.canvasHeight;
          ratioH = this.canvasHeight/this.canvasWidth;
          maxHeight = visualViewport.height - 120;
          maxWidth = visualViewport.width - ((visualViewport.width * 0.45) + 190);
          
          viewHeight = maxHeight;
          viewWidth = viewHeight * ratioW;

          if (viewWidth > maxWidth ) {
            viewWidth = maxWidth;
            viewHeight = viewWidth * ratioH;
          }


          this.canvas = p.createCanvas(viewWidth, viewHeight).parent(this.$refs.patternCanvas);

          //Color Setting
          rwLila = p.color(102, 56, 182);
          rwLilaDark = p.color(45,7,100);
          rwCyan = p.color(0, 169, 206);
          rwCyanLight = p.color(5, 195, 222);

          //Background Setting
          p.background(255, 0, 255);

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
        console.log('pattern destroyed');
      }
    },

  },//methods
}//export default
</script>

<style scoped>
</style>
