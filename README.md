# vue-elem-app

> 使用vue2.3.x构建的elements外卖APP，基于:https://github.com/ustbhuangyi/vue-sell

# 在原基础上做出的改变：

* 运用了vue 2.3.x版本后添加的.sync语法糖
* 为商品选项卡中的滚动区添加了顶部固定效果,左侧菜单区也能根据用户在内容区的选择滚动相应位置
* 添加了一些较为巧妙的css布局处的注释
* 将一些还未被单独封装为组建的代码封装了单独的组建

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

## 打包发布

dist-server目录下的即为打包后发布运行的脚本，进入此目录，使用命令npm i安装下express后，启动服务器:node app，之后在浏览器输入http://localhost:3000即可看到效果
