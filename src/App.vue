<template>
    <div id="app">
        <router-view v-title="title"></router-view>
    </div>
</template>

<script>
export default {
    name: 'App',
    data() {
        return {
            title: ''
        }
    },
    methods: {
        setTitle(t) {
            document.title = t
            var i = document.createElement('iframe')
            i.src = '//m.baidu.com/favicon.ico'
            i.style.display = 'none'
            i.onload = function() {
                setTimeout(function() {
                    i.remove()
                }, 9)
            }
            document.body.appendChild(i)
        }
    },
    watch: {
        $route: {
            handler: function(route) {
                if (route.path === '/login') {
                    this.$nextTick(() => {
                        this.setTitle(route.meta.title)
                    })
                } else {
                    this.title = route.meta.title
                }
            },
            immediate: true
        }
    }
}
</script>

<style lang="less">
@import "~vux/src/styles/reset.less";

body {
    background-color: #fbf9fe;
}
</style>
