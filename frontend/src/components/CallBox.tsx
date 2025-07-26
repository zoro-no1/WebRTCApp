import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { io, Socket } from "socket.io-client";
import Sender from "@/utils/Sender";


const CallBox = () => {
  const myVideo = useRef<HTMLVideoElement | null>(null);
  const [socket, setSocket] = useState<Socket | null>(null);
  const pcRef = useRef<RTCPeerConnection | null>(null);
const setAllUser=Sender(state=>state.setAllUser)
const receiver =Sender(s=>s.receiver)
const setReceiver =Sender(s=>s.setReceiver)
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

    socketInstance.on("allUser", (data: string[]) => {

      setAllUser(data);
    });

    // Listen for offer
    socketInstance.on("offer", async (data) => {
      console.log("Received offer, sending answer...");
      const pc = new RTCPeerConnection();
      pcRef.current = pc;

        await pc.setRemoteDescription(data.offer);
        const answer = await pc.createAnswer();
        await pc.setLocalDescription(answer);
        socketInstance.emit("answer", { offer: answer, receiverId: data.from });
      
      setReceiver(data.from);

      pc.onicecandidate = (event) => {
        console.log("event",event);
        
        
        if (event.candidate) {
          socketInstance.emit("iceCandidate", { candidate: event.candidate, receiver: data.from });
        }
      };

      socket?.on("iceCandidate", (data) => {
        console.log("ice ",data);
        
  
          pc.addIceCandidate(data.candidate);
        
      });
       const stream=await navigator.mediaDevices.getUserMedia({video:true,audio:false})
      pc.addTrack(stream.getVideoTracks()[0])
      console.log(stream.getVideoTracks()[0]);
      

      pc.ontrack = (track) => {
        console.log("Remote track event:", track);
        // You can add a remote video ref and set srcObject here if needed
      };
    });

    // Cleanup on unmount
    return () => {
      socketInstance.disconnect();
      if (pcRef.current) {
        pcRef.current.close();
      }
    };
  }, []);











  

  async function handelCall() {
    if (!socket) return;
    const pc = new RTCPeerConnection();
    pc.onnegotiationneeded=async()=>{
      console.log("is");
      
      pcRef.current = pc;
      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);
      socket.emit("createOffer", { offer, receiverId:receiver });
    }
    pc.onicecandidate=(event)=>{
      console.log("event  ",event);
      
      if(event.candidate){
        socket.emit("iceCandidate",{candidate:event.candidate,receiver})
      }
    }
    socket.on("iceCandidate",data=>{
      console.log("ice",data);
      
      pc.addIceCandidate(data.candidate)
    })

    socket.on("answer", async (data) => {
      await pc.setRemoteDescription(data.offer);
    });
      const stream=await navigator.mediaDevices.getUserMedia({video:true,audio:false})
      console.log(stream.getVideoTracks()[0]);
      
      pc.addTrack(stream.getVideoTracks()[0])

    pc.ontrack=(track)=>{
      console.log(track);
      
    }
  }

  return (
    <div className="w-full h-screen bg-black flex items-center gap-2 ">
      <video
        ref={myVideo}
        autoPlay
        playsInline
        className="w-1/2"
        style={{ transform: "scaleX(-1)" }}
      />
      {receiver&&<Button onClick={handelCall} className=" " variant={"destructive"}>call</Button>}
    </div>
  );
};

export default CallBox;
