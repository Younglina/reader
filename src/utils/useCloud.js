import AV from 'leancloud-storage'

AV.init({
  appId: import.meta.env.VITE_APPID,
  appKey: import.meta.env.VITE_APPKEY,
  serverURL: import.meta.env.VITE_SERVERURL,
})
