<template>
  <div ref="classicCanvas"></div>
</template>

<script>
import p5 from "p5";
import QrCode from "qrcode";

import { mapState, mapActions, mapMutations } from 'vuex';

export default {
  name: 'Classic',

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
    ...mapState(['headline', 'subheadline', 'copyText', 'urlQR', 'canvasWidth', 'canvasHeight', 'imagePath' ,'refreshing'])
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
    },
    imagePath(newImage, oldImage) {
      if (this.p) {
        this.p.remove();
      }
      if (this.canvas) {
        this.canvas.remove();
      }
      this.createCanvas();
    },

    refreshing(newRefresh, oldRefresh) {
      if (this.p) {
        this.p.remove();
      }
      if (this.canvas) {
        this.canvas.remove();
      }
      this.createCanvas();
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

      //Font Sizing

      let headlineSize;
      let subheadlineSize;
      let copyTextSize;
      let moreInfoSize;

      //Farben
      let rwLila

      //Layout Grid
      let horizontalMargin;
      let verticalMargin;
      let gridHorizontal = 12;
      let gridVertical = 18;
      let gridWidth;
      let girdHeight;

      //Base Unit
      let unit


      this.p = new p5((p) => {
        
        p.preload = () => {
          chosenImage = p.loadImage(this.imagePath);
          logo = p.loadImage("Logo/rwu_logo_hor-weiss-cyan-light.png");
          fontBold = p.loadFont("fonts/Barlow-Semicondensed/BarlowSemiCondensed-Bold.ttf");
          fontMedium = p.loadFont("fonts/Barlow-Semicondensed/BarlowSemiCondensed-Medium.ttf");
        }

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
          //Canvas Creation
          this.canvas = p.createCanvas(viewWidth, viewHeight).parent(this.$refs.classicCanvas);

          //Color Setting
          rwLila = p.color(102,56,182);
          p.background(rwLila);

          //Layout Grid Setup
          unit = p.width /14;

          gridWidth = gridHorizontal * unit;
          girdHeight = gridVertical * unit;

          horizontalMargin = (p.width - gridWidth) / 2;
          verticalMargin = (p.height - girdHeight) / 2;


   
          //ImageSetting
          imageWidth = p.width;
          imageHeight = 9 * unit;

          scaleFactor = imageWidth / chosenImage.width;
          if (chosenImage.height * scaleFactor < imageHeight) {
            scaleFactor = imageHeight / chosenImage.height;
          }

          offsetX = (imageWidth - chosenImage.width * scaleFactor) / 2;
          offsetY = (imageHeight - chosenImage.height * scaleFactor) / 2;

          p.image(
            chosenImage,
            offsetX,
            offsetY,
            chosenImage.width * scaleFactor,
            chosenImage.height * scaleFactor
          );

        //Fläche Für Content

        p.fill(rwLila);
        p.noStroke();
        p.push();
        p.translate(0, imageHeight);
        p.rect(0,0, p.width, p.height - imageHeight);
        p.pop();

        //Text Styling

        headlineSize = unit;
        subheadlineSize = unit*0,75;
        copyTextSize = unit * 0.5;
        p.push();
        p.translate(horizontalMargin, imageHeight + verticalMargin);
        p.textFont(fontBold);
        p.fill(255);
        p.textSize(headlineSize);
        p.textAlign(p.LEFT, p.TOP);
        p.textLeading(headlineSize * 1.1);
        p.text(
          this.headline,
          0,
          0,
          gridWidth);
          p.push();
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
