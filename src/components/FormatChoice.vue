<template>
  <div class="overlay">
    <section class="formatWindow">
      <h1 class="fontLila">Wähle ein Gewünschtes Format</h1>

      <div class="formatContainer">

        <router-link to="/fluidDesigner" class="format">
          <img src="/Platzhalter/Formate/1x1.png" alt="">
          <h4 class="fontLila">1x1 Social Media</h4>
        </router-link>

        <router-link to="/fluidDesigner" class="format">
          <img src="/Platzhalter/Formate/4x5.png" alt="">
          <h4 class="fontLila">4x5 Social Media</h4>
        </router-link>

        <router-link to="/fluidDesigner" class="format">
          <img src="/Platzhalter/Formate/9x16.png" alt="">
          <h4 class="fontLila">9x16 Social Media</h4>
        </router-link>

        <router-link to="/fluidDesigner" class="format">
          <img src="/Platzhalter/Formate/A4.png" alt="">
          <h4 class="fontLila">DIN A4 Flyer</h4>
        </router-link>

        <router-link to="/fluidDesigner" class="format">
          <img src="/Platzhalter/Formate/A4.png" alt="">
          <h4 class="fontLila">DIN A5 Flyer</h4>
        </router-link>

        <router-link to="/fluidDesigner" class="format">
          <img src="/Platzhalter/Formate/Freies Format.png" alt="">
          <h4 class="fontLila">Eigenes Format</h4>
        </router-link>
        
      </div>

    </section>
    <div class="overlayBlur"></div>
  </div>
</template>

<script>
export default {
  name: 'FormatChoice',

}
</script>

<style scoped>
.overlay {
  position: fixed;
  display: flex;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
}

.formatWindow {
  box-sizing: border-box;
  padding: 45px;
  width: 80vw;
  height: 80vh;
  max-width: 1080px;
  max-height: 800px;

  background-color: white;
  border-radius: 30px;
  z-index: 2;
}

.overlayBlur {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(102, 56, 182, 0.6);
  backdrop-filter: blur(20px);
  z-index: 1;
}

/* Formate */

.formatContainer {
  width: 70%;
  height: 80%;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin: 60px auto;

}

.format {
  text-decoration: none;
  width: 30%;
  height: 40%;
  min-width: 50px;
  text-align: center;
}

.format img {
  width: auto;
  height: 85%;
  border-radius: 30px;
  margin-bottom: 15px;
}
</style>
