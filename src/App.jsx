import { BrowserRouter, Routes ,Route} from "react-router-dom"
import Body from "./Body"
import Login from "./Login"
import Signin from "./Signin"

function App() {
 
  return (
    <>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body></Body>}>
            <Route path="/login" element={<Login></Login>}></Route>
            <Route path="signin" element={<Signin></Signin>}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
     </>
  )
}

export default App
