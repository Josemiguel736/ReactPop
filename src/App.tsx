
import {Routes, Route,Outlet, Navigate} from "react-router-dom"
import AdvertsPage from './pages/adverts/AdvertsPage'
import Page404 from "./pages/ErrorPages/404"
import AdvertDetail from "./pages/adverts/AdvertDetail"
import { lazy, Suspense } from "react"
import LoginPage from "./pages/auth/LoginPage"
import RequireAuth from "./pages/auth/requireAuth"

const NewAdvertPage = lazy(()=> import("./pages/adverts/NewAdvert"))

function App() {

  return (
    <Routes>
      <Route
      path='/adverts'
      element={<RequireAuth><Outlet/></RequireAuth>}>
      <Route index element={<AdvertsPage/>}/>
      <Route path="new" element={<Suspense fallback={<div>Cargando TODO!!!</div>}><NewAdvertPage/></Suspense>}/>
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
