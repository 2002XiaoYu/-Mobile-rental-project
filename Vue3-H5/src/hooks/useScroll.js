import { onMounted, onUnmounted, ref} from 'vue';
// 防抖节流的库：throttle(节流) debounce(防抖)
import { throttle, debounce } from "underscore"

// 预留接口位置用来传递调用
export default function useScroll(elRef) {
  let el = window
  const isReachBottom = ref(false)
  const clientHeight = ref(0)
  const scrollTop = ref(0)
  const scrollHeight = ref(0)
  // 进行节流，每200毫秒只能触发一次。这里改换成防抖(因为一次性加载图片太多了，一滑动就不停的加载)
  const scrollList = debounce(() => {
    if(el === window){
      // 客户端的高度
      clientHeight.value = document.documentElement.clientHeight
      // 距离视图的顶部
      scrollTop.value = document.documentElement.scrollTop
      // 视图的高度
      scrollHeight.value = document.documentElement.scrollHeight
    }else{
      clientHeight.value = el.clientHeight
      scrollTop.value = el.scrollTop
      scrollHeight.value = el.scrollHeight
    }
    // 客户端高度+距离视图的顶部=视图的高度(相当于获取到了底部)
    // 底部tabBar的高度50px
    const tabBarHeight = 50
    if (clientHeight + scrollTop + tabBarHeight >= scrollHeight) {
      // 到达底部就设置isReachBottom为true
      isReachBottom.value = true
    }
  },100)

  // 监听window创建的滚动，在挂载到卸载组件的这段时间中
  onMounted(() => {
    if(elRef) el = elRef.value
    el.addEventListener("scroll", scrollList)
  })

  onUnmounted(() => {
    el.removeEventListener("scroll", scrollList)
  })

  return { isReachBottom, clientHeight, scrollTop, scrollHeight }
}