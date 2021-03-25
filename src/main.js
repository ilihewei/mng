import Vue from 'vue'
import Axios from 'axios'
import App from './App.vue'
import router from './router'
import Router from 'vue-router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '../common/css/base.css'
import '../common/css/content.css'
import '../common/font/iconfont.css'
import * as publicJs from '../common/js/public.js'
import {buttonIsShow} from './api/baseData'
import JSEncrypt from 'jsencrypt'

Vue.prototype.$getRsaCode = function(str){ // 注册方法
  let pubKey = `MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCd/1frIxWsbBYQUgHJH9EUzDPOFqAwU9wCjjLvRDhTIdAdZmPk2zQwqYZYxKjHjkcEXNgkPLS3En6LE+pU9MQPVxn6XPeiLSUnw/XuBj+hYjmhVVhLx3bPKz0Mu7e9ACDKg+rDOCFYpJ3TckVIOcxWCFOI0/b3SJsnRPAhB5JgewIDAQAB`;// ES6 模板字符串 引用 rsa 公钥
  let encryptStr = new JSEncrypt();
  encryptStr.setPublicKey(pubKey); // 设置 加密公钥
  let  data = encryptStr.encrypt(str.toString());  // 进行加密
  return data;
}

Vue.config.productionTip = false;
import './assets/style/flex.css'
import './assets/style/reset.css'
import './axiosInit';

import {getRequest, postRequest, deleteRequest, putRequest} from './api/baseApi'
Vue.prototype.getRequest = getRequest
Vue.prototype.postRequest = postRequest
Vue.prototype.deleteRequest = deleteRequest
Vue.prototype.putRequest = putRequest

Vue.prototype.$axios = Axios;
Vue.prototype.publicJs = publicJs;
Vue.prototype.buttonIsShow = buttonIsShow;

Vue.use(ElementUI);
// window.isDebug = false; //true:全部显示不做权限校验
window.showMenu = true; // true:显示左侧和顶部菜单栏

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
