import { DetailDataType, fetchDetailAPI } from "@/apis/detail"
import { NavBar } from "antd-mobile"
import { useEffect, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"

const Detail = () => {
  const [detail, setDetail] = useState<DetailDataType | null>(null)
  // 获取路由参数
  const [params] = useSearchParams()
  const id = params.get("id")
  useEffect(() => {
    const getDetail = async () => {
      try {
        const res = await fetchDetailAPI(id!)
        setDetail(res.data.data)
      } catch (error) {
        throw new Error(`fetch detail error ${error}`)
      }
    }
    getDetail()
  }, [])
  const navigate = useNavigate()
  const back = () => {
    navigate(-1)
  }
  return (
    <div>
      <NavBar onBack={back}>{detail?.title}</NavBar>
      <div
        dangerouslySetInnerHTML={{ __html: detail?.content || "loading" }}
      ></div>
    </div>
  )
}

export default Detail
