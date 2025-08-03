import { BrowserRouter, Routes ,Route} from "react-router-dom"
import Body from "./components/Body"
import Login from "./components/Login"
import Signin from "./components/Signin"
import { Provider } from 'react-redux'
import appStore from "./utils/appStore"
import Feed from "./components/Feed"

function App() {
 
  return (
    <>
    <Provider store={appStore}>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body></Body>}>
            <Route path="/feed" element={<Feed></Feed>}></Route>
            <Route path="/login" element={<Login></Login>}></Route>
            <Route path="signin" element={<Signin></Signin>}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>

     </>
  )
}

export default App
