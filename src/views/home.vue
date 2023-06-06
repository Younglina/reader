<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import RightBar from './rightBar.vue'
import { useStore } from '@/pinia'

const store = useStore()
store.setSubsList()
store.$subscribe((mutation, state) => {
  console.log(mutation)
  // 每当它发生变化时，将整个状态持久化到本地存储
  localStorage.setItem('rss-reader', JSON.stringify(state))
})

const showList = computed(() => store.subsList)

function toggleUl(key) {
  console.log(showList, key)
  store.subsList[key].isOpen = !store.subsList[key].isOpen
}

const router = useRouter()
function getRss(item) {
  router.push(`/rssData/?id=${item.uid}`)
}
</script>

<template>
  <div class="lists-subs">
    <RightBar />
    <div class="lists">
      <ul v-for="(v, key) in showList" :key="key">
        <li class="lists-classify" @click="toggleUl(key)">
          <img :style="{ transform: `rotate(${v.isOpen ? '0' : '-90deg'})`, transition: 'all 0.3s' }" src="@/assets/down.svg">
          <span>{{ key }}</span>
        </li>
        <div :style="{ height: v.isOpen ? `${34 * v.child.length}px` : '0px', transition: 'all 0.3s' }">
          <li v-for="item in v.child" :key="item.url" class="lists-item" @click="getRss(item)">
            <span>{{ item.title }}</span>
            <span>{{ item.subsData?.item.length }}</span>
          </li>
        </div>
      </ul>
    </div>
    <router-view />
  </div>
</template>

<style lang="scss" scoped>
html,body, ul{
  padding: 0;
  margin: 0;
}
ul{
  list-style: none;
}

::-webkit-scrollbar{width:8px}
::-webkit-scrollbar-thumb{border-radius:3px;background-color:#eee}
::-webkit-scrollbar-thumb:hover{background-color:#ccc}
.lists-subs{
  display: flex;
}
.lists-subs{
  overflow-x: auto;
}
.lists, .subs{
  box-sizing: border-box;
  height: 100vh;
  overflow-y: scroll;
}
.lists{
  padding: 28px;
  flex: 0 0 15vw;
  min-width: 300px;
  overflow-x: hidden;
  background-color: #f6f7f8;
  ul{
    overflow: hidden;
  }
  li{
    cursor: pointer;
  }
  ul,li{
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  &-classify{
    display: flex;
    align-items: center;
    padding: 6px 0 ;
    img{
      width: 14px;
      height: 14px;
    }
    span{
      padding-left: 22px;
    }
  }
  &-item{
    display: flex;
    justify-content: space-between;
    padding: 6px 0 6px 46px;
  }
}
</style>
