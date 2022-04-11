<script setup>
import "@/assets/base.css";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import moment from 'moment'
const router = useRouter();
const time = ref(moment().format('MMMM Do h:mm a'))
onMounted(() => {
  let icons = document.querySelectorAll(".ico");
  icons.forEach((item, index) => {
    item.addEventListener("mouseover", (e) => {
      focus(e.target, index);
    });
    item.addEventListener("mouseleave", (e) => {
      icons.forEach((item) => {
        item.style.transform = "scale(1)  translateY(0px)";
      });
    });
  });

  const focus = (elem, index) => {
    let previous = index - 1;
    let previous1 = index - 2;
    let next = index + 1;
    let next2 = index + 2;
    if (previous == -1) {
      elem.style.transform = "scale(1.5)  translateY(-10px)";
    } else if (next == icons.length) {
      elem.style.transform = "scale(1.5)  translateY(-10px)";
    } else {
      elem.style.transform = "scale(1.5)  translateY(-10px)";
      icons[previous].style.transform = "scale(1.2) translateY(-6px)";
      icons[previous1].style.transform = "scale(1.1)";
      icons[next].style.transform = "scale(1.2) translateY(-6px)";
      icons[next2].style.transform = "scale(1.1)";
    }
  };
})
setInterval(() => {
  time.value = moment().format('MMMM Do h:mm a')
}, 30000)
</script>

<template>
  <div class="app">
    <div class="menu-bar">
      <div class="left">
        <span class="menus active">DongHY</span>
      </div>
      <div class="right">
        <div class="menu-time">{{ time }}</div>
      </div>
    </div>
    <router-view />
    <div class="dock">
      <div class="dock-container">
        <li>
          <h1 class="ico" @click="router.push('/home')">🌏</h1>
        </li>
        <li>
          <h1 class="ico" @click="router.push('/drum')">🥁</h1>
        </li>
        <li>
          <h1 class="ico" @click="router.push('/guitar')">🎸</h1>
        </li>
        <li>
          <h1 class="ico">😄</h1>
        </li>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
*,
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
}

.menu-bar {
  width: 100%;
  height: 30px;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(83, 83, 83, 0.4);
  backdrop-filter: blur(50px);

  .left {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    width: auto;
    margin-left: 20px;

    .menus {
      height: 100%;
      display: flex;
      align-items: center;
      margin-left: 20px;
      color: rgba(255, 255, 255, 0.95);
      font-size: 14px;
    }
  }

  .right {
    display: flex;
    flex-direction: column-reverse;
    align-items: center;
    width: 380px;
    margin-right: 20px;

    .menu-time {
      height: 100%;
      width: auto;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
    }
  }
}

.dock {
  width: auto;
  height: 60px;
  border-radius: 16px;
  display: flex;
  justify-content: center;
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);

  .dock-container {
    padding: 3px;
    width: auto;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 16px;
    background: rgba(83, 83, 83, 0.25);
    backdrop-filter: blur(13px);
    border: 1px solid rgba(255, 255, 255, 0.18);

    li {
      list-style: none;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 50px;
      height: 50px;
      vertical-align: bottom;
      transition: 0.2s;
      transform-origin: 50% 100%;

      &:hover {
        margin: 0px 13px 0px 13px;
        cursor: pointer;
      }

      .ico {
        width: 100%;
        height: 80%;
        object-fit: cover;
        transition: 0.2s;
      }
    }
  }
}
</style>