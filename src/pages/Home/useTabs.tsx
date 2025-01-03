import { ChannelItem, fetchChannelAPI } from "@/apis/list"
import { useEffect, useState } from "react"
const useTabs = () => {
  const [channels, setChannels] = useState<ChannelItem[]>([])
  useEffect(() => {
    const getChannels = async () => {
      try {
        const res = await fetchChannelAPI()
        if (res?.data?.data?.channels) {
          //   console.log(res)
          setChannels(res.data.data.channels)
        } else {
          console.error("返回数据格式错误:", res)
          setChannels([])
        }
      } catch (error) {
        console.error("获取频道失败:", error)
        setChannels([])
      }
    }
    getChannels()
  }, [])
  return { channels }
}
export { useTabs }
