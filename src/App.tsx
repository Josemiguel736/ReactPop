
import {Routes, Route,Outlet, Navigate} from "react-router-dom"
import AdvertsPage from './pages/adverts/AdvertsPage'
import LoginPage from "./pages/auth/LoginPage"
import NewAdvertPage from "./pages/adverts/NewAdvert"
import Page404 from "./pages/404/404"
import RequireAuth from "./pages/auth/RequireAuth"
import AdvertDetail from "./pages/adverts/AdvertDetail"

function App() {

  return (
    <Routes>
      <Route
      path='/adverts'
      element={<RequireAuth><Outlet/></RequireAuth>}>
      <Route index element={<AdvertsPage/>}/>
      <Route path="new" element={<NewAdvertPage/>}/>
      <Route path=":advertId" element={<AdvertDetail/>}/>
      </Route>
      <Route path="/login" element={<LoginPage/>}/>
      <Route path="/" element={<Navigate to="/adverts"/>}/>
      <Route path="/404" element={<Page404/>}></Route>
      <Route path="*" element={<Navigate to="/404"/>}/>
    </Routes>
  )
}

export default App
