import { BrowserRouter,Route,Routes } from "react-router-dom"
import HomePage from "./pages/HomePage"
import Dashboard from "./pages/Dashboard"
import CallPage from "./pages/CallPage"

function App() {
  

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/dashboard" element={<Dashboard/>}/>
      <Route path="/user/:id" element={<CallPage/>}/>
    </Routes>
    
    </BrowserRouter>
    
  )
}

export default App
