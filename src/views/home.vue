<script setup>
import { computed, ref } from 'vue'
import { getRssByUrl } from '@/utils/useRss'
import { useStore } from '@/pinia'
import noImg from '@/assets/noImg.svg'
import Loading from '@/components/Loading.vue'

const store = useStore()
store.setSubsList()
store.$subscribe((mutation, state) => {
  console.log(mutation)
  // 每当它发生变化时，将整个状态持久化到本地存储
  localStorage.setItem('rss-reader', JSON.stringify(state))
})

const subsData = ref({})
const loading = ref(false)
const showList = computed(() => store.subsList)
function getRss(item) {
  loading.value = true
  getRssByUrl(item.url).then((res) => {
    console.log(res, item)
    if (item.subsData) {
      const last = res.item.at(-1)
      const isLastInSubs = item.subsData.item.find(s => s.title === last.title && s.formatDate === last.formatDate)
      if (!isLastInSubs) {
        item.subsData.item = [...res.item, ...item.subsData.item]
      }
      else {
        const first = item.subsData.item[0]
        const firstIdx = res.item.findIndex(s => s.title === first.title && s.formatDate === first.formatDate)
        item.subsData.item = [...res.item.slice(0, firstIdx), ...item.subsData.item]
      }
    }
    else {
      item.subsData = res
    }
    subsData.value = item.subsData
    loading.value = false
  }).catch((e) => {
    console.error(e)
    loading.value = false
  })
}

function errprImg(e) {
  e.target.src = noImg
}
function toggleUl(key) {
  console.log(showList, key)
  store.subsList[key].isOpen = !store.subsList[key].isOpen
}

function toPage(item) {
  window.open(item.link)
  item.isRead = true
  store.recentlyRead.unshift(item)
}
</script>

<template>
  <div class="lists-subs">
    <div class="right-bar">
      <img src="@/assets/rss.svg" alt="">
      <img src="@/assets/night.svg" alt="">
      <img src="@/assets/github.svg" alt="">
    </div>
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
    <div v-if="!loading" class="subs">
      <div class="subs-title">
        {{ subsData.title }}
      </div>
      <div class="subs-desc">
        {{ subsData.description }}
      </div>
      <div v-for="item in subsData.item" :key="item.link" class="dataList">
        <div class="dataList-image">
          <img v-if="item.image" :src="item.image" alt="头图" @error="errprImg">
        </div>
        <div class="dataList-content">
          <div class="dataList-title" @click="toPage(item)">
            {{ item.title }}
          </div>
          <div class="dataList-date">
            {{ item.formatDate }}
          </div>
          <div class="dataList-shortdesc">
            {{ item.shortDesc }}
          </div>
        </div>
      </div>
    </div>
    <Loading v-else />
  </div>
</template>

<style lang="scss" scoped>
@media screen and (min-width: 1440px){
  .right-bar {
      width: 64px;
  }
}
.lists-subs, .right-bar{
  display: flex;
}
.lists-subs{
  overflow-x: auto;
}
.right-bar{
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
.subs{
  padding: 50px 0 28px;
  width: 100%;
  min-width: 588px;
  &-title,&-desc,.dataList{
    padding-left: 78px;
    padding-right: 30px;
  }
  &-title{
    font-size: 28px;
    font-weight: bold;
    margin-bottom: 12px;
  }
  &-desc{
    font-size: 14px;
    border-bottom: 1px solid #f5f6f7;
    padding-bottom: 20px;
    margin-bottom: 20px;
    color: #9e9e9e;
  }
  .dataList{
    display: flex;
    gap: 20px;
    padding: 12px 30px 12px 78px;
    margin-bottom: 20px;
    max-width: 620px;
    &-content{
      flex: 1;
    }
    &-title{
      font-size: 16px;
      font-weight: bold;
      cursor: pointer;
    }
    &-image{
      width: 6rem;
      height: 6rem;
      text-align: center;
      img{
        width: auto;
        height: auto;
        max-width: 100%;
        max-height: 100%;
        border-radius: 4px;
      }
    }
    &-shortdesc, &-date{
      font-size: 12px;
      color: #9e9e9e;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
      display: -webkit-box;
      overflow: hidden;
      line-height: 18px;
      margin-bottom: 0;
      margin-top: 10px;
      word-break: break-word;
    }
  }
}
</style>
