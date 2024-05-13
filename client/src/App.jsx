import Dashboard from "./Components/Dashboard/Dashboard"
import Login from "./Components/Login/Login"
import Register from "./Components/Register/Register"
import ForgotPassword from "./Components/ForgotPassword/ForgotPassword"
import UpdatePassword from "./Components/ForgotPassword/UpdatePassword"
import "./App.css"

import { createBrowserRouter, RouterProvider} from 'react-router-dom'


const router = createBrowserRouter(
  [
    {
      path:'/',
      element: <div><Login/></div>
    },
    {
      path:'/register',
      element: <div><Register/></div>
    },
    {
      path:'/dashboard',
      element: <div><Dashboard/></div>
    },
    {
      path:'/forgotPassword',
      element:<div><ForgotPassword/></div>
    },
    {
      path:'/updatePassword',
      element:<div><UpdatePassword/></div>
    }
  ]
)

function App() {
  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  )
}

export default App
