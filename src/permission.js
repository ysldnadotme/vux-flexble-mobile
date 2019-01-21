import router from './router'
// import store from './store'
// import NProgress from 'nprogress' // progress bar
// import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/storage' // getToken from cookie

// NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist

router.beforeEach((to, from, next) => {
    // NProgress.start() // start progress bar
    if (getToken()) {
        // determine if there has token
        if (to.path === '/login') {
            next({ path: '/' })
            // NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
        } else {
            /* if (store.getters.addRouters.length === 0) {
                store
                    .dispatch('GenerateRoutes', {})
                    .then(() => {
                        // 根据roles权限生成可访问的路由表
                        router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
                        next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
                    })
                    .catch(err => {
                        store.dispatch('FedLogOut').then(() => {
                            Message.error(
                                err || 'Verification failed, please login again'
                            )
                            next({ path: '/' })
                        })
                    })
            } else {
                // 匹配路由失败跳转404
                if (!to.matched || !to.matched.length) {
                    next({
                        path: '/404',
                        replace: true,
                        query: { noGoBack: true }
                    })
                } else {
                    next()
                }
            } */

            next()
        }
    } else {
        if (whiteList.indexOf(to.path) !== -1) {
            // 在免登录白名单，直接进入
            next()
        } else {
            next(`/login?redirect=${to.path}`) // 否则全部重定向到登录页
            // NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
        }
    }
})

router.afterEach(() => {
    // NProgress.done() // finish progress bar
})
