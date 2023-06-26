<template>
  <div ref="overlayCanvas"></div>
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
      typingTimer: null,
      doneTypingInterval: 1500 
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
        'patternFilled',
        'isCircle',
        'isRectangle',
        'isTriangle',
        'headlineLines', 
        'subHeadlineLines', 
        'patternSeed',
      ])
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
    },
    canvasDestroyer(){
      this.removeCanvas();
    },
    focus() {
      this.removeCanvas();
      this.createCanvas();
    },
    patternFilled(){
      this.removeCanvas();
      this.createCanvas();
    },
    isRectangle(){
      this.removeCanvas();
      this.createCanvas();
    },
    isTriangle(){
      this.removeCanvas();
      this.createCanvas();
    },
    isCircle(){
      this.removeCanvas();
      this.createCanvas();
    },
    patternSeed(){
      this.removeCanvas();
      this.createCanvas();
    },
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
      
      let unitsHorizontal = 12;
      let unitsVertical;
      let gridWidth;
      let gridHeight;

      //Base Unit & Shape größe
      let unit

      //QR Code
      let imageQR;

     



      this.p = new p5((p) => {

        p.preload = () => {
          
          logo = p.loadImage("Logo/rwu_logo_hor-weiss-cyan-light.png");
          fontBold = p.loadFont("fonts/Barlow-Semicondensed/BarlowSemiCondensed-Bold.ttf");
          fontMedium = p.loadFont("fonts/Barlow-Semicondensed/BarlowSemiCondensed-Medium.ttf");
          fontRegular = p.loadFont("fonts/Barlow-Semicondensed/BarlowSemiCondensed-Regular.ttf");
          if (this.urlQR != ""){
            imageQR = p.loadImage(this.qrCodeImage);
          }
        }

        p.setup = () => {
          //Auflösung
          if (visualViewport.height < 1000){
            p.pixelDensity(10);
          }else {
            p.pixelDensity(4);
          }
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
          this.canvas = p.createCanvas(viewWidth, viewHeight).parent(this.$refs.overlayCanvas);

          //Color Setting
          rwLila = p.color(102, 56, 182);
          rwLilaDark = p.color(45,7,100);
          rwCyan = p.color(0, 169, 206);
          rwCyanLight = p.color(5, 195, 222);
          p.background(rwLila);

          //Layout Grid Setup
          unitsVertical = parseInt(unitsHorizontal*ratioH);

          unit = p.width / 14;

          gridWidth = unitsHorizontal * unit;
          gridHeight = unitsVertical * unit;

          p.push();
          p.translate(unit, unit);
          
          // Pattern Code here
          p.randomSeed(this.patternSeed);
          for (let y = 0; y < unitsVertical; y++) {
            for (let x = 0; x < unitsHorizontal; x++) {
              p.push();
              if (this.patternFilled) {
                p.fill(rwLilaDark);
                p.noStroke();
              } else {
                p.noFill();
                p.stroke(rwLilaDark);
                p.strokeWeight(unit / 10);
              }
              p.translate(x * unit, y * unit);
              p.strokeJoin(p.ROUND);

              let orientation = p.int(p.random(0, 4));
              let shapeType = 0;
              if (this.isCircle && !this.isRectangle && !this.isTriangle) {
                createQuarterCircle(unit, orientation);
              } else if (!this.isCircle && this.isRectangle && !this.isTriangle) {
                p.rect(0, 0, unit, unit);
              } else if (!this.isCircle && !this.isRectangle && this.isTriangle) {
                createTriangle(unit, orientation);
              } else if (this.isCircle && this.isRectangle && !this.isTriangle) {
                shapeType = p.int(p.random(0, 2));
                if (shapeType === 0)
                  createQuarterCircle(unit, orientation);
                else p.rect(0, 0, unit, unit);
              } else if (this.isCircle && !this.isRectangle && this.isTriangle) {
                shapeType = p.int(p.random(0, 2));
                if (shapeType === 0)
                  createQuarterCircle(unit, orientation);
                else createTriangle(unit, orientation);
              } else if (!this.isCircle && this.isRectangle && this.isTriangle) {
                shapeType = p.int(p.random(0, 2));
                if (shapeType === 0) createTriangle(unit, orientation);
                else p.rect(0, 0, unit, unit);
              } else if (this.isCircle && this.isRectangle && this.isTriangle) {
                shapeType = p.int(p.random(0, 3));
                if (shapeType === 0)
                  createQuarterCircle(unit, orientation);
                else if (shapeType === 1)
                  createTriangle(unit, orientation);
                else p.rect(0, 0, unit, unit);
              }

              p.pop();
            }
          }

          p.pop();


          //Typografie

          headlineSize = unit;
          subheadlineSize = unit * 0.75;
          copyTextSize = unit * 0.5;

          p.textAlign(p.LEFT, p.TOP);
          p.push();
          p.translate(unit, 2*unit);
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
          p.translate(unit, p.height - unit - logoHeight);
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

        function createQuarterCircle(size, orientation) {
          switch (orientation) {
            case 0:
              p.arc(0, size, size * 2, size * 2, p.PI + p.HALF_PI, 0, p.PIE); //1
              break;
            case 1:
              p.arc(0, 0, size * 2, size * 2, 0, p.HALF_PI, p.PIE); //2
              break;
            case 2:
              p.arc(size, 0, size * 2, size * 2, p.HALF_PI, p.PI, p.PIE); //3
              break;
            case 3:
              // eslint-disable-next-line prettier/prettier
              p.arc(size, size, size * 2, size * 2, p.PI, p.PI + p.HALF_PI, p.PIE); //4
              break;
          }
        }

        function createTriangle(size, orientation) {
          switch (orientation) {
            case 0:
              p.triangle(0, 0, 0, size, size, size); //1
              break;
            case 1:
              p.triangle(size, 0, 0, size, 0, 0); //2
              break;
            case 2:
              p.triangle(0, 0, size, 0, size, size); //3
              break;
            case 3:
              p.triangle(0, size, size, 0, size, size); //4
              break;
          }
        }

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
