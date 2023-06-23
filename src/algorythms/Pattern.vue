<template>
  <div ref="classicCanvas"></div>
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
  
  beforeRouteLeave(to, from, next) {
    this.removeCanvas();
    next();
  },

  computed: {
    ...mapState(['headline', 'subheadline', 'copyText', 'urlQR', 'canvasWidth', 'canvasHeight', 'imagePath'])
  },

  watch: {
    canvasWidth(newWidth, oldWidth) {
      if (this.p) {
        this.p.remove();
      }
      if (this.canvas) {
        this.canvas.remove();
      }
      this.createCanvas();
    },
    canvasHeight(newHeight, oldHeight) {
      if (this.p) {
        this.p.remove();
      }
      if (this.canvas) {
        this.canvas.remove();
      }
      this.createCanvas();
    }
  },

  methods: {
    ...mapMutations(['setHeadline', 'setSubheadline', 'setCopyText', 'setUrlQR']),

    createCanvas() {
      let ratioW;
      let ratioH;
      let viewHeight;
      let viewWidth;
      let maxWidth;
      let maxHeight;
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


          this.canvas = p.createCanvas(viewWidth, viewHeight).parent(this.$refs.classicCanvas);
          p.background(102, 56, 182);

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
      }
    },

  },//methods
}//export default
</script>

<style scoped>
</style>
