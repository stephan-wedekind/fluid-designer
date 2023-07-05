<template>
  <div ref="overlayCanvas"></div>
</template>

<script>
import p5 from "p5";
import QrCode from "qrcode";
import jsPDF from "jspdf";

import { mapState, mapActions, mapMutations } from 'vuex';

export default {
  name: 'Pattern',

  data() {
    return {
      p: null,
      canvas: null,
      typingTimer: null,
      doneTypingInterval: 1000,
      

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
        'copyTextLines',
        'patternSeed',
        'shapesFactor',
        'downloadTrigger',
        'patternMirror',
        'patternStripe',
        'patternRandom',
        'patternStripeWidth',
        'downloadTriggerPDF',
        'downloadTriggerImage'
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
    patternFilled() {
      this.removeCanvas();
      this.createCanvas();
    },
    isRectangle() {
      this.removeCanvas();
      this.createCanvas();
    },
    isTriangle() {
      this.removeCanvas();
      this.createCanvas();
    },
    isCircle() {
      this.removeCanvas();
      this.createCanvas();
    },
    patternSeed() {
      this.removeCanvas();
      this.createCanvas();
    },
    shapesFactor() {
      this.removeCanvas();
      this.createCanvas();
    },

    patternRandom() {
      this.removeCanvas();
      this.createCanvas();
    },

    patternMirror() {
      this.removeCanvas();
      this.createCanvas();
    },
    patternStripe() {
      this.removeCanvas();
      this.createCanvas();
    },
    patternStripeWidth() {
      this.removeCanvas();
      this.createCanvas();
    },

    downloadTriggerPDF(){
      this.downloadPDF();
    },
    
    downloadTriggerImage() {
      this.downloadingImage();
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

      let unitsHorizontal = 12;
      let unitsVertical;
      let gridWidth;
      let gridHeight;
      let marginX;
      let marginY;
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
          unitsVertical = parseInt(unitsHorizontal * ratioH);
          if (this.canvasWidth === 148 && this.canvasHeight === 210) unitsVertical--;
          unit = p.width / 14;

          gridWidth = unitsHorizontal * unit;
          gridHeight = unitsVertical * unit;

          if (this.canvasWidth === 1080 && this.canvasHeight === 1350) {
            unitsVertical = unitsHorizontal;
            gridHeight = gridWidth;
          }

          p.randomSeed(this.patternSeed);
          //--------------------------------------------------------------Pattern Random
          p.push();
          let shapeSize = unit * this.shapesFactor;
          let shapesRow = unitsHorizontal / this.shapesFactor;
          let shapesColumn = unitsVertical / this.shapesFactor;
          if (this.isPrint) p.translate(unit, unit);
          else p.translate(unit, (p.height - gridHeight) / 2);
          if (this.patternRandom){
          
          for (let y = 0; y < shapesColumn; y++) {
            for (let x = 0; x < shapesRow; x++) {
              p.push();
              if (this.patternFilled) {
                p.fill(rwLilaDark);
                p.noStroke();
              } else {
                p.noFill();
                p.stroke(rwLilaDark);
                p.strokeWeight(shapeSize * 0.1);
              }
              p.translate(x * shapeSize, y * shapeSize);
              p.strokeJoin(p.ROUND);

              let orientation = p.int(p.random(0, 4));
              let shapeType = 0;
              if (this.isCircle && !this.isRectangle && !this.isTriangle) {
                createQuarterCircle(shapeSize, orientation);
              } else if (!this.isCircle && this.isRectangle && !this.isTriangle) {
                p.rect(0, 0, shapeSize, shapeSize);
              } else if (!this.isCircle && !this.isRectangle && this.isTriangle) {
                createTriangle(shapeSize, orientation);
              } else if (this.isCircle && this.isRectangle && !this.isTriangle) {
                shapeType = p.int(p.random(0, 2));
                if (shapeType === 0)
                  createQuarterCircle(shapeSize, orientation);
                else p.rect(0, 0, shapeSize, shapeSize);
              } else if (this.isCircle && !this.isRectangle && this.isTriangle) {
                shapeType = p.int(p.random(0, 2));
                if (shapeType === 0)
                  createQuarterCircle(shapeSize, orientation);
                else createTriangle(shapeSize, orientation);
              } else if (!this.isCircle && this.isRectangle && this.isTriangle) {
                shapeType = p.int(p.random(0, 2));
                if (shapeType === 0) createTriangle(shapeSize, orientation);
                else p.rect(0, 0, shapeSize, shapeSize);
              } else if (this.isCircle && this.isRectangle && this.isTriangle) {
                shapeType = p.int(p.random(0, 3));
                if (shapeType === 0)
                  createQuarterCircle(shapeSize, orientation);
                else if (shapeType === 1)
                  createTriangle(shapeSize, orientation);
                else p.rect(0, 0, shapeSize, shapeSize);
              }

              p.pop();
            }
          }
          
          }

          //--------------------------------------------------------------Pattern Mirror
          
          if(this.patternMirror) {
            
            marginX = (p.width - gridWidth)/2;
            marginY = (p.height - gridHeight)/2;
      
            for (let y=0; y < shapesColumn / 2; y++) {
              for(let x=0; x< shapesRow / 2; x++){

              let orientation = p.int(p.random(0, 4));
              let orientations = [
                [0, 3, 1, 2],
                [1, 2, 0, 3],
                [2, 1, 3, 0],
                [3, 0, 2, 1],
              ];
              let shapeType = 0;

              //Fill or Stroke
              if (this.patternFilled) {
                p.fill(rwLilaDark);
                p.noStroke();
              } else {
                p.noFill();
                p.stroke(rwLilaDark);
                p.strokeWeight(shapeSize * 0.1);
              }
              p.strokeJoin(p.ROUND);

              //formen auswahl---------------------------------
              // -----------
              //KREISE
              if (this.isCircle && !this.isRectangle && !this.isTriangle) {
                //Quadrant 0
                p.push();
                p.translate(x * shapeSize, y * shapeSize);
                createQuarterCircle(shapeSize, orientations[orientation][0]);
                p.pop();
                //Quadrant 1
                p.push();
                p.translate(
                  p.width - x * shapeSize - shapeSize - 2 * marginX,
                  y * shapeSize
                );

                createQuarterCircle(shapeSize, orientations[orientation][1]);
                p.pop();
                //Quadrant 2
                p.push();
                p.translate(
                  x * shapeSize,
                  gridHeight - y * shapeSize - shapeSize
                );

                createQuarterCircle(shapeSize, orientations[orientation][2]);
                p.pop();
                //Quadrant 3
                p.push();
                p.translate(
                  p.width - x * shapeSize - shapeSize - 2 * marginX,
                  gridHeight - y * shapeSize  - shapeSize 
                );

                createQuarterCircle(shapeSize, orientations[orientation][3]);
                p.pop();
              }
              // -----------
              //QUADRATE
              else if (!this.isCircle && this.isRectangle && !this.isTriangle) {
                //Quadrant 0
                p.push();
                p.translate(x * shapeSize, y * shapeSize);
                p.rect(0, 0, shapeSize, shapeSize);
                p.pop();
                //Quadrant 1
                p.push();
                p.translate(
                  p.width - x * shapeSize - shapeSize - 2 * marginX,
                  y * shapeSize
                );

                p.rect(0, 0, shapeSize, shapeSize);
                p.pop();
                //Quadrant 2
                p.push();
                p.translate(
                  x * shapeSize,
                  gridHeight - y * shapeSize - shapeSize
                );

                p.rect(0, 0, shapeSize, shapeSize);
                p.pop();
                //Quadrant 3
                p.push();
                p.translate(
                  p.width - x * shapeSize - shapeSize - 2 * marginX,
                  gridHeight - y * shapeSize - shapeSize
                );

                p.rect(0, 0, shapeSize, shapeSize);
                p.pop();
              }
              // -----------
              //DREIECKE
              else if (!this.isCircle && !this.isRectangle && this.isTriangle) {
                //Quadrant 0
                p.push();
                p.translate(x * shapeSize, y * shapeSize);
                createTriangle(shapeSize, orientations[orientation][0]);
                p.pop();
                //Quadrant 1
                p.push();
                p.translate(
                  p.width - x * shapeSize - shapeSize - 2 * marginX,
                  y * shapeSize
                );

                createTriangle(shapeSize, orientations[orientation][1]);
                p.pop();
                //Quadrant 2
                p.push();
                p.translate(
                  x * shapeSize,
                  gridHeight - y * shapeSize - shapeSize
                );

                createTriangle(shapeSize, orientations[orientation][2]);
                p.pop();
                //Quadrant 3
                p.push();
                p.translate(
                  p.width - x * shapeSize - shapeSize - 2 * marginX,
                  gridHeight - y * shapeSize - shapeSize
                );

                createTriangle(shapeSize, orientations[orientation][3]);
                p.pop();
              }

              // -----------
              //KREISE & QUADRATE
              else if (this.isCircle && this.isRectangle && !this.isTriangle) {
                p.push();
                shapeType = p.int(p.random(0, 2));
                if (shapeType === 0) {
                  //Quadrant 0
                  p.push();
                  p.translate(x * shapeSize, y * shapeSize);
                  p.rect(0, 0, shapeSize, shapeSize);
                  p.pop();
                  //Quadrant 1
                  p.push();
                  p.translate(
                    p.width - x * shapeSize - shapeSize - 2 * marginX,
                    y * shapeSize
                  );

                  p.rect(0, 0, shapeSize, shapeSize);
                  p.pop();
                  //Quadrant 2
                  p.push();
                  p.translate(
                    x * shapeSize,
                    gridHeight - y * shapeSize - shapeSize
                  );

                  p.rect(0, 0, shapeSize, shapeSize);
                  p.pop();
                  //Quadrant 3
                  p.push();
                  p.translate(
                    p.width - x * shapeSize - shapeSize - 2 * marginX,
                    gridHeight - y * shapeSize - shapeSize
                  );

                  p.rect(0, 0, shapeSize, shapeSize);
                  p.pop();
                } else {
                  //Quadrant 0
                  p.push();
                  p.translate(x * shapeSize, y * shapeSize);
                  createQuarterCircle(shapeSize, orientations[orientation][0]);
                  p.pop();
                  //Quadrant 1
                  p.push();
                  p.translate(
                    p.width - x * shapeSize - shapeSize - 2 * marginX,
                    y * shapeSize
                  );

                  createQuarterCircle(shapeSize, orientations[orientation][1]);
                  p.pop();
                  //Quadrant 2
                  p.push();
                  p.translate(
                    x * shapeSize,
                    gridHeight - y * shapeSize - shapeSize
                  );

                  createQuarterCircle(shapeSize, orientations[orientation][2]);
                  p.pop();
                  //Quadrant 3
                  p.push();
                  p.translate(
                    p.width - x * shapeSize - shapeSize - 2 * marginX,
                    gridHeight - y * shapeSize - shapeSize
                  );

                  createQuarterCircle(shapeSize, orientations[orientation][3]);
                  p.pop();
                }
                p.pop();
              }

              // -----------
              //KREISE & DREIECKE
              else if (this.isCircle && !this.isRectangle && this.isTriangle) {
                p.push();
                shapeType = p.int(p.random(0, 2));
                if (shapeType === 0) {
                  //Quadrant 0
                  p.push();
                  p.translate(x * shapeSize, y * shapeSize);
                  createTriangle(shapeSize, orientations[orientation][0]);
                  p.pop();
                  //Quadrant 1
                  p.push();
                  p.translate(
                    p.width - x * shapeSize - shapeSize - 2 * marginX,
                    y * shapeSize
                  );

                  createTriangle(shapeSize, orientations[orientation][1]);
                  p.pop();
                  //Quadrant 2
                  p.push();
                  p.translate(
                    x * shapeSize,
                    gridHeight - y * shapeSize - shapeSize
                  );

                  createTriangle(shapeSize, orientations[orientation][2]);
                  p.pop();
                  //Quadrant 3
                  p.push();
                  p.translate(
                    p.width - x * shapeSize - shapeSize - 2 * marginX,
                    gridHeight - y * shapeSize - shapeSize
                  );

                  createTriangle(shapeSize, orientations[orientation][3]);
                  p.pop();
                } else {
                  //Quadrant 0
                  p.push();
                  p.translate(x * shapeSize, y * shapeSize);
                  createQuarterCircle(shapeSize, orientations[orientation][0]);
                  p.pop();
                  //Quadrant 1
                  p.push();
                  p.translate(
                    p.width - x * shapeSize - shapeSize - 2 * marginX,
                    y * shapeSize
                  );

                  createQuarterCircle(shapeSize, orientations[orientation][1]);
                  p.pop();
                  //Quadrant 2
                  p.push();
                  p.translate(
                    x * shapeSize,
                    gridHeight - y * shapeSize - shapeSize
                  );

                  createQuarterCircle(shapeSize, orientations[orientation][2]);
                  p.pop();
                  //Quadrant 3
                  p.push();
                  p.translate(
                    p.width - x * shapeSize - shapeSize - 2 * marginX,
                    gridHeight - y * shapeSize - shapeSize
                  );

                  createQuarterCircle(shapeSize, orientations[orientation][3]);
                  p.pop();
                }
                p.pop();
              }

              // -----------
              //QUADRATE & DREIECKE
              else if (!this.isCircle && this.isRectangle && this.isTriangle) {
                
                shapeType = p.int(p.random(0, 2));
                p.push();
                //DREIECKE
                if (shapeType === 0) {
                  //Quadrant 0
                  p.push();
                  p.translate(x * shapeSize, y * shapeSize);
                  createTriangle(shapeSize, orientations[orientation][0]);
                  p.pop();
                  //Quadrant 1
                  p.push();
                  p.translate(
                    p.width - x * shapeSize - shapeSize - 2 * marginX,
                    y * shapeSize
                  );

                  createTriangle(shapeSize, orientations[orientation][1]);
                  p.pop();
                  //Quadrant 2
                  p.push();
                  p.translate(
                    x * shapeSize,
                    gridHeight - y * shapeSize - shapeSize
                  );

                  createTriangle(shapeSize, orientations[orientation][2]);
                  p.pop();
                  //Quadrant 3
                  p.push();
                  p.translate(
                    p.width - x * shapeSize - shapeSize - 2 * marginX,
                    gridHeight - y * shapeSize - shapeSize
                  );

                  createTriangle(shapeSize, orientations[orientation][3]);
                  p.pop();
                } else {
                  //----
                  //Quadrant 0
                  p.push();
                  p.translate(x * shapeSize, y * shapeSize);
                  p.rect(0, 0, shapeSize, shapeSize);
                  p.pop();
                  //Quadrant 1
                  p.push();
                  p.translate(
                    p.width - x * shapeSize - shapeSize - 2 * marginX,
                    y * shapeSize
                  );
                  p.rect(0, 0, shapeSize, shapeSize);
                  p.pop();
                  //Quadrant 2
                  p.push();
                  p.translate(
                    x * shapeSize,
                    gridHeight - y * shapeSize - shapeSize
                  );
                  p.rect(0, 0, shapeSize, shapeSize);
                  p.pop();
                  //Quadrant 3
                  p.push();
                  p.translate(
                    p.width - x * shapeSize - shapeSize - 2 * marginX,
                    gridHeight - y * shapeSize - shapeSize
                  );
                  p.rect(0, 0, shapeSize, shapeSize);
                  p.pop();
                }
                p.pop();
              }

              // -----------
              //ALLE FORMEN
              else if (this.isCircle && this.isRectangle && this.isTriangle) {
                // ALLE DREI FORMEN

                
                shapeType = p.int(p.random(0, 7));
                p.push();
                //RECHTECKE
                if (shapeType === 0) {
                  //----
                  //Quadrant 0
                  p.push();
                  p.translate(x * shapeSize, y * shapeSize);
                  p.rect(0, 0, shapeSize, shapeSize);
                  p.pop();
                  //Quadrant 1
                  p.push();
                  p.translate(
                    p.width - x * shapeSize - shapeSize - 2 * marginX,
                    y * shapeSize
                  );
                  p.rect(0, 0, shapeSize, shapeSize);
                  p.pop();
                  //Quadrant 2
                  p.push();
                  p.translate(
                    x * shapeSize,
                    gridHeight - y * shapeSize - shapeSize
                  );
                  p.rect(0, 0, shapeSize, shapeSize);
                  p.pop();
                  //Quadrant 3
                  p.push();
                  p.translate(
                    p.width - x * shapeSize - shapeSize - 2 * marginX,
                    gridHeight - y * shapeSize - shapeSize
                  );
                  p.rect(0, 0, shapeSize, shapeSize);
                  p.pop();
                }

                //DREIECKE
                else if (shapeType === 1 || shapeType === 2 || shapeType == 3) {
                  //Quadrant 0
                  p.push();
                  p.translate(x * shapeSize, y * shapeSize);
                  createTriangle(shapeSize, orientations[orientation][0]);
                  p.pop();
                  //Quadrant 1
                  p.push();
                  p.translate(
                    p.width - x * shapeSize - shapeSize - 2 * marginX,
                    y * shapeSize
                  );

                  createTriangle(shapeSize, orientations[orientation][1]);
                  p.pop();
                  //Quadrant 2
                  p.push();
                  p.translate(
                    x * shapeSize,
                    gridHeight - y * shapeSize - shapeSize
                  );

                  createTriangle(shapeSize, orientations[orientation][2]);
                  p.pop();
                  //Quadrant 3
                  p.push();
                  p.translate(
                    p.width - x * shapeSize - shapeSize - 2 * marginX,
                    gridHeight - y * shapeSize - shapeSize
                  );

                  createTriangle(shapeSize, orientations[orientation][3]);
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
                  p.translate(x * shapeSize, y * shapeSize);
                  createQuarterCircle(shapeSize, orientations[orientation][0]);
                  p.pop();
                  //Quadrant 1
                  p.push();
                  p.translate(
                    p.width - x * shapeSize - shapeSize - 2 * marginX,
                    y * shapeSize
                  );

                  createQuarterCircle(shapeSize, orientations[orientation][1]);
                  p.pop();
                  //Quadrant 2
                  p.push();
                  p.translate(
                    x * shapeSize,
                    gridHeight - y * shapeSize - shapeSize
                  );

                  createQuarterCircle(shapeSize, orientations[orientation][2]);
                  p.pop();
                  //Quadrant 3
                  p.push();
                  p.translate(
                    p.width - x * shapeSize - shapeSize - 2 * marginX,
                    gridHeight - y * shapeSize - shapeSize
                  );

                  createQuarterCircle(shapeSize, orientations[orientation][3]);
                  p.pop();
                }
                p.pop();
              }
              }
            }
            
          }
          p.pop();
          //--------------------------------------------------------------Pattern Stripe
          if(this.patternStripe) {
            p.push();
            let shapeSize = p.height*0.1;
            let shapesColumn = p.height/shapeSize;

            p.translate(p.width - (shapeSize*this.patternStripeWidth) - shapeSize,0)
          
            for (let y = 0; y < shapesColumn; y++) {
              for (let x = 0; x < this.patternStripeWidth; x++){
                p.push();
                p.translate(x*shapeSize, y*shapeSize);
                if (this.patternFilled) {
                p.fill(rwLilaDark);
                p.noStroke();
              } else {
                p.noFill();
                p.stroke(rwLilaDark);
                p.strokeWeight(shapeSize * 0.1);
              }
              p.strokeJoin(p.ROUND);

              let orientation = p.int(p.random(0, 4));
              let shapeType = 0;
              if (this.isCircle && !this.isRectangle && !this.isTriangle) {
                createQuarterCircle(shapeSize, orientation);
              } else if (!this.isCircle && this.isRectangle && !this.isTriangle) {
                p.rect(0, 0, shapeSize, shapeSize);
              } else if (!this.isCircle && !this.isRectangle && this.isTriangle) {
                createTriangle(shapeSize, orientation);
              } else if (this.isCircle && this.isRectangle && !this.isTriangle) {
                shapeType = p.int(p.random(0, 2));
                if (shapeType === 0)
                  createQuarterCircle(shapeSize, orientation);
                else p.rect(0, 0, shapeSize, shapeSize);
              } else if (this.isCircle && !this.isRectangle && this.isTriangle) {
                shapeType = p.int(p.random(0, 2));
                if (shapeType === 0)
                  createQuarterCircle(shapeSize, orientation);
                else createTriangle(shapeSize, orientation);
              } else if (!this.isCircle && this.isRectangle && this.isTriangle) {
                shapeType = p.int(p.random(0, 2));
                if (shapeType === 0) createTriangle(shapeSize, orientation);
                else p.rect(0, 0, shapeSize, shapeSize);
              } else if (this.isCircle && this.isRectangle && this.isTriangle) {
                shapeType = p.int(p.random(0, 3));
                if (shapeType === 0)
                  createQuarterCircle(shapeSize, orientation);
                else if (shapeType === 1)
                  createTriangle(shapeSize, orientation);
                else p.rect(0, 0, shapeSize, shapeSize);
              }
              //
              //
              //
              //
              //
              //
              p.pop();
              }
            }
            p.pop();
          }

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
        quality: 1,
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
