# Changelog

## 2017-07-10 V2.0.0
1.在food.vue中加入了滚动时顶部固定栏的仿iOS原生listview效果  
2.在router中应用了code-split-async来懒加载组件  
3.为每个组件的style部分添加了scoped  
4.加入了FastClick  
5.将部分class-leave-active类修改为class-leave-to   
6.升级了部分依赖类库  
7.阻止了浏览器的默认touch行为  

### Fixed
*  点击shoppingcart.vue中的清空按钮没有相应的处理事件
*  加入FastClick后点击事件在pc端点击一次会触发两次
