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