import { Signup } from "./pages/Signup";
import { Dashboard } from "./pages/Dashboard";
import { Signin } from "./pages/Signin";
import { SendMoney } from "./pages/SendMoney";
import {BrowserRouter, Route,Routes} from "react-router-dom";

function App() {

  return (
    <>
       <BrowserRouter>
          <Routes>
            <Route path="/Signup" element={<Signup />}></Route>
            <Route path="/Signin" element={<Signin/>}></Route>
            <Route path="/dashboard" element={<Dashboard/>}></Route>
            <Route path="/send" element={<SendMoney/>}></Route>
          </Routes>
       </BrowserRouter>
      </>
  )
}

export default App
