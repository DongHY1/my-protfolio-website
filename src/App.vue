<script setup>
import "@/assets/base.css";
import { ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
let scale = ref(0.6);
function move(e) {
  let item = e.target;
  let itemRect = item.getBoundingClientRect();
  let offset = Math.abs(e.clientX - itemRect.left) / itemRect.width;

  let prev = item.previousElementSibling || null;
  let next = item.nextElementSibling || null;
  // resetScale() li.style.setProperty('--scale', 1)
  // 给li 设置style属性 '--scale'
  scale.value = 1;
  if (prev) {
    prev.style.setProperty("--scale", 1 + scale.value * Math.abs(offset - 1));
  }
  item.style.setProperty("--scale", 1 + scale.value);
  if (next) {
    next.style.setProperty("--scale", 1 + scale.value * offset);
  }
}
function leave(e) {
  let item = e.target;
  item.style.setProperty("--scale", 1);
}
</script>

<template>
  <div class="app">
    <router-view></router-view>
    <div class="glass">
      <ul class="dock">
        <li
          @mousemove="move"
          @mouseleave="leave"
          @click="router.replace({ path: '/guitar' })"
        >
          🎸
        </li>
        <li
          @mousemove="move"
          @mouseleave="leave"
          @click="router.replace({ path: '/piano' })"
        >
          🎹
        </li>
        <li
          @mousemove="move"
          @mouseleave="leave"
          @click="router.replace({ path: '/drum' })"
        >
          🥁
        </li>
        <li
          @mousemove="move"
          @mouseleave="leave"
          @click="router.replace({ path: '/camera' })"
        >
          🎦
        </li>
        <li
          @mousemove="move"
          @mouseleave="leave"
          @click="router.replace({ path: '/fox' })"
        >
          🦊
        </li>
        <li
          @mousemove="move"
          @mouseleave="leave"
          @click="router.replace({ path: '/home' })"
        >
          🌏
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss">
.app {
  width: 210vh;
}
.glass {
  width: 100%;
  height: 8rem;
  background: rgba(133, 130, 130, 0.25);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
  backdrop-filter: blur(4px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  justify-content: center;
  .dock {
    --scale: 1;
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .dock li {
    font-size: calc(6rem * var(--scale));
    padding: 0 0.5rem;
    cursor: pointer;
    position: relative;
    top: calc((6rem * var(--scale) - 6rem) / 2 * -1);
    transition: 15ms all ease-out;
  }
}
</style>
