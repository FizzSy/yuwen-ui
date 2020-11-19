import { Button,Input } from 'element-ui';
import TglButton from './TglButton'
import TglInput from './TglInput'
// 存储组件列表
const components = [
    TglButton,
    TglInput
]
// 定义 install 方法，接收 Vue 作为参数。如果使用 use 注册插件，则所有的组件都将被注册
const install = function(Vue){
    // 判断是否安装
    if(install.installed) return;
    // 遍历注册全局组件
    components.map(component => Vue.component(component.name,component))
    Vue.use(Button)
    Vue.use(Input)
}
// 判断是否是直接引入文件
if(typeof window !== 'undefined' && window.vue){
    install(window.vue)
}

export default {
    install,
    ...components
}