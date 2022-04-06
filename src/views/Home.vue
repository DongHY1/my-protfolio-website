<template>
  <div>
    <div id="popUpEl">
      <h2 id="countryEl"></h2>
      <p id="populationEl"></p>
    </div>
    <canvas id="home"></canvas>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted} from 'vue'
import { initThree } from './Home/index'
onMounted(() => {
  initThree()
})
onUnmounted(()=>{
  
})
</script>

<style lang="scss" scoped>
#home {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  z-index: -1;
}
#popUpEl {
  z-index: 999;
  // background-color: black;
  border-radius: 15px;
  color: white;
  opacity: 0.75;
  position: absolute;
  top: 0;
  left: 0;
  text-align: center;
  height: 30px;
  margin-bottom: 10px;
}

</style>
