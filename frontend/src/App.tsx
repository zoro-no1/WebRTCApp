import { BrowserRouter,Navigate,Route,Routes } from "react-router-dom"
import HomePage from "./pages/HomePage"
import Dashboard from "./pages/Dashboard"
import CallPage from "./pages/CallPage"
import Sender from "./utils/Sender"

function App() {
  const {name}=Sender()


  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/dashboard"  element={name?<Dashboard/>:<Navigate to={"/"}/>}/>
      <Route path="/user/:id" element={<CallPage/>}/>
    </Routes>
    
    </BrowserRouter>
    
  )
}

export default App
