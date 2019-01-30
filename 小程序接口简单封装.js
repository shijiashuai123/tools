// request.js
    var url = 'https://www.XXXXX.cn' //
    function fetch(option) {
        var p = new Promise((resolve, reject) => {
            var requestPar= {
            url: url + option.url,
            method: option.method,
            success(val) { return resolve(val) },
            fail(err) { return reject(err) }
            }
            requestPar.header = 'header' in option ? option.header : { 'content-type': 'application/json' }
            'data' in option ? requestPar.data = option.data : ''
            wx.request(requestPar)
        })
        return p
    }
    export default fetch
    
// api.js
    import fetch from './request.js'
    export function getList(page, pageSize) {
        return fetch({
            url: `/getList?page=${page}&pageSize=${pageSize}`,
            method: 'get'
        })
    }

// 组件中使用index.js
    import { getList } from './api.js'
    // onLoad里面获取数据
    getList(1, 20).then(res => {
        console.log(res)
    })