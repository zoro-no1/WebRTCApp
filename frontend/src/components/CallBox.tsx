import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { io, Socket } from "socket.io-client";
import Sender from "@/utils/Sender";


const CallBox = () => {
  const myVideo = useRef<HTMLVideoElement | null>(null);
  const [socket, setSocket] = useState<Socket | null>(null);
  const pcRef = useRef<RTCPeerConnection | null>(null);
const {setAllUser,receiver,setReceiver,name,connect,setConnection,receiverName}=Sender()
const remoteVideoRef=useRef<HTMLVideoElement>(null)





  useEffect(() => {
    // Get user media
    navigator.mediaDevices.getUserMedia({ video: true, audio: false }).then((stream) => {
      if (myVideo.current) {
        myVideo.current.srcObject = stream;
      }
    });

    // Setup socket connection
    const socketInstance = io("ws://localhost:8000");
    setSocket(socketInstance);

    socketInstance.emit("setName",name)

    socketInstance.on("allUser", (data:{name:string,id:string}[]) => {

      setAllUser(data);
    });

    // Listen for offer
    socketInstance.on("offer", async (data) => {
      if(confirm(`${data.receiverName} is calling`)){
      console.log("Received offer, sending answer...");
      const pc = new RTCPeerConnection();
      pcRef.current = pc;
      
  const stream=await navigator.mediaDevices.getUserMedia({video:true,audio:false})
      pc.addTrack(stream.getVideoTracks()[0])
       pc.ontrack = (event) => {
          console.log("Remote track event:", event);
        if(remoteVideoRef.current){
          remoteVideoRef.current.srcObject= new MediaStream([event.track])
          setConnection(true)
        }
        }

        await pc.setRemoteDescription(data.offer);
        const answer = await pc.createAnswer();
        await pc.setLocalDescription(answer);
        socketInstance.emit("answer", { offer: answer, receiverId: data.from });
      
      setReceiver(data.from);

      pc.onicecandidate = (event) => { 
        
        if (event.candidate) {
          socketInstance.emit("iceCandidate", { candidate: event.candidate, receiver: data.from });
        }
      };
       socketInstance.on("iceCandidate", (data) => {
          pcRef.current?.addIceCandidate(data.candidate);
        
      });}
    });
    socketInstance.on("endCall",()=>{
      pcRef.current?.close()
      pcRef.current=null

      if (remoteVideoRef.current) {
    remoteVideoRef.current.srcObject = null;
  }
  setConnection(false)
    })
     
    
   

    // Cleanup on unmount
    return () => {
      socketInstance.disconnect();
      if (pcRef.current) {
        pcRef.current.close();
      }
    };
  }, []);











  

  async function handleCall() {
    if (!socket) return;
    const pc = new RTCPeerConnection();
      const stream=await navigator.mediaDevices.getUserMedia({video:true,audio:false})


      pc.onicecandidate=(event)=>{
      
      if(event.candidate){
        socket.emit("iceCandidate",{candidate:event.candidate,receiver})
      }
      
    }
      pc.addTrack(stream.getVideoTracks()[0])
      console.log(stream);
      
    pc.ontrack=(event)=>{
      console.log("track",event);
      if(remoteVideoRef.current){
        remoteVideoRef.current.srcObject=new MediaStream([event.track])
        setConnection(true)
      }
    }

    pc.onnegotiationneeded=async()=>{

      pcRef.current = pc;
      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);
      socket.emit("createOffer", { offer, receiverId:receiver,receiverName });
    }
    socket.on("iceCandidate",data=>{
      
      pc.addIceCandidate(data.candidate)
    })

    socket.on("answer", async (data) => {
      await pc.setRemoteDescription(data.offer);
    });
    
  }

  function handleCut(){
    socket?.emit("cutCall",receiver)
    pcRef.current?.close()
    pcRef.current=null
 if (remoteVideoRef.current) {
    remoteVideoRef.current.srcObject = null;
  }
  setConnection(false)
  }


  return (
    <div className="w-full h-screen bg-black">

   
    <div className="h-4/5 flex items-center gap-2 border-2">
      <video
        ref={myVideo}
        autoPlay
        playsInline
        className="w-1/2 h-full border"
        style={{ transform: "scaleX(-1)" }}
      />
      <h1 className={`${!connect?"":"hidden"} text-8xl text-white text-center w-full`}>
        {receiverName}
      </h1>
      <video
        ref={remoteVideoRef}
        autoPlay
        playsInline
        className={`w-1/2 h-full border ${connect?'':"hidden"}`}
        style={{ transform: "scaleX(-1)" }}
      />
    </div>
    <div className="flex justify-center items-center">
     <Button onClick={handleCall} className={`${receiver&&!connect?"":"hidden"} bg-green-500`} >call</Button>
     <Button variant={"destructive"} size={"default"} onClick={handleCut} className={`${connect?"":"hidden"}`}>cut</Button>
    </div>
     </div>
  );
};

export default CallBox;
