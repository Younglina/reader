import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import axios from '@/utils/axios'
import noImg from '@/assets/noImg.svg'

dayjs.extend(utc)
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
    item.formatDate = dayjs.utc(item.pubDate || channel.lastBuildDate).format('YYYY-MM-DD HH:mm')
    item.isRead = false
    item.isLike = false
    item.isTag = false
    item.isNotLike = false
  })
}

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
