import { Link } from "react-router-dom";
import Button from "../../components/shared/Button";


export default function PleaseLogin(){
    return(
        <div>
        <h1>Para ver el contenido debes de estar autenticado</h1>
        <h2>Por favor inicia sesión</h2>
        <Button as={Link} to="/login" $variant="primary">Iniciar sesión</Button>
    </div>
    )    
}