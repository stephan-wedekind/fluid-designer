<template>
  <div class="overlay-container">
    <div class="foreground">
      <div class="warning-head">
        <h1 class="fontLila">Möchtest du »FluidDesigner« wirklich verlassen?</h1>
        <Btn buttonType="Tertiary" buttonName="" buttonIcons="Menue-schliessen.png" class="btn-close"
          @click="setIsCloseWarning(!isCloseWarning)" />
      </div>
      <div class="warning-msg">
        <p class="close-msg">Alle Eingaben werden gelöscht. Wenn du an diesem Projekt weiter arbeiten möchtest findest du es unter »Zuletzt erstellt«</p>
        
          <BtnIL buttonType="Secondary" buttonName="Zurück zum FluidDesigner" buttonIcons="Pfeil-links.png" class="btn-decide" @click="setIsCloseWarning(!isCloseWarning)" />
          <router-link to="/" class="link" @click="resetStore()">
          <Btn buttonType="Primary" buttonName="FluidDesigner Verlassen" buttonIcons="Menue-schliessen.png" class="btn-decide"/>
          </router-link>
        
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import Btn from '@/components/Button.vue'
import BtnIL from '@/components/ButtonIconLeft.vue'


export default {
  
  name: 'CloseWarning',

  data() {
    return {
    }
  },

  components: {
    Btn,
    BtnIL
  },

  computed: {
    ...mapState(['isCloseWarning']),

    inputIsMade() {
      return this.customWidth && this.customHeight;
    }
  },

  methods: {
    ...mapMutations(['setIsCloseWarning']),
    ...mapActions(['resetStore']),

  },
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
  width: 80vw;
  background-color: white;
  border-radius: 30px;
  padding: 60px;
  box-sizing: border-box;
}

.warning-head {
  display: flex;
  justify-content: space-between;
}

.warning-msg {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.close-msg {
  margin: 60px 0 30px;
}

.btn-decide {
  width: 350px;
}
.link {
  text-decoration: none;
}

/* .btn-wraper {
  width: 100%;
  display: flex;
  justify-content: space-between;
} */
</style>
