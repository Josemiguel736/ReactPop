import { useAuth } from "../../pages/auth/context";
import { logout } from "../../pages/auth/service";
import Button from "./Button";
import { ComponentProps, useState } from "react";

export interface ConfirmLogoutProps extends ComponentProps<"input"> {
    setIsClicked:React.Dispatch<React.SetStateAction<boolean>>
}

 function ConfirmLogout({setIsClicked}:ConfirmLogoutProps) {
  const [confirm, setConfirm] = useState(false);
  const { onLogout } = useAuth();

  const handleSubmit = () => {
    if (confirm) {
      logout();
      onLogout();
    }
  };


  return (
    <form onSubmit={handleSubmit} className=" bg-sky-700 text-amber-50">
      <Button
        onClick={() => {
          setIsClicked(false);
        }}
        $variant="primary"
      >
        Mantenme iniciado
      </Button>
      <Button
        type="submit"
        onClick={() => {
          setConfirm(true);
        }}
        $variant="secondary"
      >
        Cerrar sesión
      </Button>
    </form>
  );
}

export default function AuthButton() {
  const [isClicked, setIsClicked] = useState(false)
  

  return isClicked ? (
    <ConfirmLogout setIsClicked={setIsClicked} ></ConfirmLogout>
  ) : <div>
  <Button onClick={()=>setIsClicked(true)} $variant="secondary">
    Logout
  </Button></div>
  
}
