<template>
  <div>
    <h1>Test</h1>
    <input
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
    <h4>Change Pattern:</h4>
    <button @click="decreaseSeed" style="margin-right: 10px">
      Previous Pattern
    </button>
    <button @click="increaseSeed">Next Pattern</button>
    <br />
    <button @click="decreaseCount" style="margin-right: 10px">Pattern -</button>
    <button @click="increaseCount" style="margin-right: 10px">Pattern +</button>
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
    <button @click="downloadingImage" :disabled="!downloadAble">
      Download Image
    </button>
  </div>
  <div class="mainCanvas" ref="layoutContainer" v-if="mainVisible"></div>
</template>

<script>
import p5 from "p5";

export default {
  name: "PatternMirror",

  data() {
    return {
      p: null,
      canvas: null,
      canvasWidth: 1080,
      canvasHeight: 1080,
      downloadAble: false,
      progress: 0,
      mainVisible: true,
      count: 4,
    };
  },

  mounted() {
    this.createCanvas();
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
  methods: {
    increaseSeed() {
      this.seed++;
    },
    decreaseSeed() {
      this.seed--;
    },
    increaseCount() {
      this.count += 2;
    },
    decreaseCount() {
      this.count -= 2;
      if (this.count <= 0) {
        this.count = 2;
      }
    },
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
      link.download = "canvas.png";
      link.click();
    },

    createCanvas() {
      let rwMargin;
      let primaryC; // RWU Lila
      let secondaryC; // RWU Lila-Dark
      let fontBold;
      let fontMedium;
      let copyOffset;
      let unit;
      let headlineSize;
      let copySize;
      let textField;
      this.p = new p5((p) => {
        p.preload = () => {
          fontBold = p.loadFont(
            "fonts/Barlow-Semicondensed/BarlowSemiCondensed-Bold.ttf"
          );
          fontMedium = p.loadFont(
            "fonts/Barlow-Semicondensed/BarlowSemiCondensed-Medium.ttf"
          );
        };

        p.setup = () => {
          p.pixelDensity(10);
        };

        p.draw = () => {
          p.randomSeed(this.seed);
          this.canvas = p
            .createCanvas(
              visualViewport.height * 0.8,
              visualViewport.height * 0.8
            )
            .parent(this.$refs.layoutContainer);
          primaryC = p.color(102, 56, 182);
          secondaryC = p.color(45, 7, 100);
          p.background(primaryC);
          let quadAmount = this.count;

          unit = p.width / 36;
          rwMargin = unit * 4;
          let quadSize = (p.width - 2 * rwMargin) / quadAmount;
          p.translate(rwMargin, rwMargin);

          for (let y = 0; y < quadAmount / 2; y++) {
            for (let x = 0; x < quadAmount / 2; x++) {
              
              let orientation = p.int(p.random(0, 4));
              let orientations = [
                [0, 3, 1, 2],
                [1, 2, 0, 3],
                [2, 1, 3, 0],
                [3, 0, 2, 1],
              ];
              let shapeType = 0;
              if (this.fill) {
                p.fill(secondaryC);
                p.noStroke();
              } else {
                p.noFill();
                p.stroke(secondaryC);
                p.strokeWeight(12);
                p.strokeJoin(p.ROUND);
              }

              //formen auswahl---------------------------------
              // -----------
              //KREISE
              if (this.circle && !this.rectangle && !this.triangle) {
                //Quadrant 0
                p.push();
                p.translate(x * quadSize, y * quadSize);
                createQuarterCircle(quadSize, orientations[orientation][0]);
                p.pop();
                //Quadrant 1
                p.push();
                p.translate(
                  p.width - x * quadSize - quadSize - 2 * rwMargin,
                  y * quadSize
                );

                createQuarterCircle(quadSize, orientations[orientation][1]);
                p.pop();
                //Quadrant 2
                p.push();
                p.translate(
                  x * quadSize,
                  p.height - y * quadSize - quadSize - 2 * rwMargin
                );

                createQuarterCircle(quadSize, orientations[orientation][2]);
                p.pop();
                //Quadrant 3
                p.push();
                p.translate(
                  p.width - x * quadSize - quadSize - 2 * rwMargin,
                  p.height - y * quadSize - quadSize - 2 * rwMargin
                );

                createQuarterCircle(quadSize, orientations[orientation][3]);
                p.pop();
              }
              // -----------
              //QUADRATE
              else if (!this.circle && this.rectangle && !this.triangle) {
                //Quadrant 0
                p.push();
                p.translate(x * quadSize, y * quadSize);
                p.rect(0, 0, quadSize, quadSize);
                p.pop();
                //Quadrant 1
                p.push();
                p.translate(
                  p.width - x * quadSize - quadSize - 2 * rwMargin,
                  y * quadSize
                );

                p.rect(0, 0, quadSize, quadSize);
                p.pop();
                //Quadrant 2
                p.push();
                p.translate(
                  x * quadSize,
                  p.height - y * quadSize - quadSize - 2 * rwMargin
                );

                p.rect(0, 0, quadSize, quadSize);
                p.pop();
                //Quadrant 3
                p.push();
                p.translate(
                  p.width - x * quadSize - quadSize - 2 * rwMargin,
                  p.height - y * quadSize - quadSize - 2 * rwMargin
                );

                p.rect(0, 0, quadSize, quadSize);
                p.pop();
              }
              // -----------
              //DREIECKE
              else if (!this.circle && !this.rectangle && this.triangle) {
                //Quadrant 0
                p.push();
                p.translate(x * quadSize, y * quadSize);
                createTriangle(quadSize, orientations[orientation][0]);
                p.pop();
                //Quadrant 1
                p.push();
                p.translate(
                  p.width - x * quadSize - quadSize - 2 * rwMargin,
                  y * quadSize
                );

                createTriangle(quadSize, orientations[orientation][1]);
                p.pop();
                //Quadrant 2
                p.push();
                p.translate(
                  x * quadSize,
                  p.height - y * quadSize - quadSize - 2 * rwMargin
                );

                createTriangle(quadSize, orientations[orientation][2]);
                p.pop();
                //Quadrant 3
                p.push();
                p.translate(
                  p.width - x * quadSize - quadSize - 2 * rwMargin,
                  p.height - y * quadSize - quadSize - 2 * rwMargin
                );

                createTriangle(quadSize, orientations[orientation][3]);
                p.pop();
              }

              // -----------
              //KREISE & QUADRATE
              else if (this.circle && this.rectangle && !this.triangle) {
                p.push();
                shapeType = p.int(p.random(0, 2));
                if (shapeType === 0) {
                  //Quadrant 0
                  p.push();
                  p.translate(x * quadSize, y * quadSize);
                  p.rect(0, 0, quadSize, quadSize);
                  p.pop();
                  //Quadrant 1
                  p.push();
                  p.translate(
                    p.width - x * quadSize - quadSize - 2 * rwMargin,
                    y * quadSize
                  );

                  p.rect(0, 0, quadSize, quadSize);
                  p.pop();
                  //Quadrant 2
                  p.push();
                  p.translate(
                    x * quadSize,
                    p.height - y * quadSize - quadSize - 2 * rwMargin
                  );

                  p.rect(0, 0, quadSize, quadSize);
                  p.pop();
                  //Quadrant 3
                  p.push();
                  p.translate(
                    p.width - x * quadSize - quadSize - 2 * rwMargin,
                    p.height - y * quadSize - quadSize - 2 * rwMargin
                  );

                  p.rect(0, 0, quadSize, quadSize);
                  p.pop();
                } else {
                  //Quadrant 0
                  p.push();
                  p.translate(x * quadSize, y * quadSize);
                  createQuarterCircle(quadSize, orientations[orientation][0]);
                  p.pop();
                  //Quadrant 1
                  p.push();
                  p.translate(
                    p.width - x * quadSize - quadSize - 2 * rwMargin,
                    y * quadSize
                  );

                  createQuarterCircle(quadSize, orientations[orientation][1]);
                  p.pop();
                  //Quadrant 2
                  p.push();
                  p.translate(
                    x * quadSize,
                    p.height - y * quadSize - quadSize - 2 * rwMargin
                  );

                  createQuarterCircle(quadSize, orientations[orientation][2]);
                  p.pop();
                  //Quadrant 3
                  p.push();
                  p.translate(
                    p.width - x * quadSize - quadSize - 2 * rwMargin,
                    p.height - y * quadSize - quadSize - 2 * rwMargin
                  );

                  createQuarterCircle(quadSize, orientations[orientation][3]);
                  p.pop();
                }
                p.pop();
              }

              // -----------
              //KREISE & DREIECKE
              else if (this.circle && !this.rectangle && this.triangle) {
                p.push();
                shapeType = p.int(p.random(0, 2));
                if (shapeType === 0) {
                  //Quadrant 0
                  p.push();
                  p.translate(x * quadSize, y * quadSize);
                  createTriangle(quadSize, orientations[orientation][0]);
                  p.pop();
                  //Quadrant 1
                  p.push();
                  p.translate(
                    p.width - x * quadSize - quadSize - 2 * rwMargin,
                    y * quadSize
                  );

                  createTriangle(quadSize, orientations[orientation][1]);
                  p.pop();
                  //Quadrant 2
                  p.push();
                  p.translate(
                    x * quadSize,
                    p.height - y * quadSize - quadSize - 2 * rwMargin
                  );

                  createTriangle(quadSize, orientations[orientation][2]);
                  p.pop();
                  //Quadrant 3
                  p.push();
                  p.translate(
                    p.width - x * quadSize - quadSize - 2 * rwMargin,
                    p.height - y * quadSize - quadSize - 2 * rwMargin
                  );

                  createTriangle(quadSize, orientations[orientation][3]);
                  p.pop();
                } else {
                  //Quadrant 0
                  p.push();
                  p.translate(x * quadSize, y * quadSize);
                  createQuarterCircle(quadSize, orientations[orientation][0]);
                  p.pop();
                  //Quadrant 1
                  p.push();
                  p.translate(
                    p.width - x * quadSize - quadSize - 2 * rwMargin,
                    y * quadSize
                  );

                  createQuarterCircle(quadSize, orientations[orientation][1]);
                  p.pop();
                  //Quadrant 2
                  p.push();
                  p.translate(
                    x * quadSize,
                    p.height - y * quadSize - quadSize - 2 * rwMargin
                  );

                  createQuarterCircle(quadSize, orientations[orientation][2]);
                  p.pop();
                  //Quadrant 3
                  p.push();
                  p.translate(
                    p.width - x * quadSize - quadSize - 2 * rwMargin,
                    p.height - y * quadSize - quadSize - 2 * rwMargin
                  );

                  createQuarterCircle(quadSize, orientations[orientation][3]);
                  p.pop();
                }
                p.pop();
              }

              // -----------
              //QUADRATE & DREIECKE
              else if (!this.circle && this.rectangle && this.triangle) {
                
                shapeType = p.int(p.random(0, 2));
                p.push();
                //DREIECKE
                if (shapeType === 0) {
                  //Quadrant 0
                  p.push();
                  p.translate(x * quadSize, y * quadSize);
                  createTriangle(quadSize, orientations[orientation][0]);
                  p.pop();
                  //Quadrant 1
                  p.push();
                  p.translate(
                    p.width - x * quadSize - quadSize - 2 * rwMargin,
                    y * quadSize
                  );

                  createTriangle(quadSize, orientations[orientation][1]);
                  p.pop();
                  //Quadrant 2
                  p.push();
                  p.translate(
                    x * quadSize,
                    p.height - y * quadSize - quadSize - 2 * rwMargin
                  );

                  createTriangle(quadSize, orientations[orientation][2]);
                  p.pop();
                  //Quadrant 3
                  p.push();
                  p.translate(
                    p.width - x * quadSize - quadSize - 2 * rwMargin,
                    p.height - y * quadSize - quadSize - 2 * rwMargin
                  );

                  createTriangle(quadSize, orientations[orientation][3]);
                  p.pop();
                } else {
                  //----
                  //Quadrant 0
                  p.push();
                  p.translate(x * quadSize, y * quadSize);
                  p.rect(0, 0, quadSize, quadSize);
                  p.pop();
                  //Quadrant 1
                  p.push();
                  p.translate(
                    p.width - x * quadSize - quadSize - 2 * rwMargin,
                    y * quadSize
                  );
                  p.rect(0, 0, quadSize, quadSize);
                  p.pop();
                  //Quadrant 2
                  p.push();
                  p.translate(
                    x * quadSize,
                    p.height - y * quadSize - quadSize - 2 * rwMargin
                  );
                  p.rect(0, 0, quadSize, quadSize);
                  p.pop();
                  //Quadrant 3
                  p.push();
                  p.translate(
                    p.width - x * quadSize - quadSize - 2 * rwMargin,
                    p.height - y * quadSize - quadSize - 2 * rwMargin
                  );
                  p.rect(0, 0, quadSize, quadSize);
                  p.pop();
                }
                p.pop();
              }

              // -----------
              //ALLE FORMEN
              else if (this.circle && this.rectangle && this.triangle) {
                // ALLE DREI FORMEN

                
                shapeType = p.int(p.random(0, 7));
                p.push();
                //RECHTECKE
                if (shapeType === 0) {
                  //----
                  //Quadrant 0
                  p.push();
                  p.translate(x * quadSize, y * quadSize);
                  p.rect(0, 0, quadSize, quadSize);
                  p.pop();
                  //Quadrant 1
                  p.push();
                  p.translate(
                    p.width - x * quadSize - quadSize - 2 * rwMargin,
                    y * quadSize
                  );
                  p.rect(0, 0, quadSize, quadSize);
                  p.pop();
                  //Quadrant 2
                  p.push();
                  p.translate(
                    x * quadSize,
                    p.height - y * quadSize - quadSize - 2 * rwMargin
                  );
                  p.rect(0, 0, quadSize, quadSize);
                  p.pop();
                  //Quadrant 3
                  p.push();
                  p.translate(
                    p.width - x * quadSize - quadSize - 2 * rwMargin,
                    p.height - y * quadSize - quadSize - 2 * rwMargin
                  );
                  p.rect(0, 0, quadSize, quadSize);
                  p.pop();
                }

                //DREIECKE
                else if (shapeType === 1 || shapeType === 2 || shapeType == 3) {
                  //Quadrant 0
                  p.push();
                  p.translate(x * quadSize, y * quadSize);
                  createTriangle(quadSize, orientations[orientation][0]);
                  p.pop();
                  //Quadrant 1
                  p.push();
                  p.translate(
                    p.width - x * quadSize - quadSize - 2 * rwMargin,
                    y * quadSize
                  );

                  createTriangle(quadSize, orientations[orientation][1]);
                  p.pop();
                  //Quadrant 2
                  p.push();
                  p.translate(
                    x * quadSize,
                    p.height - y * quadSize - quadSize - 2 * rwMargin
                  );

                  createTriangle(quadSize, orientations[orientation][2]);
                  p.pop();
                  //Quadrant 3
                  p.push();
                  p.translate(
                    p.width - x * quadSize - quadSize - 2 * rwMargin,
                    p.height - y * quadSize - quadSize - 2 * rwMargin
                  );

                  createTriangle(quadSize, orientations[orientation][3]);
                  p.pop();
                }

                //VIERTELKREISE
                else if (
                  shapeType === 4 ||
                  shapeType === 5 ||
                  shapeType === 6
                ) {
                  //Quadrant 0
                  p.push();
                  p.translate(x * quadSize, y * quadSize);
                  createQuarterCircle(quadSize, orientations[orientation][0]);
                  p.pop();
                  //Quadrant 1
                  p.push();
                  p.translate(
                    p.width - x * quadSize - quadSize - 2 * rwMargin,
                    y * quadSize
                  );

                  createQuarterCircle(quadSize, orientations[orientation][1]);
                  p.pop();
                  //Quadrant 2
                  p.push();
                  p.translate(
                    x * quadSize,
                    p.height - y * quadSize - quadSize - 2 * rwMargin
                  );

                  createQuarterCircle(quadSize, orientations[orientation][2]);
                  p.pop();
                  //Quadrant 3
                  p.push();
                  p.translate(
                    p.width - x * quadSize - quadSize - 2 * rwMargin,
                    p.height - y * quadSize - quadSize - 2 * rwMargin
                  );

                  createQuarterCircle(quadSize, orientations[orientation][3]);
                  p.pop();
                }
                p.pop();
              }

              //--------------------------------
              //-------------------
            }
          }

          //TEXT
          //------
          headlineSize = unit * 3;
          copySize = unit * 2;
          textField = p.width - 2 * rwMargin;

          p.fill(255);
          p.noStroke();
          p.textFont(fontBold);
          p.textAlign(p.LEFT, p.BASELINE);
          p.textSize(headlineSize);
          p.textStyle(p.BOLD);
          p.textLeading(headlineSize);
          p.text(
            this.userText, //Inhalt
            0, //x Postion
            headlineSize, //y Postion
            textField //Textbreite
          );
          /* fontBold.p.textBounds(
            this.userText,
            0,
          ) */
   
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
            0, //x-Position
            headlineSize + copyOffset, //y-Position
            textField //Textbreite
          );

          if (!this.downloadAble) this.downloadAble = true;
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
      });
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
h1 {
  z-index: 1;
}
#show-layout {
  display: flex;
  position: absolute;
  left: 50vw;
  top: 50%;
  transform: translate(0, -50%);
  border: 5px solid #00a9ce;
}
</style>
