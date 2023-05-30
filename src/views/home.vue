<script setup>
import { computed, ref } from 'vue'
import { SubsList, getRssByUrl } from '@/utils/useRss'
import noImg from '@/assets/noImg.svg'
import Loading from '@/components/Loading.vue'

const subsData = ref({})
const loading = ref(false)
const showList = computed(() => {
  const listMap = ref({})
  SubsList.forEach((item) => {
    if (listMap.value[item.parentType])
      listMap.value[item.parentType].child.push(item)

    else
      listMap.value[item.parentType] = { isOpen: true, child: [item] }
  })
  return listMap.value
})
function getRss(url) {
  loading.value = true
  getRssByUrl(url).then((res) => {
    console.log(res)
    subsData.value = res
    loading.value = false
  }).catch((e) => {
    console.error(e)
    loading.value = false
  })
}

function errprImg(e) {
  console.log(e)
  e.target.src = noImg
}
function toggleUl(key) {
  console.log(showList, key)
  showList.value[key].isOpen = !showList.value[key].isOpen
}

function toPage(link) {
  window.open(link)
}
</script>

<template>
  <div class="lists-subs">
    <div class="lists">
      <ul v-for="(v, key) in showList" :key="key">
        <li class="lists-classify" @click="toggleUl(key)">
          <img :style="{ transform: `rotate(${v.isOpen ? '0' : '-90deg'})`, transition: 'all 0.3s' }" src="../assets/down.svg">
          <span>{{ key }}</span>
        </li>
        <div :style="{ height: v.isOpen ? `${34 * v.child.length}px` : '0px', transition: 'all 0.3s' }">
          <li v-for="item in v.child" :key="item.url" class="lists-item" @click="getRss(item.url)">
            {{ item.title }}
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
      <div v-for="item in subsData.item" :key="item.link" class="dataList" @click="toPage(item.link)">
        <div class="dataList-image">
          <img v-if="item.image" :src="item.image" alt="头图" @error="errprImg">
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
    <Loading v-else />
  </div>
</template>

<style lang="scss" scoped>
.lists-subs{
  display: flex;
}
.lists, .subs{
  box-sizing: border-box;
  height: 100vh;
  overflow-y: scroll;
}
.lists{
  padding: 28px;
  flex: 0 0 338px;
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
    padding: 6px 0 6px 46px;
  }
}
.subs{
  padding: 50px 0 28px;
  width: 100%;
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
