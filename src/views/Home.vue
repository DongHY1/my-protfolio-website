<template>
  <div>
    <div id="popUpEl">
      <h2 id="countryEl">中国</h2>
      <p id="populationEl">14亿人</p>
    </div>
    <div id="home"></div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { initThree } from './Home/index'
onMounted(() => {
  initThree()
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
  background-color: black;
  border-radius: 15px;
  color: white;
  opacity: 0.75;
  position: absolute;
  top: 0;
  left: 0;
  text-align: center;
}
</style>
