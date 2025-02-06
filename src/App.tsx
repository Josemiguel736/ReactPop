
import {Routes, Route,Outlet, Navigate} from "react-router-dom"
import Layout from './components/layout/Layout'
import AdvertsPage from './pages/adverts/AdvertsPage'
import LoginPage from "./pages/auth/LoginPage"

function App() {

  return (
    <Routes>
      <Route
      path='/adverts'
      element={<Layout><Outlet/></Layout>}>
      <Route index element={<AdvertsPage/>}/>
      <Route path="new" element={<AdvertsPage/>}/>

      </Route>
      <Route path="/login" element={<LoginPage/>}/>
      <Route path="/" element={<Navigate to="/adverts"/>}/>
    </Routes>
  )
}

export default App
