import {create} from "zustand"


type sender = {
    mySocket: WebSocket | null
    name: string | null
    receiver:string|null
    allUser: {name:string,id:string}[] | null
    setAllUser: (value:{name:string,id:string}[]) => void
    setReceiver: (value: string)=> void
    setName:(value:string)=>void
}
const Sender=create<sender>((set)=>({
 mySocket:null,
 name:null,
 allUser:null,
 receiver:null,

 setAllUser:(value:{name:string,id:string}[])=>{
    set({allUser:value})
 },
 setReceiver:(value:string)=>{
    set({receiver:value})
 },
 setName:(value)=>{
   set({name:value})
 }
 
 
}))


export default Sender