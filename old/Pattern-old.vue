<template>
  <div>
    <h1>Layout Generator</h1>
    <input class="userText" type="text" v-model="userText" placeholder="Überschrift"/>
    <p style="margin-top: -20px">
      Headline Länge: {{ userText.length }} / {{ maxHeadline }}
    </p>
    <textarea class="userText" type="text" v-model="userCopy" placeholder="Fließtext" />
    <p style="margin-top: -20px">
      Copy Länge: {{ userCopy.length }} / {{ maxCopy }}
    </p>
    <h4>Grid: {{ quadAmount }} x {{ quadAmount }}</h4>
    <input
      class="userSlider"
      id="grid"
      type="range"
      v-model="quadAmount"
      :min="1"
      :max="9"
      :step="1.0"
    />
    <h4>Change Pattern:</h4>
    <input
      class="userSlider"
      id="pattern"
      type="range"
      v-model="seed"
      :min="1"
      :max="20"
      :step="1.0"
    />
    <br />
    <label>Viertel-Kreise:</label>
    <input class="choice" type="checkbox" name="circle" v-model="circle" />
    <br />
    <label>Quadrate:</label>
    <input
      class="choice"
      type="checkbox"
      name="rectangle"
      v-model="rectangle"
    />
    <br />
    <label>Dreiecke:</label>
    <input class="choice" type="checkbox" name="triangle" v-model="triangle" />
    <br />
    <label>Flächen gefüllt:</label>
    <input class="choice" type="checkbox" name="fill" v-model="fill" />
    <br />
    <button @click="downloadingImage">Download Image</button>
  </div>
  <div class="mainCanvas" ref="mainCanvas"></div>
</template>

<script>
import p5 from "p5";
export default {
  name: "Pattern",

  data() {
    return {
      p: null,
      canvas: null,
      quadSize: null,
      maxHeadline: 50,
      maxCopy: 245,
      canvasWidth: 1080,
      canvasHeight: 1080,
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
    quadAmount: {
      get() {
        return this.$store.state.quadAmount;
      },
      set(value) {
        this.$store.commit("setQuadAmount", value);
      },
    },
    seed: {
      get() {
        return this.$store.state.seed;
      },
      set(value) {
        this.$store.commit("setSeed", value);
      },
    },
    circle: {
      get() {
        return this.$store.state.circle;
      },
      set(value) {
        this.$store.commit("setCircle", value);
      },
    },
    rectangle: {
      get() {
        return this.$store.state.rectangle;
      },
      set(value) {
        this.$store.commit("setRectangle", value);
      },
    },
    triangle: {
      get() {
        return this.$store.state.triangle;
      },
      set(value) {
        this.$store.commit("setTriangle", value);
      },
    },
    fill: {
      get() {
        return this.$store.state.fill;
      },
      set(value) {
        this.$store.commit("setFill", value);
      },
    },
  },

  watch: {
    userText(newValue) {
      if (newValue.length > this.maxHeadline) {
        //Test um die maximal Länge der Headline an eine Variable zu koppeln
        this.userText = newValue.slice(0, this.maxHeadline);
      }
    },
    userCopy(newValue) {
      if (newValue.length > this.maxCopy) {
        this.userCopy = newValue.slice(0, this.maxCopy);
      }
    },
  },

  mounted() {
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

    createCanvas() {
      let rwMargin;
      let copyOffset;
      let unit;
      let headlineSize;
      let copySize;
      let textField;
      //this.canvas = this.$refs.canvas;
      this.p = new p5((p) => {
        let rwLila; // RWU Lila
        let rwLilaDark; // RWU Lila-Dark
        let fontBold;
        let fontMedium;

        p.preload = () => {
          fontBold = p.loadFont(
            "fonts/Barlow-Semicondensed/BarlowSemiCondensed-Bold.ttf"
          );
          fontMedium = p.loadFont(
            "fonts/Barlow-Semicondensed/BarlowSemiCondensed-Medium.ttf"
          );
        };
        p.setup = () => {
          rwLila = p.color(102, 56, 182);
          rwLilaDark = p.color(45, 7, 100);
          p.pixelDensity(10);
          this.seed = this.seed * p.random(1, 50);
        };

        p.draw = () => {
          let displaySize = visualViewport.height * 0.8;
          this.canvas = p.createCanvas(displaySize, displaySize).parent(this.$refs.mainCanvas);
          rwMargin = p.width / 9;
          unit = p.width / 36;
          headlineSize = unit * 3;
          copySize = unit * 2;
          textField = p.width - 2 * rwMargin;
          this.quadSize = p.width / this.quadAmount;
          //this.quadSize = (p.width - 2 * rwMargin) / this.quadAmount;
          p.background(rwLila);
          p.randomSeed(this.seed);
          p.push();
          //p.translate(rwMargin, rwMargin);
          for (let y = 0; y < this.quadAmount; y++) {
            for (let x = 0; x < this.quadAmount; x++) {
              p.push();
              p.translate(x * this.quadSize, y * this.quadSize);
              p.strokeJoin(p.ROUND);
              if (this.fill) {
                p.fill(rwLilaDark);
                p.noStroke();
              } else {
                p.noFill();
                p.strokeWeight(5);
                p.stroke(rwLilaDark);
              }
              let orientation = p.int(p.random(0, 4));
              let shapeType = 0;
              if (this.circle && !this.rectangle && !this.triangle) {
                createQuarterCircle(this.quadSize, orientation);
              } else if (!this.circle && this.rectangle && !this.triangle) {
                p.rect(0, 0, this.quadSize, this.quadSize);
              } else if (!this.circle && !this.rectangle && this.triangle) {
                createTriangle(this.quadSize, orientation);
              } else if (this.circle && this.rectangle && !this.triangle) {
                shapeType = p.int(p.random(0, 2));
                if (shapeType === 0)
                  createQuarterCircle(this.quadSize, orientation);
                else p.rect(0, 0, this.quadSize, this.quadSize);
              } else if (this.circle && !this.rectangle && this.triangle) {
                shapeType = p.int(p.random(0, 2));
                if (shapeType === 0)
                  createQuarterCircle(this.quadSize, orientation);
                else createTriangle(this.quadSize, orientation);
              } else if (!this.circle && this.rectangle && this.triangle) {
                shapeType = p.int(p.random(0, 2));
                if (shapeType === 0) createTriangle(this.quadSize, orientation);
                else p.rect(0, 0, this.quadSize, this.quadSize);
              } else if (this.circle && this.rectangle && this.triangle) {
                shapeType = p.int(p.random(0, 3));
                if (shapeType === 0)
                  createQuarterCircle(this.quadSize, orientation);
                else if (shapeType === 1)
                  createTriangle(this.quadSize, orientation);
                else p.rect(0, 0, this.quadSize, this.quadSize);
              }

              p.pop();
            }
          }
          p.pop();
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
            textField //Textbreite
          );
          let lineWidth = p.textWidth(this.userText); //Breite des eingegebenen Textes in px

          if (lineWidth < textField) {
            copyOffset = headlineSize + unit;
            this.maxCopy = 245;
          } else if (lineWidth < 2 * textField) {
            copyOffset = 2 * headlineSize + unit;
            this.maxCopy = 215;
          } else if (lineWidth < 3 * textField) {
            copyOffset = 3 * headlineSize + unit;
            this.maxCopy = 185;
          }
          p.textFont(fontMedium);
          p.textSize(copySize);
          p.textLeading(copySize * 1.4);
          p.textStyle(p.NORMAL);
          p.text(
            this.userCopy, //Inhalt
            rwMargin, //x-Position
            rwMargin + headlineSize + copyOffset, //y-Position
            textField //Textbreite
          );

          /* for (let y = 1; y <36; y++){
            p.push();
            p.translate(0, y*unit);
            p.stroke(255,0,255);
            p.strokeWeight(2);
            p.noFill();
            p.line(0, 0, p.width, 0);
            p.pop();
          } */
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
      }, this.canvas);
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