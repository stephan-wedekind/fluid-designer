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
      typingTimer: null,
      doneTypingInterval: 1000 
    }
  },

  mounted() {
    this.createCanvas();
    window.addEventListener("resize", this.handleResize);
  },

  beforeUnmount() {
    window.removeEventListener("resize", this.handleResize);
  },

  computed: {
    ...mapState(
      [
        'headline', 
        'subheadline', 
        'copyText', 
        'urlQR', 
        'canvasWidth', 
        'canvasHeight', 
        'imagePath', 
        'refreshing', 
        'refreshQR', 
        'qrCodeImage', 
        'isPrint', 
        'headlineLines', 
        'subHeadlineLines',  
        'focus'
      ]),
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

    headline(newValue) {
      clearTimeout(this.typingTimer);

      if (newValue) {
        this.typingTimer = setTimeout(() => {
          this.removeCanvas();
          this.createCanvas();
        }, this.doneTypingInterval);
      }
    },

    subheadline(newValue) {
      clearTimeout(this.typingTimer);

      if (newValue) {
        this.typingTimer = setTimeout(() => {
          this.removeCanvas();
          this.createCanvas();
        }, this.doneTypingInterval);
      }
    },

    copyText(newValue) {
      clearTimeout(this.typingTimer);

      if (newValue) {
        this.typingTimer = setTimeout(() => {
          this.removeCanvas();
          this.createCanvas();
        }, this.doneTypingInterval);
      }
    },

    refreshing() {
      this.removeCanvas();
      this.createCanvas();
    },
    refreshQR() {
      this.generateQRCode();
    },
    focus() {
      this.removeCanvas();
      this.createCanvas();
    }
  },

  methods: {
    ...mapMutations(['setHeadline', 'setSubheadline', 'setCopyText', 'setUrlQR', 'setQRCodeImage']),

    download() {
      console.log("Download was triggerd from textinput in classic.vue");
    },

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
      //Headline länge

      let headlineCharBeforeBreak = 0;
      let subHeadlineCharBeforeBreak = 0;

      let offsetSub;
      let UserOffsetSub;
      let offsetCopy;
      let UserOffsetCopy;

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
          chosenImage = p.loadImage(this.imagePath);
          logo = p.loadImage("Logo/rwu_logo_hor-weiss-cyan-light.png");
          fontBold = p.loadFont("fonts/Barlow-Semicondensed/BarlowSemiCondensed-Bold.ttf");
          fontMedium = p.loadFont("fonts/Barlow-Semicondensed/BarlowSemiCondensed-Medium.ttf");
          fontRegular = p.loadFont("fonts/Barlow-Semicondensed/BarlowSemiCondensed-Regular.ttf");
          if (this.urlQR != "") {
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
          rwLilaDark = p.color(45, 7, 100);
          rwCyan = p.color(0, 169, 206);
          rwCyanLight = p.color(5, 195, 222);
          //Set background
          p.background(rwLila);

          //Layout Grid Setup
          gridVertical = parseInt(gridHorizontal * ratioH) + 1;

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


          let frameRatio = imageWidth/imageHeight
          let ratioImg = chosenImage.width/chosenImage.height;
          
          if (ratioImg > frameRatio) {
            offsetY = 0;
            offsetX = (imageWidth/2) - (chosenImage.width * scaleFactor) * this.focus;
          } else {
            offsetX = 0
            offsetY = (imageHeight/2) - (chosenImage.height * scaleFactor) * this.focus;
          }

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

          p.textAlign(p.LEFT, p.TOP);
          p.push();
          p.translate(horizontalMargin, imageHeight + horizontalMargin);
          //Headline
          renderHeadline();

          //Subheadline OFFSET
          p.textFont(fontMedium);

          //Offset für Subheadline nach User Zeilen Umbruch gesetzt
          UserOffsetSub = this.headlineLines.length * (headlineSize * 1.1);
          if(this.headlineLines.length == 0) {
            UserOffsetSub = headlineSize *1.1;
          }
          offsetSub = 0;
          for (let i = 0; i < this.headlineLines.length - 1; i++) {
            headlineCharBeforeBreak += this.headlineLines[i];
          }
          
          let lastLineAfterBreak = this.headline.length - headlineCharBeforeBreak - (this.headlineLines.length - 1);
          
                //Falls kein User Zeilenumbruch stattfindet wird hier nochmal offset gesetzt
          if (lastLineAfterBreak > 29 && lastLineAfterBreak < 55) {
            offsetSub = headlineSize * 1.1;
          } else if (lastLineAfterBreak >= 55) {
            offsetSub = (2 * (headlineSize * 1.1));
          }

          let totalOffsetSub = UserOffsetSub + offsetSub + subheadlineSize * 1.2;
          
          //Subheadline
          p.translate(0, totalOffsetSub);

          renderSubheadline();
          //Offset Copy Text
          UserOffsetCopy = this.subHeadlineLines.length * (subheadlineSize * 1.2);
          if(this.subHeadlineLines.length == 0) {
            UserOffsetCopy = subheadlineSize * 1.2;
          }
          offsetCopy = 0;
          for (let i = 0; i < this.headlineLines.length - 1; i++) {
            subHeadlineCharBeforeBreak += this.subHeadlineLines[i];
          }

          let lastLineAfterBreakSub = this.subheadline.length - subHeadlineCharBeforeBreak - (this.subHeadlineLines.length - 1);
         
                //Falls kein User Zeilenumbruch stattfindet wird hier nochmal offset gesetzt
          if (lastLineAfterBreakSub > 40 && lastLineAfterBreakSub < 55) {
           
            offsetCopy = subheadlineSize * 1.2;
          } else if (lastLineAfterBreakSub >= 55) {
            offsetCopy = (2 * (subheadlineSize * 1.2));
           
          }

          let totalOffsetCopy = UserOffsetCopy + offsetCopy + subheadlineSize * 1.2;
          //Copy Text
          p.translate(0, totalOffsetCopy);
          renderCopyText();

          p.pop();

          //Logo und QR Code nur in Print Produkten A4 A5, nicht in digital Formaten
          if (this.isPrint) {
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

          }

        };//setup()

        const renderHeadline = () => {
          p.textFont(fontBold);
          p.fill(255);
          p.textSize(headlineSize);
          p.textLeading(headlineSize * 1.1);
          p.text(
            this.headline,
            0,
            0,
            gridWidth
          );
        };

        const renderSubheadline = () => {
          p.textSize(subheadlineSize);
          p.textLeading(subheadlineSize * 1.2);
          p.text(
            this.subheadline,
            0,
            0,
            gridWidth
          );
        };

        const renderCopyText = () => {
          p.textSize(copyTextSize);
          p.textLeading(copyTextSize * 1.4);
          p.text(
            this.copyText,
            0,
            0,
            gridWidth,
          )
        };

      },)//END P5 js
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
