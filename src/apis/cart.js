import request from '@/utils/request'

/**
 * 获取新的商品信息
 * @param {String} skuId - 商品SKUID
 * @returns Promise
 */
export const getNewCartGoods = (skuId) => {
    return request(`/goods/stock/${skuId}`, 'get')
}
/**
 * 获取商品的specs和skus
 * @param {String} skuId - 商品SKUID
 * @returns Promise
 */
export const getSpecsAndSkus = (skuId) => {
    return request(`/goods/sku/${skuId}`, 'get')
}
/**
 * 合并本地购物车
 * @param {Array<object>} cartList - 本地购物车数组
 * @param {String} item.skuId - 商品SKUID
 * @param {Boolean} item.selected - 是否选中
 * @param {Integer} item.count - 数量
 */
export const mergeLocalCart = (cartList) => {
    return request('/member/cart/merge', 'post', cartList)
}
/**
 * 获取登录后的购物车列表
 * @returns Promise
 */
export const findMergeCloudList = () => {
    return request('/member/cart', 'get')
}

/**
 * 加入购物车
 * @param {String} skuId - 商品SKUID
 * @param {Integer} count - 商品数量
 * @returns Promise
 */
export const insertCart = ({ skuId, count }) => {
    return request('/member/cart', 'post', { skuId, count })
}

/**
 * 删除商品（支持批量删除）
 * @param {Array<string>} ids - skuId集合
 * @returns Promise
 */
export const deleteCarts = (ids) => {
    return request('/member/cart', 'delete', { ids })
}


/**
 * 修改购物车商品的状态和数量
 * @param {String} goods.skuId - 商品sku
 * @param {Boolean} goods.selected - 选中状态
 * @param {Integer} goods.count - 商品数量
 * @returns Promise
 */
export const updateCartApi = (goods) => {
    return request('/member/cart/' + goods.skuId, 'put', goods)
}