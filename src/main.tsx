import { createRoot } from "react-dom/client"
import { RouterProvider } from "react-router-dom"
import { router } from "@/router"
// 测试接口
// import { fetchChannelAPI } from "@/apis/list"
// fetchChannelAPI().then((res) => {
//   console.log(res.data.data.channels)
// })
createRoot(document.getElementById("root")!).render(
  <RouterProvider
    router={router}
    future={{
      v7_startTransition: true,
    }}
  ></RouterProvider>
)
