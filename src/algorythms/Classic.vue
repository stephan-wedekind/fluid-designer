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

    console.log('beforeRouteLeave in Classic');
    this.removeCanvas();
    next();
  },

  computed: {
    ...mapState(['headline', 'subheadline', 'copyText', 'urlQR', 'canvasWidth', 'canvasHeight', 'imagePath', 'refreshing', 'refreshQR', 'qrCodeImage'])
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
    imagePath() {
      this.removeCanvas();
      this.createCanvas();
    },

    refreshing() {
      this.removeCanvas();
      this.createCanvas();
    },
    refreshQR() {
      this.generateQRCode();
    }
  },

  methods: {
    ...mapMutations(['setHeadline', 'setSubheadline', 'setCopyText', 'setUrlQR' , 'setQRCodeImage']),

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
      let rwLila

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
          chosenImage = p.loadImage(this.imagePath);
          logo = p.loadImage("Logo/rwu_logo_hor-weiss-cyan-light.png");
          fontBold = p.loadFont("fonts/Barlow-Semicondensed/BarlowSemiCondensed-Bold.ttf");
          fontMedium = p.loadFont("fonts/Barlow-Semicondensed/BarlowSemiCondensed-Medium.ttf");
          fontRegular = p.loadFont("fonts/Barlow-Semicondensed/BarlowSemiCondensed-Regular.ttf");
          if (this.urlQR != ""){
            imageQR = p.loadImage(this.qrCodeImage);
          }
        }

        p.setup = () => {
          p.pixelDensity(10);
          //Canvas Size is Calculated
          ratioW = this.canvasWidth / this.canvasHeight;
          ratioH = this.canvasHeight / this.canvasWidth;
          maxHeight = visualViewport.height - 120;
          maxWidth = visualViewport.width - ((visualViewport.width * 0.45) + 190);

          viewHeight = maxHeight;
          viewWidth = viewHeight * ratioW;

          if (viewWidth > maxWidth) {
            viewWidth = maxWidth;
            viewHeight = viewWidth * ratioH;
          }
          //Canvas Creation
          this.canvas = p.createCanvas(viewWidth, viewHeight).parent(this.$refs.classicCanvas);

          //Color Setting
          rwLila = p.color(102, 56, 182);
          p.background(rwLila);

          //Layout Grid Setup
          gridVertical = parseInt(gridHorizontal*ratioH) + 1;

          unit = p.width / 14;

          gridWidth = gridHorizontal * unit;
          gridHeight = gridVertical * unit;

          horizontalMargin = (p.width - gridWidth) / 2;
          verticalMargin = (p.height - gridHeight) / 2;

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
          p.rect(0, 0, p.width, p.height - imageHeight);
          p.pop();

          //Typografie

          headlineSize = unit;
          subheadlineSize = unit * 0.75;
          copyTextSize = unit * 0.5;
          p.push();
          p.translate(horizontalMargin, imageHeight + horizontalMargin);
          //Headline
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

          //Subheadline  ----OFFSET MUSS NOCH GENAUER GESETZT WERDEN
          p.textFont(fontMedium);
          let offsetSub = headlineSize + subheadlineSize;;
          if (this.headline.length >= 25 && this.headline.length < 50) {
            offsetSub = 2 * headlineSize + subheadlineSize;
          } else if (this.headline.length >= 50 && this.headline.length < 70) {
            offsetSub = 3 * headlineSize + subheadlineSize;
          } else if (this.headline.length >= 70) {
            offsetSub = 4 * headlineSize + subheadlineSize;
          }
          p.textSize(subheadlineSize);
          p.textLeading(subheadlineSize * 1.4);
          p.text(
            this.subheadline,
            0,
            offsetSub,
            gridWidth
          );
          //Copy Text
          let offsetCopy = offsetSub + 2*subheadlineSize + copyTextSize;
          p.textSize(copyTextSize);
          p.textLeading(copyTextSize * 1.4);
          p.text(
            this.copyText,
            0,
            offsetCopy,
            gridWidth,
          )

          p.pop();

          //Logo placement
          p.push();
          scaleFactor = unit / logo.height;
          let logoHeight = logo.height * scaleFactor;
          let logoWidth = logo.width * scaleFactor;
          p.translate(horizontalMargin, verticalMargin + gridHeight - unit);
          p.image(logo, 0, 0, logoWidth, logoHeight);

          //QR Code
          if (this.urlQR != "") {
            //Top-Level Domain - extract

            let startIndex = this.urlQR.indexOf("//") + 2;
            let endIndex = this.urlQR.indexOf("/", startIndex);
            let urlShort = this.urlQR.substring(startIndex, endIndex);

            p.fill(255);
            p.textFont(fontRegular);
            p.textAlign(p.RIGHT, p.BASELINE);
            p.textSize(copyTextSize / 2);
            p.text(
              "Mehr Infos unter: " + urlShort,
              gridWidth - logoHeight - unit / 3,
              logoHeight - logoHeight * 0.192
            );
            p.translate(gridWidth - logoHeight, unit - logoHeight);
            p.image(imageQR, 0, 0, logoHeight, logoHeight);
          }
          p.pop();

        };//setup()



      })//END P5 js
    },//END createCanvas()

    generateQRCode() {
      const qrData = this.urlQR;

      const options = {
        color: {
          dark: "#ffffff",
          light: "#00000000",
        },
        margin: 0,
        scale: 20,
        errorCorrectionLevel: "H",
      };

      QrCode.toDataURL(qrData, options, (error, url) => {
        if (error) {
          console.error(error);
        } else {
          this.setQRCodeImage(url);
        }
      });
      if (this.p) {
        this.p.remove();
      }
      this.createCanvas();
    },

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

<style scoped></style>
