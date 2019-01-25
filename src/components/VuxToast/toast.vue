<template>
    <div>
        <div v-transfer-dom class="custom-vux-toast">
            <popup v-model="show" position="top" :show-mask="false">
                <div class="position-vertical">{{ text }}</div>
            </popup>
        </div>
    </div>
</template>

<script>
import { TransferDom, Popup } from 'vux'

export default {
    name: 'VuxToast',
    directives: {
        TransferDom
    },
    components: {
        Popup
    },
    props: {
        text: {
            type: String,
            default: ''
        },
        time: {
            type: Number,
            default: 3000
        }
    },
    data() {
        return {
            show: false,
            timer: null
        }
    },
    watch: {
        show(val) {
            if (val) {
                this.$emit('on-show')

                clearTimeout(this.timer)
                this.timer = setTimeout(() => {
                    this.show = false
                    this.$emit('on-hide')
                }, this.time)
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.vux-popup-dialog {
    background: transparent;
}
.position-vertical {
    background: hsla(0, 0%, 7%, 0.7);
    color: #fff;
    text-align: center;
    padding: 15px;
    font-size: 16px;
}
</style>


