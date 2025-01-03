import { http } from "@/utils"
import { ResType } from "@/apis/shared"

// 定义具体的接口类型
export type ChannelItem = {
  id: number
  name: string
}
export type ChannelRes = {
  channels: ChannelItem[]
}

// 修改 fetchChannelAPI 返回类型
export const fetchChannelAPI = () => {
  return http.get<ResType<ChannelRes>>("/channels")
}

// 请求文章列表
type ListItem = {
  art_id: string
  title: string
  aut_id: string
  comm_count: number
  pubdate: string
  aut_name: string
  is_top: number
  cover: {
    type: number
    images: string[]
  }
}
export type ListRes = {
  results: ListItem[]
  pre_timestamp: string
}
type ReqParams = {
  channel_id: string
  timestamp: string
}
export const fetchListAPI = (params: ReqParams) => {
  return http.request<ResType<ListRes>>({
    url: "/articles",
    method: "GET",
    params,
  })
}
