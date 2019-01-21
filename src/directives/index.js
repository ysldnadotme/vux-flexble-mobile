import Vue from 'vue'

/**
 * 设置浏览器 title
 * 必须在 router 设置 meta.title
 * 绑定在 App.vue 的 <router-view v-title="$route.meta.title"></router-view>
 */
const broswerTitle = Vue.directive('title', {
    inserted: (el, binding) => (document.title = binding.value),
    update: (el, binding) => (document.title = binding.value)
})

export { broswerTitle }
