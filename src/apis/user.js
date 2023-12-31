import request from '@/utils/request'

/**
 * 帐号登录
 * @param {String} account - 用户名
 * @param {String} password - 密码
 * @returns Promise
 */
export const userAccountLogin = ({ account, password }) => {
    return request('/login', 'post', { account, password })
}

/**
 * 短信登录
 * @param {String} mobile - 手机号
 * @param {String} code - 验证码
 * @returns Promise
 */
export const userMobileLogin = ({ mobile, code }) => {
    return request('/login/code', 'post', { mobile, code })
}

/**
 * 获取短信登录验证码
 * @param {String} mobile - 手机号
 * @returns Promise
 */
export const userMobileLoginMsg = (mobile) => {
    return request('/login/code', 'get', { mobile })
}

/**
 * 第三方登录
 * @param {String} unionId - 第三方登录唯一标识
 * @param {Integer} source - 来源 1为pc，2为webapp，3为微信小程序，4为Android，5为ios,6为qq,7为微信
 * @returns Promise
 */
export const userQQLogin = (unionId, source = 6) => {
    return request('/login/social', 'post', { unionId, source })
}


/**
    qq绑定的手机验证码

 * @returns Promise
 */
export const userQQBind = (mobile,) => {
    return request('/login/social/code', 'get', { mobile })
}

/**
    qq绑定账号

 * @returns Promise
 */
export const userQQBindLogin = ({ unionId, mobile, code }) => {
    return request('/login/social/bind', 'post', { unionId, mobile, code })
}