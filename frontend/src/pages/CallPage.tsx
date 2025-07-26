import { useParams } from "react-router-dom"

const CallPage = () => {
    const {id}=useParams()
  return (
    <div>
      hii {id}
    </div>
  )
}

export default CallPage
