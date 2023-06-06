<script setup>
import { ref } from 'vue'
import { getRssByUrl } from '@/utils/useRss'

const rssHref = ref('')
const searching = ref(false)
const searchError = ref('')
const serachData = ref({})
async function serachRss() {
  if (!rssHref.value)
    return
  searching.value = true
  try {
    const data = await getRssByUrl(rssHref.value)
    serachData.value = data
    console.log(data)
    searching.value = false
  }
  catch (e) {
    searching.value = false
    searchError.value = e.message
  }
}
</script>

<template>
  <div class="rss-search">
    <h2>查找并订阅你的网站</h2>
    <div class="description">
      <p>所有rss源都来源于：<a href="https://docs.rsshub.app/">rsshub</a></p>
      <p>找到你需要订阅的地址如：<a href="https://docs.rsshub.app/social-media.html#zhi-hu">知乎热榜</a></p>
      <p>只需要复制 zhihu/hotlist 到下面输入框即可</p>
    </div>
    <div class="rss-input">
      <input v-model="rssHref" @keydown.enter="serachRss">
      <div @click="serachRss">
        搜索
      </div>
    </div>
    <div v-if="serachData.title" class="search-data">
      <div>{{ serachData.title }}</div>
      <div class="search-desc">
        {{ serachData.description }}
      </div>
      <ul class="data-item">
        <li v-for="item in serachData.item.slice(0, 3)" :key="item.title">
          {{ item.title }}
        </li>
      </ul>
    </div>
    <div v-if="searching" class="loader">
      <svg
        id="loader-1" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
        width="40px" height="40px" viewBox="0 0 50 50" style="enable-background:new 0 0 50 50;" xml:space="preserve"
      >
        <path fill="#000" d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z">
          <animateTransform
            attributeType="xml"
            attributeName="transform"
            type="rotate"
            from="0 25 25"
            to="360 25 25"
            dur="0.6s"
            repeatCount="indefinite"
          />
        </path>
      </svg>
    </div>
    <div v-if="searchError">
      {{ searchError }}
    </div>
  </div>
</template>

<style scoped lang='scss'>
.rss-search{
  flex: 1;
  padding: 38px 30px 12px 78px;
  .description{
    color: #9e9e9e;
    font-size: 14px;
  }
}
.rss-input {
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  input{
    appearance: none;
    background-color: rgba(0,0,0,0);
    border-width: 0;
    color: #333;
    font-size: 1rem;
    line-height: normal;
    margin: 0;
    outline: 0;
    padding: 0.5rem 0.75rem;
    transition: color .1s ease, border-color .1s ease;
    width: 100%;
  }
  div{
    border-left: 1px rgba(0,0,0,.15) solid;
    text-align: center;
    cursor: pointer;
    color: #9e9e9e;
    font-size: .875rem;
    font-weight: 500;
    padding: 0.5rem 0.75rem;
    height: 100%;
    min-width: 38px;
  }
}

.search-data{
  border: 1px solid rgba(0,0,0,.15);
  border-radius: 0.25rem;
  margin-bottom: 1rem;
  max-width: 600px;
  margin-top: 30px;
  padding: 1.5rem;
  .search-desc{
    color: #757575;
    font-size: 0.9rem;
    margin: 10px 0;
  }
  .data-item{
    color: #757575;
    list-style-position: inside;
    padding-left: 0;
    font-size: 0.85rem;
    margin-top: 12px;
    li{
      max-width: 450px;
      overflow-x: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
.loader{
  margin-top: 20px;
}
svg path,
svg rect{
  fill: #FF6700;
}
</style>
