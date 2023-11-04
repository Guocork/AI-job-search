//此文件夹用来封装网络请求方法
import request from '@/utils/service';

export function selectJobListApi(params) {
    return request({
        url: '/analyst/position/',
        method: 'get',
        data: params
    })
}
