
import {Routes, Route,Outlet, Navigate} from "react-router-dom"
import AdvertsPage from './pages/adverts/AdvertsPage'
import LoginPage from "./pages/auth/LoginPage"
import NewAdvertPage from "./pages/adverts/NewAdvert"
import Page404 from "./pages/404/404"

function App() {

  return (
    <Routes>
      <Route
      path='/adverts'
      element={<Outlet/>}>
      <Route index element={<AdvertsPage/>}/>
      <Route path="new" element={<NewAdvertPage/>}/>

      </Route>
      <Route path="/login" element={<LoginPage/>}/>
      <Route path="/" element={<Navigate to="/adverts"/>}/>
      <Route path="/404" element={<Page404/>}></Route>
      <Route path="*" element={<Navigate to="/404"/>}/>
    </Routes>
  )
}

export default App
