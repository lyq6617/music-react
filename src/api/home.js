import { get } from "./index"
//获取首页轮播图的数据
export function getBanner() {
    return get("/banner?type=2")
}

// 获取发现好歌单的数据
export function getMusicList() {
    return get("/personalized/newsong=10")
}
  
//搜索
export function getSearchMusic(data) {
    return get(`/search?keywords=${data}`)
  }