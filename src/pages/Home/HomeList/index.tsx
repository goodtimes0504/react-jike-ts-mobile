import { Image, InfiniteScroll, List } from "antd-mobile"
// mock数据
import { useEffect, useState } from "react"
import { fetchListAPI, ListRes } from "@/apis/list"
import { useNavigate } from "react-router-dom"
type Props = {
  channelId: string
}
const HomeList = (props: Props) => {
  const { channelId } = props
  const [listRes, setListRes] = useState<ListRes>({
    results: [],
    pre_timestamp: "" + new Date().getTime(),
  })
  useEffect(() => {
    const getList = async () => {
      try {
        const res = await fetchListAPI({
          channel_id: channelId,
          timestamp: "" + new Date().getTime(),
        })
        setListRes(res.data.data)
      } catch (error) {
        throw new Error(`fetch list error ${error}`)
      }
    }
    getList()
  }, [])
  // 开关 标记当前是否还有数据
  // 上拉加载触发的必要条件 hasMore是true并且 小于threshold
  const [hasMore, setHasMore] = useState(true)
  // 加载更多
  const loadMore = async () => {
    try {
      const res = await fetchListAPI({
        channel_id: channelId,
        timestamp: listRes.pre_timestamp,
      })
      // 拼接新数据+存储下一次请求的时间戳
      setListRes((prev) => ({
        ...prev,
        results: [...prev.results, ...res.data.data.results],
        pre_timestamp: res.data.data.pre_timestamp,
      }))
      // 设置开关
      setHasMore(res.data.data.pre_timestamp !== "")
    } catch (error) {
      throw new Error(`fetch list error ${error}`)
    }
  }
  const navigate = useNavigate()
  const goToDetail = (id: string) => {
    //   路由跳转
    navigate(`/detail?id=${id}`)
  }
  return (
    <>
      <List>
        {listRes.results.map((item) => (
          <List.Item
            key={item.art_id}
            onClick={() => goToDetail(item.art_id)}
            prefix={
              <Image
                src={item.cover?.images?.[0] || ""}
                style={{ borderRadius: 20 }}
                fit="cover"
                width={40}
                height={40}
              />
            }
            description={item.pubdate}
          >
            {item.title}
          </List.Item>
        ))}
      </List>
      <InfiniteScroll
        loadMore={loadMore}
        hasMore={hasMore}
        threshold={10}
      ></InfiniteScroll>
    </>
  )
}

export default HomeList
