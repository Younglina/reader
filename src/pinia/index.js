import { defineStore } from 'pinia'

// import { v4 as uuidv4 } from 'uuid'

export const useStore = defineStore('store', {
  state: () => {
    return {
      subsList: {},
      recentlyRead: [],
    }
  },
  actions: {
    setSubsList() {
      const localReader = localStorage.getItem('rss-reader')
      if (localReader) {
        const { subsList, recentlyRead } = JSON.parse(localReader)
        this.subsList = subsList
        this.recentlyRead = recentlyRead
      }
      else {
        this.subsList = { 知乎: { isOpen: true, child: [{ title: '知乎日报', url: 'zhihu/daily', parentType: '知乎', uid: '748acb2d-3784-460b-9485-66e13baffec6' }, { title: '知乎热榜', url: 'zhihu/hotlist', parentType: '知乎', uid: '13306c81-0038-4512-b933-a0caaf5da8b3' }], uid: 'c4ce4d4a-e006-4ec9-b7e6-c825d39b4a8e' }, 豆瓣: { isOpen: true, child: [{ title: '超过8分电影', url: 'douban/movie/playing/8', parentType: '豆瓣', uid: '7f760be3-9e01-46b1-be4e-905bdbbaa631' }, { title: '即将上映', url: 'douban/movie/later', parentType: '豆瓣', uid: 'de93b559-2b14-4f43-8033-1a9f9771d8b5' }, { title: '周口碑榜', url: 'douban/movie/weekly', parentType: '豆瓣', uid: 'ccf8d6e3-7cdc-4d2f-8486-c5d567fcad1d' }], uid: '262eb34c-1423-49df-87f1-f99b98cf41a7' }, 今日热榜: { isOpen: true, child: [{ title: '今日头条', url: 'tophub/x9ozB4KoXb', parentType: '今日热榜', uid: 'a93f8d13-fb67-4b5a-92a4-a5ddbd7cae88' }, { title: '澎湃热榜', url: 'tophub/wWmoO5Rd4E', parentType: '今日热榜', uid: 'a0232ee6-5afa-430d-86f5-6e04d4055d85' }, { title: '百度热榜', url: 'tophub/Jb0vmloB1G', parentType: '今日热榜', uid: '9da228d1-7c03-4248-85a7-6e5c37897145' }, { title: '微博热搜', url: 'tophub/KqndgxeLl9', parentType: '今日热榜', uid: '1dbdd2ca-8598-4086-837c-094dc7e62499' }, { title: 'A姐分享', url: 'abskoop', parentType: '今日热榜', uid: 'b2aeccd6-3e45-48e3-b769-f3691201f037' }], uid: '0e436590-31d2-4e2c-bbc5-1d4814bfc50a' }, IT: { isOpen: true, child: [{ title: 'V2EX', url: 'v2ex/topics/latest', parentType: 'IT', uid: 'b1db6cfa-8f3f-4a81-840b-8950691e269d' }, { title: '早早聊技术干货', url: 'zaozao/article/quality', parentType: 'IT', uid: 'f5e88c0d-5713-499c-9c09-335d1745a5e1' }, { title: '掘金前端周榜', url: 'juejin/trending/frontend/weekly', parentType: 'IT', uid: '32d0de8d-0a52-439b-9c54-3f181e91b256' }, { title: '掘金前端月榜', url: 'juejin/trending/frontend/monthly', parentType: 'IT', uid: '2ce0bef0-0c4f-442c-9ad4-7b76943c1198' }], uid: 'd1d3dff0-f7b6-49d4-b545-9ab5abef8049' } }
        localStorage.setItem('rss-reader', JSON.stringify({ subsList: this.subsList, recentlyRead: [] }))
      }
    },

  },
})
