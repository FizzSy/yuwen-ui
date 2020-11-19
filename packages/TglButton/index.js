
import { Button } from 'element-ui';

// 导入组件，组件必须声明 name
import TglButton from './src/index.vue'

// 为组件提供 install 安装方法，供按需引入
TglButton.install = function(Vue){
    Vue.component(TglButton.name,TglButton)
    Vue.use(Button)
}

export default TglButton 