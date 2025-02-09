import { Link, NavLink } from "react-router-dom";
import ReactLogo from "../../assets/reactLogo";
import AuthButton from "../shared/AuthButton";
import { useAuth } from "../../pages/auth/context";

export default function Header() {
  const { isLogged } = useAuth();

  return (
    <header className=" bg-sky-900 h-1/10 max-h-[60px]  flex items-center px-4">
      <Link to="/adverts">
        <ReactLogo /> 
      </Link>
      {isLogged ? (
        <nav className="text-amber-50 flex w-screen justify-end gap-20 items-center">
          <NavLink to="/adverts/new">Nuevo producto</NavLink>
          <NavLink to="/adverts">Productos</NavLink>
          <AuthButton />
        </nav>
      ) : null}
    </header>
  );
}
