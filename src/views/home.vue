<script setup>
import { ref } from 'vue'
import { getRssByType } from '@/utils/useRss'

const subsData = ref({})
const subsList = ['zhihu', 'cctv', 'sspai', 'huxiu']

function changeType(item) {
  getRssByType(item).then((res) => {
    console.log(res)
    subsData.value = res
  })
}
</script>

<template>
  <div>
    <div v-for="item in subsList" :key="item" @click="changeType(item)">
      {{ item }}
    </div>
  </div>
  <div class="subs">
    <div class="subs-title">
      {{ subsData.title }}
    </div>
    <div class="subs-desc">
      {{ subsData.description }}
    </div>
    <div v-for="item in subsData.item" :key="item.link" class="dataList">
      <div class="dataList-image">
        <img v-if="item.image" :src="item.image" alt="头图">
      </div>
      <div class="dataList-content">
        <div class="dataList-title">
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
</template>

<style lang="scss" scoped>
.subs{
  &-title{
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 10px;
  }
  &-desc{
    font-size: 14px;
    color: #9e9e9e;
  }
  .dataList{
    display: flex;
    gap: 20px;
    padding: 12px;
    margin-bottom: 20px;
    max-width: 620px;
    &-content{
      flex: 1;
    }
    &-title{
      font-size: 16px;
      font-weight: bold;
    }
    &-image{
      width: 10rem;
      border-radius: 2px;
      img{
        width: 100%;
        aspect-ratio: 16/9;
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
