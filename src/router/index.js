import Vue from 'vue';
import Router from 'vue-router';

const Goods = (resolve) => {
  import('../components/goods/goods').then((module) => {
    resolve(module);
  });
};

const Ratings = (resolve) => {
  import('../components/ratings/ratings').then((module) => {
    resolve(module);
  });
};

const Seller = (resolve) => {
  import('../components/seller/seller').then((module) => {
    resolve(module);
  });
};

Vue.use(Router);

export default new Router({
  linkActiveClass: 'active',
  routes: [{
    path: '/',
    redirect: '/goods'
  }, {
    path: '/goods',
    component: Goods
  }, {
    path: '/ratings',
    component: Ratings
  }, {
    path: '/seller',
    component: Seller
  }]
});
