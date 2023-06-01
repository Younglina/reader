import { defineStore } from 'pinia'

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
        this.subsList = {
          知乎: {
            isOpen: true,
            child: [
              {
                title: '知乎日报',
                url: 'zhihu/daily',
                parentType: '知乎',
              },
              {
                title: '知乎热榜',
                url: 'zhihu/hotlist',
                parentType: '知乎',
              },
            ],
          },
          豆瓣: {
            isOpen: true,
            child: [
              {
                title: '超过8分电影',
                url: 'douban/movie/playing/8',
                parentType: '豆瓣',
              },
              {
                title: '即将上映',
                url: 'douban/movie/later',
                parentType: '豆瓣',
              },
              {
                title: '周口碑榜',
                url: 'douban/movie/weekly',
                parentType: '豆瓣',
              },
            ],
          },
          今日热榜: {
            isOpen: true,
            child: [
              {
                title: '今日头条',
                url: 'tophub/x9ozB4KoXb',
                parentType: '今日热榜',
              },
              {
                title: '澎湃热榜',
                url: 'tophub/wWmoO5Rd4E',
                parentType: '今日热榜',
              },
              {
                title: '百度热榜',
                url: 'tophub/Jb0vmloB1G',
                parentType: '今日热榜',
              },
              {
                title: '微博热搜',
                url: 'tophub/KqndgxeLl9',
                parentType: '今日热榜',
              },
              {
                title: 'A姐分享',
                url: 'abskoop',
                parentType: '今日热榜',
              },
            ],
          },
          IT: {
            isOpen: true,
            child: [
              {
                title: 'V2EX',
                url: 'v2ex/topics/latest',
                parentType: 'IT',
              },
              {
                title: '早早聊技术干货',
                url: 'zaozao/article/quality',
                parentType: 'IT',
              },
              {
                title: '掘金前端周榜',
                url: 'juejin/trending/frontend/weekly',
                parentType: 'IT',
              },
              {
                title: '掘金前端月榜',
                url: 'juejin/trending/frontend/monthly',
                parentType: 'IT',
              },
            ],
          },
        }
        localStorage.setItem('rss-reader', JSON.stringify({ subsList: this.subsList, recentlyRead: [] }))
      }
    },

  },
})
