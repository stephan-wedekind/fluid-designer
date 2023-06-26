<template>
  <div class="overlay-container">
    <div class="foreground">
      <div class="focus-head">
        <h1 class="fontLila">Wähle den passenden Bildauschnit</h1>
        <Btn buttonType="Tertiary" buttonName="" buttonIcons="Menue-schliessen.png" class="btn-close"
          @click="setChooseFocus(false)" />
      </div>
      <!-- <img :src="imagePath" alt=""> -->
      <div class="canvas-container" >
      <div ref="focusCanvas"></div>
      </div>
    </div>
  </div>
</template>

<script>
import p5 from "p5";
import { mapState, mapMutations, mapActions } from 'vuex';
import Btn from '@/components/Button.vue'

export default {
  name: 'FocusPoint',

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

  watch: {
    focus(){
      this.removeCanvas();
      this.createCanvas();
    }
  },

  components: {
    Btn,
  },

  computed: {
    ...mapState(['imagePath', 'canvasWidth', 'canvasHeight', 'styleClassic', 'focus', 'chooseFocus']),
  
  },

  methods: {
    ...mapMutations(['setFocusPoint' , 'setChooseFocus', 'setFocus']),
    ...mapActions([]),

    createCanvas(){
      let img;
      let width;
      let height;
      let scaleFactor;
      let imgRatio;

      //Farben
      let rwLila;
      let rwLilaDark;
      let rwCyan;
      let rwCyanLight;
      let posX;
      let posY;

     

      let focusW;
      let focusH;

      this.p = new p5((p) => {
        p.preload = () => {
          img = p.loadImage(this.imagePath);
        }

        p.setup = () => {
          p.pixelDensity(1);
          //Setup Canvas and Image Size and Aspect Ratio
          if (img.width > img.height) {
            width = visualViewport.width*0.7 - 120;
            imgRatio = img.height/img.width;
            height = width * imgRatio;
          } else {
            height = visualViewport.height *0.7;
            imgRatio = img.width/img.height;
            width = height * imgRatio;
          }
          this.canvas = p.createCanvas(width,height).parent(this.$refs.focusCanvas);

          //Color Setting
          rwLila = p.color(102, 56, 182);
          rwLilaDark = p.color(45, 7, 100);
          rwCyan = p.color(0, 169, 206);
          rwCyanLight = p.color(5, 195, 222);


          
          
          //Focus Overlay Canvas
          let ratioCanvas;
          if (this.styleClassic) {
            ratioCanvas = this.canvasWidth/((this.canvasWidth/14)*9);
          } else {
            ratioCanvas = this.canvasWidth/this.canvasHeight;
          }

          let ratioImg = img.width / img.height;
          if (ratioImg < ratioCanvas) {
            //CASE 1 offx=0
            
            focusW = p.width;
            focusH = p.width * (1 / ratioCanvas);
            posX = p.width/2;
            posY = this.focus * p.height;
          } else {
            //CASE 2 offy=0
            focusW = p.height * (ratioCanvas);
            focusH = p.height;
            posX = this.focus * p.width;
            posY = p.height/2;
          }

          
          p.image(img, 0, 0, width, height);
          p.push()

          p.translate(posX, posY);
          
          p.rectMode(p.CENTER);

          
          const fillColor = p.color(
            p.red(rwLila),
            p.green(rwLila),
            p.blue(rwLila),
            200
          );
          p.fill(fillColor);
          p.noStroke();
          
          p.rect(0,0, focusW, focusH);
          p.noFill();
          p.stroke(rwLila);
          p.strokeWeight(6);
          p.rect(0,0, focusW-6, focusH-6);

          p.pop()

          

          p.mouseClicked = () => {
            if (this.chooseFocus) {
              if (p.mouseX >= 0 && p.mouseX <= p.width && p.mouseY >= 0 && p.mouseY <= p.height) {


                if (ratioImg < ratioCanvas) {

                  if (p.mouseY <= focusH/2){
                    this.setFocus((focusH/2  / p.height));
                  } else if (p.mouseY >= (p.height - (focusH/2))){
                    this.setFocus((p.height - (focusH/2)) / p.height);
                  } else {
                    this.setFocus(p.mouseY / p.height);
                  }
                
                } else {

                  if (p.mouseX <= focusW/2) {
                    this.setFocus((focusW/2)/p.width);
                  } else if (p.mouseX >= (p.width - (focusW/2))){
                    this.setFocus((p.width - (focusW/2)) / p.width);
                  } else {
                    this.setFocus(p.mouseX / p.width);
                  }
                  

                }
              }
            }
          };
         
         
        }//setup

        p.draw = () => {  
        }
      },)//P5
    }, //createCanvas

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
        console.log('focus Point destroyed');
      }
    },
  }, //methods
}
</script>

<style scoped>
.overlay-container {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background: rgba(102, 56, 182, 0.95);
  /* backdrop-filter: blur(20px); */
}

.foreground {
  width: 70vw;
  background-color: white;
  border-radius: 30px;
  padding: 60px;
  box-sizing: border-box;
  /* display: flex;
  justify-content: center; */
}

.canvas-container {
  width: 100%;
  display: flex;
  justify-content: center;
  cursor: pointer;
}

.focus-head {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
}

.foreground img {
  width: 100%;
  height: auto;
}
</style>
