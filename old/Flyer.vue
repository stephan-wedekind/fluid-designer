<template>
  <div>
    <h1>Layout Generator</h1>
    <textarea
      class="userText"
      type="text"
      v-model="userText"
      placeholder="Überschrift"
    />
    <textarea
      class="userText"
      type="text"
      v-model="userCopy"
      placeholder="Fließtext"
    />
    <h4>Format:</h4>
    <button @click="changeFormat(8.25, 11.67)">DIN A4</button>
    <button @click="changeFormat(5.8, 8.3)">DIN A5</button>
    <p v-if="dinHeightInch == 8.3">DIN A5</p>
    <p v-if="dinHeightInch == 11.67">DIN A4</p>
    <div class="image-grid">
      <div class="available-image" v-for="image in images" :key="image.id">
        <img
          :src="image.url"
          alt="Bild aus Datenbank"
          class="pict"
          @click="chooseImage(image.url)"
        />
      </div>
    </div>
    <input
      class="userText"
      type="text"
      v-model="userURL"
      placeholder="Insert URL for QR Code"
    />
    <button @click="generateQRCode">Generate QR Code</button>
    <button @click="downloadingImage">Download Image</button>
    <button @click="downloadPDF">Download PDF</button>
  </div>
  <div class="mainCanvas" id="pdfCanvas" ref="mainCanvas"></div>
</template>

<script>
import p5 from "p5";
import QrCode from "qrcode";
import axios from "axios";
import jsPDF from "jspdf";

export default {
  name: "Bild",

  data() {
    return {
      p: null,
      canvas: null,
      opac: 0.8,
      maxLength: "15",
      dinWidthInch: 8.25,
      dinHeightInch: 11.67,
      images: [],
      //userURL: "",
      //qrCodeImage: "qrCode.png",
    };
  },

  computed: {
    userText: {
      get() {
        return this.$store.state.userText;
      },
      set(value) {
        this.$store.commit("setUserText", value);
      },
    },
    userCopy: {
      get() {
        return this.$store.state.userCopy;
      },
      set(value) {
        this.$store.commit("setUserCopy", value);
      },
    },
    imageSource: {
      get() {
        return this.$store.state.imageSource;
      },
      set(value) {
        this.$store.commit("setImageSource", value);
      },
    },
    qrCodeImage: {
      get() {
        return this.$store.state.qrCodeImage;
      },
      set(value) {
        this.$store.commit("setQrCodeImage", value);
      },
    },
  },

  mounted() {
    axios
      .get("http://localhost:3030/allImages")
      .then((response) => {
        this.images = response.data;
      })
      .catch((error) => {
        console.log(error);
      });

    this.createCanvas();
  },

  methods: {
    changeFormat(w, h) {
      this.dinWidthInch = w;
      this.dinHeightInch = h;
    },
    chooseImage(imageSrc) {
      this.imageSource = imageSrc;
      if (this.p) {
        this.p.remove();
      }
      this.createCanvas();
    },

    generateQRCode() {
      const qrData = this.userURL;

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
          this.qrCodeImage = url;
        }
      });
      if (this.p) {
        this.p.remove();
      }
      this.createCanvas();
    },

    downloadingImage() {
      const imageWidth = this.dinWidthInch * 300;
      const imageHeight = this.dinHeightInch * 300;

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

      const image = resizedCanvas.toDataURL("image/png");

      const link = document.createElement("a");

      link.href = image;
      link.download = prompt("Geben Sie den Dateinamen ein", "Dateiname.png");
      if (link.download) {
        link.click();
      }
    },

    downloadPDF() {
      if (this.dinWidthInch === 8.25) {
        const pdfA4 = new jsPDF("p", "mm", "a4");
        pdfA4.addImage(
          this.canvas.canvas.toDataURL("image/png"),
          "PNG",
          0,
          0,
          210,
          297
        );
        pdfA4.save("canvasA4.pdf");
      } else {
        const pdfA5 = new jsPDF("p", "mm", "a5");
        pdfA5.addImage(
          this.canvas.canvas.toDataURL("image/png"),
          "PNG",
          0,
          0,
          148,
          210
        );
        pdfA5.save("canvasA5.pdf");
      }
    },

    createCanvas() {
      let chosenImage;
      let scaleFactor;
      let rwLila;
      //let rwLilaDark;
      let horizontalMargin;
      let verticalMargin;
      let copyOffset;
      let headlineSize;
      let copySize;
      let fontBold;
      let fontMedium;
      let fontRegular;
      let imageWidth;
      let imageHeight;
      let logo;
      let imageQR;
      let dinRatio;
      //this.canvas = this.$refs.canvas;
      this.p = new p5((p) => {
        p.preload = () => {
          chosenImage = p.loadImage(this.imageSource);
          logo = p.loadImage("rwu_logo_hor-weiss-cyan-light.png");
          if (this.qrCodeImage != "") {
            imageQR = p.loadImage(this.qrCodeImage);
          }
          fontBold = p.loadFont(
            "fonts/Barlow-Semicondensed/BarlowSemiCondensed-Bold.ttf"
          );
          fontMedium = p.loadFont(
            "fonts/Barlow-Semicondensed/BarlowSemiCondensed-Medium.ttf"
          );
          fontRegular = p.loadFont(
            "fonts/Barlow-Semicondensed/BarlowSemiCondensed-Regular.ttf"
          );
        };

        p.setup = () => {
          p.pixelDensity(5);
        };

        p.draw = () => {
          let displaySize = visualViewport.height * 0.8;
          dinRatio = this.dinWidthInch / this.dinHeightInch;
          this.canvas = p
            .createCanvas(displaySize * dinRatio, displaySize)
            .parent(this.$refs.mainCanvas);
          let unit = p.width / 14;

          let gridHorizontal = 12;
          let gridVertical = 18;
          let gridWidth = gridHorizontal * unit;
          let gridHeight = gridVertical * unit;
          horizontalMargin = (p.width - gridWidth) / 2;
          verticalMargin = (p.height - gridHeight) / 2;

          rwLila = p.color(102, 56, 182);
          //rwLilaDark = p.color(45, 7, 100);

          //----
          //----
          //BILD
          //----
          //Bildgröße wird festgelegt
          imageWidth = p.width;
          imageHeight = 9 * unit;

          //Orientierung des Bildes wird geprüft und Skalierung berechnet
          scaleFactor = imageWidth / chosenImage.width;
          if (chosenImage.height * scaleFactor < imageHeight) {
            scaleFactor = imageHeight / chosenImage.height;
          }

          //Offset damit Bild mittig im Festgelegten Bereich liegt
          let offsetX = (imageWidth - chosenImage.width * scaleFactor) / 2;
          let offsetY = (imageHeight - chosenImage.height * scaleFactor) / 2;
          p.image(
            chosenImage,
            offsetX,
            offsetY,
            chosenImage.width * scaleFactor,
            chosenImage.height * scaleFactor
          );

          //----
          //----
          //FLÄCHE
          //----
          p.fill(rwLila);
          p.noStroke();
          p.push();
          p.translate(0, imageHeight);
          p.rect(0, 0, p.width, p.height - imageHeight);
          p.pop();

          //----
          //----
          //TEXT
          //---
          headlineSize = unit;
          copySize = unit / 2;

          p.textFont(fontBold);
          p.fill(255);
          p.textSize(headlineSize);
          p.textAlign(p.LEFT, p.TOP);
          p.textLeading(headlineSize);
          p.text(
            this.userText, //Inhalt
            horizontalMargin, //x Postion
            imageHeight + verticalMargin, //y Postion
            p.width - 2 * horizontalMargin //Textbreite
          );
          if (this.userText.length < 27) {
            copyOffset = headlineSize + unit;
          } else if (this.userText.length >= 27 && this.userText.length < 54) {
            copyOffset = 2 * headlineSize + unit;
          } else if (this.userText.length >= 54) {
            copyOffset = 3 * headlineSize + unit;
          }
          p.textFont(fontMedium);
          p.textSize(copySize);
          p.textLeading(copySize * 1.4);
          p.text(
            this.userCopy, //Inhalt
            horizontalMargin, //x-Position
            imageHeight + verticalMargin + copySize + copyOffset, //y-Position
            p.width - 2 * horizontalMargin //Textbreite
          );

          //-----
          //-----
          //LOGO
          //-----
          p.push();
          scaleFactor = unit / logo.height;
          let logoHeight = logo.height * scaleFactor;
          let logoWidth = logo.width * scaleFactor;
          p.translate(horizontalMargin, verticalMargin + gridHeight - unit);
          p.image(logo, 0, 0, logoWidth, logoHeight);
          if (this.qrCodeImage != "") {
            p.textFont(fontRegular);
            p.textAlign(p.RIGHT, p.BASELINE);
            p.textSize(copySize / 2);
            p.text(
              "Mehr Infos finden Sie hier",
              gridWidth - logoHeight - unit / 3,
              logoHeight - logoHeight * 0.192
            );
            p.translate(gridWidth - logoHeight, unit - logoHeight);
            p.image(imageQR, 0, 0, logoHeight, logoHeight);
          }

          p.pop();
          //-----
          //-----
          //OVERLAY GRID AREA
          //-----
          /* p.push();
          p.fill(255,0,255, 150);
          p.translate(horizontalMargin,verticalMargin);
          p.rect(0,0,gridWidth,gridHeight);
          p.pop();

          p.fill(0,255,255,150);
          p.translate(horizontalMargin, imageHeight+verticalMargin);
          p.rect(0,0, gridWidth, p.height - imageHeight - 2*verticalMargin); */
          //----
        }; //draw END
      }); //this.p = new p5((p) => { END
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
.pict:hover {
  cursor: pointer;
}

.image-grid {
  width: 40vw;
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* Vier Spalten */
  gap: 5px; /* Abstand zwischen den Bildern */
}

.available-image img {
  width: 100%;
  aspect-ratio: 1/1;
  object-fit: contain;
}
</style>
