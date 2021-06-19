import Vue from 'vue'
import App from './App'

import {myRequest} from "./util/api.js"
Vue.prototype.$myRequest = myRequest
Vue.config.productionTip = false
Vue.prototype.$throttle=(function(){
	let last = 0;
	return function(fn){
			const now = new Date().getTime();
			if(now - last >= 1000){
				fn();
				last = now
			}
		}
})()							
App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
