import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Sender from "@/utils/Sender";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const HomePage = () => {
  const navigte=useNavigate()

  const [name,setMyName]=useState<string>("")
  const { setName } = Sender();
  const handleSubmit = (e: any) => {
    if(name){
      setName(name)
    }
    navigte("/dashboard")
  };
  return (
    <div className="flex flex-col justify-center w-full h-screen  items-center bg-gray-500 gap-2">
      <Input className="bg-amber-100 w-60" type="text" placeholder="Name" value={name} onChange={e=>setMyName(e.target.value)} />
      <Button type="submit" variant="outline" onClick={(e) => handleSubmit(e)}>
        Join
      </Button>
    </div>
  );
};

export default HomePage;
