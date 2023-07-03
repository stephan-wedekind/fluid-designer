<template>
  <div class="overlay-container">
    <div class="foreground">
      <div class="warning-head">
        <h1 class="fontLila">Möchtest du »FluidDesigner« wirklich verlassen?</h1>
        <Btn buttonType="Tertiary" buttonName="" buttonIcons="Menue-schliessen.png" class="btn-close"
          @click="setIsCloseWarning(!isCloseWarning)" />
      </div>
        
          <div class="button-group close-msg">
          <BtnIL buttonType="Tertiary" buttonName="Zurück" buttonIcons="Pfeil-links.png" class="btn-decide" @click="setIsCloseWarning(!isCloseWarning)" />

          <router-link to="/" class="link" @click="discardStore()">
          <Btn buttonType="Secondary" buttonName="Verlassen und Änderungen verwerfen" buttonIcons="Menue-schliessen.png" class="btn-decide"/>
          </router-link>

          <router-link to="/" class="link" @click="resetStore()">
          <Btn buttonType="Primary" buttonName="Verlassen und Änderungen speichern" buttonIcons="Share.png" class="btn-decide"/>
          </router-link>
          </div>
          <p>Die gespeicherten Inhalte findest du auf der Startseite unter »Zuletzt erstellt«</p>
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
    ...mapActions(['resetStore', 'discardStore']),

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

.close-msg {
  margin: 60px 0 30px;
}

.button-group {
  display: flex;
  justify-content: space-between;
}


.link {
  text-decoration: none;
}
</style>
