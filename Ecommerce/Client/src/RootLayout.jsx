import { Outlet } from "react-router-dom"
import Header from "./compoments/header/Header"
import Footer from "./compoments/footer/Footer"
function RootLayout() {
  return (
   <div>
    <Header />
<div style={{minHeight:'100vh'}}>
    <Outlet />
   </div>
   <Footer />
   </div>
  )
}

export default RootLayout