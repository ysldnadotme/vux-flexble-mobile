// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from '@/router'
import FastClick from 'fastclick'
import App from '@/App'

import '@/styles/index.scss' // global css
// import '@/permission' // permission control

import 'amfe-flexible'

import * as directives from '@/directives' // global directives

import Toast from '@/components/VuxToast/index' // 顶部 Toast

Vue.use(Toast)

FastClick.attach(document.body)

// register global utility directives.
Object.keys(directives).forEach(key => Vue.directive(key, directives[key]))

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app-box',
    router,
    render: h => h(App)
})
