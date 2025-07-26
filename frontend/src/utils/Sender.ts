import {create} from "zustand"


type sender = {
    mySocket: WebSocket | null
    name: string | null
    receiver:string|null
    allUser: string[] | null
    setAllUser: (value: string[]) => void
    setReceiver: (value: string)=> void
}
const Sender=create<sender>((set)=>({
 mySocket:null,
 name:null,
 allUser:null,
 receiver:null,

 setAllUser:(value:string[])=>{
    set({allUser:value})
 },
 setReceiver:(value:string)=>{
    set({receiver:value})
 }
 
}))


export default Sender