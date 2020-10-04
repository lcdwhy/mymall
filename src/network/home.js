import {request} from './request'

//首页数据-（轮播图、分类推荐）请求
export function getHomeMultidata(){
    return request({
        url: '/home/multidata'
    })
}

//首页数据-（流行、新款、精选）
export function getHomeGoods(type, page){
    return request({
        url: '/home/data',
        params: {
            type,
            page
        }
    })
}