import request from "@/utils/request"

// 品牌数据
export const findBrand = (limit = 6) => {
    return request('/home/brand', 'get', { limit })
}
/**
 * 获取广告图
 * @returns Promise
 */
export const findBanner = () => {
    return request('/home/banner', 'get')
}
// 新鲜好物
export const findNew = () => {
    return request('home/new', 'get')
}
// 人气推荐
export const findHot = () => {
    return request('home/hot', 'get')
}
// 产区区块
export const findGoods = () => {
    return request('home/goods', 'get')
}

// 最新专题
export const findSpecial = () => {
    return request('home/special', 'get')
}