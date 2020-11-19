<template>
    <div>
        <el-button icon="el-icon-search" class="btn" :type="type">tgl按钮</el-button>
    </div>
</template>

<script>
import 'element-ui/lib/theme-chalk/index.css';
export default {
    name: 'tgl-button',
    props: {
        type: {
            type: String,
            default: 'primary'
        }
    }
}
</script>

<style lang='scss' scoped>
.btn {
	background: red !important;
}
</style>