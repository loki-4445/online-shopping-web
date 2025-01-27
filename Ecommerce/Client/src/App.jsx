  import "./App.css"
import {createBrowserRouter,RouterProvider} from "react-router-dom"
import Home from "./compoments/home/Home"
import Register from "./compoments/register/Register"
import Login from "./compoments/login/Login"
import About from "./compoments/about/About"
import RoutingError from "./RoutingError"
import RootLayout from './RootLayout'
import Products from "./compoments/products/Products"
import Cart from "./compoments/cart/Cart"
import {Navigate} from 'react-router-dom'
import Userprofile from './compoments/user-profile/Userprofile'
function App() {
  let browserRouter = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout />,
      errorElement:<RoutingError />,
      children: [
        {
          path: '',
          element: <Home />
        },
        {
          path: 'register',
          element: <Register />
        },
        {
          path: 'login',
          element: <Login />
        },
        {
          path: 'about',
          element: <About />
        },
        {
          path:'user-profile',
          element:<Userprofile/>,
          children:[
            {
              path:'products',
              element:<Products/>
            },
            {
              path:'cart',
              element:<Cart/>
            },
            {
              
                path:'',
                element:<Navigate to={'products'} />
              
            }
          ]
        }
      ]
    }
  ]);

  return (
    <div className="main">
      <RouterProvider router={browserRouter} />
    </div>
  );
}

export default App;
