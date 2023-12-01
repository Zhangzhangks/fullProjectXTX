import Mock from 'mockjs'
import qs from 'qs'
var Random = Mock.Random;
const data = Mock.mock({
    "list|10-20": [{
        "id|+1": 1,
        "name": "张可顺"
    }]
})
Mock.setup({
    timeout: '10-100'
});

// axios用法
Mock.mock(/\/member\/zks/, 'post', (config) => {

    // console.log(config,'自己的数据');
    const data = []
    for (let i = 0; i < 4; i++) {
        data.push({
            picture: Random.dataImage('160x160', 'mock模拟数据'),
            id: Random.integer(1000),
            name: Random.word(3, 5),
            desc: Random.sentence(3, 5),
            price: Mock.mock('@float(1, 100, 0, 10)')  // => -1766114241544192.8
        })
    }
    return {
        "code": 200,
        "data": data
    }
});
// 普通用法
Mock.mock('http://exampleMockzks.com/zks', 'get', () => {


    const data = []
    for (let i = 0; i < 4; i++) {
        data.push({
            picture: Random.dataImage('160x160', 'mock模拟数据'),
            id: Random.integer(1000),
            name: Random.word(3, 5),
            desc: Random.sentence(3, 5),
            price: Mock.mock('@float(1, 100, 0, 10)')  // => -1766114241544192.8
        })
    }
    return {
        "code": 200,
        "data": data
    }

});



// 模拟真正的数据
// 模拟 我的收藏
Mock.mock(/\/member\/collect/, 'get', config => {
    console.log(config,'我的收藏');
    const queryString = config.url.split('?')[1]
    const queryObject = qs.parse(queryString)
    // console.log(queryObject);
    const items = []
    for (let i = 0; i < +queryObject.pageSize; i++) {
        items.push(Mock.mock({
            id: '@id',
            name: '@ctitle(10,20)',
            desc: '@ctitle(4,10)',
            price: '@float(100,200,2,2)',
            // http://zhoushugang.gitee.io/erabbit-client-pc-static/uploads/clothes_goods_7.jpg
            picture: `http://zhoushugang.gitee.io/erabbit-client-pc-static/uploads/clothes_goods_${Mock.mock('@integer(1,8)')}.jpg`
        }))
    }
    return {
        msg: '获取收藏商品成功',
        result: {
            counts: 35,
            pageSize: +queryObject.pageSize,
            page: +queryObject.page,
            items
        }
    }
})