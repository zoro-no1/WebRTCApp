import CallBox from "@/components/CallBox";
import Sidebar from "@/components/Sidebar";
import Sender from "@/utils/Sender";


const Dashboard = () => {
  const {allUser,name} = Sender()
    

  const nav=allUser
  return (
    
    <div className="flex ">
    
    {(nav&&name)&& <Sidebar user={name} nav={nav} />}
      <CallBox/>
    </div>
  )
}

export default Dashboard
