import dayjs from 'dayjs'
import axios from '@/utils/axios'
import noImg from '@/assets/noImg.svg'

function formatData(channel) {
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
}

export const SubsList = [
  { title: '知乎日报', url: 'zhihu/daily', parentType: '知乎' },
  { title: '知乎热榜', url: 'zhihu/hotlist', parentType: '知乎' },
  { title: '超过8分电影', url: 'douban/movie/playing/8', parentType: '豆瓣' },
  { title: '即将上映', url: 'douban/movie/later', parentType: '豆瓣' },
  { title: '周口碑榜', url: 'douban/movie/weekly', parentType: '豆瓣' },
  { title: '今日头条', url: 'tophub/x9ozB4KoXb', parentType: '今日热榜' },
  { title: '澎湃热榜', url: 'tophub/wWmoO5Rd4E', parentType: '今日热榜' },
  { title: '百度热榜', url: 'tophub/Jb0vmloB1G', parentType: '今日热榜' },
  { title: '微博热搜', url: 'tophub/KqndgxeLl9', parentType: '今日热榜' },
  { title: 'A姐分享', url: 'abskoop', parentType: '今日热榜' },
  { title: 'V2EX', url: 'v2ex/topics/latest', parentType: 'IT' },
  { title: '早早聊技术干货', url: 'zaozao/article/quality', parentType: 'IT' },
  { title: '掘金前端周榜', url: 'juejin/trending/frontend/weekly', parentType: 'IT' },
  { title: '掘金前端月榜', url: 'juejin/trending/frontend/monthly', parentType: 'IT' },
  { title: '周排行', url: 'pixiv/ranking/week', parentType: 'pixiv' },
  { title: 'r18日排行', url: 'pixiv/ranking/day_r18', parentType: 'pixiv' },
  { title: 'r18周排行', url: 'pixiv/ranking/week_r18', parentType: 'pixiv' },
]
export function getRssByUrl(url) {
  return new Promise((resolve, reject) => {
    try {
      axios.get(url).then((res) => {
        console.log(res, 'rss res')
        const { rss: { channel } } = res
        formatData(channel)
        resolve(channel)
      })
    }
    catch (e) {
      console.error(e)
      reject(e)
    }
  })
}
