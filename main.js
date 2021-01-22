
import Vue from 'vue'
import App from './App'
import HttpRequest from './common/httpRequest'
import HttpCache from './common/cache'
import queue from './common/queue'
import loadMore from './components/uni-pro/load-more'
import orangeGoodsList from './components/uni-pro/orange-goods-list'
import orangeGoodsNewsList from './components/uni-pro/orange-goods-news-list'
import orangeGoodsCargHome from './components/uni-pro/orange-goods-card-home'
import orangeGoodsCargHomeTwo from './components/uni-pro/orange-goods-card-home-two'
import 'js_sdk/ican-H5Api/ican-H5Api'
import empty from './components/empty'
Vue.config.productionTip = false;
Vue.prototype.$Request = HttpRequest;
Vue.prototype.$queue = queue;
Vue.prototype.$Sysconf = HttpRequest.config;
Vue.prototype.$SysCache = HttpCache;
// Vue.prototype.uma = uma || {};// 此处用来挂载入uma到组件实例上，方便组件内使用this.uma

App.mpType = 'app';
Vue.component('load-more', loadMore);
Vue.component('empty', empty);
Vue.component('orange-goods-list', orangeGoodsList);
Vue.component('orange-goods-news-list', orangeGoodsNewsList);
Vue.component('orange-goods-card-home', orangeGoodsCargHome);
Vue.component('orange-goods-card-home-two', orangeGoodsCargHomeTwo);


const app = new Vue({
    ...App
});
app.$mount();
