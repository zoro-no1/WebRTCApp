import CallBox from "@/components/CallBox";
import Sidebar from "@/components/Sidebar";
import Sender from "@/utils/Sender";


const Dashboard = () => {
  const allUser = Sender((state) => state.allUser)
    const user = {
    name: "Jane Doe",
    email: "jane@example.com",
    avatarUrl: "/avatars/jane.jpg"
  };

  const nav=allUser
  return (
    
    <div className="flex ">
    {nav&&<Sidebar user={user} nav={nav} />}
      <CallBox/>
    </div>
  )
}

export default Dashboard
