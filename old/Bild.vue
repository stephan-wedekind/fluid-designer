<template>
  <div>
    <h1>Bild</h1>
    <input
      class="userText"
      type="text"
      v-model="userText"
      placeholder="Überschrift"
    />
    <input
      class="userText"
      type="text"
      v-model="userCopy"
      placeholder="Fließtext"
    />
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
    <h4>Opacity: {{ opac }}</h4>
    <input
      class="userSlider"
      type="range"
      v-model="opac"
      :min="0.6"
      :max="0.8"
      :step="0.01"
    />
  </div>
  <button @click="downloadingImage">Download Image</button>
  <div class="mainCanvas" ref="mainCanvas"></div>
  <div class="hide" ref="hiddenCanvas"></div>
  <Loading />
</template>

<script>
import p5 from "p5";
import Loading from "@/components/loading.vue";
import axios from "axios";

export default {
  name: "Bild",

  components: {
    Loading,
  },

  data() {
    return {
      opac: 0.8,
      maxLength: "15",
      p: null,
      canvas: null,
      canvasWidth: 1080,
      canvasHeight: 1080,
      imageURL: "",
      images: [],
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
    downloadingImage() {
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

      const image = resizedCanvas.toDataURL("image/png");

      const link = document.createElement("a");

      link.href = image;
      link.download = prompt("Geben Sie den Dateinamen ein", "Dateiname.png");
      if (link.download) {
        link.click();
      }
    },
    chooseImage(imageSrc) {
      this.imageSource = imageSrc;
      if (this.p) {
        this.p.remove();
      }
      this.createCanvas();
    },
    createCanvas() {
      let img;
      let scaleFactor;
      let rwLila;
      let rwMargin;
      let sumLuminos = 0;
      let numPixels = 0;
      let avgLuminos = 0;
      let numDark = 0;
      let perDark = 0;
      let copyOffset;
      let headlineSize;
      let copySize;
      let fontBold;
      let fontMedium;
      //let fontMediumItalic
      //this.canvas = this.$refs.canvas;

      this.p = new p5((p) => {
        p.preload = () => {
          img = p.loadImage(this.imageSource);
          fontBold = p.loadFont(
            "fonts/Barlow-Semicondensed/BarlowSemiCondensed-Bold.ttf"
          );
          fontMedium = p.loadFont(
            "fonts/Barlow-Semicondensed/BarlowSemiCondensed-Medium.ttf"
          );
          //fontMediumItalic = p.loadFont('fonts/Barlow-Semicondensed/BarlowSemiCondensed-MediumItalic.ttf');
        };

        p.setup = () => {
          p.pixelDensity(5);
        };

        p.draw = () => {
          let displaySize = visualViewport.height * 0.8;
          this.canvas = p
            .createCanvas(displaySize, displaySize)
            .parent(this.$refs.mainCanvas);
          rwMargin = p.width / 9;
          let unit = p.width / 36;
          headlineSize = unit * 3;
          copySize = unit * 2;
          rwLila = p.color(102, 56, 182);

          if (img.width > img.height) {
            scaleFactor = p.height / img.height;
          } else {
            scaleFactor = p.width / img.width;
          }
          let offsetX = (p.width - img.width * scaleFactor) / 2;
          let offsetY = (p.height - img.height * scaleFactor) / 2;
          p.image(
            img,
            offsetX,
            offsetY,
            img.width * scaleFactor,
            img.height * scaleFactor
          );
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
          //BLEND-1
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
            this.opac * 255
          );
          p.fill(overlayColor);
          p.noStroke();
          p.rect(0, 0, p.width, p.height);
          p.pop();
          //Text
          p.fill(255);
          p.textFont(fontBold);
          p.textAlign(p.LEFT, p.BASELINE);
          p.textSize(headlineSize);
          p.textStyle(p.BOLD);
          p.textLeading(headlineSize);
          p.text(
            this.userText, //Inhalt
            rwMargin, //x Postion
            rwMargin + headlineSize, //y Postion
            p.width - 2 * rwMargin //Textbreite
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
          p.textStyle(p.NORMAL);
          p.text(
            this.userCopy, //Inhalt
            rwMargin, //x-Position
            rwMargin + headlineSize + copyOffset, //y-Position
            p.width - 2 * rwMargin //Textbreite
          );
        };
      });
    },

    removeCanvas() {
      if (this.p) {
        this.p.remove();
      }
      if (this.canvas) {
        this.canvas.remove();
      }
      if (this.t) {
        this.t.remove();
      }
      if (this.kanvas) {
        this.kanvas.remove();
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

.hide {
  display: none;
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
