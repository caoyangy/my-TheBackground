// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import './assets/css/style.css';
import '../icon/iconfont.css';
//适配IE11浏览器解析
import "babel-polyfill"

import iView from 'iview';
import 'iview/dist/styles/iview.css';
import store from './store';
Vue.use(iView);

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);

// 富文本
import  VueQuillEditor from 'vue-quill-editor'
// require styles 引入样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

Vue.use(VueQuillEditor)
import VueQriously from 'vue-qriously';
Vue.use(VueQriously);

import promise from 'es6-promise'
promise.polyfill();

// import VueQrcode from '@xkeshi/vue-qrcode';
// Vue.component(VueQrcode.name, VueQrcode);

import { BaseUrl, myUrl,API, APIS,APIMy,agentUrl,APIA,imgUrl} from './Baseurl/common.js';
Vue.prototype.$API = API;
Vue.prototype.$APIS = APIS;
Vue.prototype.$APIA = APIA;
Vue.prototype.$BaseUrl = BaseUrl;
Vue.prototype.$myUrl = myUrl;
Vue.prototype.$APIMy = APIMy;
Vue.prototype.$agentUrl = agentUrl;
Vue.prototype.$imgUrl = imgUrl;
import axios from "axios";
Vue.prototype.$http=axios;

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
	store,
  components: { App },
  template: '<App/>'
})
