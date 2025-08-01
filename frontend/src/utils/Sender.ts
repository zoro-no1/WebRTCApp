import {create} from "zustand"
import {  Socket } from "socket.io-client"

type sender = {
    mySocket: Socket | null
    name: string | null
    receiver:string|null
    allUser: {name:string,id:string}[] | null
    setAllUser: (value:{name:string,id:string}[]) => void
    setReceiver: (value: string)=> void
    setName:(value:string)=>void
    connect:boolean
    setConnection:(value:boolean)=>void
    receiverName:string|null
    setReceiverName:(value:string|null)=>void

}
const Sender=create<sender>((set)=>({
 mySocket:null,
 name:null,
 allUser:null,
 receiver:null,
 connect:false,
 receiverName:null,

 setAllUser:(value:{name:string,id:string}[])=>{
    set({allUser:value})
 },
 setReceiver:(value:string)=>{
    set({receiver:value})
 },
 setName:(value)=>{
   set({name:value})
 },
 setConnection:(value)=>{
   set({connect:value})
 },
 setReceiverName:(value)=>{
   console.log(value);
   
   set({receiverName:value})
 }
 
 
}))


export default Sender