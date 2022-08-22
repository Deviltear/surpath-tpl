## tpl
创建统一模块模板，支持模板有 umi js、umi ts、ts js 函数组件、mvc目录结构模板等

 结构如下：
 <pre>
xxx                     // 业务组件根目录
  |-- components        // 业务组件目录
  |-- models            // 业务 models 目录
    |-- xxx.js          // 业务 model 文件，自动加载 services
  |-- services          // 业务 services 目录
    |-- xxx.js          // 业务 service 文件
  |-- XxxPage.js        // 业务组件开发入口，自动 connect model
  |-- XxxPage.scss      // 业务样式
  |-- index.js          // 业务入口，使用 dynamic 引用
  |-- MapProps.js       // mapStateToProps、mapDispatchToProps，自动引用 model
</pre>

## 安装
```
npm i surpath-tpl -g
```

## 使用

为了规范，在创建模块的时候，同时支持传入头文件注释 author，命令行：
```
$ surpathTpl 模块名 --author=小明

或者使用简写

$ surpathTpl 模块名 -a=小明
```


头文件注释 author可省略

```
$ surpathTpl 模块名
```

例如：需要创建 home 模块，则运行如下命令
```
surpathTpl home

```

运行结果：

<pre>
project                         //当前项目根目录
  |--src                        //src 目录
    |--pages                    // pages 目录 
      |--xxx                    // 页面 目录                   
        |-- components        // 业务组件目录
        |-- models            // 业务 models 目录
          |-- home.j|ts         // 业务 model 文件，自动加载 services
        |-- services          // 业务 services 目录
          |-- home.j|ts         // 业务 service 文件
        |-- HomePage.j|ts       // 业务组件开发入口，自动 connect model
        |-- HomePage.scss     // 业务样式
        |-- index.j|ts          // 业务入口，使用 dynamic 引用
        |-- MapProps.j|ts       // mapStateToProps、mapDispatchToProps，自动引用 model                 
 
</pre>



##  函数组件模板
该 tpl 也支持 umi ts|js 函数组件模板，如果有 src/components 目录，则在该目录下创建，否则在执行的目录下创建组件；

组件名称默认会做首字母大写自动转化；



## 普通 react mvc 模板
该 tpl 也支持 react redux mvc 模板，经过命令行选择后

运行结果：
<pre>
project                         //当前项目根目录
  |--src                        //src 目录
    |--services                 //services目录
      |--xxx.j|ts                 // 业务 service 文件
    |--reducers                 //reducers目录
      |--xxx.j|ts                 // 业务 reducers 文件
    |--pages                    // pages 目录                   
      |--xxx                    // 业务页面根目录
        |-- components          // 业务组件目录         
        |-- XxxPage.j|ts            // 业务组件开发入口，自动 connect model
        |-- XxxPage.scss           // 业务样式
        |-- index.j|ts                  // 业务入口，使用 dynamic 引用
        |-- MapProps.j|ts               // mapStateToProps、mapDispatchToProps，自动引用 model                 
 
</pre>


## 说明

- 1.该模板是针对使用 umi 框架的项目，创建统一功能模块模板；

- 2.安装完成之后，直接在项目的根目录 cmd 下运行命令（VSCode 直接打开终端运行命令）；

- 3.由于实际项目开发，模块一般都是在 `src/pages` 下创建，所以，默认创建的模块放在 `src/pages` 目录下；

- 4.如果执行命令的目录下没有 `src/pages` ，则默认在执行的目录下创建模块；

- 5.支持创建模块的时候，同时传入头文件注释 author，简写命令为：`$ tpl 模块名 -a=xxx`

- 6.目前支持的模板有：
- 1.页面: umi ts, umi js,mvc ts,mvc js。
- 2.函数组件: ts js。

