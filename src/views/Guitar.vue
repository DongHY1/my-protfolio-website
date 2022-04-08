<template>
  <div class="guitar">
    <video controls @timeupdate="handleUpdate">
      <source src="@/assets/Guitar/guitar.mp4" type="video/mp4" />
    </video>
  </div>
</template>

<script setup>
function handleUpdate(event) {
  console.log(event.srcElement.currentTime)
}
</script>

<style lang="scss" scoped>
.guitar {
  width: 100vw;
  height: 100vh;
  background-color: bisque;
  .player {
    width: 200px;
    height: 200px;
  }
}
</style>
