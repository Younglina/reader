<script setup>
import dayjs from 'dayjs'
import { getZhihuDaily } from '@/api/zhihu'
import noImg from '@/assets/noImg.svg'

const { rss: { channel } } = getZhihuDaily()
const regex = /<img.*?src="(.*?)".*?>/i
const parser = new DOMParser()
channel.item.forEach((item) => {
  const htmlString = item.description
  const doc = parser.parseFromString(htmlString, 'text/html')
  const match = htmlString.match(regex)
  item.image = match !== null ? match[1] : noImg
  item.shortDesc = doc.documentElement.innerText
  // item.diffDate = dayjs(item.pubDate).diff(new Date(), 'day')
  item.formatDate = dayjs(item.pubDate).format('YYYY-MM-DD HH:mm')
})
</script>

<template>
  <div class="subs">
    <div class="subs-title">
      {{ channel.title }}
    </div>
    <div class="subs-desc">
      {{ channel.description }}
    </div>
    <div v-for="item in channel.item" :key="item.link" class="dataList">
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
