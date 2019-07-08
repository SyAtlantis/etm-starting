import Vue from 'vue'
import App from './App.vue'
import store from "./store"
import {
  Button, Menu, Icon, Input, Card,
  Steps, List, Avatar, Tag, Form,
  Radio, Upload, Timeline, Spin, Divider,
  Tooltip, message, Switch, Affix, Row, Col
} from "ant-design-vue"

Vue.use(Button)
Vue.use(Menu)
Vue.use(Icon)
Vue.use(Input)
Vue.use(Card)
Vue.use(Steps)
Vue.use(List)
Vue.use(Avatar)
Vue.use(Tag)
Vue.use(Form)
Vue.use(Radio)
Vue.use(Upload)
Vue.use(Timeline)
Vue.use(Spin)
Vue.use(Divider)
Vue.use(Tooltip)
Vue.use(Switch)
Vue.use(Affix)
Vue.use(Row)
Vue.use(Col)

Vue.prototype.$message = message;

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
