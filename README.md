# Vue3项目 -- H5

> 技术栈：Vue3 + Router4 + Pinia + ES6 + Vant4 +  Git +axios以及各种类似dayjs的第三方库
>
> 下载项目后需要做的步骤：
>
> 1. `pnpm install`(下载依赖)
> 2. `pnpm dev`(运行项目)

## 创建Vue项目

- 方式一：Vue CLI
  - 基于`Webpack`工具
  -  创建命令：`vue create`
- 方式二：create-vue
  - 基于`vite`工具
  - 创建命令：`npm init vue@latest`或者`pnpm create vite`

- 以下是基于`pnpm create vite`创建的项目

![image-20230310010819996](.\Vue3-H5_images\image-20230310010819996.png)

项目配置:

- 配置项目的`icon`图标

> 从静态文件夹`public`中找到文件，将原本不需要的脚手架默认图标进行删除，加入新的图标照片
>
> 记得遵守替换图标的规则：
>
> - 在public文件夹中找到favicon.ico文件，这是默认的项目图标文件。
> - 准备你想要使用的新图标文件，并将其命名为favicon.ico
> - 将新的favicon.ico文件替换默认的文件，保存更改。
> - 在浏览器中重新加载项目，你应该能够看到新的图标已经生效了
> - 如果你想要使用不同的文件名来保存你的图标文件，你需要在index.html文件中手动更改图标文件的引用。在index.html文件中，找到以下代码：(我的href比较不一样，不过道理都是差不多的)
>
> ```html
> <link rel="icon" type="image/svg+xml" href="/vite.svg" />
> //将//vite.svg替换为你的图标文件的相对路径即可
> ```

- 配置项目的标题

![image-20230310012624925](.\Vue3-H5_images\image-20230310012624925.png)

- 配置`jsconfig.json`

> 这个`jsconfig.json`配置文件能给我们写代码更友好的提示(可以对你的文件所在目录下的所有js代码做出个性化支持)，但是`Vite脚手架`并没有生成这个文件，需要我们自己进行添加
>
> 这个文件所需的内容我放在下方的代码块中
>
> - 使用命令`touch jsconfig.json`生成对应的`jsconfig.json`文件
> - 一般情况下`.json`后缀的文件是不能写注释的，而`jsconfig.json`和`tsconfig.json`是例外，因为vscode编辑器额外单独做了处理

```javascript
//一般来说选这个就够了，需要其他的根据下面参考大全自己加
{"compilerOptions": {
  "target": "esnext",
  "checkJs": false,
  "strict": true,
  "allowSyntheticDefaultImports": true,
  "baseUrl": ".",
  "module": "commonjs",
  "paths": {
    "@/*": ["./src/*"],
    "@components/*": ["src/components/*"],
    "@views/*": ["src/views/*"]
  }
},
"exclude": ["node_modules", "dist", "temp"],
"include": ["src/**/*", "types/**/*"]
}
```

- **以下是可供参考的`jsconfig.json`配置文件**

```json
// jsconfig.json
{
    "compilerOptions": {
        "target": "es2015",  // 指定要使用的默认库，值为"es3","es5","es2015"...
        "module": "commonjs", // 在生成模块代码时指定模块系统
        "checkJs": false, // 启用javascript文件的类型检查
        "baseUrl": "*", // 解析非相关模块名称的基础目录
        "paths": {
            "utils": ["src/utils/*"] // 指定相对于baseUrl选项计算的路径映射，使用webpack别名，智能感知路径
        }
    },
    "exclude": [ // 要排除的文件
        "node_modules", 
        "**/node_modules/*"
    ],
    "include": [ // 包含的文件
        "src/*.js"
    ]
}

"compilerOptions": {
  "incremental": true, // TS编译器在第一次编译之后会生成一个存储编译信息的文件，第二次编译会在第一次的基础上进行增量编译，可以提高编译的速度
  "tsBuildInfoFile": "./buildFile", // 增量编译文件的存储位置
  "diagnostics": true, // 打印诊断信息 
  "target": "ES5", // 目标语言的版本
  "module": "CommonJS", // 生成代码的模板标准
  "outFile": "./app.js", // 将多个相互依赖的文件生成一个文件，可以用在AMD模块中，即开启时应设置"module": "AMD",
  "lib": ["DOM", "ES2015", "ScriptHost", "ES2019.Array"], // TS需要引用的库，即声明文件，es5 默认引用dom、es5、scripthost,如需要使用es的高级版本特性，通常都需要配置，如es8的数组新特性需要引入"ES2019.Array",
  "allowJS": true, // 允许编译器编译JS，JSX文件
  "checkJs": true, // 允许在JS文件中报错，通常与allowJS一起使用
  "outDir": "./dist", // 指定输出目录
  "rootDir": "./", // 指定输出文件目录(用于输出)，用于控制输出目录结构
  "declaration": true, // 生成声明文件，开启后会自动生成声明文件
  "declarationDir": "./file", // 指定生成声明文件存放目录
  "emitDeclarationOnly": true, // 只生成声明文件，而不会生成js文件
  "sourceMap": true, // 生成目标文件的sourceMap文件
  "inlineSourceMap": true, // 生成目标文件的inline SourceMap，inline SourceMap会包含在生成的js文件中
  "declarationMap": true, // 为声明文件生成sourceMap
  "typeRoots": [], // 声明文件目录，默认时node_modules/@types
  "types": [], // 加载的声明文件包
  "removeComments":true, // 删除注释 
  "noEmit": true, // 不输出文件,即编译后不会生成任何js文件
  "noEmitOnError": true, // 发送错误时不输出任何文件
  "noEmitHelpers": true, // 不生成helper函数，减小体积，需要额外安装，常配合importHelpers一起使用
  "importHelpers": true, // 通过tslib引入helper函数，文件必须是模块
  "downlevelIteration": true, // 降级遍历器实现，如果目标源是es3/5，那么遍历器会有降级的实现
  "strict": true, // 开启所有严格的类型检查
  "alwaysStrict": true, // 在代码中注入'use strict'
  "noImplicitAny": true, // 不允许隐式的any类型
  "strictNullChecks": true, // 不允许把null、undefined赋值给其他类型的变量
  "strictFunctionTypes": true, // 不允许函数参数双向协变
  "strictPropertyInitialization": true, // 类的实例属性必须初始化
  "strictBindCallApply": true, // 严格的bind/call/apply检查
  "noImplicitThis": true, // 不允许this有隐式的any类型
  "noUnusedLocals": true, // 检查只声明、未使用的局部变量(只提示不报错)
  "noUnusedParameters": true, // 检查未使用的函数参数(只提示不报错)
  "noFallthroughCasesInSwitch": true, // 防止switch语句贯穿(即如果没有break语句后面不会执行)
  "noImplicitReturns": true, //每个分支都会有返回值
  "esModuleInterop": true, // 允许export=导出，由import from 导入
  "allowUmdGlobalAccess": true, // 允许在模块中全局变量的方式访问umd模块
  "moduleResolution": "node", // 模块解析策略，ts默认用node的解析策略，即相对的方式导入
  "baseUrl": "./", // 解析非相对模块的基地址，默认是当前目录
  "paths": { // 路径映射，相对于baseUrl
    // 如使用jq时不想使用默认版本，而需要手动指定版本，可进行如下配置
    "jquery": ["node_modules/jquery/dist/jquery.min.js"]
  },
  "rootDirs": ["src","out"], // 将多个目录放在一个虚拟目录下，用于运行时，即编译后引入文件的位置可能发生变化，这也设置可以虚拟src和out在同一个目录下，不用再去改变路径也不会报错
  "listEmittedFiles": true, // 打印输出文件
  "listFiles": true// 打印编译的文件(包括引用的声明文件)
}
```

### 项目目录结构划分

- `src`文件夹下的目录图片：

![image-20230310024247705](.\Vue3-H5_images\image-20230310024247705.png)

|    文件夹    |                             作用                             |
| :----------: | :----------------------------------------------------------: |
|   `assets`   |     存放资源(图片、CSS静态资源、字体资源、MP3、MP4等等)      |
| `components` | 存放Vue抽取的组件(比较通用的部分)<br />可能在`components`文件夹中还会存在以下两个小文件夹<br />`common`：多个项目都会公用的组件<br />`content`当前项目多个页面公用的组件 |
|   `hooks`    |          多个组件中用到的代码逻辑抽取到这个文件夹中          |
|    `mock`    |  模拟数据(服务器接口的数据还未写好，此时模拟的数据放在这里)  |
|   `router`   |                           路由配置                           |
|  `service`   |                           网络请求                           |
|   `stores`   | 复杂数据的状态管理，Pinia或者VueX，这里Pinia采用stores，加上s，因为Pinia可以存在多个store，实现扁平化 |
|   `utils`    |                抽出的工具函数放在这里(工具类)                |
|   `views`    | 一个主要的，大的页面通常会抽取成`views`，有时候也可能不叫`views`而是叫`pages` |
|   **文件**   |                           **作用**                           |
|  `App.vue`   |                          Vue父组件                           |
|  `main.js`   |                         全局配置文件                         |
| `style.css`  |            全局CSS，随Vite脚手架创建时一起创建的             |

### CSS样式的重置

- 对默认CSS样式进行重置:(在GitHub中进行下载前人已经总结好的)

  `Github地址：`[necolas/normalize.css: A modern alternative to CSS resets (github.com)](https://github.com/necolas/normalize.css)

  - normalize.css(适配各种浏览器的CSS样式)

    使用命令`pnpm install --save normalize.css`进行安装

    然后在`main.js`文件中进行引入使用

    ![image-20230310031417551](.\Vue3-H5_images\image-20230310031417551.png)

  -  reset.css(常见配置的处理)

> 这个你可以放在`assets`文件夹下，创建一个css文件夹专门进行存放，也可以说直接导入，看你所处的具体情况决定
>
> - 但通常我们项目会抽出很多的CSS文件出来，这些文件我们可以放在`assets`文件夹中的`css`文件夹中，然后统一使用`@import url()`导入全局CSS样式`style.css`文件中进行统一管理

```css
/* reset.css，我们会配置一些如下基础设置。然后将此文件引入全局CSS文件中 */

body,h1,h2,h3,h4,ul,li {
  padding: 0;
  margin: 0;
}

ul,li {
  list-style: none;
}

a {
  text-decoration: none;
  color:#333;
}

img {
  vertical-align: top;
}
```

### 全家桶 – 路由配置

> 1. 安装路由：`pnpm install vue-router`
> 2. 在router文件夹中的index.js配置路由文件。导出内容
>
> 3. 在全局配置文件`main.js`中进行配置

- 路由需要对应多个界面，界面是在`views`中进行配置，我们需要在`views`文件夹中创建多个文件夹
  - 一个文件夹对应一个页面，因为一个页面会对应多个组件。使用文件夹进行区分会更加合理
  - 在文件夹中创建路由要跳转的对应页面（可以直接创建页面 或者 创建一个`index.vue`文件当作主体，然后创建其他的vue文件引入主体中），这里采用第一种方式

> 在views中创建的文件夹中的vue文件中使用setup语法糖会报警告的解决方案：
>
> - 在上面创建的`jsconfig.json`文件中的`compilerOptions`配置中加上这部分`"allowJs": true`
> - 这个方法是更加标准的做法，即使你没有使用Typescript也需要这么做

- 做完之后就把`views`页面**映射**进路由里面，然后在`App.vue`组件中使用`router-view`进行路由占位
- 使用`<router-link to="/地址">页面信息</router-link>`进行路由跳转

```js
import {createRouter,createWebHashHistory} from "vue-router"

const router = createRouter({
  history:createWebHashHistory(),//使用哈希路由
  routes:[
    {
      path:"/",
      redirect:"/home"//重定向到首页
    },
    {
      path:"/home",
      //路由懒加载，方便打包的时候进行分包处理
      component:()=>import("../views/home/home.vue")
    },
    {
      path:"/favor",
      component:()=>import("../views/favor/favor.vue")
    },
    {
      path:"/order",
      component:()=>import("../views/order/order.vue")
    },
    {
      path:"/message",
      component:()=>import("../views/message/message.vue")
    }
  ]
})

export default router
```

### 全家桶 – 状态管理

- 状态管理的选择:
  - `vuex`: 目前依然使用较多的状态管理库
  - `pinia`: 强烈推荐, 未来趋势的状态管理库

> - 使用命令安装：`pnpm install pinia`
> - 导入stores文件夹下(创建一个`index.js`文件进行配置操作)，并导出
> - 在全局配置文件`main.js`文件下进行引入配置使用
>
> ---
>
> - 在Pinia中，我们是可以创建多个store的，`index.js`文件是我们最终汇总的store文件，其他大大小小的store文件我们按模块进行区分，(创建一个`modules`文件夹，其他模块的的store文件就放在该文件里面)

```js
//stores里的index.js搭建
import {createPinia} from "pinia"

const useStore = createPinia("useStore",{
  state:()=>({
    count:1
  }),
})

export default useStore
```

## 首页搭建

### TabBar(底部)基本搭建

> 将底部`TabBar`抽取出来封装成一个组件 => 写到`components`文件夹中
>
> 这里就需要使用到`编程式路由导航`了，然后就是写样式了，完成底部的组件效果
>
> - 涉及到的静态资源已经在`assets`文件夹中进行分类为 => `font`、`data`、`img`三个文件夹分别存放字体、数据、图片
> - CSS样式使用到的`less`，使用命令`pnpm i less`安装

- 这里需要注意的点：

  - 直接在`img的src`属性中加上图片地址是可以的，但是想要从`tabbarData`中动态获取`image`确是不行的。

    - 在`webpack`中我们可以通过`<img :src="require(item.image)" alt="">`中的`require`来实现

    - 但是在`Vite`中需要进行封装一个工具类，然后丢进`utils`文件夹中，引入TabBar组件中使用

      ```javascript
      const getAssetURL = (image) =>{
        //参数1：相对路径 参数2：当前路径
        return new URL(`../assets/img/${image}`,import.meta.url).href
        //返回创建的URL语句
        //具体来说，这个语句使用了 URL 构造函数，它接受两个参数：第一个参数是一个字符串，表示要创建的 URL 地址；第二个参数是一个可选的基础 URL，用于解析相对路径。在这个语句中，第一个参数是一个模板字符串，其中包含一个占位符 ${image}，它会被变量 image 的值所替换，生成一个字符串 ../assets/img/xxx，其中 xxx 是变量 image 的值。这个字符串表示了一个相对于当前模块的上级目录的 assets/img 目录中的某个文件的路径。
      
      	//第二个参数是 import.meta.url，这是一个元数据属性，表示当前模块的绝对 URL 地址。它在解析相对路径时非常有用。
        
        //但是它本身并不是一个字符串，而是一个包含了 URL 信息的对象。如果想要使用这个 URL 地址，需要使用 href 属性获取它的字符串表示
      }
      ```

      

  - 对于底部`tabBar`，由于数据就一点，我就直接抽取出来放在这里，不从服务器中获取。写完抽取到提前创建好的`data`文件中，取名随意(但记得语义化，方便找)

    ```javascript
    //对于底部tabBar，由于数据就一点，我就直接抽取出来放在这里，不从服务器中获取
    const tabbarData = [
      {
        id:1,
        text:"首页",
        image:"tabbar/tab_home.png",
        imageActive:"tabbar/tab_home_active.png",//活跃的图片
        path:"/home"
      },
      {
        id:2,
        text:"收藏",
        image:"tabbar/tab_favor.png",
        imageActive:"tabbar/tab_favor_active.png",
        path:"/favor"
      },
      {
        id:3,
        text:"订单",
        image:"tabbar/tab_order.png",
        imageActive:"tabbar/tab_order_active.png",
        path:"/order"
      },
      {
        id:4,
        text:"消息",
        image:"tabbar/tab_message.png",
        imageActive:"tabbar/tab_message.png",
        path:"/message"
      }
    ]
    
    //将数据暴露出去
    export default tabbarData
    ```

```vue
<script setup>
//组件本地数据
import tabbarData from "../assets/data/tabBarData"
//Vite图片正常显示工具类
import getAssetURL from "../utils/get_assets_img"
//引入Vue3中的方法
import {ref}  from "vue"
//引入编程式路由
import {useRouter} from "vue-router"
const router = useRouter()

//记录点击的情况，排他思想
const currentIndex = ref(0)

const itemClick = (index,item) => {
  currentIndex.value = index
  router.push(item.path)//编程式路由导航
}

<template>
  <div class="tabBar">
    <template v-for="(item,index) in tabbarData" :key="item.id">
      <div 
      class="tabBar-item" 
      :class="{active:index === currentIndex}" 
      @click="itemClick(index,item)"
      >
        <img v-if="index !== currentIndex" :src="getAssetURL(item.image) " alt="">
        <img v-else :src="getAssetURL(item.imageActive) " alt="">
        <span class="text">{{ item.text }}</span>
      </div>
    </template>
  </div>
</template>

<style  lang="less" scoped>
.tabBar{
  position:fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height:50px;
  display: flex;
  .tabBar-item{
  flex:1;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-top: 1px solid #bfbcbc;
    &.active{
      color: var(--primary-color);
    }
  }
  img{
    width: 36px;
  }
}
</style>
```

### TabBar功能完善

> 还需要完善两个功能：
>
> 1. 路由跳转
>    - 思路：`编程式路由导航`跳转
> 2. 点击底部的功能呈现对应的点击状态
>    - 思路：`排他思想`，点击状态的高亮效果采用另外一套`高亮图片`实现，而不是CSS实现

- 详细代码阅读`components`文件夹下的`tab-bar.vue`文件

- 注意点：

  - 此时对于一些要用到的具体颜色(例如十六进制颜色)通常由`UI`给到我们，为这颜色取一个具体的名字将其抽取到`asset`文件夹的`css`文件夹下，创建一个`common.css`文件，然后导入全局`style.css`样式文件中，使用如下的 Lcss 中的自定义属性语法，也称为 CSS 变量实现调用

  ```css
  /* CSS 变量在声明时以 -- 作为前缀，并且可以在任何 CSS 属性中使用。这样我们就可以将一些通用的值（如颜色、字体等）保存为变量，然后在整个样式表中多次使用它们*/
  color: var(--primary-color);
  ```

## 引入Vant和使用Vant组件库

> 引入`Vant 4版本`：[介绍 - Vant 4 (vant-ui.github.io)](https://vant-ui.github.io/vant/#/zh-CN/home)
>
> Vant 是一个**轻量、可定制的移动端组件库**

### 安装

> 命令(安装Vant组件库)：`pnpm add vant`
>
> - 我选择方法二：按需引入样式组件
>
>   1. 安装插件：
>
>      ```
>      pnpm add unplugin-vue-components -D
>      ```
>
>   2. 配置插件：(基于 `vite` 的项目，在 `vite.config.js` 文件中配置插件)
>
>      ```js
>      import vue from '@vitejs/plugin-vue';
>      import Components from 'unplugin-vue-components/vite';
>      import { VantResolver } from 'unplugin-vue-components/resolvers';
>      
>      export default {
>        plugins: [
>          vue(),
>          Components({
>            resolvers: [VantResolver()],//按需引入的核心操作
>          }),
>        ],
>      };
>      ```
>
>   3. 使用组件
>
>      找个页面测试一下看能不能起效果。一切正常就可以开始使用了

### 修改UI组件库的样式方案

> **关键知识点**：
>
> - 如何修改组件库(第三方库)的样式
>
>   - 方案1：
>
>     删除掉style中的`scoped`，相当于取消了样式隔离，这样属性能够作用在全局上面，对组件库的修改才会生效。但是**弊端**就是会对其他CSS的文件产生样式冲突。所以一般不选择这个方法
>
>   局部修改不成功的原因：
>
>   ![image-20230313101045927](.\Vue3-H5_images\image-20230313101045927.png)
>
>   看似修改1，但其实1的真实面孔是2的样子，所以局部的修改无法生效
>
>   - 方案2：
>
>     使用`deep`样式穿透，由Vue3提供的方法，重写类中的CSS属性
>
>     `:deep()`找到子组件的类，让子组件的类也可以生效
>
>     ```vue
>     :deep(需要改变的类名){
>     	xxx
>     }
>     ```

- 如何分辨自己什么时候修改第三方UI组件库的样式？

  1. 用插槽插入自己的元素的时候，直接在自己的作用域中修改这个元素的样式

  2. 全局定义一个变量，覆盖它默认变量的值。那所有使用到这个变量的值都会被同步修改。所有关键在于区分我们是要全部修改还是修改单个

  3. 局部定义一个变量，覆盖它默认变量的值

     优点：只是局部修改

  4. 直接查找对应的子组件库的选择器(元素的选择器)进行修改，需要使用`:deep`，这是直接修改CSS，而不是变量

- 既然使用了第三方UI组件库，那就将TabBar底部部分替换为组件库的内容，原来的代码保存在上面的代码块中。这样代码就能够删减掉不少了

### 首页NavBar的组件封装

> 在`views`文件夹下的`home`文件夹下创建`cpns`文件夹，意思是`components`的缩写
>
> - 在这个文件夹下用来存放首页自己单独用的组件

## 项目备份-Git管理-城市首页

> `Vite`是没有初始化`Git仓库`的，所以为了项目的备份和出意外的时候进行回档，需要引入`Git`进行管理
>
> ### 命令
>
> 1. 初始化仓库：`git init`
> 2. 将项目所有文件加入仓库：`git add .`
> 3. 将项目提交到暂缓区：`git commit -m "引入Vant4组件库"`

### 开发首页

- 对于首页的内容进行合理的进行组件拆分，放在`cpns`文件夹下，结构会更加清晰

### 获取位置信息

> 调用对应的API，与首页界面`我的位置`进行点击绑定
>
> - API对应的文档：[Geolocation.getCurrentPosition() - Web API 接口参考 | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/API/Geolocation/getCurrentPosition)
>
> - 返回得到的结果并不是城市，而是经纬度，我们需要将经纬度返回给服务器，让服务器进行判断结果是哪个城市，然后返回城市信息展示在页面
>
> - 通常像高德或者百度是会提供公共的相关API让我们去调用的，所以也可以直接进行调用
>
>   - 高德地图提供了通过经纬度解析出所在城市的API，具体的API接口为：https://restapi.amap.com/v3/geocode/regeo，其中包括了经纬度解析出城市的信息。可以通过向该API接口发送GET请求，并将经纬度作为参数传递，即可获取到该经纬度所在的城市信息。
>
>   具体如下：
>
>   ```js
>   restapi.amap.com/v3/geocode/regeo?output=json&location=116.481488,39.990464&key=<我的key>
>   ```
>
>   其中，`<我的key>`需要替换为申请的高德地图API Key。请求成功后，API会返回一个JSON格式的响应，其中包括了该经纬度所在城市的详细信息，如城市名称、城市编码、所在省份等
>   
> - 在谷歌可能获取不到经纬度地址，因为谷歌会获取电脑的IP地址到谷歌服务器上进行解析位置，然而国内是连不上谷歌服务器的，除非你科学上网。Edge可以获取到的原因是因为获取的机制不一样，Edge获取方式是从电脑中获取对应的信息。不过在手机上都是可以获取的，所以并不需要担心

```js
//点击调用城市信息
const positionClick = ()=>{
  //Geolocation.getCurrentPosition() 方法用来获取设备当前位置。
  navigator.geolocation.getCurrentPosition(res =>{
    console.log("获取位置成功：",res);
  },err =>{
    console.log("获取位置失败：",err);
  },{
    enableHighAccuracy:true,
    timeout:5000,//超时的时间
    maximumAge:0
  })
}
```

![image-20230314010149456](.\Vue3-H5_images\image-20230314010149456.png)

### 跳转到城市和隐藏TabBar

- 点击以下此处需要跳转到`city`界面，此时就需要用到`编程式路由导航`+判断底部`TabBar`是否隐藏

<img src=".\Vue3-H5_images\image-20230314013129282.png" style="zoom:53%;" />

> 需要用到的知识点：
>
> - useRoute()
>
>   - 用于获取当前活跃的路由对象，在路由中写入`mate`属性，这是自定义的
>
>   - 在路由协议中，有一个名为"路由元"（Route Meta）的属性，通常简写为"meta"。该属性包含一些用于描述路由信息的元数据（metadata），例如页面标题、页面描述、页面关键字等等。
>
>     在Vue.js中，路由元是一个对象，可以通过路由配置文件中的"meta"属性来定义
>
>   - 我们在`meta`中定义是否要隐藏TabBar的布尔值，传递到这个底部组件通过`v-if`判断实现

#### 隐藏TabBar的两种方案

- 方案一：使用路由元信息，传递布尔值信息通过`v-if`控制TabBar组件是否隐藏(我选择这种)
- 方案二：使用CSS实现，需要进行隐藏的部分只需要在类选择器中加上`.city`就能够实现隐藏

```css
.city{
  position:relative;/*不会脱离标准流，目的为了使用z-index进行层叠优先度判定*/
  z-index:9;/*将城市界面的内容浮现在最上面，包括了底部TabBar的上面*/
  height:100vh;/*高度为整个视口*/
  background-color:#fff;/*将背景设置为白色，默认是透明的，无法遮盖住TabBar*/
  overflow-y: auto/*使元素在内容超出高度时，出现纵向滚动条，这样内容只在city里面滚动,让TabBar不会随着下拉浮现出来*/
}
```

- 不管是哪种方式都应该掌握，方法也不止两种，多种解决方式让我们在面对各种情况仍留有余力

### 城市页面的搜索框搭建

> - 搜索框中的左边小图标如果修改颜色的话，是选择全局修改还是局部样式穿透修改
>
>   - 选择全局修改，因为这种主题色位置都是统一颜少的，不大可能是这里的搜索框图标蓝色，那边绿色的。
>
>   - 全局修改在全局CSS文件`common.css`进行添加相关属性(先从组件库查找是否提供，没有再从`DevTools`中获取)
>
>   - | 名称                         | 默认值              |
>     | ---------------------------- | ------------------- |
>     | --van-search-left-icon-color | *var(--van-gray-6)* |
>
> - 点击`取消`跳回上一个界面，使用组件库提供的方法配合路由实现

### 城市界面的Tabs搭建

- 较为简单，通过组件库实现

### 网络封装-模块API地址抽取

> 此处用到的接口：[codercba.com:1888/api/city/all](http://codercba.com:1888/api/city/all)
>
> 发送网络请求必不可少的库：`axios`
>
> - 使用命令：`pnpm add axios`安装第三方库`axios`

#### 二次封装axios

```javascript
import axios from 'axios'

class XYRequest {
  constructor(baseURL, timeout=10000) {
    this.instance = axios.create({
      baseURL,
      timeout
    })
  }

  request(config) {
    return new Promise((resolve, reject) => {
      this.instance.request(config).then(res => {
        resolve(res.data)
      }).catch(err => {
        reject(err)
      })
    })
  }

  get(config) {
    return this.request({ ...config, method: "get" })
  }

  post(config) {
    return this.request({ ...config, method: "post" })
  }
}

export default new XYRequest("http://123.207.32.32:9001")
```

> 这段二次封装的`axios`会放在services文件夹下，这里会进行继续的细分
>
> - 创建`request`文件夹，里面存放`config.js`文件
>   - `config.js`文件中存放`接口信息`还有`响应时间信息`
>   - 然后将其导入request文件夹下的index.js中，进行如下使用
> - `request`文件夹是对`axios`的二次封装

```js
import axios from 'axios'
import { BASE_URL,TIMEOUT } from './config'


class XYRequest {
  constructor(baseURL, timeout=10000) {
    this.instance = axios.create({
      baseURL,
      timeout
    })
  }

  request(config) {
    return new Promise((resolve, reject) => {
      this.instance.request(config).then(res => {
        resolve(res.data)
      }).catch(err => {
        reject(err)
      })
    })
  }

  get(config) {
    return this.request({ ...config, method: "get" })
  }

  post(config) {
    return this.request({ ...config, method: "post" })
  }
}

export default new XYRequest(BASE_URL,TIMEOUT)
```

> `services`文件夹下除了建立`request`文件夹，还会建立`modules`文件夹
>
> - `modules`文件夹意思为模块，里面用来管理存放各个网络地址。
>
> 为什么不直接在组件中发送网络请求，还非要特地在`services`文件夹下专门创建一个管理网络地址的文件夹？
>
> - 因为当如果有一天我们的接口地址发生了改变，想要进行修改项目里的接口，我们就必须先找到我们是在哪个组件下进行的网络请求，而这无异于大海捞针。所有我们将所有的接口统一进行管理，在项目变大的有一天需要改变接口的地址的时候，就能够以极高的效率解决问题。
> - 对`axios`这种第三方库的依赖性就不会太强，导致没了`axios`我们的项目就运行不了了
>   - 这也更加符合模块化开发的思想

- 我们完成了上方的操作之后，在进行导入组件使用的时候，如果文件嵌套太多层了，我们可以在当前文件夹`services`中创建一个`index.js`进行管理路径，提升内嵌文件的层级

```javascript
export * from ".modules/city"

//然后在使用接口的文件下就能够直接引入如下进行使用
//import getCityAll from "@services"
//index.js由于脚手架的配置可以直接省略
```

### 城市数据的store管理

> 通过`axios`我们已经成功拿到了数据，拿到了数据后就要将数据保存下来，使用`ref`响应式保存在一个变量里面。**数据抽取保存在Pinia中**，方便各个组件获取数据。组件获取数据的时候如果解构需要包裹一层`storeToRefs`，防止其解构后数据失去响应式
>
> - 对于响应式`ref`保存我们应该避免空值导致默认`undefined`，否则可能会报错，所有在确认是对象的时候就填入一个空对象
> - 使用数据的时候应该使用`v-for`遍历的方式，这样才能够有强大的代码提示，且数据是动态的。
> - 如果数据量小，只是做个demo，也可以使用`保存数据变量名.xx.xx`来获取对应数据，但这样就写死了，不建议。且如果一开始定义数据`ref`响应式为空值的，会报错，因为空值默认`undefined`后面是没有数据的，解决方式`保存数据变量名?.xx?.xx`，ES6之后的语法，作用是如果没有内容就不获取

- 为什么网络请求也要放在Pinia中，而不是从组件中发起请求？

  - *这个位置发送网络请求有两个缺点：*

    *1.如果网络请求太多 。 那么页面组件中就包含大量的对于网络请求和数据的处理逻辑*

    *2.如果页面封装了很多的子组件 子组件需要这些数据， 我们必须 一步步将数据传递过去（props)*

### 动态数据cityGroup切换管理

> 城市界面下拉需要固定住`搜索框`跟`国内与海外的切换`
>
> - 方式1：固定布局fixed
>   - 缺点1：上方会漏掉一点，因为fixed布局会使搜索框部分脱离标准流，导致下方的内容往上跑了一些，需要设置向上的外边距
>   - 缺点2：下拉时的进度条连搜索框侧边都有，正常来说固定住的地方不该有滚动条的
> - 方式2：局部滚动
>   - 上下分离，划分成如下单独的两块地方互不影响

<img src=".\Vue3-H5_images\image-20230314094855967.png" style="zoom:50%;" />

> 获取下方独立的数据方式：
>
> - 上图中下方的内容的数据也是响应式的，我们需要做到随着`国内·港澳台`与`海外`进行切换的时候，数据也动态的进行切换。但是想要拿到数据，必须拿到如下对象里的两个键，而不是索引。因为对象是没办法通过索引来获取内容的。我们通过组件库提供的切换`国内海外`提供的一个监听事件进行填写`cityGroup`与`cityGroupOverSea`的值来动态获取数据
> - 但此时数据会是undefined，因为数据一开始是undefined，我们拿到的只是刚开始的值，而不是响应式的，这里就可以使用`计算属性`实时计算，当数值发生改变的时候，就重新获取数据
>   - 注解：Vue 的计算属性会自动追踪响应式依赖。它会检测到 `publishedBooksMessage` 依赖于 `author.books`，所以当 `author.books` 改变时，任何依赖于 `publishedBooksMessage` 的绑定都会同时更新。

![image-20230314101829006](.\Vue3-H5_images\image-20230314101829006.png)

```js
const cityStore = useCityStore()
//在pinia中没有真实调用action，引用的时候就需要先调用一下，从服务器中获取到数据
cityStore.fetchAllCitiesData()
//直接解构会失去响应式，需要包裹storeToRefs，或者toRefs也行。理论上是一个东西，使其不失去响应式
const { allCities } = storeToRefs(cityStore)
//默认情况下获取Tab标签页(中国与国外的索引)，能拿到跳转前和跳转后的索引。修改设置为获取key
const activeName = ref();
////数据是ref包裹的，都需要.value获取真实的数据
const cityGroup = computed(()=>allCities.value[activeName.value])
```

- 或者在一开始遍历的时候就进行填入，这样一更新内容就会重新遍历

![image-20230314105504901](.\Vue3-H5_images\image-20230314105504901.png)

### 城市分组列表数据展示

>  分组列表的处理会将代码嵌套进一步的加大，到这里就要继续拆分成组件了，在`city`文件夹下创建`cpns`文件夹用来存放城市分组列表数据展示的组件
>
> - 城市的数据量很大，如果采用`v-if`进行切换，会有较高的延迟，因为`v-if`会重新渲染。使用`v-show`进行优化

#### 热门城市的动态规划

> 使用接口进行展示热门城市的数据
>
> - 注意点：
>   - 加上热门城市后，侧边栏的A-Z与下拉时显示的A会错位一个地方，如下图显示，这是因为侧边栏是动态的写死的，会根据我们显示的一 一从上往下进行对应
>   - 通过组件库提供的`index-list`属性，我们能够自定义修改，但是并不能说只是仅仅在上面再加上一个`#`就结束了，因为我们不一定每个字母都有城市，如果中间有字母是没有对应城市的，就又会乱掉。所以这个侧边栏的数据也需要从服务器动态获取。然后通过函数将`#`unshift到从服务器拿到侧边栏数据的最前面

![image-20230314214104488](.\Vue3-H5_images\image-20230314214104488.png)

### 选择城市回退和回显效果

> 监听按下热门城市还有下拉列单的点击事件，进行回调跟获取数据(放入pinia)显示在首页

### 首页的日期选择默认显示

> 入住时间：使用`dayjs`库，命令：`pnpm install dayjs`
>
> - 我们格式化时间不一定就只会在这里用到，我们可以将这个封装为一个函数，放到独立文件`utils`中，也就是存放工具类的地方
>
> 离店时间：
>
> - 分别都用`ref`进行包裹使其为动态
> - 离店时间日期的设置：
>
> ```javascript
> //工具类单独封装
> import dayjs from "dayjs"
> export function formatMonthDay(date){
>   return dayjs(date).format("MM月DD日")
> }
> 
> //逻辑文件
> //处理日期
> const nowDate = new Date()//现在的时间
> const startDate = format_date(nowDate) //入住的时间，通过dayjs进行转化
> const endDate = format_date(nowDate.setDate(nowDate.getDate()+1)) //离店时间
> //这里的离店时间这样设置比直接加1会好在达到每个月极限日期会转换到月份
> ```
>
> - 离店时间另一种方法：获取时间戳，然后加上一天的时间戳后转化为日期
>
> ```javascript
> //获取时间戳
> new Date().getTime() + 24*60*60*1000
> ```

#### 首页的日历处理

- 对组件库的日历进行使用调整，将选择的值赋值给`startDate`和`endDate`

#### 停留天数的动态计算

- 在`入住`跟`离店`的中间会显示入住几晚，这里的几晚将换成动态
  - 计算入住跟离店的差值，我们写在工具类`utils`中，需要的时候直接调用
- 代码位于`home_search_box.vue`文件

### 热门建议的数据请求和展示

> 使用的接口：123.207.32.32:1888/api/home/hotSuggests
>
> 方式1：在`home`文件夹下的`home.vue`中发送网络请求，然后通过父传子的方式将数据传递给子组件使用
>
> 方式2：将网络请求的过程放在`service`的模块中，数据放在`stores`中
>
> - 将热门城市数据展示在首页
>
> ### 行高行距的分配问题说明
>
> - 这里热门城市的显示偏下是因为CSS行高的问题，由于我们引入`normalizs.css`进行重置，里面对整个html的行高是有进行全局设置的，我们只需要自己设置一下行高覆盖掉他的继承就行了。
>   - 处理方式2：全局CSS修改为自己需要的

![image-20230315185854793](.\Vue3-H5_images\image-20230315185854793.png)

## 首页点击搜索-列表数据

### 搜索按钮搭建和点击跳转搜索

> 写出搜索按钮的样式，点击进行跳转到新创建的搜索界面`views/city/search`(新创建的，一个完整的界面就是一个views里完整的文件夹)，通过编程式路由携带参数可以将数据跟随路由传递过去。
>
> - 传递的参数通过`$router`传递(参数内容会显示在URL上)
>
> ![image-20230316031930269](.\Vue3-H5_images\image-20230316031930269.png)
>
> - 通过路由元数据`mate`来进行隐藏底部`TabBar`
> - 公用的内容比如城市信息什么的就不用通过这里这样传了，直接使用`pinia`就行了，不用解构

### 首页请求和管理分类数据

> 使用到的接口：http://codercba.com:1888/api/home/categories
>
> - 在`pinia`中获取网络接口请求请求数据需要注意的点：
>   - *完成获取数据的时候需要先去其他页面调用网络请求，不然一开始是没有数据的*

#### 分类菜单的展示

- 对于这个独立的内容区域，抽取为组件，放在`views/home/cpns`文件夹下，隶属于home页面的子组件
- 对数据进行一个展示，这里我是自己写样式，比使用组件库会更方便一点，这里使用到的隐藏滚动条样式：

```css
  &::-webkit-scrollbar{
    display: none;
  }
```

### 首页内容模块组件的封装

> - 页面具体内容的展示，继续分成组件放入`home`文件夹下的`cpns`文件夹(放置home子组件的地方)中
> - 接口返回数据的时候一般都不会太多，过多的数据让前端处理会导致页面加载的卡顿，最好的方式还是交给后端，数据放在服务器处理，占据服务器的资源，而不是用户浏览器的资源
>   - 接口返回的参数里面真实情况下可能会有两种方式
>     - 方式1：传递`page`，也就是页数，让服务器向我们传递第几页的数据(服务器处理好了分页)
>     - 方式2：传递`size`与`offset`，分别表示一次性向服务器请求几条数据 和 偏移多少条数据，例如我们第一次向服务器请求了30条数据，那第二次请求数据的时候就不能重复前面30条数据，这时候就可以使用第二个参数`offset`偏移开头30条数据，继续往后请求还未请求的数据 

### 首页房间列表数据的请求

> 使用接口：http://codercba.com:1888/api/home/houselist?page=1
>
> - 这里接口返回的参数形式就是上面的第一种
>
> - 使用带有参数接口的注意事项：
>
>   - `page`不能够写死为1，在`service`文件夹下的网络请求应该通过形参的方式传入参数来动态请求page对应的内容。我们是通过`pinia`的`actions`来请求异步数据的，这里请求的时候也应该留出一个参数的方式继续动态的规划`page`的数值，传递到pinia这边后，在`state`定义一个数据变量为1，然后直接传进网络请求的函数里面，每次请求完数据就把这个定义的数据变量自增1
>
>   - 不能够像下面获取数据这样
>
>     ```js
>     async fetchHotSuggestData(){
>       const res = await getHomeHotSuggests()
>       this.hotSuggest = res.data//这里的获取数据方式不是这样
>     }
>     ```
>
>   - 正确的获取方式：
>
>     ```javascript
>         async fetchHouseList(){
>           const res = await getHomeHouseList()
>           this.HouseList.push(...res.data)
>         }
>     ```

![image-20230316100830116](.\Vue3-H5_images\image-20230316100830116.png)

#### 列表数据的不同类型展示

- 类似如下两种不同类型的展示

![image-20230316112601841](.\Vue3-H5_images\image-20230316112601841.png)

- 类型的区分是通过服务器的接口数据进行判断的

![image-20230316113126975](.\Vue3-H5_images\image-20230316113126975.png)

- 根据`discoveryContentType`为3还是为9进行不同的判断`v-if`，如果有更多的数字类型就继续增加判断，然后根据不同的数字去做不同的效果展示

### 列表不同类型的搭建和布局

- 由于列表房源数据有不少风格，所以将其封装成组件，然后分别进行使用是个不错的选择
  - 所以这里创建了两个常用的风格的组件，在`components`下的`house-item-v3`和`house-item-v9`
  - 将这两个组件引入`home_content`中进行使用，然后通过父传子的方式将`home_content`中的数据引入两个样式组件中进行展示

> 涉及知识点：(父传子传递的是`Object`)
>
> - `()=>({})` 返回一个对象字面量（object literal），即一个空的对象。这是因为箭头函数中的圆括号被解释为表达式的一部分，因此可以用花括号包裹对象字面量，返回一个对象
> - 而 `()=>{}` 返回 undefined。这是因为花括号内没有任何表达式，因此返回值为 undefined
> - 因此，如果需要返回一个空的对象，应该使用`()=>({})`，如果不需要返回值或返回 undefined，应该使用 `()=>{}`。

- 这个小卡片一样的东西需要调挺久的CSS，需要慢慢调整
- 在首页展示卡片数量一次性有限，设置按钮，点击后继续往后显示

### 首页滚动底部加载更多

> 监听：什么时候页面滚动到了底部？
>
> - 页面为什么发生滚动？
>
>   1. window窗口
>   2. 元素：overflow：auto
>
>   这是**窗口发生了滚动还是说窗口里面的元素在进行滚动**，需要进行区分。

- 在`home`组件中进行监听窗口的滚动，我这里的视图高度还会再加50px是因为我的tabBar底部也是视口的一部分
- 这个监听的过程我们可能不止这里会用到，这里的逻辑我们可以封装的`hook`里面

<img src=".\Vue3-H5_images\image-20230322202515106.png" style="zoom:50%;" />

### 监听滚动hook函数的抽取

> 监听window窗口的滚动
>
> - 当我们离开页面时，我们移除监听(其他页面的滚动不应该影响到首页或者其他页面用到滚动来获取数据的情况)
>   - 使用`onUnmounted`跟`onMounted`生命周期，也就是我们监听滚动只在`挂载`组件跟`卸载`组件之间进行
> - 如果别的页面也进行类似的监听，会编写重复代码

- 所以我们进行抽取到`hooks`文件夹中，但达到一定程度(下拉滚动多少)后向服务器请求数据的过程需要保留在组件里面，因为我们抽取出来的是公共逻辑，而请求数据的过程是`home`组件自己独有的
- 在抽取逻辑`hook`的时候，我们不采用回调函数的方式

```javascript
//回调的方式，采用传值进去
export default function useScroll(reachBottomCallback){
	//xxxx
}
```

```js
//hooks抽取逻辑经典做法
export default function useScroll(){
	//xxxx
  return {reachBottomCallback}
}
//调用的时候 const { reachBottomCallback } = useScroll()
//这个reachBottomCallback在这里是一个布尔值，用来返回是否到达窗口的底部。然后使用fetch进行监听，我们监听到的话就将向服务器请求数据的过程保留在组件中
```

- 在这个项目中的例子如下

```javascript
//位于home文件夹下的home.vue文件的调用hook

// 调用hook公共 滚动底部加载更多 逻辑
const { isReachBottom } = useScroll()
watch(isReachBottom,(newValue)=>{
  if(newValue){
    //调用首页继续请求卡片信息数据，请求成果将到达底部的true重置为false
    homeStore.fetchHouseList().then(res=>{
      newValue.value = false
    })
  }
})
```

```javascript
//hook逻辑

import { onMounted,onUnmounted,ref } from 'vue';

// 预留接口位置用来传递调用
export default function useScroll(){
  const isReachBottom = ref(false)
  const scrollList = () => {
    // 客户端的高度
    const clientHeight = document.documentElement.clientHeight
    // 距离视图的顶部
    const scrollTop = document.documentElement.scrollTop
    // 视图的高度
    const scrollHeight = document.documentElement.scrollHeight
    // 客户端高度+距离视图的顶部=视图的高度(相当于获取到了底部)
    // 底部tabBar的高度50px
    const tabBarHeight = 50
    if(clientHeight + scrollTop + tabBarHeight >= scrollHeight){
      // 到达底部就设置isReachBottom为true，证明已经达到底部
      isReachBottom.value = true
    }
  }
  
  // 监听window创建的滚动，在挂载到卸载组件的这段时间中
  onMounted(() => {
    window.addEventListener("scroll",scrollList)
  })
  
  onUnmounted(() => {
    window.removeEventListener("scroll",scrollList)
  })

  return { isReachBottom }  //大多数hook的做法，在传输内容变多的时候，通过这个传达出去解构将会是非常好的方法
}
```

### 监听页面滚动显示搜索工具栏

> - 下拉一定距离显示搜索工具栏，我们通过刚刚hook里面有提到的距离视图顶部的距离就能够实现，那这个功能也是可以封装在`Hooks`里面的，然后我们对刚刚封装成hook的逻辑还可以再做出优化，像视图的高度，距离视图的顶部，客户端的高度这些都是我们很可能用上的功能，那这些功能就可以不写在`useScroll`函数里面，而是写在`useScroll`函数的外层，这样这些变量就是全局的了，我们将这些变量转化成响应式，在函数中进行一系列操作后可以return出去，在其他地方引用的时候就能够直接解构出来

### 计算函数和节流函数

> 使用`watch`进行监听还是使用`computed`进行更新取决于我们是要改变一个值(`使用computed`)还是说执行一段逻辑(`watch`，例如说我们需要进行if判断或者for循环啥的之类的情况)
>
> 然后就是我们一滚动其实通过打印控制台会发现触发函数的频率是非常之高的，一滑动就会触发几十上百次。这个时候我们就可以使用`节流函数`的方法
>
> 使用防抖节流的进行项目的开发，一般情况下不用自己手写，那通常可以选择两种方案：
>
> 1. 自己手写一个引入
> 2. 引入第三方库`underscore`，命令`pnpm install underscore`。我们使用到的是里面的`throttle`

#### 防抖节流的区别

JavaScript中的防抖和节流都是为了解决高频率事件导致的性能问题，但它们的实现方式和应用场景有所不同。

1. **防抖**

防抖的基本思想是在事件被触发n秒后再执行回调函数，如果在这段时间内又触发了该事件，则重新计时。也就是说，当用户连续触发某个事件时，防抖只会执行最后一次操作，前面的操作都会被忽略。**防抖可以应用在输入框搜索、页面滚动等高频事件中，可以减少不必要的请求或操作**。

防抖的实现方式比较简单，可以通过setTimeout来实现：

```javascript
function debounce(fn, delay) {
  let timer = null;
  return function() {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, arguments);
    }, delay);
  }
}
```

2. **节流**

节流的基本思想是在一段时间内只执行一次回调函数，即使在这段时间内该事件被触发多次。也就是说，节流会按照一定的时间间隔来执行回调函数。**节流可以应用在页面滚动、窗口大小调整等高频事件中，可以减少不必要的计算和渲染**。

节流的实现方式也比较简单，可以通过记录上一次执行回调函数的时间来实现：

```javascript
function throttle(fn, delay) {
  let lastTime = 0;
  return function() {
    const nowTime = Date.now();
    if (nowTime - lastTime > delay) {
      fn.apply(this, arguments);
      lastTime = nowTime;
    }
  }
}
```

3. **区别**

防抖和节流都可以减少高频率事件的触发次数，从而提高性能，但它们的实现方式和应用场景有所不同。

- 防抖可以避免在一段时间内多次触发同一个事件，只会执行最后一次操作，适用于输入框搜索、页面滚动等高频事件。
- 节流可以保证在一段时间内只执行一次回调函数，适用于页面滚动、窗口大小调整等高频事件。

总的来说，防抖和节流都是优化高频率事件的有效手段，但需要根据具体的场景来选择合适的实现方式。

**我们对hook进行改造实现**

```javascript
  // 进行节流，每200毫秒只能触发一次，throttle是第三方库的东西，记得引入
  const scrollList = throttle(() => {
    // 客户端的高度
    clientHeight.value = document.documentElement.clientHeight
    // 距离视图的顶部
    scrollTop.value = document.documentElement.scrollTop
    // 视图的高度
    scrollHeight.value = document.documentElement.scrollHeight
    // 客户端高度+距离视图的顶部=视图的高度(相当于获取到了底部)
    // 底部tabBar的高度50px
    const tabBarHeight = 50
    if (clientHeight + scrollTop + tabBarHeight >= scrollHeight) {
      // 到达底部就设置isReachBottom为true，以及证明
      isReachBottom.value = true
    }
  },200)
```

### TabBar默认索引bug处理

> 如果我们使用的底部tabBar是组件库的组件的话，那需要进行一定的调整，那就是加上 下方图片中圈起来的`route`
>
> ![image-20230323135554233](.\Vue3-H5_images\image-20230323135554233.png)
>
> 根据组件库中的提示我们可以知道这个的作用是用来匹配`页面路径`跟`标签的to属性`的
>
> ![image-20230323135841429](.\Vue3-H5_images\image-20230323135841429.png)

<img src=".\Vue3-H5_images\image-20230323140555018.png" style="zoom:50%;" />

```javascript
//记录点击的情况，排他思想
const currentIndex = ref(0)
//进行实时更新路径的切换并且跟底部tabBar索引对应
watch(route,(newRoute)=>{
  const index = tabbarData.findIndex(item => item.path === newRoute.path)
  // 如果没有找到索引的话，findIndex返回的是-1 。因为我们除了底部tabBar之外还会有其他的页面，这些页面的路由跳转就跟底部没有什么关系了，所以需要考虑到这点
  if (index == -1) return
  currentIndex.value = index
})
```

### 搜索工具栏的封装和展示

> 在组件中重新创建一个组件，这里面细节的内容主要是时间内容的动态传递(`住和离`，我们放到pinia的里面的一个模块中，对于这个住跟离的时间是我们会在很多地方会使用的，不仅仅是`home`模块在使用，那这个时候我们还可以在建立一个`mainStore`模块，这个模块存放的是`全局`中我们都会很经常用到的数据)，剩下的就是下拉多少距离后显示出来还有样式的调整(需要一点耐心)

- 这个时间传输在`mainStore`中进行了重构，涉及文件`search_bar.vue`，`home_search_box.vue`

  ,`mian.js`。重构完进行使用的时候，需要记得使用我们封装的方法进行格式化并实时监听

```js
// 格式化字符串，使用我们封装在工具类utils中的格式化方法
const startDateStr = computed(()=> formatMonthDay(startDate.value))
const endDateStr = computed(()=> formatMonthDay(endDate.value))
```

#### 优化格式化时间工具类

- 优化前

```js
export function formatMonthDay(date){
  return dayjs(date).format("MM月DD日")
}
```

- 优化后

```js
export function formatMonthDay(date,formatStr="MM月DD日"){
  return dayjs(date).format(formatStr)
}
```

> 优化完成之后，可以由我们自己决定格式化时间的显示方式

**在这里大量使用了computed计算属性，需要理解掌握什么时候使用`计算属性`，什么时候使用`watch监听器`**

## 页面加载进度-详情页-百度地图-选卡封装

### loading组件的封装

> 我们在首页下拉、选取城市的时候，都会向服务器请求数据，这个时候，请求数据因用户网络环境的不同会呈现或长或短的请求时间，在数据还未加载出来的时候，需要显示一个正在加载的页面提供给用户，提高用户的体验

- 作用在整体上，也就是我们所有加载的空缺时间内都是需要这个`loading`的，那采取的做法是将其封装成组件，引入进`App.vue`主组件中进行使用

### 控制loading组件的显示时机

> 在这里使用`v-if`与`v-show`的区别：
>
> 1. v-show相当于用display切换为none进行了隐藏。使元素不再显示，其对布局不会有影响（文档渲染得好像这个元素并不存在）。所有的后代元素也不会再显示。
> 2. v-if相当于移除了组件，从根本上不存在。这里更适合这种方式，因为我们只有在向服务器发送数据请求的空白期才需要，大部分时间都是完全不需要的
>
> - 如果请求时间过长，用户就一直无法与界面进行交互，所以设置一个点击界面，当用户点击等待loading界面就取消掉加载的界面

- 我们将loading封装成了组件，但是如果每次发送网络请求的时候就要写一遍判断的话，那可能需要写上二十多甚至更多遍的判断(我们将判断的时机的结果存储在pinia中)，因为在整个APP中无时无刻都在向服务器发送请求，所以应该要有更好的方法。
- 那就是将这个判断过程写在发送网络请求的时候，**当发送网络请求前显示加载loading组件界面**，**当网络请求发送成功，请求结果返回的时候结束加载loading界面**。这个功能就写在我们二次封装axios的里面，引入了mainStore这个pinia主商店的`isLoading`判断布尔值进行判断

```javascript
  request(config) {
    mainStore.isLoading = true
    return new Promise((resolve, reject) => {
      this.instance.request(config).then(res => {
        resolve(res.data)
        mainStore.isLoading = false
      }).catch(err => {
        reject(err)
      })
    })
  }
```

![image-20230324232348206](.\Vue3-H5_images\image-20230324232348206.png)

> 如果数据请求失败的话，那也需要将loading等待界面设置为false，但是我们不直接添加在catch之后，而是放在拦截器中。那上面写在request中的也可以去除掉了，换在拦截器中。好处是结构层次会更新分明

![image-20230324234536819](.\Vue3-H5_images\image-20230324234536819.png)

### 点击首页卡片跳转到详情页

> - 方法1：我们目前有两种类型的卡片，一个是V3，一个是V9。第一个方法就是在两个卡片中都写上点击事件，然后通过`defineProp`让父级的数据(卡片的ID，判断我们点击的是哪张卡片)进行父传子。
>
> 但这有个问题就是目前是两种卡片，未来可能会有更多类型的卡片，这种写法如果不断的重复的话其实还是存在可优化的空间的
>
> - 方法2：直接把点击事件写在组件上面，这个点击事件能不能写在组件上面是需要看场景的，因为我们写在组件身上的点击事件不是绑定在组件身上的，而是绑定在组件的根元素上面(**也可以通过$attr进行指定**)，而在当前的情况下，是符合条件的，因为我们就是需要不管点击卡片的哪个地方都要触发跳转详情页

![image-20230325004104681](.\Vue3-H5_images\image-20230325004104681.png)

- 在`views`视图文件夹里创建`details`文件夹，在此文件夹里再创建`details.vue`文件。通过点击事件进行**编程式路由**跳转，参数的携带通过添加后缀进行跟进，不采用query

![image-20230325010935795](.\Vue3-H5_images\image-20230325010935795.png)

![image-20230325010955925](.\Vue3-H5_images\image-20230325010955925.png)

- 地址上的表现形式：

![image-20230325011011950](.\Vue3-H5_images\image-20230325011011950.png)

> - 使用冒号（:）定义的参数是动态路由参数，可以将参数作为路径的一部分，动态传递信息到路由组件中。例如在上面的示例中，参数“id”将作为路径的一部分，动态传递给路由组件“@/views/details/details.vue”。
>
> - 动态路由参数与query参数有一些区别。动态路由参数出现在URL的路径部分，而query参数出现在URL的查询字符串部分。另外，动态路由参数在URL中是可见的，而query参数可以被编码或隐藏，因此不可见。
>
> - 使用动态路由参数和query参数的选择取决于我们的具体需求。如果参数是必需的，并且它们是URL的一部分，则应该使用动态路由参数。如果参数是可选的，并且它们不需要出现在URL的路径部分，则应该使用query参数。

### 导航栏的搭建和主题色修改

- 导航栏的搭建使用`Vant组件库`，主题色的修改在全局CSS中进行修改。组件库有提供对应的变量给我们进行修改颜色，这步骤简单
- 然后使用路由关联点击事件在左上角进行返回的操作

### 详情数据的请求和页面管理

> 数据接口地址：[codercba.com:1888/api/detail/infos?houseId=20061007](http://codercba.com:1888/api/detail/infos?houseId=20061007)
>
> 上面的接口地址只是一个例子，从`infos`数据里面的不同`house的Id`，每个Id都是一段不同的数据
>
> 通过接口地址，我们也能够管中窥豹到这其实是`detail`，也就是详情页的数据

- 这里就又要涉及到新的数据的请求和保存了。保存可以使用`pinia`的`store`进行保存或者是直接放到详情页中进行管理。数据的请求的话那就是在`services`文件夹中再建一个文件用来处理详情页的数据请求
- 这里保存数据采用第二种方式，直接拿到详情页组件中进行使用，不存放再store中，正常情况下统一使用一种就行
- 数据太过复杂也可以进行一个拆解(使用计算属性来维持响应式)，拆解的具体步骤看视图中的`detail组件`

### 轮播图展示

> 轮播图使用组件库完成，封装到`detail`文件夹下的`cpns`组件文件夹中，然后数据通过父传子传递给子组件，进行css的调整就完工了。
>
> - 在进行展示数据的时候，网络请求发送前，我们放到组件中的数据是undefined，在前面有第一种方案是使用`?.`来处理。在这里可以使用另一种方式，在外面套上一层div，div使用v-if控制，只有当有数据的时候才进行展示。这样当我们需要判断很多数据的时候，只需要把需要判断的部分丢进这个div里面就行了，而不用写很多的`?.`进行判断

#### 轮播图自定义和作用域插槽

- 使用的还是组件库中自带的功能
  - active应该就是当前的索引，因为索引都是从0开始的，所以会有个加1，如果不想要加一也可以去获取他的长度
  - total就是总共的数量
  - 组件库采用的是作用域插槽的解构方式

![image-20230327073628493](.\Vue3-H5_images\image-20230327073628493.png)

#### 轮播图数据的转化和展示

- 组件库提供的自定义只是最基础的版式，后续还得我们进一步的分类

**目前效果：**

![image-20230327074621804](.\Vue3-H5_images\image-20230327074621804.png)

**需要实现的效果：**

![image-20230327074606478](.\Vue3-H5_images\image-20230327074606478.png)

对数据进行划分前需要看接口提供的哪些数据给我们：

![image-20230327074814520](.\Vue3-H5_images\image-20230327074814520.png)

![image-20230327074840183](.\Vue3-H5_images\image-20230327074840183.png)

![image-20230327074857740](.\Vue3-H5_images\image-20230327074857740.png)

> 其中`title`是当前照片是什么类型，`url`和`albumUrl`是提供的图片，`orderIndex`是索引，`enumPictureCategory`则是当前类型照片的第几张。
>
> - 里面的数据虽然没有分类，但也有通过对应的字段提供给我们

对数据转换的方式：

`较为复杂的方式(更好理解)`：

- 第一个for循环初始化不同类型的数组，第二个for循环填入数据
- 但是比较浪费性能

![image-20230327081554265](.\Vue3-H5_images\image-20230327081554265.png)

`更为简洁`：

- 一次循环成型
  - 第一次取到valueArray是没有值的(我们赋值的`enumPictureCategory`是当前类型的第几张)，只有键没有值，所以进行一个判断，第一次没有值的时候赋值一个空数组，并且将空数组赋值到`swipeGroup`这个对象中。为当前对象的第n个位置初始化一个空数组。最后将valueArray填入数据。由于`enumPictureCategory`是动态的，所以来的只要不是之前初始化过的位置，就会被丢进去初始化一遍空数组，不会重复初始化。

![image-20230327082016620](.\Vue3-H5_images\image-20230327082016620.png)

`一次形成的数据`：

![image-20230327163318833](.\Vue3-H5_images\image-20230327163318833.png)

- 随着点进入的数据的不同形成的数组数量也不同

![image-20230327163418978](.\Vue3-H5_images\image-20230327163418978.png)

- 这个数据后面会用上。先通过v-for循环父传子的数据进行展示`title`

![image-20230327182809544](.\Vue3-H5_images\image-20230327182809544.png)

- 对于这个`【】`和`：`占据过大的位置可以通过`replace`解决，也可以通过正则解决

```javascript
//正则
const nameReg = /【(.*?)】/i
const getName = (name) => {
  const result = nameReg.exec(name)
  return result[1]
}
```

#### 轮播图指示器细节

> 我们目前看指示器并没办法区分我们目前看的是哪类
>
> ![image-20230327224652847](.\Vue3-H5_images\image-20230327224652847.png)
>
> 假如我看的是卧室，我希望能够跟卫生间和其他分开，其他的同理，那这个就需要一个判断。判断当前轮播图的页面的类别跟指示器的哪个部分能够对应上，给指示器加上其他的样式。然后根据这同样的思路加上其他的样式(例如当前类型的第几张/当前类型的总数量)
>
> - 这个点会比较难，具体的内容在视图文件夹中的details下的cpns中

### 房屋信息展示

- 接下来大多数就是展示数据了，需要将不同的模块封装成不同的组件进行展示，纯粹展示接口的数据比较简单。下面框起来的封装成一个`detail_02-infos.vue`组件，放在`details`文件夹下的组件文件夹中。

![image-20230328142448811](.\Vue3-H5_images\image-20230328142448811.png)

#### 详情区域的封装和房屋设施展示

- 这部分格式很像，如下图分成了3部分。只有中间的不一样。所以我们的做法是封装公用的组件`detail-section`在`components`中，然后中间内容部分预留插槽

![image-20230328143145378](.\Vue3-H5_images\image-20230328143145378.png)

- 公用的全局组件再二次封装进我们`detail`的局部组件中

#### 房东-评论-须知的页面搭建

- 跟上面类似的操作，主要的还是继续再`detail`文件夹下的`cpns`组件文件夹创建一些组件用来复用上面的内容，在中间插槽写入其他部分(`房东`、`评论`、`须知`)的内容

### 百度地图的集成和使用过程

> 对应的功能API集成在`百度地图开放平台`：[百度地图开放平台 | 百度地图API SDK | 地图开发 (baidu.com)](https://lbsyun.baidu.com/)
>
> - 使用之前需要先注册账号，如果你电脑本身已经登录过百度账号，这边会直接自动登录
> - 填写开发者认证信息(点击导航栏的`控制台`选项，进入注册开发者界面)

![image-20230329015232501](.\Vue3-H5_images\image-20230329015232501.png)

![image-20230329015530170](.\Vue3-H5_images\image-20230329015530170.png)

- 在注册的第三步中，需要在使用场景中填入不少于100字的使用描述

![image-20230329022457459](.\Vue3-H5_images\image-20230329022457459.png)

- 这里使用chatGPT4生成文案解决问题

![image-20230329022525238](.\Vue3-H5_images\image-20230329022525238.png)

> 在未来智慧城市的构建过程中，我们计划利用百度地图开发平台，为用户提供更加便捷和智能的出行服务。我们将开发一款名为"智慧出行助手"的移动应用，通过该应用，用户可以根据实时的交通信息、天气情况以及出行需求，为自己规划出最佳的出行方案。以下是我们打算使用百度地图开发平台的几个使用场景：
>
> 1. 实时路况查询：通过百度地图开发平台提供的实时路况接口，用户可以随时查看当前所在地区的交通状况，了解周边道路的拥堵程度，从而避免出行高峰期。
> 2. 天气预报与提醒：结合百度地图的天气接口，我们将为用户提供实时的天气预报信息，帮助用户了解未来几小时甚至几天的天气状况，为出行安排做好准备。
> 3. 路线规划：借助百度地图的路线规划功能，我们将为用户提供包括公交、地铁、自驾等多种出行方式的最佳路线建议，同时可根据用户的实际需求提供换乘、时间、距离等方面的个性化建议。
> 4. 兴趣点查询：通过百度地图的POI兴趣点查询功能，用户可以轻松查找周边的餐厅、购物中心、医院等热门场所，便捷地满足日常生活需求。
> 5. 导航功能：在出行过程中，用户可以通过百度地图的语音导航功能，实时获取行驶路线指引，确保每一个出行都能准确抵达目的地。
>
> 通过以上使用场景，我们希望借助百度地图开发平台的强大功能，为用户提供一款全方位的智能出行助手，为城市的智慧化发展贡献力量。

- 填写必要信息之后认证成功

![image-20230329023110954](.\Vue3-H5_images\image-20230329023110954.png)

- 创建应用

![image-20230329023346952](.\Vue3-H5_images\image-20230329023346952.png)

- 填写内容后提交得到`访问应用AK`

![image-20230329023655470](.\Vue3-H5_images\image-20230329023655470.png)

![image-20230329023718655](.\Vue3-H5_images\image-20230329023718655.png)

- 使用的话通过开发文档

![image-20230329023827024](.\Vue3-H5_images\image-20230329023827024.png)

- 然后从开发指南选项就可以开始入门使用了(步骤在开发指南中很详细)

![image-20230329024046685](.\Vue3-H5_images\image-20230329024046685.png)

- 在项目文件的`index.html`中加入如下内容：
  - `index.html` 文件中一般包含了应用程序所需的所有的 JavaScript 和 CSS 文件的引入，以及应用程序的根元素的声明。所以我们百度的JavaScript内容引入到这里面

```javascript
//添加一个meta标签，以便页面更好的在移动平台上展示
<meta name="viewport" content="initial-scale=1.0, user-scalable=no" />  
//引用百度地图API文件
<script type="text/javascript" src="https://api.map.baidu.com/api?v=3.0&&type=webgl&ak=密钥"></script>
```

- 然后就可以开始创建我们的`百度地图`组件了，命名为`detail_07-map.vue`
  - 我们在使用百度地图相关内容的时候，js部分不能直接写在`setup`中，因为Vue3的`setup`语法糖用于替代 Vue 2 中的 `created()` 和 `beforeCreate()` 钩子函数，它在组件实例创建之前执行。所以我们如果写在setup中，内容的元素不一定已经挂载上去了
  - 我们这部分内容需要写在`onMount`生命周期中

- 具体的步骤跟API就记录在百度地图的文档中：[jspopularGL | 百度地图API SDK (baidu.com)](https://lbsyun.baidu.com/index.php?title=jspopularGL/guide/helloworld)

### TabControl的展示和监听滚动过程

> 封装成通用组件`tab-control`，然后对原本`hook`文件夹中监听距离顶部的逻辑`useScroll.js`做出修改，原本的逻辑是监听窗口距离顶部的变化，现在我们需要用到里面的元素(也就是最外层的div)距离顶部的距离，所以进一步修改将其通用性增强.然后在`details`组件中使用

- 还记得前面刚开始封装hook中这份逻辑中需要区分的点吗

![image-20230329131614840](.\Vue3-H5_images\image-20230329131614840.png)

- 需要注意的点：
  - 在展示`TabControl`的时候，需要先使用CSS进行固定定位将其固定在当前视口最上面，不然就算进行判断显示出来，没有固定住会在原本的位置上，就算拖动到该显示出`TabControl`的时候也看不到他，不是没有展示出来，而是展示出来了但是没有固定住已经被滑动出可视范围外了

### TabControl的交互和滚动位置

> 这个交互我们就需要将`TabControl`栏跟内容进行一个交互关联起来，才能够在点击按键的时候能够跳转到对应的位置中去。我们通过`defineEmit`将`TabControl`的索引拿到传递给`父组件`跟`父组件TabControl`的内容联系起来
>
> <img src=".\Vue3-H5_images\image-20230329152738200.png" style="zoom:50%;" />

- 在所有的组件中加上一个`ref`，然后再js中获取对应的值(由于我们直接在组件中使用ref，如果直接.value获取到的是组件本身，需要在`.value`的基础上继续`.$el`拿到他的根元素)
- 如果单纯的`ref`的话，我们需要给每个组件(除了第一个)都绑定上，然后重复的进行上面的操作。这样的操作肯定是不好的，会产生大量重复的代码。所以我们使用`:ref`动态绑定函数
- 但是这里下拉的时候会不断的刷新，对于性能是一个比较大的浪费，优化的方式就是在刷新的这部分内容中加上`memo`，设置只有`mainPart`发生了变化才会更新

> `memo` 函数是 Vue 3 的一个新特性，用于优化渲染性能。它在 Vue 3 的 Composition API 中提供，用于缓存并跟踪响应式值的更改，从而在值发生更改时仅重新计算依赖它的副作用。
>
> `memo` 是一个接受一个工厂函数作为参数的函数。工厂函数会在第一次调用时执行，其返回值将被缓存。后续调用将返回缓存的结果，直到依赖的响应式值发生变化。一旦依赖项发生变化，工厂函数将再次执行，缓存并返回新的结果

- 我们`TabControl`的内容是由`:title`进行控制的，如果直接写入一个数组来显示内容的话，其实就跟下面`描述`、`设施`、`评论`等内容没有关联上了
  - 所以我们可以给组件再加上一个`name`属性，然后将`name`属性跟`:ref`关联上，组成一对的键值对

- **这一步比较复杂**，需要慢慢构思

## 移动适配-打包

### 详情页返回小bug逻辑判断

> 目前的情况下在详情页中点击左上角的返回会报错。这是因为在点击返回的时候，详情页的组件都会进行销毁，但是里面的`getSectionRef`会被触发，但是组件已经销毁了，获取到组件的信息就是`null`，从`null`中获取值就会报错，所以只需要在这里加个判断就行

![image-20230329173859199](.\Vue3-H5_images\image-20230329173859199.png)

### 页面滚动匹配TabControl索引

- 目前有个问题还未解决，当我们详情页下拉的时候，`TabControl`索引应该要随着下拉内容的变化而变化，而不是只有点击的时候才进行变化
- 需求： 页面滚动， 滚动到一定的位置时， 显示正确的tabControl的索引(标题)

<img src=".\Vue3-H5_images\image-20230329174538670.png" style="zoom:50%;" />

- 其中用到的算法

```javascript
// 页面滚动，滚动时匹配对应的tabControl
const tabControlRef = ref()
watch(scrollTop, async (newValue) => {//距离顶点 新的值
  const els = Object.values(sectionEls.value)//获取tabControl身上的根元素
  const values = els.map(el => el.offsetTop)//映射根元素距离顶部的距离
  // 根据newValue去匹配想要的索引
  let index = values.length - 1//获取tabControl对应的索引值
  for (let i = 0; i < values.length; i++) {
    if(values[i] > newValue + 44){
      index = i - 1
      break
    }
  }
  await nextTick();
      // 调用子组件实例的方法
      if(tabControlRef.value) tabControlRef.value.setCurrentIndex(index);
})
```

- 在父组件中的子组件上添加`ref`的作用是获取子组件的实例

### 点击tabs的跳动bug处理

在前面中，百度地图的API会报警告如下：

![image-20230330003258697](.\Vue3-H5_images\image-20230330003258697.png)

- 解决方法：

  - 在`index.html`中修改一下内容，警告就能消除掉

  ![image-20230330003504231](.\Vue3-H5_images\image-20230330003504231.png)

- 我们在点击`tabControl`的时候，如果从第一个跳转到第三个，或者就是说跳转的中间还有其他内容的话，会有一个颜色一格一格跳过去的停顿感，而不是直接一步到位跳转过去。
- 解决方案：声明一个变量`isClick`(存放布尔值)，当我们触发点击事件的时候，就不执行过渡效果(跳过我们设置触发滑动索引的算法)，滑动的时候就触发过渡效果
- 但是当我们通过点击滚动到对应位置的时候，需要将`isClick`设置回去，不然点击完后继续滑动`TabControl`就没办法动态颜色切换了。所以我们需要再设置一个变量`currentDistance`，然后在点击事件里面将当前距离顶部的距离赋值给这个变量，然后在滑动索引算法中判断`currentDistance`和通过滑动距离顶部的值是否相同，相同的话就将`isClick`重新设置为false

### 切换页面的keep-alive操作

> 我们在首页浏览界面的时候，发送网络请求分页请求数据的时候，如果突然跳转到其他界面去的话，再重新回到首页，网络请求又会重新加载一遍，但是网络请求分页的时候，只会从我们刚刚跳转前请求第几个分页数据的基础上继续向后请求，忽略掉了前面分页1、2、3...的请求
>
> - 原因是：我们离开了首页组件的时候，会销毁组件的。但是其中的数据保存在`useHomeStore`中，这是全局的数据
> - 可以使用保持活跃的`keep-alive`让首页不被销毁，这个就可以在`App.vue`组件中定义这一点了，但是这个`keep-alive`是需要有name的，但是我们setup语法糖中是没办法定义name名字的，不过这个问题目前已经被`B站UP主小满zs`解决了，通过他写的插件可以实现`<script setup name="xxx">`的写法，在他Vue3的教程中有介绍此种写法。不过这里还是暂且不使用这种方法

```html
<!-- name属性 -->
<router-view v-slot="props">
  <keep-alive include="home">
    <component :is="props.Component"></component>
  </keep-alive>
</router-view>
```

#### 首页返回位置记录

> 从其他页面跳转回首页的时候，保持首页原本浏览的位置
>
> - 在home组件中添加如下代码

```javascript
// 跳转回home保持原来的位置
onActivated(() => {
  homeRef.value?.scrollTo({
    top: scrollTop.value
  })
})
//这里出了点问题，以后再来解决
```

#### pxtovw单位的转换

- 我们在Vite打包中，使用`postcss`工具中的`plugin`的`postcss-px-to-viewpost`可以将px转化成vh和vw的单位
- Vant组件库也有提供

![image-20230330021354434](.\Vue3-H5_images\image-20230330021354434.png)

- 使用命令：`pnpm install postcss-px-to-viewport -D`进行安装

- 创建一个postcss.config.js文件

```javascript
//vue cli基于webpack(在vite中用不了)
module.export = {
  plugins:{
    'postcss-px-to-viewport':{
      viewportWidth: 375//设计稿的大小
    }
  }
}
```

### 打包

- 执行命令`pnpm run build`，生成`dist`文件夹
