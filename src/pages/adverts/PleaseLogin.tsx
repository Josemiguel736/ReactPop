import { Link } from "react-router-dom";
import Button from "../../components/shared/Button";

export default function PleaseLogin() {
  return (
    <div className="flex items-center justify-center text-center">
      <div className="mt-20 ">
        <h1 className="text-3xl">
          Para ver el contenido debes de estar autenticado
        </h1>
        <h2 className="text-2xl ">Por favor inicia sesión</h2>
        <Button as={Link} to="/login" $variant="primary" className="mt-4">
          Iniciar sesión
        </Button>
      </div>
    </div>
  );
}
