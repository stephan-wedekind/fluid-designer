<template>
  <div ref="overlayCanvas"></div>
</template>

<script>
import p5 from "p5";
import QrCode from "qrcode";
import jsPDF from "jspdf";

import { mapState, mapActions, mapMutations } from 'vuex';

export default {
  name: 'Overlay',

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
        'focus',
        'headlineLines',
        'subHeadlineLines',
        'copyTextLines',
        'downloadTrigger'
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
    canvasDestroyer() {
      this.removeCanvas();
    },
    focus() {
      this.removeCanvas();
      this.createCanvas();
    },
    downloadTrigger() {
      if (this.isPrint) {
        this.downloadPDF();
      } else {
        this.downloadingImage();
      }
    }
  },

  methods: {
    ...mapMutations(['setHeadline', 'setSubheadline', 'setCopyText', 'setUrlQR', 'setQRCodeImage']),

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
      let copyTextLineCharBeforeBreak = 0;

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

      //Bild Bearbeitung

      let sumLuminos = 0;
      let numPixels = 0;
      let avgLuminos = 0;
      let numDark = 0;
      let perDark = 0;


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
          //Auflösung
          if (visualViewport.height < 1000) {
            p.pixelDensity(10);
          } else {
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
          rwLilaDark = p.color(45, 7, 100);
          rwCyan = p.color(0, 169, 206);
          rwCyanLight = p.color(5, 195, 222);
          p.background(rwLila);

          //Layout Grid Setup
          gridVertical = parseInt(gridHorizontal * ratioH) + 1;

          unit = p.width / 14;

          gridWidth = gridHorizontal * unit;
          gridHeight = gridVertical * unit;

          horizontalMargin = (p.width - gridWidth) / 2;
          verticalMargin = (p.height - gridHeight) / 2;

          //ImageSetting
          let ratioImg = chosenImage.height / chosenImage.width;

          if (ratioImg >= ratioH && chosenImage.height > chosenImage.width) {
            scaleFactor = p.width / chosenImage.width;
            imageWidth = p.width;
            imageHeight = chosenImage.height * scaleFactor;

          } else {
            scaleFactor = p.height / chosenImage.height;
            imageHeight = p.height;
            imageWidth = chosenImage.width * scaleFactor;

          }

          if (ratioImg < ratioW) {
            offsetY = (viewHeight - imageHeight) / 2

            offsetX = (viewWidth / 2) - imageWidth * this.focus;
            console.log("Case 1: ");

          } else {
            offsetX = (viewWidth - imageWidth) / 2;
            offsetY = (viewHeight / 2) - imageHeight * this.focus;
            console.log("Case 1")
          }

          p.image(
            chosenImage,
            offsetX,
            offsetY,
            imageWidth,
            imageHeight
          );

          //Bild Bearbeitung

          p.push();
          p.loadPixels();
          //Bild wird in Graustufen umgewandelt
          for (let i = 0; i < p.pixels.length; i += 4) {
            let r = p.pixels[i];
            let g = p.pixels[i + 1];
            let b = p.pixels[i + 2];
            let c = p.int(0.2126 * r + 0.7152 * g + 0.0722 * b);
            p.pixels[i] = c;
            p.pixels[i + 1] = c;
            p.pixels[i + 2] = c;
            sumLuminos += c;
            numPixels++;
          }
          p.updatePixels();
          avgLuminos = Math.round(sumLuminos / numPixels);
          for (let i = 0; i < p.pixels.length; i += 4) {
            let c = p.pixels[i];

            if (c <= avgLuminos) numDark++;
          }
          perDark = numDark / numPixels;
          p.loadPixels();
          //dunkle Bilder werden aufgehellt
          if (avgLuminos < 80) {
            for (let i = 0; i < p.pixels.length; i += 4) {
              let c = p.pixels[i];

              c = Math.min(c * (1 + 1 * perDark), 255);

              p.pixels[i] = c;
              p.pixels[i + 1] = c;
              p.pixels[i + 2] = c;
            }
          }
          p.updatePixels();
          p.pop();
          //BLEND-1 //102, 56, 182
          p.push();
          p.blendMode(p.MULTIPLY);
          const blendColorMulti = p.color(
            p.red(rwLila),
            p.green(rwLila),
            p.blue(rwLila),
            25
          );
          p.fill(blendColorMulti);
          p.noStroke();
          p.rect(0, 0, p.width, p.height);
          p.pop();
          //Blend-2
          p.push();
          const overlayColor = p.color(
            p.red(rwLila),
            p.green(rwLila),
            p.blue(rwLila),
            0.8 * 255
          );
          p.fill(overlayColor);
          p.noStroke();
          p.rect(0, 0, p.width, p.height);
          p.pop();

          //Typografie//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
          /* (this.isPrint) ? headlineSize = unit : headlineSize = 2*unit; */
          headlineSize = unit;
          subheadlineSize = headlineSize * 0.75;
          copyTextSize = headlineSize * 0.5;
          p.textAlign(p.LEFT, p.TOP);
          p.push();
          let lineCountHead = 0;
          //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
          //Offset für Subheadline nach User Zeilen Umbruch gesetzt
          UserOffsetSub = this.headlineLines.length * (headlineSize * 1.1);
          if (this.headlineLines.length == 0) {
            UserOffsetSub = headlineSize * 1.1;
          }
          offsetSub = 0;
          for (let i = 0; i < this.headlineLines.length - 1; i++) {
            headlineCharBeforeBreak += this.headlineLines[i];
          }
          let lastLineAfterBreak = this.headline.length - headlineCharBeforeBreak - (this.headlineLines.length - 1);
          //Falls kein User Zeilenumbruch stattfindet wird hier nochmal offset gesetzt
          if (lastLineAfterBreak > 29 && lastLineAfterBreak < 55) {
            offsetSub = headlineSize * 1.1;
            lineCountHead = 1;
          } else if (lastLineAfterBreak >= 55) {
            offsetSub = (2 * (headlineSize * 1.1));
            lineCountHead = 2;
          }
          lineCountHead = lineCountHead + this.headlineLines.length; 
          let totalOffsetSub = UserOffsetSub + offsetSub + subheadlineSize * 1.2;
          ////// //Offset Copy Text ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
          let lineCountSub = 0;
          UserOffsetCopy = this.subHeadlineLines.length * (subheadlineSize * 1.2);
          if (this.subHeadlineLines.length == 0) {
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
            lineCountSub = 1;
          } else if (lastLineAfterBreakSub >= 55) {
            offsetCopy = (2 * (subheadlineSize * 1.2));
            lineCountSub = 2;
          }
          lineCountSub = lineCountSub + this.subHeadlineLines.length;
          let totalOffsetCopy = UserOffsetCopy + offsetCopy + subheadlineSize * 1.2;
          let lineCountCopy = 0;
          for (let i = 0; i<this.copyTextLines.length -1; i++){
            copyTextLineCharBeforeBreak += this.copyTextLines[i];
          }
          let lastLineAfterBreakCopy = this.copyText.length - copyTextLineCharBeforeBreak - (this.copyTextLines.length -1);
          let linesAfterBreak = parseInt(lastLineAfterBreakCopy/55);
          lineCountCopy = this.copyTextLines.length + linesAfterBreak; 
          let textHeight = 0;
          if(this.isPrint){
            textHeight = (lineCountHead *( headlineSize * 1.1)) + (lineCountSub * (subheadlineSize * 1.2)) + (lineCountCopy * (copyTextSize * 1.4));
          } else {
            textHeight = (lineCountHead *( headlineSize * 1.1)) + (lineCountSub * (subheadlineSize * 1.2));
          }
          p.translate(unit, ((gridHeight - textHeight)/2));
          //Headline  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
          renderHeadline();
          //Subheadline  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
          p.textFont(fontMedium);
          p.translate(0, totalOffsetSub);
          renderSubheadline();
          //Copy Text  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
          if (this.isPrint) {
          p.translate(0, totalOffsetCopy);
          renderCopyText();
          }
          p.pop();
          //TypoEnde //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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

    downloadingImage() {
      const currentDate = new Date();
      const formattedDate = currentDate.toLocaleString().replace(/[/:]/g, "-");

      let filename = this.headline + "_" + formattedDate + ".png";
      const imageWidth = (this.canvasWidth / 72) * 300;
      const imageHeight = (this.canvasHeight / 72) * 300;

      const resizedCanvas = document.createElement("canvas");
      resizedCanvas.width = imageWidth;
      resizedCanvas.height = imageHeight;

      const resizedContext = resizedCanvas.getContext("2d");

      resizedContext.drawImage(
        this.canvas.canvas,
        0,
        0,
        imageWidth,
        imageHeight
      );

      const image = resizedCanvas.toDataURL("image/png"); // Set the file type to PNG

      const link = document.createElement("a");

      link.href = image;
      link.download = filename; 

      link.click();
    },

    downloadPDF() {
      const options = {
        imageCompression: "JPEG",
        compress: true,
        quality: 1, // Adjust the quality value (0.0 - 1.0) to balance between file size and image quality
      };

      const currentDate = new Date();
      const formattedDate = currentDate.toLocaleString().replace(/[/:]/g, "-");

      let filename = this.headline + "_" + formattedDate;

      if (this.canvasWidth === 210) {
        filename = filename + "_A4.pdf";
        const pdfA4 = new jsPDF("p", "mm", "a4");
        pdfA4.addImage(
          this.canvas.canvas.toDataURL("image/jpeg", options),
          "JPEG",
          0,
          0,
          210,
          297
        );
        pdfA4.save(filename);
      } else {
        filename = filename + "_A5.pdf";
        const pdfA5 = new jsPDF("p", "mm", "a5");
        pdfA5.addImage(
          this.canvas.canvas.toDataURL("image/jpeg", options),
          "JPEG",
          0,
          0,
          148,
          210
        );
        pdfA5.save(filename);
      }
    }


  },//methods
}//export default
</script>

<style scoped></style>
