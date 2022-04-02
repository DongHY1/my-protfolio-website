<template>
  <div id="home">
   
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
}
</style>
