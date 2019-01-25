import Toast from './toast'

let $vm
let watcher

/* istanbul ignore next */
Toast.install = function(Vue, pluginOptions = {}) {
    if (!$vm) {
        const VuxToastPlugin = Vue.extend(Toast)

        $vm = new VuxToastPlugin({
            el: document.createElement('div')
        })
        document.body.appendChild($vm.$el)
    }

    const mergeOptions = function($vm, options) {
        const defaults = {}
        for (const i in $vm.$options.props) {
            if (i !== 'value') {
                defaults[i] = $vm.$options.props[i].default
            }
        }
        const _options = Object.assign({}, defaults, options)
        for (const i in _options) {
            $vm[i] = _options[i]
        }
    }

    const defaults = {}
    for (const i in $vm.$options.props) {
        if (i !== 'value') {
            defaults[i] = $vm.$options.props[i].default
        }
    }

    const toast = {
        show(options = {}) {
            // destroy watcher
            watcher && watcher()
            if (typeof options === 'string') {
                mergeOptions($vm, Object.assign({}, pluginOptions, { text: options }))
            } else if (typeof options === 'object') {
                mergeOptions($vm, Object.assign({}, pluginOptions, options))
            }
            if ((typeof options === 'object' && options.onShow) || options.onHide) {
                watcher = $vm.$watch('show', val => {
                    val && options.onShow && options.onShow($vm)
                    val === false && options.onHide && options.onHide($vm)
                })
            }
            $vm.show = true
        },
        hide() {
            $vm.show = false
        }
    }

    if (!Vue.$vuxToast) {
        Vue.$vuxToast = toast
    }

    Vue.mixin({
        created() {
            this.$vuxToast = Vue.$vuxToast
        }
    })
}

export default Toast
