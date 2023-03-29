import {createPinia} from "pinia"

const useStore = createPinia("useStore",{
  state:()=>({
    count:1
  }),
})

export default useStore