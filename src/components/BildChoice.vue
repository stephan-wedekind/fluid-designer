<template>
 <div class="fix"></div>
 <div class="scroll">

 </div>
</template>

<script>
export default {
  name: 'BildChoice',
 
}
</script>

<style scoped>
.fix {
  width: 100%;
  height: 50px;
  position: sticky;
  top:0;
  z-index: 1;
  background-color: aqua;
}

.scroll {
  width: 100%;
  height: 100vh;
  background-color: blueviolet;
  z-index: -1;
}
</style>
