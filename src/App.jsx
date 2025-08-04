import { BrowserRouter, Routes ,Route} from "react-router-dom"
import Body from "./components/Body"
import Login from "./components/Login"
import Signin from "./components/Signin"
import { Provider } from 'react-redux'
import appStore from "./utils/appStore"
import Feed from "./components/Feed"
import Profile from "./components/Profile"
import Home from "./components/Home"

function App() {
 
  return (
    <>
    <Provider store={appStore}>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body></Body>}>
            <Route path="/login" element={<Login></Login>}></Route>
            <Route path="/feed" element={<Feed></Feed>}></Route> 
            <Route path="/profile" element={<Profile></Profile>}></Route>         
            <Route path="/home" element={<Home></Home>}></Route> 
            <Route path="signin" element={<Signin></Signin>}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>

     </>
  )
}

export default App
