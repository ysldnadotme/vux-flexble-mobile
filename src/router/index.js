import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export const constantRouterMap = [
    {
        path: '/',
        name: 'HelloWorld',
        component: () => import('@/components/HelloWorld'),
        meta: {
            title: 'Home'
        }
    }
]

export default new Router({
    routes: constantRouterMap
})
