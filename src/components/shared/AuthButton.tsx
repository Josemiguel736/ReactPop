import { Link } from "react-router-dom";
import { useAuth } from "../../pages/auth/context";
import { logout } from "../../pages/auth/service";
import Button from "./Button";



export default function AuthButton(){
    const {isLogged,onLogout} = useAuth()

    const handleLogoutClick = async () =>{
        logout()
        onLogout()
    }

    return isLogged ? (
        <Button onClick={handleLogoutClick} $variant="secondary">Logout</Button>
    ) : (
        <Button $variant="primary" as={Link} to="/login">Login</Button>
    )
}