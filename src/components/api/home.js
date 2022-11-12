import { get } from "./index"
//获取首页轮播图的数据
export function getBanner() {
    return get("/banner?type=2")
}