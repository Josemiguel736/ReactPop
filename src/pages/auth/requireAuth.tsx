import  { ReactNode } from "react"
import { useAuth } from "./context"
import { Navigate, useLocation } from "react-router-dom"

function RequireAuth({children}:{children: ReactNode}){{
    const {isLogged} = useAuth()
    const location = useLocation()
    return isLogged ? children : <Navigate to="/login" replace state={{from:location.pathname}} />
}
}

export default RequireAuth