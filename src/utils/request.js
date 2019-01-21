// import Vue from 'vue'
import axios from 'axios'
// import store from '../store'
import { getToken } from '@/utils/storage'
import configs from '@/configs'

const pending = [] // 声明一个数组用于存储每个ajax请求的取消函数和ajax标识
const CancelToken = axios.CancelToken
const removePending = config => {
    for (const p in pending) {
        if (pending[p].u === config.url + '&' + config.method) {
            // 当当前请求在数组中存在时执行函数体
            pending[p].f() // 执行取消操作
            pending.splice(p, 1) // 把这条记录从数组中移除
        }
    }
}

// 创建axios实例
const service = axios.create({
    baseURL: configs.baseURL, // api的base_url,
    retry: 3, // 重试次数
    retryDelay: 1000 // 重试间隔
})

// request拦截器
service.interceptors.request.use(
    config => {
        if (getToken()) {
            config.headers['QN-ACCESS-TOKEN'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
        }

        removePending(config) // 在一个ajax发送前执行一下取消操作
        config.cancelToken = new CancelToken(c => {
            // 这里的ajax标识我是用请求地址&请求方式拼接的字符串，当然你可以选择其他的一些方式
            pending.push({ u: config.url + '&' + config.method, f: c })
        })

        return config
    },
    error => {
        // Do something with request error
        console.log(error) // for debug
        Promise.reject(error)
    }
)

// response 拦截器
service.interceptors.response.use(
    response => {
        /**
         * code为非0是抛错 可结合自己业务进行修改
         */
        const res = response.data
        const config = response.config

        removePending(config)

        if (res.code !== 0) {
            /* // 统一提示
            Vue.$vux.toast.text(res.error_message)

            // 666:非法的token
            if (res.code === 666) {
                Vue.$vux.alert.show({
                    title: '确定登出',
                    content: '你已被登出，请重新登录',
                    onHide() {
                        store.dispatch('FedLogOut').then(() => {
                            location.reload() // 为了重新实例化vue-router对象 避免bug
                        })
                    }
                })
            } */
            return Promise.reject(res.error_message)
        } else {
            return res.data
        }
    },
    error => {
        console.log('err' + error) // for debug
        // Vue.$vux.toast.text(error.error_message)
        return Promise.reject(error)
    }
)

export default service
