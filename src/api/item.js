import { get } from "./index";


// 获取歌单详情页的数据
export function getMusicItemList(data) {
  return get(`/playlist/detail?id=${data}`)
}
 
// 获取歌单全部歌曲的数据
export function getItemList(data) {
  return get(`/playlist/track/all?id=${data}&limit=20&offset=0`)
}

//获取歌曲URL
export function getMusicUrl(data) {
  return get(`/song/url?id=${data}`)
}
 
//获取歌词的数据
export function getMusicLyric(data) {
  return get(`/lyric?id=${data}`)
}

