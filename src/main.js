import 'babel-polyfill';
import Vue from 'vue';
import App from './App';
import router from './router';
import Toast from 'vue-easy-toast';
import FastClick from 'fastclick';

import './common/stylus/index.styl';

Vue.use(Toast);

FastClick.attach(document.body);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
