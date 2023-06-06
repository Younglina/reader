<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
function handleClick(type) {
  console.log(type)
  router.push(`/${type}`)
}
</script>

<template>
  <div class="right-bar">
    <img src="@/assets/rss.svg" alt="" @click="handleClick('search')">
    <img src="@/assets/night.svg" alt="">
    <img src="@/assets/github.svg" alt="">
  </div>
</template>

<style scoped lang='scss'>
@media screen and (min-width: 1440px){
  .right-bar {
      width: 64px;
  }
}

.right-bar{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 100vh;
  background-color: #fff;
  img{
    padding: 16px;
    width: 20px;
    height: 20px;
    cursor: pointer;
  }
}
</style>
