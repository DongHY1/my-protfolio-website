<template>
    <div class="notfound">
        <h1 class="text" @click="jumpHome">页面无法访问，点击我跳转到首页吧~</h1>
    </div>
</template>
<script setup>
import { useRouter } from "vue-router";
const router = useRouter();
function jumpHome() {
    router.replace('/home')
}
</script>
<style lang="scss">
.notfound {
    width: 100vw;
    height: 40vh;
    margin-top: 100px;
    .text {
        text-align: center;
        color: white;
        cursor: pointer;
    }

}
</style>