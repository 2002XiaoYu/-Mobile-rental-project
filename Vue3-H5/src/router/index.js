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
      component:()=>import("@/views/home/home.vue")
    },
    {
      path:"/favor",
      component:()=>import("@/views/favor/favor.vue")
    },
    {
      path:"/order",
      component:()=>import("@/views/order/order.vue")
    },
    {
      path:"/message",
      component:()=>import("@/views/message/message.vue")
    },
    {
      path:"/city",
      component:()=>import("@/views/city/city.vue"),
      meta:{
        //判断是否需要隐藏   不需要隐藏的不需要写，undefined会被转化为false
        hideTabBar:true
      }
    },
    {
      path:"/search",
      component:()=>import("@/views/search/search.vue")
    },
    {
      path:"/details/:id",//  :id的作用是拼接传递信息
      component:()=>import("@/views/details/details.vue")
    }
  ]
})

export default router

