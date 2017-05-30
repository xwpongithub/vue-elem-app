import Vue from 'vue';
import App from './App';
import router from './router';
import Toast from 'vue-easy-toast';

import './common/stylus/index.styl';

Vue.use(Toast);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
});
