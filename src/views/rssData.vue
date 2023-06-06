<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { getRssByUrl } from '@/utils/useRss'
import noImg from '@/assets/noImg.svg'
import Loading from '@/components/Loading.vue'
import { useStore } from '@/pinia'

const store = useStore()
const route = useRoute()

const subsData = ref({})
const loading = ref(false)

watch(() => route.query, (val) => {
  const { key, uid } = val
  console.log(store.subsList[key])
  const item = store.subsList[key].child.find(item => item.uid === uid)
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
})

function errprImg(e) {
  e.target.src = noImg
}
function toPage(item) {
  window.open(item.link)
  item.isRead = true
  store.recentlyRead.unshift(item)
}
</script>

<template>
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
</template>

<style scoped lang='scss'>
.subs{
  box-sizing: border-box;
  height: 100vh;
  overflow-y: scroll;
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
