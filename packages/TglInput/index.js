// 导入组件，组件必须声明 name
import { Input } from 'element-ui';
import TglInput from './src/index.vue'

// 为组件提供 install 安装方法，供按需引入
TglInput.install = function(Vue){
    Vue.component(TglInput.name,TglInput)
    Vue.use(Input)
}

export default TglInput