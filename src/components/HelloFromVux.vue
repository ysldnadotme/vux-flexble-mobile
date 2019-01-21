<template>
    <div>
        <div class="vux-demo">
            <img class="logo" src="../assets/vux_logo.png">
            <h1>Welcome to use amfe-flexble</h1>
        </div>
        <group title="cell demo">
            <cell title="VUX" value="cool" is-link></cell>
        </group>
    </div>
</template>

<script>
import { Group, Cell } from 'vux'

export default {
    components: {
        Group,
        Cell
    },
    data() {
        return {
            // note: changing this line won't causes changes
            // with hot-reload because the reloaded component
            // preserves its current state and we are modifying
            // its initial state.
            msg: 'Hello World!'
        }
    }
}
</script>

<style scoped>
.vux-demo {
    text-align: center;
}
.logo {
    width: 100px;
    height: 100px;
}

h1 {
    letter-spacing: 1px;
    border: 1px solid;
    border-right: 2px solid;
}
</style>
